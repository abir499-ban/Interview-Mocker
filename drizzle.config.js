import { db } from "./utils/db";
import dotenv from 'dotenv'

dotenv.config();
/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEON_DATABASE_URL
  }
};
