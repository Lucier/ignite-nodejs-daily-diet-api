import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '#shared/infra/http/app'
import { createAndAuthenticateUser } from '#shared/helpers/create-and-authenticate-user'

const newMealExample = {
  name: 'X-tudo',
  description: 'X-tudo',
  datetime: '2023-03-14T20:00:00.000Z',
  isWithinDiet: false,
}

const updatedMealExample = {
  name: 'X-bacon',
  description: 'X-bacon',
  datetime: '2023-03-14T20:00:00.000Z',
  isWithinDiet: false,
}

describe('Update Meal (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to update a user meal', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post(`/meals`)
      .set('Authorization', `Bearer ${token}`)
      .send(newMealExample)

    const usersMeals = await request(app.server)
      .get(`/meals`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    const newMealId = usersMeals.body.meals[0].id

    const response = await request(app.server)
      .put(`/meals/${newMealId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedMealExample)

    const updatedUsersMeals = await request(app.server)
      .get(`/meals`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    const updatedMealId = updatedUsersMeals.body.meals[0].id

    const result = updatedUsersMeals.body.meals.filter((meal: any) => meal.id === newMealId)

    expect(response.statusCode).toEqual(204)
    expect(updatedMealId).toEqual(newMealId)
    expect(result).toEqual([expect.objectContaining({ name: updatedMealExample.name })])
  })
})
