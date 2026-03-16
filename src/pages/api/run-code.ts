import type { APIRoute } from 'astro'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
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
        source_code: btoa(unescape(encodeURIComponent(code))),
        language_id: 54, // C++ (GCC)
        stdin: stdin ? btoa(unescape(encodeURIComponent(stdin))) : '',
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
            return decodeURIComponent(escape(atob(s)))
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
