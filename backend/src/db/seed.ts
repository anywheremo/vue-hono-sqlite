import { db } from "./index.js"
import { users } from "./schema.js"

const main=async()=>{
  await db.insert(users).values([
    {name:'name1',email:"name1@example.com"},
    {name:'name2',email:"name2@example.com"}
  ])
}
main().catch(err=>{
  console.log(err);
  process.exit(1);
})