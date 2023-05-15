import { FastifyInstance } from 'fastify'

import { usersRoutes } from './users.routes'
import { mealsRoutes } from './meals.routes'

export async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes)
  app.register(mealsRoutes)
}
