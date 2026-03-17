<div align="center">

  <img src="public/favicon.svg" width="64" height="64" alt="Belajar C++ Logo" />

  <h1>Belajar C++</h1>

  <p>Platform pembelajaran C++ gratis, interaktif, dan bilingual untuk siswa SMP & SMA Indonesia.</p>

  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
  [![Astro](https://img.shields.io/badge/Astro-v5-FF5D01?logo=astro&logoColor=white)](https://astro.build)
  [![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
  [![Deploy](https://img.shields.io/badge/Live-belajar--cpp.varnimyr.my.id-black?logo=vercel)](https://belajar-cpp.varnimyr.my.id)

</div>

---

## Tentang Project

**Belajar C++** hadir untuk mengisi kekosongan tutorial C++ modern dalam Bahasa Indonesia. Kebanyakan sumber yang ada masih mengajarkan pola lama seperti Turbo C++, `<iostream.h>`, atau `void main()` — yang sudah tidak relevan.

Platform ini mengajarkan **C++ modern (C++17)** dari nol, langsung bisa dicoba di browser tanpa install apapun.

**Ditujukan untuk:**
- Siswa SMP & SMA yang belajar C++ untuk pertama kali
- Persiapan kompetisi pemrograman (OSN, ICPC)
- Siapapun yang ingin belajar C++ dalam Bahasa Indonesia

---

## Fitur

- **Interaktif** — Editor kode langsung di browser, jalankan C++ tanpa install compiler
- **Bilingual** — Konten tersedia dalam Bahasa Indonesia dan English
- **Progresif** — Kurikulum terstruktur dari pemula hingga mahir
- **Gratis** — Selamanya, tanpa akun, tanpa iklan
- **Mobile-friendly** — Responsif dari desktop hingga HP Android low-end
- **Dark mode** — Tampilan nyaman di malam hari, didukung diagram SVG adaptive
- **Diagram visual** — Konsep kunci dijelaskan dengan ilustrasi SVG (alur kompilasi, variabel, I/O, flowchart)
- **Progress tracking** — Pantau kemajuan belajar secara lokal

---

## Kurikulum

| Unit | Topik | Lessons | Status |
|------|-------|:-------:|--------|
| 0 | Persiapan | 3 | ✅ Tersedia |
| 1 | Dasar-Dasar C++ | 8 | ✅ Tersedia |
| 2 | Percabangan | 6 | ✅ Tersedia |
| 3 | Perulangan | 7 | ✅ Tersedia |
| 4 | Fungsi | 8 | ✅ Tersedia |
| 5 | Array & Data | 7 | 🔒 Coming Soon |
| 6 | Struct & File I/O | 6 | 🔒 Coming Soon |

**32 lessons tersedia** · ~40-45 jam belajar · 2 proyek mini per unit

---

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | [Astro v5](https://astro.build) + React islands |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| Code Editor | CodeMirror 6 |
| Syntax Highlight | Shiki (one-dark-pro theme) |
| MDX Directives | remark-directive |
| C++ Execution | [Judge0 API](https://judge0.com) (server-side proxy) |
| Deployment | Vercel |

---

## Memulai Development

### Prerequisites

- Node.js 22+
- Judge0 API key ([RapidAPI](https://rapidapi.com/judge0-official/api/judge0-ce) atau [self-hosted](./JUDGE0_SELF_HOSTED.md))

### Instalasi

```bash
# Clone repository
git clone https://github.com/zedfar/belajar-cpp.git
cd belajar-cpp

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env dan isi JUDGE0_API_KEY

# Jalankan development server
npm run dev
```

Buka **http://localhost:4321** di browser.

### Environment Variables

| Variable | Keterangan | Contoh |
|----------|------------|--------|
| `JUDGE0_API_URL` | Judge0 endpoint | `https://judge0-ce.p.rapidapi.com` |
| `JUDGE0_API_KEY` | API key / auth token | `your-key-here` |
| `PUBLIC_SITE_URL` | URL production | `https://belajar-cpp.varnimyr.my.id` |

> Untuk self-host Judge0 sendiri (gratis di Oracle Cloud), lihat [JUDGE0_SELF_HOSTED.md](./JUDGE0_SELF_HOSTED.md).

### Scripts

```bash
npm run dev        # Development server (localhost:4321)
npm run build      # Production build
npm run preview    # Preview production build
npm run typecheck  # TypeScript type checking
npm test           # Run tests (vitest)
```

---

## Struktur Project

```
belajar-cpp/
├── public/
│   └── images/              # SVG diagrams (compilation flow, variables, I/O, flowcharts)
├── src/
│   ├── components/
│   │   ├── ui/              # Button, Card, Tabs
│   │   ├── layout/          # Header, Sidebar, Footer, MobileNav
│   │   ├── learn/           # CodePlayground, CodeBlock, Exercise, InfoBox
│   │   └── common/          # ThemeToggle, LanguageToggle, TableOfContents
│   ├── content/
│   │   ├── lessons-id/      # Konten lesson Bahasa Indonesia (MDX)
│   │   └── lessons-en/      # Konten lesson English (MDX)
│   ├── layouts/             # BaseLayout, PageLayout, LessonLayout
│   ├── lib/                 # i18n, progress, code-runner, curriculum
│   ├── pages/               # File-based routing Astro
│   ├── plugins/             # Custom remark plugins
│   ├── styles/              # global.css
│   └── types/               # TypeScript type definitions
├── JUDGE0_SELF_HOSTED.md    # Panduan self-host Judge0 di Oracle Cloud
├── judge0-portainer.yml     # Docker Compose stack untuk Judge0
├── PLAN.md                  # Arsitektur & rencana pengembangan
└── tailwind.config.ts       # Tailwind design tokens
```

---

## Berkontribusi

Kontribusi sangat welcome! Beberapa cara untuk berkontribusi:

- 🐛 **Laporkan bug** — [Buka issue](https://github.com/zedfar/belajar-cpp/issues)
- ✍️ **Tulis lesson** — Tambah atau perbaiki konten di `src/content/lessons-id/`
- 🌐 **Terjemahan** — Bantu terjemahkan lesson ke English di `src/content/lessons-en/`
- 💡 **Saran fitur** — Diskusikan di [Issues](https://github.com/zedfar/belajar-cpp/issues)

### Menulis Lesson Baru

Lesson ditulis dalam format MDX di `src/content/lessons-id/unit-X/`:

```markdown
---
title: "Judul Lesson"
unit: 1
lesson: 9
description: "Deskripsi singkat"
objectives:
  - "Tujuan pembelajaran 1"
estimatedTime: 30
difficulty: "beginner"
tags: ["tag1", "tag2"]
---

# Judul Lesson

Konten lesson...

:::tip
Gunakan directive ini untuk callout penting.
:::
```

> ⚠️ Operator `<`, `>`, `<=`, `>=` di teks prosa (bukan di code block) harus dibungkus backtick: `` `<=` ``

---

## Deployment

Project ini di-deploy ke **[belajar-cpp.varnimyr.my.id](https://belajar-cpp.varnimyr.my.id)**. Setiap push ke `main` akan trigger deployment otomatis.

```bash
# Build production
npm run build

# Preview sebelum deploy
npm run preview
```

Set environment variables di **Vercel Dashboard → Settings → Environment Variables**.

---

## Lisensi

Dirilis di bawah [MIT License](./LICENSE). Bebas digunakan, dimodifikasi, dan didistribusikan.

---

<div align="center">
  <sub>Dibuat dengan ❤️ untuk pelajar Indonesia &middot; <a href="https://belajar-cpp.varnimyr.my.id">belajar-cpp.varnimyr.my.id</a></sub>
</div>
