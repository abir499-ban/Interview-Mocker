import { pgTable, serial, varchar, jsonb } from 'drizzle-orm/pg-core'; // Importing required types from PostgreSQL core

export const MockInterview = pgTable('MockInterview', {
    id: serial('id').primaryKey(),               // Primary key with auto-incrementing id
    jsonmockResp: jsonb('jsonmockResp').notNull(), // Field for storing an array of objects as JSONB
    jobPosition: varchar('jobPosition').notNull(),  // Job position field
    jobDesc: varchar('jobDesc').notNull(),          // Job description field
    jobExp: varchar('jobExp').notNull(),            // Job experience field
    createdAt: varchar('createdAt').notNull(),      // Creation timestamp
    createdBy: varchar('createdBy'),                 // Nullable field for creator's ID or email
    mockId: varchar('mockId').notNull(),            // ID for the mock interview
});
