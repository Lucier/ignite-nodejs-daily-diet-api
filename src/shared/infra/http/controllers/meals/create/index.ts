import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateMealUseCase } from '#modules/meals/factories/make-create-meal-use-case'

import { createMealBodySchema } from './schemas'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const { name, description, datetime, isWithinDiet } = createMealBodySchema.parse(request.body)

  const createMealUseCase = makeCreateMealUseCase()

  await createMealUseCase.execute({
    userId: request.user.sub,
    name,
    description,
    datetime,
    isWithinDiet,
  })

  return reply.status(201).send()
}
