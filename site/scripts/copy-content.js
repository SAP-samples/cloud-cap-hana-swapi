#!/usr/bin/env node
import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
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
  // Reference
  { src: 'cap/docs/cap-cheat-sheet.md',             dest: 'reference/cheat-sheet.md' },
  { src: 'cap/docs/pitfalls.md',                    dest: 'reference/pitfalls.md' },
  { src: 'cap/docs/value-help-migration.md',        dest: 'reference/migration.md' },
  // API (special: strip Widdershins frontmatter)
  { src: 'cap/docs/DataService_readme.md',          dest: 'api/index.md', stripFrontmatter: true },
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
]

for (const { src, dest, stripFrontmatter } of mappings) {
  const srcPath = resolve(root, src)
  const destPath = resolve(site, dest)
  mkdirSync(dirname(destPath), { recursive: true })

  if (stripFrontmatter) {
    let content = readFileSync(srcPath, 'utf8')
    // Replace leading ---...--- frontmatter block with minimal VitePress frontmatter
    content = content.replace(/^---[\s\S]*?---\n/, '---\ntitle: API Reference\n---\n')
    writeFileSync(destPath, content, 'utf8')
  } else {
    cpSync(srcPath, destPath)
  }
  console.log(`Copied: ${src} → ${dest}`)
}

console.log(`\nDone. ${mappings.length} files copied.`)
