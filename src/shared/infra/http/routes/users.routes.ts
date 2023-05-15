import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../middlewares/verify-jwt'
import { profile } from '../controllers/users/profile'
import { refresh } from '../controllers/users/refresh'
import { authenticate } from '../controllers/users/authenticate'
import { register } from '../controllers/users/register'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
