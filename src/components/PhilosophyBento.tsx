import React from 'react';
import { Compass, Feather, ShieldCheck } from 'lucide-react';
import { BambooArt } from './BambooArt';

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
      <div className="max-w-2xl mb-10 border-b border-light-border/60 dark:border-[#2D3039]/60 pb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-terracotta font-serif text-sm">02 //</span>
          <span className="font-sans text-[11px] font-semibold text-light-ink-subtle dark:text-dark-ink-subtle uppercase tracking-widest">
            GUIDING PRINCIPLES
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-light-ink dark:text-dark-ink font-normal tracking-tight">
          Architectural Philosophy{' '}
          <span className="font-serif font-light text-light-ink-muted dark:text-dark-ink-muted text-2xl lg:text-3xl ml-2">
            哲学
          </span>
        </h2>
        <p className="font-sans text-sm sm:text-base text-light-ink-muted dark:text-dark-ink-muted mt-3 font-light leading-relaxed">
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
              className="interactive-card bg-light-surface-card dark:bg-[#1B1C22] border border-light-border dark:border-[#2D3039] rounded-xl p-7 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:bg-light-surface dark:hover:bg-[#202229] transition-all duration-300 hover:shadow-akari dark:hover:shadow-night-glow classical-card-frame"
            >
              {/* Corner Hairline Brackets */}
              <div className="corner-bracket corner-bracket-tl absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-ochre/40 dark:border-ochre/30 pointer-events-none" />
              <div className="corner-bracket corner-bracket-tr absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-ochre/40 dark:border-ochre/30 pointer-events-none" />
              <div className="corner-bracket corner-bracket-bl absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-ochre/40 dark:border-ochre/30 pointer-events-none" />
              <div className="corner-bracket corner-bracket-br absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-ochre/40 dark:border-ochre/30 pointer-events-none" />

              {/* Top Accent Kanji & Icon */}
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between border-b border-light-border/60 dark:border-[#2D3039]/60 pb-4">
                  <span className="pillar-kanji font-serif text-5xl sm:text-6xl text-terracotta font-light leading-none inline-block">
                    {pillar.kanji}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-[10px] font-semibold text-light-ink-subtle dark:text-dark-ink-subtle uppercase tracking-widest">
                      {pillar.num}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-light-surface-raised dark:bg-[#14151A] border border-light-border dark:border-[#2D3039] flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5 text-terracotta" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-light-ink dark:text-dark-ink font-normal tracking-tight group-hover:text-terracotta transition-colors">
                    {pillar.romaji}{' '}
                    <span className="text-light-ink-muted dark:text-dark-ink-muted text-base font-light">
                      ({pillar.title})
                    </span>
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-light-ink-muted dark:text-dark-ink-muted mt-3 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>
              </div>

              {/* Bottom Tag */}
              <div className="relative z-10 pt-6 mt-6 border-t border-light-border/40 dark:border-[#2D3039]/40 flex items-center gap-2 text-light-ink-subtle dark:text-dark-ink-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
                <span className="font-sans text-[10px] uppercase tracking-[0.18em] font-medium">
                  {pillar.tag}
                </span>
              </div>

              {/* Bamboo Art Watermark for Shokunin (Flexibility & Resilience) */}
              {pillar.romaji === 'Shokunin' && (
                <div className="absolute -right-4 -bottom-4 w-28 h-40 opacity-20 dark:opacity-10 pointer-events-none">
                  <BambooArt className="w-full h-full" sway={false} opacity={0.75} />
                </div>
              )}
            </div>
          );
        })}

      </div>
    </section>
  );
};
