'use strict'

// SSE bridge: exposes CAP domain events at GET /events/stream as a
// text/event-stream so the galaxy app's EventSource can consume them live.
//
// Subscribes to the messaging service (file-based-messaging in dev/hybrid,
// enterprise-messaging in production) and fans each event out to every open
// browser connection. Guarded end-to-end so a failure degrades to a warning
// and never takes a service down (mirrors srv/scheduled.js).

const cds = require('@sap/cds')
const LOG = cds.log('sse')

// Domain events we surface, keyed by the emitting service. Subscribing to the
// service directly (rather than the messaging broker) works identically across
// all profiles — the broker composes prefixed topics like
// "StarWarsPeople.People.Changed.v1", which a bare topic name would miss.
const SUBSCRIPTIONS = [
  { service: 'StarWarsPeople', event: 'People.Changed.v1' },
  { service: 'StarWarsShow', event: 'Show.Refreshed.v1' },
]

// Client-facing topic list (bare event names).
const TOPICS = SUBSCRIPTIONS.map((s) => s.event)

// Open SSE client responses.
const clients = new Set()

function writeFrame(res, event, data) {
  res.write(`event: ${event}\n`)
  res.write(`data: ${JSON.stringify(data ?? {})}\n\n`)
}

function broadcast(event, data) {
  for (const res of clients) {
    try { writeFrame(res, event, data) } catch { clients.delete(res) }
  }
}

// Attach the HTTP route during bootstrap.
cds.on('bootstrap', (app) => {
  app.get('/events/stream', (req, res) => {
    res.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    })
    res.flushHeaders?.()
    writeFrame(res, 'connected', { at: new Date().toISOString(), topics: TOPICS })

    clients.add(res)
    // Heartbeat keeps proxies from closing an idle connection.
    const ping = setInterval(() => { try { res.write(': ping\n\n') } catch { /* closed */ } }, 25000)
    req.on('close', () => { clearInterval(ping); clients.delete(res) })
  })
  LOG.info('SSE endpoint registered at /events/stream')
})

// Subscribe to each emitting service once everything is up.
cds.once('served', async () => {
  for (const { service, event } of SUBSCRIPTIONS) {
    try {
      const srv = await cds.connect.to(service)
      srv.on(event, (msg) => {
        LOG.info('Relaying event', event)
        broadcast(event, msg.data)
      })
    } catch (e) {
      LOG.warn(`Could not subscribe to ${service}.${event}:`, e.message)
    }
  }
  LOG.info('Subscribed to service events:', TOPICS.join(', '))
})

// Exported for unit testing the pure helpers.
module.exports = { broadcast, writeFrame, clients, TOPICS, SUBSCRIPTIONS }
