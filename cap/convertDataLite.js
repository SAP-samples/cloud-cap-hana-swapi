const { runMigration } = require('./convertData')

runMigration({
    loggerName: 'migration-lite'
}).catch(error => {
    // eslint-disable-next-line no-console
    console.error(error)
    process.exit(1)
})
