'use strict'

// Must be set BEFORE @sap/cds is required so CAP reads the correct profile.
process.env.CDS_ENV = 'sqlite'
process.env.CDS_REQUIRES_DB_CREDENTIALS_URL = ':memory:'

/**
 * Handler-layer tests for people-service.js.
 *
 * Complements test/model.test.js which focuses on model constraints and
 * service contract. These tests focus on custom handler behavior:
 *
 *   Layer 1 – Model constraints:   model.test.js
 *   Layer 2 – Service contract:    model.test.js (endpoints / $metadata)
 *   Layer 3 – Handler behavior:    THIS FILE
 *
 * Run: node --test test/handler.test.js
 * Or via: npm run test
 */

const { describe, it, before, after } = require('node:test')
const assert = require('node:assert/strict')
const cds = require('@sap/cds')
const { SELECT, INSERT, UPDATE, DELETE } = cds.ql

describe('People Service – Handler Behavior', () => {
    const { GET, POST } = cds.test(__dirname + '/..')

    // ─────────────────────────────────────────────────────────────────────────
    // before-CREATE validation
    // people-service.js registers a before-CREATE hook that rejects requests
    // where name is blank or whitespace only.
        //
        // NOTE: People is @odata.draft.enabled, so a raw OData POST only creates a
        // draft — the before-CREATE hook fires during draft *activation*, not creation.
        // Testing via the service layer (cds.connect.to) bypasses the OData draft
        // protocol and invokes the before-CREATE handler directly.
    // ─────────────────────────────────────────────────────────────────────────
    describe('before-CREATE validation', () => {
            let peopleSrv

            before(async () => {
                peopleSrv = await cds.connect.to('StarWarsPeople')
            })

            it('rejects a People record with a blank name (empty string)', async () => {
                // service.run(INSERT) dispatches through the handler chain (before/on/after)
                // without going through the OData draft protocol.
                await assert.rejects(
                    peopleSrv.run(INSERT.into('People').entries({ name: '' })),
                    'Service should reject blank name'
                )
            })

            it('rejects a People record with a whitespace-only name', async () => {
                await assert.rejects(
                    peopleSrv.run(INSERT.into('People').entries({ name: '   ' })),
                    'Service should reject whitespace-only name'
                )
            })

            it('accepts a People record with a valid name', async () => {
                const result = await peopleSrv.run(
                    INSERT.into('People').entries({ name: 'Handler-test-create' })
                )
                // Cleanup: delete the created record directly via DB
                const db = await cds.connect.to('db')
                await db.run(DELETE.from('star.wars.People').where({ name: 'Handler-test-create' }))
                assert.ok(result !== undefined, 'INSERT should succeed for a valid name')
            })
    })

    // ─────────────────────────────────────────────────────────────────────────
    // after-READ enrichment
    // people-service.js registers an after-READ hook that populates the virtual
    // `displayTitle` field: "<name> (<birth_year>)"
    // ─────────────────────────────────────────────────────────────────────────
    describe('after-READ enrichment – displayTitle', () => {
        let personId

        before(async () => {
            const db = await cds.connect.to('db')
            await db.run(INSERT.into('star.wars.People').entries({
                name: 'DisplayTitle-Test-Person',
                birth_year: '19BBY',
                gender: 'male',
            }))
            const [p] = await db.run(
                SELECT.from('star.wars.People').where({ name: 'DisplayTitle-Test-Person' })
            )
            personId = p.ID
        })

        after(async () => {
            if (personId) {
                const db = await cds.connect.to('db')
                await db.run(DELETE.from('star.wars.People').where({ ID: personId }))
            }
        })

        it('list read – displayTitle is populated for all results', async () => {
            const { status, data } = await GET(
                `/odata/v4/StarWarsPeople/People?$filter=name eq 'DisplayTitle-Test-Person'`
            )
            assert.equal(status, 200)
            assert.equal(data.value.length, 1, 'Expect exactly one result')
            const p = data.value[0]
            assert.ok(p.displayTitle, 'displayTitle should be populated')
            assert.ok(
                p.displayTitle.includes('DisplayTitle-Test-Person'),
                `displayTitle should include the name; got: ${p.displayTitle}`
            )
        })

        it('displayTitle includes birth_year when present', async () => {
            const { data } = await GET(
                `/odata/v4/StarWarsPeople/People?$filter=name eq 'DisplayTitle-Test-Person'`
            )
            const p = data.value[0]
            assert.ok(
                p.displayTitle.includes('19BBY'),
                `displayTitle should include birth_year; got: ${p.displayTitle}`
            )
        })
    })

    // ─────────────────────────────────────────────────────────────────────────
    // rename bound action
    // people-service.js registers an on('rename', 'People', ...) handler.
    // The action updates the name field and returns the updated entity.
    // ─────────────────────────────────────────────────────────────────────────
    describe('rename – bound action', () => {
        let personId

        before(async () => {
            const db = await cds.connect.to('db')
            await db.run(INSERT.into('star.wars.People').entries({
                name: 'Rename-Action-Test-Person',
            }))
            const [p] = await db.run(
                SELECT.from('star.wars.People').where({ name: 'Rename-Action-Test-Person' })
            )
            personId = p.ID
        })

        after(async () => {
            if (personId) {
                const db = await cds.connect.to('db')
                await db.run(DELETE.from('star.wars.People').where({ ID: personId }))
            }
        })

        it('rename action returns HTTP 200 with the updated entity', async () => {
            // People is @odata.draft.enabled — bound actions require the compound key
            // { ID, IsActiveEntity } when called via OData.
            const { status, data } = await POST(
                `/odata/v4/StarWarsPeople/People(ID=${personId},IsActiveEntity=true)/rename`,
                { newName: 'Obi-Wan Kenobi (renamed)' }
            )
            assert.equal(status, 200, 'rename action should return 200')
            assert.equal(data.name, 'Obi-Wan Kenobi (renamed)', 'Response should contain updated name')
        })

        it('rename action persists the new name in the database', async () => {
            const db = await cds.connect.to('db')
            const [p] = await db.run(SELECT.from('star.wars.People').where({ ID: personId }))
            assert.equal(p.name, 'Obi-Wan Kenobi (renamed)', 'New name should be persisted')
        })

        it('rename action rejects a blank newName with HTTP 400', async () => {
            // The HTTP client throws for 4xx responses; catch and inspect the status.
            let thrownStatus
            try {
                await POST(
                    `/odata/v4/StarWarsPeople/People(ID=${personId},IsActiveEntity=true)/rename`,
                    { newName: '' }
                )
            } catch (e) {
                thrownStatus = e.response?.status ?? e.status
            }
            assert.equal(thrownStatus, 400, 'rename should reject blank newName with HTTP 400')
        })
    })

    // ─────────────────────────────────────────────────────────────────────────
    // countByGender unbound function
    // people-service.js registers an on('countByGender', ...) handler.
    // Returns the count of People records matching the given gender.
    // ─────────────────────────────────────────────────────────────────────────
    describe('countByGender – unbound function', () => {
        it('returns 0 for an unknown gender string', async () => {
            const { status, data } = await GET(
                `/odata/v4/StarWarsPeople/countByGender(gender='xyzzy-does-not-exist')`
            )
            assert.equal(status, 200)
            assert.equal(data.value, 0, 'Unknown gender should return 0')
        })

        it('returns a non-negative integer for gender "male"', async () => {
            const { status, data } = await GET(
                `/odata/v4/StarWarsPeople/countByGender(gender='male')`
            )
            assert.equal(status, 200)
            assert.ok(
                typeof data.value === 'number' && data.value >= 0,
                `countByGender('male') should return a non-negative integer; got: ${data.value}`
            )
        })

        it('returns same count regardless of gender case', async () => {
            const { data: lower } = await GET(
                `/odata/v4/StarWarsPeople/countByGender(gender='female')`
            )
            const { data: upper } = await GET(
                `/odata/v4/StarWarsPeople/countByGender(gender='FEMALE')`
            )
            assert.equal(lower.value, upper.value,
                'countByGender should be case-insensitive')
        })
    })
})
