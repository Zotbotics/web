import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [sveltekit(), visualizer()],
  optimizeDeps: {
    include: ['@fullcalendar/common'],
  },
  resolve: {
    dedupe: ['@fullcalendar/common'],
  },
})
