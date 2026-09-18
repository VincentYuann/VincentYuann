import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { DiamondDivider } from './JapaneseMotifs';
import type { FlagshipProject } from '../data/projects';

interface ProjectsShowcaseProps {
  flagships?: FlagshipProject[];
  allProjects?: FlagshipProject[];
  isAdmin?: boolean;
  onOpenGallery?: (filter?: string) => void;
  onViewDetails?: (project: FlagshipProject) => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({
  flagships = [],
  isAdmin = false,
  onOpenGallery,
  onViewDetails,
}) => {
  const navigate = useNavigate();
  const [activeProjectId, setActiveProjectId] = useState<string>(flagships[0]?.id || '');

  const handleDetails = (project: FlagshipProject) => {
    if (onViewDetails) {
      onViewDetails(project);
    } else {
      navigate(`/projects/${project.id}`);
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Centered Diamond Rule Separator from Day theme and components */}
      <DiamondDivider />

      {/* Architectural Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-accent" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-semibold">
              FEATURED SYSTEMS & ARCHITECTURE
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-normal text-foreground tracking-tight">
            Engineered for Scale & Precision
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed">
            Applied RAG pipelines, low-latency WebSocket rooms, and distributed persistence.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onOpenGallery ? onOpenGallery() : navigate('/projects')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-border bg-card hover:bg-muted text-foreground text-[11px] font-sans font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-2xs group"
          >
            <span>Index ({flagships.length})</span>
            <ArrowRight className="size-3.5 text-accent group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Architectural Project Cards Grid with Interactive Focus, or Serene Empty State */}
      {flagships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flagships.map((project) => (
            <div 
              key={project.id}
              onMouseEnter={() => setActiveProjectId(project.id)}
              className="transition-transform duration-200"
            >
              <ProjectCard
                project={project}
                isActive={activeProjectId === project.id}
                isAdmin={isAdmin}
                onViewDetails={handleDetails}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 px-6 text-center border border-border/80 rounded-sm bg-card/60 backdrop-blur-xs space-y-4 max-w-xl mx-auto my-8 shadow-2xs">
          <div className="size-10 mx-auto rounded-sm border border-accent/30 bg-accent/10 flex items-center justify-center text-accent font-serif text-lg">
            ◇
          </div>
          <div className="space-y-1.5">
            <h3 className="text-xl font-serif font-normal text-foreground">
              Studio Archive in Preparation
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Architectural systems are dynamically synchronized via Supabase PostgreSQL. 
              {isAdmin ? ' Manage, publish, or seed curated systems directly in the Admin Console.' : ' Check back soon as new production architectures are published.'}
            </p>
          </div>
          {isAdmin && (
            <div className="pt-2">
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold uppercase tracking-wider font-sans transition-all shadow-xs"
              >
                <span>Manage in Admin Console</span>
                <span>→</span>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Centered Diamond Rule Separator */}
      <DiamondDivider className="my-6" />

      {/* Subtle Studio Philosophy Signoff */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-sans">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-foreground font-semibold">01 / ARCHITECTURE</span>
          <span className="text-border">|</span>
          <span>Designed with restraint, built with modern TypeScript and Python.</span>
        </div>

        <Link
          to="/projects"
          className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-accent hover:underline"
        >
          <span>Explore complete index</span>
          <ArrowRight className="size-3" />
        </Link>
      </div>
    </section>
  );
};
