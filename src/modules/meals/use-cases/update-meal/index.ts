import { MealsRepository } from '#modules/meals/repositories/meals.repository'
import { ResourceNotFoundError } from '#shared/errors/resource-not-found'

import { UpdateMealUseCaseRequest, UpdateMealUseCaseResponse } from './types'

export class UpdateMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute(request: UpdateMealUseCaseRequest): Promise<UpdateMealUseCaseResponse> {
    const { mealId, updatedMealData } = request

    const meal = await this.mealsRepository.findById(mealId)

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    const updatedMeal = await this.mealsRepository.update(mealId, updatedMealData)

    return { meal: updatedMeal }
  }
}
