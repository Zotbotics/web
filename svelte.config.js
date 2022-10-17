import sveltePreprocess from 'svelte-preprocess'
//import adapter from '@sveltejs/adapter-static'
import adapter from '@sveltejs/adapter-vercel'
import { mdsvex } from 'mdsvex'

import { resolve } from 'path'

// workaround to enable __dirname in esm
import * as url from 'url'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

/** @type {import('@sveltejs/kit').Config} */

export default {
  // enable file extensions for MDsveX
  extensions: ['.svelte', '.svx', '.md'],

  preprocess: [
    // enable TypeScript and TailwindCSS/PostCSS
    sveltePreprocess(),

    // use MDsveX preprocessor for .md (Markdown) and .svx files
    mdsvex({
      extensions: ['.svx', '.md'],
      layout: {
        // default layout for Markdown components
        _: resolve(__dirname, './src/markdown/Layout.svelte'),
      },
    }),
  ],
  kit: {
    alias: {
      // Svelte components
      $components: 'src/components',

      // Markdown files for static content
      $markdown: 'src/markdown',
    },

    // deploy the website with NodeJS, probably in a container
    adapter: adapter(),
  },
}
