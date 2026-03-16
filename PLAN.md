

# MIND ART CANVAS: C++ Learning Website untuk SMP/SMA Indonesia

---

## PHASE 1: GROUNDING

### Observer Declaration

Saya (AI) berperan sebagai **Co-Thinker Level 3** — bukan decision-maker. Human tetap final arbiter untuk semua keputusan arsitektur, kurikulum, dan prioritas. Analisis ini menyajikan reasoning mendalam dari 7 lens, mengidentifikasi tensions, dan menawarkan synthesis yang concrete dan actionable. Setiap rekomendasi disertai justifikasi yang bisa di-challenge.

### Focus Articulation

**Mengapa ini penting:**
- C++ tetap bahasa fundamental untuk competitive programming (OSN Komputer, ICPC), systems programming, dan game dev — tiga domain yang highly appealing untuk siswa SMP/SMA
- Resource belajar C++ dalam Bahasa Indonesia sangat terbatas dan yang ada umumnya outdated (masih pakai Turbo C++, `<iostream.h>`, `void main()`)
- Gap besar antara "tutorial C++ bahasa Inggris yang bagus" (learncpp.com, cppreference) dan kemampuan bahasa siswa SMP/SMA Indonesia
- Tidak ada platform yang menggabungkan: modern C++ + Bahasa Indonesia + interactive + mobile-friendly

**Tantangan utama:**
1. C++ punya learning curve yang steep — pointer, memory management, template — bahkan untuk orang dewasa
2. Menjalankan C++ di browser bukan trivial (butuh WASM compiler atau API)
3. Bilingual content = double maintenance burden
4. Target audience (12-18 tahun) punya attention span dan frustration tolerance yang berbeda dari adult learners
5. Device landscape Indonesia: dominan low-end Android dengan layar kecil — bukan environment ideal untuk coding

### Scope

- **In scope:** Website pembelajaran C++ dari absolute beginner sampai bisa bikin project sederhana (console-based). Stack TypeScript + Vite. Bilingual ID/EN. Responsive. Target DEVELOPMENT stage.
- **Out of scope:** LMS lengkap, user authentication system yang kompleks, forum/community platform, grading system, mobile native app, IDE lengkap.
- **Medium:** Dokumen plan yang actionable — bisa langsung dipakai sebagai referensi implementasi.

---

## PHASE 2: MULTI-LENS EXPLORATION

### C1 — Truth/Principle: Fondasi Pedagogis

**Prinsip yang HARUS benar:**

1. **Cognitive Load Theory (Sweller):** Working memory manusia terbatas ~4 chunks. C++ punya intrinsic complexity tinggi (syntax, types, pointers). Implikasinya:
   - Setiap lesson harus introduce MAKSIMAL 1-2 konsep baru
   - Scaffolding: berikan boilerplate, biarkan siswa hanya ubah bagian yang relevan
   - Faded examples: dari fully-worked → partially-complete → blank

2. **Zone of Proximal Development (Vygotsky):** Materi harus slightly above current ability. Terlalu mudah = bosan, terlalu sulit = frustrasi dan drop-off. Ini berarti:
   - Butuh progression yang sangat gradual
   - Setiap concept butuh 3-5 latihan dengan difficulty naik bertahap
   - Hint system lebih valuable daripada "lihat jawaban"

3. **Constructionism (Papert):** Belajar terbaik terjadi ketika membangun sesuatu yang bermakna. Implikasi:
   - Setiap unit harus berakhir dengan mini-project yang tangible
   - Project harus relatable untuk remaja (game sederhana, kalkulator, quiz)
   - "Lihat hasilnya langsung" adalah motivator utama

4. **Kenapa C++ (bukan Python/JS)?**
   - **Legitimate reasons:** OSN Komputer pakai C++, pemahaman low-level (memory, types) membentuk programmer yang lebih baik, competitive programming ecosystem
   - **Honest trade-off:** Python jauh lebih ramah untuk absolute beginner. C++ dipilih bukan karena lebih baik untuk belajar programming, tapi karena ada demand spesifik (kompetisi, kurikulum sekolah tertentu)
   - **Implikasi desain:** Kita HARUS memitigasi complexity C++ lewat scaffolding yang sangat hati-hati. Jangan expose siswa ke complexity yang belum mereka butuhkan (no templates, no OOP advanced, no STL internals di awal)

5. **Modern C++ vs Legacy C++:**
   - Ajarkan C++17 minimum. Jangan `using namespace std;` tanpa penjelasan, tapi juga jangan jadikan ini blocker di awal
   - `#include <iostream>`, `int main()`, `std::cout` — ini non-negotiable dari hari pertama
   - Range-based for loops, `auto` where appropriate, `std::string` instead of char arrays

**What MUST be true for this to work:**
- Siswa harus bisa menjalankan code dan lihat output dalam < 5 detik
- Error messages harus bisa dipahami (atau diterjemahkan/dijelaskan)
- Progression harus terasa: "kemarin saya belum bisa X, sekarang saya bisa"

---

### C2 — Efficiency/Economy: Stack & Trade-offs

**Framework Comparison untuk use case ini:**

| Criteria | React | Vue | Svelte | Angular | Vanilla TS |
|----------|-------|-----|--------|---------|------------|
| Learning curve (dev) | Medium | Low-Medium | Low | High | Low |
| Ecosystem maturity | Excellent | Good | Growing | Excellent | N/A |
| i18n support | react-i18next (mature) | vue-i18n (mature) | svelte-i18n (OK) | @angular/localize | DIY |
| Bundle size | ~40kb | ~30kb | ~5kb | ~100kb+ | 0kb |
| Vite integration | Native | Native | Native | Community | Native |
| Component library | MUI, Radix, shadcn | Vuetify, PrimeVue | Skeleton, DaisyUI | Angular Material | N/A |
| SSR/SSG for SEO | Next.js | Nuxt | SvelteKit | Angular Universal | Manual |
| TypeScript support | Excellent | Excellent | Good | Native | Native |
| Community size | Massive | Large | Growing | Large | N/A |
| Talent pool (Indonesia) | Large | Medium | Small | Medium | Large |

**Rekomendasi: React + TypeScript + Vite**

Justifikasi:
- **Ecosystem:** react-i18next adalah solusi i18n paling mature. Untuk bilingual platform, ini krusial.
- **Component libraries:** shadcn/ui + Tailwind = highly customizable, accessible, performant. Cocok untuk edu-platform yang butuh custom design tapi tetap accessible.
- **Code highlighting:** react-syntax-highlighter, Shiki, Prism — semua support React natively.
- **SSG capability:** Dengan framework seperti Astro (React islands) atau bahkan Vite SSG plugin, bisa generate static pages untuk SEO dan performance.
- **Developer pool:** Kalau project ini mau di-maintain/kontribusi orang lain, React punya talent pool terbesar di Indonesia.

