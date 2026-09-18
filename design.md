# Design & Interaction Architecture (`design.md`)

> **Ground Truth Reference**: Layout hierarchy, navigation contracts, component schemas, styling tokens, and backend security architecture for Vincent Yuann's interactive systems portfolio.
>
> **Merge note:** This file is the authoritative document for the portfolio (routing, components, backend/security architecture, and the shadcn/Radix system in Sections 1–4 and 6 are unchanged and take priority as-is). Only **Section 5 (UI Tokens & Styling Guidelines)** has been merged with the warm, editorial "Akari" colorway from the earlier reference theme, remapped onto this project's existing Tailwind v4 semantic-token architecture so nothing structural breaks.

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

The `<Navbar />` is rendered across all routes (`sticky top-0 z-30 bg-white/95 backdrop-blur-md` → see Section 5 for the merged surface-token equivalent):

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
   - _(Design Rule: No raw mailto links and no third-party network clutter in the header)._

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

## 5. UI Tokens & Styling Guidelines — **Merged (Akari Warm Colorway × Existing Editorial System)**

The base architecture (Tailwind v4 semantic tokens, shadcn/Radix theming layer) is unchanged and remains authoritative. What changes is the **palette fed into those tokens**: the original stark white/grey editorial canvas is replaced with the warm, paper-and-ink Akari neutral system, while the project's existing functional accent (muted teal, used for hover states, status badges, and admin diagnostics) is **retained as the primary interactive accent** so no described interaction in Sections 1–4 breaks. Terracotta is folded in as a secondary/rare highlight, matching the "one deliberate pop of color" principle from the Akari reference.

### 5.1 Merged Palette

| Token role                                        | Old value (editorial)           | **Merged value (Akari-warm)**                 | Where it's used                                                                                                                                                        |
| ------------------------------------------------- | ------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Canvas / `--background`                           | `#FAFBFD` / `#FFFFFF`           | **`#F6EFE2`** (warm parchment)                | Page background, replaces stark white across all routes                                                                                                                |
| Panel / `--card`                                  | `#FFFFFF`                       | **`#FBF5E9`** (lighter cream)                 | Project cards, resume viewer frame, command palette surface                                                                                                            |
| Navbar surface                                    | `bg-white/95`                   | **`bg-[#F6EFE2]/90 backdrop-blur-md`**        | Sticky navbar stays warm-tinted, not pure white                                                                                                                        |
| Text / `--foreground`                             | `#1B2127`                       | **`#211F26`** (ink charcoal, slightly warmed) | Headings, body copy                                                                                                                                                    |
| Muted text / `--muted-foreground`                 | `#57606A`                       | **`#6B6558`** (warm gray-brown)               | Captions, metadata, timestamps                                                                                                                                         |
| Borders / `--border`, `--input`                   | `#E1E6EB`, `#D0D7DE`            | **`#DCCBA9`** (sand hairline)                 | Dividers, card outlines, sticky gutter shadow (Section 3, LaTeX viewer)                                                                                                |
| Primary accent / `--primary`                      | `#3894B3` (muted teal)          | **Retained: `#3894B3`**                       | All existing teal usages stay intact: status-indicator pulse, `Download PDF` hover, active nav state, link accents                                                     |
| Primary button (dark) / `--primary-foreground` bg | `#1B2127`                       | **`#26221C`** (warm near-black)               | `Hire Me`, `Download PDF` base fill, primary CTAs                                                                                                                      |
| Secondary accent (new, rare use)                  | —                               | **`#B5482E`** (terracotta)                    | Reserved for exactly one recurring mark: the admin/"authenticated" indicator dot and the `V` avatar ring — signals "this is the maker's stamp," not a general UI color |
| Project stone colors                              | `#3894B3`, `#E76F51`, `#2A9D8F` | **Unchanged**                                 | Project-specific category colors in the River Timeline stay as-is; they already read as warm-compatible against the new cream canvas                                   |
| Success / diagnostics (emerald/amber)             | Tailwind defaults               | **Unchanged**                                 | Admin storage-diagnostics badges keep standard emerald/amber for unambiguous status meaning                                                                            |

### 5.2 Typography (merged)

- **UI controls, nav, badges, metadata**: keep the existing clean sans-serif (unchanged — this is a systems/engineering portfolio and needs to stay legible and technical).
- **Section headings & brand mark only** (`Vincent Yuann`, page H1s like "Projects," "Resume," hero headline): introduce the Akari-style **light-weight editorial serif** as an optional display face for large titles, to add the same "museum-label calm" the reference theme has — sans-serif remains for everything functional (buttons, tags, code, tables).
- **Code / LaTeX tokenizer / monospace blocks**: unchanged monospace stack; only its background shifts to the merged `--card` cream (`#FBF5E9`) instead of pure white, with the sticky gutter shadow re-tinted to the sand border color (`#DCCBA9`) instead of `#E1E6EB`.

### 5.3 Tailwind v4 Token Mapping (`src/index.css`)

