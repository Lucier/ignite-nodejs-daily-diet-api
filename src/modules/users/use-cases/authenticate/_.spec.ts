import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { InvalidCredentialsError } from '#shared/errors/invalid-credentials'
import { InMemoryUsersRepository } from '#modules/users/repositories/in-memory/in-memory-users'

import { AuthenticateUseCase } from '.'

const johnDoe = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: '123456',
}

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })
  it('should be able to authenticate', async () => {
    await usersRepository.create({
      ...johnDoe,
      password_hash: await hash(johnDoe.password, 6),
    })

    const { user } = await sut.execute({
      email: johnDoe.email,
      password: johnDoe.password,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: johnDoe.email,
        password: johnDoe.password,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      ...johnDoe,
      password_hash: await hash(johnDoe.password, 6),
    })

    await expect(() =>
      sut.execute({
        email: johnDoe.email,
        password: `${johnDoe.password}-wrong`,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
