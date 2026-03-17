import type { Language } from '@/types/lesson'

// ============================================================
// UI STRINGS — semua text statis di UI
// ============================================================

export const uiStrings = {
  id: {
    meta: {
      siteTitle: 'Belajar C++',
      siteDescription: 'Website pembelajaran C++ untuk siswa SMP dan SMA Indonesia. Dari nol hingga bisa membuat project sederhana.',
      ogTitle: 'Belajar C++ — Untuk SMP/SMA Indonesia',
    },
    nav: {
      home: 'Beranda',
      curriculum: 'Kurikulum',
      playground: 'Playground',
      about: 'Tentang',
      toggleMenu: 'Buka menu',
      closeMenu: 'Tutup menu',
    },
    lesson: {
      next: 'Selanjutnya',
      previous: 'Sebelumnya',
      backToCurriculum: 'Kembali ke Kurikulum',
      backToUnit: 'Kembali ke Unit',
      estimatedTime: '{time} menit',
      objectives: 'Tujuan Pembelajaran',
      tableOfContents: 'Daftar Isi',
      markComplete: 'Tandai Selesai',
      completed: 'Selesai',
      startLesson: 'Mulai Pelajaran',
    },
    code: {
      run: 'Jalankan',
      running: 'Menjalankan...',
      output: 'Output',
      copy: 'Salin',
      copied: 'Tersalin!',
      reset: 'Reset',
      openInPlayground: 'Buka di Playground',
      executionTime: 'Waktu: {time}ms',
      compilationError: 'Error Kompilasi',
      runtimeError: 'Runtime Error',
      noOutput: '(Tidak ada output)',
      apiUnavailable: 'Server tidak tersedia. Coba lagi nanti atau gunakan OnlineGDB.',
      openOnlineGDB: 'Buka di OnlineGDB',
    },
    exercise: {
      title: 'Latihan',
      checkAnswer: 'Periksa Jawaban',
      correct: '🎉 Benar! Bagus sekali!',
      incorrect: 'Belum tepat. Coba lagi!',
      showHint: 'Tampilkan Petunjuk',
      hideHint: 'Sembunyikan Petunjuk',
      hint: 'Petunjuk {n}',
      showSolution: 'Lihat Solusi',
      tryAgain: 'Coba Lagi',
      attempts: '{count} percobaan',
    },
    quiz: {
      title: 'Kuis',
      checkAnswer: 'Periksa',
      correct: 'Benar!',
      incorrect: 'Kurang tepat.',
      explanation: 'Penjelasan:',
      score: 'Nilai: {score}/100',
      retake: 'Ulangi Kuis',
    },
    progress: {
      overall: 'Progress Keseluruhan',
      lessonsCompleted: '{count} dari {total} pelajaran selesai',
      unitProgress: 'Unit {unit}',
      unitComplete: '🏆 Unit {unit} selesai!',
      allComplete: '🎓 Selamat! Kamu sudah menyelesaikan semua unit!',
      continueLearning: 'Lanjutkan Belajar',
      startLearning: 'Mulai Belajar',
    },
    curriculum: {
      title: 'Kurikulum C++',
      subtitle: 'Dari nol hingga project sederhana',
      totalTime: 'Total ~{hours} jam',
      unitN: 'Unit {n}',
      lessons: '{n} pelajaran',
      startUnit: 'Mulai Unit',
      continueUnit: 'Lanjutkan',
      reviewUnit: 'Ulangi',
      comingSoon: 'Segera Hadir',
      project: 'Project Unit',
      prerequisites: 'Prasyarat:',
    },
    home: {
      hero: {
        title: 'Belajar C++',
        subtitle: 'Dari SMP/SMA, mulai dari nol',
        description: 'Platform belajar C++ dalam Bahasa Indonesia. Interaktif, gratis, dan dirancang khusus untuk pelajar Indonesia.',
        cta: 'Mulai Belajar',
        ctaSecondary: 'Lihat Kurikulum',
      },
      features: {
        interactive: {
          title: 'Kode Interaktif',
          description: 'Jalankan kode C++ langsung di browser tanpa install apapun.',
        },
        bilingual: {
          title: 'Bahasa Indonesia',
          description: 'Penjelasan lengkap dalam Bahasa Indonesia yang mudah dipahami.',
        },
        progressive: {
          title: 'Bertahap',
          description: 'Dari dasar hingga project nyata, step by step dengan jelas.',
        },
        free: {
          title: 'Gratis',
          description: 'Semua konten gratis. Tidak perlu akun. Mulai langsung.',
        },
      },
    },
    playground: {
      title: 'Playground C++',
      description: 'Eksperimen dengan kode C++ secara bebas.',
      defaultCode: '#include <iostream>\n\nint main() {\n    std::cout << "Halo, Dunia!" << std::endl;\n    return 0;\n}',
      tips: 'Tips: Klik "Jalankan" untuk melihat output kode kamu.',
    },
    about: {
      title: 'Tentang Belajar C++',
      description: 'Platform pembelajaran C++ gratis untuk siswa SMP dan SMA Indonesia.',
    },
    errors: {
      lessonNotFound: 'Pelajaran tidak ditemukan.',
      unitNotFound: 'Unit tidak ditemukan.',
      translationMissing: 'Pelajaran ini belum tersedia dalam Bahasa Inggris.',
      tryInIndonesian: 'Coba dalam Bahasa Indonesia',
      pageNotFound: 'Halaman tidak ditemukan.',
      backToHome: 'Kembali ke Beranda',
    },
    footer: {
      madeWith: 'Dibuat dengan ❤️ untuk pelajar Indonesia',
      openSource: 'Open Source',
      reportIssue: 'Laporkan Masalah',
    },
    language: {
      switch: 'English',
      current: 'Indonesia',
    },
    theme: {
      toggleLight: 'Mode Terang',
      toggleDark: 'Mode Gelap',
    },
    infoBox: {
      tip: 'Tips',
      warning: 'Perhatian',
      error: 'Error',
      fun: 'Fun Fact',
      note: 'Catatan',
    },
  },
  en: {
    meta: {
      siteTitle: 'Learn C++',
      siteDescription: 'C++ learning platform for Indonesian middle and high school students. From zero to building simple projects.',
      ogTitle: 'Learn C++ — For Indonesian Students',
    },
    nav: {
      home: 'Home',
      curriculum: 'Curriculum',
      playground: 'Playground',
      about: 'About',
      toggleMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    lesson: {
      next: 'Next',
      previous: 'Previous',
      backToCurriculum: 'Back to Curriculum',
      backToUnit: 'Back to Unit',
      estimatedTime: '{time} minutes',
      objectives: 'Learning Objectives',
      tableOfContents: 'Table of Contents',
      markComplete: 'Mark Complete',
      completed: '✓ Completed',
      startLesson: 'Start Lesson',
    },
    code: {
      run: 'Run',
      running: 'Running...',
      output: 'Output',
      copy: 'Copy',
      copied: 'Copied!',
      reset: 'Reset',
      openInPlayground: 'Open in Playground',
      executionTime: 'Time: {time}ms',
      compilationError: 'Compilation Error',
      runtimeError: 'Runtime Error',
      noOutput: '(No output)',
      apiUnavailable: 'Server unavailable. Try again later or use OnlineGDB.',
      openOnlineGDB: 'Open in OnlineGDB',
    },
    exercise: {
      title: 'Exercise',
      checkAnswer: 'Check Answer',
      correct: '🎉 Correct! Well done!',
      incorrect: 'Not quite right. Try again!',
      showHint: 'Show Hint',
      hideHint: 'Hide Hint',
      hint: 'Hint {n}',
      showSolution: 'Show Solution',
      tryAgain: 'Try Again',
      attempts: '{count} attempts',
    },
    quiz: {
      title: 'Quiz',
      checkAnswer: 'Check',
      correct: 'Correct!',
      incorrect: 'Not quite.',
      explanation: 'Explanation:',
      score: 'Score: {score}/100',
      retake: 'Retake Quiz',
    },
    progress: {
      overall: 'Overall Progress',
      lessonsCompleted: '{count} of {total} lessons completed',
      unitProgress: 'Unit {unit}',
      unitComplete: '🏆 Unit {unit} complete!',
      allComplete: '🎓 Congratulations! You have completed all units!',
      continueLearning: 'Continue Learning',
      startLearning: 'Start Learning',
    },
    curriculum: {
      title: 'C++ Curriculum',
      subtitle: 'From zero to a simple project',
      totalTime: 'Total ~{hours} hours',
      unitN: 'Unit {n}',
      lessons: '{n} lessons',
      startUnit: 'Start Unit',
      continueUnit: 'Continue',
      reviewUnit: 'Review',
      comingSoon: 'Coming Soon',
      project: 'Unit Project',
      prerequisites: 'Prerequisites:',
    },
    home: {
      hero: {
        title: 'Learn C++',
        subtitle: 'For Middle & High School Students',
        description: 'A C++ learning platform in Bahasa Indonesia (and English). Interactive, free, and designed for Indonesian learners.',
        cta: 'Start Learning',
        ctaSecondary: 'View Curriculum',
      },
      features: {
        interactive: {
          title: 'Interactive Code',
          description: 'Run C++ code directly in the browser without installing anything.',
        },
        bilingual: {
          title: 'Bahasa Indonesia',
          description: 'Full explanations in Bahasa Indonesia that are easy to understand.',
        },
        progressive: {
          title: 'Progressive',
          description: 'From basics to a real project, step by step clearly.',
        },
        free: {
          title: 'Free',
          description: 'All content is free. No account needed. Start immediately.',
        },
      },
    },
    playground: {
      title: 'C++ Playground',
      description: 'Experiment freely with C++ code.',
      defaultCode: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}',
      tips: 'Tip: Click "Run" to see your code output.',
    },
    about: {
      title: 'About Learn C++',
      description: 'A free C++ learning platform for Indonesian middle and high school students.',
    },
    errors: {
      lessonNotFound: 'Lesson not found.',
      unitNotFound: 'Unit not found.',
      translationMissing: 'This lesson is not yet available in English.',
      tryInIndonesian: 'Try in Indonesian',
      pageNotFound: 'Page not found.',
      backToHome: 'Back to Home',
    },
    footer: {
      madeWith: 'Made with ❤️ for Indonesian learners',
      openSource: 'Open Source',
      reportIssue: 'Report an Issue',
    },
    language: {
      switch: 'Indonesia',
      current: 'English',
    },
    theme: {
      toggleLight: 'Light Mode',
      toggleDark: 'Dark Mode',
    },
    infoBox: {
      tip: 'Tip',
      warning: 'Warning',
      error: 'Error',
      fun: 'Fun Fact',
      note: 'Note',
    },
  },
} as const

