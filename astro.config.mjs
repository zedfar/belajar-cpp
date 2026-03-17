import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'
import remarkDirective from 'remark-directive'
import { remarkInfoBox } from './src/plugins/remark-infobox.mjs'

/** Shiki transformer that injects a copy button into code blocks with a real language */
const copyButtonTransformer = {
  name: 'copy-button',
  pre(node) {
    const lang = this.options?.lang ?? ''
    // Skip plain text / output blocks
    if (!lang || lang === 'plaintext' || lang === 'text') return

    node.properties.style = (node.properties.style || '') + ';position:relative'

    node.children.push({
      type: 'element',
      tagName: 'button',
      properties: {
        class: 'shiki-copy-btn',
        'aria-label': 'Copy code',
        'data-code': this.source,
      },
      children: [
        {
          type: 'element',
          tagName: 'svg',
          properties: {
            xmlns: 'http://www.w3.org/2000/svg',
            width: '14',
            height: '14',
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': '2',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
          },
          children: [
            { type: 'element', tagName: 'rect', properties: { x: '9', y: '9', width: '13', height: '13', rx: '2', ry: '2' }, children: [] },
            { type: 'element', tagName: 'path', properties: { d: 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' }, children: [] },
          ],
        },
      ],
    })
  },
}

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
    remarkPlugins: [remarkDirective, remarkInfoBox],
    shikiConfig: {
      theme: 'one-dark-pro',
      langs: ['cpp', 'c', 'javascript', 'bash', 'json'],
      wrap: true,
      transformers: [copyButtonTransformer],
    },
  },
})
