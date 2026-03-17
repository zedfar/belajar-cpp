import type { Language } from '@/types/lesson'
import type { UnitMetadata } from '@/types/lesson'

// Curriculum data inline (alternatively loaded from YAML)
// This provides the structure for navigation and progress tracking

export const CURRICULUM_ID: UnitMetadata[] = [
  {
    id: 0,
    slug: 'unit-0',
    title: { id: 'Persiapan', en: 'Getting Started' },
    description: {
      id: 'Kenali apa itu programming dan siapkan lingkungan belajarmu.',
      en: 'Learn what programming is and set up your learning environment.',
    },
    estimatedHours: '1-2',
    projectTitle: { id: 'Tour Playground', en: 'Playground Tour' },
    isAvailable: true,
    lessons: [
      { slug: 'unit-0/01-apa-itu-programming', title: { id: 'Apa itu Programming?', en: 'What is Programming?' }, estimatedTime: 20, isProject: false },
      { slug: 'unit-0/02-setup-lingkungan', title: { id: 'Setup Lingkungan', en: 'Environment Setup' }, estimatedTime: 30, isProject: false },
      { slug: 'unit-0/03-tour-playground', title: { id: 'Tour Playground', en: 'Playground Tour' }, estimatedTime: 10, isProject: true },
    ],
  },
  {
    id: 1,
    slug: 'unit-1',
    title: { id: 'Dasar-Dasar', en: 'Fundamentals' },
    description: {
      id: 'Pelajari konsep dasar C++: variabel, tipe data, input/output, dan operasi aritmatika.',
      en: 'Learn C++ fundamentals: variables, data types, I/O, and arithmetic operations.',
    },
    estimatedHours: '8-10',
    projectTitle: { id: 'Kalkulator Sederhana', en: 'Simple Calculator' },
    isAvailable: true,
    lessons: [
      { slug: 'unit-1/01-hello-world', title: { id: 'Hello, World!', en: 'Hello, World!' }, estimatedTime: 30, isProject: false },
      { slug: 'unit-1/02-komentar-struktur', title: { id: 'Komentar & Struktur', en: 'Comments & Structure' }, estimatedTime: 20, isProject: false },
      { slug: 'unit-1/03-variabel-tipe-data', title: { id: 'Variabel & Tipe Data', en: 'Variables & Data Types' }, estimatedTime: 45, isProject: false },
      { slug: 'unit-1/04-input-output', title: { id: 'Input & Output', en: 'Input & Output' }, estimatedTime: 30, isProject: false },
      { slug: 'unit-1/05-operasi-aritmatika', title: { id: 'Operasi Aritmatika', en: 'Arithmetic Operations' }, estimatedTime: 30, isProject: false },
      { slug: 'unit-1/06-string-dasar', title: { id: 'String Dasar', en: 'Basic Strings' }, estimatedTime: 30, isProject: false },
      { slug: 'unit-1/07-konstanta-auto', title: { id: 'Konstanta & Auto', en: 'Constants & Auto' }, estimatedTime: 20, isProject: false },
      { slug: 'unit-1/08-project-kalkulator', title: { id: 'Project: Kalkulator Sederhana', en: 'Project: Simple Calculator' }, estimatedTime: 60, isProject: true },
    ],
  },
  {
    id: 2,
    slug: 'unit-2',
    title: { id: 'Percabangan', en: 'Decision Making' },
    description: {
      id: 'Buat program yang bisa mengambil keputusan berdasarkan kondisi.',
      en: 'Create programs that make decisions based on conditions.',
    },
    estimatedHours: '6-8',
    projectTitle: { id: 'Game Tebak Angka', en: 'Number Guessing Game' },
    isAvailable: true,
    lessons: [
      { slug: 'unit-2/01-operator-perbandingan', title: { id: 'Operator Perbandingan', en: 'Comparison Operators' }, estimatedTime: 20, isProject: false },
      { slug: 'unit-2/02-if-else', title: { id: 'If-Else', en: 'If-Else' }, estimatedTime: 40, isProject: false },
      { slug: 'unit-2/03-operator-logika', title: { id: 'Operator Logika', en: 'Logical Operators' }, estimatedTime: 30, isProject: false },
      { slug: 'unit-2/04-switch-case', title: { id: 'Switch-Case', en: 'Switch-Case' }, estimatedTime: 30, isProject: false },
      { slug: 'unit-2/05-ternary-operator', title: { id: 'Ternary Operator', en: 'Ternary Operator' }, estimatedTime: 15, isProject: false },
      { slug: 'unit-2/06-project-tebak-angka', title: { id: 'Project: Game Tebak Angka', en: 'Project: Number Guessing Game' }, estimatedTime: 60, isProject: true },
    ],
  },
  {
    id: 3,
    slug: 'unit-3',
    title: { id: 'Perulangan', en: 'Loops' },
    description: {
      id: 'Otomasi tugas berulang dengan while loop, for loop, dan nested loops.',
      en: 'Automate repetitive tasks with while loops, for loops, and nested loops.',
    },
    estimatedHours: '8-10',
    projectTitle: { id: 'Pola Bintang Generator', en: 'Star Pattern Generator' },
    isAvailable: true,
    lessons: [
      { slug: 'unit-3/01-while-loop', title: { id: 'While Loop', en: 'While Loop' }, estimatedTime: 40, isProject: false },
      { slug: 'unit-3/02-for-loop', title: { id: 'For Loop', en: 'For Loop' }, estimatedTime: 40, isProject: false },
      { slug: 'unit-3/03-do-while', title: { id: 'Do-While', en: 'Do-While' }, estimatedTime: 20, isProject: false },
      { slug: 'unit-3/04-break-continue', title: { id: 'Break & Continue', en: 'Break & Continue' }, estimatedTime: 25, isProject: false },
      { slug: 'unit-3/05-nested-loops', title: { id: 'Nested Loops', en: 'Nested Loops' }, estimatedTime: 40, isProject: false },
      { slug: 'unit-3/06-loop-patterns', title: { id: 'Loop Patterns', en: 'Loop Patterns' }, estimatedTime: 45, isProject: false },
      { slug: 'unit-3/07-project-pola-bintang', title: { id: 'Project: Pola Bintang', en: 'Project: Star Patterns' }, estimatedTime: 60, isProject: true },
    ],
  },
  {
    id: 4,
    slug: 'unit-4',
    title: { id: 'Fungsi', en: 'Functions' },
    description: {
      id: 'Pecah program menjadi fungsi-fungsi yang reusable dan terorganisir.',
      en: 'Break programs into reusable and organized functions.',
    },
    estimatedHours: '8-10',
    projectTitle: { id: 'Batu Gunting Kertas', en: 'Rock Paper Scissors' },
    isAvailable: true,
    lessons: [
      { slug: 'unit-4/01-apa-itu-fungsi', title: { id: 'Apa itu Fungsi?', en: 'What is a Function?' }, estimatedTime: 30, isProject: false },
      { slug: 'unit-4/02-membuat-fungsi', title: { id: 'Membuat Fungsi', en: 'Creating Functions' }, estimatedTime: 40, isProject: false },
      { slug: 'unit-4/03-parameter-argumen', title: { id: 'Parameter & Argumen', en: 'Parameters & Arguments' }, estimatedTime: 35, isProject: false },
      { slug: 'unit-4/04-return-values', title: { id: 'Return Values', en: 'Return Values' }, estimatedTime: 35, isProject: false },
      { slug: 'unit-4/05-pass-by-reference', title: { id: 'Pass by Reference', en: 'Pass by Reference' }, estimatedTime: 30, isProject: false },
      { slug: 'unit-4/06-overloading', title: { id: 'Function Overloading', en: 'Function Overloading' }, estimatedTime: 25, isProject: false },
      { slug: 'unit-4/07-scope-lifetime', title: { id: 'Scope & Lifetime', en: 'Scope & Lifetime' }, estimatedTime: 30, isProject: false },
      { slug: 'unit-4/08-project-batu-gunting-kertas', title: { id: 'Project: Batu Gunting Kertas', en: 'Project: Rock Paper Scissors' }, estimatedTime: 75, isProject: true },
    ],
  },
  {
    id: 5,
    slug: 'unit-5',
    title: { id: 'Array & Data', en: 'Arrays & Data' },
    description: {
      id: 'Simpan dan proses kumpulan data dengan array, vector, dan string manipulation.',
      en: 'Store and process collections of data with arrays, vectors, and string manipulation.',
    },
    estimatedHours: '8-10',
    projectTitle: { id: 'Buku Nilai Siswa', en: 'Student Grade Book' },
    isAvailable: true,
    lessons: [
      { slug: 'unit-5/01-array-dasar', title: { id: 'Array Dasar', en: 'Basic Arrays' }, estimatedTime: 40, isProject: false },
      { slug: 'unit-5/02-array-loop', title: { id: 'Array & Loop', en: 'Arrays & Loops' }, estimatedTime: 35, isProject: false },
      { slug: 'unit-5/03-array-2d', title: { id: 'Array 2D', en: '2D Arrays' }, estimatedTime: 35, isProject: false },
      { slug: 'unit-5/04-vector', title: { id: 'std::vector', en: 'std::vector' }, estimatedTime: 40, isProject: false },
      { slug: 'unit-5/05-string-array', title: { id: 'String sebagai Array', en: 'Strings as Arrays' }, estimatedTime: 25, isProject: false },
      { slug: 'unit-5/06-sorting-searching', title: { id: 'Sorting & Searching', en: 'Sorting & Searching' }, estimatedTime: 40, isProject: false },
      { slug: 'unit-5/07-project-buku-nilai', title: { id: 'Project: Buku Nilai Siswa', en: 'Project: Grade Book' }, estimatedTime: 90, isProject: true },
    ],
  },
  {
    id: 6,
    slug: 'unit-6',
    title: { id: 'Struct & File', en: 'Structs & Files' },
    description: {
      id: 'Organisir data dengan struct dan simpan ke file untuk program yang lebih powerful.',
      en: 'Organize data with structs and save to files for more powerful programs.',
    },
    estimatedHours: '6-8',
    projectTitle: { id: 'Manajemen Kontak', en: 'Contact Manager' },
    isAvailable: true,
    lessons: [
      { slug: 'unit-6/01-struct', title: { id: 'Struct', en: 'Structs' }, estimatedTime: 40, isProject: false },
      { slug: 'unit-6/02-struct-function', title: { id: 'Struct & Function', en: 'Structs & Functions' }, estimatedTime: 30, isProject: false },
      { slug: 'unit-6/03-file-input', title: { id: 'File Input', en: 'File Input' }, estimatedTime: 35, isProject: false },
      { slug: 'unit-6/04-file-output', title: { id: 'File Output', en: 'File Output' }, estimatedTime: 30, isProject: false },
      { slug: 'unit-6/05-enum-typedef', title: { id: 'Enum & Typedef', en: 'Enums & Typedefs' }, estimatedTime: 25, isProject: false },
      { slug: 'unit-6/06-final-project', title: { id: 'Final Project: Manajemen Kontak', en: 'Final Project: Contact Manager' }, estimatedTime: 120, isProject: true },
    ],
  },
]

