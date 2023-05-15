import { MealsRepository } from '#modules/meals/repositories/meals.repository'

import { CreateMealUseCaseRequest, CreateMealUseCaseResponse } from './types'

export class CreateMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute(request: CreateMealUseCaseRequest): Promise<CreateMealUseCaseResponse> {
    const { name, description, isWithinDiet, datetime, userId } = request

    const meal = await this.mealsRepository.create({
      user_id: userId,
      name,
      description,
      isWithinDiet,
      datetime,
    })

    return { meal }
  }
}
