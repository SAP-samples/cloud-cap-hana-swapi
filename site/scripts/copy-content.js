#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '../..') // repo root
const site = resolve(__dirname, '..') // site/

const mappings = [
  // Guide
  { src: 'cap/README.md',                           dest: 'guide/overview.md' },
  { src: 'cap/docs/learning-path.md',               dest: 'guide/learning-path.md' },
  // Architecture
  { src: 'cap/docs/cap-architecture.md',            dest: 'architecture/index.md' },
  { src: 'cap/docs/profile-comparison.md',          dest: 'architecture/profiles.md' },
  { src: 'cap/docs/shows-episodes.md',              dest: 'architecture/shows-episodes.md' },
  // Reference
  { src: 'cap/docs/cap-cheat-sheet.md',             dest: 'reference/cheat-sheet.md' },
  { src: 'cap/docs/pitfalls.md',                    dest: 'reference/pitfalls.md' },
  { src: 'cap/docs/value-help-migration.md',        dest: 'reference/migration.md' },
  { src: 'CHANGELOG.md',                            dest: 'reference/changelog.md' },
  // API (special: strip Widdershins frontmatter, inject title)
  { src: 'cap/docs/DataService_readme.md', dest: 'api/data-service.md', stripFrontmatter: true, title: 'Data Service API' },
  { src: 'cap/docs/StarWarsFilm_readme.md', dest: 'api/film.md',         stripFrontmatter: true, title: 'Film API' },
  // HANA CLI
  { src: 'HANA_CLI_QUICKSTART.md',                  dest: 'hana-cli/quickstart.md' },
  { src: 'HANA_CLI_EXAMPLES.md',                    dest: 'hana-cli/examples.md' },
  { src: 'HANA_CLI_WORKFLOWS.md',                   dest: 'hana-cli/workflows.md' },
  { src: 'HANA_CLI_REFERENCE.md',                   dest: 'hana-cli/reference.md' },
  // Labs
  { src: 'cap/labs/README.md',                       dest: 'labs/index.md' },
  { src: 'cap/labs/lab-01-model/README.md',          dest: 'labs/lab-01.md' },
  { src: 'cap/labs/lab-02-service/README.md',        dest: 'labs/lab-02.md' },
  { src: 'cap/labs/lab-03-handler/README.md',        dest: 'labs/lab-03.md' },
  { src: 'cap/labs/lab-04-auth/README.md',           dest: 'labs/lab-04.md' },
  { src: 'cap/labs/lab-05-testing/README.md',        dest: 'labs/lab-05.md' },
  // Fiori Apps
  { src: 'cap/docs/fiori-overview.md',               dest: 'app/index.md' },
  { src: 'cap/docs/fiori-people.md',                 dest: 'app/people.md' },
  { src: 'cap/docs/fiori-media.md',                  dest: 'app/media.md' },
  { src: 'cap/docs/fiori-film.md',                   dest: 'app/film.md' },
  { src: 'cap/docs/fiori-show.md',                   dest: 'app/show.md' },
]

