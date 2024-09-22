import { db } from "./utils/db";

/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://accounts:wE5vTzpy0skQ@ep-delicate-pine-a1w016x3.ap-southeast-1.aws.neon.tech/Interview%20Mocker?sslmode=require',
  }
};
