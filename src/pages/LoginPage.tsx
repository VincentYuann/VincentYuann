import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { useAuth } from '../lib/useAuth';

export const LoginPage: React.FC = () => {
  const { user, isAdmin, loading, signInWithGitHub } = useAuth();
  const [authMsg, setAuthMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // If already authenticated and verified as admin, redirect to admin page
  useEffect(() => {
    if (!loading && user && isAdmin) {
      const timer = setTimeout(() => {
        navigate('/admin');
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [user, isAdmin, loading, navigate]);

  return (
    <div className="min-h-screen bg-[#FAFBFD] text-gray-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Back to Site */}
      <div className="absolute top-6 left-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#57606A] hover:text-[#1B2127] bg-white border border-[#D0D7DE] px-3 py-1.5 rounded-lg shadow-xs transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-6">
        {/* Header Icon & Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#1B2127] text-white flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-5 h-5 text-[#A0D8E9]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B2127]">
            Portfolio Admin Login
          </h1>
          <p className="text-xs text-[#57606A] max-w-xs mx-auto">
            Administrative console access for Vincent Yuann. Authenticated via GitHub OAuth with PostgreSQL Row-Level Security.
          </p>
        </div>

        {/* Card Box */}
        <div className="bg-white py-8 px-6 sm:px-8 border border-[#D0D7DE] rounded-2xl shadow-sm space-y-6">
          {user ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-10 h-10 rounded-full bg-green-50 border border-green-200 text-green-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1B2127]">GitHub Account Connected</h3>
                <p className="text-xs text-[#57606A] mt-1 font-mono">{user.email}</p>
              </div>

              {isAdmin ? (
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 text-green-800 border border-green-200 rounded-xl text-xs flex items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
                    <span>Authorized Administrator Verified</span>
                  </div>
                  <Link
                    to="/admin"
                    className="w-full flex items-center justify-center py-2.5 px-4 bg-[#1B2127] hover:bg-[#2C343E] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
                  >
                    Go to Admin Console →
                  </Link>
                </div>
              ) : (
                <div className="p-3 bg-amber-50 text-amber-800 border border-amber-200 rounded-xl text-xs space-y-2 text-left">
                  <div className="flex items-center gap-2 font-bold">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Unauthorized Account</span>
                  </div>
                  <p className="text-[11px] text-amber-700">
                    Your GitHub email (<code>{user.email}</code>) is authenticated, but is not in the Postgres admin whitelist (<code>public.admin_users</code>).
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Primary: GitHub OAuth */}
              <div className="space-y-3">
                <button
                  onClick={async () => {
                    setIsSubmitting(true);
                    try {
                      await signInWithGitHub();
                    } catch (err: any) {
                      setAuthMsg({ type: 'error', text: err.message || 'Failed to initialize GitHub OAuth' });
                      setIsSubmitting(false);
                    }
                  }}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-[#1B2127] hover:bg-[#2C343E] text-white font-semibold text-xs shadow-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>{isSubmitting ? 'Redirecting to GitHub...' : 'Continue with GitHub OAuth'}</span>
                </button>
                <p className="text-[11px] text-[#8C959F] text-center">
                  One-click authentication using your authorized GitHub account.
                </p>
              </div>

              {authMsg && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                    authMsg.type === 'success'
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {authMsg.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-green-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  )}
                  <span>{authMsg.text}</span>
                </div>
              )}
            </div>
          )}

          {/* Security Notice */}
          <div className="pt-2 border-t border-[#E1E6EB] text-center">
            <span className="text-[11px] text-[#8C959F]">
              RLS verification is strictly enforced by PostgreSQL functions on every database transaction.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
