import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryMealsRepository } from '#modules/meals/repositories/in-memory/in-memory-meals'

import { CreateMealUseCase } from '.'

const mealExample = {
  userId: 'user-01',
  name: 'X-tudo',
  description: 'X-tudo',
  datetime: '2023-03-14T20:00:00.000Z',
  isWithinDiet: false,
}

let mealsRepository: InMemoryMealsRepository
let sut: CreateMealUseCase

describe('Create Meal Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new CreateMealUseCase(mealsRepository)
  })

  it('should to create meal', async () => {
    const { meal } = await sut.execute(mealExample)

    expect(meal.id).toEqual(expect.any(String))
  })
})
