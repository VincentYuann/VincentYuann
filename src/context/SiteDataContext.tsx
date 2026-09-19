import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Project } from '../data/projects';

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

/* ─── Defaults (empty when Supabase has no data) ──────────────── */

export const DEFAULT_EXPERIENCES: ExperienceRecord[] = [];

export const DEFAULT_PROFILE: SiteProfile = {
  name: '',
  headline: '',
  tagline: '',
  email: '',
  github: '',
  linkedin: '',
  role: '',
  capability_pillars: [],
};

export const DEFAULT_PILLARS: PhilosophyPillar[] = [];

/* ─── Context ─────────────────────────────────────────────────────── */

const SiteDataContext = createContext<SiteData>({
  profile: DEFAULT_PROFILE,
  pillars: DEFAULT_PILLARS,
  projects: [],
  experiences: DEFAULT_EXPERIENCES,
  loading: true,
  refresh: async () => {},
});

export const useSiteData = () => useContext(SiteDataContext);

/* ─── Helper to normalize project row from Supabase ─────────────── */
function mapRowToProject(row: any, index?: number): Project {
  const title = row.title || '';
  const id = row.id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const summary = row.summary || row.description || '';
  
  // Format architectureDetails from sections
  let architectureDetails: { title: string; points: string[] }[] = [];
  if (Array.isArray(row.sections) && row.sections.length > 0) {
    architectureDetails = row.sections.map((s: any) => ({
      title: s.heading || s.title || '',
      points: Array.isArray(s.bullets) ? s.bullets : Array.isArray(s.points) ? s.points : [],
    }));
  }

  const isFeatured = typeof row.is_featured === 'boolean' 
    ? row.is_featured 
    : false;

  const displayOrder = typeof row.display_order === 'number'
    ? row.display_order
    : (index ?? 0);

  return {
    id,
    title,
    kanji: row.kanji || '',
    category: row.category || 'Distributed Systems',
    badge: row.badge || '',
    subtitle: row.subtitle || summary,
    description: summary,
    image: row.image || '',
    tags: Array.isArray(row.tech_stacks) ? row.tech_stacks : Array.isArray(row.tags) ? row.tags : [],
    metrics: Array.isArray(row.metrics) ? row.metrics : [],
    overview: row.overview || summary,
    architectureDetails,
    links: {
      github: row.github_link || row.links?.github || '',
      live: row.live_link || row.links?.live || '',
      caseStudyText: row.case_study_text || '',
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
    return [];
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
          name:     row.name     || '',
          headline: row.headline || '',
          tagline:  row.tagline  || '',
          email:    row.email    || '',
          github:   row.github   || '',
          linkedin: row.linkedin || '',
          role:     row.role     || '',
          capability_pillars: Array.isArray(row.capability_pillars)
            ? row.capability_pillars
            : [],
        };
        setProfile(mappedProfile);
        try {
          localStorage.setItem('portfolio_profile_cache', JSON.stringify(mappedProfile));
        } catch {}
      } else {
        setProfile(DEFAULT_PROFILE);
      }

      if (pillarsRes.data) {
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
      } else {
        setPillars([]);
      }

      if (projectsRes.data) {
        const mapped = projectsRes.data.map((row: any, idx: number) => {
          return mapRowToProject(row, idx);
        });

        // Sort mapped projects by displayOrder if present
        mapped.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
        setProjects(mapped);
        try {
          localStorage.setItem('portfolio_projects_cache', JSON.stringify(mapped));
        } catch {}
      } else {
        setProjects([]);
      }

      if (expRes.data) {
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
      } else {
        setExperiences([]);
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
