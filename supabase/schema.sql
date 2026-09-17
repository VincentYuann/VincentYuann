-- ====================================================================
-- SUPABASE SCHEMA & SECURITY MIGRATION FOR VINCENT YUANN PORTFOLIO
-- Project Ref: pqowefuwzxcrfzmnubvo
-- Admin: Managed dynamically via public.admin_users + is_admin() RPC
-- ====================================================================

-- 1. Create Admin Users Whitelist Table (No admin emails hardcoded on client)
create table if not exists public.admin_users (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  created_at timestamptz default now()
);

alter table public.admin_users enable row level security;

-- 2. Security Definer Helper Function: is_admin()
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

-- 3. Create Projects Table (Unified Schema for Flagships & Pebbles)
create table if not exists public.projects (
  id text primary key,
  title text not null,
  subtitle text not null,
  category text not null,
  description text not null,
  highlights text[] default array[]::text[],
  stats jsonb default '[]'::jsonb,
  tags jsonb default '[]'::jsonb,
  stone_accent text default '#3894B3',
  github_url text,
  live_url text,
  image_url text,
  details_markdown text,
  is_flagship boolean default false,
  is_published boolean default true,
  order_index int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4. Create Profile Info Table
create table if not exists public.profile_info (
  id text primary key,
  name text not null,
  role text not null,
  status text not null,
  email text not null,
  github text not null,
  linkedin text not null,
  about text,
  tagline text,
  location text,
  updated_at timestamptz default now()
);

-- 5. Enable Row Level Security (RLS)
alter table public.projects enable row level security;
alter table public.profile_info enable row level security;

-- 6. Clean and Recreate Policies (Idempotent)
drop policy if exists "Admins can view admin_users" on public.admin_users;
drop policy if exists "Allow public read access to published projects" on public.projects;
drop policy if exists "Admin can insert projects" on public.projects;
drop policy if exists "Admin can update projects" on public.projects;
drop policy if exists "Admin can delete projects" on public.projects;
drop policy if exists "Allow public read access to profile info" on public.profile_info;
drop policy if exists "Admin can insert profile info" on public.profile_info;
drop policy if exists "Admin can update profile info" on public.profile_info;

-- Policy on admin_users
create policy "Admins can view admin_users"
  on public.admin_users for select
  to authenticated
  using ( public.is_admin() );

-- Policies on projects
create policy "Allow public read access to published projects"
  on public.projects for select
  to anon, authenticated
  using ( is_published = true or public.is_admin() );

create policy "Admin can insert projects"
  on public.projects for insert
  to authenticated
  with check ( public.is_admin() );

create policy "Admin can update projects"
  on public.projects for update
  to authenticated
  using ( public.is_admin() )
  with check ( public.is_admin() );

create policy "Admin can delete projects"
  on public.projects for delete
  to authenticated
  using ( public.is_admin() );

-- Policies on profile_info
create policy "Allow public read access to profile info"
  on public.profile_info for select
  to anon, authenticated
  using ( true );

create policy "Admin can insert profile info"
  on public.profile_info for insert
  to authenticated
  with check ( public.is_admin() );

create policy "Admin can update profile info"
  on public.profile_info for update
  to authenticated
  using ( public.is_admin() )
  with check ( public.is_admin() );

-- 7. Setup Storage Bucket for Media and Screenshots
insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', true)
on conflict (id) do nothing;

drop policy if exists "Public can view portfolio assets" on storage.objects;
drop policy if exists "Admin can upload portfolio assets" on storage.objects;
drop policy if exists "Admin can update/replace portfolio assets" on storage.objects;
drop policy if exists "Admin can delete portfolio assets" on storage.objects;

create policy "Public can view portfolio assets"
  on storage.objects for select
  to anon, authenticated
  using ( bucket_id = 'portfolio-assets' );

create policy "Admin can upload portfolio assets"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'portfolio-assets'
    and public.is_admin()
  );

create policy "Admin can update/replace portfolio assets"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'portfolio-assets'
    and public.is_admin()
  );

create policy "Admin can delete portfolio assets"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'portfolio-assets'
    and public.is_admin()
  );

-- 8. Seed Initial Admin (Securely stored in database, never sent to client)
insert into public.admin_users (email)
values 
  ('vincentyuann@gmail.com'),
  ('vincentyuan1020@gmail.com')
on conflict (email) do nothing;

