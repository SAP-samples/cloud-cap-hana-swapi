'use strict'

// Serves the built galaxy app (app/galaxy/dist) at /galaxy/.
//
// Under `cds watch`, CAP's native Vite integration installs its own dev
// middleware for /galaxy (with HMR) ahead of this one, so Vite wins and this
// static mount is never reached. Under `cds serve` / a deployed runtime there
// is no Vite server, so this static build is what responds. Registering it
// unconditionally is therefore safe: it's a fallback, not an override.
// Guarded so a missing build degrades to a warning rather than a crash.

const cds = require('@sap/cds')
const fs = require('fs')
const path = require('path')
const express = require('express')

const LOG = cds.log('galaxy')

cds.on('bootstrap', (app) => {
  const dist = path.join(__dirname, '..', 'app', 'galaxy', 'dist')
  const indexHtml = path.join(dist, 'index.html')
  if (!fs.existsSync(indexHtml)) {
    LOG.warn('No built galaxy app at app/galaxy/dist — run `npm run build` in app/galaxy. Skipping static mount.')
    return
  }
  // Explicit index routes first so the built index.html wins over CAP's
  // source app-folder serving; then static for the hashed asset bundles.
  const sendIndex = (_req, res) => res.sendFile(indexHtml)
  app.get('/galaxy', sendIndex)
  app.get('/galaxy/', sendIndex)
  app.get('/galaxy/index.html', sendIndex)
  app.use('/galaxy', express.static(dist))
  LOG.info('Static galaxy build available at /galaxy/ (Vite dev middleware overrides this under cds watch)')
})

module.exports = {}
