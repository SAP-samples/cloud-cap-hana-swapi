const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs/promises')
const os = require('node:os')
const path = require('node:path')

const { __internals } = require('../convertData')

const {
    parseArgs,
    createReport,
    persistInChunks,
    writeReport
} = __internals

function createMockLogger() {
    const logs = []
    return {
        logs,
        info(payload) {
            logs.push(payload)
        }
    }
}

test('parseArgs parses key-value and flag style arguments', () => {
    const args = parseArgs([
        '--mode=delta',
        '--chunk-size=250',
        '--report=./tmp/report.json',
        '--verbose'
    ])

    assert.equal(args.mode, 'delta')
    assert.equal(args['chunk-size'], '250')
    assert.equal(args.report, './tmp/report.json')
    assert.equal(args.verbose, 'true')
})

test('createReport returns expected initial shape', () => {
    const report = createReport({ mode: 'delta', chunkSize: 250 })

    assert.equal(report.mode, 'delta')
    assert.equal(report.chunkSize, 250)
    assert.ok(report.startedAt)
    assert.equal(report.durationMs, 0)
    assert.deepEqual(report.stats.read, {})
    assert.deepEqual(report.stats.persisted, {})
    assert.equal(report.stats.skippedRecords, 0)
    assert.equal(report.stats.missingReferences, 0)
    assert.deepEqual(report.warnings, [])
})

test('writeReport persists JSON report and logs summary', async () => {
    const report = createReport({ mode: 'full', chunkSize: 1000 })
    report.stats.read.People = 2
    report.stats.persisted.People = 2
    report.warnings.push('sample warning')

    const logger = createMockLogger()

    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'cap-migration-report-'))
    const reportFile = path.join(tempDir, 'migration-report.json')

    await writeReport(report, reportFile, logger)

    const writtenRaw = await fs.readFile(reportFile, 'utf8')
    const written = JSON.parse(writtenRaw)

    assert.equal(written.mode, 'full')
    assert.equal(written.chunkSize, 1000)
    assert.equal(written.stats.read.People, 2)
    assert.equal(written.stats.persisted.People, 2)
    assert.equal(written.warnings.length, 1)
    assert.ok(written.endedAt)
    assert.ok(written.durationMs >= 0)

    assert.ok(logger.logs.some(entry => entry === 'Migration summary'))
    assert.ok(logger.logs.some(entry => typeof entry === 'object' && entry.mode === 'full'))
    assert.ok(logger.logs.some(entry => typeof entry === 'string' && entry.includes('Wrote migration report to')))
})

test('writeReport skips file persistence when reportPath is not provided', async () => {
    const report = createReport({ mode: 'full', chunkSize: 1000 })
    const logger = createMockLogger()

    await writeReport(report, undefined, logger)

    assert.ok(report.endedAt)
    assert.ok(report.durationMs >= 0)
    assert.ok(logger.logs.some(entry => entry === 'Migration summary'))
})

test('persistInChunks uses INSERT in full mode with expected chunk boundaries', async () => {
    const captured = []
    const tx = {
        entities: {
            People: { name: 'People' }
        },
        async run(query) {
            captured.push(query)
        }
    }

    const rows = [
        { ID: '1', name: 'A' },
        { ID: '2', name: 'B' },
        { ID: '3', name: 'C' },
        { ID: '4', name: 'D' },
        { ID: '5', name: 'E' }
    ]

    const report = createReport({ mode: 'full', chunkSize: 2 })
    const logger = createMockLogger()

    await persistInChunks(tx, 'People', rows, 'full', 2, report, logger)

    assert.equal(captured.length, 3, '5 rows with chunk size 2 should trigger 3 DB calls')
    assert.equal(captured[0].INSERT.entries.length, 2)
    assert.equal(captured[1].INSERT.entries.length, 2)
    assert.equal(captured[2].INSERT.entries.length, 1)
    assert.equal(report.stats.persisted.People, 5)
})

test('persistInChunks uses UPSERT in delta mode', async () => {
    const captured = []
    const tx = {
        entities: {
            Film: { name: 'Film' }
        },
        async run(query) {
            captured.push(query)
        }
    }

    const rows = [
        { ID: '10', title: 'A New Hope' },
        { ID: '11', title: 'Empire Strikes Back' },
        { ID: '12', title: 'Return of the Jedi' }
    ]

    const report = createReport({ mode: 'delta', chunkSize: 2 })
    const logger = createMockLogger()

    await persistInChunks(tx, 'Film', rows, 'delta', 2, report, logger)

    assert.equal(captured.length, 2)
    assert.ok(captured[0].UPSERT, 'delta mode should generate UPSERT queries')
    assert.ok(captured[1].UPSERT, 'delta mode should generate UPSERT queries')
    assert.equal(captured[0].UPSERT.entries.length, 2)
    assert.equal(captured[1].UPSERT.entries.length, 1)
    assert.equal(report.stats.persisted.Film, 3)
})

test('persistInChunks records zero when row set is empty', async () => {
    let wasRunCalled = false
    const tx = {
        entities: {
            Species: { name: 'Species' }
        },
        async run() {
            wasRunCalled = true
        }
    }

    const report = createReport({ mode: 'full', chunkSize: 1000 })
    const logger = createMockLogger()

    await persistInChunks(tx, 'Species', [], 'full', 1000, report, logger)

    assert.equal(wasRunCalled, false)
    assert.equal(report.stats.persisted.Species, 0)
})
