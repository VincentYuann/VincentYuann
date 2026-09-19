import React, { useState } from 'react';
import { ArrowLeft, Search, ExternalLink, Github, Filter, Layers } from 'lucide-react';
import { Project } from '../data/projects';
import { ProjectDetailModal } from './ProjectDetailModal';
import { EnsoOrbital } from './EnsoOrbital';
import { HankoStamp } from './HankoStamp';
import { useSiteData } from '../context/SiteDataContext';

interface ProjectsPageProps {
  onNavigate?: (view: 'home' | 'projects' | 'resume', sectionId?: string) => void;
}

const CATEGORIES = ['All', 'Distributed Systems', 'Generative AI', 'Creative Tech', 'Full-Stack'] as const;

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { projects } = useSiteData();

  const allProjects = projects && projects.length > 0 ? projects : [];

  const filteredProjects = allProjects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Header Section */}
      <div className="mb-10 pb-6 border-b border-light-border dark:border-dark-border">
        <button
          onClick={() => onNavigate?.('home')}
          className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-light-ink-muted dark:text-dark-ink-muted hover:text-terracotta transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Return to Portfolio</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <HankoStamp className="h-7 w-7" />
              <h1 className="font-serif text-3xl sm:text-4xl text-light-ink dark:text-dark-ink">
                All Engineering Works
              </h1>
              <span className="font-serif text-sm text-terracotta dark:text-ochre">作品全集</span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-light-ink-muted dark:text-dark-ink-muted mt-1 max-w-2xl">
              A comprehensive archive of production systems, ambient computing interfaces, distributed microservices, and generative AI platforms built with deliberate restraint.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-light-ink-muted dark:text-dark-ink-muted" />
            <input
              type="text"
              placeholder="Search systems, tags, stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-light-surface-card dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg text-xs font-sans text-light-ink dark:text-dark-ink focus:outline-none focus:border-terracotta transition-colors"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-light-ink-subtle dark:text-dark-ink-subtle mr-2 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-full text-xs font-sans transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-terracotta text-white font-medium shadow-xs'
                  : 'bg-light-surface-muted/90 dark:bg-dark-surface/90 text-light-ink-muted dark:text-dark-ink-muted hover:text-light-ink dark:hover:text-dark-ink border border-light-border dark:border-dark-border'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid: Compact Widgets */}
      {filteredProjects.length === 0 ? (
        <div className="p-16 text-center rounded-xl bg-light-surface-card dark:bg-dark-surface border border-light-border dark:border-dark-border">
          <Layers className="w-10 h-10 text-light-ink-subtle dark:text-dark-ink-subtle mx-auto mb-3" />
          <h3 className="font-serif text-lg text-light-ink dark:text-dark-ink">
            No projects matched your criteria
          </h3>
          <p className="font-sans text-xs text-light-ink-muted dark:text-dark-ink-muted mt-1">
            Try adjusting your search keywords or resetting the category filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-terracotta text-white text-xs font-sans rounded-md"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="interactive-card group relative bg-light-surface-card dark:bg-[#181920] border border-light-border dark:border-[#2D3039] rounded-xl overflow-visible p-5 shadow-akari dark:shadow-night-glow hover:border-terracotta/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Ensō Bloom: Top-left only on hover */}
              <EnsoOrbital
                placement="top-left"
                size={80}
                hoverOnly={true}
              />

              {/* Corner Hairline Brackets */}
              <div className="corner-bracket corner-bracket-tl absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-ochre/40 dark:border-ochre/30 pointer-events-none" />
              <div className="corner-bracket corner-bracket-tr absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-ochre/40 dark:border-ochre/30 pointer-events-none" />
              <div className="corner-bracket corner-bracket-bl absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b border-l border-ochre/40 dark:border-ochre/30 pointer-events-none" />
              <div className="corner-bracket corner-bracket-br absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b border-r border-ochre/40 dark:border-ochre/30 pointer-events-none" />

              <div>
                {/* Thumbnail Image Header */}
                <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden mb-4 bg-light-surface-muted dark:bg-[#121316]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Subtle watermark stamp */}
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/40 backdrop-blur-xs text-[11px] font-serif text-white/90">
                    {project.kanji}
                  </div>
                </div>

                {/* Category & Title */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-terracotta font-semibold">
                    {project.category}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-medium text-light-ink dark:text-dark-ink group-hover:text-terracotta transition-colors line-clamp-1">
                  {project.title}
                </h3>

                <p className="font-sans text-xs text-light-ink-muted dark:text-dark-ink-muted leading-relaxed line-clamp-2 mt-2 mb-4 font-light">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-light-surface-muted/80 dark:bg-dark-surface-muted/80 border border-light-border/60 dark:border-dark-border/60 text-[10px] font-mono text-light-ink-muted dark:text-dark-ink-muted"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono text-light-ink-subtle dark:text-dark-ink-subtle">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Card Action Foot */}
                <div className="pt-3 border-t border-light-border/60 dark:border-dark-border/60 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="font-sans text-[11px] font-medium text-terracotta hover:underline flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:outline-none rounded py-0.5 cursor-pointer"
                  >
                    <span>Inspect System</span>
                    <span>→</span>
                  </button>

                  <div className="flex items-center gap-2 text-light-ink-muted dark:text-dark-ink-muted">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 hover:text-light-ink dark:hover:text-dark-ink transition-colors focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:outline-none rounded"
                        title="GitHub Repository"
                        aria-label={`${project.title} GitHub Repository`}
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.links.live && project.links.live !== '#' && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 hover:text-light-ink dark:hover:text-dark-ink transition-colors focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:outline-none rounded"
                        title="Live Deployment"
                        aria-label={`${project.title} Live Deployment`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
