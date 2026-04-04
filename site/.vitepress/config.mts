import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const cdsGrammar = JSON.parse(readFileSync(resolve(__dirname, '../cds.tmLanguage.json'), 'utf-8'))
// Shiki matches by name — grammar.name is "CDS" but fenced blocks use lowercase "cds"
cdsGrammar.name = 'cds'

export default withMermaid(defineConfig({
  title: 'SWAPI Docs',
  description: 'SAP Cloud Application Programming Model — Star Wars API sample',
  base: '/cloud-cap-hana-swapi/',

  // Copied source files contain links to repo source files (.cds, .js) and
  // localhost dev URLs that are intentionally not part of the docs site.
  ignoreDeadLinks: true,

  markdown: {
    theme: {
      dark: 'vitesse-dark',
      light: 'vitesse-light',
    },
    languages: [cdsGrammar],
  },

  themeConfig: {
    logo: { light: '/logo-light.svg', dark: '/logo-dark.svg', alt: 'SWAPI' },
    siteTitle: 'SWAPI DOCS',

    nav: [
      { text: 'Getting Started', link: '/guide/overview' },
      { text: 'Architecture',    link: '/architecture/' },
      { text: 'Apps',            link: '/app/' },
      { text: 'Labs',            link: '/labs/' },
      { text: 'Reference',       link: '/reference/cheat-sheet' },
      { text: 'HANA CLI',        link: '/hana-cli/quickstart' },
      { text: 'API',             link: '/api/' },
    ],

    sidebar: {
      '/guide/': [
        { text: 'Getting Started', items: [
          { text: 'Overview',      link: '/guide/overview' },
          { text: 'Learning Path', link: '/guide/learning-path' },
        ]},
      ],
      '/architecture/': [
        { text: 'Architecture', items: [
          { text: 'CAP Architecture',    link: '/architecture/' },
          { text: 'Profile Comparison',  link: '/architecture/profiles' },
          { text: 'Shows & Episodes',    link: '/architecture/shows-episodes' },
        ]},
      ],
      '/app/': [
        { text: 'Fiori Apps', items: [
          { text: 'Overview',      link: '/app/' },
          { text: 'People',        link: '/app/people' },
          { text: 'Media Browser', link: '/app/media' },
          { text: 'Films',         link: '/app/film' },
          { text: 'Shows',         link: '/app/show' },
        ]},
      ],
      '/labs/': [
        { text: 'Hands-On Labs', items: [
          { text: 'Labs Overview',           link: '/labs/' },
          { text: 'Lab 01: Domain Model',    link: '/labs/lab-01' },
          { text: 'Lab 02: Service Projections', link: '/labs/lab-02' },
          { text: 'Lab 03: Handler Logic',   link: '/labs/lab-03' },
          { text: 'Lab 04: Authorization',   link: '/labs/lab-04' },
          { text: 'Lab 05: Testing',         link: '/labs/lab-05' },
        ]},
      ],
      '/reference/': [
        { text: 'Reference', items: [
          { text: 'v2.0 Announcement',    link: '/reference/v2-announcement' },
          { text: 'CDS Cheat Sheet',      link: '/reference/cheat-sheet' },
          { text: 'Common Pitfalls',      link: '/reference/pitfalls' },
          { text: 'Value-Help Migration', link: '/reference/migration' },
          { text: 'Changelog',            link: '/reference/changelog' },
        ]},
      ],
      '/hana-cli/': [
        { text: 'HANA CLI', items: [
          { text: 'Quick Start',      link: '/hana-cli/quickstart' },
          { text: 'Examples',         link: '/hana-cli/examples' },
          { text: 'Workflows',        link: '/hana-cli/workflows' },
          { text: 'Command Reference', link: '/hana-cli/reference' },
        ]},
      ],
      '/api/': [
        { text: 'API', items: [
          { text: 'Overview',      link: '/api/' },
          { text: 'Data Service',  link: '/api/data-service' },
          { text: 'Film',          link: '/api/film' },
        ]},
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/SAP-samples/cloud-cap-hana-swapi' },
    ],

    search: { provider: 'local' },
  },
}))
