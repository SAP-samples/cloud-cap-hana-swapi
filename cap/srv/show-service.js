'use strict'

const cds = require('@sap/cds')

module.exports = cds.service.impl(function () {

    // CAP 10 Event Queues scheduling showcase — see srv/scheduled.js.
    // To disable scheduling, remove THIS line. Guarded so a missing/broken
    // scheduled.js degrades to a warning instead of taking down this service.
    try {
        require('./scheduled').register(this)
    } catch (e) {
        cds.log('scheduled').warn('Scheduling showcase not loaded:', e.message)
    }

    // Populate the virtual edit_url field after every Media READ.
    // Directs the user to the real Film/Show webapps using deep-link URLs.
    this.after('READ', 'Media', results => {
        for (const m of [].concat(results)) {
            m.edit_url = m.media_type === 'FILM'
                ? `/film/webapp/index.html#star-wars-film&/Film(ID=${m.ID},IsActiveEntity=true)`
                : `/show/webapp/index.html#star-wars-show&/Show(ID=${m.ID},IsActiveEntity=true)`
        }
    })

})
