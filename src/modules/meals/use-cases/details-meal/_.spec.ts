import { expect, describe, it, beforeEach } from 'vitest'
import { ResourceNotFoundError } from '#shared/errors/resource-not-found'
import { InMemoryMealsRepository } from '#modules/meals/repositories/in-memory/in-memory-meals'

import { GetMealDetailsUseCase } from '.'

const mealExample = {
  user_id: 'user-01',
  name: 'X-tudo',
  description: 'X-tudo',
  datetime: '2023-03-14T20:00:00.000Z',
  isWithinDiet: false,
}

let mealsRepository: InMemoryMealsRepository
let sut: GetMealDetailsUseCase

describe('Get Meal Details Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new GetMealDetailsUseCase(mealsRepository)
  })

  it('should be able to get meal details', async () => {
    const createdMeal = await mealsRepository.create(mealExample)

    const { meal } = await sut.execute({ mealId: createdMeal.id })

    expect(meal.name).toEqual(mealExample.name)
  })

  it('should not be able to get meal details with wrong id', async () => {
    await expect(() => sut.execute({ mealId: 'non-existing-id' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
