import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Command, Settings } from 'lucide-react';
import { GithubIcon } from './Icons';
import type { ProfileData } from '../lib/useProfile';

interface NavbarProps {
  onOpenCommand: () => void;
  profile: ProfileData;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommand, profile }) => {
  const location = useLocation();

  return (
    <nav className="border-b border-[#E1E6EB] bg-white/95 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between transition-all">
      {/* Brand Identity */}
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-[#1B2127] text-white flex items-center justify-center font-serif text-sm font-bold shadow-xs group-hover:scale-105 transition-transform">
            V
          </div>
          <div>
            <span className="text-sm font-bold text-[#1B2127] block leading-tight group-hover:text-[#3894B3] transition-colors">
              {profile.name}
            </span>
            <span className="text-[11px] text-[#6E7E8E] font-medium hidden sm:block">
              {profile.role}
            </span>
          </div>
        </Link>
      </div>

      {/* Nav Links & Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Status Pill */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#EBF6F9] border border-[#3894B3]/30 text-[#2B6D83] text-[11px] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3894B3] animate-pulse" />
          <span>{profile.status}</span>
        </div>

        {/* Projects Gallery */}
        <Link
          to="/projects"
          className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
            location.pathname.startsWith('/projects')
              ? 'bg-[#F6F8FA] text-[#1B2127] border-[#D0D7DE] font-bold'
              : 'text-[#57606A] hover:text-[#1B2127] hover:bg-[#F6F8FA] border-[#D0D7DE]'
          }`}
        >
          Projects Gallery
        </Link>

        {/* Spotlight Command Search Trigger */}
        <button
          onClick={onOpenCommand}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#F6F8FA] hover:bg-[#E1E6EB] border border-[#D0D7DE] text-xs text-[#57606A] hover:text-[#1B2127] transition-all cursor-pointer shadow-xs"
          title="Open Spotlight Search (Ctrl + K / Cmd + K)"
        >
          <Command className="w-3.5 h-3.5 text-[#6E7E8E]" />
          <span className="hidden md:inline">Search</span>
          <kbd className="px-1 py-0.5 rounded bg-white text-[10px] text-[#4A5560] font-mono border border-[#D0D7DE]">⌘K</kbd>
        </button>

        {/* Actions Cluster: Hire Me, GitHub, Settings */}
        <div className="flex items-center gap-1 sm:gap-2 ml-1 pl-1 sm:pl-2 border-l border-[#E1E6EB]">
          {/* Hire Me Button */}
          <Link
            to="/contact"
            className="px-3 py-1.5 rounded-lg bg-[#1B2127] hover:bg-[#3894B3] text-white text-xs font-semibold transition-all shadow-xs flex items-center gap-1"
            title="Hire Me / Send Message"
          >
            Hire Me
          </Link>

          {/* GitHub Profile */}
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-md text-[#57606A] hover:text-[#1B2127] hover:bg-[#F6F8FA] transition-colors"
            title="GitHub Profile"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* Admin Settings */}
          <Link
            to="/admin"
            className={`p-1.5 rounded-md transition-colors ${
              location.pathname.startsWith('/admin')
                ? 'text-[#1B2127] bg-[#F6F8FA]'
                : 'text-[#8C959F] hover:text-[#1B2127] hover:bg-[#F6F8FA]'
            }`}
            title="Admin CMS & Settings"
            aria-label="Admin Settings"
          >
            <Settings className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </nav>
  );
};
