<template>
  <div class="crawl-wrapper">
    <!-- ── Cinematic crawl ── -->
    <div class="crawl-scene" ref="crawlScene">
      <canvas ref="starCanvas" class="star-canvas" />
      <div class="crawl-logo" :class="{ visible: logoVisible }">
        STAR WARS
        <div class="crawl-subtitle">CAP API</div>
      </div>
      <div class="crawl-perspective">
        <div class="crawl-content" :class="{ rolling: rolling }">
          <p class="crawl-episode">Episode IV</p>
          <h1 class="crawl-title">A NEW HOPE<br><span>For CAP Developers</span></h1>
          <p>
            It is a period of learning. Rebel developers,
            striking from hidden terminals, have won their
            first victory against the complexity of
            enterprise relationships.
          </p>
          <p>
            During the battle, Rebel spies managed to steal
            secret plans to the Empire's ultimate weapon,
            the SAP HANA database — an armoured data store
            with enough join depth to destroy an entire
            microservice architecture.
          </p>
          <p>
            Pursued by the Empire's sinister agents, the
            Rebels race to master the SAP Cloud Application
            Programming Model and restore freedom to the
            galaxy of enterprise developers...
          </p>
        </div>
      </div>
      <button
        class="crawl-btn"
        :class="{ visible: btnVisible }"
        @click="scrollToCards"
      >
        BEGIN YOUR JOURNEY ↓
      </button>
      <button class="mute-btn" @click="toggleMute" :title="muted ? 'Unmute' : 'Mute'">
        {{ muted ? '🔇' : '🔊' }}
      </button>
    </div>

    <!-- ── Feature cards ── -->
    <div id="feature-cards" class="feature-section">
      <h2 class="feature-heading">Choose Your Path</h2>
      <div class="feature-cards">
        <a href="/cloud-cap-hana-swapi/guide/overview" class="feature-card">
          <div class="card-icon">▲</div>
          <h3>Beginner</h3>
          <p>CDS modeling, OData exploration, domain entities. Start your journey here.</p>
          <span class="card-link">Start Learning →</span>
        </a>
        <a href="/cloud-cap-hana-swapi/guide/learning-path" class="feature-card featured">
          <div class="card-icon">◈</div>
          <h3>Intermediate</h3>
          <p>Service handlers, lifecycle hooks, events, and custom actions.</p>
          <span class="card-link">Go Deeper →</span>
        </a>
        <a href="/cloud-cap-hana-swapi/labs/" class="feature-card">
          <div class="card-icon">⬡</div>
          <h3>Advanced</h3>
          <p>Authorization, testing by layer, profile comparison, and hands-on labs.</p>
          <span class="card-link">Take the Labs →</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'

const { site } = useData()

const logoVisible = ref(false)
const rolling = ref(false)
const btnVisible = ref(false)
const muted = ref(false)
const starCanvas = ref(null)
const crawlScene = ref(null)

let animFrame = null
let synths = []
let themeObserver = null
let ToneLib = null
let MidiLib = null
let isMounted = false

function isDarkMode() {
  return document.documentElement.classList.contains('dark')
}

function midiUrl(dark) {
  const base = (site.value.base || '/').replace(/\/$/, '')
  return dark ? `${base}/imperial-march.mid` : `${base}/jedi-theme.mid`
}

async function stopAudio() {
  synths.forEach(s => { try { s.releaseAll(); s.dispose() } catch {} })
  synths = []
  if (ToneLib) {
    ToneLib.Transport.stop()
    ToneLib.Transport.cancel()
  }
}

