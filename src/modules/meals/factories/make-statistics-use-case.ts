import { PrismaMealsRepository } from '../repositories/prisma/prisma-meals'
import { StatisticsUseCase } from '../use-cases/statistics'

export function makeStatisticsUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  return new StatisticsUseCase(mealsRepository)
}
