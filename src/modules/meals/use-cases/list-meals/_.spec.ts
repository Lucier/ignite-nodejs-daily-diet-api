import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryMealsRepository } from '#modules/meals/repositories/in-memory/in-memory-meals'

import { ListUserMealsUseCase } from '.'

const mealExample = {
  user_id: 'user-01',
  name: 'X-tudo',
  description: 'X-tudo',
  datetime: '2023-03-14T20:00:00.000Z',
  isWithinDiet: false,
}

let mealsRepository: InMemoryMealsRepository
let sut: ListUserMealsUseCase

describe('List user meals  Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new ListUserMealsUseCase(mealsRepository)
  })

  it('should be able to list user meals', async () => {
    const createdMeal = await mealsRepository.create(mealExample)

    const { meals } = await sut.execute({ userId: createdMeal.user_id })

    expect(meals.length).toEqual(1)
  })
})