async function playMidi(dark) {
  stopAudio()
  if (muted.value || !isMounted) return

  const url = midiUrl(dark)

  let midi
  try {
    midi = await MidiLib.fromUrl(url)
  } catch {
    console.warn('[SWAPI docs] MIDI file not found:', url)
    return
  }

  // Guard again after the async fetch — component may have unmounted by now
  if (!isMounted) return

  const oscType = dark ? 'sawtooth4' : 'triangle8'
  const now = ToneLib.now() + 0.5

  midi.tracks.forEach(track => {
    if (!track.notes.length) return
    const synth = new ToneLib.PolySynth(ToneLib.Synth, {
      oscillator: { type: oscType },
      envelope: { attack: 0.05, decay: 0.3, sustain: 0.4, release: 1.5 },
      volume: -14,
    }).toDestination()
    synths.push(synth)
    track.notes.forEach(note => {
      synth.triggerAttackRelease(note.name, note.duration, note.time + now, note.velocity)
    })
  })
}

// ── Starfield ──────────────────────────────────────────────────────────────

function initStars(canvas) {
  const ctx = canvas.getContext('2d')
  const W = canvas.width = canvas.offsetWidth
  const H = canvas.height = canvas.offsetHeight

  const COUNT = Math.floor((W * H) / 4000)
  const stars = Array.from({ length: COUNT }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.4 + 0.3,
    base: Math.random() * 0.6 + 0.2,
    speed: Math.random() * 0.015 + 0.005,
    phase: Math.random() * Math.PI * 2,
  }))

  let t = 0
  function draw() {
    ctx.clearRect(0, 0, W, H)
    t += 1
    for (const s of stars) {
      const alpha = s.base + Math.sin(t * s.speed + s.phase) * 0.35
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255,255,255,${Math.max(0, Math.min(1, alpha))})`
      ctx.fill()
    }
    animFrame = requestAnimationFrame(draw)
  }
  draw()
}

// ── Lifecycle ──────────────────────────────────────────────────────────────

onMounted(async () => {
  isMounted = true
  setTimeout(() => { logoVisible.value = true }, 500)
  setTimeout(() => { rolling.value = true }, 2000)
  setTimeout(() => { btnVisible.value = true }, 10000)

  if (starCanvas.value) initStars(starCanvas.value)

  // Register click listener on the crawl scene only — not document — so
  // clicks on nav links outside the scene don't trigger audio.
  let audioReady = false
  let pendingPlay = false

  const onFirstClick = () => {
    if (!audioReady) {
      pendingPlay = true
      return
    }
    ToneLib.start().then(() => playMidi(isDarkMode()))
  }
  crawlScene.value?.addEventListener('click', onFirstClick, { once: true })

  // Pre-load modules (onMounted is client-only, SSR-safe)
  const [toneModule, { Midi }] = await Promise.all([
    import('tone'),
    import('@tonejs/midi'),
  ])
  ToneLib = toneModule
  MidiLib = Midi
  audioReady = true

  // If the user clicked while we were loading, play now (best-effort — the
  // AudioContext may still be locked, but most browsers are lenient here)
  if (pendingPlay) {
    ToneLib.start().then(() => playMidi(isDarkMode()))
  }

  // Re-start with correct track when theme toggles
  themeObserver = new MutationObserver(() => {
    if (!muted.value) playMidi(isDarkMode())
  })
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
})

onUnmounted(() => {
  isMounted = false
  if (animFrame) cancelAnimationFrame(animFrame)
  stopAudio()
  themeObserver?.disconnect()
})

// ── Controls ───────────────────────────────────────────────────────────────

function toggleMute() {
  muted.value = !muted.value
  if (muted.value) {
    stopAudio()
  } else {
    ToneLib.start().then(() => playMidi(isDarkMode()))
  }
}

function scrollToCards() {
  document.getElementById('feature-cards')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
/* ── Layout ── */
.crawl-wrapper {
  background: #000;
  color: #f0c040;
  font-family: 'Georgia', serif;
  overflow-x: hidden;
}

/* ── Crawl scene ── */
.crawl-scene {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #000;
}

/* ── Starfield canvas ── */
.star-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

/* ── STAR WARS logo ── */
.crawl-logo {
  position: absolute;
  top: 12%;
  font-size: clamp(2rem, 6vw, 4.5rem);
  font-weight: 900;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #f0c040;
  opacity: 0;
  transition: opacity 1.5s ease;
  z-index: 10;
}
.crawl-logo.visible { opacity: 1; }

.crawl-subtitle {
  font-size: 0.44em;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: #ccc;
  margin-top: 0.8em;
  text-align: center;
}

/* ── 3-D perspective tilt ── */
.crawl-perspective {
  position: absolute;
  bottom: 0;
  width: 60%;
  max-width: 700px;
  height: 70vh;
  perspective: 300px;
  overflow: hidden;
  z-index: 1;
}

.crawl-content {
  position: absolute;
  bottom: -100%;
  width: 100%;
  transform: rotateX(20deg);
  transform-origin: bottom center;
  text-align: center;
  line-height: 1.8;
  padding: 0 1rem;
}

.crawl-content.rolling {
  animation: crawl 30s linear infinite;
}

@keyframes crawl {
  from { bottom: -100%; }
  to   { bottom: 200%;  }
}

.crawl-episode {
  font-size: 1rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #7eb8d4;
  margin-bottom: 0.5rem;
}

.crawl-title {
  font-size: clamp(1.4rem, 3vw, 2rem);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #f0c040;
  margin-bottom: 2rem;
}
.crawl-title span { font-size: 0.7em; color: #ccc; }

.crawl-content p {
  font-size: clamp(0.85rem, 1.5vw, 1.1rem);
  color: #ddd;
  margin-bottom: 1.5rem;
}

/* ── Begin button ── */
.crawl-btn {
  position: absolute;
  bottom: 8%;
  background: transparent;
  border: 2px solid #f0c040;
  color: #f0c040;
  padding: 0.7rem 2rem;
  font-size: 0.9rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
  opacity: 0;
  transition: opacity 1s ease, background 0.2s ease;
  z-index: 20;
}
.crawl-btn.visible { opacity: 1; }
.crawl-btn:hover   { background: rgba(240, 192, 64, 0.15); }

/* ── Mute button ── */
.mute-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 2.2rem;
  height: 2.2rem;
  font-size: 1rem;
  cursor: pointer;
  z-index: 30;
  opacity: 0.6;
  transition: opacity 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}
.mute-btn:hover { opacity: 1; }

/* ── Feature cards section ── */
.feature-section {
  background: var(--vp-c-bg, #0a0a0f);
  padding: 5rem 2rem;
  text-align: center;
}

.feature-heading {
  font-size: 1.8rem;
  color: var(--vp-c-brand-1, #c0392b);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 3rem;
}

.feature-cards {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 900px;
  margin: 0 auto;
}

.feature-card {
  flex: 1 1 240px;
  max-width: 280px;
  background: var(--vp-c-bg-soft, #0d0d14);
  border: 1px solid var(--vp-c-border, #1e1e2e);
  border-radius: 6px;
  padding: 2rem 1.5rem;
  text-decoration: none;
  color: var(--vp-c-text-1, #e0e0e0);
  transition: border-color 0.2s ease, transform 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.feature-card:hover {
  border-color: var(--vp-c-brand-1, #c0392b);
  transform: translateY(-4px);
}
.feature-card.featured {
  border-color: var(--vp-c-brand-1, #c0392b);
}

.card-icon {
  font-size: 2rem;
  color: var(--vp-c-brand-1, #c0392b);
}

.feature-card h3 {
  font-size: 1.1rem;
  color: var(--vp-c-text-1, #e0e0e0);
  margin: 0;
  text-transform: none;
  letter-spacing: normal;
  font-family: inherit;
}

.feature-card p {
  font-size: 0.88rem;
  color: var(--vp-c-text-2, #aaa);
  line-height: 1.6;
  flex: 1;
}

.card-link {
  font-size: 0.82rem;
  color: var(--vp-c-brand-1, #c0392b);
  font-weight: 600;
  letter-spacing: 0.05em;
}
</style>
