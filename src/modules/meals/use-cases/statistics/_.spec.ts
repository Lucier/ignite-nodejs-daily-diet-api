import { expect, describe, it, beforeEach } from 'vitest'
import { ResourceNotFoundError } from '#shared/errors/resource-not-found'
import { InMemoryMealsRepository } from '#modules/meals/repositories/in-memory/in-memory-meals'

import { StatisticsUseCase } from '.'

const mealExample = {
  user_id: 'user-01',
  name: 'X-tudo',
  description: 'X-tudo',
  datetime: '2023-03-14T12:00:00.000Z',
  isWithinDiet: false,
}

const mealExample2 = {
  user_id: 'user-01',
  name: 'Salada verde',
  description: 'Salada verde',
  datetime: '2023-03-14T20:00:00.000Z',
  isWithinDiet: true,
}

let mealsRepository: InMemoryMealsRepository
let sut: StatisticsUseCase

describe('Get Meal Details Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new StatisticsUseCase(mealsRepository)
  })

  it('should be able to get user statistics', async () => {
    const createdMeal = await mealsRepository.create(mealExample)
    await mealsRepository.create(mealExample2)

    const { statistics } = await sut.execute({ userId: createdMeal.user_id })

    expect(statistics.totalMeals).toEqual(2)
    expect(statistics.totalMealsOffDiet).toEqual(1)
    expect(statistics.totalMealsWithinDiet).toEqual(1)
    expect(statistics.percentageWithinDiet).toEqual(0.5)
    expect(statistics.topSequenceWithinDiet).toEqual(1)
  })

  it('should not be able to get user statistics with wrong id', async () => {
    await expect(() => sut.execute({ userId: 'non-existing-id' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
