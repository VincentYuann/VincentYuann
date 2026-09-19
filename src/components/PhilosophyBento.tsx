import React from 'react';
import { Compass, Feather, ShieldCheck } from 'lucide-react';

export const PhilosophyBento: React.FC = () => {
  const pillars = [
    {
      kanji: '間',
      romaji: 'Ma',
      title: 'Intentional Space',
      num: 'PILLAR 01',
      icon: Compass,
      tag: 'Uncluttered System Boundaries',
      description:
        'Empty space is not an absence of features; it is an active structural element. Clean microservices, unencumbered visual layouts, and minimal latency let user attention focus without fatigue.',
    },
    {
      kanji: '侘寂',
      romaji: 'Wabi-Sabi',
      title: 'Authenticity & Patina',
      num: 'PILLAR 02',
      icon: Feather,
      tag: 'Graceful Degradation & Warmth',
      description:
        'Embracing real-world imperfection with honesty. Tactile finishes, organic ink wash motifs, resilient error-recovery strategies, and software that ages gracefully with its users over time.',
    },
    {
      kanji: '職人',
      romaji: 'Shokunin',
      title: 'Obsessive Craftsmanship',
      num: 'PILLAR 03',
      icon: ShieldCheck,
      tag: 'Deep Code Integrity & Care',
      description:
        'The craftsman’s obligation to perform one’s best work for the social welfare. Rigorous test coverage, deterministic API contracts, and fine joinery in every line of TypeScript and Python.',
    },
  ];

  return (
    <section id="philosophy" className="w-full max-w-7xl mx-auto px-6 py-12 lg:py-16">
      {/* Section Header */}
      <div className="max-w-2xl mb-10">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-terracotta font-serif text-sm">03 //</span>
          <span className="font-sans text-[11px] font-semibold text-light-ink-subtle dark:text-dark-ink-subtle uppercase tracking-widest">
            GUIDING PRINCIPLES
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-light-ink dark:text-dark-ink">
          Architectural Philosophy{' '}
          <span className="font-serif font-normal text-light-ink-muted dark:text-dark-ink-muted text-2xl ml-2">
            哲学
          </span>
        </h2>
        <p className="font-sans text-sm sm:text-base text-light-ink-muted dark:text-dark-ink-muted mt-2 leading-relaxed">
          Software is not merely mechanical logic; it is a spatial environment where human minds dwell. I build
          systems honoring three core tenets.
        </p>
      </div>

      {/* 3 Core Philosophy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className="bg-light-surface-card/90 dark:bg-dark-surface/90 border border-light-border/80 dark:border-dark-border/80 rounded-lg p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:bg-light-surface dark:hover:bg-dark-surface-raised transition-all duration-300 hover:shadow-akari dark:hover:shadow-night-glow hover:-translate-y-1"
            >
              {/* Top Accent Kanji & Icon */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-4xl sm:text-5xl text-terracotta font-normal leading-none group-hover:scale-110 transition-transform duration-300">
                    {pillar.kanji}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-[10px] font-semibold text-light-ink-subtle dark:text-dark-ink-subtle uppercase tracking-widest">
                      {pillar.num}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-light-surface-raised dark:bg-dark-surface-muted border border-light-border dark:border-dark-border flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5 text-terracotta" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-light-ink dark:text-dark-ink">
                    {pillar.romaji}{' '}
                    <span className="text-light-ink-muted dark:text-dark-ink-muted text-base font-normal">
                      ({pillar.title})
                    </span>
                  </h3>
                  <p className="font-sans text-sm text-light-ink-muted dark:text-dark-ink-muted mt-3 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>

              {/* Bottom Tag */}
              <div className="pt-6 mt-6 border-t border-light-border/50 dark:border-dark-border/50 flex items-center gap-2 text-light-ink-subtle dark:text-dark-ink-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
                <span className="font-sans text-xs uppercase font-medium tracking-wider">
                  {pillar.tag}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
