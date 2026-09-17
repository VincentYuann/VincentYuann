import { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabase';
import type { User, Session } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAdminStatus = useCallback(async (currentUser: User | null) => {
    if (!currentUser) {
      setIsAdmin(false);
      return;
    }

    try {
      const { data, error } = await supabase.rpc('is_admin');
      if (!error && data === true) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch {
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    const initSession = async () => {
      // 1. Check if the URL hash contains OAuth tokens (handles HashRouter double hash: #/admin#access_token=...)
      const currentHash = window.location.hash;
      if (currentHash.includes('access_token=')) {
        try {
          const tokenPart = currentHash.substring(currentHash.indexOf('access_token='));
          const params = new URLSearchParams(tokenPart);
          const access_token = params.get('access_token');
          const refresh_token = params.get('refresh_token');

          if (access_token && refresh_token) {
            const { data, error } = await supabase.auth.setSession({
              access_token,
              refresh_token,
            });

            // Clean the URL hash back to #/admin so tokens are not exposed in address bar
            window.location.hash = '#/admin';

            if (!error && data.session) {
              setSession(data.session);
              const currentUser = data.session.user ?? null;
              setUser(currentUser);
              await checkAdminStatus(currentUser);
              setLoading(false);
              return;
            }
          }
        } catch (err) {
          console.error('Error recovering OAuth session from URL hash:', err);
        }
      }

      // 2. Standard getSession check
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      await checkAdminStatus(currentUser);
      setLoading(false);
    };

    initSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      checkAdminStatus(currentUser);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [checkAdminStatus]);

  const signInWithGitHub = async (targetRedirect?: string) => {
    const redirectUrl = targetRedirect || `${window.location.origin}${window.location.pathname}#/admin`;
    return supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: redirectUrl,
      },
    });
  };

  const signInWithEmail = async (email: string, targetRedirect?: string) => {
    const redirectUrl = targetRedirect || `${window.location.origin}${window.location.pathname}#/admin`;
    return supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });
  };

  const signOut = async () => {
    setIsAdmin(false);
    return supabase.auth.signOut();
  };

  return {
    user,
    session,
    isAdmin,
    loading,
    signInWithGitHub,
    signInWithEmail,
    signOut,
  };
}
