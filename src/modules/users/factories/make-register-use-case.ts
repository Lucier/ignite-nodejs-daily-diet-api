import { PrismaUsersRepository } from '../repositories/prisma/prisma-users'
import { RegisterUseCase } from '../use-cases/register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new RegisterUseCase(usersRepository)
}