**Kenapa bukan yang lain:**
- **Vue:** Solid choice, tapi i18n ecosystem slightly less mature. Kalau tim sudah familiar Vue, ini equally valid.
- **Svelte:** Bundle size advantage signifikan, tapi ecosystem i18n dan component library belum se-mature React/Vue. Risk: kalau butuh feature X, mungkin harus build sendiri.
- **Angular:** Over-engineered untuk project ini. Bundle size besar = problem untuk low-end devices.
- **Vanilla TS:** Maximum control, zero overhead, tapi development speed jauh lebih lambat. Harus build routing, state management, i18n dari scratch.

**COUNTER-ARGUMENT yang perlu dipertimbangkan:** Astro sebagai meta-framework. Astro + React islands bisa memberikan:
- Static HTML by default (perfect untuk content-heavy edu site)
- React components hanya untuk interactive parts (code playground)
- Built-in i18n routing
- Excellent performance score

**Verdict: Astro + React (islands) + TypeScript + Vite** mungkin lebih optimal daripada pure React SPA, karena 80% halaman adalah content statis. Tapi ini menambah satu layer complexity. Trade-off yang perlu human decide.

**Hidden waste — fitur yang terlihat penting tapi sebenarnya membuang development time:**
1. ~~User authentication~~ — Untuk DEVELOPMENT stage, local storage progress cukup
2. ~~Forum/community~~ — Pakai Discord/Telegram link saja
3. ~~Custom code editor~~ — Pakai Monaco Editor (VS Code engine) atau CodeMirror, jangan build sendiri
4. ~~Grading/auto-scoring~~ — Cukup "check output match expected" di client-side
5. ~~Admin panel~~ — Content sebagai MDX files, edit via Git
6. ~~Dark mode~~ — Nice-to-have tapi bukan MVP priority (actually, untuk coding dark mode cukup standard, bisa pakai Tailwind dark mode yang almost free)

**MVP scope yang realistis:**
- 10-15 lesson pages dengan content bilingual
- Embedded code editor dengan kemampuan run C++ (via API/WASM)
- Progress tracking via localStorage
- Mobile responsive
- Deployment ke Vercel/Netlify (free tier)

---

### C3 — Risk/Failure: Apa yang Bisa Salah

**1. Student Drop-off (HIGH RISK)**
- **Cause:** C++ compilation errors yang cryptic, concept jump terlalu besar, bosan
- **Mitigation:**
  - Error message translator/explainer (bahkan rule-based mapping common errors → penjelasan Indonesia)
  - Micro-lessons (5-10 menit max per lesson)
  - Visual progress indicator yang gamified (progress bar, checkmarks)
  - "Sandbox mode" di awal — siswa bermain dengan code yang sudah jadi sebelum harus tulis sendiri

**2. Browser-based C++ Execution (HIGH RISK)**
- **Options:**
  - **Option A: Server-side compilation API** — Butuh backend, ada latency, ada cost, ada security concern (arbitrary code execution)
  - **Option B: WASM-based (Emscripten/Cheerp)** — Client-side, no server needed, tapi compilation lambat di low-end devices, initial WASM load besar (~5-10MB)
  - **Option C: Third-party API** (Wandbox, Judge0, Godbolt) — Gratis/murah, tapi dependency pada service availability
  - **Option D: Hybrid** — Simple exercises pakai pre-defined test cases (client-side string match), complex ones pakai API
- **Recommendation:** Option C (Judge0 API) sebagai primary, dengan fallback ke external link (repl.it, onlinegdb.com). WASM terlalu berat untuk low-end Android.
- **Risk mitigation:** Cache compilation results untuk common exercises. Provide "expected output" sehingga siswa bisa verify secara manual jika API down.

**3. Bilingual Maintenance Overhead (MEDIUM RISK)**
- Setiap content update harus dilakukan di 2 bahasa
- **Mitigation:** Indonesia-first. English sebagai secondary. Gunakan i18n key-based system dimana UI strings di-translate, tapi lesson CONTENT bisa bilingual via MDX dengan language toggle.
- **Risk:** Kualitas English translation bisa inferior kalau bukan native speaker yang translate
- **Accept:** Untuk DEVELOPMENT stage, OK jika English version slightly behind Indonesian version

**4. Mobile Coding Experience (MEDIUM RISK)**
- Menulis code di keyboard HP layar 5" adalah painful experience
- **Mitigation:**
  - Code examples yang bisa di-run tanpa editing (tap to run)
  - Untuk exercises: fill-in-the-blank daripada tulis dari scratch di mobile
  - "Copy to clipboard" button agar siswa bisa paste ke IDE di desktop
  - Hint: "Untuk pengalaman terbaik, gunakan laptop/PC"
  - Consider: code input via predefined blocks/buttons untuk mobile (bukan free-text typing)

**5. Scope Creep (HIGH RISK)**
- Dari "website belajar" jadi "LMS lengkap"
- **Mitigation:** Strict MoSCoW prioritization. Phase 1 = content + basic interactivity. Phase 2 = enhanced features. Jangan Phase 2 sebelum Phase 1 selesai.

**6. Content Quality & Accuracy (MEDIUM RISK)**
- C++ punya banyak undefined behavior, platform-specific behavior
- Code examples yang works di GCC tapi tidak di MSVC
- **Mitigation:** Standardize pada GCC/Clang, note platform differences hanya jika critical

---

### C4 — Aesthetic/Structural Elegance

**Design System untuk Usia 12-18 Tahun:**

**Prinsip:**
- Clean, not childish. Siswa SMP/SMA ingin merasa "dewasa" — jangan pakai desain yang terlalu kartun
- High contrast, readable. Banyak yang belajar di kondisi pencahayaan buruk (layar HP di bawah matahari)
- Consistent visual language. Setiap jenis konten (penjelasan, code, exercise, tip) punya visual yang distinct

**Color Palette:**

```
Primary:     #2563EB (Blue-600) — Trust, technology, learning
Secondary:   #7C3AED (Violet-600) — Creativity, exploration
Accent:      #10B981 (Emerald-500) — Success, correct answers
Warning:     #F59E0B (Amber-500) — Hints, caution
Error:       #EF4444 (Red-500) — Compilation errors, mistakes
Background:  #FAFAFA (light) / #0F172A (dark)
Surface:     #FFFFFF (light) / #1E293B (dark)
Text:        #1E293B (light) / #E2E8F0 (dark)
Code BG:     #1E1E1E (always dark — coding convention)
```

**Typography:**

