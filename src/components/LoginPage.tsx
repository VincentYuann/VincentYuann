import React, { useState } from 'react';
import { supabase, formatErrorMessage, getOAuthRedirectUrl } from '../lib/supabase';
import { toast } from 'sonner';

interface LoginPageProps {
  onNavigate: (view: 'home' | 'projects' | 'resume' | 'login' | 'edit') => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGithubLogin = async () => {
    if (!supabase) {
      const msg = 'Supabase is not configured.';
      setError(msg);
      toast.error(msg);
      return;
    }
    setLoading(true);
    setError('');
    const redirectUrl = getOAuthRedirectUrl();
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: redirectUrl,
      },
    });
    if (authError) {
      const msg = formatErrorMessage(authError);
      setError(msg);
      toast.error(msg);
      setLoading(false);
    }
    // On success Supabase redirects the page; the auth listener in App.tsx handles navigation.
  };

  return (
    <div className="min-h-screen bg-light-canvas dark:bg-dark-canvas flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="mb-10 flex flex-col items-center gap-4">
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-terracotta"
          aria-label="Vincent Yuan"
        >
          {/* Enso-inspired circular seal placeholder */}
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="4 6"
            opacity="0.35"
          />
          <circle
            cx="32"
            cy="32"
            r="20"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.6"
          />
          {/* Stylised V glyph */}
          <path
            d="M22 22 L32 44 L42 22"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-serif text-xl text-light-ink dark:text-dark-ink tracking-wide">
          Vincent Yuan
        </span>
        <span className="font-sans text-xs text-light-ink-muted dark:text-dark-ink-muted uppercase tracking-widest">
          Admin Access
        </span>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-sm bg-light-surface-card dark:bg-[#181920] border border-light-border dark:border-[#2D3039] rounded-2xl p-8 shadow-akari dark:shadow-night-glow flex flex-col gap-5">
        <h1 className="font-serif text-lg text-light-ink dark:text-dark-ink text-center">
          Sign in to edit
        </h1>

        <button
          onClick={handleGithubLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-lg bg-[#24292e] hover:bg-[#1a1e22] text-white font-sans text-sm font-medium tracking-wide transition-colors disabled:opacity-60"
        >
          {/* GitHub SVG icon */}
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          {loading ? 'Redirecting…' : 'Continue with Github'}
        </button>

        {error && (
          <p className="font-sans text-xs text-red-500 text-center">{error}</p>
        )}

        <button
          onClick={() => onNavigate('home')}
          className="font-sans text-xs text-light-ink-muted dark:text-dark-ink-muted hover:text-terracotta transition-colors text-center"
        >
          ← Back to portfolio
        </button>
      </div>
    </div>
  );
};
