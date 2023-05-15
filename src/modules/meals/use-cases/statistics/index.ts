import { MealsRepository } from '#modules/meals/repositories/meals.repository'
import { ResourceNotFoundError } from '#shared/errors/resource-not-found'

import { GetUserStatisticsUseCaseRequest, GetUserStatisticsUseCaseResponse } from './types'

export class StatisticsUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    userId,
  }: GetUserStatisticsUseCaseRequest): Promise<GetUserStatisticsUseCaseResponse> {
    const statistics = await this.mealsRepository.statisticsByUserId(userId)

    if (!statistics) {
      throw new ResourceNotFoundError()
    }

    return { statistics }
  }
}
