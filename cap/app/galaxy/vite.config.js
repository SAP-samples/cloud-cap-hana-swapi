import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// The app is served by CAP under /galaxy/ in production (static from dist/).
// In dev, Vite proxies CAP's protocols to the running `cds watch` on :4004.
const CAP = 'http://localhost:4004'

export default defineConfig({
  base: '/galaxy/',
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Treat all <ui5-*> tags as custom elements so Vue doesn't try to
          // resolve them as Vue components or warn about unknown elements.
          isCustomElement: (tag) => tag.startsWith('ui5-'),
        },
      },
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/odata': { target: CAP, changeOrigin: true },
      '/graphql': { target: CAP, changeOrigin: true },
      '/rest': { target: CAP, changeOrigin: true },
      '/model': { target: CAP, changeOrigin: true },
      // SSE endpoint — disable buffering so events stream through the proxy.
      '/events': { target: CAP, changeOrigin: true },
    },
  },
  test: {
    environment: 'node',
    include: ['test/**/*.test.js'],
  },
})
