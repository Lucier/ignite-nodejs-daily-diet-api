import { Meal } from '@prisma/client'

export type CreateMealUseCaseRequest = {
  userId: string
  name: string
  description: string
  isWithinDiet: boolean
  datetime: string
}

export type CreateMealUseCaseResponse = {
  meal: Meal
}
