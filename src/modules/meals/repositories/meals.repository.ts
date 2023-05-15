import { Prisma, Meal } from '@prisma/client'

export interface MealStatistics {
  totalMeals: number
  totalMealsOffDiet: number
  totalMealsWithinDiet: number
  percentageWithinDiet: number
  topSequenceWithinDiet: number
}

export interface MealsRepository {
  findById(id: string): Promise<Meal | null>
  listByUserId(userId: string): Promise<Meal[]>
  create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
  update(mealId: string, data: Prisma.MealUncheckedUpdateInput): Promise<Meal>
  delete(mealId: string): Promise<void>
  statisticsByUserId(userId: string): Promise<MealStatistics | null>
}
