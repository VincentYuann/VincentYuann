---
version: alpha
name: Vincent Yuann — Akari Day & Night Portfolio
 description: >-
  A two-theme portfolio design system that combines a warm Akari-inspired
  editorial day mode with a quiet charcoal night mode. The visual language is
  Japanese-influenced, tactile, precise, and deliberately sparse.
colors:
  # Shared brand / identity
  identity-accent: "#B5482E"
  identity-accent-hover: "#9E3D27"
  identity-accent-soft: "#F0D7C7"

  # Light theme — canonical Akari palette
  light-canvas: "#F2E9DA"
  light-surface: "#F7F0E3"
  light-surface-raised: "#FBF6EC"
  light-surface-muted: "#EDE1CE"
  light-ink: "#2B2E3A"
  light-ink-muted: "#6B6559"
  light-ink-subtle: "#8B8375"
  light-border: "#D9C9AE"
  light-border-strong: "#BDAA89"
  light-button-dark: "#26262E"
  light-on-dark: "#F7F0E3"
  light-focus: "#B5482E"
  light-success: "#526D57"
  light-warning: "#9A6B2E"
  light-error: "#B5482E"

  # Dark theme — charcoal night counterpart
  dark-canvas: "#1E1F24"
  dark-surface: "#2A2C32"
  dark-surface-raised: "#32343B"
  dark-surface-muted: "#24262C"
  dark-ink: "#E8E6DF"
  dark-ink-muted: "#A7A398"
  dark-ink-subtle: "#797A7E"
  dark-border: "#3A3D44"
  dark-border-strong: "#565A63"
  dark-button-light: "#E8E6DF"
  dark-on-light: "#1E1F24"
  dark-focus: "#C65B42"
  dark-success: "#87A889"
  dark-warning: "#D3A45B"
  dark-error: "#D86A50"

typography:
  display-xl:
    fontFamily: "Canela, Iowan Old Style, Georgia, serif"
    fontSize: "64px"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  display-lg:
    fontFamily: "Canela, Iowan Old Style, Georgia, serif"
    fontSize: "52px"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline-lg:
    fontFamily: "Canela, Iowan Old Style, Georgia, serif"
    fontSize: "40px"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  headline-md:
    fontFamily: "Canela, Iowan Old Style, Georgia, serif"
    fontSize: "30px"
    fontWeight: 400
    lineHeight: 1.18
    letterSpacing: "-0.015em"
  headline-sm:
    fontFamily: "Montserrat, Inter, Arial, sans-serif"
    fontSize: "20px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.01em"
  body-lg:
    fontFamily: "Montserrat, Inter, Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0em"
  body-md:
    fontFamily: "Montserrat, Inter, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
  body-sm:
    fontFamily: "Montserrat, Inter, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0.005em"
  label-lg:
    fontFamily: "Montserrat, Inter, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "0.08em"
  label-md:
    fontFamily: "Montserrat, Inter, Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.12em"
  label-caps:
    fontFamily: "Montserrat, Inter, Arial, sans-serif"
    fontSize: "10px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.16em"
  code-md:
    fontFamily: "JetBrains Mono, SFMono-Regular, Consolas, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0em"
  code-sm:
    fontFamily: "JetBrains Mono, SFMono-Regular, Consolas, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0em"

spacing:
  px: "1px"
  0: "0px"
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "20px"
  6: "24px"
  8: "32px"
  10: "40px"
  12: "48px"
  16: "64px"
  20: "80px"
  24: "96px"
  32: "128px"
  page-gutter-mobile: "20px"
  page-gutter-tablet: "32px"
  page-gutter-desktop: "48px"
  content-max: "1440px"
  content-reading-max: "720px"
  sidebar-width: "240px"
  grid-gap: "24px"

rounded:
  none: "0px"
  hairline: "2px"
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  pill: "9999px"

