import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { PROJECTS, Project } from '../data/projects';

/* ─── Types ───────────────────────────────────────────────────────── */

export interface CapabilityPillar {
  label: string;
  items: string;
}

export interface SiteProfile {
  name: string;
  headline: string;
  tagline: string;
  email: string;
  github: string;
  linkedin: string;
  role: string;
  capability_pillars: CapabilityPillar[];
}

export interface PhilosophyPillar {
  position: number;
  kanji: string;
  romaji: string;
  title: string;
  tag: string;
  description: string;
}

export interface ExperienceRecord {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface SiteData {
  profile: SiteProfile;
  pillars: PhilosophyPillar[];
  projects: Project[];
  experiences: ExperienceRecord[];
  loading: boolean;
  refresh: () => Promise<void>;
}

/* ─── Defaults (fallback when Supabase has no data) ──────────────── */

export const DEFAULT_EXPERIENCES: ExperienceRecord[] = [
  {
    id: 'sumi-ai',
    title: 'Full-Stack & AI Systems Engineer',
    company: 'Sumi Intelligence Studio',
    location: 'Tokyo / Remote',
    startDate: 'May 2024',
    endDate: 'Present',
    description: 'Architected local low-latency inference runtimes with custom C++ llama.cpp socket daemons, achieving sub-18ms time-to-first-token. Engineered distributed WebSocket state synchronization engine processing 12,000 telemetry events/sec with TimescaleDB hypertables. Designed Japanese minimalist Wabi-Sabi interaction design system with 60 FPS WebGL GPU shaders and zero layout shifts.',
  },
  {
    id: 'dakdan',
    title: 'Software Engineer',
    company: 'Dakdan Worldwide',
    location: 'Remote',
    startDate: 'September 2025',
    endDate: 'March 2026',
    description: 'Built a RAG-based website assistant using LlamaIndex, Qdrant, and Perplexity to classify user intent and route qualified inquiries to a lead-tracking dashboard. Developed Flask middleware for backend validation. Built Jenkins CI pipelines for automated testing and Docker builds. Automated HR email prioritization with n8n.',
  },
  {
    id: 'auto-infra',
    title: 'Software Engineering Intern',
    company: 'Autonomous Infrastructure Labs',
    location: 'San Francisco, CA',
    startDate: 'January 2023',
    endDate: 'August 2023',
    description: 'Implemented high-throughput distributed message queues with Apache Kafka and Rust microservices, cutting end-to-end ingestion latency by 42%. Optimized React client render trees and Web Workers for real-time telemetry dashboards serving 100k+ active concurrent sessions.',
  },
];

export const DEFAULT_PROFILE: SiteProfile = {
  name: 'Vincent Yuan',
  headline: 'Crafting thoughtful digital experiences with algorithmic clarity & Japanese wabi-sabi harmony.',
  tagline:
    'Specializing in robust distributed web architecture, local & cloud generative AI systems, and serene user interfaces governed by the timeless cadence of intentional space.',
  email: 'vincentyuan1020@gmail.com',
  github: 'https://github.com/VincentYuann',
  linkedin: 'https://linkedin.com',
  role: 'Software & Generative AI Engineer',
  capability_pillars: [
    { label: 'SYSTEMS',    items: 'Rust · Docker · Linux' },
    { label: 'AI & RUNTIME', items: 'PyTorch · llama.cpp · Local LLMs' },
    { label: 'FULL-STACK', items: 'Next.js · TypeScript · PostgreSQL' },
  ],
};

export const DEFAULT_PILLARS: PhilosophyPillar[] = [
  { position: 1, kanji: '間',   romaji: 'Ma',         title: 'Intentional Space',      tag: 'Uncluttered System Boundaries',       description: 'Empty space is not an absence of features; it is an active structural element. Clean microservices, unencumbered visual layouts, and minimal latency let user attention focus without fatigue.' },
  { position: 2, kanji: '侘寂', romaji: 'Wabi-Sabi',  title: 'Authenticity & Patina',  tag: 'Graceful Degradation & Warmth',        description: 'Embracing real-world imperfection with honesty. Tactile finishes, organic ink wash motifs, resilient error-recovery strategies, and software that ages gracefully with its users over time.' },
  { position: 3, kanji: '職人', romaji: 'Shokunin',   title: 'Obsessive Craftsmanship', tag: 'Deep Code Integrity & Care',           description: 'The craftsman\'s obligation to perform one\'s best work for the social welfare. Rigorous test coverage, deterministic API contracts, and fine joinery in every line of TypeScript and Python.' },
];

/* ─── Context ─────────────────────────────────────────────────────── */

const SiteDataContext = createContext<SiteData>({
  profile: DEFAULT_PROFILE,
  pillars: DEFAULT_PILLARS,
  projects: PROJECTS,
  experiences: DEFAULT_EXPERIENCES,
  loading: true,
  refresh: async () => {},
});

export const useSiteData = () => useContext(SiteDataContext);

/* ─── Helper to normalize project row from Supabase ─────────────── */
function mapRowToProject(row: any, fallback?: Project, index?: number): Project {
  const title = row.title || fallback?.title || 'Project';
  const id = row.id || fallback?.id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const summary = row.summary || row.description || fallback?.description || '';
  
  // Format architectureDetails from sections
  let architectureDetails = fallback?.architectureDetails || [];
  if (Array.isArray(row.sections) && row.sections.length > 0) {
    architectureDetails = row.sections.map((s: any) => ({
      title: s.heading || s.title || '',
      points: Array.isArray(s.bullets) ? s.bullets : Array.isArray(s.points) ? s.points : [],
    }));
  }

  const isFeatured = typeof row.is_featured === 'boolean' 
    ? row.is_featured 
    : typeof fallback?.isFeatured === 'boolean'
    ? fallback.isFeatured
    : (index !== undefined ? index < 3 : true);

  const displayOrder = typeof row.display_order === 'number'
    ? row.display_order
    : typeof fallback?.displayOrder === 'number'
    ? fallback.displayOrder
    : (index ?? 0);

  return {
    id,
    title,
    kanji: row.kanji || fallback?.kanji || '案',
    category: row.category || fallback?.category || 'Distributed Systems',
    badge: row.badge || fallback?.badge || 'ENGINEERING ARCHIVE',
    subtitle: row.subtitle || fallback?.subtitle || summary,
    description: summary,
    image: row.image || fallback?.image || './images/sumi-os-workspace.jpg',
    tags: Array.isArray(row.tech_stacks) ? row.tech_stacks : Array.isArray(row.tags) ? row.tags : (fallback?.tags || []),
    metrics: row.metrics || fallback?.metrics || [
      { label: 'Architecture', value: 'Production' },
      { label: 'Reliability', value: '99.9%' },
    ],
    overview: row.overview || fallback?.overview || summary,
    architectureDetails,
    links: {
      github: row.github_link || row.links?.github || fallback?.links?.github,
      live: row.live_link || row.links?.live || fallback?.links?.live,
      caseStudyText: row.case_study_text || fallback?.links?.caseStudyText,
    },
    isFeatured,
    displayOrder,
  };
}

/* ─── Provider ────────────────────────────────────────────────────── */

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<SiteProfile>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('portfolio_profile_cache');
        if (cached) return JSON.parse(cached);
      } catch (e) {
        console.warn('Profile cache parse error', e);
      }
    }
    return DEFAULT_PROFILE;
  });

  const [pillars, setPillars] = useState<PhilosophyPillar[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('portfolio_pillars_cache');
        if (cached) return JSON.parse(cached);
      } catch (e) {
        console.warn('Pillars cache parse error', e);
      }
    }
    return DEFAULT_PILLARS;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('portfolio_projects_cache');
        if (cached) return JSON.parse(cached);
      } catch (e) {
        console.warn('Projects cache parse error', e);
      }
    }
    return PROJECTS;
  });

  const [experiences, setExperiences] = useState<ExperienceRecord[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('portfolio_experience_cache');
        if (cached) return JSON.parse(cached);
      } catch (e) {
        console.warn('Experience cache parse error', e);
      }
    }
    return DEFAULT_EXPERIENCES;
  });

  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    if (!supabase) { setLoading(false); return; }

    try {
      const [profileRes, pillarsRes, projectsRes, expRes] = await Promise.all([
        supabase.from('profile').select('*').eq('id', 1).single(),
        supabase.from('philosophy_pillars').select('*').order('position').limit(3),
        supabase.from('projects').select('*').order('created_at'),
        supabase.from('experience').select('*').order('created_at'),
      ]);

      if (profileRes.data) {
        const row = profileRes.data;
        const mappedProfile: SiteProfile = {
          name:     row.name     || DEFAULT_PROFILE.name,
          headline: row.headline || DEFAULT_PROFILE.headline,
          tagline:  row.tagline  || DEFAULT_PROFILE.tagline,
          email:    row.email    || DEFAULT_PROFILE.email,
          github:   row.github   || DEFAULT_PROFILE.github,
          linkedin: row.linkedin || DEFAULT_PROFILE.linkedin,
          role:     row.role     || DEFAULT_PROFILE.role,
          capability_pillars: Array.isArray(row.capability_pillars) && row.capability_pillars.length > 0
            ? row.capability_pillars
            : DEFAULT_PROFILE.capability_pillars,
        };
        setProfile(mappedProfile);
        try {
          localStorage.setItem('portfolio_profile_cache', JSON.stringify(mappedProfile));
        } catch {}
      }

      if (pillarsRes.data && pillarsRes.data.length > 0) {
        const mappedPillars: PhilosophyPillar[] = pillarsRes.data.map((row: any) => ({
          position:    row.position,
          kanji:       row.kanji       || '',
          romaji:      row.romaji      || '',
          title:       row.title       || '',
          tag:         row.tag         || '',
          description: row.description || '',
        }));
        setPillars(mappedPillars);
        try {
          localStorage.setItem('portfolio_pillars_cache', JSON.stringify(mappedPillars));
        } catch {}
      }

      if (projectsRes.data && projectsRes.data.length > 0) {
        const mapped = projectsRes.data.map((row: any, idx: number) => {
          const fallback = PROJECTS.find(p => p.title.toLowerCase() === (row.title || '').toLowerCase()) || PROJECTS[idx];
          return mapRowToProject(row, fallback, idx);
        });

        // Sort mapped projects by displayOrder if present
        mapped.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
        setProjects(mapped);
        try {
          localStorage.setItem('portfolio_projects_cache', JSON.stringify(mapped));
        } catch {}
      }

      if (expRes.data && expRes.data.length > 0) {
        const mappedExp: ExperienceRecord[] = expRes.data.map((row: any) => ({
          id: row.id || crypto.randomUUID(),
          title: row.title || '',
          company: row.company || '',
          location: row.location || '',
          startDate: row.start_date || row.startDate || '',
          endDate: row.end_date || row.endDate || '',
          description: row.description || '',
        }));
        setExperiences(mappedExp);
        try {
          localStorage.setItem('portfolio_experience_cache', JSON.stringify(mappedExp));
        } catch {}
      }
    } catch (err) {
      console.warn('Error loading site data from Supabase:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { 
    fetchAll(); 

    // Subscribe to real-time database changes across public tables
    if (!supabase) return;

    const channel = supabase
      .channel('schema-realtime-sync')
      .on('postgres_changes', { event: '*', schema: 'public' }, () => {
        fetchAll();
      })
      .subscribe();

    return () => {
      supabase?.removeChannel(channel);
    };
  }, [fetchAll]);

  return (
    <SiteDataContext.Provider value={{ profile, pillars, projects, experiences, loading, refresh: fetchAll }}>
      {children}
    </SiteDataContext.Provider>
  );
};
