import React from 'react';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { BambooArt } from './BambooArt';

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
    <section id="home" className="relative w-full overflow-hidden pt-28 pb-16 lg:py-28">
      {/* Full-Bleed Stretched Landscape Hero Banner with Sumi-e Mountains & Bamboo Art */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
        {/* Stretched Panoramic Sumi-e Landscape & Bamboo Masterpiece Banner */}
        <img
          src="/images/hero-sumie-landscape-bamboo-banner.jpg"
          alt="Panoramic sumi-e landscape and bamboo ink wash painting backdrop"
          className="absolute inset-0 w-full h-full object-cover object-right sm:object-center opacity-75 dark:opacity-25 mix-blend-multiply dark:mix-blend-screen animate-gentle-drift"
          style={{
            maskImage: 'radial-gradient(ellipse 95% 85% at 60% 45%, black 35%, transparent 88%)',
            WebkitMaskImage: 'radial-gradient(ellipse 95% 85% at 60% 45%, black 35%, transparent 88%)',
          }}
        />

        {/* Dedicated Sumi-e Bamboo Art rising in the background behind the seal area */}
        <div className="absolute right-4 sm:right-12 lg:right-28 bottom-6 h-4/5 max-h-[700px] w-auto max-w-md hidden sm:block animate-bamboo-sway pointer-events-none z-0">
          <img
            src="/images/sumie-bamboo-bg.jpg"
            alt="Sumi-e bamboo background"
            className="w-full h-full object-contain object-bottom opacity-45 dark:opacity-25 mix-blend-multiply dark:mix-blend-screen dark:invert"
            style={{
              maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 85%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 85%)',
            }}
          />
        </div>

        {/* Left atmospheric gradient for crystal-clear editorial typography legibility */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-3/5 lg:w-1/2 bg-gradient-to-r from-light-canvas via-light-canvas/85 to-transparent dark:from-dark-canvas dark:via-dark-canvas/85 z-10 pointer-events-none" />

        {/* Top atmospheric fade under fixed appbar */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-light-canvas via-light-canvas/70 to-transparent dark:from-dark-canvas dark:via-dark-canvas/70 z-10 pointer-events-none" />

        {/* Bottom atmospheric fade: Guarantees 100% seamless blend into canvas with zero harsh line */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-light-canvas via-light-canvas/90 to-transparent dark:from-dark-canvas dark:via-dark-canvas/90 z-10 pointer-events-none" />

        {/* Ambient Ink Dust Motes floating gently */}
        <div className="absolute right-1/4 bottom-16 w-1.5 h-1.5 rounded-full bg-terracotta/40 mote-1 blur-[0.5px] z-20" />
        <div className="absolute right-1/3 bottom-28 w-2 h-2 rounded-full bg-ochre/30 mote-2 blur-[0.5px] z-20" />
        <div className="absolute right-1/2 bottom-12 w-1 h-1 rounded-full bg-light-ink-muted/30 dark:bg-[#edeae4]/35 mote-3 blur-[0.5px] z-20" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Main Content Column (8 cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          {/* Status & Location Pills */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border shadow-xs hover:border-bamboo/60 transition-colors">
              <span className="inline-block w-2 h-2 rounded-full bg-bamboo animate-status-glow"></span>
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
            <span className="italic font-normal text-terracotta hover:scale-[1.01] inline-block transition-transform">
              wabi-sabi
            </span>{' '}
            harmony.
          </h1>

          {/* Narrative Paragraph */}
          <p className="font-sans text-base sm:text-lg text-light-ink-muted dark:text-dark-ink-muted max-w-2xl leading-relaxed">
            Specializing in robust distributed web architecture, local & cloud generative AI systems, and serene user
            interfaces governed by the timeless cadence of intentional space (
            <span className="text-light-ink dark:text-dark-ink font-medium border-b border-terracotta/40 pb-0.5">
              間 · Ma
            </span>
            ). No noise, no excess—pure intentionality.
          </p>

          {/* CTA Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="#featured-works"
              className="btn-bloom group inline-flex items-center gap-2.5 px-6 py-3.5 bg-light-button-dark dark:bg-dark-button-light text-light-on-dark dark:text-dark-on-light font-sans text-sm font-medium rounded-md shadow-sm transition-all duration-200"
            >
              <span>Explore Selected Works</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a
              href="#philosophy"
              className="group inline-flex items-center gap-2 px-6 py-3.5 bg-light-surface-card dark:bg-dark-surface border border-light-border dark:border-dark-border hover:border-terracotta/40 text-light-ink dark:text-dark-ink font-sans text-sm font-medium rounded-md shadow-xs transition-all duration-200 hover:-translate-y-0.5"
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
                className="px-2.5 py-1 text-[11px] font-sans font-medium tracking-wider rounded bg-light-surface-card dark:bg-dark-surface border border-light-border/70 dark:border-dark-border/80 text-light-ink dark:text-dark-ink hover:border-terracotta/40 hover:text-terracotta transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Classical Seal Showcase Box (4 cols) with Double Hairline Frame & Ensō Background */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-between self-stretch pt-6 lg:pt-0 relative">
          {/* Authentic Sumi-e Bamboo Art Floating Beside Seal Box with Gentle Sway */}
          <div className="absolute -left-14 -top-12 hidden lg:block pointer-events-none -z-0">
            <BambooArt className="w-40 h-56" sway={true} opacity={0.75} />
          </div>

          <div className="relative z-10 w-full max-w-sm bg-light-surface-card/95 dark:bg-dark-surface/95 backdrop-blur-md double-hairline-frame p-6 rounded-xl shadow-lg flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl group">
            {/* Ensō brushstroke accent positioned elegantly behind seal with ambient breathe */}
            <div className="absolute -top-10 -right-8 w-36 h-36 opacity-30 pointer-events-none select-none z-0 animate-enso-breathe">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 50,12 C 68,11 86,22 91,42 C 96,62 89,82 72,92 C 54,101 30,97 17,81 C 4,63 7,37 24,20 C 31,13 41,10 51,12 C 47,15 36,21 30,28 C 15,44 13,67 25,82 C 37,97 59,98 74,88 C 88,77 92,57 86,41 C 81,25 65,16 50,15 Z" fill="#e5b882" opacity="0.65" />
                <path d="M 53,10 C 70,11 88,23 92,44 C 95,57 91,72 82,83" fill="none" opacity="0.8" stroke="#c83c23" strokeLinecap="round" strokeWidth="2.5" />
              </svg>
            </div>

            {/* Box Header */}
            <div className="w-full flex items-center justify-between pb-2 mb-4 border-b border-light-border/60 dark:border-dark-border/60 relative z-10">
              <span className="font-sans font-semibold text-light-ink-subtle dark:text-dark-ink-subtle uppercase text-[10px] tracking-wider">
                SEAL / 認印
              </span>
              <span className="font-sans text-bamboo dark:text-[#ffb871] uppercase tracking-widest text-[10px] font-semibold flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-bamboo dark:bg-[#ffb871] animate-status-glow"></span>
                VERIFIED CRAFT
              </span>
            </div>

            {/* Hanko Seal Mark with Breathing Pulse */}
            <div className="relative p-2 flex items-center justify-center animate-seal-breathe z-10">
              <img
                src="/stitch/hanko-stamp.svg"
                alt="Hanko Stamp Logo 原"
                className="w-20 h-20 object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="mt-3 text-center relative z-10">
              <h3 className="font-serif text-xl font-medium text-light-ink dark:text-dark-ink">Vincent Yuann</h3>
              <p className="font-sans text-xs text-light-ink-muted dark:text-dark-ink-muted mt-0.5">
                Software & Generative AI Engineer
              </p>
            </div>

            {/* Vertical Tategaki Japanese Prose snippet */}
            <div className="w-full mt-4 pt-4 bg-light-surface-raised dark:bg-dark-surface-muted border border-light-border/70 dark:border-dark-border/70 rounded-md p-4 flex items-center justify-center gap-6 group-hover:border-terracotta/30 transition-colors duration-300 relative z-10">
              <div className="writing-vertical-rl font-vertical text-[13px] tracking-[0.3em] text-light-ink-muted dark:text-dark-ink-muted opacity-85 h-32 leading-relaxed hover:opacity-100 transition-opacity cursor-default">
                間と余白の美学
              </div>
              <div className="writing-vertical-rl font-vertical text-[13px] tracking-[0.3em] text-terracotta font-medium h-32 leading-relaxed hover:scale-105 transition-transform cursor-default">
                静寂と簡素な調和
              </div>
              <div className="writing-vertical-rl font-vertical text-[13px] tracking-[0.3em] text-light-ink-muted dark:text-dark-ink-muted opacity-70 h-32 leading-relaxed hover:opacity-100 transition-opacity cursor-default">
                職人の精緻な組手
              </div>
            </div>

            {/* Decorative bottom notation */}
            <div className="w-full mt-4 pt-2 flex items-center justify-center gap-2 opacity-80 border-t border-light-border/40 dark:border-dark-border/40 relative z-10">
              <span className="font-serif text-terracotta text-xs">❖</span>
              <span className="font-sans text-[10px] text-light-ink-subtle dark:text-dark-ink-subtle uppercase tracking-widest">
                WABI-SABI CRAFT
              </span>
            </div>
          </div>
        </div>

        </div>
      </div>
    </section>
  );
};
