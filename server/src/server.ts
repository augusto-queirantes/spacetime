import fastify from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'

const app = fastify()

app.register(cors, {
  origin: true
})
app.register(memoriesRoutes)

app.listen({
  host: '0.0.0.0',
  port: 3333
}).then(() => {
  console.log('HTPP server running on http://localhost:3333')
})
