/* eslint-disable sonarjs/no-duplicate-string */
import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../middlewares/verify-jwt'
import { list } from '../controllers/meals/list'
import { create } from '../controllers/meals/create'
import { update } from '../controllers/meals/update'
import { deleteMeal } from '../controllers/meals/delete'
import { details } from '../controllers/meals/details'
import { statisticsMeals } from '../controllers/meals/statistics'

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/meals', list)
  app.post('/meals', create)
  app.put('/meals/:mealId', update)
  app.delete('/meals/:mealId', deleteMeal)

  app.get('/meals/:mealId', details)

  app.get('/statistics', statisticsMeals)
}
