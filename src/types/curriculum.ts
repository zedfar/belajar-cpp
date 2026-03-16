import type { Language, UnitMetadata } from './lesson'

export interface CurriculumConfig {
  version: string
  totalUnits: number
  totalLessons: number
  estimatedTotalHours: string
  units: UnitMetadata[]
}

export interface GlossaryEntry {
  term: string
  definition: Record<Language, string>
  example?: string    // C++ code example
  relatedTerms?: string[]
  unit?: number       // first introduced in which unit
}

export interface CurriculumStats {
  completedUnits: number
  completedLessons: number
  totalLessons: number
  percentComplete: number
  currentUnit: number | null
  estimatedRemainingHours: number
}
