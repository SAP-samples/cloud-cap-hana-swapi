<script setup>
import { ref, onMounted, onBeforeUnmount, shallowRef, watch } from 'vue'
import { loadModel } from '../api/model.js'
import { list } from '../api/odata.js'
import { createForceGraph } from '../lib/forceGraph.js'

// State machine: loading | error | ready (+ empty handled inline)
const state = ref('loading')
const errorMsg = ref('')
const container = ref(null)
const graph = shallowRef(null)

// Side panel
const selected = ref(null)
const sampleRows = ref([])
const sampleLoading = ref(false)

// Type filter + link strength
const NAMESPACE = 'star.wars.'
const allTypes = ref([])
const activeTypes = ref(new Set())
let full = { nodes: [], links: [] }
const linkDist = ref(80)

// Map CSN entity name → the OData service+entity to sample from.
// The core entities are exposed by their own StarWars<Name> services.
const SERVICE_FOR = {
  Film: ['StarWarsFilm', 'Film'],
  People: ['StarWarsPeople', 'People'],
  Planet: ['StarWarsPlanet', 'Planet'],
  Species: ['StarWarsSpecies', 'Species'],
  Starship: ['StarWarsStarship', 'Starship'],
  Vehicles: ['StarWarsVehicle', 'Vehicles'],
  Show: ['StarWarsShow', 'Show'],
  Episode: ['StarWarsShow', 'Episode'],
}

function shortName(id) { return id.replace(NAMESPACE, '') }

function buildGraph(model) {
  // Keep only star.wars.* entities; build nodes + dedup edges.
  const keep = model.entities.filter((e) => e.startsWith(NAMESPACE))
  const keepSet = new Set(keep)
  const nodes = keep.map((id) => ({ id, label: shortName(id), type: shortName(id) }))
  const seen = new Set()
  const links = []
  for (const e of model.edges) {
    if (!keepSet.has(e.from) || !keepSet.has(e.to)) continue
    const k = [e.from, e.to].sort().join('|')
    if (seen.has(k)) continue
    seen.add(k)
    links.push({ source: e.from, target: e.to, name: e.name })
  }
  return { nodes, links }
}

function applyFilter() {
  const active = activeTypes.value
  const nodes = full.nodes.filter((n) => active.has(n.type))
  const ids = new Set(nodes.map((n) => n.id))
  const links = full.links.filter((l) => {
    const s = l.source.id ?? l.source, t = l.target.id ?? l.target
    return ids.has(s) && ids.has(t)
  })
  graph.value?.update({ nodes: nodes.map((n) => ({ ...n })), links: links.map((l) => ({ ...l })) })
}

function toggleType(type) {
  const next = new Set(activeTypes.value)
  next.has(type) ? next.delete(type) : next.add(type)
  activeTypes.value = next
  applyFilter()
}

watch(linkDist, (d) => graph.value?.setLinkStrength(Number(d)))

async function onNodeClick(node) {
  selected.value = node
  sampleRows.value = []
  const map = SERVICE_FOR[node.type]
  if (!map) return
  sampleLoading.value = true
  try {
    const { value } = await list(map[0], map[1], { top: 5 })
    sampleRows.value = value
  } catch (e) {
    sampleRows.value = [{ error: e.message }]
  } finally {
    sampleLoading.value = false
  }
}

function labelFor(row) {
  return row.name || row.title || row.ID || JSON.stringify(row).slice(0, 40)
}

onMounted(async () => {
  try {
    const model = await loadModel()
    full = buildGraph(model)
    if (!full.nodes.length) { state.value = 'empty'; return }
    allTypes.value = [...new Set(full.nodes.map((n) => n.type))].sort()
    activeTypes.value = new Set(allTypes.value)
    state.value = 'ready'
    await Promise.resolve() // let the DOM paint the container
    graph.value = createForceGraph(container.value, { onNodeClick })
    applyFilter()
  } catch (e) {
    errorMsg.value = e.message
    state.value = 'error'
  }
})

onBeforeUnmount(() => graph.value?.destroy())

function retry() { state.value = 'loading'; location.reload() }
</script>

<template>
  <div class="graph">
    <ui5-title level="H3">Relationship Graph</ui5-title>
    <ui5-text>Every star.wars entity and its associations, as a live force simulation. Drag nodes, scroll to zoom, click a node to sample its rows.</ui5-text>

    <ui5-busy-indicator v-if="state === 'loading'" active size="L" style="display:block;margin:3rem auto"></ui5-busy-indicator>

    <ui5-illustrated-message v-else-if="state === 'error'" name="UnableToLoad" :subtitle-text="errorMsg">
      <ui5-button slot="actions" design="Emphasized" @click="retry">Retry</ui5-button>
    </ui5-illustrated-message>

    <ui5-illustrated-message v-else-if="state === 'empty'" name="NoData"
      subtitle-text="The model contains no entities to graph."></ui5-illustrated-message>

    <template v-else>
      <div class="graph__toolbar">
        <div class="graph__types">
          <ui5-button v-for="t in allTypes" :key="t"
                      :design="activeTypes.has(t) ? 'Emphasized' : 'Transparent'"
                      @click="toggleType(t)">{{ t }}</ui5-button>
        </div>
        <div class="graph__slider">
          <ui5-label>Link distance</ui5-label>
          <ui5-slider min="40" max="200" :value="linkDist"
                      @input="linkDist = $event.target.value" style="width:180px"></ui5-slider>
        </div>
      </div>

      <div class="graph__stage">
        <div ref="container" class="graph__canvas"></div>

        <ui5-card v-if="selected" class="graph__panel">
          <ui5-card-header slot="header" :title-text="selected.label" subtitle-text="Sample rows (top 5)"></ui5-card-header>
          <div class="graph__panel-body">
            <ui5-busy-indicator v-if="sampleLoading" active></ui5-busy-indicator>
            <ui5-list v-else>
              <ui5-li v-for="(row, i) in sampleRows" :key="i">{{ labelFor(row) }}</ui5-li>
              <ui5-li v-if="!sampleRows.length">No sampled rows for this entity.</ui5-li>
            </ui5-list>
          </div>
        </ui5-card>
      </div>
    </template>
  </div>
</template>

<style scoped>
.graph { height: 100%; display: flex; flex-direction: column; gap: 0.5rem; }
.graph__toolbar { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
.graph__types { display: flex; flex-wrap: wrap; gap: 0.25rem; }
.graph__slider { display: flex; align-items: center; gap: 0.5rem; }
.graph__stage { position: relative; flex: 1; min-height: 0; border: 1px solid var(--sapList_BorderColor, #e5e5e5); border-radius: 8px; overflow: hidden; }
.graph__canvas { position: absolute; inset: 0; }
.graph__panel { position: absolute; top: 1rem; right: 1rem; width: 260px; max-height: 80%; overflow: auto; }
.graph__panel-body { padding: 0.5rem; }
</style>
