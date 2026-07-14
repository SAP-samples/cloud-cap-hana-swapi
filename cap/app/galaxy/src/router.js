// Tiny hash-based router — no vue-router dependency (6 static routes).
// Views are lazily loaded by App.vue via defineAsyncComponent.
import { ref, computed } from 'vue'

const parseHash = () => (location.hash.replace(/^#\/?/, '') || 'home')

const current = ref(parseHash())
window.addEventListener('hashchange', () => { current.value = parseHash() })

export function navigate(path) {
  location.hash = '/' + String(path).replace(/^\/?/, '')
}

export function useRoute() {
  return {
    route: computed(() => current.value),
    navigate,
  }
}
