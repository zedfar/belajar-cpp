import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'

export default defineConfig({
  site: 'https://belajar-cpp.vercel.app',
  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    mdx(),
    sitemap(),
  ],

  i18n: {
    defaultLocale: 'id',
    locales: ['id', 'en'],
    routing: {
      prefixDefaultLocale: true,
      strategy: 'prefix-always',
    },
  },

  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
      langs: ['cpp', 'c', 'javascript', 'bash', 'json'],
      wrap: true,
    },
  },
})
