// Serves a Swagger UI with API definitions either created on the fly
// or loaded from file system.
//
// Needs @sap/cds-dk >= 3.3.0 installed
const cds_swagger = require ('cds-swagger-ui-express')
//const swaggerUi = require('swagger-ui-express')
const cds = require('@sap/cds')
const cors = require('cors')
const proxy = require('@cap-js-community/odata-v2-adapter')


let app

cds
  .on('bootstrap', _app => {
    app = _app
    app.use(cors())  // allow to be called from e.g. editor.swagger.io

    //OData V2
    app.use(proxy())
    app.use (cds_swagger()) 

  })
  .on('serving', service => {
     const apiPath = '/api-docs' + service.path
    console.log(`[Open API] - serving ${service.name} at ${apiPath}`)
    addLinkToGraphQl(service) 

    app.use('/model/', async (req, res) => {
      const csn = await cds.load('db')
      const model = cds.reflect(csn)
      res.type('json')
      res.send(JSON.stringify(model))
    })
  })

function addLinkToGraphQl(service) {
  const provider = (entity) => {
    if (entity) return // avoid link on entity level, looks too messy
    return { href: 'graphql', name: 'GraphQl', title: 'Show in GraphQL' }
  }
  // Needs @sap/cds >= 4.4.0
  service.$linkProviders ? service.$linkProviders.push(provider) : service.$linkProviders = [provider]
}

module.exports = cds.server