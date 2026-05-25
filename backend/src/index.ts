import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { zValidator } from '@hono/zod-validator'
import { db } from './db/index.js'
import { createUserSchema,updateUserSchema,users} from './db/schema.js'
import { eq } from 'drizzle-orm'
const app = new Hono().basePath('/api')
const frontendUrl=process.env.FRONTEND_URL||"http://localhost:5173"
//cors設定
app.use('*',cors({
  origin:frontendUrl,
  allowMethods:["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  credentials:true
}))
const routes=app
//users
.get('/users',async(c)=>{
  try {
    const allUsers=await db.select().from(users)
    return c.json(allUsers)
  } catch (error) {
    return c.json({success:false,error:"failed to fetch users"},500)
  }
})
.get('/users/:id', async (c) => {
  try {
    const id = Number(c.req.param('id'))
    if (isNaN(id)) {
      return c.json({ success: false, error: "Invalid ID format" }, 400)
    }
    const [user] = await db.select().from(users).where(eq(users.id, id))
    if (!user) {
      return c.json({ success: false, error: "User not found" }, 404)
    }
    return c.json({ success: true, data: user })
  } catch (error) {
    console.error('Fetch user by id error:', error)
    return c.json({ success: false, error: "failed to fetch user" }, 500)
  }
})
.post('/users',zValidator('json',createUserSchema), async(c)=>{
  const validate=c.req.valid('json')
  const [newUser]=await db.insert(users).values({
      name:validate.name,
      email:validate.email
    }).returning()
  return c.json({success:true,data:newUser},201)
})

//other
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