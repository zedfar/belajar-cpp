export interface UserProgress {
  completedLessons: string[]         // ["unit-1/01", "unit-1/02"]
  currentLesson: string | null       // slug of current lesson
  exerciseResults: Record<string, ExerciseResult>
  quizResults: Record<string, QuizResult>
  language: 'id' | 'en'
  theme: 'light' | 'dark'
  lastVisited: string                // ISO date string
  streakDays: number
  lastActiveDate: string             // YYYY-MM-DD
  unlockedBadges: string[]
}

export interface ExerciseResult {
  solved: boolean
  attempts: number
  hintsUsed: number
  lastAttempt: string
}

export interface QuizResult {
  score: number        // 0-100
  completedAt: string
  answers: number[]    // selected option indices
}

export type BadgeId =
  | 'first-lesson'
  | 'unit-1-complete'
  | 'unit-2-complete'
  | 'unit-3-complete'
  | 'unit-4-complete'
  | 'unit-5-complete'
  | 'unit-6-complete'
  | 'all-units-complete'
  | 'first-playground'
  | 'streak-3'
  | 'streak-7'

export const DEFAULT_PROGRESS: UserProgress = {
  completedLessons: [],
  currentLesson: null,
  exerciseResults: {},
  quizResults: {},
  language: 'id',
  theme: 'light',
  lastVisited: new Date().toISOString(),
  streakDays: 0,
  lastActiveDate: new Date().toISOString().split('T')[0] ?? '',
  unlockedBadges: [],
}