components:
  app-shell-light:
    backgroundColor: "{colors.light-canvas}"
    textColor: "{colors.light-ink}"
    sidebarWidth: "{spacing.sidebar-width}"
    borderColor: "{colors.light-border}"
  app-shell-dark:
    backgroundColor: "{colors.dark-canvas}"
    textColor: "{colors.dark-ink}"
    sidebarWidth: "{spacing.sidebar-width}"
    borderColor: "{colors.dark-border}"
  sidebar-light:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.light-ink}"
    borderColor: "{colors.light-border}"
    padding: "{spacing.6}"
  sidebar-dark:
    backgroundColor: "{colors.dark-canvas}"
    textColor: "{colors.dark-ink}"
    borderColor: "{colors.dark-border}"
    padding: "{spacing.6}"
  card-light:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.light-ink}"
    borderColor: "{colors.light-border}"
    rounded: "{rounded.md}"
    padding: "{spacing.6}"
  card-dark:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.dark-ink}"
    borderColor: "{colors.dark-border}"
    rounded: "{rounded.md}"
    padding: "{spacing.6}"
  button-primary-light:
    backgroundColor: "{colors.light-button-dark}"
    textColor: "{colors.light-on-dark}"
    borderColor: "{colors.light-button-dark}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    height: "40px"
    padding: "0 16px"
  button-primary-light-hover:
    backgroundColor: "{colors.light-ink}"
    textColor: "{colors.light-on-dark}"
    borderColor: "{colors.light-ink}"
  button-primary-dark:
    backgroundColor: "{colors.dark-button-light}"
    textColor: "{colors.dark-on-light}"
    borderColor: "{colors.dark-button-light}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    height: "40px"
    padding: "0 16px"
  button-primary-dark-hover:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.dark-on-light}"
    borderColor: "#FFFFFF"
  button-secondary-light:
    backgroundColor: "transparent"
    textColor: "{colors.light-ink}"
    borderColor: "{colors.light-border-strong}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    height: "40px"
    padding: "0 16px"
  button-secondary-dark:
    backgroundColor: "transparent"
    textColor: "{colors.dark-ink}"
    borderColor: "{colors.dark-border-strong}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    height: "40px"
    padding: "0 16px"
  button-accent:
    backgroundColor: "{colors.identity-accent}"
    textColor: "#FFFFFF"
    borderColor: "{colors.identity-accent}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    height: "40px"
    padding: "0 16px"
  tag-light:
    backgroundColor: "transparent"
    textColor: "{colors.light-ink-muted}"
    borderColor: "{colors.light-border}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  tag-dark:
    backgroundColor: "transparent"
    textColor: "{colors.dark-ink-muted}"
    borderColor: "{colors.dark-border-strong}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  nav-item-light:
    textColor: "{colors.light-ink}"
    typography: "{typography.label-md}"
    padding: "10px 0"
  nav-item-light-active:
    textColor: "{colors.identity-accent}"
    typography: "{typography.label-md}"
    activeIndicatorColor: "{colors.identity-accent}"
  nav-item-dark:
    textColor: "{colors.dark-ink}"
    typography: "{typography.label-md}"
    padding: "10px 0"
  nav-item-dark-active:
    textColor: "{colors.identity-accent}"
    typography: "{typography.label-md}"
    activeIndicatorColor: "{colors.identity-accent}"
  status-badge-light:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.light-ink-muted}"
    borderColor: "{colors.light-border}"
    dotColor: "{colors.identity-accent}"
    rounded: "{rounded.pill}"
    padding: "8px 12px"
  status-badge-dark:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.dark-ink-muted}"
    borderColor: "{colors.dark-border-strong}"
    dotColor: "{colors.identity-accent}"
    rounded: "{rounded.pill}"
    padding: "8px 12px"
  input-light:
    backgroundColor: "{colors.light-surface-raised}"
    textColor: "{colors.light-ink}"
    borderColor: "{colors.light-border}"
    rounded: "{rounded.sm}"
    height: "44px"
    padding: "0 12px"
  input-dark:
    backgroundColor: "{colors.dark-surface-raised}"
    textColor: "{colors.dark-ink}"
    borderColor: "{colors.dark-border}"
    rounded: "{rounded.sm}"
    height: "44px"
    padding: "0 12px"
  code-block-light:
    backgroundColor: "{colors.light-surface-muted}"
    textColor: "{colors.light-ink}"
    borderColor: "{colors.light-border}"
    typography: "{typography.code-sm}"
    rounded: "{rounded.sm}"
    padding: "{spacing.4}"
  code-block-dark:
    backgroundColor: "#202228"
    textColor: "{colors.dark-ink}"
    borderColor: "{colors.dark-border}"
    typography: "{typography.code-sm}"
    rounded: "{rounded.sm}"
    padding: "{spacing.4}"
  icon-button-light:
    backgroundColor: "transparent"
    textColor: "{colors.light-ink}"
    borderColor: "transparent"
    rounded: "{rounded.sm}"
    size: "36px"
  icon-button-dark:
    backgroundColor: "transparent"
    textColor: "{colors.dark-ink}"
    borderColor: "transparent"
    rounded: "{rounded.sm}"
    size: "36px"
