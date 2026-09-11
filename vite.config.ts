import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync, existsSync } from 'node:fs'

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''
const isUserSite = repoName.endsWith('.github.io')
const pagesBase = repoName && !isUserSite ? `/${repoName}/` : '/'

export default defineConfig({
  base: process.env.VITE_GITHUB_PAGES === 'true' ? pagesBase : '/',
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/react/') || id.includes('/node_modules/react-dom/') || id.includes('/node_modules/react-router')) {
            return 'react-vendor'
          }
          if (id.includes('/node_modules/framer-motion/') || id.includes('/node_modules/motion-dom/')) {
            return 'motion'
          }
          if (id.includes('/node_modules/react-icons/')) {
            return 'icons'
          }
          if (id.includes('/node_modules/')) {
            return 'vendor'
          }
        },
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'spa-404',
      closeBundle() {
        const src = 'dist/index.html'
        const dest = 'dist/404.html'
        if (existsSync(src)) copyFileSync(src, dest)
      },
    },
  ],
})
