'use strict'

const cds = require('@sap/cds')
const LOG = cds.log('scheduled')

/** Deterministically pick one show by seed (round-robin). Pure + exported for unit tests. */
function pickFeaturedShow(shows, seed) {
  if (!shows || shows.length === 0) return undefined
  return shows[seed % shows.length]
}

/** Attach the scheduled featured-show rotation to an existing service instance. */
function register(srv) {
  const { Show } = srv.entities
  const { SELECT } = cds.ql

  // Handle the scheduled event: rotate the featured show and emit a domain event.
  srv.on('rotateFeaturedShow', async req => {
    const shows = await SELECT.from(Show).columns('ID', 'title')
    // Rotate based on elapsed minutes so each scheduled tick features a different show.
    const seed = req.data?.tick ?? Math.floor(Date.now() / 60000)
    const featured = pickFeaturedShow(shows, seed)
    if (!featured) return LOG.warn('No shows to feature')
    LOG.info('Featured show rotated to', featured.title, featured.ID)
    await srv.emit('Show.Refreshed.v1', { ID: featured.ID })
  })

  // Register a named singleton schedule over the outbox (CAP 10 Event Queues scheduling API).
  cds.once('served', async () => {
    try {
      await srv.schedule('rotateFeaturedShow', {}).every('10m').as('featured-show-rotation')
      LOG.info('Scheduled featured-show-rotation every 10m')
    } catch (e) {
      LOG.warn('Could not register schedule:', e.message)
    }
  })
}

module.exports = { pickFeaturedShow, register }
