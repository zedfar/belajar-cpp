import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const lessonSchema = z.object({
  title: z.string(),
  unit: z.number().int().min(0).max(9),
  lesson: z.number().int().min(0),
  description: z.string(),
  objectives: z.array(z.string()).min(1),
  estimatedTime: z.number().int().positive(),  // minutes
  prerequisites: z.array(z.string()).optional(),
  translationStatus: z.enum(['complete', 'draft', 'outdated', 'missing']).optional(),
  difficulty: z.enum(['beginner', 'intermediate']).optional().default('beginner'),
  tags: z.array(z.string()).optional(),
})

// Astro v5 content layer API with glob loader
const lessonsIdCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/lessons-id' }),
  schema: lessonSchema,
})

const lessonsEnCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/lessons-en' }),
  schema: lessonSchema.extend({
    translationStatus: z.enum(['complete', 'draft', 'outdated', 'missing']).default('draft'),
  }),
})

export const collections = {
  'lessons-id': lessonsIdCollection,
  'lessons-en': lessonsEnCollection,
}
