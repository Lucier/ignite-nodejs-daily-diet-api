import { PrismaMealsRepository } from '../repositories/prisma/prisma-meals'
import { GetMealDetailsUseCase } from '../use-cases/details-meal'

export function makeDetailsMealUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  return new GetMealDetailsUseCase(mealsRepository)
}