```
Headings:    Inter (or Geist) — clean, modern, good Indonesian character support
Body:        Inter — same family for consistency
Code:        JetBrains Mono — excellent for code, free, supports ligatures
Sizes:
  H1: 2rem (32px) — page titles
  H2: 1.5rem (24px) — section headers
  H3: 1.25rem (20px) — subsection
  Body: 1rem (16px) — min 16px for mobile readability
  Code: 0.875rem (14px) — slightly smaller, monospace compensates
  Small: 0.75rem (12px) — captions, metadata
Line height: 1.6 for body, 1.4 for headings, 1.5 for code
```

**Spacing System (8px grid):**

```
xs:  4px   (0.25rem)
sm:  8px   (0.5rem)
md:  16px  (1rem)
lg:  24px  (1.5rem)
xl:  32px  (2rem)
2xl: 48px  (3rem)
3xl: 64px  (4rem)
```

**Information Architecture:**

```
Linear progression with optional side-quests:

[Home] → [Curriculum Overview] → [Unit 1] → [Lesson 1.1] → [Lesson 1.2] → ... → [Unit 1 Project]
                                          ↘ [Side Quest: Fun Facts about C++]
                                 → [Unit 2] → ...

URL structure:
/                          → Landing page
/curriculum                → Overview semua unit
/learn/unit-1              → Unit overview
/learn/unit-1/lesson-1     → Individual lesson
/learn/unit-1/project      → Unit project
/playground                → Free-form code playground
/about                     → Tentang platform
```

**Navigation Pattern:**
- **Desktop:** Sidebar kiri (collapsible) dengan curriculum tree + progress indicators. Top bar untuk language toggle, theme toggle.
- **Mobile:** Bottom navigation (Home, Learn, Playground, Progress). Lesson navigation via swipe atau next/prev buttons.
- **Progress tracker:** Progress bar di setiap unit, checkmarks per lesson. Visual: filled circle = done, half = in progress, empty = not started.

**UI Components Utama:**

1. **LessonContent** — MDX-rendered content dengan prose styling
2. **CodeBlock** — Syntax-highlighted code dengan copy button, line numbers
3. **CodePlayground** — Editable code + run button + output panel (split view desktop, stacked mobile)
4. **Exercise** — Problem statement + code input + check button + hint system
5. **InfoBox** — Variasi: tip (blue), warning (amber), error-explain (red), fun-fact (violet)
6. **ProgressBar** — Unit-level dan overall progress
7. **LanguageToggle** — ID/EN switch, persistent via localStorage
8. **QuizCard** — Multiple choice atau fill-in-blank untuk concept check

---

### C5 — Human Impact/Ethics

**Cognitive & Motivational Factors untuk Remaja Indonesia:**

1. **Frustrasi tolerance rendah.** Siswa SMP/SMA yang baru pertama kali coding bisa give up dalam 10 menit jika error pertama tidak bisa di-resolve. **→ Error handling/explanation harus excellent.**

2. **Social validation penting.** Bisa share progress/achievement ke teman = motivator kuat. **→ Shareable completion badges (gambar yang bisa di-save/share, bukan butuh social login).**

3. **Bahasa Inggris bukan barrier utama untuk coding syntax** (semua programming pakai English keywords), **tapi barrier besar untuk PENJELASAN konsep.** **→ Indonesia-first untuk explanation, English untuk code syntax/terminology. Provide glossary.**

4. **Device landscape:**
   - Mayoritas siswa akses via Android phone (bukan tablet/laptop)
   - RAM 2-3GB, storage terbatas
   - Koneksi: bervariasi dari 4G kota besar sampai 3G/Edge di daerah
   - **→ Performance budget: < 200KB initial JS, < 1MB total page weight. Lazy load images dan code playground.**

5. **Privacy:**
   - JANGAN require login/akun untuk akses konten
   - Progress tracking via localStorage = no server-side data collection
   - Jika nanti butuh login (save progress across devices), use Google OAuth (familiar untuk siswa) dan MINIMAL data collection
   - Comply dengan UU PDP (Undang-Undang Pelindungan Data Pribadi) Indonesia

6. **Equity concerns:**
   - Konten harus accessible TANPA login
   - Harus functional di browser lama (Chrome 80+, masih banyak HP Android lama)
   - Progressive enhancement: basic content readable tanpa JS jika memungkinkan (SSG advantage)
   - Provide offline worksheet/PDF download untuk siswa yang tidak punya internet konsisten

7. **Terminology decision:**
   - Programming terms: tetap English ("variable", "function", "loop") karena ini universal
   - Explanation: Bahasa Indonesia
   - Hybrid natural: "Variabel adalah tempat menyimpan data" (Indonesian explanation, English term)

---

### C6 — Long-term Evolution

**Evolution Path:**

**Phase now → 6 months:**
- Content-focused: 15-20 lessons, 3-5 mini projects
- Static site dengan embedded playground
- No user accounts

**6 months → 1 year:**
- User accounts (optional, untuk cross-device progress sync)
- Community: Discord/Telegram integration
- More content: intermediate topics (arrays, functions, file I/O)
- Kontribusi dari guru/community (content as MDX = easy PR)

**1 year → 2 years:**
- Multiple language tracks (Python, Java) sharing same infrastructure
- AI-assisted error explanation (LLM API yang explain C++ errors in Bahasa Indonesia)
- Certificate of completion (downloadable PDF)
- Teacher dashboard (untuk guru yang assign lessons ke murid)
- Competitive programming track (OSN preparation)

**Architecture decisions yang enable evolution:**
- Content as MDX files = easy to add/update tanpa code changes
- i18n dari hari pertama = adding languages later tanpa refactor
- Component-based UI = swap/upgrade individual parts
- API abstraction for code execution = swap provider tanpa touching UI
- Curriculum metadata in structured format (YAML/JSON) = bisa generate curriculum views, progress tracking, etc.

**Apakah bisa support bahasa pemrograman lain?**
- Ya, jika architecture benar: content + curriculum terpisah dari execution engine
- Code playground tinggal swap language di API call
- UI components (CodeBlock, Exercise) sudah language-agnostic
- Tapi: JANGAN design untuk multi-language dari awal. Design untuk C++ first, pastikan extensible, tambah language nanti.

---

### C7 — Exploration/Creativity

**What-if scenarios:**

**1. Gamification penuh (XP, badges, leaderboard)**
- PRO: Dopamine loop yang proven effective untuk remaja. Duolingo-style streaks.
- CON: Development effort besar. Risk: siswa fokus pada points bukan learning. Butuh backend untuk leaderboard.
- VERDICT: Partial adoption. Progress badges (client-side) = YES. XP/leaderboard = NO untuk MVP. Bisa ditambah nanti.

