'use strict'

const { describe, it } = require('node:test')
const assert = require('node:assert/strict')

const { extractSeasonLinks } = require('../index')

describe('extractSeasonLinks', () => {
    it('returns [] for empty wikitext', () => {
        assert.deepEqual(extractSeasonLinks('', 'Star Wars: Ahsoka'), [])
    })

    it('returns [] for null wikitext', () => {
        assert.deepEqual(extractSeasonLinks(null, 'Star Wars: Ahsoka'), [])
    })

    it('extracts matching season link for own show', () => {
        const wikitext = 'See [[Ahsoka Season 1|first season]] for details.'
        const result = extractSeasonLinks(wikitext, 'Star Wars: Ahsoka')
        assert.ok(result.includes('Ahsoka Season 1'), 'should include own season page')
    })

    it('excludes season links from other shows', () => {
        const wikitext = '[[Ahsoka Season 1|first]] and [[The Mandalorian Season Two|season two]]'
        const result = extractSeasonLinks(wikitext, 'Star Wars: Ahsoka')
        assert.ok(result.includes('Ahsoka Season 1'), 'own season included')
        assert.ok(!result.includes('The Mandalorian Season Two'), 'other show excluded')
    })

    it('excludes Resistance Clone Wars cross-reference', () => {
        const wikitext = '[[Star Wars Resistance Season One|One]] and [[The Clone Wars: Season Seven|revival]]'
        const result = extractSeasonLinks(wikitext, 'Star Wars Resistance')
        assert.ok(result.includes('Star Wars Resistance Season One'))
        assert.ok(!result.includes('The Clone Wars: Season Seven'))
    })

    it('excludes DVD/complete season pages via blocklist', () => {
        const wikitext = '[[Star Wars Resistance Season One|One]] [[Star Wars Resistance: Complete Season One|DVD]]'
        const result = extractSeasonLinks(wikitext, 'Star Wars Resistance')
        assert.ok(result.includes('Star Wars Resistance Season One'))
        assert.ok(!result.includes('Star Wars Resistance: Complete Season One'))
    })

    it('excludes Mandalorian season links from Boba Fett show page', () => {
        const wikitext = '[[The Mandalorian Season Two|second season]] and [[The Mandalorian Season Three|third season]]'
        const result = extractSeasonLinks(wikitext, 'Star Wars: The Book of Boba Fett')
        assert.deepEqual(result, [])
    })

    it('deduplicates repeated season links', () => {
        const wikitext = '[[Ahsoka Season 1|first]] mentioned again [[Ahsoka Season 1|S1]]'
        const result = extractSeasonLinks(wikitext, 'Star Wars: Ahsoka')
        assert.equal(result.length, 1)
        assert.equal(result[0], 'Ahsoka Season 1')
    })

    it('extracts sub-series links from ==Seasons== section even without "season" in title', () => {
        const wikitext = `
==Seasons==
{|class="wikitable"
|-
|[[Star Wars: Tales of the Jedi (television series)|''Tales of the Jedi'']]
|-
|[[Star Wars: Tales of the Empire|''Tales of the Empire'']]
|-
|}
`
        const result = extractSeasonLinks(wikitext, 'Tales')
        assert.ok(result.includes('Star Wars: Tales of the Jedi (television series)'), 'Tales of the Jedi included')
        assert.ok(result.includes('Star Wars: Tales of the Empire'), 'Tales of the Empire included')
    })

    it('does not include File: links from ==Seasons== section', () => {
        const wikitext = `
==Seasons==
{|class="wikitable"
|-
|[[File:TalesofJedi.png|150px]]
|[[Star Wars: Tales of the Jedi (television series)|''Tales of the Jedi'']]
|}
`
        const result = extractSeasonLinks(wikitext, 'Tales')
        assert.ok(!result.some(t => t.startsWith('File:')), 'no File: links')
        assert.ok(result.includes('Star Wars: Tales of the Jedi (television series)'))
    })
})

describe('extractSeasonLinks — show pages without season sub-pages', () => {
    it('returns [] for Boba Fett show page wikitext (no season sub-page links)', () => {
        const wikitext = `
==Episodes==
{|{{Prettytable}}
|-
|"[[Chapter 1: Stranger in a Strange Land]]"
|-
|"[[Chapter 2: The Tribes of Tatooine]]"
|}
`
        const result = extractSeasonLinks(wikitext, 'Star Wars: The Book of Boba Fett')
        assert.deepEqual(result, [])
    })
})
