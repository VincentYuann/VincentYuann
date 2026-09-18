# Design & Interaction Architecture (`design.md`)

> **Ground Truth Reference**: Layout hierarchy, navigation contracts, component schemas, styling tokens, and backend security architecture for Vincent Yuann's interactive systems portfolio.

---

## 1. Interaction Hierarchy & Routing Model

The application uses client-side hash routing (`HashRouter`) for seamless static hosting compatibility with GitHub Pages:

```
                          ┌──────────────────────────┐
                          │   Persistent Navbar      │
                          │ (Sticky Top Across All)  │
                          └─────────────┬────────────┘
                                        │
      ┌──────────────────────────────────┼──────────────────────────────────┐
      │                                  │                                  │
      ▼                                  ▼                                  ▼
Level 0: Home Page             Level 1: Projects Gallery         Level 2: Detail Deep-Dive
Route: `#/`                    Route: `#/projects`               Route: `#/projects/:id`
• Sticky Navbar                • Breadcrumbs (`Home / Projects`) • Hero metadata & status
• Hero Narrative & Metrics     • Category filter tabs            • Live Demo & GitHub CTAs
• Interactive River Timeline   • Instant fuzzy search            • 4-point Architecture Metrics
• Chronological Pebble Stream  • Uniform project cards           • Brand TechBadges
• Standard Protected Footer    • Tags & highlight metrics        • Markdown Engineering Log
      │                                  │                                  │
      └──────────────────────────────────┼──────────────────────────────────┘
                                         │
      ┌──────────────────────────────────┼──────────────────────────────────┐
      │                                  │                                  │
      ▼                                  ▼                                  ▼
Curriculum Vitae & LaTeX Source  Protected Reach-Out Page         Admin CMS & Settings
Route: `#/resume`                Route: `#/contact`               Route: `#/admin` & `#/login`
• Dual-Mode (PDF & LaTeX .tex)   • Direct inquiry form            • GitHub OAuth authenticated
• Zero-dep AST Tokenizer         • 5MB attachments support        • PostgreSQL RLS + Trigger
• Responsive Capped Height       • Edge Function + Resend API     • Projects & Systems editor
• Direct Supabase Bucket Sync    • IP Rate-limiting (3/hr)        • Profile & Resume Asset Manager
```

---

## 2. Persistent Sticky Navbar Layout

The `<Navbar />` is rendered across all routes (`sticky top-0 z-30 bg-white/95 backdrop-blur-md`):

1. **Brand Identity (Left)**:
   - Avatar circle (`V`) with hover micro-scale.
   - Name (`Vincent Yuann`) and role (`Software & AI Engineer`) linking to `#/`.
2. **Center Controls**:
   - **Status Indicator**: `● Open to Full-Stack & AI Roles` (pulsing teal badge).
   - **Navigation Routes**:
     - `Projects Gallery` button routing to `#/projects`.
     - `Resume` button routing to `#/resume`.
   - **Spotlight Search**: `[⌘ Search ⌘K]` button opening the global keyboard command palette (`⌘K`).
3. **Action Cluster (Right)**:
   - **Hire Me**: High-contrast dark button routing to `#/contact`.
   - **GitHub**: Icon linking directly to `https://github.com/VincentYuann`.
   - **Settings**: `<Settings />` gear icon routing to the admin console `#/admin`.
   - *(Design Rule: No raw mailto links and no third-party network clutter in the header).*

---

## 3. Page & Component Breakdown

### Level 0: The Landing Page (`HomePage.tsx`)
- **Hero Section (`Hero.tsx`)**:
  - Focuses on narrative value proposition and systems engineering proof points.
  - Metrics row: `3+ Flagship Systems`, `<30ms WebSocket Sync`, `Dual-LLM Qdrant RAG Pipeline`.
  - Stream hint guiding user downward into the milestone river.
- **River Timeline (`RiverTimeline.tsx`)**:
  - Chronological path connecting flagship milestone stones and exploratory pebbles.
  - Interactive cards trigger direct navigation to `#/projects/:id`.
- **Protected Footer (`Footer.tsx`)**:
  - Embedded quick reach-out form (`ContactForm.tsx`).
  - Architecture Colophon detailing React 19, Tailwind, Supabase, and Resend stack.
  - Subtle Admin CMS shortcut link (`<Settings />` icon).

### Level 1: Projects Discovery Gallery (`ProjectsPage.tsx`)
- Instant client-side search across title, subtitle, description, tags, and highlights.
- Category tabs: `All`, `Flagships`, `Experiments`, `Full-Stack Web App`, `Distributed Systems`, `Applied AI`.
- Standard project cards displaying category, title, tech badges, highlights, and deep-dive link.

### Level 2: Architectural Deep-Dive (`ProjectDetailPage.tsx`)
- **Header Zone**: Breadcrumb navigation (`← Back to Projects`), category, title, subtitle, and action buttons (`Explore Source Code`, `Open Live Demo`).
- **Benchmark & Metrics Grid**: 4 key performance stats (e.g. latency, protocol, database, cache hit ratio).
- **Tech Stack Breakdown**: Array of `<TechBadge />` components with official SVG brand icons.
- **Architectural Highlights**: Bulleted list of core design decisions (e.g., CRDT sync, RLS, dual-reranker pipeline).
- **Longform Markdown Deep-Dive**: Technical case study breakdown rendered with code snippets and diagrams.

