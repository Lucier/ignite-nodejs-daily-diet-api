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

describe('Create Meal (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a meal', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post(`/meals`)
      .set('Authorization', `Bearer ${token}`)
      .send(mealExample)

    expect(response.statusCode).toEqual(201)
  })
})
