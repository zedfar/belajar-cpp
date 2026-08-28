import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './src/__tests__/e2e',
  timeout: 60_000,
  retries: 2,
  ...(process.env.CI ? { workers: 1 } : {}),
  reporter: 'list',

  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Start dev server automatically before tests. Note: `astro preview` is NOT
  // an option here (the @astrojs/vercel adapter's output format doesn't
  // support it), so this always runs against the dev server - the dev
  // toolbar is explicitly disabled in CI via astro.config.mjs instead.
  webServer: {
    command: 'npm run dev -- --port 4321',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
