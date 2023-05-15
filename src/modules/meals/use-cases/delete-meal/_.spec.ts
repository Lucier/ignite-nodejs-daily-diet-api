import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryMealsRepository } from '#modules/meals/repositories/in-memory/in-memory-meals'
import { InvalidUserAccessError } from '#shared/errors/invalid-user-access'

import { DeleteMealUseCase } from '.'

const mealExample = {
  user_id: 'user-01',
  name: 'X-tudo',
  description: 'X-tudo',
  datetime: '2023-03-14T20:00:00.000Z',
  isWithinDiet: false,
}

let mealsRepository: InMemoryMealsRepository
let sut: DeleteMealUseCase

describe('Delete Meal Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new DeleteMealUseCase(mealsRepository)
  })

  it('should be able to delete meal', async () => {
    const meal = await mealsRepository.create(mealExample)

    await sut.execute({ mealId: meal.id, userId: mealExample.user_id })

    expect(meal.id).toEqual(expect.any(String))
  })
  it('should not be able to delete meal from other user', async () => {
    const meal = await mealsRepository.create(mealExample)

    await expect(() =>
      sut.execute({ mealId: meal.id, userId: 'other-user-id' }),
    ).rejects.toBeInstanceOf(InvalidUserAccessError)
  })
})