```css
@theme inline {
  --background: #f6efe2;
  --foreground: #211f26;

  --card: #fbf5e9;
  --card-foreground: #211f26;

  --muted: #efe4d0;
  --muted-foreground: #6b6558;

  --primary: #3894b3; /* retained teal, functional accent */
  --primary-foreground: #fbf5e9;

  --secondary: #26221c; /* warm near-black for solid CTAs */
  --secondary-foreground: #f6efe2;

  --accent: #b5482e; /* terracotta — reserved, sparing use only */
  --accent-foreground: #fbf5e9;

  --border: #dccba9;
  --input: #dccba9;
  --ring: #3894b3;

  --destructive: #c0392b; /* unchanged, standard destructive red */
}
```

### 5.4 Rules of application (so the merge stays disciplined)

1. **Teal stays functional, terracotta stays symbolic.** Teal continues to mean "interactive/active" (hover, focus rings, active nav, status pulse). Terracotta is never used for interactive states — only as a static identity mark (avatar ring, admin badge accent) so it doesn't compete with teal for the user's attention.
2. **Cream replaces white everywhere, including modals/dialogs.** Radix `<Dialog />` and `<Tooltip />` surfaces should use `--card` (`#FBF5E9`), not white, so the whole shadcn component layer stays visually unified with the new canvas — no component should render on stark white against a cream page.
3. **Dark mode (if/when added):** invert toward warm charcoal (`#211F26` background, `#F6EFE2` text) rather than a cool slate/black, so dark mode still reads as "the same ink-on-paper system," not a different brand.
4. **Contrast check:** `#211F26` on `#F6EFE2` and `#6B6558` on `#F6EFE2` should both be re-verified against WCAG AA (4.5:1 body / 3:1 large text) before shipping, since warm low-contrast pairings need explicit checking — don't assume the same ratios as the old pure white/near-black pair carry over exactly.

---

## 6. Design System Modernization: shadcn/ui & Radix UI Integration

### Architecture & Code Ownership

The portfolio uses **shadcn/ui** built on top of **Radix UI** primitives (`radix-ui ^1.6.7`), integrated with **Tailwind CSS v4** and **React 19**:

1. **How Component Storage Works (`src/components/ui/`)**:
   - Components are **NOT** prepackaged or monolithic. We do not dump 50+ unused components into the bundle.
   - Components are added **on-demand** into `src/components/ui/` (e.g. `button.tsx`, `dialog.tsx`, `badge.tsx`, `tooltip.tsx`).
   - Every file lives directly in our codebase with 100% code ownership: we can customize the JSX, variants, animations, and Tailwind classes without upstream library overrides.

2. **The Radix UI + shadcn Synergy**:
   - **Radix UI (`radix-ui`)**: Powers headless, accessible, and high-performance JavaScript mechanics:
     - Focus trapping (`FocusScope`) and focus restoration when closing modals.
     - Full WAI-ARIA 1.2 screen reader compliance (`role="dialog"`, `aria-expanded`, `aria-describedby`).
     - Automatic keyboard navigation (Escape dismiss, Arrow keys traversal, Tab indexing).
     - Collision detection and viewport positioning for tooltips and popovers.
   - **shadcn/ui**: Provides the aesthetic layer—wrapping Radix primitives with `class-variance-authority` (`cva`), `cn()` (`clsx` + `tailwind-merge`), and theme-driven styling — now fed by the merged palette in Section 5.3.

3. **Tailwind CSS v4 Design Tokens (`src/index.css`)**:
   - Utilizes Tailwind v4's CSS-first `@theme inline` configuration.
   - Semantic CSS variables (`--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`) allow instant light/dark theme switching with zero runtime CSS overhead — values updated per Section 5.3 above.

4. **Component Adoption Roadmap**:
   - `<Button />`: Unified button component replacing repetitive button classes across the app.
   - `<Dialog />`: Radix-based accessible modal replacing custom overlay implementations in `ProjectDetailModal.tsx` and `AdminModal.tsx`.
   - `<Badge />`: Design system badges for technology tags and project milestones.
   - `<Tooltip />`: Accessible tooltips for icon buttons (GitHub, Command, Contact triggers).
   - Future additions: `cmdk` for the Command Palette, `Sheet` for mobile responsive navigation.

---

## 7. Summary of What Changed in This Merge

- **Unchanged (top priority, as-is):** Routing model, navbar contract, all page/component breakdowns, backend/security architecture, shadcn/Radix component strategy.
- **Changed:** Section 5 only — canvas and surface colors moved from stark white/grey to warm parchment/cream; text ink warmed slightly; borders moved to a sand hairline; teal accent **kept** as the functional interactive color; terracotta **added** as a single reserved identity accent (avatar ring / admin mark only).
- **Not carried over from the Akari reference:** the rounded "poster frame" outer container and the vertical icon-sidebar nav — those were specific to the original e-commerce layout and would conflict with this project's existing sticky-navbar + hash-routing structure, so they were intentionally left out of the merge.
