import type { UserProgress, BadgeId, ExerciseResult, QuizResult } from '@/types/progress'
import { DEFAULT_PROGRESS } from '@/types/progress'

const STORAGE_KEY = 'belajar-cpp-progress'

// ============================================================
// CORE STORAGE
// ============================================================

function freshDefault(): UserProgress {
  return {
    ...DEFAULT_PROGRESS,
    completedLessons: [],
    exerciseResults: {},
    quizResults: {},
    unlockedBadges: [],
  }
}

export function loadProgress(): UserProgress {
  if (typeof window === 'undefined') return freshDefault()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return freshDefault()
    const parsed = JSON.parse(raw)
    // Merge with defaults to handle missing fields from older versions
    return { ...DEFAULT_PROGRESS, ...parsed }
  } catch {
    return freshDefault()
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    console.warn('Failed to save progress to localStorage')
  }
}

// ============================================================
// LESSON COMPLETION
// ============================================================

export function markLessonComplete(slug: string): UserProgress {
  const progress = loadProgress()
  if (!progress.completedLessons.includes(slug)) {
    progress.completedLessons.push(slug)
  }
  progress.lastVisited = new Date().toISOString()
  progress.currentLesson = slug
  updateStreak(progress)
  checkAndUnlockBadges(progress)
  saveProgress(progress)
  return progress
}

export function isLessonComplete(slug: string): boolean {
  const progress = loadProgress()
  return progress.completedLessons.includes(slug)
}

export function setCurrentLesson(slug: string): void {
  const progress = loadProgress()
  progress.currentLesson = slug
  progress.lastVisited = new Date().toISOString()
  saveProgress(progress)
}

// ============================================================
// EXERCISE RESULTS
// ============================================================

export function saveExerciseResult(exerciseId: string, result: ExerciseResult): UserProgress {
  const progress = loadProgress()
  progress.exerciseResults[exerciseId] = result
  saveProgress(progress)
  return progress
}

export function getExerciseResult(exerciseId: string): ExerciseResult | null {
  const progress = loadProgress()
  return progress.exerciseResults[exerciseId] ?? null
}

// ============================================================
// QUIZ RESULTS
// ============================================================

export function saveQuizResult(quizId: string, result: QuizResult): UserProgress {
  const progress = loadProgress()
  progress.quizResults[quizId] = result
  saveProgress(progress)
  return progress
}

// ============================================================
// UNIT PROGRESS
// ============================================================

export function getUnitProgress(unitSlug: string, totalLessons: number): {
  completed: number
  total: number
  percent: number
  isComplete: boolean
} {
  const progress = loadProgress()
  const completedInUnit = progress.completedLessons.filter(slug =>
    slug.startsWith(unitSlug + '/')
  ).length

  return {
    completed: completedInUnit,
    total: totalLessons,
    percent: totalLessons > 0 ? Math.round((completedInUnit / totalLessons) * 100) : 0,
    isComplete: completedInUnit >= totalLessons,
  }
}

export function getOverallProgress(totalLessons: number): {
  completed: number
  total: number
  percent: number
} {
  const progress = loadProgress()
  return {
    completed: progress.completedLessons.length,
    total: totalLessons,
    percent: totalLessons > 0 ? Math.round((progress.completedLessons.length / totalLessons) * 100) : 0,
  }
}

// ============================================================
// PREFERENCES
// ============================================================

export function setLanguage(lang: 'id' | 'en'): void {
  const progress = loadProgress()
  progress.language = lang
  saveProgress(progress)
}

export function setTheme(theme: 'light' | 'dark'): void {
  const progress = loadProgress()
  progress.theme = theme
  saveProgress(progress)
}

export function getTheme(): 'light' | 'dark' {
  const progress = loadProgress()
  return progress.theme
}

// ============================================================
// STREAK
// ============================================================

function updateStreak(progress: UserProgress): void {
  const today = new Date().toISOString().split('T')[0] ?? ''
  const lastActive = progress.lastActiveDate

  if (!lastActive || lastActive === today) {
    progress.lastActiveDate = today
    return
  }

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0] ?? ''

  if (lastActive === yesterdayStr) {
    progress.streakDays += 1
  } else {
    progress.streakDays = 1
  }
  progress.lastActiveDate = today
}

// ============================================================
// BADGES
// ============================================================

// Actual lesson counts per unit — must stay in sync with content files
const UNIT_LESSON_COUNTS: Record<string, number> = {
  'unit-1': 8,
  'unit-2': 6,
  'unit-3': 7,
  'unit-4': 8,
  'unit-5': 7,
  'unit-6': 6,
}

export function checkAndUnlockBadges(progress: UserProgress): BadgeId[] {
  const newBadges: BadgeId[] = []

  const tryUnlock = (badgeId: BadgeId, condition: boolean) => {
    if (condition && !progress.unlockedBadges.includes(badgeId)) {
      progress.unlockedBadges.push(badgeId)
      newBadges.push(badgeId)
    }
  }

  tryUnlock('first-lesson', progress.completedLessons.length >= 1)
  tryUnlock('streak-3', progress.streakDays >= 3)
  tryUnlock('streak-7', progress.streakDays >= 7)

  // Unit completion: check against actual lesson count per unit
  let allUnitsComplete = true
  Object.entries(UNIT_LESSON_COUNTS).forEach(([unit, total]) => {
    const done = progress.completedLessons.filter(s => s.startsWith(unit + '/')).length
    const unitNum = unit.replace('unit-', '')
    tryUnlock(`unit-${unitNum}-complete` as BadgeId, done >= total)
    if (done < total) allUnitsComplete = false
  })

  tryUnlock('all-units-complete', allUnitsComplete)

  // First project: project lessons have 'project-' in their slug filename
  tryUnlock('first-playground',
    progress.completedLessons.some(s => s.includes('project-'))
  )

  return newBadges
}

export function getBadges(): BadgeId[] {
  return loadProgress().unlockedBadges as BadgeId[]
}

// ============================================================
// RESET (for testing)
// ============================================================

export function resetProgress(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}
