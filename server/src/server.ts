import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const app = fastify()
const prisma = new PrismaClient()

app.get('/users', async () => {
  const users = await prisma.user.findMany()

  return users
})

app.listen({
  host: '0.0.0.0',
  port: 4000
}).then(() => {
  console.log('HTPP server running on http://localhost:4000')
})
