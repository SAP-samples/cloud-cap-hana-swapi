<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { connectEvents } from '../api/events.js'
import { list, action } from '../api/odata.js'

const conn = ref('connecting') // connecting | open | reconnecting
const feed = ref([])           // newest first
let disconnect = null
let seq = 0

const STATE_TAG = {
  open: { text: 'Live', design: 'Success' },
  connecting: { text: 'Connecting…', design: 'Information' },
  reconnecting: { text: 'Reconnecting…', design: 'Critical' },
}

function pushEvent(evt) {
  feed.value.unshift({
    id: ++seq,
    event: evt.event,
    data: evt.data,
    at: new Date().toLocaleTimeString(),
  })
  if (feed.value.length > 50) feed.value.pop()
}

// Trigger a real change: rename a random character to force People.Changed.v1.
const triggering = ref(false)
const triggerMsg = ref('')
async function triggerChange() {
  triggering.value = true
  triggerMsg.value = ''
  try {
    const { value } = await list('StarWarsPeople', 'People', { top: 25, select: ['ID', 'name'] })
    const active = value.filter((p) => p.ID)
    if (!active.length) { triggerMsg.value = 'No characters available to rename.'; return }
    const pick = active[Math.floor(Math.random() * active.length)]
    const base = (pick.name || 'Rebel').replace(/ ✦.*$/, '')
    const newName = `${base} ✦${String(seq + 1)}`
    // Draft-enabled entity: the bound action key includes IsActiveEntity.
    await action('StarWarsPeople', 'People', `ID=${pick.ID},IsActiveEntity=true`, 'rename', { newName })
    triggerMsg.value = `Renamed to "${newName}" — watch the feed.`
  } catch (e) {
    triggerMsg.value = `Trigger failed: ${e.message}`
  } finally {
    triggering.value = false
  }
}

function summarize(item) {
  const d = item.data
  if (!d || typeof d !== 'object') return String(d ?? '')
  return d.name || d.title || d.ID || JSON.stringify(d).slice(0, 60)
}

onMounted(() => {
  disconnect = connectEvents(pushEvent, (s) => { conn.value = s })
})
onBeforeUnmount(() => disconnect?.())
</script>

<template>
  <div class="events">
    <div class="events__head">
      <ui5-title level="H3">Real-time Event Feed</ui5-title>
      <ui5-tag :design="STATE_TAG[conn].design">{{ STATE_TAG[conn].text }}</ui5-tag>
    </div>
    <ui5-text>
      A live stream of CAP domain events (<code>People.Changed.v1</code>, <code>Show.Refreshed.v1</code>)
      pushed over Server-Sent Events. No polling, no refresh — Fiori Elements can't do this out of the box.
    </ui5-text>

    <div class="events__actions">
      <ui5-button design="Emphasized" :disabled="triggering" @click="triggerChange">
        Trigger a change (rename a character)
      </ui5-button>
      <ui5-text v-if="triggerMsg">{{ triggerMsg }}</ui5-text>
    </div>

    <ui5-illustrated-message v-if="!feed.length" name="NoActivities"
      title-text="Waiting for events"
      subtitle-text="Trigger a change above, or wait for the scheduled show rotation."></ui5-illustrated-message>

    <ui5-timeline v-else>
      <ui5-timeline-item v-for="item in feed" :key="item.id"
                         :title-text="item.event"
                         :subtitle-text="item.at"
                         icon="activity-individual">
        {{ summarize(item) }}
      </ui5-timeline-item>
    </ui5-timeline>
  </div>
</template>

<style scoped>
.events { display: flex; flex-direction: column; gap: 0.75rem; }
.events__head { display: flex; align-items: center; gap: 0.75rem; }
.events__actions { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
</style>
