import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Edit3, ArrowDown } from 'lucide-react';
import { PROFILE_INFO } from '../data/projects';
import type { ProfileData } from '../lib/useProfile';
import '../styles/hero.css';

interface HeroProps {
  profile?: ProfileData;
  isAdmin?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ profile, isAdmin = false }) => {
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
    <header className="hero-wrapper">
      <div className="hero-content">
        {/* Badge & Admin Quick Edit Shortcut */}
        <div className="hero-badge-row">
          <div className="hero-badge">
            <Sparkles className="w-3.5 h-3.5 text-[#3894B3]" />
            <span>Architecture & Systems Engineering</span>
          </div>

          {isAdmin && (
            <Link
              to="/admin?tab=profile"
              className="hero-admin-pill"
              title="Edit Profile & Hero text in Admin CMS"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit Profile in CMS ✎</span>
            </Link>
          )}
        </div>

        {/* High-Impact Headline */}
        <h1 className="hero-headline">
          {currentProfile.tagline || 'Carving thoughtful paths from idea to system.'}
        </h1>

        {/* Crisp One-Paragraph Intro */}
        <p className="hero-subtext">
          {currentProfile.about || (
            <>
              Hi, I'm <strong className="text-[#1B2127] font-semibold">{currentProfile.name}</strong>. I design and build production-grade web systems, real-time synchronization engines, and low-latency LLM retrieval pipelines.
            </>
          )}
        </p>

        {/* Core Architecture Focus Chips */}
        <div className="hero-focus-chips">
          <span className="hero-focus-chip">
            <span className="hero-focus-dot bg-[#3894B3]" />
            Full-Stack Systems
          </span>
          <span className="hero-focus-chip">
            <span className="hero-focus-dot bg-[#588A75]" />
            Real-Time WebSockets
          </span>
          <span className="hero-focus-chip">
            <span className="hero-focus-dot bg-[#8250DF]" />
            Applied LLM & Vector RAG
          </span>
          <span className="hero-focus-chip">
            <span className="hero-focus-dot bg-[#D97706]" />
            Distributed Backends
          </span>
        </div>

        {/* Standout Capability Metrics */}
        <div className="hero-metrics-grid">
          <div className="hero-metric-card">
            <div className="hero-metric-val">3+ Flagship</div>
            <div className="hero-metric-label">Production Systems</div>
          </div>
          <div className="hero-metric-card">
            <div className="hero-metric-val">&lt;30ms</div>
            <div className="hero-metric-label">Sync Latency</div>
          </div>
          <div className="hero-metric-card">
            <div className="hero-metric-val">Dual-LLM</div>
            <div className="hero-metric-label">Vector RAG Pipeline</div>
          </div>
        </div>
      </div>

      {/* Stream Source Navigation Hint */}
      <div className="hero-stream-hint">
        <span className="w-3 h-3 rounded-full bg-[#3894B3]/20 border border-[#3894B3] flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3894B3]"></span>
        </span>
        <span>Scroll to explore the flagship architecture timeline</span>
        <ArrowDown className="w-3.5 h-3.5 text-[#3894B3] animate-bounce" />
      </div>
    </header>
  );
};
