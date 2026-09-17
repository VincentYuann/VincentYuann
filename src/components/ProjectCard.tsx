import React from 'react';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './Icons';
import { TechBadge } from './TechBadge';
import type { FlagshipProject } from '../data/projects';
import '../styles/project-card.css';

interface ProjectCardProps {
  project: FlagshipProject;
  isActive: boolean;
  onSelect?: (project: FlagshipProject) => void;
  onViewDetails?: (project: FlagshipProject) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, isActive, onViewDetails }) => {
  return (
    <div className={`project-card ${isActive ? 'active' : ''}`}>
      {/* Subtle indicator beacon */}
      <div className="card-header">
        <span className="card-category">
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

      {/* Main Title & Subtitle */}
      {onViewDetails ? (
        <button
          type="button"
          onClick={() => onViewDetails(project)}
          className="text-left group cursor-pointer"
        >
          <h3 className="card-title group-hover:text-[#3894B3] transition-colors flex items-center gap-2">
            <span>{project.title}</span>
            <span className="text-xs font-mono font-normal opacity-0 group-hover:opacity-100 transition-opacity text-[#3894B3]">
              [view details ↗]
            </span>
          </h3>
        </button>
      ) : (
        <h3 className="card-title">
          {project.title}
        </h3>
      )}
      <p className="card-subtitle">
        {project.subtitle}
      </p>

      {/* Description */}
      <p className="card-desc">
        {project.description}
      </p>

      {/* Architecture Highlights */}
      <div className="card-highlights-section">
        <div className="card-highlights-label">
          Key Architecture Patterns
        </div>
        {project.highlights.map((highlight, idx) => (
          <div key={idx} className="card-highlight-item">
            <CheckCircle2 className="card-highlight-icon" />
            <span>{highlight}</span>
          </div>
        ))}
      </div>

      {/* Performance & Metric Badges */}
      <div className="card-stats-grid">
        {project.stats.map((stat, idx) => (
          <div key={idx} className="card-stat-cell">
            <div className="card-stat-label">
              {stat.label}
            </div>
            <div className="card-stat-val">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Tech Stack Pills with Full Brand Logos */}
      <div className="card-tags-list">
        {project.tags.map((tag, idx) => (
          <TechBadge key={idx} name={tag.name} icon={tag.icon} />
        ))}
      </div>

      {/* Action Links */}
      <div className="card-actions">
        {onViewDetails && (
          <button
            type="button"
            onClick={() => onViewDetails(project)}
            className="card-btn-primary bg-[#1B2127] text-white hover:bg-[#2C343E] border border-[#1B2127]"
          >
            <span>Architecture Deep-Dive →</span>
          </button>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="card-btn-secondary"
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
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Live Demo ↗</span>
          </a>
        )}
      </div>
    </div>
  );
};