// Link rewrites applied after copy: maps relative paths in original source
// to their final VitePress URLs so internal doc-to-doc links work.
// ORDER MATTERS: more specific patterns (with path prefixes) must come before
// bare patterns, otherwise the bare rule fires first and the specific one never matches.
const linkRewrites = [
  // guide/learning-path.md: ../labs/lab-NN-name/README.md → /labs/lab-NN
  { pattern: /\.\.\/labs\/lab-01-model\/README\.md/g,   replacement: '/labs/lab-01' },
  { pattern: /\.\.\/labs\/lab-02-service\/README\.md/g, replacement: '/labs/lab-02' },
  { pattern: /\.\.\/labs\/lab-03-handler\/README\.md/g, replacement: '/labs/lab-03' },
  { pattern: /\.\.\/labs\/lab-04-auth\/README\.md/g,    replacement: '/labs/lab-04' },
  { pattern: /\.\.\/labs\/lab-05-testing\/README\.md/g, replacement: '/labs/lab-05' },
  // guide/overview.md + any other file: (./)?labs/lab-NN-name/README.md → /labs/lab-NN
  { pattern: /(?:\.\/)?labs\/lab-01-model\/README\.md/g, replacement: '/labs/lab-01' },
  { pattern: /(?:\.\/)?labs\/lab-02-service\/README\.md/g, replacement: '/labs/lab-02' },
  { pattern: /(?:\.\/)?labs\/lab-03-handler\/README\.md/g, replacement: '/labs/lab-03' },
  { pattern: /(?:\.\/)?labs\/lab-04-auth\/README\.md/g,  replacement: '/labs/lab-04' },
  { pattern: /(?:\.\/)?labs\/lab-05-testing\/README\.md/g, replacement: '/labs/lab-05' },
  // guide/overview.md: bare labs/README.md → /labs/
  { pattern: /(?:\.\/)?labs\/README\.md/g,               replacement: '/labs/' },
  // labs/index.md: bare lab-NN-name/README.md → lab-NN.md (relative, within /labs/)
  // These must come AFTER the more specific labs/lab-NN-name rules above.
  { pattern: /lab-01-model\/README\.md/g,    replacement: 'lab-01.md' },
  { pattern: /lab-02-service\/README\.md/g,  replacement: 'lab-02.md' },
  { pattern: /lab-03-handler\/README\.md/g,  replacement: 'lab-03.md' },
  { pattern: /lab-04-auth\/README\.md/g,     replacement: 'lab-04.md' },
  { pattern: /lab-05-testing\/README\.md/g,  replacement: 'lab-05.md' },
  // guide/overview.md: ./docs/… and bare docs/… → site URLs
  { pattern: /(?:\.\/)?docs\/cap-architecture\.md/g,     replacement: '/architecture/' },
  { pattern: /(?:\.\/)?docs\/cap-architecture(?![\w.-])/g, replacement: '/architecture/' },
  { pattern: /(?:\.\/)?docs\/profile-comparison\.md/g,   replacement: '/architecture/profiles' },
  { pattern: /(?:\.\/)?docs\/profile-comparison(?![\w.-])/g, replacement: '/architecture/profiles' },
  { pattern: /(?:\.\/)?docs\/learning-path\.md/g,        replacement: '/guide/learning-path' },
  { pattern: /(?:\.\/)?docs\/learning-path(?![\w.-])/g,  replacement: '/guide/learning-path' },
  { pattern: /(?:\.\/)?docs\/cap-cheat-sheet\.md/g,      replacement: '/reference/cheat-sheet' },
  { pattern: /(?:\.\/)?docs\/cap-cheat-sheet(?![\w.-])/g, replacement: '/reference/cheat-sheet' },
  { pattern: /(?:\.\/)?docs\/pitfalls\.md/g,             replacement: '/reference/pitfalls' },
  { pattern: /(?:\.\/)?docs\/pitfalls(?![\w.-])/g,       replacement: '/reference/pitfalls' },
  { pattern: /(?:\.\/)?docs\/value-help-migration\.md/g, replacement: '/reference/migration' },
  { pattern: /(?:\.\/)?docs\/value-help-migration(?![\w.-])/g, replacement: '/reference/migration' },
  // architecture/index.md: profile-comparison relative link (with or without ./ prefix)
  { pattern: /(?:\.\/)?profile-comparison\.md/g,   replacement: './profiles.md' },
  { pattern: /(?:\.\/)?profile-comparison(?![\w.-])/g, replacement: './profiles' },
  // guide/overview.md + architecture/index.md: source code file links → GitHub
  // These are relative links to .cds/.js files that don't exist as VitePress pages.
  { pattern: /\(db\/schema\.cds\)/g,              replacement: '(https://github.com/SAP-samples/cloud-cap-hana-swapi/blob/main/cap/db/schema.cds)' },
  { pattern: /\(srv\/people-service\.cds\)/g,     replacement: '(https://github.com/SAP-samples/cloud-cap-hana-swapi/blob/main/cap/srv/people-service.cds)' },
  { pattern: /\(srv\/people-service\.js\)/g,      replacement: '(https://github.com/SAP-samples/cloud-cap-hana-swapi/blob/main/cap/srv/people-service.js)' },
  { pattern: /\(srv\/server\.js\)/g,              replacement: '(https://github.com/SAP-samples/cloud-cap-hana-swapi/blob/main/cap/srv/server.js)' },
  { pattern: /\(srv\/episode-service\.cds\)/g,    replacement: '(https://github.com/SAP-samples/cloud-cap-hana-swapi/blob/main/cap/srv/episode-service.cds)' },
  { pattern: /\(srv\/services-auth\.cds\)/g,      replacement: '(https://github.com/SAP-samples/cloud-cap-hana-swapi/blob/main/cap/srv/services-auth.cds)' },
  { pattern: /\(test\/handler\.test\.js\)/g,      replacement: '(https://github.com/SAP-samples/cloud-cap-hana-swapi/blob/main/cap/test/handler.test.js)' },
  // architecture/index.md: ../srv/ links (relative to cap/docs/) → GitHub
  { pattern: /\(\.\.\/srv\/people-service\.js\)/g,  replacement: '(https://github.com/SAP-samples/cloud-cap-hana-swapi/blob/main/cap/srv/people-service.js)' },
  { pattern: /\(\.\.\/srv\/services-auth\.cds\)/g,  replacement: '(https://github.com/SAP-samples/cloud-cap-hana-swapi/blob/main/cap/srv/services-auth.cds)' },
  // guide/overview.md: bare app/ link → /app/ VitePress page
  { pattern: /\(app\/\)/g, replacement: '(/app/)' },
  // guide/overview.md: anchor links use GitHub-style IDs (no emoji); VitePress includes emoji in IDs
  { pattern: /#-beginner-track/g,    replacement: '#🟢-beginner-track' },
  { pattern: /#-intermediate-track/g, replacement: '#🟡-intermediate-track' },
  { pattern: /#-advanced-track/g,    replacement: '#🔴-advanced-track' },
]

function applyLinkRewrites(content) {
  for (const { pattern, replacement } of linkRewrites) {
    content = content.replace(pattern, replacement)
  }
  return content
}

for (const { src, dest, stripFrontmatter, title } of mappings) {
  const srcPath = resolve(root, src)
  const destPath = resolve(site, dest)
  mkdirSync(dirname(destPath), { recursive: true })

  let content = readFileSync(srcPath, 'utf8')

  if (stripFrontmatter) {
    const pageTitle = title ?? 'API Reference'
    // Replace leading ---...--- frontmatter block with minimal VitePress frontmatter
    content = content.replace(/^---[\s\S]*?---\r?\n/, `---\ntitle: ${pageTitle}\n---\n`)
  }

  content = applyLinkRewrites(content)
  writeFileSync(destPath, content, 'utf8')
  console.log(`Copied: ${src} → ${dest}`)
}

console.log(`\nDone. ${mappings.length} files copied.`)
