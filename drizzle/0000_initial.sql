CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS "users" (
    "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    "clerk_id" text NOT NULL UNIQUE,
    "email" text NOT NULL UNIQUE,
    "username" text NOT NULL UNIQUE,
    "date_of_birth" timestamp,
    "weight" decimal(5,2),
    "height" decimal(5,2),
    "description" text,
    "role" text NOT NULL CHECK (role IN ('athlete', 'trainer', 'nutritionist')),
    "created_at" timestamp NOT NULL DEFAULT now()
);

-- Create professionals table
CREATE TABLE IF NOT EXISTS "professionals" (
    "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    "user_id" uuid NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE,
    "professional_type" text NOT NULL CHECK (professional_type IN ('trainer', 'nutritionist')),
    "verified" boolean DEFAULT false,
    "likes_count" integer DEFAULT 0,
    "max_athletes" integer DEFAULT 10,
    "current_athletes" integer DEFAULT 0,
    "created_at" timestamp NOT NULL DEFAULT now()
);

-- Create posts table
CREATE TABLE IF NOT EXISTS "posts" (
    "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    "title" text NOT NULL,
    "content" text NOT NULL,
    "image_url" text,
    "author_id" uuid NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE,
    "likes_count" integer DEFAULT 0,
    "comments_count" integer DEFAULT 0,
    "is_private" boolean DEFAULT false,
    "created_at" timestamp NOT NULL DEFAULT now()
);

-- Create comments table
CREATE TABLE IF NOT EXISTS "comments" (
    "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    "content" text NOT NULL,
    "post_id" uuid NOT NULL REFERENCES "posts" ("id") ON DELETE CASCADE,
    "user_id" uuid NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE,
    "created_at" timestamp NOT NULL DEFAULT now()
);

-- Create professional_athlete_relations table
CREATE TABLE IF NOT EXISTS "professional_athlete_relations" (
    "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    "professional_id" uuid NOT NULL REFERENCES "professionals" ("id") ON DELETE CASCADE,
    "athlete_id" uuid NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE,
    "status" text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    "created_at" timestamp NOT NULL DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_professionals_user_id ON professionals(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_relations_professional_id ON professional_athlete_relations(professional_id);
CREATE INDEX IF NOT EXISTS idx_relations_athlete_id ON professional_athlete_relations(athlete_id); 