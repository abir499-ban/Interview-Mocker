import { serial, varchar, text } from 'drizzle-orm/pg-core'; // Importing from PostgreSQL core
import { pgTable } from 'drizzle-orm/pg-core'; // Ensure this is correct for PostgreSQL

export const MockInterview = pgTable('MockInterview', {
    id: serial('id').primaryKey(),
    jsonmockResp: text('jsonmockResp').notNull(),
    jobPosition: varchar('jobPosition').notNull(),
    jobDesc: varchar('jobDesc').notNull(),
    jobExp: varchar('jobExp').notNull(),
    createdAt: varchar('createdAt').notNull(),
    createdBy: varchar('createdBy'), // Nullable
    mockId: varchar('mockId').notNull(),
});

