import React from 'react';
import { Compass, Feather, ShieldCheck } from 'lucide-react';
import { BambooArt } from './BambooArt';
import { EnsoOrbital } from './EnsoOrbital';

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
      watermark: (
        <svg
          className="w-32 h-32 absolute -right-6 -bottom-6 text-light-ink-muted/15 dark:text-dark-ink-muted/10 pointer-events-none"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="50" cy="50" r="15" strokeWidth="0.8" strokeDasharray="2 3" />
          <circle cx="50" cy="50" r="28" strokeWidth="0.8" />
          <circle cx="50" cy="50" r="42" strokeWidth="0.6" strokeDasharray="3 4" />
        </svg>
      ),
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
      watermark: (
        <div className="absolute -right-4 -bottom-4 w-32 h-36 opacity-20 dark:opacity-10 pointer-events-none">
          <img
            src="/images/sumie-pine-tree-left.jpg"
            alt="Pine motif"
            className="w-full h-full object-contain object-bottom-right mix-blend-multiply dark:mix-blend-screen dark:invert"
          />
        </div>
      ),
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
      watermark: (
        <div className="absolute -right-4 -bottom-4 w-28 h-40 opacity-25 dark:opacity-15 pointer-events-none">
          <BambooArt className="w-full h-full" sway={false} opacity={0.8} />
        </div>
      ),
    },
  ];

  return (
    <section id="philosophy" className="relative w-full overflow-hidden py-16 lg:py-24">
      {/* Full-Bleed Atmospheric Background Behind Philosophy Cards */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
        {/* Panoramic Mist Landscape backdrop spanning across the section */}
        <img
          src="/images/hero-sumie-landscape-bamboo-banner.jpg"
          alt="Sumi-e landscape behind philosophy cards"
          className="absolute inset-0 w-full h-full object-cover opacity-25 dark:opacity-15 mix-blend-multiply dark:mix-blend-screen dark:invert"
          style={{
            maskImage: 'radial-gradient(ellipse 92% 80% at 50% 50%, black 30%, transparent 88%)',
            WebkitMaskImage: 'radial-gradient(ellipse 92% 80% at 50% 50%, black 30%, transparent 88%)',
          }}
        />

        {/* Left Flank Art: Long Tall Sumi-e Bamboo Rising in Left Empty Space */}
        <div className="absolute left-0 lg:left-4 xl:left-8 bottom-0 top-12 w-36 sm:w-48 lg:w-64 pointer-events-none z-0 hidden md:block">
          <img
            src="/images/sumie-tall-vertical-bamboo.jpg"
            alt="Sumi-e bamboo art left flank"
            className="w-full h-full object-contain object-bottom opacity-40 dark:opacity-25 mix-blend-multiply dark:mix-blend-screen dark:invert animate-bamboo-sway"
            style={{
              maskImage: 'radial-gradient(ellipse 85% 85% at 40% 60%, black 40%, transparent 88%)',
              WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 40% 60%, black 40%, transparent 88%)',
            }}
          />
        </div>

        {/* Right Flank Art: Long Tall Sumi-e Bamboo Rising in Right Empty Space */}
        <div className="absolute right-0 lg:right-4 xl:right-8 bottom-0 top-12 w-36 sm:w-48 lg:w-64 pointer-events-none z-0 hidden md:block">
          <img
            src="/images/sumie-tall-vertical-bamboo.jpg"
            alt="Sumi-e bamboo art right flank"
            className="w-full h-full object-contain object-bottom opacity-40 dark:opacity-25 mix-blend-multiply dark:mix-blend-screen dark:invert scale-x-[-1]"
            style={{
              maskImage: 'radial-gradient(ellipse 85% 85% at 60% 60%, black 40%, transparent 88%)',
              WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 60% 60%, black 40%, transparent 88%)',
            }}
          />
        </div>

        {/* Top & Bottom seamless gradient transitions */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-light-canvas via-light-canvas/80 to-transparent dark:from-dark-canvas dark:via-dark-canvas/80 z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-light-canvas via-light-canvas/80 to-transparent dark:from-dark-canvas dark:via-dark-canvas/80 z-10 pointer-events-none" />
      </div>

      {/* Left Empty Margin Japanese Design Widget (Visible on wide screens) */}
      <div className="absolute left-4 xl:left-10 top-1/2 -translate-y-1/2 hidden 2xl:flex flex-col items-center gap-4 text-light-ink-muted/60 dark:text-dark-ink-muted/50 pointer-events-none select-none z-10">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-terracotta/40 to-ochre/40" />
        <div className="writing-vertical-rl font-mono text-[10px] tracking-[0.3em] uppercase">
          空間の美学 // MA & WABI
        </div>
        <div className="w-2 h-2 rounded-full bg-terracotta/80 animate-ruby-pulse" />
        <div className="writing-vertical-rl font-mono text-[9px] tracking-widest opacity-70">
          35°41'N · 139°46'E
        </div>
        <div className="w-px h-16 bg-gradient-to-b from-ochre/40 via-light-border dark:via-dark-border to-transparent" />
      </div>

      {/* Right Empty Margin Japanese Design Widget (Visible on wide screens) */}
      <div className="absolute right-4 xl:right-10 top-1/2 -translate-y-1/2 hidden 2xl:flex flex-col items-center gap-4 text-light-ink-muted/60 dark:text-dark-ink-muted/50 pointer-events-none select-none z-10">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-bamboo/40 to-ochre/40" />
        <div className="writing-vertical-rl font-mono text-[10px] tracking-[0.3em] uppercase">
          職人の規矩 // CRAFT SPEC
        </div>
        <div className="w-2 h-2 rounded-full bg-bamboo/80 animate-status-glow" />
        <div className="writing-vertical-rl font-mono text-[9px] tracking-widest opacity-70">
          KYOTO · HEIAN ARCHIVE
        </div>
        <div className="w-px h-16 bg-gradient-to-b from-ochre/40 via-light-border dark:via-dark-border to-transparent" />
      </div>

      {/* Main Philosophy Bento Content */}
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="interactive-card bg-light-surface-card/95 dark:bg-[#1B1C22]/95 backdrop-blur-sm border border-light-border dark:border-[#2D3039] rounded-xl p-7 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-visible group hover:bg-light-surface dark:hover:bg-[#202229] transition-all duration-300 hover:shadow-akari dark:hover:shadow-night-glow classical-card-frame"
              >
                {/* Celestial Ensō Orbital Circle: appears ONLY on the hovered card */}
                <EnsoOrbital
                  placement="top-left"
                  size={112}
                  hoverOnly={true}
                />

                {/* Corner Hairline Brackets */}
                <div className="corner-bracket corner-bracket-tl absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-ochre/40 dark:border-ochre/30 pointer-events-none" />
                <div className="corner-bracket corner-bracket-tr absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-ochre/40 dark:border-ochre/30 pointer-events-none" />
                <div className="corner-bracket corner-bracket-bl absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-ochre/40 dark:border-ochre/30 pointer-events-none" />
                <div className="corner-bracket corner-bracket-br absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-ochre/40 dark:border-ochre/30 pointer-events-none" />

                {/* Top Accent Kanji & Icon */}
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between border-b border-light-border/60 dark:border-[#2D3039]/60 pb-4">
                    <span className="pillar-kanji font-serif text-5xl sm:text-6xl text-terracotta font-light leading-none inline-block pl-2">
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

                {/* Thematic Watermark Motif behind card content */}
                {pillar.watermark}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
