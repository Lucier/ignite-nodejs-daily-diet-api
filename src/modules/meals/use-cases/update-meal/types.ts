import { Meal } from '@prisma/client'

export type UpdateMealUseCaseRequest = {
  mealId: string
  updatedMealData: Partial<{
    name: string
    description: string
    type: string
    datetime: string
  }>
}

export type UpdateMealUseCaseResponse = {
  meal: Meal
}
