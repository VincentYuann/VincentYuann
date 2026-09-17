import React from 'react';
import { Mail, Sparkles, Command } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PROFILE_INFO } from '../data/projects';

interface HeroProps {
  onOpenCommand: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCommand }) => {
  return (
    <header className="relative w-full max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
      {/* Top Navbar */}
      <nav className="flex items-center justify-between py-4 mb-14 border-b border-[#2A2F35]/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#1B2127] text-white flex items-center justify-center font-serif text-lg shadow-sm">
            V
          </div>
          <div>
            <span className="font-semibold text-sm tracking-tight block text-[#1B2127]">
              {PROFILE_INFO.name}
            </span>
            <span className="text-xs text-[#56616B] block">Software & AI Engineer</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Indicator */}
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#588A75]/10 text-[#2B5644] border border-[#588A75]/20">
            <span className="w-2 h-2 rounded-full bg-[#3F7C61] animate-pulse"></span>
            {PROFILE_INFO.status}
          </div>

          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommand}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-white/70 hover:bg-white text-[#56616B] hover:text-[#1B2127] border border-[#2A2F35]/10 shadow-xs transition-all cursor-pointer"
            title="Open Spotlight Search (Ctrl + K)"
          >
            <Command className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[#F0EFE9] text-[10px] text-[#4A5560]">⌘K</kbd>
          </button>

          {/* Social Icons */}
          <div className="flex items-center gap-1.5 pl-1">
            <a
              href={PROFILE_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-[#56616B] hover:text-[#1B2127] hover:bg-white/80 transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PROFILE_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-[#56616B] hover:text-[#1B2127] hover:bg-white/80 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PROFILE_INFO.email}`}
              className="p-2 rounded-lg text-[#56616B] hover:text-[#1B2127] hover:bg-white/80 transition-colors"
              aria-label="Email Vincent"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </nav>

      {/* Main Narrative Hero */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#3894B3]/10 text-[#21677E] border border-[#3894B3]/20 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Journey & Milestone River</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#1B2127] tracking-tight leading-[1.08] mb-6">
          Carving thoughtful paths from idea to system.
        </h1>

        <p className="text-lg sm:text-xl text-[#56616B] leading-relaxed mb-8 max-w-2xl font-normal">
          I'm <strong className="text-[#1B2127] font-semibold">Vincent Yuann</strong>, a software
          engineer specializing in real-time collaborative architectures, distributed backends, and
          applied LLM retrieval systems.
        </p>

        {/* Quick Stats / Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#2A2F35]/10 max-w-xl">
          <div>
            <div className="text-2xl font-serif text-[#1B2127]">3+ Flagship</div>
            <div className="text-xs text-[#56616B] mt-0.5">Production Systems</div>
          </div>
          <div>
            <div className="text-2xl font-serif text-[#1B2127]">&lt;30ms</div>
            <div className="text-xs text-[#56616B] mt-0.5">WebSocket Sync</div>
          </div>
          <div>
            <div className="text-2xl font-serif text-[#1B2127]">Dual-LLM</div>
            <div className="text-xs text-[#56616B] mt-0.5">Qdrant RAG Pipeline</div>
          </div>
        </div>
      </div>

      {/* Subtle stream source indicator */}
      <div className="mt-14 flex items-center gap-3 text-xs font-mono text-[#56616B]">
        <span className="w-3 h-3 rounded-full bg-[#3894B3]/20 border border-[#3894B3] flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3894B3]"></span>
        </span>
        <span>Follow the stream downward to trace the journey</span>
      </div>
    </header>
  );
};
