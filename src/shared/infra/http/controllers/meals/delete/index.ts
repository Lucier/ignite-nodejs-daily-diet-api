import { FastifyReply, FastifyRequest } from 'fastify'
import { makeDeleteMealUseCase } from '#modules/meals/factories/make-delete-meal-use-case'

import { deleteMealParamsSchema } from './schemas'

export async function deleteMeal(request: FastifyRequest, reply: FastifyReply) {
  const { mealId } = deleteMealParamsSchema.parse(request.params)

  const deleteMealUseCase = makeDeleteMealUseCase()

  await deleteMealUseCase.execute({ mealId, userId: request.user.sub })

  return reply.status(204).send()
}
