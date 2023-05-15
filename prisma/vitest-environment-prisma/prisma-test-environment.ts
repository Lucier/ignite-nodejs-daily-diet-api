/* eslint-disable import/no-extraneous-dependencies */
import 'dotenv/config'

import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { Environment } from 'vitest'
import { PrismaClient } from '@prisma/client'
import { unlinkSync } from 'node:fs'

const prisma = new PrismaClient()

export default <Environment>{
  name: 'prisma',
  async setup() {
    const schema = randomUUID()
    const databaseURL = `file:./${schema}.db`

    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "meals"`)
        await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "users"`)
        await prisma.$disconnect()
        console.log('Deleting database...')
        // unlinkSync(`./prisma/${schema}.db`)
        // execSync(`del ./prisma/${schema}.db`)
      },
    }
  },
}
