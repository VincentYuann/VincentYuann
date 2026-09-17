import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Settings } from 'lucide-react';
import { PROFILE_INFO } from '../data/projects';
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
      <div className="footer-grid">
        <div className="footer-main-col">
          <span className="footer-eyebrow">
            Get in touch
          </span>
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
            <div className="p-5 rounded-2xl bg-[#FAFBFD] border border-[#E1E6EB] mb-6 space-y-3 shadow-xs">
              <div className="space-y-1">
                <h4 className="text-base font-serif font-bold text-[#1B2127]">
                  Have a challenge or an open role?
                </h4>
                <p className="text-xs text-[#57606A] leading-relaxed max-w-lg">
                  Building real-time systems, applied AI, or looking for an engineer who values craft—let's talk.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-0.5">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1B2127] text-white text-xs font-semibold hover:bg-[#3894B3] shadow-xs transition-all cursor-pointer group"
                >
                  <span>Hire Me / Get in Touch</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </Link>

                <Link
                  to="/projects"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#D0D7DE] bg-white text-[#1B2127] text-xs font-semibold hover:bg-[#F6F8FA] transition-all"
                >
                  <span>Browse Systems</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#6E7E8E]" />
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
