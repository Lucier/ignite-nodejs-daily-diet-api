import { z } from 'zod'

export const createMealBodySchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(255),
  datetime: z.string(),
  isWithinDiet: z.boolean(),
})
