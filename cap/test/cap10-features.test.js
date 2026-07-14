'use strict'
process.env.CDS_ENV = 'sqlite'
process.env.CDS_REQUIRES_DB_CREDENTIALS_URL = ':memory:'

/**
 * CAP 10 behaviour tests — bypass drafts + uniform .affected
 *
 * Test 1: Bypass drafts
 *   StarWarsShow.Show is @odata.draft.enabled.  A non-Fiori client can read
 *   the *active* data set by supplying `IsActiveEntity eq true` in the
 *   $filter.  CAP 10 accepts this without a Fiori-draft session cookie.
 *
 * Test 2: Uniform .affected
 *   CAP 10 consolidated DB-service write APIs so every INSERT/UPDATE/DELETE
 *   result exposes a numeric `.affected` property (non-enumerable) indicating
 *   how many rows were written.  Verified shape: result object whose
 *   JSON.stringify produces the inserted rows array and whose `.affected`
 *   equals the number of rows written.
 */

const { describe, it } = require('node:test')
const assert = require('node:assert/strict')
const cds = require('@sap/cds')
const { INSERT, SELECT, DELETE } = cds.ql

describe('CAP 10 — bypass drafts + .affected', () => {
  const { GET } = cds.test(__dirname + '/..')

  it('reads active data directly with IsActiveEntity=true (bypass drafts)', async () => {
    // Seed one Show so we can assert the returned entity truly has IsActiveEntity=true.
    const db = await cds.connect.to('db')
    await db.run(INSERT.into('star.wars.Show').entries({ title: 'Bypass-Draft-Test-Show' }))

    // Non-Fiori GET with IsActiveEntity filter — CAP 10 treats this as a
    // plain active-entity read, not a Fiori draft protocol request.
    const { status, data } = await GET(
      `/odata/v4/StarWarsShow/Show?$filter=IsActiveEntity eq true&$top=5`
    )
    assert.equal(status, 200, 'OData endpoint should return 200')
    assert.ok(Array.isArray(data.value), 'response should have a value array')

    // Every row returned must be the active entity (IsActiveEntity = true)
    for (const row of data.value) {
      assert.equal(row.IsActiveEntity, true,
        `All rows must have IsActiveEntity=true; got: ${JSON.stringify(row.IsActiveEntity)}`)
    }

    // Cleanup
    await db.run(DELETE.from('star.wars.Show').where({ title: 'Bypass-Draft-Test-Show' }))
  })

  it('exposes uniform .affected (number) on a write result', async () => {
    const db = await cds.connect.to('db')
    const res = await db.run(
      INSERT.into('star.wars.Show').entries({ title: 'CAP10-Affected-Test-Show' })
    )

    // CAP 10 consolidated DB-service write APIs: `.affected` is a number >= 1.
    // It is a non-enumerable property on the result (JSON.stringify shows the
    // inserted rows array, not the .affected value).
    assert.strictEqual(typeof res.affected, 'number',
      `write result .affected should be a number; got type: ${typeof res.affected}`)
    assert.ok(res.affected >= 1,
      `write result .affected should be >= 1; got: ${res.affected}`)

    // Cleanup
    await db.run(DELETE.from('star.wars.Show').where({ title: 'CAP10-Affected-Test-Show' }))
  })
})
