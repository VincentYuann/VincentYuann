import React from 'react';
import { ExternalLink, ArrowRight, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';
import { TechBadge } from './TechBadge';
import { CornerBrackets } from './JapaneseMotifs';
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
    <div className={`project-card relative z-0 ${isActive ? 'active card-stack' : ''}`}>
      {/* Top Bar: Category Pill & System Indicator */}
      <div className="card-header relative z-10">
        <span 
          className="card-category text-[10px] font-sans font-semibold uppercase tracking-wider px-2.5 py-1 rounded-sm border"
          style={{
            backgroundColor: `${project.stoneAccent || '#B5482E'}12`,
            color: project.stoneAccent || '#B5482E',
            borderColor: `${project.stoneAccent || '#B5482E'}35`,
          }}
        >
          {project.category}
        </span>

        <div className="card-beacon">
          <span
            className="card-beacon-dot size-2 rounded-full"
            style={{ backgroundColor: project.stoneAccent || '#B5482E' }}
          />
          <span className="card-beacon-text font-sans text-[10px] tracking-wider uppercase font-semibold text-muted-foreground">
            {isActive ? 'Featured System' : 'Architecture'}
          </span>
        </div>
      </div>

      {/* Visual Showcase: Architectural Screenshot with Corner Brackets & Parchment Treatment */}
      <div 
        onClick={() => onViewDetails?.(project)}
        className="card-visual-frame cursor-pointer group/frame relative image-parchment image-faded-contrast"
        title={`Inspect ${project.title} Architecture`}
      >
        <CornerBrackets size={10} className="z-10" />
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
              <Layers className="size-3.5 text-accent" />
              <span>Architectural Blueprint</span>
            </div>
            <div className="card-blueprint-center">
              <span className="card-blueprint-title" style={{ color: project.stoneAccent }}>
                {project.title}
              </span>
              <span className="card-blueprint-hint">
                <span>Click to inspect system deep-dive</span>
                <ArrowRight className="size-3" />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Name (Title) & Brief Description */}
      <div className="space-y-1 relative z-10">
        {onViewDetails ? (
          <button
            type="button"
            onClick={() => onViewDetails(project)}
            className="text-left group/title cursor-pointer w-full"
          >
            <h3 className="card-title group-hover/title:text-accent flex items-center justify-between text-foreground">
              <span>{project.title}</span>
              <ArrowRight className="size-4 text-muted-foreground group-hover/title:text-accent group-hover/title:translate-x-1 transition-all" />
            </h3>
          </button>
        ) : (
          <h3 className="card-title text-foreground">
            {project.title}
          </h3>
        )}
        <p className="card-subtitle line-clamp-2 text-muted-foreground">
          {project.subtitle || project.description}
        </p>
      </div>

      {/* Tech Stack Pills */}
      <div className="card-tags-list relative z-10">
        {project.tags.map((tag, idx) => (
          <TechBadge key={idx} name={tag.name} icon={tag.icon} />
        ))}
      </div>

      {/* Action Links: Code & Live (Optional), plus Details */}
      <div className="card-actions relative z-10">
        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="card-btn-secondary"
              title="View GitHub Repository"
            >
              <GithubIcon className="size-3.5" />
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
              <ExternalLink className="size-3.5 text-accent" />
              <span>Live Demo</span>
            </a>
          )}
        </div>

        {onViewDetails && (
          <button
            type="button"
            onClick={() => onViewDetails(project)}
            className="card-btn-details group/btn"
          >
            <span>Architecture Deep-Dive</span>
            <ArrowRight className="size-3.5 text-accent group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};
