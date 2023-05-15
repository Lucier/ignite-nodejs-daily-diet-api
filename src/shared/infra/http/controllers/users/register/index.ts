import { FastifyReply, FastifyRequest } from 'fastify'
import { UserAlreadyExistsError } from '#shared/errors/user-already-exists'
import { makeRegisterUseCase } from '#modules/users/factories/make-register-use-case'

import { registerBodySchema } from './schemas'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()
    await registerUseCase.execute({ name, email, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
