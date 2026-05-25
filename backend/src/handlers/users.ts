import { Context } from "hono";
import {db} from "../db/index.js"
import { users } from "../db/schema.js";

export const getUsers=async(c:Context)=>{
  try {
    const allUsers=await db.select().from(users)
    return c.json(allUsers)
  } catch (error) {
    return c.json({success:false,error:"failed to fetch users"},500)
  }
}
export const createUser=async(c:Context)=>{
  try {
    const body=await c.req.json()
    const [NewUser]=await db.insert(users).values({
      name:body.name,
      email:body.email
    }).returning()
    return c.json({success:true,data:NewUser},201)
  } catch (error) {
    return c.json({success:false,error:"failed to create users"},400)
  }
}