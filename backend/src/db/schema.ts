import { sql } from "drizzle-orm"
import {sqliteTable,text,integer}from "drizzle-orm/sqlite-core"
import z from "zod";
export const users=sqliteTable('users',{
  id:integer('id').primaryKey({autoIncrement:true}),
  name:text('name').notNull(),
  email:text('email').notNull().unique(),
  createdAt:text('created_at').default(sql`CURRENT_TIMESTAMP`)
})
export const createUserSchema = z.object({
  name: z.string().min(1, "名前は必須です" ),
  email: z.email("不正なメールアドレスです。")
})
export const updateUserSchema = createUserSchema.partial();
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;