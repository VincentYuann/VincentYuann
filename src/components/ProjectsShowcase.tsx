import React, { useState } from 'react';
import { PROJECTS, Project } from '../data/projects';
import { ArrowRight, Layers } from 'lucide-react';
import { ProjectDetailModal } from './ProjectDetailModal';
import { EnsoOrbital } from './EnsoOrbital';

interface ProjectsShowcaseProps {
  onNavigate?: (view: 'home' | 'projects' | 'resume', sectionId?: string) => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ onNavigate }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const displayedProjects = PROJECTS.slice(0, 3);

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
        {/* Section Header with Classical Wabi-Sabi Numerals & View All Action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-light-border/70 dark:border-[#2D3039]/80 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-serif text-terracotta text-sm">02 //</span>
              <span className="font-sans text-[11px] font-semibold text-light-ink-subtle dark:text-dark-ink-subtle uppercase tracking-widest">
                SELECTED PORTFOLIO
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-light-ink dark:text-dark-ink tracking-tight font-normal">
              Featured Works <span className="text-xl sm:text-2xl font-light text-light-ink-muted dark:text-dark-ink-muted ml-2">主な作品</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="#all-projects"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('projects');
                }
              }}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-light-surface-card dark:bg-[#181920] border border-light-border dark:border-[#2D3039] hover:border-terracotta/50 text-light-ink dark:text-[#EDEAE4] font-sans text-xs uppercase tracking-widest shadow-xs transition-all duration-200"
            >
              <Layers className="w-3.5 h-3.5 text-terracotta" />
              <span>View All Projects ({PROJECTS.length})</span>
              <ArrowRight className="w-3.5 h-3.5 text-terracotta transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
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

                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isAlternate ? 'lg:grid-flow-dense' : ''
                  }`}
                >
                  {/* Visual Media Column */}
                  <div className={`lg:col-span-6 ${isAlternate ? 'lg:col-start-7' : ''}`}>
                    <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-light-surface-muted dark:bg-[#121316] border border-light-border/70 dark:border-[#2D3039]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      {/* Subtle Kanji Watermark in Corner */}
                      <div className="absolute bottom-3 right-3 select-none pointer-events-none px-2.5 py-1 rounded bg-black/40 backdrop-blur-xs text-xs font-serif text-white/90">
                        {project.kanji}
                      </div>
                    </div>
                  </div>

                  {/* Narrative & Specifications Column */}
                  <div
                    className={`lg:col-span-6 flex flex-col justify-center space-y-4 ${
                      isAlternate ? 'lg:col-start-1' : ''
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <h3 className="font-serif text-2xl sm:text-3xl text-light-ink dark:text-dark-ink font-normal tracking-tight group-hover:text-terracotta transition-colors duration-200">
                          {project.title}
                        </h3>
                        <span className="font-serif text-lg text-terracotta dark:text-ochre">
                          {project.kanji}
                        </span>
                      </div>
                      <p className="font-sans text-xs font-medium text-terracotta dark:text-ochre uppercase tracking-wider">
                        {project.subtitle}
                      </p>
                    </div>

                    <p className="font-sans text-sm text-light-ink-muted dark:text-dark-ink-muted leading-relaxed font-light">
                      {project.description}
                    </p>

                    {/* Minimalist Tech Tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded text-[11px] font-mono tracking-tight bg-light-surface-muted/90 dark:bg-[#14151A] border border-light-border/70 dark:border-[#2D3039] text-light-ink-muted dark:text-dark-ink-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Foot Link */}
                    <div className="pt-2 flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-light-ink dark:text-dark-ink font-medium group-hover:text-terracotta transition-colors">
                        <span>
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

        {/* Project Detail Case Study Modal */}
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};
