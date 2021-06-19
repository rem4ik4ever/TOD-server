/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.DataTableCreateInput[] = [
  {
    name: 'Alice',
    status: 'draft',
    fileKey: 'something'
  }
]

async function main () {
  console.log('Start seeding ...')
  for (const u of userData) {
    const user = await prisma.dataTable.create({
      data: u
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect()
  })
