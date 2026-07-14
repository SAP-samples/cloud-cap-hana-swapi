// Loads the compiled CSN model from CAP's /model/ endpoint and distils it into
// a lightweight entity+association graph the Relationship Graph view can render
// without hardcoding the schema.

/**
 * Extract entities and their associations from a CSN definitions object.
 * Exported for unit testing against a fixture CSN.
 * @returns {{ entities: string[], edges: {from:string,to:string,name:string}[] }}
 */
export function distil(csn) {
  const defs = csn?.definitions ?? {}
  const entities = []
  const edges = []
  for (const [name, def] of Object.entries(defs)) {
    if (def.kind !== 'entity') continue
    entities.push(name)
    for (const [ename, el] of Object.entries(def.elements ?? {})) {
      if ((el.type === 'cds.Association' || el.type === 'cds.Composition') && el.target) {
        edges.push({ from: name, to: el.target, name: ename })
      }
    }
  }
  return { entities, edges }
}

/** Fetch and distil the domain model. */
export async function loadModel() {
  const res = await fetch('/model/', { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`Model load failed: ${res.status} ${res.statusText}`)
  return distil(await res.json())
}
