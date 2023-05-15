import { Meal } from '@prisma/client'

export type ListUserMealsUseCaseRequest = {
  userId: string
}

export type ListUserMealsUseCaseResponse = {
  meals: Meal[]
}
