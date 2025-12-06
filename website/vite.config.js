import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
  base: './', // Use relative paths for assets
  build: {
    outDir: '../', // Build to the root of the repo (one level up from website)
    emptyOutDir: false, // Do not delete existing files in the repo
  }
})