export type UIStrings = typeof uiStrings.id

// ============================================================
// HELPER FUNCTIONS
// ============================================================

export function t(lang: Language, path: string): string {
  const keys = path.split('.')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = uiStrings[lang]
  for (const key of keys) {
    value = value?.[key]
    if (value === undefined) {
      // fallback to id
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let fallback: any = uiStrings.id
      for (const k of path.split('.')) fallback = fallback?.[k]
      return fallback ?? path
    }
  }
  return typeof value === 'string' ? value : path
}

/**
 * Replace template variables in string
 * e.g. interpolate('{count} dari {total}', { count: 5, total: 10 })
 */
export function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? `{${key}}`))
}

/**
 * Get the opposite language
 */
export function getOtherLang(lang: Language): Language {
  return lang === 'id' ? 'en' : 'id'
}

/**
 * Get display name of language
 */
export function getLangName(lang: Language): string {
  return lang === 'id' ? 'Indonesia' : 'English'
}

/**
 * Detect preferred language from browser headers
 */
export function detectLanguage(acceptLanguage?: string): Language {
  if (!acceptLanguage) return 'id'
  const preferred = (acceptLanguage.split(',')[0] ?? '').trim().toLowerCase()
  if (preferred.startsWith('en')) return 'en'
  return 'id'
}
