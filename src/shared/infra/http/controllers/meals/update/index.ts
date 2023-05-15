import { FastifyReply, FastifyRequest } from 'fastify'
import { makeUpdateMealUseCase } from '#modules/meals/factories/make-update-meal-use-case'

import { updateMealBodySchema, updateMealParamsSchema } from './schemas'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const { mealId } = updateMealParamsSchema.parse(request.params)

  const { name, description, datetime, type } = updateMealBodySchema.parse(request.body)

  const updateMealUseCase = makeUpdateMealUseCase()

  await updateMealUseCase.execute({ mealId, updatedMealData: { name, description, datetime, type } })

  return reply.status(204).send()
}
