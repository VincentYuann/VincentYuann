-- ==============================================================================
-- Portfolio Supabase Database Schema & RLS Policies
-- Execute this script in your Supabase SQL Editor:
-- Dashboard > SQL Editor > New query > Paste & Run
-- ==============================================================================

-- 1. Profile Table (Intro / Hero / Seal Card / Contact Links)
CREATE TABLE IF NOT EXISTS public.profile (
  id INT PRIMARY KEY DEFAULT 1,
  name TEXT DEFAULT 'Vincent Yuan',
  headline TEXT DEFAULT 'Crafting thoughtful digital experiences with algorithmic clarity & Japanese wabi-sabi harmony.',
  tagline TEXT DEFAULT 'Specializing in robust distributed web architecture, local & cloud generative AI systems, and serene user interfaces governed by the timeless cadence of intentional space.',
  email TEXT DEFAULT 'vincentyuan1020@gmail.com',
  github TEXT DEFAULT 'https://github.com/VincentYuann',
  linkedin TEXT DEFAULT 'https://linkedin.com',
  role TEXT DEFAULT 'Software & Generative AI Engineer',
  capability_pillars JSONB DEFAULT '[
    {"label": "SYSTEMS", "items": "Rust · Docker · Linux"},
    {"label": "AI & RUNTIME", "items": "PyTorch · llama.cpp · Local LLMs"},
    {"label": "FULL-STACK", "items": "Next.js · TypeScript · PostgreSQL"}
  ]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed initial profile row if empty
INSERT INTO public.profile (id, name, email)
VALUES (1, 'Vincent Yuan', 'vincentyuan1020@gmail.com')
ON CONFLICT (id) DO NOTHING;

-- 2. Philosophy Pillars Table (Up to 3 cards on homepage)
CREATE TABLE IF NOT EXISTS public.philosophy_pillars (
  position INT PRIMARY KEY,
  kanji TEXT NOT NULL DEFAULT '',
  romaji TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  tag TEXT DEFAULT '',
  description TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed initial philosophy pillars
INSERT INTO public.philosophy_pillars (position, kanji, romaji, title, tag, description)
VALUES 
  (1, '間', 'Ma', 'Intentional Space', 'Uncluttered System Boundaries', 'Empty space is not an absence of features; it is an active structural element. Clean microservices, unencumbered visual layouts, and minimal latency let user attention focus without fatigue.'),
  (2, '侘寂', 'Wabi-Sabi', 'Authenticity & Patina', 'Graceful Degradation & Warmth', 'Embracing real-world imperfection with honesty. Tactile finishes, organic ink wash motifs, resilient error-recovery strategies, and software that ages gracefully with its users over time.'),
  (3, '職人', 'Shokunin', 'Obsessive Craftsmanship', 'Deep Code Integrity & Care', 'The craftsman''s obligation to perform one''s best work for the social welfare. Rigorous test coverage, deterministic API contracts, and fine joinery in every line of TypeScript and Python.')
ON CONFLICT (position) DO NOTHING;

-- 3. Experience Table
CREATE TABLE IF NOT EXISTS public.experience (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT DEFAULT '',
  start_date TEXT DEFAULT '',
  end_date TEXT DEFAULT '',
  description TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT experience_title_company_unique UNIQUE (title, company)
);

-- 4. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  title TEXT PRIMARY KEY,
  id TEXT,
  kanji TEXT DEFAULT '案',
  category TEXT DEFAULT 'Distributed Systems',
  badge TEXT DEFAULT 'ENGINEERING ARCHIVE',
  subtitle TEXT DEFAULT '',
  summary TEXT DEFAULT '',
  description TEXT DEFAULT '',
  image TEXT DEFAULT './images/sumi-os-workspace.jpg',
  tech_stacks TEXT[] DEFAULT ARRAY[]::TEXT[],
  sections JSONB DEFAULT '[]'::jsonb,
  metrics JSONB DEFAULT '[]'::jsonb,
  github_link TEXT DEFAULT '',
  live_link TEXT DEFAULT '',
  overview TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Resume LaTeX Table (stores live .tex source for in-browser editor)
CREATE TABLE IF NOT EXISTS public.resume_latex (
  id INT PRIMARY KEY DEFAULT 1,
  content TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed initial resume LaTeX
INSERT INTO public.resume_latex (id, content)
VALUES (1, '% Vincent Yuan Resume LaTeX Source')
ON CONFLICT (id) DO NOTHING;

-- 6. Contact Messages Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  topic TEXT DEFAULT 'General Inquiry',
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- Enable Row Level Security (RLS) on all tables
-- ==============================================================================

ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.philosophy_pillars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_latex ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- Policies: Public Read Access (Visitors)
-- ==============================================================================

CREATE POLICY "Allow public read on profile"
  ON public.profile FOR SELECT
  USING (true);

CREATE POLICY "Allow public read on philosophy_pillars"
  ON public.philosophy_pillars FOR SELECT
  USING (true);

CREATE POLICY "Allow public read on experience"
  ON public.experience FOR SELECT
  USING (true);

CREATE POLICY "Allow public read on projects"
  ON public.projects FOR SELECT
  USING (true);

CREATE POLICY "Allow public read on resume_latex"
  ON public.resume_latex FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert on contact_messages"
  ON public.contact_messages FOR INSERT
  WITH CHECK (true);

-- ==============================================================================
-- Policies: Authenticated Admin Full Write Access
-- ==============================================================================

CREATE POLICY "Allow authenticated admin full access on profile"
  ON public.profile FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated admin full access on philosophy_pillars"
  ON public.philosophy_pillars FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated admin full access on experience"
  ON public.experience FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated admin full access on projects"
  ON public.projects FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated admin full access on resume_latex"
  ON public.resume_latex FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated admin read on contact_messages"
  ON public.contact_messages FOR SELECT
  TO authenticated
  USING (true);