---

# Vincent Yuann — Akari Day & Night Portfolio

## Overview

This is a portfolio design system for **Vincent Yuann, Software & AI Engineer**. It joins the restraint of Japanese editorial and Akari lighting references with the clarity expected of a contemporary technical portfolio. The result should feel calm, crafted, luminous, and quietly precise—not like a generic SaaS dashboard, a neon developer portfolio, or a dense résumé site.

The system has two equal themes:

- **Day / Light:** Warm washi-paper canvas, parchment-like panels, fine tan hairlines, and softened charcoal-navy text. It should evoke daylight through shoji screens, studio paper, bamboo, and warm wood.
- **Night / Dark:** Deep blue-charcoal canvas, muted warm-white type, low-contrast graphite borders, and the same quiet editorial rhythm. It should evoke a focused evening workbench rather than a high-saturation “cyber” interface.

Terracotta red is the sole deliberate brand accent in both themes. It carries the energy of a hanko stamp: visible, meaningful, and rare. It is not a general-purpose decorative color.

The visual voice is: restrained, intelligent, tactile, patient, editorial, and technically capable. Prioritize generous negative space, a small number of strong visual moments, and legible hierarchy.

## Colors

### Light theme

The light theme must use the canonical Akari palette below. Do not substitute visually similar creams, blacks, or tans. These exact values are the source of truth.

| Role | Token | Value | Use |
|---|---|---:|---|
| Canvas | `light-canvas` | `#F2E9DA` | Page background and broad open space |
| Panel | `light-surface` | `#F7F0E3` | Sidebars, cards, light containers |
| Raised surface | `light-surface-raised` | `#FBF6EC` | Inputs and subtle foreground layers |
| Muted surface | `light-surface-muted` | `#EDE1CE` | Code blocks, image overlays, quiet separation |
| Primary ink | `light-ink` | `#2B2E3A` | Headings, body copy, primary icons |
| Secondary ink | `light-ink-muted` | `#6B6559` | Dates, captions, metadata, helper text |
| Border | `light-border` | `#D9C9AE` | Hairline dividers, card outlines, input borders |
| Strong border | `light-border-strong` | `#BDAA89` | Hover/focus-adjacent neutral borders only |
| CTA fill | `light-button-dark` | `#26262E` | Main dark action buttons and active dark tabs |
| On dark | `light-on-dark` | `#F7F0E3` | Text/icons on dark light-theme controls |
| Identity accent | `identity-accent` | `#B5482E` | Hanko mark, selected nav cue, one status dot, rare highlight |

### Dark theme

The dark theme is a quiet inverse, not a black-theme conversion. Its blue-charcoal base must retain warmth from the surrounding off-white, terracotta, and paper imagery.

