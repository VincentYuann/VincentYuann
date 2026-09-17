import React from 'react';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './Icons';
import { TechBadge } from './TechBadge';
import type { FlagshipProject } from '../data/projects';

interface ProjectCardProps {
  project: FlagshipProject;
  isActive: boolean;
  onSelect?: (project: FlagshipProject) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, isActive }) => {
  return (
    <div
      className={`relative rounded-2xl p-6 sm:p-8 transition-all duration-500 backdrop-blur-md border ${
        isActive
          ? 'bg-white/95 border-[#3894B3]/40 shadow-xl shadow-[#3894B3]/10 translate-y-[-2px]'
          : 'bg-white/75 border-[#2A2F35]/10 shadow-sm hover:border-[#3894B3]/25 hover:bg-white/90'
      }`}
    >
      {/* Subtle indicator beacon */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <span className="text-xs font-mono tracking-wide uppercase px-2.5 py-1 rounded-md bg-[#F4F1EA] text-[#4F5962] border border-[#2A2F35]/5 font-medium">
          {project.category}
        </span>
        <div className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full transition-colors duration-300"
            style={{ backgroundColor: isActive ? project.stoneAccent : '#D0D7DE' }}
          />
          <span className="text-[11px] font-mono text-[#74808C]">
            {isActive ? 'Current Anchor' : 'Milestone'}
          </span>
        </div>
      </div>

      {/* Main Title & Subtitle */}
      <h3 className="text-2xl sm:text-3xl font-serif text-[#1B2127] mb-2 tracking-tight">
        {project.title}
      </h3>
      <p className="text-sm font-medium text-[#467385] mb-4">
        {project.subtitle}
      </p>

      {/* Description */}
      <p className="text-sm text-[#56616B] leading-relaxed mb-6 font-normal">
        {project.description}
      </p>

      {/* Architecture Highlights */}
      <div className="space-y-2 mb-6 pt-4 border-t border-[#2A2F35]/10">
        <div className="text-xs font-mono uppercase tracking-wider text-[#7C8894] mb-2">
          Key Architecture Patterns
        </div>
        {project.highlights.map((highlight, idx) => (
          <div key={idx} className="flex items-start gap-2 text-xs text-[#3E4750]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#3894B3] mt-0.5 shrink-0" />
            <span>{highlight}</span>
          </div>
        ))}
      </div>

      {/* Performance & Metric Badges */}
      <div className="grid grid-cols-3 gap-2 py-3 px-4 rounded-xl bg-[#F8F6F0] border border-[#2A2F35]/5 mb-6">
        {project.stats.map((stat, idx) => (
          <div key={idx} className="text-center">
            <div className="text-[10px] font-mono uppercase text-[#74808C] truncate">
              {stat.label}
            </div>
            <div className="text-xs font-semibold text-[#1B2127] font-mono mt-0.5 truncate">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Tech Stack Pills with Full Brand Logos */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag, idx) => (
          <TechBadge key={idx} name={tag.name} icon={tag.icon} />
        ))}
      </div>

      {/* Action Links */}
      <div className="flex items-center gap-3 pt-2">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-[#1B2127] text-white hover:bg-[#2C343D] transition-colors shadow-xs"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>Explore Source</span>
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-white text-[#1B2127] border border-[#2A2F35]/15 hover:border-[#3894B3] hover:text-[#21677E] transition-colors shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Live System ↗</span>
          </a>
        )}
      </div>
    </div>
  );
};
