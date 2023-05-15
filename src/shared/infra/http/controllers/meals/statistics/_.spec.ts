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

describe('Statistics Meals (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list user statistics', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server).post('/meals').set('Authorization', `Bearer ${token}`).send(mealExample)

    const response = await request(app.server)
      .get('/statistics')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.statistics).toEqual(expect.objectContaining({ totalMeals: 1 }))
  })
})
