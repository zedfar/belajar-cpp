# Belajar C++

Website pembelajaran C++ gratis untuk siswa SMP dan SMA Indonesia.

## Tech Stack
- **Framework:** Astro v5 + React islands
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4
- **Code Editor:** CodeMirror 6
- **Syntax Highlight:** Shiki (one-dark-pro)
- **MDX Directives:** remark-directive
- **C++ Execution:** Judge0 API (server-side proxy)
- **Deployment:** Vercel

## Quick Start
```bash
npm install
cp .env.example .env
# Edit .env dengan JUDGE0_API_KEY
npm run dev
```

## Environment Variables
- `JUDGE0_API_URL` — Judge0 API endpoint (default: RapidAPI)
- `JUDGE0_API_KEY` — Judge0 API key (dari RapidAPI atau self-hosted)
- `PUBLIC_SITE_URL` — Production URL

## Project Structure
```
src/
├── components/
│   ├── ui/          # Button, Card, Tabs
│   ├── layout/      # Header, Sidebar, Footer, MobileNav
│   ├── learn/       # CodePlayground, Exercise, CodeBlock, InfoBox
│   └── common/      # LanguageToggle, ThemeToggle, TableOfContents
├── content/
│   ├── lessons-id/  # Indonesian lessons (MDX) — Unit 0-4
│   └── lessons-en/  # English lessons (MDX) — Unit 0
├── layouts/         # BaseLayout, PageLayout, LessonLayout
├── lib/             # i18n, progress, code-runner, curriculum
├── pages/           # Routing ([lang]/learn/[unit]/[lesson])
├── plugins/         # remark-infobox (:::note/tip/warning)
├── styles/          # global.css (Tailwind v4)
└── types/           # TypeScript types
```

## Curriculum

| Unit | Topik | Lessons | Status |
|------|-------|---------|--------|
| 0 | Persiapan | 3 | ✅ Available |
| 1 | Dasar-Dasar | 8 | ✅ Available |
| 2 | Percabangan | 6 | ✅ Available |
| 3 | Perulangan | 7 | ✅ Available |
| 4 | Fungsi | 8 | ✅ Available |
| 5 | Array & Data | 7 | 🔒 Coming Soon |
| 6 | Struct & File | 6 | 🔒 Coming Soon |

**Total tersedia: 32 lessons** (~40-45 jam belajar)

## Development Stage: ACTIVE DEVELOPMENT (~70% complete)

See [PLAN.md](./PLAN.md) for full architecture plan.
