<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { list } from '../api/odata.js'

const state = ref('loading')
const errorMsg = ref('')
const canvas = ref(null)
const wrap = ref(null)
const hover = ref(null) // { label, year, x, y }

let items = []      // { year, label, kind }
let stars = []      // parallax starfield
let raf = 0
let ctx, dpr, W, H
let offsetX = 0     // scroll position along the timeline
let dragging = false, lastX = 0

const KIND_COLOR = { film: '#fbbf24', episode: '#60a5fa' }

async function loadData() {
  const out = []
  const films = await list('StarWarsFilm', 'Film', { select: ['ID', 'title', 'release_date'], top: 100 })
  for (const f of films.value) {
    const y = f.release_date ? new Date(f.release_date).getFullYear() : null
    if (y) out.push({ year: y, label: f.title, kind: 'film' })
  }
  try {
    const eps = await list('StarWarsShow', 'Episode', { select: ['ID', 'title', 'air_date'], top: 500 })
    for (const e of eps.value) {
      const y = e.air_date ? new Date(e.air_date).getFullYear() : null
      if (y) out.push({ year: y, label: e.title, kind: 'episode' })
    }
  } catch { /* episodes optional */ }
  out.sort((a, b) => a.year - b.year)
  return out
}

function resize() {
  dpr = window.devicePixelRatio || 1
  W = wrap.value.clientWidth
  H = wrap.value.clientHeight
  canvas.value.width = W * dpr
  canvas.value.height = H * dpr
  canvas.value.style.width = W + 'px'
  canvas.value.style.height = H + 'px'
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function initStars() {
  stars = Array.from({ length: 160 }, () => ({
    x: Math.random() * W * 3, y: Math.random() * H,
    r: Math.random() * 1.6 + 0.3, z: Math.random() * 0.8 + 0.2, // z = parallax depth
  }))
}

// Layout maps year → x. PX_PER_YEAR spacing, scrollable via offsetX.
const PX_PER_YEAR = 90
let minYear = 0
function yearToX(year) { return 80 + (year - minYear) * PX_PER_YEAR - offsetX }

function draw() {
  ctx.clearRect(0, 0, W, H)
  // Background gradient
  const g = ctx.createLinearGradient(0, 0, 0, H)
  g.addColorStop(0, '#0b1026'); g.addColorStop(1, '#05070f')
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)

  // Parallax starfield — deeper stars move slower with the scroll.
  ctx.fillStyle = '#cbd5e1'
  for (const s of stars) {
    const sx = ((s.x - offsetX * s.z) % (W + 40) + (W + 40)) % (W + 40) - 20
    ctx.globalAlpha = 0.3 + s.z * 0.5
    ctx.beginPath(); ctx.arc(sx, s.y, s.r, 0, Math.PI * 2); ctx.fill()
  }
  ctx.globalAlpha = 1

  // Baseline
  const midY = H * 0.62
  ctx.strokeStyle = 'rgba(148,163,184,0.4)'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(0, midY); ctx.lineTo(W, midY); ctx.stroke()

  hover.value = null
  const mx = mouse.x, my = mouse.y
  for (const it of items) {
    const x = yearToX(it.year)
    if (x < -20 || x > W + 20) continue
    const isFilm = it.kind === 'film'
    const r = isFilm ? 7 : 4
    const y = midY + (isFilm ? -0 : 0)
    // tick
    ctx.strokeStyle = 'rgba(148,163,184,0.5)'
    ctx.beginPath(); ctx.moveTo(x, midY - 10); ctx.lineTo(x, midY + 10); ctx.stroke()
    // dot
    const near = Math.abs(mx - x) < 10 && Math.abs(my - y) < 14
    ctx.fillStyle = KIND_COLOR[it.kind]
    ctx.globalAlpha = near ? 1 : 0.85
    ctx.beginPath(); ctx.arc(x, y, near ? r + 3 : r, 0, Math.PI * 2); ctx.fill()
    ctx.globalAlpha = 1
    if (near) hover.value = { label: it.label, year: it.year, x, y, kind: it.kind }
  }

  // Year labels every 5 years
  ctx.fillStyle = 'rgba(203,213,225,0.7)'; ctx.font = '11px system-ui'
  for (let yr = minYear; yr <= maxYear; yr++) {
    if (yr % 5 !== 0) continue
    const x = yearToX(yr)
    if (x < 0 || x > W) continue
    ctx.fillText(String(yr), x - 12, midY + 28)
  }

  raf = requestAnimationFrame(draw)
}

const mouse = { x: -1, y: -1 }
let maxYear = 0

function onMove(e) {
  const rect = canvas.value.getBoundingClientRect()
  mouse.x = e.clientX - rect.left
  mouse.y = e.clientY - rect.top
  if (dragging) { offsetX = Math.max(0, offsetX - (e.clientX - lastX)); lastX = e.clientX }
}
function onDown(e) { dragging = true; lastX = e.clientX }
function onUp() { dragging = false }
function onWheel(e) { offsetX = Math.max(0, offsetX + e.deltaY); e.preventDefault() }

onMounted(async () => {
  try {
    items = await loadData()
    if (!items.length) { state.value = 'empty'; return }
    minYear = items[0].year; maxYear = items[items.length - 1].year
    state.value = 'ready'
    await Promise.resolve()
    ctx = canvas.value.getContext('2d')
    resize(); initStars()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(draw)
  } catch (e) {
    errorMsg.value = e.message; state.value = 'error'
  }
})
onBeforeUnmount(() => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) })
function retry() { state.value = 'loading'; location.reload() }
</script>

<template>
  <div class="tl">
    <ui5-title level="H3">Cinematic Timeline</ui5-title>
    <ui5-text>Films (gold) and episodes (blue) by release year. Drag or scroll to pan through the galaxy's history.</ui5-text>

    <ui5-busy-indicator v-if="state === 'loading'" active size="L" style="display:block;margin:3rem auto"></ui5-busy-indicator>
    <ui5-illustrated-message v-else-if="state === 'error'" name="UnableToLoad" :subtitle-text="errorMsg">
      <ui5-button slot="actions" design="Emphasized" @click="retry">Retry</ui5-button>
    </ui5-illustrated-message>
    <ui5-illustrated-message v-else-if="state === 'empty'" name="NoData" subtitle-text="No dated films or episodes."></ui5-illustrated-message>

    <div v-show="state === 'ready'" ref="wrap" class="tl__wrap">
      <canvas ref="canvas"
              @mousemove="onMove" @mousedown="onDown" @mouseup="onUp" @mouseleave="onUp" @wheel="onWheel"></canvas>
      <div v-if="hover" class="tl__tip" :style="{ left: hover.x + 'px', top: (hover.y - 12) + 'px' }">
        <strong>{{ hover.label }}</strong><br />{{ hover.year }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.tl { height: 100%; display: flex; flex-direction: column; gap: 0.5rem; }
.tl__wrap { position: relative; flex: 1; min-height: 0; border-radius: 8px; overflow: hidden; cursor: grab; }
.tl__wrap:active { cursor: grabbing; }
canvas { display: block; }
.tl__tip {
  position: absolute; transform: translate(-50%, -100%); pointer-events: none;
  background: rgba(15,23,42,0.95); color: #f8fafc; padding: 0.35rem 0.6rem;
  border-radius: 6px; font-size: 12px; white-space: nowrap; border: 1px solid rgba(148,163,184,0.3);
}
</style>
