import { pgTable, text, timestamp, uuid, decimal, boolean, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  clerkId: text('clerk_id').notNull().unique(),
  email: text('email').notNull().unique(),
  username: text('username').notNull().unique(),
  dateOfBirth: timestamp('date_of_birth'),
  weight: decimal('weight', { precision: 5, scale: 2 }),
  height: decimal('height', { precision: 5, scale: 2 }),
  description: text('description'),
  role: text('role', { enum: ['athlete', 'trainer', 'nutritionist'] }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const professionals = pgTable('professionals', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  professionalType: text('professional_type', { enum: ['trainer', 'nutritionist'] }).notNull(),
  verified: boolean('verified').default(false),
  likesCount: integer('likes_count').default(0),
  maxAthletes: integer('max_athletes').default(10),
  currentAthletes: integer('current_athletes').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const posts = pgTable('posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  imageUrl: text('image_url'),
  authorId: uuid('author_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  likesCount: integer('likes_count').default(0),
  commentsCount: integer('comments_count').default(0),
  isPrivate: boolean('is_private').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const comments = pgTable('comments', {
  id: uuid('id').defaultRandom().primaryKey(),
  content: text('content').notNull(),
  postId: uuid('post_id').references(() => posts.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const professionalAthleteRelations = pgTable('professional_athlete_relations', {
  id: uuid('id').defaultRandom().primaryKey(),
  professionalId: uuid('professional_id').references(() => professionals.id, { onDelete: 'cascade' }).notNull(),
  athleteId: uuid('athlete_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  status: text('status', { enum: ['pending', 'accepted', 'rejected'] }).default('pending'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}); 