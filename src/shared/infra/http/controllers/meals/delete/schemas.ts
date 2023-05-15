import { z } from 'zod'

export const deleteMealParamsSchema = z.object({ mealId: z.string() })