**2. AI tutor terintegrasi**
- PRO: Game-changer. "Kenapa code saya error?" → AI explain dalam Bahasa Indonesia.
- CON: API cost (GPT/Claude API). Privacy concern (siswa send code ke AI). Latency.
- VERDICT: Not for MVP. Tapi design architecture sehingga bisa plug-in AI tutor later. Untuk sekarang: curated error message explanations (static, rule-based).

**3. Collaborative coding**
- PRO: Pair programming proven effective untuk learning
- CON: Butuh real-time infra (WebSocket, CRDT). Massive scope increase.
- VERDICT: Out of scope. Siswa bisa share code via link/copy-paste.

**4. Offline-first PWA**
- PRO: Sangat valuable untuk siswa di daerah internet terbatas
- CON: Service worker complexity. Code execution pasti butuh internet (kecuali WASM, yang berat).
- VERDICT: Progressive enhancement. Content pages = cacheable via service worker. Code playground = requires internet. This is achievable with relatively low effort.

**5. Visual programming bridge (Scratch → C++)**
- PRO: Powerful onboarding. Drag-and-drop blocks → lihat generated C++ code.
- CON: Building a visual programming interface is a massive project in itself.
- VERDICT: Too ambitious. Instead: show visual diagrams/flowcharts alongside C++ code. "This flowchart = this code." Pencil illustrations or simple SVGs.

**Unconventional idea yang actually feasible:**
- **"Explain this code" mode:** Siswa hover/tap bagian code, muncul tooltip penjelasan. Relatively easy to implement, high learning value.
- **"Spot the bug" exercises:** Tampilkan code dengan intentional bug, siswa harus temukan. Fun, builds debugging skills.
- **Story-driven lessons:** Setiap unit punya mini narrative ("Kamu sedang membuat program untuk toko kue Bu Ani..."). Low-effort, high engagement for teenagers.

---

## PHASE 3: TENSION MAPPING

### Tension 1: Simplicity vs Completeness
```
C++ itu BESAR. Bahkan subset yang "basic" sudah banyak.
Website ini harus KECIL dan FOCUSED untuk pemula.
→ Resolution: Ruthlessly curate. Teach 20% of C++ that covers 80% of beginner needs.
   Skip: templates, inheritance advanced, operator overloading, pointers to pointers
   Include: variables, I/O, conditions, loops, functions, arrays, strings, structs (basic)
```

### Tension 2: Bilingual vs Quality
```
Double content = double maintenance = double chance of errors/inconsistency.
→ Resolution: Indonesia FIRST. English sebagai bonus, not obligation.
   UI strings: fully bilingual (i18n keys, small effort).
   Lesson content: Write in Indonesian, English translation as separate track that
   MAY lag behind. Explicit label: "English version may not be up to date."
```

### Tension 3: Interactive Playground vs Simplicity
```
Running C++ in browser is non-trivial.
Static site is trivial.
→ Resolution: Use Judge0 API (free tier: 50 req/day, or self-host).
   Fallback: "Open in OnlineGDB" link.
   Code playground as lazy-loaded component (not loaded until user clicks "Run").
   Performance budget: playground only loads when needed.
```

### Tension 4: Mobile-first vs Desktop-optimal for coding
```
Coding on mobile is painful. But most Indonesian students primarily have phones.
→ Resolution: READING is mobile-first. CODING is desktop-recommended.
   Mobile: read lessons, run pre-written examples, do fill-in-blank exercises.
   Desktop: full code playground, write-from-scratch exercises.
   Adaptive UI: show simplified exercise on mobile, full playground on desktop.
```

### Tension 5: Prototype Speed vs Production Readiness
```
CLAUDE.md says "speed > polish" for prototyping.
But target is DEVELOPMENT stage heading toward production.
→ Resolution: Phase 1 = prototype (2-3 lessons, basic functionality, validate approach).
   Phase 2 = develop (full curriculum, polish, deploy).
   Don't over-engineer Phase 1. Don't under-engineer Phase 2.
```

### Tension 6: Free/Open vs Sustainable
```
Target audience = students who likely can't/won't pay.
Hosting + API calls = cost money.
→ Resolution: Static site on Vercel/Netlify (free).
   Judge0 API free tier or self-hosted.
   Content open-source. Donations/sponsorship later.
   Keep operational cost < $10/month. Achievable with static site + API free tier.
```

---

## PHASE 4: SYNTHESIS — THE PLAN

### 1. Tech Stack Decision

```
Framework:     React 18+  (via Vite or Astro — see below)
Language:      TypeScript (strict mode)
Styling:       Tailwind CSS v4
Components:    shadcn/ui (selective: Button, Card, Tabs, Dialog, Tooltip)
Meta-framework: Astro (with React islands for interactive components)
i18n:          Astro built-in i18n routing + custom content system
Code Editor:   CodeMirror 6 (lighter than Monaco, better mobile support)
Syntax Highlight: Shiki (built into Astro, SSR-rendered)
C++ Execution: Judge0 API (primary) + "Open in OnlineGDB" fallback
Content:       MDX files (Astro native MDX support)
Deployment:    Vercel (free tier)
Package Manager: pnpm
```

**Kenapa Astro + React islands (bukan pure React SPA):**
- 80% halaman adalah static content (lessons, curriculum overview)
- Astro renders static HTML by default → excellent performance on low-end devices
- Interactive components (code playground, exercises) loaded as React islands → JS only where needed
- Built-in i18n routing (`/id/learn/...`, `/en/learn/...`)
- Built-in MDX support
- SSG = CDN-cacheable = fast globally
- Lighthouse score: realistically 95+ tanpa optimization effort

**Counter-argument:** Jika tim lebih familiar dengan Next.js/React Router dan SPA pattern, pure React SPA tetap valid. Performance bisa dioptimize dengan code splitting. Tapi starting point Astro sudah lebih ringan.

---

### 2. Curriculum Roadmap

**Target total: 6 Units, ~30 lessons, ~40-60 jam belajar mandiri**
**Target audience: Siswa SMP kelas 8+ / SMA, zero programming experience**

---

#### Unit 0: Persiapan (Prerequisite)
*Estimasi: 1-2 jam*

| # | Lesson | Topik | Waktu | Learning Objective |
|---|--------|-------|-------|-------------------|
| 0.1 | Apa itu Programming? | Konsep dasar, analogi resep masak/instruksi | 20 min | Understand what a program is |
| 0.2 | Setup Lingkungan | Install compiler (MinGW/MSYS2/Online) atau gunakan playground | 30 min | Can compile and run "Hello World" |
| 0.3 | Tour Playground | Cara pakai code editor di website | 10 min | Comfortable with the platform |

---

#### Unit 1: Dasar-Dasar (Fundamentals)
*Estimasi: 8-10 jam*

