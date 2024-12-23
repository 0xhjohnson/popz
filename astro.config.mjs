import { loadEnv } from 'vite'
const { PUBLIC_SANITY_STUDIO_PROJECT_ID, PUBLIC_SANITY_STUDIO_DATASET } =
  loadEnv(process.env.NODE_ENV, process.cwd(), '')

import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import cloudflare from '@astrojs/cloudflare'
import { sanityIntegration } from '@sanity/astro'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  site: 'https://popzbbq.com',
  output: 'server',
  prefetch: true,
  adapter: cloudflare({
    mode: 'directory',
    imageService: 'passthrough',
    platformProxy: {
      enabled: true
    }
  }),
  integrations: [
    sanityIntegration({
      projectId: PUBLIC_SANITY_STUDIO_PROJECT_ID,
      dataset: PUBLIC_SANITY_STUDIO_DATASET,
      studioBasePath: '/admin',
      useCdn: false,
      apiVersion: '2023-12-28'
    }),
    react(),
    tailwind(),
    sitemap()
  ]
})
