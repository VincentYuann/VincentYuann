import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://pqowefuwzxcrfzmnubvo.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxb3dlZnV3enhjcmZ6bW51YnZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk2NjMyNTcsImV4cCI6MjEwNTIzOTI1N30.k2eQfW7tPSL-cWJq1GRH8qYe7CLrh3HmXgVOKY18FiY';

const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface DbProject {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  highlights: string[];
  stats: { label: string; value: string }[];
  tags: { name: string; icon?: string }[];
  stone_accent: string;
  github_url?: string;
  live_url?: string;
  image_url?: string;
  details_markdown?: string;
  is_flagship: boolean;
  is_published: boolean;
  order_index: number;
}

export interface DbProfile {
  id: string;
  name: string;
  role: string;
  status: string;
  email: string;
  github: string;
  linkedin: string;
  about?: string;
  tagline?: string;
  location?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: 'unread' | 'read' | 'archived';
  created_at: string;
}