| # | Lesson | Topik | Waktu | Learning Objective |
|---|--------|-------|-------|-------------------|
| 1.1 | Hello, World! | `#include`, `int main()`, `cout`, `return 0` | 30 min | Write and understand minimal C++ program |
| 1.2 | Komentar & Struktur | Single-line, multi-line comments, code structure | 20 min | Add comments, understand program flow |
| 1.3 | Variabel & Tipe Data | `int`, `double`, `char`, `string`, `bool`, deklarasi | 45 min | Declare and use variables |
| 1.4 | Input & Output | `cin`, `cout`, formatting dasar | 30 min | Read user input, display output |
| 1.5 | Operasi Aritmatika | `+`, `-`, `*`, `/`, `%`, precedence | 30 min | Perform calculations |
| 1.6 | String Dasar | `std::string`, concatenation, `.length()` | 30 min | Manipulate text |
| 1.7 | Konstanta & Auto | `const`, `auto`, kenapa dan kapan | 20 min | Use constants appropriately |
| **Project 1** | **Kalkulator Sederhana** | Input 2 angka + operasi → hasil | 60 min | Apply all Unit 1 concepts |

*Milestone: Siswa bisa membuat program yang menerima input dan menampilkan output.*

---

#### Unit 2: Percabangan (Decision Making)
*Estimasi: 6-8 jam*

| # | Lesson | Topik | Waktu | Learning Objective |
|---|--------|-------|-------|-------------------|
| 2.1 | Operator Perbandingan | `==`, `!=`, `<`, `>`, `<=`, `>=` | 20 min | Compare values |
| 2.2 | If-Else | `if`, `else`, `else if`, nested if | 40 min | Make decisions in code |
| 2.3 | Operator Logika | `&&`, `||`, `!`, truth tables | 30 min | Combine conditions |
| 2.4 | Switch-Case | `switch`, `case`, `break`, `default` | 30 min | Use switch for multi-branch |
| 2.5 | Ternary Operator | `condition ? a : b` | 15 min | Write concise conditions |
| **Project 2** | **Game Tebak Angka** | Random number + user guess + feedback | 60 min | Apply conditions and I/O |

*Milestone: Siswa bisa membuat program yang merespons berbeda berdasarkan input.*

---

#### Unit 3: Perulangan (Loops)
*Estimasi: 8-10 jam*

| # | Lesson | Topik | Waktu | Learning Objective |
|---|--------|-------|-------|-------------------|
| 3.1 | While Loop | `while`, infinite loop, loop control | 40 min | Repeat actions with while |
| 3.2 | For Loop | `for`, counter patterns, range | 40 min | Repeat actions with for |
| 3.3 | Do-While | `do-while`, kapan dipakai | 20 min | Understand do-while use case |
| 3.4 | Break & Continue | Flow control dalam loop | 25 min | Control loop execution |
| 3.5 | Nested Loops | Loop dalam loop, pattern printing | 40 min | Use nested loops |
| 3.6 | Loop Patterns | Star patterns, number patterns (favorit!) | 45 min | Apply loops creatively |
| **Project 3** | **Pola Bintang Generator** | User pilih pola → program cetak pola | 60 min | Combine loops + conditions |

*Milestone: Siswa bisa menggunakan loop untuk mengotomasi tugas berulang.*

---

#### Unit 4: Fungsi (Functions)
*Estimasi: 8-10 jam*

| # | Lesson | Topik | Waktu | Learning Objective |
|---|--------|-------|-------|-------------------|
| 4.1 | Apa itu Fungsi? | Konsep, analogi, kenapa perlu | 30 min | Understand function purpose |
| 4.2 | Membuat Fungsi | Deklarasi, definisi, pemanggilan | 40 min | Write and call functions |
| 4.3 | Parameter & Argumen | Pass by value, multiple parameters | 35 min | Pass data to functions |
| 4.4 | Return Values | Return types, `void`, multiple returns pattern | 35 min | Return data from functions |
| 4.5 | Pass by Reference | `&`, kenapa dan kapan | 30 min | Modify variables via reference |
| 4.6 | Overloading | Nama sama, parameter beda | 25 min | Understand function overloading |
| 4.7 | Scope & Lifetime | Local vs global, variable lifetime | 30 min | Understand variable scope |
| **Project 4** | **Mini Game: Batu Gunting Kertas** | Fungsi untuk logic, random, scoring | 75 min | Decompose problem into functions |

*Milestone: Siswa bisa memecah program menjadi fungsi-fungsi reusable.*

---

#### Unit 5: Array & Data (Collections)
*Estimasi: 8-10 jam*

| # | Lesson | Topik | Waktu | Learning Objective |
|---|--------|-------|-------|-------------------|
| 5.1 | Array Dasar | Deklarasi, akses, modifikasi | 40 min | Store multiple values |
| 5.2 | Array & Loop | Iterasi array, range-based for | 35 min | Process array elements |
| 5.3 | Array 2D | Matriks, tabel | 35 min | Work with 2D data |
| 5.4 | std::vector | Dynamic array, `.push_back()`, `.size()` | 40 min | Use vectors |
| 5.5 | String sebagai Array | Character access, manipulation | 25 min | Manipulate strings as arrays |
| 5.6 | Sorting & Searching | `sort()`, linear search, binary search intro | 40 min | Organize and find data |
| **Project 5** | **Buku Nilai Siswa** | Input nilai → rata-rata, min, max, sorting | 90 min | Process real-world data |

*Milestone: Siswa bisa bekerja dengan kumpulan data.*

---

#### Unit 6: Struct & File (Data Organization)
*Estimasi: 6-8 jam*

| # | Lesson | Topik | Waktu | Learning Objective |
|---|--------|-------|-------|-------------------|
| 6.1 | Struct | Definisi, member access, array of struct | 40 min | Group related data |
| 6.2 | Struct & Function | Pass struct ke fungsi | 30 min | Use structs with functions |
| 6.3 | File Input | `ifstream`, membaca dari file | 35 min | Read data from files |
| 6.4 | File Output | `ofstream`, menulis ke file | 30 min | Save data to files |
| 6.5 | Enum & Typedef | `enum`, type alias | 25 min | Create custom types |
| **Final Project** | **Aplikasi Manajemen Kontak** | CRUD kontak + save/load file | 120 min | Integrate all concepts |

*Milestone: Siswa bisa membuat program yang menyimpan dan mengelola data.*

---

**Post-Curriculum Paths (future content):**
- Competitive Programming Track (sorting algorithms, greedy, DP intro)
- OOP Track (classes, inheritance, polymorphism)
- Game Dev Track (simple terminal-based games)

---

### 3. Architecture Blueprint

