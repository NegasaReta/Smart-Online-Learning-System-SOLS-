// apps/api/src/db/schema/teachers.ts
import { pgTable, integer, varchar, pgEnum } from 'drizzle-orm/pg-core';
import { users } from './users';

export const approvalStatusEnum = pgEnum('approval_status', ['Pending', 'Approved', 'Rejected']);

export const teacherProfiles = pgTable('teacher_profiles', {
    id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
    userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull().unique(),
    subjectSpecialization: varchar('subject_specialization', { length: 255 }),
    status: approvalStatusEnum('status').default('Pending').notNull(),
});