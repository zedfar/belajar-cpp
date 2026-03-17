import { useState, useEffect } from 'react'
import { loadProgress, setCurrentLesson, getOverallProgress } from '../../lib/progress'
import type { Language } from '../../types/lesson'
import type { UserProgress } from '../../types/progress'

interface ProgressTrackerProps {
  lessonSlug?: string
  lang: Language
  totalLessons?: number
}

export function ProgressTracker({ lessonSlug, lang, totalLessons = 45 }: ProgressTrackerProps) {
  const [progress, setProgress] = useState<UserProgress | null>(null)

  useEffect(() => {
    const p = loadProgress()
    setProgress(p)
    if (lessonSlug) {
      setCurrentLesson(lessonSlug)
    }
  }, [lessonSlug])

  if (!progress) return null

  const overall = getOverallProgress(totalLessons)

  return (
    <div className="space-y-3">
      {/* Overall progress */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
            {lang === 'id' ? 'Progres Keseluruhan' : 'Overall Progress'}
          </span>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            {overall.completed}/{overall.total}
          </span>
        </div>
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${overall.percent}%` }}
          />
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 block">
          {overall.percent}%
        </span>
      </div>

      {/* Streak */}
      {progress.streakDays > 0 && (
        <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <span className="text-amber-600 dark:text-amber-400 text-lg" aria-hidden="true">
            &#x1f525;
          </span>
          <div>
            <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
              {progress.streakDays} {lang === 'id' ? 'hari berturut-turut!' : 'day streak!'}
            </span>
          </div>
        </div>
      )}

      {/* Badges */}
      {progress.unlockedBadges.length > 0 && (
        <div>
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1 block">
            {lang === 'id' ? 'Lencana' : 'Badges'} ({progress.unlockedBadges.length})
          </span>
          <div className="flex flex-wrap gap-1.5">
            {progress.unlockedBadges.map(badge => (
              <span
                key={badge}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
                title={badgeLabel(badge, lang)}
              >
                {badgeLabel(badge, lang)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Current lesson indicator */}
      {lessonSlug && (
        <div className="text-xs text-slate-400 dark:text-slate-500 truncate">
          {lang === 'id' ? 'Sedang dipelajari:' : 'Currently viewing:'} {lessonSlug}
        </div>
      )}
    </div>
  )
}

function badgeLabel(badge: string, lang: Language): string {
  const labels: Record<string, Record<Language, string>> = {
    'first-lesson': { id: 'Pelajaran Pertama', en: 'First Lesson' },
    'unit-1-complete': { id: 'Unit 1 Selesai', en: 'Unit 1 Complete' },
    'unit-2-complete': { id: 'Unit 2 Selesai', en: 'Unit 2 Complete' },
    'unit-3-complete': { id: 'Unit 3 Selesai', en: 'Unit 3 Complete' },
    'unit-4-complete': { id: 'Unit 4 Selesai', en: 'Unit 4 Complete' },
    'unit-5-complete': { id: 'Unit 5 Selesai', en: 'Unit 5 Complete' },
    'unit-6-complete': { id: 'Unit 6 Selesai', en: 'Unit 6 Complete' },
    'all-units-complete': { id: 'Semua Unit Selesai', en: 'All Units Complete' },
    'first-playground': { id: 'Playground Pertama', en: 'First Playground' },
    'streak-3': { id: '3 Hari Beruntun', en: '3-Day Streak' },
    'streak-7': { id: '7 Hari Beruntun', en: '7-Day Streak' },
  }
  return labels[badge]?.[lang] ?? badge
}
