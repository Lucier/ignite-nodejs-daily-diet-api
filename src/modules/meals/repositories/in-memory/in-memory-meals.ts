import { Meal, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { ResourceNotFoundError } from '#shared/errors/resource-not-found'
import { sortByDatetime } from '#modules/meals/helpers/sortByDatetime'
import { calculateSequenceByKeyValue } from '#modules/meals/helpers/calculateDietSequence'

import { MealStatistics, MealsRepository } from '../meals.repository'

export class InMemoryMealsRepository implements MealsRepository {
  public items: Meal[] = []

  async findById(id: string): Promise<Meal | null> {
    return this.items.find((item) => item.id === id) ?? null
  }

  async listByUserId(userId: string): Promise<Meal[]> {
    return this.items.filter((item) => item.user_id === userId)
  }

  async create(data: Prisma.MealUncheckedCreateInput): Promise<Meal> {
    const meal = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      isWithinDiet: data.isWithinDiet,
      datetime: data.datetime,
      user_id: data.user_id,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(meal)

    return meal
  }

  async update(mealId: string, data: Prisma.MealUncheckedUpdateInput): Promise<Meal> {
    const mealIndex = this.items.findIndex((item) => item.id === mealId)

    if (mealIndex < 0) {
      throw new ResourceNotFoundError()
    }

    const updatedMeal = {
      id: mealId,
      name: data.name ?? this.items[mealIndex].name,
      description: data.description ?? this.items[mealIndex].description,
      isWithinDiet: data.isWithinDiet ?? this.items[mealIndex].isWithinDiet,
      datetime: data.datetime ?? this.items[mealIndex].datetime,
      user_id: this.items[mealIndex].user_id,
      updated_at: new Date(),
      created_at: this.items[mealIndex].created_at,
    } as Meal

    this.items[mealIndex] = updatedMeal

    return updatedMeal
  }

  async delete(mealId: string): Promise<void> {
    const mealIndex = this.items.findIndex((item) => item.id === mealId)

    if (mealIndex < 0) {
      throw new ResourceNotFoundError()
    }

    this.items.splice(mealIndex, 1)
  }

  async statisticsByUserId(userId: string): Promise<MealStatistics | null> {
    const userMeals = this.items.filter((item) => item.user_id === userId)

    const sortedMealsByDatetime = sortByDatetime(userMeals)

    if (sortedMealsByDatetime.length === 0) {
      return null
    }

    const totalMeals = sortedMealsByDatetime.length

    const totalMealsOffDiet = sortedMealsByDatetime.filter((meal) => !meal.isWithinDiet).length

    const totalMealsWithinDiet = sortedMealsByDatetime.filter((meal) => meal.isWithinDiet).length

    const percentageWithinDiet = totalMealsWithinDiet / totalMeals

    return {
      totalMeals,
      totalMealsOffDiet,
      totalMealsWithinDiet,
      percentageWithinDiet,
      topSequenceWithinDiet: calculateSequenceByKeyValue(sortedMealsByDatetime, 'isWithinDiet', true),
    }
  }
}