| Role | Token | Value | Use |
|---|---|---:|---|
| Canvas | `dark-canvas` | `#1E1F24` | Page and sidebar background |
| Panel | `dark-surface` | `#2A2C32` | Cards and contained regions |
| Raised surface | `dark-surface-raised` | `#32343B` | Inputs and foreground containers |
| Primary ink | `dark-ink` | `#E8E6DF` | Main copy, headline text, active icons |
| Secondary ink | `dark-ink-muted` | `#A7A398` | Metadata, labels, subdued copy |
| Border | `dark-border` | `#3A3D44` | Fine separators and card outlines |
| Strong border | `dark-border-strong` | `#565A63` | Hover states and selected outlines |
| Light CTA | `dark-button-light` | `#E8E6DF` | Main light action buttons in dark mode |
| On light | `dark-on-light` | `#1E1F24` | Text/icons on light dark-theme controls |
| Identity accent | `identity-accent` | `#B5482E` | Same sparse brand role as light mode |

### Color application

- Use the light canvas and light panel as distinct surfaces. The difference is subtle by design; create hierarchy through border, spacing, and typography before adding stronger contrast.
- In light mode, use `light-ink` for normal text and `light-button-dark` only for high-emphasis controls. These are separate tokens and must not be collapsed into one generic black.
- In dark mode, avoid pure black (`#000000`) and pure white (`#FFFFFF`) as large surfaces. The interface should remain soft and paper-adjacent.
- Use terracotta on at most one major interactive emphasis per viewport. Examples: current nav item, a compact availability indicator, a stamp/logo mark, or a small underline.
- Do not introduce teal, cyan, saturated blue, purple, lime, or rainbow gradients. There is no teal token in this design system.
- Do not use the accent as a large card fill, page background, code syntax theme, or repeated badge color.

### Semantic states

Use muted, low-noise semantic states. Status should not compete with the portfolio content.

- Success: `light-success` / `dark-success`, reserved for verified success states.
- Warning: `light-warning` / `dark-warning`, reserved for warning states.
- Error: `light-error` / `dark-error`, reserved for errors and destructive actions.
- Focus: use a 2px visible ring or outline in `light-focus` / `dark-focus`; offset it from the component edge by 2px where space permits.

## Typography

Typography uses three families with clearly separated jobs. Avoid treating every page as either a serif editorial spread or a monospace code terminal.

### Type families

- **Canela** is the expressive editorial serif. Use it for display headlines, page titles, and select project names. Its purpose is atmosphere and hierarchy.
- **Montserrat** is the operational sans-serif. Use it for navigation, body text, buttons, labels, descriptions, and metadata. Keep it clean and readable.
- **JetBrains Mono** is the technical monospace. Use it for code blocks, short technology metadata, file-like references, and small data points—not for ordinary prose.

Fallbacks are included in the token definitions. If Canela is unavailable, use Iowan Old Style or Georgia. If Montserrat is unavailable, use Inter or Arial.

### Type scale

| Role | Size | Leading | Primary use |
|---|---:|---:|---|
| `display-xl` | 64px | 1.02 | Desktop hero title; use sparingly |
| `display-lg` | 52px | 1.05 | Major page title |
| `headline-lg` | 40px | 1.12 | Section heading or feature project title |
| `headline-md` | 30px | 1.18 | Card and article titles |
| `headline-sm` | 20px | 1.30 | Compact sans heading |
| `body-lg` | 18px | 1.65 | Introductory portfolio copy |
| `body-md` | 15px | 1.60 | Default reading copy |
| `body-sm` | 13px | 1.55 | Supporting copy and compact cards |
| `label-lg` | 13px | 1.15 | Button text and prominent labels |
| `label-md` | 11px | 1.20 | Navigation and component labels |
| `label-caps` | 10px | 1.20 | Technical tags and micro-labels |
| `code-md` | 13px | 1.65 | Readable code |
| `code-sm` | 11px | 1.50 | Compact code and technical metadata |

