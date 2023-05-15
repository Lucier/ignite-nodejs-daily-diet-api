import { MealsRepository } from '#modules/meals/repositories/meals.repository'
import { InvalidUserAccessError } from '#shared/errors/invalid-user-access'
import { ResourceNotFoundError } from '#shared/errors/resource-not-found'

import { DeleteMealUseCaseRequest } from './types'

export class DeleteMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute(request: DeleteMealUseCaseRequest): Promise<void> {
    const { mealId, userId } = request
    const meal = await this.mealsRepository.findById(mealId)

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    if (meal.user_id !== userId) {
      throw new InvalidUserAccessError()
    }

    await this.mealsRepository.delete(mealId)
  }
}