export function getCurriculum(_lang: Language): UnitMetadata[] {
  return CURRICULUM_ID  // same structure, text already bilingual via Record<Language, string>
}

export function getUnit(slug: string): UnitMetadata | undefined {
  return CURRICULUM_ID.find(u => u.slug === slug)
}

export function getTotalLessons(): number {
  return CURRICULUM_ID.reduce((sum, unit) => sum + unit.lessons.length, 0)
}

export function getNextLesson(currentSlug: string): { slug: string; unitSlug: string } | null {
  const allLessons = CURRICULUM_ID.flatMap(unit =>
    unit.lessons.map(l => ({ ...l, unitSlug: unit.slug }))
  )
  const idx = allLessons.findIndex(l => l.slug === currentSlug)
  if (idx === -1 || idx >= allLessons.length - 1) return null
  const next = allLessons[idx + 1]
  if (!next) return null
  return { slug: next.slug, unitSlug: next.unitSlug }
}

export function getPrevLesson(currentSlug: string): { slug: string; unitSlug: string } | null {
  const allLessons = CURRICULUM_ID.flatMap(unit =>
    unit.lessons.map(l => ({ ...l, unitSlug: unit.slug }))
  )
  const idx = allLessons.findIndex(l => l.slug === currentSlug)
  if (idx <= 0) return null
  const prev = allLessons[idx - 1]
  if (!prev) return null
  return { slug: prev.slug, unitSlug: prev.unitSlug }
}

export function getLessonUrl(lang: Language, lessonSlug: string): string {
  const parts = lessonSlug.split('/')
  if (parts.length !== 2) return `/${lang}/curriculum`
  const [unitSlug, lessonId] = parts
  return `/${lang}/learn/${unitSlug}/${lessonId}`
}
