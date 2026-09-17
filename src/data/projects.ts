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

export const FLAGSHIP_PROJECTS: FlagshipProject[] = [
  {
    id: "anim-y",
    title: "AnimY",
    category: "Full-Stack Web App",
    subtitle: "Anime tracking & exploration platform with OAuth",
    description:
      "A responsive anime discovery web app featuring real-time seasonal browsing, custom watchlists, OAuth authentication, and zero cumulative layout shift (CLS).",
    tags: [
      { name: "React 19", icon: "react" },
      { name: "Vite", icon: "vitejs" },
      { name: "TanStack Query v5", icon: "reactquery" },
      { name: "Supabase RLS", icon: "supabase" },
      { name: "Express", icon: "express" },
      { name: "TypeScript", icon: "typescript" },
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
    stoneAccent: "#588A75", // Sage / Moss
  },
  {
    id: "foodfinder",
    title: "FoodFinder",
    category: "Real-Time Distributed System",
    subtitle: "Real-time collaborative restaurant voting & discovery",
    description:
      "A full-duplex collaborative application where friend groups search nearby dining options, assemble shared shortlists, and resolve mealtime indecision through live room voting.",
    tags: [
      { name: "React 19", icon: "react" },
      { name: "Socket.IO", icon: "socketio" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Prisma 7", icon: "prisma" },
      { name: "Express 5", icon: "express" },
      { name: "Docker", icon: "docker" },
      { name: "Jenkins", icon: "jenkins" },
    ],
    stats: [
      { label: "Sync Latency", value: "<30ms" },
      { label: "Protocol", value: "WebSockets" },
      { label: "Pipeline", value: "Jenkins CI/CD" },
    ],
    highlights: [
      "Event-driven room orchestration and state reconciliation with Socket.IO",
      "Prisma 7 relational model optimized for concurrent ballot casting",
      "Automated testing and multi-stage containerization with Jenkins & Docker Compose",
    ],
    githubUrl: "https://github.com/VincentYuann/foodfinder",
    stoneAccent: "#2E6171", // Deep Cerulean
  },
  {
    id: "modular-rag",
    title: "Modular RAG AI",
    category: "Applied AI Pipeline",
    subtitle: "Production LLM lead qualification & vector search",
    description:
      "An enterprise-ready Retrieval-Augmented Generation assistant leveraging Gemini 3.5 & 3.7 with Qdrant vector retrieval, automated background company research, and instant sales routing.",
    tags: [
      { name: "FastAPI", icon: "fastapi" },
      { name: "Python", icon: "python" },
      { name: "Google Gemini", icon: "google" },
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
    stoneAccent: "#9E5A3F", // Terracotta / Earth
  },
];

export const RIVER_PEBBLES: RiverPebble[] = [
  {
    id: "smart-money",
    title: "SmartMoneyConcept",
    description: "Algorithmic financial candle analysis, order blocks, and liquidity sweep detection.",
    tag: "Python • Quant",
    icon: "python",
    githubUrl: "https://github.com/VincentYuann/SmartMoneyConcept",
  },
  {
    id: "jenkins-pipeline",
    title: "Jenkins DevOps Suite",
    description: "Declarative CI/CD pipeline automation for Dockerized microservice deployments.",
    tag: "DevOps • Docker",
    icon: "jenkins",
  },
  {
    id: "coding-practices",
    title: "Flask REST & Sandboxes",
    description: "Architectural practice repository covering REST API patterns, state design, and auth.",
    tag: "Flask • React",
    icon: "flask",
    githubUrl: "https://github.com/VincentYuann/CodingPractices",
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
