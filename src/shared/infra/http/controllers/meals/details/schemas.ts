import { z } from 'zod'

export const detailsMealParamsSchema = z.object({ mealId: z.string() })