```
belajar-cpp/                          # Project root
├── astro.config.mjs                  # Astro configuration
├── tailwind.config.ts                # Tailwind + design tokens
├── tsconfig.json
├── package.json
├── public/
│   ├── fonts/                        # JetBrains Mono, Inter (self-hosted)
│   │   ├── inter-var.woff2
│   │   └── jetbrains-mono-var.woff2
│   ├── images/
│   │   ├── og-default.png            # Social share image
│   │   └── icons/                    # Favicons, PWA icons
│   └── manifest.json                 # PWA manifest (future)
├── src/
│   ├── components/                   # Shared UI components
│   │   ├── ui/                       # shadcn-style base components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Tabs.tsx
│   │   │   ├── Tooltip.tsx
│   │   │   └── Dialog.tsx
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Sidebar.astro
│   │   │   ├── Footer.astro
│   │   │   ├── MobileNav.astro
│   │   │   └── ProgressBar.astro
│   │   ├── learn/
│   │   │   ├── CodePlayground.tsx     # React island — code editor + run
│   │   │   ├── CodeBlock.astro        # Static syntax-highlighted code
│   │   │   ├── Exercise.tsx           # React island — interactive exercise
│   │   │   ├── QuizCard.tsx           # React island — quiz component
│   │   │   ├── InfoBox.astro          # Tip/Warning/Note boxes
│   │   │   ├── LessonNav.astro        # Previous/Next navigation
│   │   │   └── ExplainTooltip.tsx     # React island — hover explanations
│   │   └── common/
│   │       ├── LanguageToggle.astro
│   │       ├── ThemeToggle.astro
│   │       ├── SEOHead.astro
│   │       └── TableOfContents.astro
│   ├── content/                       # MDX content (Astro content collections)
│   │   ├── config.ts                  # Content collection schema
│   │   ├── lessons/
│   │   │   ├── id/                    # Indonesian content
│   │   │   │   ├── unit-0/
│   │   │   │   │   ├── 01-apa-itu-programming.mdx
│   │   │   │   │   ├── 02-setup-lingkungan.mdx
│   │   │   │   │   └── 03-tour-playground.mdx
│   │   │   │   ├── unit-1/
│   │   │   │   │   ├── 01-hello-world.mdx
│   │   │   │   │   ├── 02-komentar-struktur.mdx
│   │   │   │   │   └── ...
│   │   │   │   └── unit-6/
│   │   │   └── en/                    # English content (mirrors id/ structure)
│   │   │       ├── unit-0/
│   │   │       │   ├── 01-what-is-programming.mdx
│   │   │       │   └── ...
│   │   │       └── ...
│   │   ├── curriculum/
│   │   │   ├── id.yaml               # Curriculum metadata (ID)
│   │   │   └── en.yaml               # Curriculum metadata (EN)
│   │   └── glossary/
│   │       ├── id.yaml               # Term definitions
│   │       └── en.yaml
│   ├── layouts/
│   │   ├── BaseLayout.astro           # HTML shell, fonts, meta
│   │   ├── LessonLayout.astro         # Sidebar + content + nav
│   │   └── PageLayout.astro           # Generic page
│   ├── pages/
│   │   ├── index.astro                # Landing page (auto-redirect to /id or /en)
│   │   ├── [lang]/
│   │   │   ├── index.astro            # Home per language
│   │   │   ├── curriculum.astro       # Curriculum overview
│   │   │   ├── playground.astro       # Free playground page
│   │   │   ├── about.astro
│   │   │   └── learn/
│   │   │       ├── [unit]/
│   │   │       │   ├── index.astro    # Unit overview
│   │   │       │   └── [lesson].astro # Dynamic lesson page
│   │   │       └── index.astro        # Redirect to curriculum
│   │   └── api/                       # API routes (if needed)
│   │       └── run-code.ts            # Proxy to Judge0 (hides API key)
│   ├── lib/                           # Utility functions
│   │   ├── i18n.ts                    # Translation utilities
│   │   ├── progress.ts               # localStorage progress tracking
│   │   ├── code-runner.ts             # Judge0 API wrapper
│   │   └── curriculum.ts             # Curriculum data helpers
│   ├── styles/
│   │   └── global.css                 # Tailwind imports + custom styles
│   └── types/
│       ├── lesson.ts                  # Content type definitions
│       ├── progress.ts               # Progress state types
│       └── curriculum.ts
└── tests/                             # Vitest tests (DEVELOPMENT stage)
    ├── lib/
    │   ├── progress.test.ts
    │   └── code-runner.test.ts
    └── components/
        └── Exercise.test.tsx
```

**Key architectural decisions:**

1. **Content Collections (Astro):** Lessons defined as MDX with typed frontmatter. Schema enforced via Zod in `config.ts`. This gives us type-safe content with validation at build time.

2. **React Islands:** Only 4 components need client-side interactivity:
   - `CodePlayground` — code editing + execution
   - `Exercise` — interactive exercises with checking
   - `QuizCard` — multiple choice quizzes
   - `ExplainTooltip` — hover/tap code explanations
   
   Everything else is static HTML rendered at build time.

3. **API route for code execution:** `/api/run-code.ts` acts as a proxy to Judge0 API, hiding the API key from the client. This is a serverless function on Vercel.

4. **Progress as client-side state:** No backend needed. `localStorage` stores:
   ```typescript
   interface UserProgress {
     completedLessons: string[];      // ["unit-1/01", "unit-1/02"]
     currentLesson: string | null;
     exerciseResults: Record<string, boolean>;
     language: 'id' | 'en';
     theme: 'light' | 'dark';
     lastVisited: string;             // ISO date
   }
   ```

---

### 4. Design System

Already covered in C4 analysis. Summary of tokens:

```typescript
// tailwind.config.ts — design tokens
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF', 100: '#DBEAFE', 200: '#BFDBFE',
          300: '#93C5FD', 400: '#60A5FA', 500: '#3B82F6',
          600: '#2563EB', 700: '#1D4ED8', 800: '#1E40AF',
          900: '#1E3A8A', 950: '#172554'
        },
        accent: {
          500: '#7C3AED'  // violet
        },
        success: {
          500: '#10B981'  // emerald
        },
        warning: {
          500: '#F59E0B'  // amber
        },
        error: {
          500: '#EF4444'  // red
        },
        code: {
          bg: '#1E1E1E',
          text: '#D4D4D4'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace']
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '72ch',
            lineHeight: '1.6',
            code: {
              backgroundColor: '#F1F5F9',
              padding: '0.125rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '400'
            }
          }
        }
      }
    }
  }
}
```

**Component visual specs:**

- **InfoBox variants:**
  - `tip`: left-border blue-500, bg blue-50, icon lightbulb
  - `warning`: left-border amber-500, bg amber-50, icon alert-triangle
  - `error`: left-border red-500, bg red-50, icon x-circle
  - `fun`: left-border violet-500, bg violet-50, icon sparkles

