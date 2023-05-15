import { z } from 'zod'

export const updateMealBodySchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().min(1).max(255).optional(),
  datetime: z.string().optional(),
  type: z.string().optional(),
})

export const updateMealParamsSchema = z.object({ mealId: z.string() })
