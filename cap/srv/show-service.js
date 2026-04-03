'use strict'

const cds = require('@sap/cds')

module.exports = cds.service.impl(function () {

    // Populate the virtual edit_url field after every Media READ.
    // Directs the user to the Fiori Preview for the appropriate service.
    // Note: /$fiori-preview/ is a CAP dev tool endpoint — not available in production.
    this.after('READ', 'Media', results => {
        for (const m of [].concat(results)) {
            m.edit_url = m.media_type === 'FILM'
                ? '/$fiori-preview/StarWarsFilm/Film#preview-app'
                : '/$fiori-preview/StarWarsShow/Show#preview-app'
        }
    })

})
