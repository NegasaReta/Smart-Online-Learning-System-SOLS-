// apps/api/src/db/schema/users.ts
import { pgTable, integer, varchar, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['Student', 'Parent', 'Teacher', 'Admin']);
export const languageEnum = pgEnum('language', ['Afaan Oromo', 'Amharic', 'English']);

export const users = pgTable('users', {
    id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
    username: varchar('username', { length: 50 }).unique().notNull(),
    email: varchar('email', { length: 100 }).unique().notNull(),
    password: text('password').notNull(),
    role: roleEnum('role').notNull(),
    languagePreference: languageEnum('language_preference').default('English'),
    createdAt: timestamp('created_at').defaultNow(),
});