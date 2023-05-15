import { Meal, Prisma } from '@prisma/client'
import { prisma } from '#shared/libs/prisma'
import { calculateSequenceByKeyValue } from '#modules/meals/helpers/calculateDietSequence'
import { sortByDatetime } from '#modules/meals/helpers/sortByDatetime'

import { MealStatistics, MealsRepository } from '../meals.repository'

export class PrismaMealsRepository implements MealsRepository {
  async findById(id: string): Promise<Meal | null> {
    return prisma.meal.findUnique({ where: { id } })
  }

  async listByUserId(userId: string): Promise<Meal[]> {
    return prisma.meal.findMany({ where: { user_id: userId } })
  }

  async create(data: Prisma.MealUncheckedCreateInput): Promise<Meal> {
    return prisma.meal.create({ data })
  }

  async update(mealId: string, data: Prisma.MealUncheckedUpdateInput): Promise<Meal> {
    return prisma.meal.update({
      where: { id: mealId },
      data: {
        name: data.name,
        description: data.description,
        isWithinDiet: data.isWithinDiet,
        datetime: data.datetime,
      },
    })
  }

  async delete(mealId: string): Promise<void> {
    await prisma.meal.delete({ where: { id: mealId } })
  }

  async statisticsByUserId(userId: string): Promise<MealStatistics | null> {
    const userMeals = await prisma.meal.findMany({ where: { user_id: userId } })

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
