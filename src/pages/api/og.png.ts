import { ImageResponse } from '@vercel/og'
import type { APIRoute } from 'astro'
import { createElement as h } from 'react'

export const prerender = false

export const GET: APIRoute = async ({ url }) => {
  const title = url.searchParams.get('title') || 'Belajar C++'
  const description = url.searchParams.get('description') || 'Platform pembelajaran C++ gratis dan interaktif'
  const lang = url.searchParams.get('lang') || 'id'

  const subtitle = lang === 'id' ? 'Platform Pembelajaran C++' : 'C++ Learning Platform'

  return new ImageResponse(
    h('div', {
      style: {
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#0f172a',
        padding: '64px',
        fontFamily: 'sans-serif',
      },
    },
      // Top: logo + site name
      h('div', {
        style: { display: 'flex', alignItems: 'center', gap: '16px' },
      },
        h('div', {
          style: {
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: '#3b82f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'white',
          },
        }, 'C+'),
        h('span', {
          style: { color: '#94a3b8', fontSize: '20px' },
        }, 'belajar-cpp.varnimyr.my.id'),
      ),

      // Middle: title + description
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '16px' } },
        h('p', {
          style: { color: '#3b82f6', fontSize: '18px', margin: '0', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px' },
        }, subtitle),
        h('h1', {
          style: {
            color: '#f1f5f9',
            fontSize: title.length > 40 ? '48px' : '60px',
            fontWeight: 'bold',
            margin: '0',
            lineHeight: '1.1',
          },
        }, title),
        description && h('p', {
          style: {
            color: '#94a3b8',
            fontSize: '24px',
            margin: '0',
            lineHeight: '1.4',
            display: '-webkit-box',
            overflow: 'hidden',
          },
        }, description.length > 120 ? description.slice(0, 120) + '…' : description),
      ),

      // Bottom: tagline
      h('p', {
        style: { color: '#475569', fontSize: '18px', margin: '0' },
      }, lang === 'id'
        ? 'Gratis · Bilingual · Tanpa install · Untuk siswa SMP & SMA Indonesia'
        : 'Free · Bilingual · No install required · For Indonesian students'),
    ),
    { width: 1200, height: 630 },
  )
}
