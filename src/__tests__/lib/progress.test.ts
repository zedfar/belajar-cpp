import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  loadProgress,
  saveProgress,
  markLessonComplete,
  isLessonComplete,
  setCurrentLesson,
  saveExerciseResult,
  getExerciseResult,
  saveQuizResult,
  getUnitProgress,
  getOverallProgress,
  setLanguage,
  setTheme,
  getTheme,
  checkAndUnlockBadges,
  getBadges,
  resetProgress,
} from '@/lib/progress'
import { DEFAULT_PROGRESS } from '@/types/progress'
import type { UserProgress } from '@/types/progress'

const STORAGE_KEY = 'belajar-cpp-progress'

beforeEach(() => {
  localStorage.clear()
})

// ============================================================
// loadProgress / saveProgress
// ============================================================

describe('loadProgress', () => {
  it('returns DEFAULT_PROGRESS saat localStorage kosong', () => {
    const p = loadProgress()
    expect(p.completedLessons).toEqual([])
    expect(p.streakDays).toBe(0)
    expect(p.language).toBe('id')
  })

  it('mengembalikan data yang tersimpan di localStorage', () => {
    const stored: UserProgress = {
      ...DEFAULT_PROGRESS,
      completedLessons: ['unit-1/01', 'unit-1/02'],
      streakDays: 3,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
    const p = loadProgress()
    expect(p.completedLessons).toEqual(['unit-1/01', 'unit-1/02'])
    expect(p.streakDays).toBe(3)
  })

  it('merge dengan DEFAULT_PROGRESS jika ada field yang hilang', () => {
    // Simulasi data lama yang tidak punya field baru
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ completedLessons: ['unit-1/01'] }))
    const p = loadProgress()
    expect(p.completedLessons).toEqual(['unit-1/01'])
    expect(p.language).toBe('id') // dari DEFAULT_PROGRESS
    expect(p.exerciseResults).toEqual({})
  })

  it('returns DEFAULT_PROGRESS jika JSON tidak valid', () => {
    localStorage.setItem(STORAGE_KEY, 'bukan json valid {{{{')
    const p = loadProgress()
    expect(p.completedLessons).toEqual([])
  })
})

describe('saveProgress', () => {
  it('menyimpan dan memuat kembali data dengan benar', () => {
    const progress: UserProgress = { ...DEFAULT_PROGRESS, streakDays: 5, language: 'en' }
    saveProgress(progress)
    const loaded = loadProgress()
    expect(loaded.streakDays).toBe(5)
    expect(loaded.language).toBe('en')
  })
})

// ============================================================
// Lesson completion
// ============================================================

describe('markLessonComplete', () => {
  it('menambahkan lesson ke completedLessons', () => {
    markLessonComplete('unit-1/01')
    expect(isLessonComplete('unit-1/01')).toBe(true)
  })

  it('tidak menduplikasi lesson yang sama', () => {
    markLessonComplete('unit-1/01')
    markLessonComplete('unit-1/01')
    const p = loadProgress()
    expect(p.completedLessons.filter(s => s === 'unit-1/01').length).toBe(1)
  })

  it('mengupdate currentLesson dan lastVisited', () => {
    markLessonComplete('unit-2/03')
    const p = loadProgress()
    expect(p.currentLesson).toBe('unit-2/03')
    expect(p.lastVisited).toBeTruthy()
  })
})

describe('isLessonComplete', () => {
  it('returns false untuk lesson yang belum selesai', () => {
    expect(isLessonComplete('unit-1/99')).toBe(false)
  })

  it('returns true untuk lesson yang sudah selesai', () => {
    markLessonComplete('unit-1/05')
    expect(isLessonComplete('unit-1/05')).toBe(true)
  })
})

describe('setCurrentLesson', () => {
  it('menyimpan slug lesson saat ini', () => {
    setCurrentLesson('unit-3/02')
    const p = loadProgress()
    expect(p.currentLesson).toBe('unit-3/02')
  })
})

// ============================================================
// Exercise results
// ============================================================

