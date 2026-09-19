import React from 'react';
import { HankoStamp } from './HankoStamp';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-light-surface-card dark:bg-dark-surface border-t border-light-border dark:border-dark-border mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8">
          {/* Brand & Narrative */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-2">
              <HankoStamp className="h-6 w-6" />
              <span className="font-serif text-lg font-medium text-light-ink dark:text-dark-ink">
                Vincent Yuann
              </span>
            </div>
            <p className="font-sans text-xs text-light-ink-muted dark:text-dark-ink-muted max-w-md">
              Synthesizing classical Japanese aesthetic principles with modern high-scale distributed systems and
              ambient AI experiences.
            </p>
          </div>

          {/* Quick Metrics / Philosophy Tags */}
          <div className="flex items-center gap-8">
            <div className="flex flex-col text-center md:text-right">
              <span className="font-sans text-[10px] font-semibold text-light-ink-subtle dark:text-dark-ink-subtle uppercase tracking-wider">
                Availability
              </span>
              <span className="font-sans text-xs text-bamboo dark:text-bamboo-light font-medium mt-0.5">
                Open to Full-Stack & AI Roles
              </span>
            </div>
            <div className="flex flex-col text-center md:text-right">
              <span className="font-sans text-[10px] font-semibold text-light-ink-subtle dark:text-dark-ink-subtle uppercase tracking-wider">
                Philosophy
              </span>
              <span className="font-serif text-xs text-light-ink-muted dark:text-dark-ink-muted mt-0.5 tracking-wider">
                間・侘寂・瞬間
              </span>
            </div>
          </div>
        </div>

        {/* Hairline Bottom Bar */}
        <div className="pt-6 border-t border-light-border/60 dark:border-dark-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-light-ink-subtle dark:text-dark-ink-subtle text-xs font-sans">
            <span className="font-serif text-terracotta">❖</span>
            <span>© {new Date().getFullYear()} Vincent Yuann. Crafted with restraint and clarity.</span>
          </div>

          <div className="flex items-center gap-3 text-light-ink-subtle dark:text-dark-ink-subtle text-xs font-sans">
            <span className="uppercase tracking-widest text-[11px]">Tokyo / Global</span>
            <span className="text-terracotta text-xs">✦</span>
            <span className="uppercase tracking-widest text-[11px]">Built on Solid Washi</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