### Typography rules

- Set display and editorial headings in Canela at weight 400. Do not fake bold serif headlines.
- Set body copy in Montserrat Regular (400). Use 500–600 for navigation, buttons, and labels only.
- Use uppercase labels with `label-md` or `label-caps`, including their specified tracking. They should read as quiet technical annotations.
- Keep long reading lines to approximately 60–75 characters using `content-reading-max`.
- Avoid all-caps body paragraphs, centered long-form copy, excessive italic text, and more than two type weights within a compact component.
- Avoid oversized headings on every section. The hero earns display scale; ordinary sections should use `headline-lg` or `headline-md`.

## Layout

### Page structure

Desktop layouts use a left sidebar and a content canvas. The sidebar is a stable navigational anchor and brand surface; the main pane carries projects, writing, and detail views.

- Desktop sidebar width: 240px.
- Desktop outer page gutter: 48px.
- Tablet gutter: 32px.
- Mobile gutter: 20px.
- Primary content maximum width: 1440px.
- Reading content maximum width: 720px.
- Standard grid gap: 24px.

On mobile, convert the fixed sidebar into a compact top bar or a modal navigation panel. Do not shrink desktop navigation into unreadable vertical text.

### Spacing system

Use the 4px scale in the YAML front matter. Prefer the following rhythm:

- 4px / 8px: icon-to-label alignment, metadata gaps, tight internal adjustments.
- 12px / 16px: related text, tags, compact fields, cards with concise content.
- 24px / 32px: default card padding, section-internal grouping, grid gaps.
- 48px / 64px: section separation and large editorial breathing room.
- 80px / 96px: major page and hero separation on desktop.

Do not use arbitrary values such as 13px, 19px, 27px, or 37px when a scale value achieves the same visual result.

### Grid behavior

- Desktop: use 12 columns for page-level arrangements. Project cards can span 4, 6, 8, or 12 columns based on importance.
- Tablet: collapse toward 8 columns while preserving at least 24px gutters.
- Mobile: use 4 columns; stack project cards vertically and retain 20px side gutters.
- Keep dividers and image edges aligned to the grid whenever practical.
- Use asymmetry only with intent: a larger feature card beside smaller supporting cards, not arbitrary unevenness.

### Imagery

Use imagery that supports the paper-and-light direction: washi paper, bamboo, shoji-filtered sunlight, warm wood, architectural shadows, quiet workspaces, restrained landscape art, and crafted objects.

- Use warm, low-saturation color grading.
- Favor images with visible texture, natural grain, and pockets of negative space.
- Crop images with structural alignment to the grid; use the `md` corner radius.
- In light mode, apply faint parchment overlays or warm-toned vignettes only when needed for text legibility.
- In dark mode, slightly lower image brightness and preserve warm highlights. Do not use harsh blue overlays.

## Elevation & Depth

This is a primarily flat system. Hierarchy comes from tonal layers, hairline borders, image framing, and generous spacing—not heavy drop shadows.

### Rules

- Base canvas sits below panel surfaces through a subtle tone shift.
- Cards use 1px borders before they use shadows.
- Default card shadow: none.
- On hover, use either a slight border-strength change, a 1–2px translate upward, or one restrained shadow. Do not stack all three aggressively.
- If a shadow is necessary, use `0 8px 24px rgba(43, 46, 58, 0.08)` in light mode and `0 10px 28px rgba(0, 0, 0, 0.20)` in dark mode.
- Modals and floating navigation may use `0 16px 48px rgba(43, 46, 58, 0.16)` in light mode or `0 18px 56px rgba(0, 0, 0, 0.35)` in dark mode.
- Preserve clear edge contrast with borders; avoid “floating glass” or strong blur treatments.

## Shapes

The shape language is mostly rectangular, quiet, and gently softened. It should feel like paper panels and neatly framed editorial blocks, not a bubble-heavy consumer app.

### Radius rules

