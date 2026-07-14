<script setup>
import { computed, defineAsyncComponent, h } from 'vue'
import { setTheme } from '@ui5/webcomponents-base/dist/config/Theme.js'
import { useRoute, navigate } from './router.js'
import Home from './views/Home.vue'

const { route } = useRoute()

// One entry per showcase. `nav` drives the side navigation + which async view renders.
const SHOWCASES = [
  { key: 'graph',      text: 'Relationship Graph', icon: 'org-chart' },
  { key: 'graphql',    text: 'GraphQL Explorer',   icon: 'source-code' },
  { key: 'events',     text: 'Real-time Feed',     icon: 'bell' },
  { key: 'timeline',   text: 'Cinematic Timeline', icon: 'timesheet' },
  { key: 'hyperspace', text: 'Hyperspace',         icon: 'sys-enter' },
]

// Lazy-load view components; small inline fallback while a chunk loads.
const loading = { render: () => h('ui5-busy-indicator', { active: true, size: 'L', style: 'display:block;margin:3rem auto' }) }
const views = {
  graph:      defineAsyncComponent({ loader: () => import('./views/GraphView.vue'),      loadingComponent: loading }),
  graphql:    defineAsyncComponent({ loader: () => import('./views/GraphqlView.vue'),    loadingComponent: loading }),
  events:     defineAsyncComponent({ loader: () => import('./views/EventsView.vue'),     loadingComponent: loading }),
  timeline:   defineAsyncComponent({ loader: () => import('./views/TimelineView.vue'),   loadingComponent: loading }),
  hyperspace: defineAsyncComponent({ loader: () => import('./views/HyperspaceView.vue'), loadingComponent: loading }),
}

const activeView = computed(() => (route.value === 'home' ? Home : views[route.value] ?? Home))
const isHyperspace = computed(() => route.value === 'hyperspace')

function onNavSelect(e) {
  const key = e.detail?.item?.dataset?.key
  if (key) navigate(key)
}

const THEMES = [
  { id: 'sap_horizon',      text: 'Morning Horizon (light)' },
  { id: 'sap_horizon_dark', text: 'Evening Horizon (dark)' },
  { id: 'sap_horizon_hcb',  text: 'High Contrast Black' },
]
function onThemeSelect(e) {
  const id = e.detail?.item?.dataset?.theme
  if (id) setTheme(id)
}
</script>

<template>
  <ui5-navigation-layout>
    <ui5-shellbar slot="header" primary-title="Galaxy" secondary-title="Beyond Fiori Elements">
      <ui5-button slot="startButton" icon="menu2" tooltip="Toggle navigation"
                  @click="$refs.navLayout?.toggleSideCollapsed?.()"></ui5-button>

      <ui5-shellbar-item slot="content" icon="palette" text="Theme" id="themeBtn"
                         @click="$refs.themeMenu.opener = 'themeBtn'; $refs.themeMenu.open = true"></ui5-shellbar-item>
      <ui5-avatar slot="profile" icon="customer" shape="Circle"></ui5-avatar>
    </ui5-shellbar>

    <ui5-side-navigation slot="sideContent" @selection-change="onNavSelect">
      <ui5-side-navigation-item text="Home" icon="home" data-key="home"
                                :selected="route === 'home'"></ui5-side-navigation-item>
      <ui5-side-navigation-item v-for="s in SHOWCASES" :key="s.key"
                                :text="s.text" :icon="s.icon" :data-key="s.key"
                                :selected="route === s.key"></ui5-side-navigation-item>
    </ui5-side-navigation>

    <main :class="{ 'view-main': true, 'view-main--bleed': isHyperspace }">
      <component :is="activeView" />
    </main>
  </ui5-navigation-layout>

  <!-- Theme switch menu (opened from the ShellBar palette item) -->
  <ui5-menu ref="themeMenu" header-text="Theme" @item-click="onThemeSelect">
    <ui5-menu-item v-for="t in THEMES" :key="t.id" :text="t.text" :data-theme="t.id"></ui5-menu-item>
  </ui5-menu>
</template>

<style>
/* App-global: the shell owns full height; content scrolls within <main>. */
html, body, #app { height: 100%; margin: 0; }
.view-main { padding: 1rem; height: 100%; box-sizing: border-box; overflow: auto; }
/* Hyperspace deliberately breaks the Fiori padding to go full-bleed. */
.view-main--bleed { padding: 0; overflow: hidden; }
</style>
