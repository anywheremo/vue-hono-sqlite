import { sql } from "drizzle-orm"
import {sqliteTable,text,integer}from "drizzle-orm/sqlite-core"
export const users=sqliteTable('user',{
  id:integer('id').primaryKey({autoIncrement:true}),
  name:text('name').notNull(),
  email:text('email').notNull().unique(),
  createdAt:text('created_at').default(sql`CURRENT_TIMESTAMP`)
})
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
