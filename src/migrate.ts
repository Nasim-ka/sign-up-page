import "dotenv/config";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import { db } from "./schema";

await migrate(db, { migrationsFolder: "./migrations" });

console.log("Migration completed.");
