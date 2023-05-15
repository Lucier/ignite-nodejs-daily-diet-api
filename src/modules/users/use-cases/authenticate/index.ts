import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '#shared/errors/invalid-credentials'
import { UsersRepository } from '#modules/users/repositories/users.repository'

import { AuthenticateUseCaseRequest, AuthenticateUseCaseResponse } from './types'

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doestPasswordMatches = await compare(password, user.password_hash)

    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
