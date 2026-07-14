import { describe, it, expect } from 'vitest'
import { buildQuery, entityUrl } from '../src/api/odata.js'
import { buildBody } from '../src/api/graphql.js'
import { distil } from '../src/api/model.js'

describe('odata.buildQuery', () => {
  it('returns empty string with no options', () => {
    expect(buildQuery()).toBe('')
    expect(buildQuery({})).toBe('')
  })

  it('serializes select/expand arrays as comma lists', () => {
    const qs = buildQuery({ select: ['ID', 'name'], expand: ['films', 'planets'] })
    expect(qs).toContain('%24select=ID%2Cname')
    expect(qs).toContain('%24expand=films%2Cplanets')
  })

  it('adds paging and count', () => {
    const qs = buildQuery({ top: 20, skip: 40, count: true })
    expect(qs).toContain('%24top=20')
    expect(qs).toContain('%24skip=40')
    expect(qs).toContain('%24count=true')
  })
})

describe('odata.entityUrl', () => {
  it('builds a service/entity path with query', () => {
    expect(entityUrl('StarWarsPeople', 'People', { top: 5 }))
      .toBe('/odata/v4/StarWarsPeople/People?%24top=5')
  })
  it('omits query when no options', () => {
    expect(entityUrl('StarWarsFilm', 'Film')).toBe('/odata/v4/StarWarsFilm/Film')
  })
})

describe('graphql.buildBody', () => {
  it('includes only query when no variables', () => {
    expect(buildBody('{ x }')).toEqual({ query: '{ x }' })
  })
  it('includes variables when provided', () => {
    expect(buildBody('q', { a: 1 })).toEqual({ query: 'q', variables: { a: 1 } })
  })
  it('omits empty variables object', () => {
    expect(buildBody('q', {})).toEqual({ query: 'q' })
  })
})

describe('model.distil', () => {
  it('extracts entities and association edges', () => {
    const csn = {
      definitions: {
        'my.Film': {
          kind: 'entity',
          elements: {
            ID: { type: 'cds.UUID' },
            people: { type: 'cds.Association', target: 'my.Film2People' },
          },
        },
        'my.Film2People': {
          kind: 'entity',
          elements: {
            film: { type: 'cds.Association', target: 'my.Film' },
            people: { type: 'cds.Association', target: 'my.People' },
          },
        },
        'my.SomeService': { kind: 'service' },
      },
    }
    const { entities, edges } = distil(csn)
    expect(entities).toEqual(['my.Film', 'my.Film2People'])
    expect(edges).toContainEqual({ from: 'my.Film', to: 'my.Film2People', name: 'people' })
    expect(edges).toHaveLength(3)
  })

  it('handles empty/missing definitions', () => {
    expect(distil({})).toEqual({ entities: [], edges: [] })
    expect(distil(null)).toEqual({ entities: [], edges: [] })
  })
})
