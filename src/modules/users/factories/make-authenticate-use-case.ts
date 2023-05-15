import { PrismaUsersRepository } from '../repositories/prisma/prisma-users'
import { AuthenticateUseCase } from '../use-cases/authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new AuthenticateUseCase(usersRepository)
}
