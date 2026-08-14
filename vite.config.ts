import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''
const isUserSite = repoName.endsWith('.github.io')
const pagesBase = repoName && !isUserSite ? `/${repoName}/` : '/'

export default defineConfig({
  base: process.env.VITE_GITHUB_PAGES === 'true' ? pagesBase : '/',
  plugins: [react(), tailwindcss()],
})
