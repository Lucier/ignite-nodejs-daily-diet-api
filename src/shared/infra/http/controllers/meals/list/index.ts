import { FastifyReply, FastifyRequest } from 'fastify'
import { makeListMealsUseCase } from '#modules/meals/factories/make-list-meal-use-case'

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const listMealsUseCase = makeListMealsUseCase()

  const { meals } = await listMealsUseCase.execute({ userId: request.user.sub })

  return reply.status(200).send({ meals })
}
