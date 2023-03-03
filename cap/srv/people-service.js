const cds = require('@sap/cds')
module.exports = cds.service.impl(function () {

     this.after(['CREATE', 'UPDATE', 'DELETE'], 'People', async (_,req) => {
        const log = cds.log('exit')
        log.info(`Inside People Update and ready to fire event`)
        //const messaging = await cds.connect.to('messaging')
        await this.emit('People.Changed.v1', req.data)
    }) 
})