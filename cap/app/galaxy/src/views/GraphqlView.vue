<script setup>
import { ref, computed } from 'vue'
import { gqlQuery } from '../api/graphql.js'

// CAP exposes each service as a GraphQL field; entities are nested under it,
// each returning { nodes { <fields> } }. We let the user pick fields and
// association sub-selections, then assemble + run the query in one round-trip.
//
// Shape is derived from the CAP GraphQL protocol (service → entity → nodes).
const CATALOG = {
  StarWarsFilm: {
    Film: {
      scalars: ['ID', 'title', 'episode_id', 'director', 'release_date'],
      assocs: { planets: ['ID'], characters: ['ID'] },
    },
  },
  StarWarsPeople: {
    People: {
      scalars: ['ID', 'name', 'birth_year', 'gender', 'height', 'mass'],
      assocs: { homeworld: ['ID', 'name'] },
    },
    Planet: { scalars: ['ID', 'name', 'climate', 'terrain', 'population'], assocs: {} },
  },
  StarWarsShow: {
    Show: { scalars: ['ID', 'title', 'show_type', 'network'], assocs: {} },
    Episode: { scalars: ['ID', 'title', 'season_number', 'episode_number', 'air_date'], assocs: {} },
  },
}

const service = ref('StarWarsPeople')
const entity = ref('People')
const top = ref(5)

const entities = computed(() => Object.keys(CATALOG[service.value]))
const spec = computed(() => CATALOG[service.value][entity.value])

// Selected scalar fields + selected association sub-fields.
const picked = ref(new Set(['ID', 'name']))
const pickedAssoc = ref({}) // { assocName: Set(fields) }

function onServiceChange(e) {
  service.value = e.target.value
  entity.value = Object.keys(CATALOG[service.value])[0]
  resetPicks()
}
function onEntityChange(e) { entity.value = e.target.value; resetPicks() }
function resetPicks() {
  const s = spec.value
  picked.value = new Set(s.scalars.slice(0, 2))
  pickedAssoc.value = {}
}

function toggleScalar(f) {
  const n = new Set(picked.value)
  n.has(f) ? n.delete(f) : n.add(f)
  picked.value = n
}
function toggleAssoc(name, field) {
  const cur = new Set(pickedAssoc.value[name] ?? [])
  cur.has(field) ? cur.delete(field) : cur.add(field)
  pickedAssoc.value = { ...pickedAssoc.value, [name]: cur }
}

// Assemble the GraphQL query string reactively.
const query = computed(() => {
  const scalarFields = [...picked.value]
  const assocFields = Object.entries(pickedAssoc.value)
    .filter(([, set]) => set.size)
    .map(([name, set]) => `      ${name} { ${[...set].join(' ')} }`)
  const selection = [
    ...scalarFields.map((f) => `      ${f}`),
    ...assocFields,
  ].join('\n')
  return `{
  ${service.value} {
    ${entity.value}(top: ${top.value}) {
      nodes {
${selection}
      }
    }
  }
}`
})

const result = ref(null)
const running = ref(false)
const errorMsg = ref('')

async function run() {
  running.value = true
  errorMsg.value = ''
  result.value = null
  try {
    const data = await gqlQuery(query.value)
    result.value = data?.[service.value]?.[entity.value]?.nodes ?? data
  } catch (e) {
    errorMsg.value = e.message
  } finally {
    running.value = false
  }
}
</script>

<template>
  <div class="gql">
    <ui5-title level="H3">GraphQL Explorer</ui5-title>
    <ui5-text>Pick fields and associations, then run one GraphQL request against <code>/graphql</code>. Fiori Elements can't consume GraphQL — this does it with Fiori styling.</ui5-text>

    <div class="gql__controls">
      <ui5-select @change="onServiceChange">
        <ui5-option v-for="s in Object.keys(CATALOG)" :key="s" :selected="s === service">{{ s }}</ui5-option>
      </ui5-select>
      <ui5-select @change="onEntityChange">
        <ui5-option v-for="en in entities" :key="en" :selected="en === entity">{{ en }}</ui5-option>
      </ui5-select>
      <ui5-label>top</ui5-label>
      <ui5-select @change="top = Number($event.target.value)">
        <ui5-option v-for="n in [3,5,10,20]" :key="n" :selected="n === top">{{ n }}</ui5-option>
      </ui5-select>
      <ui5-button design="Emphasized" @click="run">Run query</ui5-button>
    </div>

    <div class="gql__picker">
      <ui5-panel header-text="Scalar fields" fixed>
        <div class="gql__checks">
          <ui5-checkbox v-for="f in spec.scalars" :key="f" :text="f"
                        :checked="picked.has(f)" @change="toggleScalar(f)"></ui5-checkbox>
        </div>
      </ui5-panel>
      <ui5-panel v-if="Object.keys(spec.assocs).length" header-text="Associations" fixed>
        <div v-for="(fields, name) in spec.assocs" :key="name" class="gql__assoc">
          <ui5-label>{{ name }}</ui5-label>
          <ui5-checkbox v-for="f in fields" :key="f" :text="f"
                        :checked="pickedAssoc[name]?.has(f)" @change="toggleAssoc(name, f)"></ui5-checkbox>
        </div>
      </ui5-panel>
    </div>

    <div class="gql__split">
      <div class="gql__pane">
        <ui5-label>Query</ui5-label>
        <pre class="gql__code">{{ query }}</pre>
      </div>
      <div class="gql__pane">
        <ui5-label>Result</ui5-label>
        <ui5-busy-indicator v-if="running" active style="display:block;margin:1rem"></ui5-busy-indicator>
        <ui5-illustrated-message v-else-if="errorMsg" name="UnableToLoad" :subtitle-text="errorMsg"></ui5-illustrated-message>
        <pre v-else-if="result" class="gql__code">{{ JSON.stringify(result, null, 2) }}</pre>
        <ui5-text v-else>Run the query to see results.</ui5-text>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gql { display: flex; flex-direction: column; gap: 0.75rem; }
.gql__controls { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
.gql__picker { display: flex; gap: 1rem; flex-wrap: wrap; }
.gql__checks { display: flex; flex-wrap: wrap; gap: 0.75rem; padding: 0.5rem; }
.gql__assoc { display: flex; align-items: center; gap: 0.75rem; padding: 0.25rem 0.5rem; flex-wrap: wrap; }
.gql__split { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.gql__pane { display: flex; flex-direction: column; gap: 0.25rem; min-width: 0; }
.gql__code {
  background: var(--sapBackgroundColor, #f5f6f7); border: 1px solid var(--sapList_BorderColor, #e5e5e5);
  border-radius: 6px; padding: 0.75rem; overflow: auto; margin: 0;
  font-family: ui-monospace, 'Cascadia Code', monospace; font-size: 12px; max-height: 420px;
}
@media (max-width: 800px) { .gql__split { grid-template-columns: 1fr; } }
</style>