### Global Spotlight Search (`CommandPalette.tsx`)
- Triggered by `⌘K`, `Ctrl+K`, or the Navbar search button.
- Instant keyboard navigation with arrow keys and Enter.
- Searches across all flagship projects, exploratory timeline pebbles, and quick page jumps (`Projects`, `Resume`, `Admin`, `Contact`).

### Curriculum Vitae & LaTeX Source (`ResumePage.tsx`)
- **Dual-Mode Viewer Architecture**:
  - **Rendered (PDF)**: Embedded via `<object data={pdfUrl} type="application/pdf">` with responsive viewport heights (`h-[650px] sm:h-[850px]`), letterpaper-ratio pulse loading skeleton (`aspect-[8.5/11]` simulated lines), fallback modal, and toolbar controls.
  - **LaTeX Source (.tex)**: Per-line regex AST tokenizer (`tokenizeLatexLine`), syntax highlighting (commands, environments, inline math, comments, delimiters), sticky line number gutters (`sticky left-0 shadow-[1px_0_0_0_#E1E6EB]`), and capped responsive scrolling without page spill.
- **Header Actions (Left-Aligned Visual Hierarchy)**:
  - **Primary Hero CTA**: `Download PDF` (solid `#1B2127`, hover `#3894B3`, white text).
  - **Secondary Actions**: `Download .tex` (outline card), `Copy LaTeX` (clipboard accelerator with copied state), and `Open in new tab` (isolated viewer window).
  - **Admin Action**: `Admin: Upload` (distinguished with subtle left border separator, only rendered for authenticated admins).
- **Dual-Mode Verification Pipeline**:
  - Educational/architectural callout highlighting Vincent's zero-dependency tokenization stream and native vector PDF distribution.
- **Zero-PBI Heading**: Sanitized heading containing strictly verified professional links (GitHub, LinkedIn, title) with zero personal contact details exposed.

### Admin CMS & Resume Management (`AdminPage.tsx`)
- **Resume & LaTeX Tab**:
  - **PDF Uploader**: Validates `.pdf` files up to 15MB, deploys to `portfolio-assets/resumes/resume.pdf`, and applies cache-busting timestamps for immediate preview.
  - **LaTeX Uploader & In-Browser Code Editor**: Validates `.tex`/`.txt` files with `\documentclass` sanity checks, saves directly to Supabase Storage, and provides live line count/kilobyte telemetry.
  - **Real-Time Storage Diagnostics**: Live emerald/amber status badges tracking whether assets are active in bucket storage or using local fallback, with file sizes and timestamps.

---

## 4. Backend & Security Architecture (Zero-Leak Supabase & Resend)

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Static React SPA (GitHub Pages)                 │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │                                │
      Read Public Records (anon key)      Contact Form Submission (POST)
                    │                                │
                    ▼                                ▼
┌──────────────────────────────────────┐ ┌───────────────────────────────┐
│        Supabase PostgreSQL DB        │ │   Supabase Serverless Edge    │
│                                      │ │           Function            │
│ • projects (public read RLS)         │ │     `send-contact-email`      │
│ • profile_info (public read RLS)     │ ├───────────────────────────────┤
│ • admin_users (whitelist table)      │ │ 1. check_contact_rate_limit() │
│ • contact_rate_limits (IP hash)      │ │ 2. Honeypot check (hp_company)│
│                                      │ │ 3. Parse file attachment      │
│ RLS Mutations: Write access strictly │ │ 4. Dispatch via Resend API    │
│ locked to authenticated GitHub user  │ └──────────────┬────────────────┘
│ whose email is in `admin_users`.     │                │
└──────────────────────────────────────┘                ▼
                                         ┌───────────────────────────────┐
                                         │          Resend API           │
                                         │  (Delivers to Vincent's Gmail │
                                         │   with user as reply_to)      │
                                         └───────────────────────────────┘
```

### Why Raw Email is Never Exposed
1. Exposing `vincentyuan1020@gmail.com` directly in HTML or client bundles allows scrapers to send spam directly to Gmail via external SMTP, completely bypassing website rate limits.
2. By routing all reach-outs through the serverless Edge Function:
   - The real email stays secret on the server.
   - IP rate limiting is strictly enforced (max 3 messages/hour per IP).
   - Bots are dropped via honeypots without incurring email API quotas.
   - Legitimate messages arrive in your Gmail inbox with the sender's email configured as `reply_to`.

---

## 5. UI Tokens & Styling Guidelines

* **Canvas**: Clean editorial background (`#FAFBFD` / `#FFFFFF`).
* **Borders & Dividers**: Subtle grey borders (`#E1E6EB`, `#D0D7DE`).
* **Text**: High-contrast neutral dark (`#1B2127`) with muted secondary (`#57606A`).
* **Accents**: Muted teal (`#3894B3`), soft teal background (`#EBF6F9`), with project-specific stone colors (`#3894B3`, `#E76F51`, `#2A9D8F`).
* **Typography**: Clean sans-serif for UI controls, editorial `font-serif` for prominent titles and brand marks.
