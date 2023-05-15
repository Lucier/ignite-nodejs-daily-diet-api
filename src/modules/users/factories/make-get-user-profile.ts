import { PrismaUsersRepository } from '../repositories/prisma/prisma-users'
import { GetUserProfileUseCase } from '../use-cases/get-user-profile'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new GetUserProfileUseCase(usersRepository)
}
