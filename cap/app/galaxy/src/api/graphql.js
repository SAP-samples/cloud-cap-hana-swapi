// Minimal GraphQL client for CAP's /graphql endpoint.
// CAP exposes services as nested GraphQL types; the Explorer view builds
// query strings dynamically and runs them here.

const GRAPHQL_URL = '/graphql'

/** Build the POST body — exported so tests can assert shape without fetch. */
export function buildBody(query, variables) {
  const body = { query }
  if (variables && Object.keys(variables).length) body.variables = variables
  return body
}

/** Run a GraphQL query. Returns the `data` object; throws on GraphQL errors. */
export async function gqlQuery(query, variables) {
  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(buildBody(query, variables)),
  })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  const json = await res.json()
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join('; '))
  return json.data
}
