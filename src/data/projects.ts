export interface ProjectStat {
  label: string;
  value: string;
}

export interface TechTag {
  name: string;
  icon?: string; // slug for Devicon / Simple Icons (e.g., "react", "docker")
}

export interface FlagshipProject {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  tags: TechTag[];
  stats: ProjectStat[];
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  detailsMarkdown?: string;
  stoneAccent: string; // watercolor accent tone
  isFlagship?: boolean;
}

export interface RiverPebble {
  id: string;
  title: string;
  description: string;
  tag: string;
  icon?: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  detailsMarkdown?: string;
  highlights?: string[];
  stats?: ProjectStat[];
  tags?: TechTag[];
}

export const FLAGSHIP_PROJECTS: FlagshipProject[] = [];

export const RIVER_PEBBLES: RiverPebble[] = [];

/**
 * Curated template projects for 1-click administrative database seeding.
 * These are not rendered directly; projects render dynamically from Supabase.
 */
export const DEFAULT_CURATED_PROJECTS: FlagshipProject[] = [
  {
    id: "modular-rag",
    title: "Modular RAG AI",
    category: "Applied AI Pipeline",
    subtitle: "Autonomous enterprise research & Qdrant vector retrieval",
    description:
      "Production RAG pipeline pairing Gemini 3.5 & 3.7 with Qdrant vector retrieval, autonomous background company research, and instant CRM lead routing.",
    tags: [
      { name: "FastAPI", icon: "fastapi" },
      { name: "Python", icon: "python" },
      { name: "Gemini", icon: "google" },
      { name: "Qdrant", icon: "qdrant" },
      { name: "Docker", icon: "docker" },
    ],
    stats: [
      { label: "Engine", value: "Qdrant HNSW" },
      { label: "LLM Stack", value: "Dual Gemini" },
      { label: "Orchestration", value: "LlamaIndex" },
    ],
    highlights: [
      "Customer-facing Gemini 3.5 Flash Lite FAQ agent with strict citation grounding",
      "Background Gemini 3.7 reasoning agent executing autonomous company dossiers",
      "Automated lead serialization and instant webhook routing to Discord",
    ],
    githubUrl: "https://github.com/VincentYuann/RAG",
    imageUrl: "/images/botanical-ink-accent.jpg",
    stoneAccent: "#B5482E", // Terracotta
    isFlagship: true,
  },
  {
    id: "foodfinder",
    title: "FoodFinder",
    category: "Real-Time Distributed System",
    subtitle: "Collaborative restaurant discovery & live room voting",
    description:
      "Full-duplex WebSocket platform for group dining discovery with low-latency room synchronization, ballot casting, and distributed PostgreSQL persistence.",
    tags: [
      { name: "React", icon: "react" },
      { name: "Socket.IO", icon: "socketio" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Prisma", icon: "prisma" },
      { name: "Express", icon: "express" },
      { name: "Docker", icon: "docker" },
    ],
    stats: [
      { label: "Sync Latency", value: "<30ms" },
      { label: "Protocol", value: "WebSockets" },
      { label: "Pipeline", value: "Jenkins CI/CD" },
    ],
    highlights: [
      "Event-driven room orchestration and state reconciliation with Socket.IO",
      "Prisma relational model optimized for concurrent ballot casting",
      "Automated testing and multi-stage containerization with Jenkins & Docker Compose",
    ],
    githubUrl: "https://github.com/VincentYuann/foodfinder",
    imageUrl: "/images/hero-akari-workspace.jpg",
    stoneAccent: "#2B2E3A", // Slate Night
    isFlagship: true,
  },
  {
    id: "anim-y",
    title: "AnimY",
    category: "Full-Stack Web App",
    subtitle: "Responsive media tracking platform with OAuth & RLS",
    description:
      "Zero cumulative layout shift (0.00 CLS) discovery web app featuring real-time seasonal browsing, custom watchlists, and Supabase Row-Level Security.",
    tags: [
      { name: "React", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Vite", icon: "vitejs" },
      { name: "Supabase RLS", icon: "supabase" },
      { name: "Express", icon: "express" },
    ],
    stats: [
      { label: "Layout Shift", value: "0.00 CLS" },
      { label: "Data Source", value: "Tenrai API" },
      { label: "Security", value: "PostgreSQL RLS" },
    ],
    highlights: [
      "Custom normalization service layer bridging modern Tenrai schema with MAL compatibility",
      "Optimistic UI updates and cache invalidation via TanStack Query v5",
      "Supabase Row-Level Security ensuring strict per-user watchlist data isolation",
    ],
    liveUrl: "https://anim-y.vercel.app",
    githubUrl: "https://github.com/VincentYuann/AnimY",
    imageUrl: "/images/editorial-lantern-shelf.jpg",
    stoneAccent: "#588A75", // Sage / Moss
    isFlagship: true,
  },
];

export const PROFILE_INFO = {
  name: "Vincent Yuann",
  title: "Full-Stack & Applied AI Engineer",
  tagline: "Carving thoughtful software paths from raw ideas into production systems.",
  about:
    "I engineer full-stack applications and applied GenAI workflows. I believe great software combines robust architectural fundamentals with tactile, art-directed user experiences.",
  status: "Open to Full-Stack & AI Roles",
  location: "New York, USA",
  github: "https://github.com/VincentYuann",
  linkedin: "https://linkedin.com/in/vincentyuann",
  email: "",
};
