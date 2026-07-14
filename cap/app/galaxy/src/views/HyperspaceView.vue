<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { list } from '../api/odata.js'
import { createHyperspace } from '../lib/hyperspace.js'

const state = ref('loading')
const errorMsg = ref('')
const canvas = ref(null)
const selected = ref(null)
let engine = null

onMounted(async () => {
  try {
    const { value } = await list('StarWarsPeople', 'Planet', {
      select: ['ID', 'name', 'climate', 'terrain', 'population'], top: 200,
    })
    state.value = 'ready'
    await Promise.resolve()
    engine = createHyperspace(canvas.value, value, { onSelect: (p) => { selected.value = p } })
    engine.start()
  } catch (e) {
    errorMsg.value = e.message
    state.value = 'error'
  }
})
onBeforeUnmount(() => engine?.destroy())

function onClick(e) {
  const rect = canvas.value.getBoundingClientRect()
  engine?.hit(e.clientX - rect.left, e.clientY - rect.top)
}
function retry() { state.value = 'loading'; location.reload() }
</script>

<template>
  <div class="hs">
    <ui5-busy-indicator v-if="state === 'loading'" active size="L" class="hs__center"></ui5-busy-indicator>
    <ui5-illustrated-message v-else-if="state === 'error'" name="UnableToLoad" :subtitle-text="errorMsg" class="hs__center">
      <ui5-button slot="actions" design="Emphasized" @click="retry">Retry</ui5-button>
    </ui5-illustrated-message>

    <template v-else>
      <canvas ref="canvas" class="hs__canvas" @click="onClick"></canvas>
      <div class="hs__hud">
        <div class="hs__title">HYPERSPACE</div>
        <div class="hs__hint">Stars seeded from real planet data · click a star to drop out of lightspeed</div>
        <button class="hs__jump" @click="engine?.jump()">↯ Jump</button>
      </div>
    </template>
  </div>
</template>

<style scoped>
/* Deliberately un-Fiori: full-bleed, dark, glowing. */
.hs { position: relative; width: 100%; height: 100%; background: #02040c; overflow: hidden; }
.hs__canvas { display: block; width: 100%; height: 100%; cursor: crosshair; }
.hs__center { position: absolute; inset: 0; margin: auto; }
.hs__hud {
  position: absolute; left: 1.5rem; bottom: 1.5rem; color: #e2e8f0; pointer-events: none;
  text-shadow: 0 0 12px rgba(96,165,250,0.6);
}
.hs__title { font-size: 2rem; font-weight: 800; letter-spacing: 0.5rem; color: #93c5fd; }
.hs__hint { font-size: 0.8rem; opacity: 0.8; margin-top: 0.25rem; }
.hs__jump {
  pointer-events: auto; margin-top: 0.75rem; cursor: pointer;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: #fff; border: none;
  padding: 0.5rem 1.25rem; border-radius: 999px; font-weight: 700; letter-spacing: 0.1em;
  box-shadow: 0 0 20px rgba(139,92,246,0.6);
}
.hs__jump:hover { filter: brightness(1.15); }
</style>
