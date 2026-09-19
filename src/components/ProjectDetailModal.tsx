import React, { useEffect } from 'react';
import { Project } from '../data/projects';
import { X, ExternalLink, Github, CheckCircle2, Layers } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-light-ink/40 dark:bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg shadow-akari-raised dark:shadow-night-glow z-10 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-light-border dark:border-dark-border bg-light-surface-raised dark:bg-dark-surface-muted">
          <div className="flex items-center gap-2.5">
            <span className="font-serif text-terracotta text-lg">{project.kanji}</span>
            <span className="font-sans text-xs uppercase font-semibold text-light-ink-muted dark:text-dark-ink-muted tracking-wider">
              {project.badge}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-light-surface-muted dark:hover:bg-dark-surface text-light-ink-muted dark:text-dark-ink-muted hover:text-light-ink dark:hover:text-dark-ink transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Title & Subtitle */}
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-light-ink dark:text-dark-ink">
              {project.title}
            </h2>
            <p className="font-sans text-sm text-terracotta font-medium mt-1">
              {project.subtitle}
            </p>
          </div>

          {/* Project Image */}
          <div className="w-full h-56 sm:h-72 rounded-md overflow-hidden border border-light-border dark:border-dark-border relative bg-light-surface-muted dark:bg-dark-surface-muted">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-3">
            {project.metrics.map((m, idx) => (
              <div
                key={idx}
                className="bg-light-surface-raised dark:bg-dark-surface-muted p-3 rounded border border-light-border/70 dark:border-dark-border/70 text-center"
              >
                <div className="font-sans text-[11px] uppercase tracking-wider text-light-ink-muted dark:text-dark-ink-muted">
                  {m.label}
                </div>
                <div className="font-mono text-sm sm:text-base font-semibold text-light-ink dark:text-dark-ink mt-0.5">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Overview */}
          <div className="space-y-2">
            <h3 className="font-serif text-lg text-light-ink dark:text-dark-ink flex items-center gap-2">
              <Layers className="w-4 h-4 text-terracotta" />
              <span>Architectural Overview</span>
            </h3>
            <p className="font-sans text-sm sm:text-base text-light-ink-muted dark:text-dark-ink-muted leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Deep Architectural Details */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg text-light-ink dark:text-dark-ink">
              System Highlights & Engineering Principles
            </h3>
            <div className="space-y-4">
              {project.architectureDetails.map((section, idx) => (
                <div
                  key={idx}
                  className="bg-light-surface-card dark:bg-dark-surface-raised p-4 rounded border border-light-border/60 dark:border-dark-border/60"
                >
                  <h4 className="font-sans text-sm font-semibold text-light-ink dark:text-dark-ink mb-2">
                    {section.title}
                  </h4>
                  <ul className="space-y-1.5">
                    {section.points.map((pt, pIdx) => (
                      <li
                        key={pIdx}
                        className="font-sans text-xs sm:text-sm text-light-ink-muted dark:text-dark-ink-muted flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-terracotta shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Tags */}
          <div>
            <div className="font-sans text-xs uppercase tracking-wider font-semibold text-light-ink-subtle dark:text-dark-ink-subtle mb-2">
              Technologies & Infrastructure
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-mono rounded bg-light-surface-raised dark:bg-dark-surface-raised border border-light-border dark:border-dark-border text-light-ink dark:text-dark-ink"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-light-border dark:border-dark-border bg-light-surface-raised dark:bg-dark-surface-muted flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-sans font-medium rounded border border-light-border dark:border-dark-border hover:bg-light-surface dark:hover:bg-dark-surface text-light-ink dark:text-dark-ink transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Repository</span>
              </a>
            )}
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-sans font-medium rounded bg-light-button-dark dark:bg-dark-button-light text-light-on-dark dark:text-dark-on-light hover:opacity-90 transition-opacity"
            >
              <span>Inquire About Project</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <button
            onClick={onClose}
            className="text-xs font-sans text-light-ink-muted dark:text-dark-ink-muted hover:text-light-ink dark:hover:text-dark-ink"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