-- 9. Seed Initial Projects Data
insert into public.projects (id, title, subtitle, category, description, highlights, stats, tags, stone_accent, github_url, live_url, is_flagship, is_published, order_index)
values 
(
  'anim-y',
  'AnimY',
  'Anime tracking & exploration platform with OAuth',
  'Full-Stack Web App',
  'A responsive anime discovery web app featuring real-time seasonal browsing, custom watchlists, OAuth authentication, and zero cumulative layout shift (CLS).',
  array[
    'Custom normalization service layer bridging modern Tenrai schema with MAL compatibility',
    'Optimistic UI updates and cache invalidation via TanStack Query v5',
    'Supabase Row-Level Security ensuring strict per-user watchlist data isolation'
  ],
  '[{"label":"Layout Shift","value":"0.00 CLS"},{"label":"Data Source","value":"Tenrai API"},{"label":"Security","value":"PostgreSQL RLS"}]'::jsonb,
  '[{"name":"React 19","icon":"react"},{"name":"Vite","icon":"vitejs"},{"name":"TanStack Query v5","icon":"reactquery"},{"name":"Supabase RLS","icon":"supabase"},{"name":"Express","icon":"express"},{"name":"TypeScript","icon":"typescript"}]'::jsonb,
  '#588A75',
  'https://github.com/VincentYuann/AnimY',
  'https://animy.dev',
  true,
  true,
  1
),
(
  'food-finder',
  'FoodFinder',
  'Real-time collaborative restaurant voting & discovery',
  'Real-Time Distributed System',
  'A synchronized decision platform solving social dining deadlocks. Features real-time room state sync via WebSockets, PostgreSQL relational schema via Prisma 7, and automated Dockerized CI/CD.',
  array[
    'Sub-30ms bidirectional WebSocket synchronization using room-isolated events',
    'Strict relational schema migrations with Prisma 7 and ACID transaction boundaries',
    'Automated Jenkins CI pipeline running multi-stage Docker builds and automated tests'
  ],
  '[{"label":"Sync Latency","value":"<30ms"},{"label":"Protocol","value":"WebSocket Rooms"},{"label":"Pipeline","value":"Docker + Jenkins"}]'::jsonb,
  '[{"name":"React 19","icon":"react"},{"name":"Socket.IO","icon":"socketio"},{"name":"PostgreSQL","icon":"postgresql"},{"name":"Prisma 7","icon":"prisma"},{"name":"Docker","icon":"docker"},{"name":"Jenkins","icon":"jenkins"}]'::jsonb,
  '#3894B3',
  'https://github.com/VincentYuann/FoodFinder',
  null,
  true,
  true,
  2
),
(
  'modular-rag',
  'Modular RAG AI',
  'Production LLM lead qualification & vector search',
  'AI / LLM Architecture',
  'A production-ready RAG pipeline engineered for unstructured company document ingestion, dual-agent lead qualification, and low-latency semantic search over enterprise vector embeddings.',
  array[
    'Dual LLM agent orchestration balancing fast extraction with complex reasoning',
    'Hybrid sparse-dense retrieval across Qdrant vector database collections',
    'Fully containerized microservice architecture with sub-second retrieval guarantees'
  ],
  '[{"label":"Engine","value":"Qdrant HNSW"},{"label":"LLM Stack","value":"Dual-Gemini"},{"label":"Orchestration","value":"LlamaIndex"}]'::jsonb,
  '[{"name":"FastAPI","icon":"fastapi"},{"name":"Python","icon":"python"},{"name":"Google Gemini","icon":"google"},{"name":"Qdrant","icon":"qdrant"},{"name":"Docker","icon":"docker"}]'::jsonb,
  '#A35D43',
  'https://github.com/VincentYuann/Modular-RAG-AI',
  null,
  true,
  true,
  3
),
(
  'smart-money-concept',
  'SmartMoneyConcept',
  'Algorithmic candle analysis & liquidity detection',
  'Quant / Financial Script',
  'Algorithmic financial candle analysis, order blocks, and liquidity sweep detection.',
  array['Automated market structure mapping', 'Order block validation engine'],
  '[]'::jsonb,
  '[{"name":"Python","icon":"python"}]'::jsonb,
  '#588A75',
  'https://github.com/VincentYuann/SmartMoneyConcept',
  null,
  false,
  true,
  4
),
(
  'jenkins-devops',
  'Jenkins DevOps Suite',
  'Multi-stage Docker CI/CD automation',
  'DevOps & Tooling',
  'Declarative Jenkins pipeline automating containerized builds, test suites, and image registry pushes.',
  array['Automated test gating', 'Zero-downtime container staging'],
  '[]'::jsonb,
  '[{"name":"Jenkins","icon":"jenkins"},{"name":"Docker","icon":"docker"}]'::jsonb,
  '#3894B3',
  'https://github.com/VincentYuann/jenkins-pipeline',
  null,
  false,
  true,
  5
),
(
  'flask-sandboxes',
  'Flask REST & Sandboxes',
  'Architectural practice covering REST patterns',
  'Backend Exploration',
  'Architectural practice repository covering REST API patterns, state design, and token authentication.',
  array['RESTful endpoint patterns', 'JWT session verification'],
  '[]'::jsonb,
  '[{"name":"Flask","icon":"flask"},{"name":"Python","icon":"python"}]'::jsonb,
  '#A35D43',
  'https://github.com/VincentYuann/flask-sandboxes',
  null,
  false,
  true,
  6
)
on conflict (id) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  category = excluded.category,
  description = excluded.description,
  highlights = excluded.highlights,
  stats = excluded.stats,
  tags = excluded.tags,
  stone_accent = excluded.stone_accent,
  github_url = excluded.github_url,
  live_url = excluded.live_url,
  is_flagship = excluded.is_flagship,
  is_published = excluded.is_published,
  order_index = excluded.order_index;

