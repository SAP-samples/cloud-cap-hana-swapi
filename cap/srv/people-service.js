const cds = require('@sap/cds')
const { SELECT, UPDATE } = cds.ql

module.exports = cds.service.impl(function () {

    // ─── Showcase: before hook ────────────────────────────────────────────────
    // before-CREATE/UPDATE runs BEFORE the generic CRUD handler writes to the DB.
    // Use it to validate input, set defaults, or reject invalid requests.
    // Calling req.reject() aborts the request — on/after hooks never run.
    this.before(['CREATE', 'UPDATE'], 'People', req => {
        const log = cds.log('people')
        const { name } = req.data
        if (name !== undefined && !name?.trim()) {
            log.warn(`Rejecting People ${req.event} with blank name`)
            return req.reject(400, 'People.name must not be blank or whitespace only.')
        }
    })

    // ─── Showcase: on hook (custom action handler) ────────────────────────────
    // Bound action: rename — updates the character's name and returns the record.
    // `on` handlers replace the generic CRUD handler for that specific event.
    // req.params[0] contains the bound entity key: { ID: '<uuid>', IsActiveEntity: true }
    // req.data contains the action parameters: { newName: '...' }
    this.on('rename', 'People', async req => {
        const log = cds.log('people')
            const { ID } = req.params[0]   // IsActiveEntity also present for draft entities; we only need ID
        const { newName } = req.data
        if (!newName?.trim()) return req.reject(400, 'newName must not be blank.')
        log.info(`Renaming person ${ID} to "${newName}"`)
        // Use the DB layer directly to bypass the OData draft machinery.
        const db = await cds.connect.to('db')
        await db.run(UPDATE('star.wars.People').set({ name: newName }).where({ ID }))
        return db.run(SELECT.one.from('star.wars.People').where({ ID }))
    })

    // ─── Showcase: on hook (unbound function handler) ─────────────────────────
    // Unbound function: countByGender — no entity binding, just query + return.
    // req.data contains the function parameters: { gender: '...' }
    this.on('countByGender', async req => {
        const { gender } = req.data
        const db = await cds.connect.to('db')
        const result = await db.run(
            SELECT.one.from('star.wars.People').columns('count(*) as n')
                .where`lower(gender) = lower(${gender ?? ''})`
        )
        return result?.n ?? 0
    })

    // ─── Showcase: after hook — result enrichment ─────────────────────────────
    // after-READ runs AFTER the generic CRUD handler returns results.
    // Use it to compute virtual fields, add links, or transform data before the
    // response is serialized.
    //
    // IMPORTANT: [].concat(results) normalizes both:
    //   - List reads  → results is an Array
    //   - Key reads   → results is a plain Object
    // Without this, iterating over a plain object would enumerate its keys, not items.
    this.after('READ', 'People', results => {
        for (const p of [].concat(results)) {
            // Populate the virtual `displayTitle` element declared in people-service.cds
            p.displayTitle = `${p.name ?? 'Unknown'} (${p.birth_year ?? 'unknown era'})`
        }
    })

    // ─── Showcase: after hook — notifications + domain events ────────────────
    // after-CREATE/UPDATE/DELETE runs AFTER the DB write completes successfully.
    // Use it for side effects: notifications, audit logs, domain events.
    // Failures here do NOT roll back the DB write (use a transaction if needed).
    this.after(['CREATE', 'UPDATE', 'DELETE'], 'People', async (_, req) => {
        const log = cds.log('people')
        log.info(`People ${req.event} completed — emitting notification and domain event`)

        // SAP Alert Notification Service integration
        // cds.connect.to() returns a cached connection after the first call.
        const alert = await cds.connect.to('notifications')
        alert.notify({
            NotificationTypeKey: 'PeopleAltered',
            NotificationTypeVersion: '1',
            Priority: 'NEUTRAL',
            Properties: [
              {
                Key: 'ID',
                IsSensitive: false,
                Language: 'en',
                Value: req.data.ID,
                Type: 'String'
              },
              {
                Key: 'user',
                IsSensitive: false,
                Language: 'en',
                Value: cds.context.user.id,
                Type: 'String'
              },
              {
                Key: 'name',
                IsSensitive: true,   // mark PII fields
                Language: 'en',
                Value: req.data.name,
                Type: 'String'
              }
            ],
            Recipients: [
                { RecipientId: 'supportuser1@mycompany.com' },
                { RecipientId: 'supportuser2@mycompany.com' }
            ]
        })

        // AsyncAPI domain event — declared in people-service.cds as:
        //   event People.Changed.v1 : projection on StarWarsPeople.People
        // See docs/StarWarsPeople.openapi3.json or run: npm run asyncapi
        await this.emit('People.Changed.v1', req.data)
    })
})