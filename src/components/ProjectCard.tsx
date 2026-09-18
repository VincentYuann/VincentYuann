import React from 'react';
import { ExternalLink, ArrowRight, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';
import { TechBadge } from './TechBadge';
import type { FlagshipProject } from '../data/projects';
import '../styles/project-card.css';

interface ProjectCardProps {
  project: FlagshipProject;
  isActive: boolean;
  isAdmin?: boolean;
  onSelect?: (project: FlagshipProject) => void;
  onViewDetails?: (project: FlagshipProject) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  isActive, 
  onViewDetails 
}) => {
  return (
    <div className={`project-card ${isActive ? 'active' : ''}`}>
      {/* Top Bar: Category Pill & Milestone Beacon */}
      <div className="card-header">
        <span 
          className="card-category"
          style={{
            backgroundColor: `${project.stoneAccent}15`,
            color: project.stoneAccent,
            border: `1px solid ${project.stoneAccent}30`,
          }}
        >
          {project.category}
        </span>

        <div className="card-beacon">
          <span
            className="card-beacon-dot"
            style={{ backgroundColor: isActive ? project.stoneAccent : '#D0D7DE' }}
          />
          <span className="card-beacon-text">
            {isActive ? 'Current Anchor' : 'Milestone'}
          </span>
        </div>
      </div>

      {/* Visual Showcase: Project Screenshot or Stylized Architectural Blueprint */}
      <div 
        onClick={() => onViewDetails?.(project)}
        className="card-visual-frame cursor-pointer group/frame"
        style={{ 
          background: project.imageUrl 
            ? '#1B2127' 
            : `linear-gradient(135deg, ${project.stoneAccent}15 0%, #FAFBFD 50%, ${project.stoneAccent}10 100%)` 
        }}
        title={`Inspect ${project.title} Architecture`}
      >
        {project.imageUrl ? (
          <img 
            src={project.imageUrl} 
            alt={`${project.title} Preview`} 
            className="card-visual-image" 
            loading="lazy"
          />
        ) : (
          <div className="card-blueprint-preview">
            <div className="card-blueprint-badge">
              <Layers className="w-3.5 h-3.5 text-[#3894B3]" />
              <span>Architectural Blueprint</span>
            </div>
            <div className="card-blueprint-center">
              <span className="card-blueprint-title" style={{ color: project.stoneAccent }}>
                {project.title}
              </span>
              <span className="card-blueprint-hint">
                <span>Click to inspect system deep-dive</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Name (Title) & Brief Description */}
      <div className="space-y-1">
        {onViewDetails ? (
          <button
            type="button"
            onClick={() => onViewDetails(project)}
            className="text-left group/title cursor-pointer w-full"
          >
            <h3 className="card-title group-hover/title:text-[#3894B3] transition-colors flex items-center justify-between">
              <span>{project.title}</span>
              <ArrowRight className="w-4 h-4 text-[#8C959F] group-hover/title:text-[#3894B3] group-hover/title:translate-x-1 transition-all" />
            </h3>
          </button>
        ) : (
          <h3 className="card-title">
            {project.title}
          </h3>
        )}
        <p className="card-subtitle line-clamp-2">
          {project.subtitle || project.description}
        </p>
      </div>

      {/* Tech Stack Pills (All tags displayed without +1 limit) */}
      <div className="card-tags-list">
        {project.tags.map((tag, idx) => (
          <TechBadge key={idx} name={tag.name} icon={tag.icon} />
        ))}
      </div>

      {/* Action Links: Code & Live (Optional), plus Details */}
      <div className="card-actions">
        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="card-btn-secondary"
              title="View GitHub Repository"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Code</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="card-btn-secondary"
              title="Open Live Demonstration"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#3894B3]" />
              <span>Live Demo</span>
            </a>
          )}
        </div>

        {onViewDetails && (
          <button
            type="button"
            onClick={() => onViewDetails(project)}
            className="card-btn-primary"
          >
            <span>Architecture Deep-Dive →</span>
          </button>
        )}
      </div>
    </div>
  );
};