-- 10. Seed Initial Profile Data
insert into public.profile_info (id, name, role, status, email, github, linkedin)
values (
  'vincent',
  'Vincent Yuann',
  'Software & AI Engineer',
  'Open to Full-Stack & AI Roles',
  'vincentyuann@gmail.com',
  'https://github.com/VincentYuann',
  'https://linkedin.com/in/vincentyuann'
)
on conflict (id) do update set
  name = excluded.name,
  role = excluded.role,
  status = excluded.status,
  email = excluded.email,
  github = excluded.github,
  linkedin = excluded.linkedin;

-- 11. Create Contact Messages Table (Public Submission & Admin Protected)
create table if not exists public.contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  status text default 'unread',
  created_at timestamptz default now()
);

alter table public.contact_messages enable row level security;

drop policy if exists "Anyone can submit a contact message" on public.contact_messages;
drop policy if exists "Admins can view contact messages" on public.contact_messages;
drop policy if exists "Admins can update contact messages" on public.contact_messages;
drop policy if exists "Admins can delete contact messages" on public.contact_messages;

create policy "Anyone can submit a contact message"
  on public.contact_messages for insert
  to anon, authenticated
  with check ( true );

create policy "Admins can view contact messages"
  on public.contact_messages for select
  to authenticated
  using ( public.is_admin() );

create policy "Admins can update contact messages"
  on public.contact_messages for update
  to authenticated
  using ( public.is_admin() )
  with check ( public.is_admin() );

create policy "Admins can delete contact messages"
  on public.contact_messages for delete
  to authenticated
  using ( public.is_admin() );

grant select, insert, update, delete on table public.contact_messages to anon, authenticated;

-- 12. Create Contact Rate Limits Table & Function
create table if not exists public.contact_rate_limits (
  ip text primary key,
  count int default 1,
  window_start timestamptz default now(),
  last_request timestamptz default now()
);

alter table public.contact_rate_limits enable row level security;

drop policy if exists "Deny public direct access to rate limits" on public.contact_rate_limits;
create policy "Deny public direct access to rate limits"
  on public.contact_rate_limits
  for all
  to public
  using ( false );

create or replace function public.check_contact_rate_limit(client_ip text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  rec record;
  now_ts timestamptz := now();
  window_seconds int := 3600; -- 1 hour
  max_requests int := 3;
begin
  if client_ip is null or client_ip = '' then
    client_ip := 'unknown';
  end if;

  select * into rec from public.contact_rate_limits where ip = client_ip;

  if not found then
    insert into public.contact_rate_limits (ip, count, window_start, last_request)
    values (client_ip, 1, now_ts, now_ts);
    return true;
  end if;

  if (extract(epoch from (now_ts - rec.window_start)) > window_seconds) then
    update public.contact_rate_limits
    set count = 1, window_start = now_ts, last_request = now_ts
    where ip = client_ip;
    return true;
  end if;

  if rec.count >= max_requests then
    update public.contact_rate_limits
    set last_request = now_ts
    where ip = client_ip;
    return false;
  end if;

  update public.contact_rate_limits
  set count = rec.count + 1, last_request = now_ts
  where ip = client_ip;
  return true;
end;
$$;

grant execute on function public.check_contact_rate_limit(text) to anon, authenticated, service_role;


