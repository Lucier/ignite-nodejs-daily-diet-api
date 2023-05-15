import { FastifyReply, FastifyRequest } from 'fastify'
import { makeStatisticsUseCase } from '#modules/meals/factories/make-statistics-use-case'

export async function statisticsMeals(request: FastifyRequest, reply: FastifyReply) {
  const statisticsMealsUseCase = makeStatisticsUseCase()

  const { statistics } = await statisticsMealsUseCase.execute({ userId: request.user.sub })

  return reply.status(200).send({ statistics })
}
