import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Edit3, Layers } from 'lucide-react';
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
  isAdmin = false,
  onViewDetails 
}) => {
  return (
    <div className={`project-card ${isActive ? 'active' : ''}`}>
      {/* Top Bar: Category Pill, Milestone Beacon, & Admin Quick Edit */}
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

        <div className="flex items-center gap-3">
          {isAdmin && (
            <Link
              to={`/admin?tab=projects&edit=${project.id}`}
              className="card-admin-edit-btn"
              title="Edit this project in Admin CMS"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit ✎</span>
            </Link>
          )}

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
            <div className="flex items-center justify-between text-[10px] font-mono text-[#6E7E8E]">
              <span>ID: {project.id}</span>
              <span>{project.stats?.[0]?.label}: {project.stats?.[0]?.value}</span>
            </div>
          </div>
        )}
      </div>

      {/* Title & Concise Value Tagline */}
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
        <p className="card-subtitle">
          {project.subtitle}
        </p>
      </div>

      {/* Standout Performance & Metrics Badges (High Contrast Grid) */}
      {project.stats && project.stats.length > 0 && (
        <div className="card-stats-grid">
          {project.stats.slice(0, 3).map((stat, idx) => (
            <div key={idx} className="card-stat-cell">
              <span className="card-stat-label">
                {stat.label}
              </span>
              <span className="card-stat-val">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Tech Stack Pills (Top Core Technologies) */}
      <div className="card-tags-list">
        {project.tags.slice(0, 5).map((tag, idx) => (
          <TechBadge key={idx} name={tag.name} icon={tag.icon} />
        ))}
        {project.tags.length > 5 && (
          <span className="text-[11px] font-mono text-[#57606A] px-1.5 py-0.5 rounded bg-[#F6F8FA] border border-[#E1E6EB]">
            +{project.tags.length - 5}
          </span>
        )}
      </div>

      {/* Action Links */}
      <div className="card-actions">
        {onViewDetails && (
          <button
            type="button"
            onClick={() => onViewDetails(project)}
            className="card-btn-primary"
          >
            <span>Architecture Deep-Dive →</span>
          </button>
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
      </div>
    </div>
  );
};
