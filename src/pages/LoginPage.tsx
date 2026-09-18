import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { useAuth } from '../lib/useAuth';
import '../styles/login-page.css';

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
    <div className="login-page-container">
      {/* Back to Site */}
      <div className="login-back-wrapper">
        <Link
          to="/"
          className="login-back-btn"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </Link>
      </div>

      <div className="login-inner-container">
        {/* Header Icon & Title */}
        <div className="login-header-group">
          <div className="login-icon-badge">
            <Lock className="login-icon-glyph" />
          </div>
          <h1 className="login-title">
            Portfolio Admin Login
          </h1>
          <p className="login-subtitle">
            Administrative console access for Vincent Yuan. Authenticated via GitHub OAuth with PostgreSQL Row-Level Security.
          </p>
        </div>

        {/* Card Box */}
        <div className="login-card">
          {user ? (
            <div className="login-user-box">
              <div className="login-avatar-success">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">GitHub Account Connected</h3>
                <p className="login-email-text">{user.email}</p>
              </div>

              {isAdmin ? (
                <div className="space-y-3">
                  <div className="login-admin-banner">
                    <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
                    <span>Authorized Administrator Verified</span>
                  </div>
                  <Link
                    to="/admin"
                    className="login-go-admin-btn"
                  >
                    Go to Admin Console →
                  </Link>
                </div>
              ) : (
                <div className="login-unauthorized-banner">
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
                  className="login-oauth-btn"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>{isSubmitting ? 'Redirecting to GitHub...' : 'Continue with GitHub OAuth'}</span>
                </button>
                <p className="login-oauth-hint">
                  One-click authentication using your authorized GitHub account.
                </p>
              </div>

              {authMsg && (
                <div
                  className={
                    authMsg.type === 'success'
                      ? 'login-alert-success'
                      : 'login-alert-error'
                  }
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
          <div className="login-footer-notice">
            RLS verification is strictly enforced by PostgreSQL functions on every database transaction.
          </div>
        </div>
      </div>
    </div>
  );
};
