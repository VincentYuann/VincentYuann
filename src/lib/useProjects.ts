import { useState, useEffect, useCallback } from 'react';
import { supabase, DbProject } from './supabase';
import { FLAGSHIP_PROJECTS, RIVER_PEBBLES, FlagshipProject, RiverPebble } from '../data/projects';

export function useProjects() {
  const [flagships, setFlagships] = useState<FlagshipProject[]>(FLAGSHIP_PROJECTS);
  const [pebbles, setPebbles] = useState<RiverPebble[]>(RIVER_PEBBLES);
  const [allProjects, setAllProjects] = useState<FlagshipProject[]>(() => {
    const pebbleFlagships: FlagshipProject[] = RIVER_PEBBLES.map((peb) => ({
      id: peb.id,
      title: peb.title,
      category: peb.tag,
      subtitle: peb.description,
      description: peb.description,
      highlights: ['Microservice & sandbox practice', 'Self-contained architecture pattern'],
      stats: [{ label: 'Domain', value: peb.tag }],
      tags: peb.icon ? [{ name: peb.title, icon: peb.icon }] : [],
      stoneAccent: '#6E7E8E',
      githubUrl: peb.githubUrl,
      isFlagship: false,
    }));
    return [...FLAGSHIP_PROJECTS.map(f => ({ ...f, isFlagship: true })), ...pebbleFlagships];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error: sbError } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('order_index', { ascending: true });

      if (sbError) {
        // Log quietly and keep static fallback
        console.warn('Supabase projects fetch error, falling back to static data:', sbError.message);
        setError(sbError.message);
        return;
      }

      if (data && data.length > 0) {
        const loadedAll: FlagshipProject[] = data.map((p: DbProject) => ({
          id: p.id,
          title: p.title,
          category: p.category,
          subtitle: p.subtitle,
          description: p.description,
          highlights: p.highlights || [],
          stats: p.stats || [],
          tags: p.tags || [],
          stoneAccent: p.stone_accent || '#3894B3',
          liveUrl: p.live_url,
          githubUrl: p.github_url,
          imageUrl: p.image_url,
          detailsMarkdown: p.details_markdown,
          isFlagship: p.is_flagship,
        }));

        const loadedFlagships = loadedAll.filter((p) => p.isFlagship);
        const loadedPebbles: RiverPebble[] = loadedAll
          .filter((p) => !p.isFlagship)
          .map((p) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            tag: p.category,
            icon: p.tags?.[0]?.icon,
            githubUrl: p.githubUrl,
            liveUrl: p.liveUrl,
            imageUrl: p.imageUrl,
            detailsMarkdown: p.detailsMarkdown,
            highlights: p.highlights,
            stats: p.stats,
            tags: p.tags,
          }));

        setAllProjects(loadedAll);
        if (loadedFlagships.length > 0) setFlagships(loadedFlagships);
        if (loadedPebbles.length > 0) setPebbles(loadedPebbles);
        setError(null);
      }
    } catch (err: any) {
      console.warn('Network error fetching from Supabase, using local fallback:', err);
      setError(err?.message || 'Unknown network error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { allProjects, flagships, pebbles, loading, error, refreshProjects: fetchProjects };
}

