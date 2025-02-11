import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          created_at: string;
          email: string;
          username: string;
          date_of_birth: string;
          weight: number;
          height: number;
          description: string | null;
          role: 'athlete' | 'trainer' | 'nutritionist';
        };
        Insert: {
          id?: string;
          created_at?: string;
          email: string;
          username: string;
          date_of_birth: string;
          weight: number;
          height: number;
          description?: string | null;
          role?: 'athlete' | 'trainer' | 'nutritionist';
        };
        Update: {
          id?: string;
          created_at?: string;
          email?: string;
          username?: string;
          date_of_birth?: string;
          weight?: number;
          height?: number;
          description?: string | null;
          role?: 'athlete' | 'trainer' | 'nutritionist';
        };
      };
      professionals: {
        Row: {
          id: string;
          user_id: string;
          verified: boolean;
          likes_count: number;
          max_athletes: number;
          current_athletes: number;
          professional_type: 'trainer' | 'nutritionist';
        };
        Insert: {
          id?: string;
          user_id: string;
          verified?: boolean;
          likes_count?: number;
          max_athletes?: number;
          current_athletes?: number;
          professional_type: 'trainer' | 'nutritionist';
        };
        Update: {
          id?: string;
          user_id?: string;
          verified?: boolean;
          likes_count?: number;
          max_athletes?: number;
          current_athletes?: number;
          professional_type?: 'trainer' | 'nutritionist';
        };
      };
      posts: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          content: string;
          image_url: string | null;
          author_id: string;
          likes_count: number;
          comments_count: number;
          is_private: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          content: string;
          image_url?: string | null;
          author_id: string;
          likes_count?: number;
          comments_count?: number;
          is_private?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          content?: string;
          image_url?: string | null;
          author_id?: string;
          likes_count?: number;
          comments_count?: number;
          is_private?: boolean;
        };
      };
      comments: {
        Row: {
          id: string;
          created_at: string;
          content: string;
          post_id: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          content: string;
          post_id: string;
          user_id: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          content?: string;
          post_id?: string;
          user_id?: string;
        };
      };
      professional_athlete_relations: {
        Row: {
          id: string;
          professional_id: string;
          athlete_id: string;
          created_at: string;
          status: 'pending' | 'accepted' | 'rejected';
        };
        Insert: {
          id?: string;
          professional_id: string;
          athlete_id: string;
          created_at?: string;
          status?: 'pending' | 'accepted' | 'rejected';
        };
        Update: {
          id?: string;
          professional_id?: string;
          athlete_id?: string;
          created_at?: string;
          status?: 'pending' | 'accepted' | 'rejected';
        };
      };
    };
  };
}; 