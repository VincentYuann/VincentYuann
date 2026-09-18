import { useState, useEffect, useCallback } from 'react';
import { supabase, DbProfile } from './supabase';
import { PROFILE_INFO } from '../data/projects';

export interface ProfileData {
  name: string;
  role: string;
  status: string;
  email: string;
  github: string;
  linkedin: string;
  about: string;
  tagline: string;
  location: string;
}

const DEFAULT_PROFILE: ProfileData = {
  name: PROFILE_INFO.name,
  role: PROFILE_INFO.title,
  status: PROFILE_INFO.status,
  email: PROFILE_INFO.email,
  github: PROFILE_INFO.github,
  linkedin: PROFILE_INFO.linkedin,
  about: PROFILE_INFO.about,
  tagline: PROFILE_INFO.tagline,
  location: PROFILE_INFO.location,
};

export function useProfile() {
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error: sbError } = await supabase
        .from('profile_info')
        .select('*')
        .eq('id', 'vincent')
        .maybeSingle();

      if (sbError) {
        console.warn('Supabase profile fetch error, using local fallback:', sbError.message);
        setError(sbError.message);
        return;
      }

      if (data) {
        const prof = data as DbProfile;
        const normalizedName = prof.name === 'Vincent Yuann' ? 'Vincent Yuan' : (prof.name || DEFAULT_PROFILE.name);
        setProfile({
          name: normalizedName,
          role: prof.role || DEFAULT_PROFILE.role,
          status: prof.status || DEFAULT_PROFILE.status,
          email: prof.email || DEFAULT_PROFILE.email,
          github: prof.github || DEFAULT_PROFILE.github,
          linkedin: prof.linkedin || DEFAULT_PROFILE.linkedin,
          about: prof.about || DEFAULT_PROFILE.about,
          tagline: prof.tagline || DEFAULT_PROFILE.tagline,
          location: prof.location || DEFAULT_PROFILE.location,
        });
        setError(null);
      }
    } catch (err: any) {
      console.warn('Network error fetching profile, using fallback:', err);
      setError(err?.message || 'Unknown network error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, error, refreshProfile: fetchProfile };
}
