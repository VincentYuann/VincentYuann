import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Settings } from 'lucide-react';
import { PROFILE_INFO } from '../data/projects';
import { DiamondDivider } from './JapaneseMotifs';
import '../styles/footer.css';

import type { ProfileData } from '../lib/useProfile';

interface FooterProps {
  profile?: ProfileData;
  showCta?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ profile, showCta = true }) => {
  const currentProfile = profile || {
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
  return (
    <footer className="footer-container" id="contact">
      <DiamondDivider className="mb-12" />
      <div className="footer-grid">
        <div className="footer-main-col">
          <h3 className="footer-heading">
            Let's build something exceptional together.
          </h3>
          <p className="footer-bio">
            {currentProfile.about || (
              <>
                Currently available for Full-Stack and Applied AI Engineering roles. Whether you want to discuss real-time WebSockets, LLM vector search architectures, or just talk tech, I'd love to connect.
              </>
            )}
          </p>

          {/* Short & Concise Call-to-Action Card */}
          {showCta && (
            <div className="p-5 rounded-sm bg-card border border-border mb-6 space-y-3 shadow-2xs">
              <div className="space-y-1">
                <h4 className="text-base font-serif font-bold text-foreground">
                  Have a challenge or an open role?
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-lg">
                  Building real-time systems, applied AI, or looking for an engineer who values craft—let's talk.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-0.5">
                <Link
                  to="/contact"
                  className="footer-btn-primary group"
                >
                  <span>Hire Me / Get in Touch</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </Link>

                <Link
                  to="/projects"
                  className="footer-btn-secondary"
                >
                  <span>Browse Systems</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="footer-side-col">
          <div className="footer-colophon-box">
            <div className="footer-colophon-title">
              Architecture Colophon
            </div>
            <p className="footer-colophon-desc">
              Designed as an organic, static showcase. Powered by <strong>React 19</strong>,{' '}
              <strong>Vite</strong>, <strong>Tailwind CSS</strong>, and <strong>Supabase</strong> with Postgres RLS.
              Zero server overhead, zero exposed secrets, deployed automatically via GitHub Pages.
            </p>
          </div>

          <div className="footer-copyright flex items-center justify-between">
            <span>© {new Date().getFullYear()} {currentProfile.name}. Built with care and craft.</span>
            <Link
              to="/admin"
              className="opacity-40 hover:opacity-100 transition-opacity p-1 text-gray-500 hover:text-gray-900 cursor-pointer"
              title="Admin CMS & Settings"
            >
              <Settings className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
