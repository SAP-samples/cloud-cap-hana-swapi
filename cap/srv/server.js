// Serves a Swagger UI with API definitions either created on the fly
// or loaded from file system.
//
// Needs @sap/cds-dk >= 3.3.0 installed
const cds_swagger = require ('cds-swagger-ui-express')
const cds = require('@sap/cds')
let app

// SSE bridge for the galaxy showcase app (/events/stream). Guarded so a
// missing/broken module degrades to a warning instead of taking the server down.
try {
  require('./events-stream')
} catch (e) {
  cds.log('sse').warn('SSE bridge not loaded:', e.message)
}

cds
  .on('bootstrap', _app => {
    app = _app
    app.use (cds_swagger()) 

  })
  .on('serving', service => {
     const apiPath = '/api-docs' + service.path
    console.log(`[Open API] - serving ${service.name} at ${apiPath}`)
    addLinkToGraphQl(service)
    addLinkToRest(service) 

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

function addLinkToRest(service) {
  const provider = (entity) => {
    if (!service._adapters.rest) return //no Rest Adapter Configured
    if(entity){
      return { href: `/rest/${service.name}/${entity}`, name: 'REST', title: 'Show in Plain REST' }
    }else{
      return { href: `/rest/${service.name}`, name: 'REST', title: 'Show in Plain REST' }
    }

  }
  // Needs @sap/cds >= 4.4.0
  service.$linkProviders ? service.$linkProviders.push(provider) : service.$linkProviders = [provider]
}

module.exports = cds.server