import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryMealsRepository } from '#modules/meals/repositories/in-memory/in-memory-meals'
import { ResourceNotFoundError } from '#shared/errors/resource-not-found'

import { UpdateMealUseCase } from '.'

const mealExample = {
  user_id: 'user-01',
  name: 'X-tudo',
  description: 'X-tudo',
  datetime: '2023-03-14T20:00:00.000Z',
  isWithinDiet: false,
}

const updatedMealExample = {
  user_id: 'user-01',
  name: 'X-bacon',
  description: 'X-bacon',
  datetime: '2023-03-14T20:00:00.000Z',
  isWithinDiet: false,
}

let mealsRepository: InMemoryMealsRepository
let sut: UpdateMealUseCase

describe('Update Meal Use Case', () => {
  beforeEach(async () => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new UpdateMealUseCase(mealsRepository)
  })

  it('should be able to update a user meal', async () => {
    const createdMeal = await mealsRepository.create(mealExample)

    const { meal } = await sut.execute({ mealId: createdMeal.id, updatedMealData: updatedMealExample })

    expect(meal.updated_at).toEqual(expect.any(Date))
    expect(mealsRepository.items[0].updated_at).toEqual(expect.any(Date))
    expect(mealsRepository.items[0].name).toEqual(updatedMealExample.name)
  })

  it('should not be able to update an inexistent meal', async () => {
    await expect(() =>
      sut.execute({ mealId: 'inexistent-meal-id', updatedMealData: updatedMealExample }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
