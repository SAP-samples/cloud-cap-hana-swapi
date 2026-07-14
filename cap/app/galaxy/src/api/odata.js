// Thin OData v4 client. All reads go through here so views never touch fetch.
// Service names map to CAP service paths, e.g. StarWarsPeople → /odata/v4/StarWarsPeople.

const ODATA_ROOT = '/odata/v4'

/**
 * Build an OData query string from an options object.
 * Exported for unit testing the URL construction independent of fetch.
 */
export function buildQuery({ select, expand, filter, orderby, top, skip, count } = {}) {
  const params = new URLSearchParams()
  if (select) params.set('$select', Array.isArray(select) ? select.join(',') : select)
  if (expand) params.set('$expand', Array.isArray(expand) ? expand.join(',') : expand)
  if (filter) params.set('$filter', filter)
  if (orderby) params.set('$orderby', Array.isArray(orderby) ? orderby.join(',') : orderby)
  if (top != null) params.set('$top', String(top))
  if (skip != null) params.set('$skip', String(skip))
  if (count) params.set('$count', 'true')
  const qs = params.toString()
  return qs ? '?' + qs : ''
}

export function entityUrl(service, entity, opts) {
  return `${ODATA_ROOT}/${service}/${entity}${buildQuery(opts)}`
}

/** Read a list; returns { value, count }. Throws on non-2xx with a useful message. */
export async function list(service, entity, opts = {}) {
  const res = await fetch(entityUrl(service, entity, opts), {
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body?.error?.message || `${res.status} ${res.statusText}`)
  }
  const data = await res.json()
  return { value: data.value ?? [], count: data['@odata.count'] }
}

/** Invoke a bound action via POST, e.g. rename on People(<ID>). */
export async function action(service, entity, key, name, body = {}) {
  const res = await fetch(`${ODATA_ROOT}/${service}/${entity}(${key})/${name}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || `${res.status} ${res.statusText}`)
  }
  return res.json()
}