- Cards, inputs, and buttons: 4px (`rounded.sm`) by default.
- Larger image frames and feature cards: 8px (`rounded.md`).
- Pills and status badges: `rounded.pill` only.
- Page-level shells and broad panels should generally remain 0–4px. Do not use 16px+ rounded corners as a default visual language.
- Use 1px solid hairline borders. The line should look tan in light mode and graphite in dark mode.

### Decorative language

Decorative elements are reference points, not product UI controls. Use them sparingly:

- Black brush ensō circle.
- Terracotta hanko-style identity stamp.
- Thin botanical branches, bamboo drawing, seigaiha wave geometry, sunburst, or minimal geometric ornaments.
- One small diamond centered on a divider can mark a special transition.

Do not mix multiple decorative motifs into every card. A maximum of one motif per major region is a useful default.

## Components

### App shell and sidebar

The sidebar holds the Vincent Yuann identity, compact navigation, availability status, and optionally a small featured-project or contact module.

- Use `sidebar-light` or `sidebar-dark` based on theme.
- Separate the sidebar from main content with a 1px border.
- Identity lockup: serif name, small uppercase “SOFTWARE & AI ENGINEER” descriptor, circular V monogram, and optional small terracotta ring/stamp detail.
- Navigation items use outline icons with 1.5–1.75px strokes and `label-md` typography.
- An active item uses terracotta text or a small terracotta left marker. It must not use teal, a full neon fill, or a thick colored bar.
- Keep menu labels short: Home, Projects, About, Resume, Contact.
- Availability may use a compact pill with one terracotta dot; keep the rest of the status copy neutral.

### Buttons

Use one clear primary action per local context.

| Variant | Light theme | Dark theme | Use |
|---|---|---|---|
| Primary | Dark charcoal fill with warm off-white text | Warm off-white fill with dark text | Main CTA: “View project,” “Get in touch” |
| Secondary | Transparent with tan border | Transparent with graphite border | Alternate or paired action |
| Accent | Terracotta fill with white text | Terracotta fill with white text | Rare singular emphasis only |
| Tertiary | Text plus arrow, no container | Text plus arrow, no container | Low-emphasis links |

Button requirements:

- Standard height is 40px; large hero actions may be 44px–48px.
- Use 16px horizontal padding at the standard size.
- Use `label-md` and a compact arrow icon when relevant.
- Hover should be subtle: tonal shift, border strengthening, or 1px movement. Avoid glow, scale bounce, and flashy transitions.
- Focus states must remain visible and keyboard accessible.
- Keep labels action-oriented: “View Project,” “Read Case Study,” “Download Résumé,” “Get in Touch.”

### Cards and project cards

Cards provide containment, not decoration.

- Use `card-light` / `card-dark` tokens.
- Default radius: 8px for cards containing an image; 4px for compact information cards.
- Use 24px padding on standard desktop cards; reduce to 16px when space is constrained.
- Project cards include: image, project title, 1–2 sentence outcome-oriented summary, 2–4 neutral technology tags, and a text link with arrow.
- Keep project summaries concrete: problem, action, or impact. Avoid generic filler such as “a modern solution.”
- On hover, make the image slightly more prominent and strengthen the border; do not create large scaling or colored overlays.

### Tags and filters

Technology tags should be informative but visually quiet.

- Use `tag-light` / `tag-dark` as outlined neutral pills.
- Use uppercase labels such as React, Next.js, Python, AWS, Docker, PostgreSQL, Supabase, n8n, LlamaIndex, or Qdrant.
- Tags should remain neutral in both themes. Do not color-code individual technologies.
- Use terracotta only for a selected filter state if a clear selected state is needed; otherwise use a dark fill in light mode or light fill in dark mode.

### Tabs, pagination, and status

