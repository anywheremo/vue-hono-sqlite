
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as dotenv from 'dotenv'
import * as schema from './schema.js'
dotenv.config()
const sqlite=new Database(process.env.DaTABASE_URL||'local.db')
export const db=drizzle(sqlite,{schema})
