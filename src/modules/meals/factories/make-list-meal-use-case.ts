import { PrismaMealsRepository } from '../repositories/prisma/prisma-meals'
import { ListUserMealsUseCase } from '../use-cases/list-meals'

export function makeListMealsUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  return new ListUserMealsUseCase(mealsRepository)
}