describe('saveExerciseResult / getExerciseResult', () => {
  it('menyimpan dan mengambil hasil exercise', () => {
    const result = { solved: true, attempts: 2, hintsUsed: 1, lastAttempt: '2026-03-18' }
    saveExerciseResult('u1l1-ex1', result)
    const fetched = getExerciseResult('u1l1-ex1')
    expect(fetched).toEqual(result)
  })

  it('returns null untuk exercise yang belum pernah dikerjakan', () => {
    expect(getExerciseResult('tidak-ada')).toBeNull()
  })

  it('bisa menyimpan beberapa exercise berbeda', () => {
    saveExerciseResult('ex-a', { solved: true, attempts: 1, hintsUsed: 0, lastAttempt: '' })
    saveExerciseResult('ex-b', { solved: false, attempts: 3, hintsUsed: 2, lastAttempt: '' })
    expect(getExerciseResult('ex-a')?.solved).toBe(true)
    expect(getExerciseResult('ex-b')?.solved).toBe(false)
  })
})

// ============================================================
// Quiz results
// ============================================================

describe('saveQuizResult', () => {
  it('menyimpan hasil quiz ke progress', () => {
    saveQuizResult('quiz-unit1', { score: 80, completedAt: '2026-03-18', answers: [0, 1, 2] })
    const p = loadProgress()
    expect(p.quizResults['quiz-unit1']?.score).toBe(80)
    expect(p.quizResults['quiz-unit1']?.answers).toEqual([0, 1, 2])
  })
})

// ============================================================
// Unit progress
// ============================================================

describe('getUnitProgress', () => {
  it('returns 0% saat belum ada lesson selesai di unit tersebut', () => {
    const result = getUnitProgress('unit-1', 8)
    expect(result.completed).toBe(0)
    expect(result.percent).toBe(0)
    expect(result.isComplete).toBe(false)
  })

  it('menghitung persen dengan benar', () => {
    markLessonComplete('unit-2/01')
    markLessonComplete('unit-2/02')
    // unit-2 total 6 pelajaran
    const result = getUnitProgress('unit-2', 6)
    expect(result.completed).toBe(2)
    expect(result.percent).toBe(33)
  })

  it('hanya menghitung lesson milik unit tersebut', () => {
    markLessonComplete('unit-1/01')
    markLessonComplete('unit-2/01')
    const result = getUnitProgress('unit-1', 8)
    expect(result.completed).toBe(1)
  })

  it('isComplete true saat semua lesson selesai', () => {
    markLessonComplete('unit-0/01')
    const result = getUnitProgress('unit-0', 1)
    expect(result.isComplete).toBe(true)
  })

  it('handles totalLessons = 0 tanpa error', () => {
    const result = getUnitProgress('unit-x', 0)
    expect(result.percent).toBe(0)
  })
})

describe('getOverallProgress', () => {
  it('returns 0% saat belum ada lesson selesai', () => {
    const result = getOverallProgress(10)
    expect(result.completed).toBe(0)
    expect(result.percent).toBe(0)
  })

  it('menghitung persen keseluruhan dengan benar', () => {
    markLessonComplete('unit-1/01')
    markLessonComplete('unit-1/02')
    markLessonComplete('unit-2/01')
    const result = getOverallProgress(10)
    expect(result.completed).toBe(3)
    expect(result.percent).toBe(30)
  })
})

// ============================================================
// Preferences
// ============================================================

describe('setLanguage / setTheme / getTheme', () => {
  it('menyimpan preferensi bahasa', () => {
    setLanguage('en')
    expect(loadProgress().language).toBe('en')
  })

  it('menyimpan preferensi tema', () => {
    setTheme('dark')
    expect(getTheme()).toBe('dark')
  })

  it('default tema adalah light', () => {
    expect(getTheme()).toBe('light')
  })
})

// ============================================================
// Streak
// ============================================================

