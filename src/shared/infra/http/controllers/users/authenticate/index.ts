import { FastifyReply, FastifyRequest } from 'fastify'
import { makeAuthenticateUseCase } from '#modules/users/factories/make-authenticate-use-case'
import { InvalidCredentialsError } from '#shared/errors/invalid-credentials'

import { authenticateBodySchema } from './schemas'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()
    const { user } = await authenticateUseCase.execute({ email, password })

    const signJwt = { sub: user.id }
    const token = await reply.jwtSign({}, { sign: signJwt })

    const refreshSign = { sub: user.id, expiresIn: '7d' }
    const refreshToken = await reply.jwtSign({}, { sign: refreshSign })

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
