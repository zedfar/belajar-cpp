# Belajar C++

Website pembelajaran C++ gratis untuk siswa SMP dan SMA Indonesia.

## Tech Stack
- **Framework:** Astro + React islands
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4
- **Code Editor:** CodeMirror 6
- **C++ Execution:** Judge0 API
- **Deployment:** Vercel

## Quick Start
```bash
npm install
cp .env.example .env
# Edit .env dengan JUDGE0_API_KEY
npm run dev
```

## Environment Variables
- `JUDGE0_API_URL` -- Judge0 API endpoint (default: RapidAPI)
- `JUDGE0_API_KEY` -- Judge0 API key (dari RapidAPI atau self-hosted)
- `PUBLIC_SITE_URL` -- Production URL

## Project Structure
```
src/
├── components/
│   ├── ui/          # Button, Card, Tabs
│   ├── layout/      # Header, Sidebar, Footer, MobileNav
│   ├── learn/       # CodePlayground, Exercise, CodeBlock, InfoBox
│   └── common/      # LanguageToggle, ThemeToggle, SEOHead, TOC
├── content/
│   ├── lessons-id/  # Indonesian lessons (MDX)
│   └── lessons-en/  # English lessons (MDX)
├── layouts/         # BaseLayout, PageLayout, LessonLayout
├── lib/             # i18n, progress, code-runner, curriculum
├── pages/           # Routing
├── styles/          # global.css (Tailwind v4)
└── types/           # TypeScript types
```

## Curriculum
- Unit 0: Persiapan (3 lessons)
- Unit 1: Dasar-Dasar (8 lessons) -- Available
- Unit 2: Percabangan (6 lessons) -- Available
- Unit 3: Perulangan (7 lessons) -- Coming Soon
- Unit 4: Fungsi (8 lessons) -- Coming Soon
- Unit 5: Array & Data (7 lessons) -- Coming Soon
- Unit 6: Struct & File (6 lessons) -- Coming Soon

## Development Stage: DEVELOPMENT

See [PLAN.md](./PLAN.md) for full architecture plan.