- **CodePlayground layout:**
  - Desktop: side-by-side (editor left, output right), 50/50 split
  - Mobile: stacked (editor top, output bottom), full width
  - Editor min-height: 200px desktop, 150px mobile
  - Run button: prominent, green (success-500), bottom-right of editor
  - Output area: dark background (code-bg), monospace font

- **Exercise component:**
  - Problem statement in card with light background
  - Code input area (if fill-in-blank: inline input fields in code)
  - "Check" button: primary color
  - Feedback: success/error animation (subtle, not distracting)
  - "Hint" button: secondary, reveals progressive hints (hint 1 → hint 2 → solution)

---

### 5. Bilingual i18n Strategy

**Approach: Content-level bilingual, not key-based i18n for lessons**

Two separate systems:

**System 1: UI Strings (key-based i18n)**
For buttons, navigation, labels, error messages.

```typescript
// src/lib/i18n.ts
const uiStrings = {
  id: {
    nav: {
      home: 'Beranda',
      curriculum: 'Kurikulum',
      playground: 'Playground',
      about: 'Tentang'
    },
    lesson: {
      next: 'Selanjutnya',
      previous: 'Sebelumnya',
      runCode: 'Jalankan',
      checkAnswer: 'Periksa Jawaban',
      showHint: 'Tampilkan Petunjuk',
      completed: 'Selesai!',
      tryAgain: 'Coba Lagi'
    },
    progress: {
      overall: 'Progress Keseluruhan',
      lessonsCompleted: '{count} dari {total} pelajaran selesai',
      unitComplete: 'Unit {unit} selesai!'
    }
    // ...
  },
  en: {
    nav: {
      home: 'Home',
      curriculum: 'Curriculum',
      playground: 'Playground',
      about: 'About'
    },
    // ...
  }
}
```

**System 2: Lesson Content (separate MDX files per language)**

```
content/lessons/
├── id/unit-1/01-hello-world.mdx     # Indonesian lesson
└── en/unit-1/01-hello-world.mdx     # English lesson
```

Each MDX file has frontmatter:
```yaml
---
title: "Hello, World!"
unit: 1
lesson: 1
description: "Program pertamamu dalam C++"
objectives:
  - "Menulis program C++ minimal"
  - "Memahami #include, main(), dan cout"
estimatedTime: 30       # minutes
prerequisites: ["unit-0/03"]
---
```

**URL routing:**
```
/id/learn/unit-1/hello-world     → Indonesian content
/en/learn/unit-1/hello-world     → English content
```

**Language detection priority:**
1. URL path (`/id/` or `/en/`)
2. localStorage preference
3. Browser `navigator.language`
4. Default: `id` (Indonesian)

**Content sync strategy:**
- Indonesian is the "source of truth"
- English files can have `translationStatus: 'draft' | 'reviewed' | 'outdated'` in frontmatter
- Build-time warning if English lesson is missing or outdated
- UI shows "This lesson is not yet available in English" gracefully

---

### 6. Feature Prioritization (MoSCoW)

**MUST have (MVP / Phase 1):**
- [ ] Static lesson pages with MDX content (minimum Unit 0 + Unit 1)
- [ ] Syntax-highlighted code blocks (Shiki, SSR)
- [ ] Language toggle (ID/EN) with URL routing
- [ ] Responsive layout (mobile-readable)
- [ ] Code playground with Judge0 API integration
- [ ] Progress tracking via localStorage
- [ ] Curriculum overview page
- [ ] Basic navigation (sidebar desktop, bottom nav mobile)
- [ ] Dark/light theme toggle
- [ ] SEO: meta tags, Open Graph

**SHOULD have (Phase 2):**
- [ ] Interactive exercises (fill-in-blank, match output)
- [ ] Progressive hint system
- [ ] Unit completion badges (visual, saveable)
- [ ] Table of contents per lesson
- [ ] Glossary page (programming terms ID↔EN)
- [ ] "Explain this code" tooltips
- [ ] PWA: service worker for offline content reading
- [ ] Full curriculum content (Unit 2-6)

**COULD have (Phase 3):**
- [ ] Quiz/assessment per unit
- [ ] "Spot the bug" exercises
- [ ] Story-driven lesson narratives
- [ ] Shareable completion certificate (generated image)
- [ ] Keyboard shortcuts for playground
- [ ] Code snippet sharing (URL-encoded state)

**WON'T have (not in scope):**
- User authentication / accounts
- Server-side progress storage
- Forum / community features
- AI tutor integration
- Video content
- Collaborative coding
- Admin panel / CMS
- Multi-language programming support (Python, Java)

---

### 7. Deployment Strategy

**Hosting: Vercel (free Hobby plan)**
- Astro SSG output → static files on CDN
- Serverless function for `/api/run-code` (Judge0 proxy)
- Free SSL, global CDN, automatic deploys from Git
- Alternative: Netlify (equally valid, similar free tier)

**CI/CD Pipeline:**
```
GitHub Push → Vercel Auto-Deploy
  ├── Build: astro build (type-check + build)
  ├── Preview: PR deployments for review
  └── Production: main branch → production URL
```

**Performance Budget:**
| Metric | Target | Rationale |
|--------|--------|-----------|
| First Contentful Paint | < 1.5s | Low-end device on 3G |
| Largest Contentful Paint | < 2.5s | Core Web Vital |
| Total Blocking Time | < 200ms | Interactivity |
| Initial JS bundle | < 50KB (gzipped) | Astro islands = minimal JS |
| Page weight (lesson) | < 300KB total | Low-bandwidth friendly |
| Lighthouse Performance | > 90 | Quality bar |

**Code execution API:**
- Primary: Judge0 CE (Community Edition) — self-hostable, or use RapidAPI free tier
- Rate limiting: 50 requests/day per IP on free tier; sufficient for learning
- Fallback: link to OnlineGDB / Compiler Explorer
- Environment variable: `JUDGE0_API_URL`, `JUDGE0_API_KEY`

**Domain:**
- Custom domain recommended (e.g., `belajarcpp.id`, `belajar-cpp.web.id`)
- `.web.id` domain is cheap (~50k IDR/year)

**Monitoring:**
- Vercel Analytics (free, basic)
- Plausible or Umami for privacy-respecting analytics (self-hosted option)

---

### 8. Development Phases & Milestones

#### Phase 1: Foundation (Week 1-3)
**Goal: Deployable site with 1 complete unit**

- [ ] Project setup: Astro + React + TypeScript + Tailwind + shadcn/ui
- [ ] Base layout: Header, Sidebar, Footer, responsive shell
- [ ] Design system implementation: colors, typography, spacing
- [ ] Language toggle + i18n infrastructure
- [ ] MDX content pipeline: content collection, lesson schema, rendering
- [ ] Code block component with Shiki syntax highlighting
- [ ] Unit 0 content (3 lessons, Indonesian)
- [ ] Unit 1 content (7 lessons + project, Indonesian)
- [ ] Curriculum overview page
- [ ] Deploy to Vercel

