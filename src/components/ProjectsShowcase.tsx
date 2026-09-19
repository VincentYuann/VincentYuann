import React, { useState } from 'react';
import { PROJECTS, Project } from '../data/projects';
import { ArrowRight } from 'lucide-react';
import { ProjectDetailModal } from './ProjectDetailModal';
import { EnsoOrbital } from './EnsoOrbital';

interface ProjectsShowcaseProps {
  onNavigate?: (view: 'home' | 'projects' | 'resume', sectionId?: string) => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Distributed Systems', 'Generative AI', 'Creative Tech', 'Full-Stack'];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  const displayedProjects = filteredProjects.slice(0, 3);

  return (
    <section id="featured-works" className="relative w-full overflow-hidden py-14 lg:py-20">
      {/* Subtle Japanese Sumi-e Arts in Left & Right Empty Margins */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
        {/* Left Margin Flank Bamboo */}
        <div className="absolute -left-6 xl:left-2 bottom-12 top-24 w-32 xl:w-48 pointer-events-none z-0 hidden lg:block">
          <img
            src="./images/sumie-tall-vertical-bamboo.jpg"
            alt="Sumi-e bamboo margin accent"
            className="w-full h-full object-contain object-bottom opacity-30 dark:opacity-15 mix-blend-multiply dark:mix-blend-screen dark:invert animate-bamboo-sway"
            style={{
              maskImage: 'radial-gradient(ellipse 85% 85% at 30% 60%, black 35%, transparent 85%)',
              WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 30% 60%, black 35%, transparent 85%)',
            }}
          />
        </div>

        {/* Right Margin Flank Bamboo */}
        <div className="absolute -right-6 xl:right-2 bottom-12 top-24 w-32 xl:w-48 pointer-events-none z-0 hidden lg:block">
          <img
            src="./images/sumie-tall-vertical-bamboo.jpg"
            alt="Sumi-e bamboo margin accent"
            className="w-full h-full object-contain object-bottom opacity-30 dark:opacity-15 mix-blend-multiply dark:mix-blend-screen dark:invert scale-x-[-1]"
            style={{
              maskImage: 'radial-gradient(ellipse 85% 85% at 70% 60%, black 35%, transparent 85%)',
              WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 70% 60%, black 35%, transparent 85%)',
            }}
          />
        </div>

