import { useState, useEffect, useCallback } from 'react';
import { supabase, DbProject } from './supabase';
import type { FlagshipProject, RiverPebble } from '../data/projects';

export function useProjects() {
  const [flagships, setFlagships] = useState<FlagshipProject[]>([]);
  const [pebbles, setPebbles] = useState<RiverPebble[]>([]);
  const [allProjects, setAllProjects] = useState<FlagshipProject[]>([]);
  const [loading, setLoading] = useState(true);
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
        console.warn('Supabase projects fetch error:', sbError.message);
        setError(sbError.message);
        return;
      }

      if (data) {
        const loadedAll: FlagshipProject[] = data.map((p: DbProject) => ({
          id: p.id,
          title: p.title,
          category: p.category,
          subtitle: p.subtitle,
          description: p.description,
          highlights: p.highlights || [],
          stats: p.stats || [],
          tags: p.tags || [],
          stoneAccent: p.stone_accent || '#B5482E',
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
        setFlagships(loadedFlagships);
        setPebbles(loadedPebbles);
        setError(null);
      }
    } catch (err: any) {
      console.warn('Network error fetching projects from Supabase:', err);
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

