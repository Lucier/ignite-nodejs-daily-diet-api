import { MealsRepository } from '#modules/meals/repositories/meals.repository'
import { ResourceNotFoundError } from '#shared/errors/resource-not-found'

import { GetMealDetailsUseCaseRequest, GetMealDetailsUseCaseResponse } from './types'

export class GetMealDetailsUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({ mealId }: GetMealDetailsUseCaseRequest): Promise<GetMealDetailsUseCaseResponse> {
    const meal = await this.mealsRepository.findById(mealId)

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    return { meal }
  }
}
