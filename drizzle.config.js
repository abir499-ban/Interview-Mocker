/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:roxIG1J3DUlE@ep-delicate-pine-a1w016x3.ap-southeast-1.aws.neon.tech/Interview%20Mocker?sslmode=require',
    }
  };