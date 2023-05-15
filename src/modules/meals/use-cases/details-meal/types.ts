import { Meal } from '@prisma/client'

export type GetMealDetailsUseCaseRequest = {
  mealId: string
}

export type GetMealDetailsUseCaseResponse = {
  meal: Meal
}
