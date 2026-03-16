// Judge0 API wrapper for running C++ code in the browser

export interface RunCodeOptions {
  code: string
  stdin?: string
  timeoutMs?: number
}

export interface RunCodeResult {
  stdout: string | null
  stderr: string | null
  compile_output: string | null
  status: {
    id: number
    description: string
  }
  time: string | null    // execution time in seconds
  memory: number | null  // in KB
}

export type RunStatus =
  | 'accepted'       // Success
  | 'compile_error'  // Compilation failed
  | 'runtime_error'  // Crashed during execution
  | 'time_limit'     // Too slow
  | 'memory_limit'   // Too much memory
  | 'api_error'      // Network/API issue
  | 'pending'        // Still running

const CPP_LANGUAGE_ID = 54  // C++ (GCC 9.2.0) in Judge0

function getApiBase(): string {
  return import.meta.env.JUDGE0_API_URL ?? 'https://judge0-ce.p.rapidapi.com'
}

function getApiKey(): string {
  return import.meta.env.JUDGE0_API_KEY ?? ''
}

/**
 * Submit code to Judge0 and wait for result
 */
export async function runCode(options: RunCodeOptions): Promise<RunCodeResult> {
  const { code, stdin = '', timeoutMs = 10000 } = options

  const base64Code = btoa(unescape(encodeURIComponent(code)))
  const base64Stdin = stdin ? btoa(unescape(encodeURIComponent(stdin))) : ''

  const apiKey = getApiKey()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (apiKey) {
    headers['X-RapidAPI-Key'] = apiKey
    headers['X-RapidAPI-Host'] = 'judge0-ce.p.rapidapi.com'
  }

  // Submit
  const submitRes = await fetch(`${getApiBase()}/submissions?base64_encoded=true&wait=false`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      source_code: base64Code,
      language_id: CPP_LANGUAGE_ID,
      stdin: base64Stdin,
    }),
    signal: AbortSignal.timeout(timeoutMs),
  })

  if (!submitRes.ok) {
    throw new Error(`Submit failed: ${submitRes.status}`)
  }

  const { token } = await submitRes.json()

  // Poll for result
  const pollStart = Date.now()
  while (Date.now() - pollStart < timeoutMs) {
    await sleep(1000)

    const pollRes = await fetch(
      `${getApiBase()}/submissions/${token}?base64_encoded=true&fields=stdout,stderr,compile_output,status,time,memory`,
      { headers, signal: AbortSignal.timeout(5000) }
    )

    if (!pollRes.ok) continue

    const result: RunCodeResult = await pollRes.json()

    // Status 1 = In Queue, Status 2 = Processing
    if (result.status.id > 2) {
      // Decode base64 fields
      return decodeResult(result)
    }
  }

  throw new Error('Execution timed out')
}

/**
 * Proxy route version — uses server-side API key
 * This is preferred when deployed (hides API key from client)
 */
export async function runCodeViaProxy(options: RunCodeOptions): Promise<RunCodeResult> {
  const res = await fetch('/api/run-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options),
    signal: AbortSignal.timeout(options.timeoutMs ?? 15000),
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`API error: ${res.status} — ${error}`)
  }

  return res.json()
}

function decodeResult(result: RunCodeResult): RunCodeResult {
  const decode = (b64: string | null): string | null => {
    if (!b64) return null
    try {
      return decodeURIComponent(escape(atob(b64)))
    } catch {
      return b64  // already decoded or not base64
    }
  }

  return {
    ...result,
    stdout: decode(result.stdout),
    stderr: decode(result.stderr),
    compile_output: decode(result.compile_output),
  }
}

export function getRunStatus(result: RunCodeResult): RunStatus {
  const id = result.status.id
  if (id === 3) return 'accepted'
  if (id === 6) return 'compile_error'
  if (id >= 7 && id <= 12) return 'runtime_error'
  if (id === 5) return 'time_limit'
  if (id === 4) return 'memory_limit'
  if (id <= 2) return 'pending'
  return 'runtime_error'
}

/**
 * Get human-readable output from result
 */
export function getDisplayOutput(result: RunCodeResult): {
  text: string
  isError: boolean
} {
  const status = getRunStatus(result)

  if (status === 'accepted') {
    return {
      text: result.stdout?.trim() || '(No output)',
      isError: false,
    }
  }

  if (status === 'compile_error') {
    return {
      text: result.compile_output?.trim() || 'Compilation failed',
      isError: true,
    }
  }

  return {
    text: result.stderr?.trim() || result.compile_output?.trim() || 'Runtime error',
    isError: true,
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