- Active tabs: dark charcoal fill with warm light text in light mode; warm off-white fill with dark text in dark mode. Alternatively, use a neutral tab with a 2px terracotta underline.
- Inactive tabs: text-only or neutral bordered style.
- Pagination: inactive dots use muted neutral color; active dot is terracotta or the primary ink depending on whether it is the sole highlight in the local region.
- Status dots: terracotta is acceptable for an attention-worthy availability indicator. Otherwise use muted neutral dots.
- Never use teal for an active tab, tag, status dot, progress mark, or indicator.

### Inputs and forms

- Inputs use 44px height, 4px radius, and a 1px border.
- Labels sit above inputs in `label-md`; helper text uses `body-sm` in muted ink.
- Placeholder text should be muted but readable; do not use ultra-low-contrast placeholders.
- Focus uses the terracotta focus ring with adequate contrast.
- Error messages use the error token and concise actionable language.
- Keep forms narrow enough to scan; do not stretch inputs across a wide desktop page without a clear reason.

### Code blocks and technical content

- Use `code-block-light` / `code-block-dark`.
- Use JetBrains Mono, 11px–13px, with 1.5–1.65 line height.
- Code blocks should be bordered and lightly tonal, not black terminal panels in light mode.
- Use line numbers only for code examples where users may need to refer to specific lines.
- Keep syntax highlighting restrained; use primarily neutral ink and muted tones, with terracotta only for a very limited emphasis if needed.

### Icons

- Use minimal outline icons with a consistent 1.5–1.75px stroke weight.
- Preferred icon size: 18px–20px in navigation; 20px–24px in standalone icon controls.
- Icons use primary ink by default and muted ink when inactive.
- Do not mix filled, multicolor, skeuomorphic, and outline icon styles in the same interface.
- Use familiar metaphors for home, folder/projects, document/resume, calendar, search, settings, external link, arrow, and contact.

### Dividers and borders

- Use a 1px border in the theme border token.
- Long horizontal dividers may include a centered small diamond only at major section transitions.
- Avoid repeating ornamental dividers between every list item.
- Card outlines should remain visible but understated.

## Do's and Don'ts

### Do

- Do preserve the exact canonical light palette: `#F2E9DA`, `#F7F0E3`, `#2B2E3A`, `#6B6559`, `#D9C9AE`, `#26262E`, and `#B5482E`.
- Do use terracotta as a single, intentional highlight rather than a default UI color.
- Do use the difference between canvas and panel surfaces subtly and consistently.
- Do make technical work feel credible through concise project descriptions, neutral technology tags, code snippets, and precise hierarchy.
- Do use warm, tactile imagery with paper, bamboo, wood, soft daylight, and restrained landscape references.
- Do use low-contrast borders and generous whitespace to create calm.
- Do support light and dark themes equally; layout and hierarchy should remain consistent across both.
- Do meet WCAG AA contrast requirements: at least 4.5:1 for normal text and 3:1 for large text and essential UI boundaries.
- Do test focus, hover, pressed, disabled, and keyboard states for all interactive elements.

### Don't

- Don’t introduce teal, cyan, bright blue, purple, neon green, or a second competing accent color.
- Don’t replace the Akari light tokens with lighter approximate creams or near-black text values.
- Don’t use `#211F26` as a substitute for `#2B2E3A` body ink, and don’t use one dark color for both text and CTA fill when the distinct tokens are available.
- Don’t use terracotta for every badge, icon, border, heading, and button.
- Don’t use glossy gradients, glassmorphism, heavy blur, large drop shadows, or high-saturation visual effects.
- Don’t over-round cards, inputs, and buttons. This system is lightly softened, not bubbly.
- Don’t use generic dashboard widgets, dense metric grids, or loud developer-terminal aesthetics unless the content explicitly calls for them.
- Don’t let decorative Japanese-inspired motifs become cultural wallpaper; use them as quiet structural accents and keep the product content primary.
- Don’t use long paragraphs in cards, excessive tag counts, or cramped navigation.
- Don’t use different icon stroke styles, arbitrary spacing values, or unapproved colors to solve local layout problems.
