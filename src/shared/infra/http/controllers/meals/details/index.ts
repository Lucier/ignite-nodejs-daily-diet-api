import { FastifyReply, FastifyRequest } from 'fastify'
import { makeDetailsMealUseCase } from '#modules/meals/factories/make-details-meal-use-case'

import { detailsMealParamsSchema } from './schemas'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const { mealId } = detailsMealParamsSchema.parse(request.params)

  const getMealDetails = makeDetailsMealUseCase()

  const { meal } = await getMealDetails.execute({ mealId })

  return reply.status(200).send({ meal })
}
