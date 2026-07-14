<script setup>
import { navigate } from '../router.js'

// The showcase catalog — each tile states what UI5 / Fiori Elements can't do.
const CARDS = [
  {
    key: 'graph', icon: 'org-chart', title: 'Relationship Graph',
    cant: "UI5 has no network-graph control.",
    desc: 'A physics-based, draggable force graph of the whole many-to-many universe. Click a node to expand its neighbours on demand.',
  },
  {
    key: 'graphql', icon: 'source-code', title: 'GraphQL Explorer',
    cant: "Fiori Elements can't consume GraphQL at all.",
    desc: 'Build a query by walking associations, run it in a single round-trip against /graphql, and browse the nested result tree.',
  },
  {
    key: 'events', icon: 'bell', title: 'Real-time Feed',
    cant: "Fiori Elements has no live server push.",
    desc: 'A live activity stream fed by CAP domain events over Server-Sent Events. Trigger a change and watch it arrive with no refresh.',
  },
  {
    key: 'timeline', icon: 'timesheet', title: 'Cinematic Timeline',
    cant: "Beyond a stock UI5 timeline control.",
    desc: 'A full-canvas, animated timeline of films and episodes with a parallax starfield and hover-to-bloom posters.',
  },
  {
    key: 'hyperspace', icon: 'sys-enter', title: 'Hyperspace',
    cant: "Slick, fun, unapologetically non-enterprise.",
    desc: 'A full-bleed Canvas hyperspace jump where stars are seeded from real planet data. Click a star to drop out of lightspeed.',
  },
]
</script>

<template>
  <div class="home">
    <div class="home__intro">
      <ui5-title level="H2">Same Fiori chrome. Things UI5 can't do.</ui5-title>
      <ui5-text>
        Five Vue 3 showcases wrapped in genuine SAP Horizon styling (UI5 Web Components),
        each consuming this project's CAP service through OData, GraphQL, or Server-Sent Events.
      </ui5-text>
    </div>

    <div class="home__grid">
      <ui5-card v-for="c in CARDS" :key="c.key" class="home__card">
        <ui5-card-header slot="header" :title-text="c.title" :subtitle-text="c.cant"
                         interactive @click="navigate(c.key)">
          <ui5-icon :name="c.icon" slot="avatar"></ui5-icon>
        </ui5-card-header>
        <div class="home__body">
          <ui5-text>{{ c.desc }}</ui5-text>
          <ui5-button design="Emphasized" @click="navigate(c.key)">Launch</ui5-button>
        </div>
      </ui5-card>
    </div>
  </div>
</template>

<style scoped>
.home__intro { max-width: 60ch; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; }
.home__grid {
  display: grid; gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
.home__card { width: 100%; }
.home__body { padding: 1rem; display: flex; flex-direction: column; gap: 1rem; align-items: flex-start; }
</style>
