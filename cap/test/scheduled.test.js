'use strict'

const { describe, it } = require('node:test')
const assert = require('node:assert/strict')
const { pickFeaturedShow } = require('../srv/scheduled')

describe('Scheduled featured-show rotation', () => {
  const shows = [{ ID: 'a' }, { ID: 'b' }, { ID: 'c' }]

  it('picks a deterministic show for a given seed', () => {
    assert.equal(pickFeaturedShow(shows, 0).ID, 'a')
    assert.equal(pickFeaturedShow(shows, 1).ID, 'b')
    assert.equal(pickFeaturedShow(shows, 4).ID, 'b') // wraps: 4 % 3 = 1
  })

  it('returns undefined for an empty list', () => {
    assert.equal(pickFeaturedShow([], 0), undefined)
  })
})
