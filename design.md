# Design & Interaction Architecture (`design.md`)

> **Scope**: Structural layout, navigation flow, component contracts, and information architecture. (CSS and visual styling are intentionally separated for subsequent design phases).

---

## 1. Interaction Hierarchy & Information Architecture

The website uses a **3-tier progressive disclosure model** with uniform data shapes across both public consumption and the Supabase Admin editor.

```
Landing Page (Hero, Featured Flagships, Timeline Stream, Standard Footer)
   │
   ├─► Click "View All Projects" / Section Action ──► Level 1: "View More" Index Gallery
   │                                                        │
   └─► Direct Click on Featured Project Card ───────────────┼──► Level 2: Detail Page
                                                            │    (Deep Architecture, Metrics,
                                                            │     Screenshots, Live/Repo Links)
                                                            ▼
                              Admin Panel (Protected by Supabase GitHub OAuth)
                              (Uniform Editor Form matching Level 2 schema)
```

---

## 2. Page & Layout Breakdown

### Level 0: The Landing Page

Designed as a scannable executive summary for recruiters, hiring managers, and engineers.

1. **Hero Banner Introduction**:
   - **Identity**: Name (`Vincent Yuann`), avatar, primary title (`Software & AI Engineer`).
   - **Value Proposition**: 1-2 sentence high-impact statement on distributed systems and applied AI.
   - **Quick Proof-Points**: 3 key metric highlights (e.g. `<30ms WebSocket sync`, `Dual-LLM RAG pipeline`, `3+ Production Systems`).
   - **Primary Action Row**:
     - Quick Spotlight Search button (`⌘K` / `Ctrl+K`).
     - Availability pill (`Available for Full-Stack & Applied AI Roles`).
     - Direct profile links (GitHub, LinkedIn, Mail).

2. **Major Display Sections (Scroll Sequence)**:
   - **Section 1: Flagship Systems (Curated Showcase)**:
     - Displays top 3 flagship projects as comprehensive cards.
     - Section action header: `Flagship Systems` + `[View All Projects →]`.
   - **Section 2: Exploratory Stream & DevOps (River Pebbles)**:
     - Lightweight cards / list displaying tools, sandboxes, bots, and DevOps pipelines.
     - Section action header: `Exploratory & Micro-Projects` + `[View All Experiments →]`.
   - **Section 3: Architecture Journey & Experience**:
     - Chronological path highlighting milestones, roles, and open-source contributions.

3. **Standard Website Footer Content**:
   - **Column 1 (Brand & Bio)**: Summary of focus areas, current location, open-to-work status.
   - **Column 2 (Navigation)**: Quick links to `Home`, `All Projects`, `Experiments`, `About`.
   - **Column 3 (Connect)**: Direct clickable links for GitHub (`VincentYuann`), LinkedIn, and Email.
   - **Column 4 (Colophon & Tech Stack)**: Notice of static deployment (React 19 + Vite + GitHub Pages + Supabase).
   - **Bottom Bar**: Copyright notice (`© 2026 Vincent Yuann. All rights reserved.`) + Admin login trigger.

---

### Level 1: "View More" Index View (Uniform Gallery)

When a visitor clicks `[View All Projects →]` or any clickable section heading:
- **Layout**: Header with breadcrumbs (`Home / Projects`), search filter input, and tag selector.
- **Card Grid**: Responsive 2-column or 3-column uniform cards.
- **Uniform Card Structure**:
  - Category badge (e.g. `Full-Stack`, `Distributed Systems`, `Applied AI`)
  - Title & Subtitle
  - 1-paragraph summary
  - Tech stack badges with official brand icons
  - Key performance stat
  - Direct "Read Architecture Deep-Dive →" link (leads to Level 2)

---

### Level 2: Uniform Detail Page

Whether viewing a flagship project, an experimental sandbox, or a DevOps pipeline, the detail view uses a **single uniform schema and visual structure**:

1. **Header Zone**:
   - Breadcrumb navigation: `← Back to Projects`
   - Category tag & date/status indicator
   - Title & Subtitle
   - Action Bar: `[Explore Source Code (GitHub)]` + `[Open Live Demo ↗]`
2. **Media / Screenshot Showcase**:
   - Responsive image gallery powered by Supabase Storage (`portfolio-assets` bucket).
   - Optional caption and architecture diagram callout.
3. **Executive Summary & Problem Statement**:
   - What problem does this system solve?
   - What was the core architectural challenge?
4. **Key Architecture Patterns & Highlights**:
   - Bulleted list of design decisions (e.g., row-level security, optimistic UI cache, WebSocket rooms).
5. **Technical Stack Breakdown**:
   - Array of `<TechBadge />` components with Devicon brand logos.
6. **Benchmark & Metrics Grid**:
   - Up to 4 performance stats (e.g., Latency, Layout Shift, Uptime, Cache Hit Ratio).
7. **Longform Markdown Deep-Dive**:
   - Technical breakdown with code snippets, workflow diagrams, and lessons learned.

---

## 3. Overhead Reduction: Why Uniform Design Matters

By enforcing identical fields for all projects:
1. **Single Public Component**: The public site only needs one `<ProjectDetailView project={project} />` component.
2. **Single Admin Form**: The Supabase admin editor uses one `<ProjectEditForm />` for both flagships and pebbles. Adding a new case study takes 2 minutes.
3. **Predictable Data Contracts**: The TypeScript `interface Project` directly mirrors the Supabase Postgres table schema.

---

## 4. Supabase Integration Architecture

```
┌────────────────────────────────────────────────────────┐
│               Static React Frontend                    │
│            (Deployed on GitHub Pages)                  │
└──────────────────────────┬─────────────────────────────┘
                           │
             Reads Public Data (Anon Key)
                           ▼
┌────────────────────────────────────────────────────────┐
│                 Supabase Cloud Project                 │
│                                                        │
│  ┌────────────────────────┐  ┌──────────────────────┐  │
│  │     Postgres DB        │  │   Storage Buckets    │  │
│  │   (Tables with RLS)    │  │ ('portfolio-assets') │  │
│  │                        │  │                      │  │
│  │  - projects            │  │  - project images    │  │
│  │  - profile_info        │  │  - architecture SVGs │  │
│  └───────────▲────────────┘  └──────────▲───────────┘  │
│              │                          │              │
│       RLS: Write Only            RLS: Upload Only      │
│       for Authenticated          for Authenticated     │
│       Admin (GitHub OAuth)       Admin (GitHub OAuth)  │
│              │                          │              │
└──────────────┴──────────────────────────┴──────────────┘
                           ▲
             Admin Mutations (OAuth Session)
                           │
┌──────────────────────────┴─────────────────────────────┐
│                 Admin Editor Modal                     │
│         (Protected by Supabase Auth Session)           │
└────────────────────────────────────────────────────────┘
```

### Security & Access Control (Zero Exposure)
- **Public Visitors**:
  - Role: `anon`
  - Permission: `SELECT` only on rows where `is_published = true`.
  - No mutation endpoints exposed.
- **Admin (Vincent Yuann)**:
  - Role: `authenticated` via GitHub OAuth.
  - Policy: `(auth.jwt() ->> 'email') = 'vincentyuann@gmail.com'`
  - Full permissions (`INSERT`, `UPDATE`, `DELETE`, storage `upload/upsert`).
- **Keys**:
  - `SUPABASE_URL` and `SUPABASE_ANON_KEY` are embedded in the client build (safe by design under Postgres RLS).
  - `SERVICE_ROLE_KEY` is **never** committed, bundled, or exposed.
