import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { remember } from "@epic-web/remember";
import { env } from "../config/env.ts";
import * as schema from "./schema.ts";

const createPool = () => {
  return new Pool({
    connectionString: env.DATABASE_URI,
  });
};

let client;

if (env.NODE_ENV === "production") {
  client = createPool();
} else {
  client = remember("dbPool", () => createPool());
}

export const db = drizzle(client, { schema });
export default db;
