import { PrismaMealsRepository } from '../repositories/prisma/prisma-meals'
import { DeleteMealUseCase } from '../use-cases/delete-meal'

export function makeDeleteMealUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  return new DeleteMealUseCase(mealsRepository)
}
