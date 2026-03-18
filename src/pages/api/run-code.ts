import type { APIRoute } from 'astro'

export const prerender = false

// ── Simple in-memory rate limiter ────────────────────────────
// 10 requests per minute per IP. Resets per sliding window.
// Note: works per serverless instance — sufficient to prevent accidental
// loops and casual abuse; for stricter limits use Vercel KV or Edge config.
const rateLimit = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 10
const RATE_LIMIT_WINDOW_MS = 60_000

function checkRateLimit(ip: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now()
  const entry = rateLimit.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return { allowed: true, retryAfter: 0 }
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) }
  }

  entry.count++
  return { allowed: true, retryAfter: 0 }
}

// Cleanup stale entries periodically to prevent memory leak
setInterval(() => {
  const now = Date.now()
  for (const [ip, entry] of rateLimit) {
    if (now > entry.resetAt) rateLimit.delete(ip)
  }
}, 5 * 60_000)

export const POST: APIRoute = async ({ request }) => {
  // Rate limiting
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  const { allowed, retryAfter } = checkRateLimit(ip)
  if (!allowed) {
    return new Response(
      JSON.stringify({ error: `Rate limit exceeded. Try again in ${retryAfter}s.` }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(retryAfter),
        },
      }
    )
  }

  let body: { code?: string; stdin?: string }
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { code, stdin = '' } = body

  if (!code || typeof code !== 'string') {
    return new Response(JSON.stringify({ error: 'Invalid request: code is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Max code size: 50KB
  if (code.length > 50000) {
    return new Response(JSON.stringify({ error: 'Code too large (max 50KB)' }), {
      status: 413,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const JUDGE0_URL = (import.meta.env.JUDGE0_API_URL || 'https://judge0-ce.p.rapidapi.com').replace(/\/$/, '')
  const JUDGE0_KEY = import.meta.env.JUDGE0_API_KEY || ''
  const isSelfHosted = !JUDGE0_URL.includes('rapidapi.com')

  // Validate API key is configured
  if (!JUDGE0_KEY) {
    console.error('[run-code] JUDGE0_API_KEY is not set. Set it in environment variables.')
    return new Response(
      JSON.stringify({ error: 'Code execution is not configured. JUDGE0_API_KEY missing.' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (JUDGE0_KEY) {
    if (isSelfHosted) {
      // Self-hosted Judge0: gunakan X-Auth-Token
      headers['X-Auth-Token'] = JUDGE0_KEY
    } else {
      // RapidAPI Judge0
      headers['X-RapidAPI-Key'] = JUDGE0_KEY
      headers['X-RapidAPI-Host'] = 'judge0-ce.p.rapidapi.com'
    }
  }

  try {
    // Submit code
    const submitRes = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=true&wait=false`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        source_code: Buffer.from(code).toString('base64'),
        language_id: 54, // C++ (GCC)
        stdin: stdin ? Buffer.from(stdin).toString('base64') : '',
      }),
    })

    if (!submitRes.ok) {
      return new Response(JSON.stringify({ error: 'Submission failed' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const { token } = await submitRes.json()

    // Poll for result (max 10 attempts, 1s apart)
    for (let i = 0; i < 10; i++) {
      await new Promise(r => setTimeout(r, 1000))

      const pollRes = await fetch(
        `${JUDGE0_URL}/submissions/${token}?base64_encoded=true&fields=stdout,stderr,compile_output,status,time,memory`,
        { headers }
      )

      if (!pollRes.ok) continue

      const result = await pollRes.json()

      // Status 1 = In Queue, 2 = Processing
      if (result.status.id > 2) {
        const decode = (s: string | null): string | null => {
          if (!s) return null
          try {
            return Buffer.from(s, 'base64').toString('utf-8')
          } catch {
            return s
          }
        }

        return new Response(
          JSON.stringify({
            ...result,
            stdout: decode(result.stdout),
            stderr: decode(result.stderr),
            compile_output: decode(result.compile_output),
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }
        )
      }
    }

    return new Response(JSON.stringify({ error: 'Execution timed out' }), {
      status: 408,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Run code error:', err)
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
