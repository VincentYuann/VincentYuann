import React, { useState } from 'react';
import { PROJECTS, Project } from '../data/projects';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProjectDetailModal } from './ProjectDetailModal';

export const ProjectsShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Distributed Systems', 'Generative AI', 'Creative Tech', 'Full-Stack'];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="featured-works" className="w-full max-w-7xl mx-auto px-6 py-12 lg:py-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-terracotta font-serif text-sm">01 //</span>
            <span className="font-sans text-[11px] font-semibold text-light-ink-subtle dark:text-dark-ink-subtle uppercase tracking-widest">
              SELECTED PORTFOLIO
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-light-ink dark:text-dark-ink">
            Featured Works{' '}
            <span className="font-serif font-normal text-light-ink-muted dark:text-dark-ink-muted text-2xl ml-2">
              主な作品
            </span>
          </h2>
        </div>
        <p className="font-sans text-sm text-light-ink-muted dark:text-dark-ink-muted max-w-md leading-relaxed">
          Each project represents a delicate synthesis of ambient intelligence, resilient system architecture, and
          tactile aesthetic balance.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full font-sans text-xs transition-all duration-200 ${
                isActive
                  ? 'bg-light-button-dark dark:bg-dark-button-light text-light-on-dark dark:text-dark-on-light font-semibold shadow-xs'
                  : 'bg-light-surface-card dark:bg-dark-surface border border-light-border dark:border-dark-border text-light-ink-muted dark:text-dark-ink-muted hover:border-light-border-strong dark:hover:border-dark-border-strong hover:text-light-ink dark:hover:text-dark-ink'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Horizontal Project Cards Stack */}
      <div className="flex flex-col space-y-6">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="group relative w-full bg-light-surface-card/90 dark:bg-dark-surface/90 hover:bg-light-surface dark:hover:bg-dark-surface-raised border border-light-border/80 dark:border-dark-border/80 rounded-lg p-5 sm:p-7 transition-all duration-200 shadow-sm hover:shadow-akari dark:hover:shadow-night-glow cursor-pointer"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Left Column: Image with Washi Corner Border */}
              <div className="lg:col-span-5 w-full h-56 sm:h-64 rounded-md overflow-hidden relative shadow-inner border border-light-border/60 dark:border-dark-border/60 bg-light-surface-muted dark:bg-dark-surface-muted">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-light-surface/90 dark:bg-dark-surface/90 backdrop-blur-sm border border-light-border/60 dark:border-dark-border/60 flex items-center gap-1.5">
                  <span className="font-sans text-[10px] text-light-ink dark:text-dark-ink uppercase tracking-wider font-semibold">
                    {project.badge}
                  </span>
                </div>
              </div>

              {/* Right Column: Content & Description */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl sm:text-2xl text-light-ink dark:text-dark-ink tracking-tight group-hover:text-terracotta transition-colors duration-200">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <span className="font-serif text-lg text-terracotta opacity-85">
                        {project.kanji}
                      </span>
                    </div>
                  </div>
                  <p className="font-sans text-xs text-terracotta font-medium mt-1">
                    {project.subtitle}
                  </p>
                  <p className="font-sans text-sm sm:text-[15px] text-light-ink-muted dark:text-dark-ink-muted mt-2.5 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-light-surface-raised dark:bg-dark-surface-muted border border-light-border/70 dark:border-dark-border/70 text-light-ink dark:text-dark-ink font-mono text-[11px] shadow-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card Action Link */}
                <div className="pt-2 flex items-center justify-between border-t border-light-border/40 dark:border-dark-border/40">
                  <span className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-light-ink dark:text-dark-ink group-hover:text-terracotta transition-colors">
                    <span className="underline underline-offset-4 decoration-light-border-strong dark:decoration-dark-border-strong group-hover:decoration-terracotta">
                      {project.links.caseStudyText || 'View Architecture & Telemetry'}
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>

                  <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-light-ink-subtle dark:text-dark-ink-subtle">
                    {project.metrics.slice(0, 2).map((m, idx) => (
                      <span key={idx} className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-terracotta" />
                        <span>{m.value}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Project Detail Case Study Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
