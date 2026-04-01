'use strict'

const { describe, it } = require('node:test')
const assert = require('node:assert/strict')

// Will fail until normalize.js exists
const {
    normalizeString,
    normalizeDate,
    normalizeInteger,
    resolveField,
} = require('../normalize')

describe('normalizeString', () => {
    it('returns null for null', () => assert.equal(normalizeString(null), null))
    it('returns null for undefined', () => assert.equal(normalizeString(undefined), null))
    it('returns null for empty string', () => assert.equal(normalizeString(''), null))
    it('returns null for "unknown"', () => assert.equal(normalizeString('unknown'), null))
    it('returns null for "Unknown"', () => assert.equal(normalizeString('Unknown'), null))
    it('returns null for "n/a"', () => assert.equal(normalizeString('n/a'), null))
    it('returns null for "N/A"', () => assert.equal(normalizeString('N/A'), null))
    it('returns null for "none"', () => assert.equal(normalizeString('none'), null))
    it('returns null for "null"', () => assert.equal(normalizeString('null'), null))
    it('trims whitespace', () => assert.equal(normalizeString('  foo  '), 'foo'))
    it('returns valid string unchanged', () => assert.equal(normalizeString('George Lucas'), 'George Lucas'))
})

describe('normalizeDate', () => {
    it('returns null for null', () => assert.equal(normalizeDate(null), null))
    it('returns null for "unknown"', () => assert.equal(normalizeDate('unknown'), null))
    it('parses ISO date', () => assert.equal(normalizeDate('1977-05-25'), '1977-05-25'))
    it('parses full datetime', () => assert.equal(normalizeDate('1977-05-25T00:00:00Z'), '1977-05-25'))
    it('parses Wookieepedia date string', () => assert.equal(normalizeDate('May 25, 1977'), '1977-05-25'))
    it('returns null for unparseable string', () => assert.equal(normalizeDate('not-a-date'), null))
})

describe('normalizeInteger', () => {
    it('returns null for null', () => assert.equal(normalizeInteger(null), null))
    it('returns null for "unknown"', () => assert.equal(normalizeInteger('unknown'), null))
    it('parses integer string', () => assert.equal(normalizeInteger('3'), 3))
    it('parses actual integer', () => assert.equal(normalizeInteger(3), 3))
    it('returns null for non-numeric', () => assert.equal(normalizeInteger('three'), null))
})

describe('resolveField', () => {
    const infobox = {
        director: 'George Lucas',
        producers: 'Rick McCallum',
        airdate: '1977-05-25'
    }

    const ALIASES = {
        director: ['director', 'directors', 'directed_by'],
        producer: ['producer', 'producers', 'produced_by'],
        release_date: ['release_date', 'release', 'released', 'airdate', 'first_aired'],
    }

    it('finds field by primary name', () => {
        assert.equal(resolveField(infobox, 'director', ALIASES.director), 'George Lucas')
    })
    it('finds field by alias', () => {
        assert.equal(resolveField(infobox, 'producer', ALIASES.producer), 'Rick McCallum')
    })
    it('finds field by second alias', () => {
        assert.equal(resolveField(infobox, 'release_date', ALIASES.release_date), '1977-05-25')
    })
    it('returns null when no alias matches', () => {
        assert.equal(resolveField(infobox, 'network', ['network', 'broadcaster']), null)
    })
})
