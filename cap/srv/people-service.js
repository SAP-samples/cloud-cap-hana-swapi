const cds = require('@sap/cds')
module.exports = cds.service.impl(function () {

     this.after(['CREATE', 'UPDATE', 'DELETE'], 'People', async (_,req) => {
        const log = cds.log('exit')
        log.info(`Inside People Update and ready to fire event`)
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
                IsSensitive: true,
                Language: 'en',
                Value: req.data.name,
                Type: 'String'
              }
            ],
            Recipients: [{ RecipientId: "supportuser1@mycompany.com" },{ RecipientId: "supportuser2@mycompany.com" }]
          })

        //const messaging = await cds.connect.to('messaging')
        await this.emit('People.Changed.v1', req.data)
    }) 
})