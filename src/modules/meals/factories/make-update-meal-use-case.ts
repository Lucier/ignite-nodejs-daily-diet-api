import { PrismaMealsRepository } from '../repositories/prisma/prisma-meals'
import { UpdateMealUseCase } from '../use-cases/update-meal'

export function makeUpdateMealUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  return new UpdateMealUseCase(mealsRepository)
}
