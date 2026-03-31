import DefaultTheme from 'vitepress/theme'
import './style.css'
import OpeningCrawl from './components/OpeningCrawl.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: any }) {
    app.component('StarWarsHome', OpeningCrawl)
  },
}
