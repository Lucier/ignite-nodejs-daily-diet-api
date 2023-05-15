import { MealsRepository } from '#modules/meals/repositories/meals.repository'
import { ResourceNotFoundError } from '#shared/errors/resource-not-found'

import { ListUserMealsUseCaseRequest, ListUserMealsUseCaseResponse } from './types'

export class ListUserMealsUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({ userId }: ListUserMealsUseCaseRequest): Promise<ListUserMealsUseCaseResponse> {
    const meals = await this.mealsRepository.listByUserId(userId)

    if (!meals) {
      throw new ResourceNotFoundError()
    }

    return { meals }
  }
}