        {/* Top and Bottom Fades */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-light-canvas via-light-canvas/70 to-transparent dark:from-dark-canvas dark:via-dark-canvas/70 z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-light-canvas via-light-canvas/70 to-transparent dark:from-dark-canvas dark:via-dark-canvas/70 z-10 pointer-events-none" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header with Classical Wabi-Sabi Numerals */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-light-border/70 dark:border-[#2D3039]/80 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-serif text-terracotta text-sm">01 //</span>
              <span className="font-sans text-[11px] font-semibold text-light-ink-subtle dark:text-dark-ink-subtle uppercase tracking-widest">
                SELECTED PORTFOLIO
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-light-ink dark:text-dark-ink tracking-tight font-normal">
              Featured Works <span className="text-xl sm:text-2xl font-light text-light-ink-muted dark:text-dark-ink-muted ml-2">主な作品</span>
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-light-ink-muted dark:text-dark-ink-muted max-w-md font-light leading-relaxed">
            Each project represents a delicate synthesis of ambient intelligence, resilient system architecture, and tactile aesthetic balance.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wide transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-light-button-dark dark:bg-dark-button-light text-light-on-dark dark:text-dark-on-light font-medium shadow-sm'
                    : 'bg-light-surface dark:bg-[#181920] text-light-ink-muted dark:text-dark-ink-muted border border-light-border dark:border-[#2D3039] hover:text-light-ink dark:hover:text-dark-ink hover:border-terracotta/40'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Alternating Editorial Project Cards Stack (Top 3 on Home) */}
        <div className="flex flex-col space-y-8">
          {displayedProjects.map((project, index) => {
            const isAlternate = index % 2 === 1;
            return (
              <article
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="interactive-card group relative w-full bg-light-surface-card dark:bg-[#1B1C22] hover:bg-light-surface dark:hover:bg-[#202229] border border-light-border dark:border-[#2D3039] rounded-xl p-6 sm:p-8 transition-all duration-300 shadow-sm hover:shadow-akari dark:hover:shadow-night-glow cursor-pointer classical-card-frame overflow-visible"
              >
                {/* Celestial Ensō Orbital Circle: appears ONLY on the hovered project card */}
                <EnsoOrbital
                  placement="top-left"
                  size={96}
                  hoverOnly={true}
                />

                {/* Corner Hairline Brackets */}
                <div className="corner-bracket corner-bracket-tl absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-ochre/40 dark:border-ochre/30 pointer-events-none" />
                <div className="corner-bracket corner-bracket-tr absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-ochre/40 dark:border-ochre/30 pointer-events-none" />
                <div className="corner-bracket corner-bracket-bl absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-ochre/40 dark:border-ochre/30 pointer-events-none" />
                <div className="corner-bracket corner-bracket-br absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-ochre/40 dark:border-ochre/30 pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
                  {/* Image Column (Alternates based on index) */}
                  <div
                    className={`lg:col-span-6 w-full h-60 sm:h-72 rounded-lg overflow-hidden relative shadow-inner p-1.5 border border-light-border/80 dark:border-[#2D3039] bg-light-canvas dark:bg-[#121317] ${
                      isAlternate ? 'order-1 lg:order-2' : ''
                    }`}
                  >
                    <div className="w-full h-full rounded overflow-hidden relative border border-light-border/60 dark:border-[#2D3039]/80">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-95 group-hover:opacity-100"
                      />
                    </div>
                  </div>

                  {/* Content Column */}
                  <div
                    className={`lg:col-span-6 flex flex-col justify-between space-y-4 ${
                      isAlternate ? 'order-2 lg:order-1' : ''
                    }`}
                  >
                    <div>
                      <div className="flex items-baseline justify-between border-b border-light-border/60 dark:border-[#2D3039]/60 pb-3">
                        <h3 className="font-serif text-2xl sm:text-3xl text-light-ink dark:text-[#EDEAE4] tracking-tight group-hover:text-terracotta transition-colors duration-300 font-normal">
                          {project.title}
                        </h3>
                        <span className="pillar-kanji font-serif text-xl text-terracotta opacity-85 group-hover:opacity-100 transition-all duration-300 ml-3">
                          {project.kanji}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-terracotta font-medium mt-2">
                        {project.subtitle}
                      </p>
                      <p className="font-sans text-sm sm:text-[15px] text-light-ink-muted dark:text-[#9E988F] mt-2.5 leading-relaxed font-light">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded bg-light-surface-raised dark:bg-[#14151A] border border-light-border/70 dark:border-[#2D3039] text-light-ink dark:text-[#EDEAE4] font-mono text-[10px] uppercase tracking-wider shadow-xs hover:border-terracotta/40 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Card Action Link */}
                    <div className="pt-2 flex items-center justify-between border-t border-light-border/40 dark:border-[#2D3039]/40">
                      <span className="inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-widest text-light-ink dark:text-[#EDEAE4] group-hover:text-terracotta transition-colors">
                        <span className="underline underline-offset-4 decoration-light-border-strong dark:decoration-[#2D3039] group-hover:decoration-terracotta">
                          {project.links.caseStudyText || 'View Project Architecture'}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* View All Projects Button (Opens Compact Projects Gallery) */}
        <div className="mt-12 pt-8 flex flex-col items-center justify-center text-center">
          <a
            href="#all-projects"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate('projects');
              }
            }}
            className="btn-bloom inline-flex items-center gap-3 px-8 py-4 bg-light-surface-card dark:bg-[#1B1C22] hover:bg-light-surface dark:hover:bg-[#202229] border border-light-border dark:border-[#2D3039] hover:border-terracotta/50 text-light-ink dark:text-dark-ink font-sans text-sm font-medium rounded-xl shadow-akari dark:shadow-night-glow transition-all duration-300 cursor-pointer group"
          >
            <span>View All Projects ({PROJECTS.length})</span>
            <ArrowRight className="w-4 h-4 text-terracotta transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <p className="font-sans text-xs text-light-ink-muted dark:text-dark-ink-muted mt-2">
            Explore complete case studies, system architecture blueprints, and interactive demos.
          </p>
        </div>

        {/* Project Detail Case Study Modal */}
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};