describe('streak via markLessonComplete', () => {
  it('tidak mengubah streak jika lastActiveDate sama dengan hari ini', () => {
    const today = new Date().toISOString().split('T')[0]!
    const stored: UserProgress = {
      ...DEFAULT_PROGRESS,
      streakDays: 2,
      lastActiveDate: today,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
    markLessonComplete('unit-1/01')
    expect(loadProgress().streakDays).toBe(2)
  })

  it('menambah streak jika lastActiveDate adalah kemarin', () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]!
    const stored: UserProgress = {
      ...DEFAULT_PROGRESS,
      streakDays: 2,
      lastActiveDate: yesterdayStr,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
    markLessonComplete('unit-1/01')
    expect(loadProgress().streakDays).toBe(3)
  })

  it('reset streak ke 1 jika gap lebih dari 1 hari', () => {
    const longAgo = '2020-01-01'
    const stored: UserProgress = {
      ...DEFAULT_PROGRESS,
      streakDays: 10,
      lastActiveDate: longAgo,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
    markLessonComplete('unit-1/01')
    expect(loadProgress().streakDays).toBe(1)
  })
})

// ============================================================
// Badges
// ============================================================

describe('checkAndUnlockBadges', () => {
  it('unlock first-lesson saat lesson pertama selesai', () => {
    const p = { ...DEFAULT_PROGRESS, completedLessons: ['unit-1/01'] }
    checkAndUnlockBadges(p)
    expect(p.unlockedBadges).toContain('first-lesson')
  })

  it('tidak menduplikasi badge yang sudah ada', () => {
    const p: UserProgress = {
      ...DEFAULT_PROGRESS,
      completedLessons: ['unit-1/01'],
      unlockedBadges: ['first-lesson'],
    }
    checkAndUnlockBadges(p)
    expect(p.unlockedBadges.filter(b => b === 'first-lesson').length).toBe(1)
  })

  it('unlock streak-3 saat streakDays >= 3', () => {
    const p: UserProgress = { ...DEFAULT_PROGRESS, streakDays: 3, unlockedBadges: [], completedLessons: [] }
    checkAndUnlockBadges(p)
    expect(p.unlockedBadges).toContain('streak-3')
  })

  it('tidak unlock streak-7 saat streakDays = 3', () => {
    const p: UserProgress = { ...DEFAULT_PROGRESS, streakDays: 3, unlockedBadges: [], completedLessons: [] }
    checkAndUnlockBadges(p)
    expect(p.unlockedBadges).not.toContain('streak-7')
  })

  it('unlock streak-7 saat streakDays >= 7', () => {
    const p: UserProgress = { ...DEFAULT_PROGRESS, streakDays: 7, unlockedBadges: [], completedLessons: [] }
    checkAndUnlockBadges(p)
    expect(p.unlockedBadges).toContain('streak-7')
  })

  it('unlock unit-1-complete saat semua 8 lesson unit-1 selesai', () => {
    const lessons = Array.from({ length: 8 }, (_, i) => `unit-1/${String(i + 1).padStart(2, '0')}`)
    const p: UserProgress = { ...DEFAULT_PROGRESS, completedLessons: lessons, unlockedBadges: [] }
    checkAndUnlockBadges(p)
    expect(p.unlockedBadges).toContain('unit-1-complete')
  })

  it('tidak unlock unit-1-complete jika kurang dari 8 lesson', () => {
    const p: UserProgress = {
      ...DEFAULT_PROGRESS,
      completedLessons: ['unit-1/01', 'unit-1/02'],
      unlockedBadges: [],
    }
    checkAndUnlockBadges(p)
    expect(p.unlockedBadges).not.toContain('unit-1-complete')
  })

  it('unlock first-playground saat ada lesson dengan "project-" di slug', () => {
    const p: UserProgress = {
      ...DEFAULT_PROGRESS,
      completedLessons: ['unit-1/project-calculator'],
      unlockedBadges: [],
    }
    checkAndUnlockBadges(p)
    expect(p.unlockedBadges).toContain('first-playground')
  })

  it('returns array badge baru yang baru saja di-unlock', () => {
    const p: UserProgress = { ...DEFAULT_PROGRESS, completedLessons: ['unit-1/01'], unlockedBadges: [] }
    const newBadges = checkAndUnlockBadges(p)
    expect(newBadges).toContain('first-lesson')
  })

  it('returns array kosong jika tidak ada badge baru', () => {
    const p: UserProgress = {
      ...DEFAULT_PROGRESS,
      completedLessons: ['unit-1/01'],
      unlockedBadges: ['first-lesson'],
    }
    const newBadges = checkAndUnlockBadges(p)
    expect(newBadges).toEqual([])
  })
})

describe('getBadges via markLessonComplete integration', () => {
  it('unlock badge first-lesson setelah markLessonComplete', () => {
    markLessonComplete('unit-1/01')
    expect(getBadges()).toContain('first-lesson')
  })
})

// ============================================================
// resetProgress
// ============================================================

describe('resetProgress', () => {
  it('menghapus semua progress dari localStorage', () => {
    markLessonComplete('unit-1/01')
    resetProgress()
    const p = loadProgress()
    expect(p.completedLessons).toEqual([])
    expect(p.streakDays).toBe(0)
  })
})
