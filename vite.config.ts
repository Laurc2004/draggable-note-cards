import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base:'/draggable-note-cards',
  css: {
    postcss: './postcss.config.js',
  }
})
