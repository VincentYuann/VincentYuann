import React from 'react';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';

export const Hero: React.FC = () => {
  const coreStacks = [
    'TYPESCRIPT',
    'NEXT.JS / REACT',
    'PYTHON / PYTORCH',
    'POSTGRESQL',
    'FASTAPI',
    'LOCAL LLMS',
    'DOCKER',
  ];

  return (
    <section id="home" className="relative w-full max-w-7xl mx-auto px-6 pt-28 pb-16 lg:py-28 overflow-hidden">
      {/* Background Masked Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none opacity-25 dark:opacity-15">
        <div className="absolute right-0 top-0 w-full lg:w-3/4 h-full bg-gradient-to-l from-terracotta/5 to-transparent mix-blend-multiply" />
        <img
          src="/images/washi-paper-texture.jpg"
          alt="Washi paper texture"
          className="w-full h-full object-cover object-right opacity-40 mix-blend-overlay"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
        {/* Main Content Column (8 cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          {/* Status & Location Pills */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border shadow-xs">
              <span className="inline-block w-2 h-2 rounded-full bg-bamboo animate-pulse"></span>
              <span className="font-sans text-[11px] font-semibold tracking-wider text-light-ink-muted dark:text-dark-ink-muted uppercase">
                Open to Full-Stack & AI Roles
              </span>
            </div>
            <span className="font-sans text-xs text-light-ink-subtle dark:text-dark-ink-subtle hidden sm:inline">•</span>
            <div className="inline-flex items-center gap-1.5 text-light-ink-muted dark:text-dark-ink-muted font-sans text-xs">
              <MapPin className="w-3.5 h-3.5 text-terracotta" />
              <span>Tokyo & Remote Available</span>
            </div>
          </div>

          {/* Display Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-light-ink dark:text-dark-ink leading-[1.14] tracking-tight font-normal">
            Crafting thoughtful digital experiences with algorithmic clarity & Japanese{' '}
            <span className="italic font-normal text-terracotta">wabi-sabi</span> harmony.
          </h1>

          {/* Narrative Paragraph */}
          <p className="font-sans text-base sm:text-lg text-light-ink-muted dark:text-dark-ink-muted max-w-2xl leading-relaxed">
            Specializing in robust distributed web architecture, local & cloud generative AI systems, and serene user
            interfaces governed by the timeless cadence of intentional space (
            <span className="text-light-ink dark:text-dark-ink font-medium">間 · Ma</span>). No noise, no
            excess—pure intentionality.
          </p>

          {/* CTA Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="#featured-works"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-light-button-dark dark:bg-dark-button-light text-light-on-dark dark:text-dark-on-light font-sans text-sm font-medium rounded-md shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <span>Explore Selected Works</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a
              href="#philosophy"
              className="group inline-flex items-center gap-2 px-6 py-3.5 bg-light-surface-card dark:bg-dark-surface border border-light-border dark:border-dark-border hover:border-light-border-strong dark:hover:border-dark-border-strong text-light-ink dark:text-dark-ink font-sans text-sm font-medium rounded-md shadow-xs transition-all duration-200"
            >
              <span>Read Notes & Philosophy</span>
              <Sparkles className="w-3.5 h-3.5 text-terracotta transition-transform duration-200 group-hover:rotate-45" />
            </a>
          </div>

          {/* Tech Capabilities Ribbon */}
          <div className="pt-3 flex flex-wrap items-center gap-2 text-light-ink-muted dark:text-dark-ink-muted">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-widest text-light-ink-subtle dark:text-dark-ink-subtle mr-2">
              Core Stacks
            </span>
            {coreStacks.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-[11px] font-sans font-medium tracking-wider rounded bg-light-surface-card dark:bg-dark-surface border border-light-border/70 dark:border-dark-border/80 text-light-ink dark:text-dark-ink"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Classical Seal Showcase Box (4 cols) */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-between self-stretch pt-6 lg:pt-0">
          <div className="relative w-full max-w-sm bg-light-surface-card/90 dark:bg-dark-surface/90 backdrop-blur-sm border border-light-border dark:border-dark-border p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
            {/* Box Header */}
            <div className="w-full flex items-center justify-between pb-2 mb-4 border-b border-light-border/60 dark:border-dark-border/60">
              <span className="font-sans font-semibold text-light-ink-subtle dark:text-dark-ink-subtle uppercase text-[10px] tracking-wider">
                SEAL / 認印
              </span>
              <span className="font-sans text-terracotta uppercase tracking-widest text-[10px] font-semibold">
                VERIFIED CRAFT
              </span>
            </div>

            {/* Hanko Seal Mark */}
            <div className="relative p-2 flex items-center justify-center -rotate-1 hover:rotate-0 transition-transform duration-300">
              <img
                src="/stitch/hanko-stamp.svg"
                alt="Hanko Stamp Logo 原"
                className="relative z-10 w-20 h-20 object-contain drop-shadow-sm"
              />
            </div>

            <div className="mt-3 text-center">
              <h3 className="font-serif text-xl font-medium text-light-ink dark:text-dark-ink">Vincent Yuann</h3>
              <p className="font-sans text-xs text-light-ink-muted dark:text-dark-ink-muted mt-0.5">
                Software & Generative AI Engineer
              </p>
            </div>

            {/* Vertical Tategaki Japanese Prose snippet */}
            <div className="w-full mt-4 pt-4 bg-light-surface-raised dark:bg-dark-surface-muted border border-light-border/70 dark:border-dark-border/70 rounded-md p-4 flex items-center justify-center gap-6">
              <div className="writing-vertical-rl font-vertical text-[13px] tracking-[0.3em] text-light-ink-muted dark:text-dark-ink-muted opacity-85 h-32 leading-relaxed">
                間と余白の美学
              </div>
              <div className="writing-vertical-rl font-vertical text-[13px] tracking-[0.3em] text-terracotta font-medium h-32 leading-relaxed">
                静寂と簡素な調和
              </div>
              <div className="writing-vertical-rl font-vertical text-[13px] tracking-[0.3em] text-light-ink-muted dark:text-dark-ink-muted opacity-70 h-32 leading-relaxed">
                職人の精緻な組手
              </div>
            </div>

            {/* Decorative bottom notation */}
            <div className="w-full mt-4 pt-2 flex items-center justify-center gap-2 opacity-80 border-t border-light-border/40 dark:border-dark-border/40">
              <span className="font-serif text-terracotta text-xs">❖</span>
              <span className="font-sans text-[10px] text-light-ink-subtle dark:text-dark-ink-subtle uppercase tracking-widest">
                WABI-SABI CRAFT
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
