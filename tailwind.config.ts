import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        accent: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        success: {
          light: '#6ee7b7',
          DEFAULT: '#10b981',
          dark: '#059669',
        },
        warning: {
          light: '#fcd34d',
          DEFAULT: '#f59e0b',
          dark: '#d97706',
        },
        error: {
          light: '#fca5a5',
          DEFAULT: '#ef4444',
          dark: '#dc2626',
        },
        code: {
          bg: '#1E1E1E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.slate.700'),
            '--tw-prose-headings': theme('colors.slate.900'),
            '--tw-prose-links': theme('colors.primary.600'),
            '--tw-prose-code': theme('colors.slate.800'),
            '--tw-prose-pre-bg': '#1E1E1E',
            '--tw-prose-pre-code': theme('colors.slate.200'),
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            code: {
              backgroundColor: theme('colors.slate.100'),
              borderRadius: '0.25rem',
              padding: '0.15rem 0.35rem',
              fontWeight: '400',
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.slate.300'),
            '--tw-prose-headings': theme('colors.slate.100'),
            '--tw-prose-links': theme('colors.primary.400'),
            '--tw-prose-code': theme('colors.slate.200'),
            code: {
              backgroundColor: theme('colors.slate.800'),
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
} satisfies Config
