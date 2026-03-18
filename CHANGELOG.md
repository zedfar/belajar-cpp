# Changelog

Semua perubahan penting pada proyek belajar-cpp dicatat di file ini. Format mengikuti [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## [2026-03-18] (update 3)

### Added
- SVG diagram `loop-comparison.svg` — perbandingan while, for, do-while dalam flowchart (dark/light mode)
- SVG diagram `function-anatomy.svg` — anatomi fungsi C++ + call flow diagram
- SVG diagram `array-memory.svg` — visualisasi memori array dengan index
- Referensi semua gambar (compilation-flow, workflow, variabel-boxes, io-flow, operator, if-else) ke semua lesson EN yang sebelumnya tidak punya gambar

### Changed
- EN content audit: semua lesson EN sudah 97-100% parity dengan ID — tidak ada yang perlu dilengkapi

## [2026-03-18] (update 2)

### Added
- Exercise interaktif ke semua lesson ID unit-3 (Perulangan), unit-4 (Fungsi), unit-5 (Array), unit-6 (Struct & File I/O) — total 48 exercise baru
- Exercise interaktif ke semua lesson EN unit-0 sampai unit-6 — total 78 exercise dalam bahasa Inggris

### Fixed
- Import `{ Exercise }` yang salah posisi di unit-4 ID dipindah ke tepat setelah frontmatter
- Escaped quotes (`\"`) di dalam JSX attribute string EN files diganti single quotes agar tidak error build

## [2026-03-18]

### Added
- SVG diagram workflow programming (`public/images/workflow-diagram.svg`) dengan dark/light mode adaptive
- CHANGELOG.md untuk mencatat riwayat perubahan proyek

### Fixed
- Exercise components sekarang fully interactive — tambah `client:load` directive ke semua 24 Exercise di 12 lesson unit-1 dan unit-2 (sebelumnya tombol tidak bereaksi karena React tidak di-hydrate)
- Hapus teks centang (✓) dari label "Selesai" karena sudah ada SVG icon pada tombol mark complete

### Changed
- File dokumentasi internal (`PLAN.md`, `JUDGE0_SELF_HOSTED.md`, `judge0-portainer.yml`, `laporan_implementasi.md`) dipindahkan ke folder `.docs` dan di-ignore dari git

### Docs
- README diperbarui — hapus referensi ke file yang sudah dipindah ke `.docs`, tambah referensi ke `CHANGELOG.md`

## [2026-03-17] - v1.0.0

### Added
- Komponen Exercise interaktif pada semua lesson di unit-1 dan unit-2
- Scroll position save/restore functionality di lesson page
- Reading time tracker untuk setiap lesson
- SVG diagram workflow programming di lesson setup lingkungan
- Custom modal yang elegan menggantikan browser alert/confirm/prompt
- Medium priority dan nice-to-have features di playground
- Mobile-first UX untuk playground (snippet strip, spinner, auto-scroll, stdin collapsible)
- Syntax highlighting di playground CodeMirror
- Download button di playground
- Stdin input di playground component
- Copy button pada semua code block di halaman lesson
- SVG diagram yang responsive/adaptive
- SVG icons untuk menggantikan emoji features di home page
- Upgrade stats cards dan bottom CTA section di home
- Favicon SVG dengan design code bracket
- Judge0 self-hosted deployment guide (Oracle Cloud + Portainer)
- Judge0 self-hosted Portainer stack dengan API auth handling
- Unit 5 (Array & Data) dan Unit 6 (Struct & File I/O) lessons
- MIT license dan dokumentasi README lengkap
- English translations untuk Unit 1-6 (43 lessons)

### Fixed
- SyntaxError: const currentLink dideklarasikan dua kali di is:inline script
- Lesson page UX improvements (TOC sticky, reading progress, typography, i18n)
- Semua bug kritis di progress tracking
- Resolve all TypeScript errors dan add OG image
- Auto-scroll tidak agresif + cooldown 3s anti-spam run
- Copy button hanya muncul di code block berbahasa, bukan output block
- CodeMirror syntax highlighting di playground (hapus is:inline)
- Syntax highlighting playground — ganti basicSetup lama dengan stable API
- Playground CodeMirror editor tidak muncul + URL fallback
- Update site URL di astro.config.mjs ke domain aktual
- Tampilan scroll pada playground editor
- Playground snippets — konsisten std:: dan tambah 4 contoh baru
- Home page tampilkan semua 7 unit, hapus slice(0,4) dan tanda +
- Replace deprecated unescape/escape dengan Buffer di run-code API
- 404 issues: progress page, home CTA slug, GitHub URL
- Mobile hamburger menu tidak merespons pada non-lesson pages
- Hapus teks centang dari label Selesai (sudah ada SVG icon)

### Changed
- Ganti emoji badge dengan SVG icons di halaman progress
- Ganti browser alert/confirm/prompt dengan custom modal elegan
- Polish UI — hero illustration, nav icons, footer redesign, SVG fixes
- Lesson page UX — TOC sticky, reading progress, typography improvements

### Removed
- Deprecated is:inline script dari CodeMirror implementation
- Slice(0,4) limit dari unit display di home page

## [2026-03-16]

### Added
- MIT license dan dokumentasi README dengan full documentation
- Favicon SVG dengan design code bracket dan theme-color meta
- Judge0 self-hosted deployment guide (Oracle Cloud + Portainer)
- Judge0 self-hosted Portainer stack dengan update API auth handling
- Unit 2-4 lessons dengan redesign CodeBlock UI dan fix remark-directive

### Fixed
- Mobile hamburger menu not responding pada non-lesson pages
- Remark-directive configuration issues

### Changed
- Redesign CodeBlock UI untuk consistency

## [Initial Release - 2026-03-16]

### Added
- Initial repository setup dengan Astro v5 + React + TypeScript + Tailwind v4
- Unit 0 lessons
- Unit 1 lessons
- Basic playground dengan Code Runner functionality
- Progress tracking page
- Navigation dan layout structure

---

## Legacy Notes

Proyek dimulai dengan 3 initial commits untuk setup repositori pada 2026-03-16, kemudian berkembang pesat dengan penambahan:
- Unit 1-4 lessons lengkap
- Unit 5-6 lessons untuk Array, Data structures, Struct, dan File I/O
- English translations untuk 43 lessons
- Judge0 integration untuk code execution
- Comprehensive playground UI dengan syntax highlighting
- Exercise components interaktif
- Reading progress tracking dan UX improvements
