import React from 'react';
import { Sparkles } from 'lucide-react';
import { PROFILE_INFO } from '../data/projects';
import '../styles/hero.css';

import type { ProfileData } from '../lib/useProfile';

interface HeroProps {
  profile?: ProfileData;
}

export const Hero: React.FC<HeroProps> = ({ profile }) => {
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
      {/* Main Narrative Hero */}
      <div className="hero-content pt-4 sm:pt-6">
        <div className="hero-badge">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Journey & Milestone River</span>
        </div>

        <h1 className="hero-headline">
          {currentProfile.tagline || 'Carving thoughtful paths from idea to system.'}
        </h1>

        <p className="hero-subtext">
          {currentProfile.about || (
            <>
              I'm <strong className="text-[#1B2127] font-semibold">{currentProfile.name}</strong>, a software engineer specializing in real-time collaborative architectures, distributed backends, and applied LLM retrieval systems.
            </>
          )}
        </p>

        {/* Quick Stats / Highlights */}
        <div className="hero-metrics-grid">
          <div>
            <div className="hero-metric-val">3+ Flagship</div>
            <div className="hero-metric-label">Production Systems</div>
          </div>
          <div>
            <div className="hero-metric-val">&lt;30ms</div>
            <div className="hero-metric-label">WebSocket Sync</div>
          </div>
          <div>
            <div className="hero-metric-val">Dual-LLM</div>
            <div className="hero-metric-label">Qdrant RAG Pipeline</div>
          </div>
        </div>
      </div>

      {/* Subtle stream source indicator */}
      <div className="hero-stream-hint">
        <span className="w-3 h-3 rounded-full bg-[#3894B3]/20 border border-[#3894B3] flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3894B3]"></span>
        </span>
        <span>Follow the stream downward to trace the journey</span>
      </div>
    </header>
  );
};
