import { test, expect } from '@playwright/test'

// ── Smoke tests — verifikasi halaman utama bisa diakses dan render konten ──

test.describe('Home page', () => {
  test('loads and shows hero section', async ({ page }) => {
    await page.goto('/id')
    await expect(page).toHaveTitle(/Belajar C\+\+/)
    await expect(page.locator('main h1').first()).toBeVisible()
  })

  test('EN version loads', async ({ page }) => {
    await page.goto('/en')
    await expect(page).toHaveTitle(/Learn C\+\+/)
  })

  test('skip-to-content link is present', async ({ page }) => {
    await page.goto('/id')
    const skipLink = page.locator('a[href="#main-content"]')
    await expect(skipLink).toHaveCount(1)
  })
})

test.describe('Curriculum page', () => {
  test('shows all 7 units', async ({ page }) => {
    await page.goto('/id/curriculum')
    await expect(page.locator('h1')).toBeVisible()
    // Should have at least unit-0 through unit-6 visible
    const unitCards = page.locator('[data-unit-card]')
    await expect(unitCards).toHaveCount(7)
  })
})

test.describe('Lesson page', () => {
  test('first lesson loads with content', async ({ page }) => {
    await page.goto('/id/learn/unit-1/01-hello-world')
    await expect(page.locator('h1').first()).toBeVisible()
    // Lesson should have code blocks
    await expect(page.locator('pre').first()).toBeVisible()
  })

  test('breadcrumb navigation is present', async ({ page }) => {
    await page.goto('/id/learn/unit-1/01-hello-world')
    await expect(page.locator('nav').filter({ hasText: 'Kurikulum' }).first()).toBeVisible()
  })

  test('mark complete button exists', async ({ page }) => {
    await page.goto('/id/learn/unit-1/01-hello-world')
    const markComplete = page.locator('[data-lesson-slug]').or(
      page.getByRole('button', { name: /Tandai Selesai|Mark Complete/i })
    )
    await expect(page.getByRole('button', { name: /Tandai Selesai/i })).toBeVisible()
  })
})

test.describe('Glossary page', () => {
  test('ID glossary loads with terms', async ({ page }) => {
    await page.goto('/id/glossary')
    await expect(page.locator('h1')).toContainText('Glosarium')
    // Should have category headings
    await expect(page.locator('h2').first()).toBeVisible()
    // Should have term definitions
    await expect(page.locator('dt').first()).toBeVisible()
  })

  test('EN glossary loads', async ({ page }) => {
    await page.goto('/en/glossary')
    await expect(page.locator('h1')).toContainText('Glossary')
  })
})

test.describe('Playground page', () => {
  test('loads with code editor area', async ({ page }) => {
    await page.goto('/id/playground')
    await expect(page.locator('h1')).toBeVisible()
  })
})

test.describe('Progress page', () => {
  test('loads correctly', async ({ page }) => {
    await page.goto('/id/progress')
    await expect(page).not.toHaveTitle(/404/)
    await expect(page.locator('h1')).toBeVisible()
  })
})

test.describe('Navigation', () => {
  test('header nav links are present', async ({ page }) => {
    await page.goto('/id')
    await expect(page.locator('header').getByRole('link', { name: 'Kurikulum' })).toBeVisible()
    await expect(page.locator('header').getByRole('link', { name: 'Playground' })).toBeVisible()
  })

  test('language toggle switches to EN', async ({ page }) => {
    await page.goto('/id')
    await page.getByRole('link', { name: /Switch to English/i }).click()
    await expect(page).toHaveURL(/\/en/)
  })

  test('404 page for unknown route', async ({ page }) => {
    const response = await page.goto('/id/halaman-tidak-ada-sama-sekali')
    expect(response?.status()).toBe(404)
  })
})

test.describe('SEO', () => {
  test('canonical link is present', async ({ page }) => {
    await page.goto('/id/curriculum')
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveCount(1)
    const href = await canonical.getAttribute('href')
    expect(href).toContain('/id/curriculum')
  })

  test('og:title meta is present', async ({ page }) => {
    await page.goto('/id')
    const ogTitle = page.locator('meta[property="og:title"]')
    await expect(ogTitle).toHaveCount(1)
  })

  test('manifest link is present', async ({ page }) => {
    await page.goto('/id')
    const manifest = page.locator('link[rel="manifest"]')
    await expect(manifest).toHaveCount(1)
  })
})
