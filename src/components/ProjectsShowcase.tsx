import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { FLAGSHIP_PROJECTS, type FlagshipProject } from '../data/projects';

interface ProjectsShowcaseProps {
  flagships?: FlagshipProject[];
  allProjects?: FlagshipProject[];
  isAdmin?: boolean;
  onOpenGallery?: (filter?: string) => void;
  onViewDetails?: (project: FlagshipProject) => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({
  flagships = FLAGSHIP_PROJECTS,
  isAdmin = false,
  onOpenGallery,
  onViewDetails,
}) => {
  const navigate = useNavigate();

  const handleDetails = (project: FlagshipProject) => {
    if (onViewDetails) {
      onViewDetails(project);
    } else {
      navigate(`/projects/${project.id}`);
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* Architectural Section Header (from Website Overall Theme & Day Theme References) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-border">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-accent" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-semibold">
              FEATURED SYSTEMS & ARCHITECTURE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-foreground tracking-tight">
            Engineered for Scale & Precision
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed">
            Full-stack distributed applications, low-latency WebSockets, and applied RAG pipelines.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onOpenGallery ? onOpenGallery() : navigate('/projects')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm border border-border bg-card hover:bg-muted text-foreground text-[11px] font-sans font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-2xs group"
          >
            <span>View All Systems ({flagships.length})</span>
            <ArrowRight className="size-3.5 text-accent group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Architectural Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flagships.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            isActive={idx === 0}
            isAdmin={isAdmin}
            onViewDetails={handleDetails}
          />
        ))}
      </div>

      {/* Subtle Studio Philosophy Signoff */}
      <div className="pt-8 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-sans">
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
