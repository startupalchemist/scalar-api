import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { contractorCoreSchema } from "./contractor-core-schema";

export function createPgPool(connectionString = process.env.DATABASE_URL) {
  if (!connectionString) {
    throw new Error("DATABASE_URL must be set.");
  }

  return new pg.Pool({
    connectionString,
  });
}

export function createContractorCoreDb(pool: pg.Pool) {
  return drizzle(pool, { schema: contractorCoreSchema });
}
