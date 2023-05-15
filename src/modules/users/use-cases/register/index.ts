import { hash } from 'bcryptjs'
import { UsersRepository } from '#modules/users/repositories/users.repository'
import { UserAlreadyExistsError } from '#shared/errors/user-already-exists'

import { RegisterUseCaseRequest, RegisterUseCaseResponse } from './types'

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const { name, email, password } = request
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({ name, email, password_hash })

    return { user }
  }
}
