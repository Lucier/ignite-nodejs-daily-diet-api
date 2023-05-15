import { MealStatistics } from '#modules/meals/repositories/meals.repository'

export type GetUserStatisticsUseCaseRequest = {
  userId: string
}

export type GetUserStatisticsUseCaseResponse = {
  statistics: MealStatistics
}
