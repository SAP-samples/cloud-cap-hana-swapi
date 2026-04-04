'use strict'

const cds = require('@sap/cds')

module.exports = cds.service.impl(function () {

    // Populate the virtual edit_url field after every Media READ.
    // Directs the user to the real Film/Show webapps using deep-link URLs.
    this.after('READ', 'Media', results => {
        for (const m of [].concat(results)) {
            m.edit_url = m.media_type === 'FILM'
                ? `/film/webapp/index.html#/Film(${m.ID})`
                : `/show/webapp/index.html#/Show(${m.ID})`
        }
    })

})