**Deliverable:** Live site with ~10 lessons readable on mobile and desktop.

#### Phase 2: Interactivity (Week 4-6)
**Goal: Code playground + exercises working**

- [ ] CodeMirror 6 integration (code editor component)
- [ ] Judge0 API integration + serverless proxy
- [ ] CodePlayground component (edit + run + output)
- [ ] Exercise component (fill-in-blank, output matching)
- [ ] Hint system (progressive reveal)
- [ ] Progress tracking (localStorage)
- [ ] Progress bar UI
- [ ] Dark mode
- [ ] Unit 2 content (6 lessons + project)

**Deliverable:** Interactive learning experience, siswa bisa run code dan do exercises.

#### Phase 3: Content & Polish (Week 7-10)
**Goal: Full curriculum + English version started**

- [ ] Unit 3-4 content (Indonesian)
- [ ] Unit 5-6 content (Indonesian)
- [ ] English translation: Unit 0-1
- [ ] Glossary page
- [ ] "Explain this code" tooltips for Unit 1-2
- [ ] Table of contents per lesson
- [ ] SEO optimization (meta, OG, sitemap)
- [ ] Performance optimization (lazy loading, image optimization)
- [ ] Basic PWA setup (offline content caching)
- [ ] Mobile UX refinement

**Deliverable:** Complete Indonesian curriculum, English started, polished experience.

#### Phase 4: Enhancement (Week 11-14)
**Goal: DEVELOPMENT stage complete, ready for users**

- [ ] Quizzes per unit
- [ ] Completion badges (visual)
- [ ] English translation: remaining units
- [ ] "Spot the bug" exercises (selected lessons)
- [ ] Error message explanations (common C++ errors → Indonesian explanation)
- [ ] Accessibility audit + fixes (WCAG 2.1 AA)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Samsung Internet)
- [ ] Low-end device testing
- [ ] Analytics setup
- [ ] README + contributing guide
- [ ] User testing with actual SMP/SMA students (3-5 people)

**Deliverable:** Production-ready DEVELOPMENT stage site.

---

**"Ready for production" means:**
1. All 6 units + projects complete in Indonesian
2. English available for at least Unit 0-2
3. Code playground works reliably (< 5% failure rate)
4. Mobile experience is good (not just "works")
5. Lighthouse score > 90 on performance
6. Tested with real students, major UX issues resolved
7. Custom domain live
8. Analytics tracking usage patterns

---

## PHASE 5: META-REFLECTION

### Biases dalam Analisis Ini

1. **Tech-stack familiarity bias:** Rekomendasi Astro + React reflects current (2025-2026) best practices dan popularitas. In 2 years, landscape bisa berubah. The content (MDX) is framework-agnostic and portable — ini yang penting.

2. **Urban-centric bias:** Analisis device dan koneksi internet assume "low-end tapi masih punya smartphone dan internet." Ada siswa di Indonesia yang bahkan tidak punya smartphone pribadi. Website ini tidak solve that problem.

3. **Curriculum bias toward competitive programming path:** Unit structure mengarah ke algorithmic thinking (sorting, searching), which reflects OSN/competitive programming culture. Alternatif: bisa lebih application-oriented (game dev, simple apps). Ini design choice yang perlu human input.

4. **English-speaking developer bias:** Arsitektur dan tooling assume developer yang comfortable dengan English documentation. Jika tim developer Indonesia-dominant, some tool choices might differ.

### Apa yang TIDAK Dipertimbangkan

1. **Offline compiler installation guide yang proper.** Banyak siswa yang akhirnya harus install compiler lokal (untuk kompetisi, ulangan). Website ini fokus pada browser-based, tapi comprehensive setup guide untuk Windows/Linux/Mac bisa sangat valuable.

2. **Guru/teacher perspective.** Bagaimana guru bisa pakai platform ini di kelas? Butuh teacher guide? Bisa assign lessons? Ini out of scope tapi important untuk adoption.

3. **Competitive landscape.** Apakah ada platform serupa yang sudah exist? (Petani Kode, CodePolitan, Dicoding — tapi none focused specifically on C++ for SMP/SMA). Positioning matters.

4. **Content creation effort.** 30 lessons × ~1000-2000 words each = 30,000-60,000 words of educational content. Ini bukan trivial. Writing good educational content is harder than writing code. Butuh writer yang paham C++ DAN paham cara mengajar remaja.

5. **Legal:** Apakah menggunakan Judge0 API ada terms of service yang perlu diperhatikan? Apakah ada liability jika siswa run malicious code?

6. **Accessibility beyond device:** Siswa dengan disabilitas visual (screen reader compatibility), motor (keyboard-only navigation). Mentioned briefly tapi not deeply analyzed.

### Uncertainty yang Tetap Ada

1. **Will students actually prefer web-based learning over YouTube?** Video content is hugely popular. A text + interactive website is a bet that hands-on practice > passive watching. Ini mungkin benar, tapi untested.

2. **Is Judge0 free tier sufficient for real usage?** 50 req/day/IP might not be enough jika banyak siswa. Might need self-hosted Judge0 (Docker, ~$5-10/month VPS) sooner than expected.

3. **Content quality bar.** Siapa yang tulis content? AI-generated + human-reviewed? Fully human-written? The quality of explanations will make or break this platform, dan itu bukan a technical problem.

4. **Adoption strategy.** Build it and they will come? Probably not. Butuh marketing ke guru, komunitas programming, media sosial. Ini outside the scope of this analysis tapi critical for success.

---

## EXECUTIVE SUMMARY

**Build an Astro + React (islands) + TypeScript + Tailwind static site** yang serve MDX-based C++ lessons dalam Bahasa Indonesia (primary) dan English (secondary). Interactive code execution via Judge0 API. Progress tracking via localStorage. Deploy on Vercel free tier.

**Prioritas utama:**
1. Content quality > Feature richness
2. Performance on low-end devices > Visual polish
3. Indonesian completeness > English coverage
4. Working code playground > Gamification

**Timeline realistis:** 14 weeks to DEVELOPMENT stage (production-ready for users), assuming 1-2 developers working part-time atau 1 developer full-time. Content creation is the bottleneck, not engineering.

**Biggest risk:** Tidak ada siswa yang pakai, karena marketing/distribution bukan part of the build. Plan for user testing early (Phase 2) dan iterate based on real feedback.

---

*Dokumen ini adalah living document. Setiap keputusan bisa di-challenge dan direvisi berdasarkan feedback, testing, dan learning selama development.*