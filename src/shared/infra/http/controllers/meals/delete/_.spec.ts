import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '#shared/helpers/create-and-authenticate-user'
import { app } from '#shared/infra/http/app'

const mealExample = {
  name: 'X-tudo',
  description: 'X-tudo',
  datetime: '2023-03-14T20:00:00.000Z',
  isWithinDiet: false,
}

describe('Delete Meal (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete meal', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server).post('/meals').set('Authorization', `Bearer ${token}`).send(mealExample)

    const usersMeals = await request(app.server)
      .get(`/meals`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    const newMealId = usersMeals.body.meals[0].id

    const response = await request(app.server)
      .delete(`/meals/${newMealId}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    const result = await request(app.server)
      .get(`/meals`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)
    expect(result.body.meals).toHaveLength(0)
  })
  it('should not be able to delete meal unauthenticated', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server).post('/meals').set('Authorization', `Bearer ${token}`).send(mealExample)

    const usersMeals = await request(app.server)
      .get(`/meals`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    const newMealId = usersMeals.body.meals[0].id

    const response = await request(app.server).delete(`/meals/${newMealId}`).send()

    const result = await request(app.server)
      .get(`/meals`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(401)
    expect(result.body.meals).toHaveLength(1)
  })
})
