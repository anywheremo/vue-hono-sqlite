import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { createUser, getUsers } from './handlers/users.js'

const app = new Hono().basePath('/api')
const frontendUrl=process.env.FRONTEND_URL||"http://localhost:5173"
app.use('*',cors({
  origin:frontendUrl,
  allowMethods:["GET","POST","PUT","DELETE","OPTION"],
  credentials:true
}))
const routes=app
.get('/users',getUsers)
.post('/users',createUser)
.get('/', (c) => {
  return c.text('Hello Hono!')
})
const port=Number(process.env.PORT)||3000
serve({
  fetch: app.fetch,
  port: port
}, (info) => {
  console.log(`Server is running on http://localhost:${port}`)
  console.log(`🔒 CORS allowed origin: ${frontendUrl}`)
})
export type AppType = typeof routes