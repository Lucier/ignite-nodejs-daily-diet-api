import { PrismaMealsRepository } from '../repositories/prisma/prisma-meals'
import { CreateMealUseCase } from '../use-cases/create-meal'

export function makeCreateMealUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  return new CreateMealUseCase(mealsRepository)
}
