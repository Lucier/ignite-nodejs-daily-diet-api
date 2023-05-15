/* eslint-disable import/no-extraneous-dependencies */
import { FastifyInstance } from 'fastify'
import request from 'supertest'

const johnDoe = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: '123456',
}

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send(johnDoe)

  const authResponse = await request(app.server).post('/sessions').send({
    email: johnDoe.email,
    password: johnDoe.password,
  })

  const { token } = authResponse.body

  return { token }
}
