import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { BambooArt } from './BambooArt';
import { EnsoOrbital } from './EnsoOrbital';
import { HankoStamp } from './HankoStamp';

interface HeroProps {
  onNavigate?: (view: 'home' | 'projects' | 'resume', sectionId?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const coreStacks = [
    'TypeScript',
    'Next.js / React',
    'Python / PyTorch',
    'PostgreSQL',
    'FastAPI',
    'Local LLMs',
    'Docker',
  ];

  return (
    <section id="home" className="relative w-full overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
      {/* Full-Bleed Stretched Landscape Hero Banner with Sumi-e Mountains & Bamboo Art */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
        {/* Stretched Panoramic Sumi-e Landscape & Bamboo Masterpiece Banner */}
        <img
          src="./images/hero-sumie-landscape-bamboo-banner.jpg"
          alt="Panoramic sumi-e landscape and bamboo ink wash painting backdrop"
          className="absolute inset-0 w-full h-full object-cover object-right sm:object-center opacity-85 dark:opacity-50 mix-blend-multiply dark:mix-blend-screen dark:invert animate-gentle-drift"
          style={{
            maskImage: 'radial-gradient(ellipse 98% 90% at 50% 50%, black 50%, transparent 95%)',
            WebkitMaskImage: 'radial-gradient(ellipse 98% 90% at 50% 50%, black 50%, transparent 95%)',
          }}
        />

        {/* Dedicated Japanese Sumi-e Pine Tree (Matsu 松) prominently anchoring the left */}
        <div className="absolute left-0 sm:left-2 lg:left-6 bottom-0 h-4/5 max-h-[720px] w-auto max-w-lg hidden sm:block pointer-events-none z-0">
          <img
            src="./images/sumie-pine-tree-left.jpg"
            alt="Sumi-e pine tree art"
            className="w-full h-full object-contain object-bottom-left opacity-80 dark:opacity-55 mix-blend-multiply dark:mix-blend-screen dark:invert transition-opacity duration-300"
            style={{
              maskImage: 'radial-gradient(ellipse 92% 90% at 35% 65%, black 50%, transparent 90%)',
              WebkitMaskImage: 'radial-gradient(ellipse 92% 90% at 35% 65%, black 50%, transparent 90%)',
            }}
          />
        </div>

        {/* Dedicated Sumi-e Bamboo Art rising in the background behind the seal area */}
        <div className="absolute right-4 sm:right-12 lg:right-28 bottom-6 h-4/5 max-h-[700px] w-auto max-w-md hidden sm:block animate-bamboo-sway pointer-events-none z-0">
          <img
            src="./images/sumie-bamboo-bg.jpg"
            alt="Sumi-e bamboo background"
            className="w-full h-full object-contain object-bottom opacity-55 dark:opacity-35 mix-blend-multiply dark:mix-blend-screen dark:invert"
            style={{
              maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 85%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 85%)',
            }}
          />
        </div>

        {/* Subtle Japanese Washi Dot Texture Layer */}
        <div className="absolute inset-0 bg-transparent washi-pattern opacity-40 dark:opacity-20 pointer-events-none" />

        {/* Soft atmospheric gradient for crisp typography legibility without washing out the pine tree */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-1/2 lg:w-2/5 bg-gradient-to-r from-light-canvas/75 via-light-canvas/30 to-transparent dark:from-dark-canvas/70 dark:via-dark-canvas/25 to-transparent z-10 pointer-events-none" />

        {/* Top atmospheric fade under fixed appbar */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-light-canvas via-light-canvas/70 to-transparent dark:from-dark-canvas dark:via-dark-canvas/70 z-10 pointer-events-none" />

        {/* Bottom atmospheric fade: Guarantees 100% seamless blend into canvas with zero harsh line */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-light-canvas via-light-canvas/90 to-transparent dark:from-dark-canvas dark:via-dark-canvas/90 z-10 pointer-events-none" />

        {/* Subtle Celestial Orbiting Dust Particles */}
        <div className="absolute left-1/4 top-1/3 w-1.5 h-1.5 rounded-full bg-ochre/40 mote-1 blur-[0.5px] z-20" />
        <div className="absolute right-1/3 bottom-28 w-2 h-2 rounded-full bg-ochre/30 mote-2 blur-[0.5px] z-20" />
        <div className="absolute right-1/2 bottom-12 w-1 h-1 rounded-full bg-light-ink-muted/30 dark:bg-[#edeae4]/35 mote-3 blur-[0.5px] z-20" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Main Content Column (8 cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-6 pt-2">
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
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('home', 'featured-works');
                }
              }}
              className="btn-bloom group inline-flex items-center gap-2.5 px-6 py-3.5 bg-light-button-dark dark:bg-dark-button-light text-light-on-dark dark:text-dark-on-light font-sans text-sm font-medium rounded-md shadow-sm transition-all duration-200 cursor-pointer"
            >
              <span>Explore Selected Works</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a
              href="#resume"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('resume');
                }
              }}
              className="group inline-flex items-center gap-2 px-6 py-3.5 bg-light-surface-card dark:bg-dark-surface border border-light-border dark:border-dark-border hover:border-terracotta/40 text-light-ink dark:text-dark-ink font-sans text-sm font-medium rounded-md shadow-xs transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>View Resume & CV</span>
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
            {/* Celestial Ensō Orbital Circle: positioned on card top-left with rotating golden arc and pulsing ruby */}
            <EnsoOrbital placement="top-left" size={136} interactive={true} />

            {/* Box Header */}
            <div className="w-full flex items-center justify-between pb-2 mb-4 border-b border-light-border/60 dark:border-dark-border/60 relative z-10">
              <span className="font-sans font-semibold text-light-ink-subtle dark:text-dark-ink-subtle uppercase text-[10px] tracking-wider">
                SEAL / 認印
              </span>
              <span className="font-sans text-light-ink-subtle dark:text-dark-ink-subtle uppercase tracking-widest text-[10px] font-mono">
                KYOTO ARCHIVE
              </span>
            </div>

            {/* Hanko Seal Mark with Breathing Pulse */}
            <div className="relative p-2 flex items-center justify-center animate-seal-breathe z-10">
              <HankoStamp className="w-20 h-20 transition-transform duration-300 group-hover:scale-105" />
            </div>

            <div className="mt-3 text-center relative z-10">
              <h3 className="font-serif text-xl font-medium text-light-ink dark:text-dark-ink">Vincent Yuan</h3>
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
          </div>
        </div>

        </div>
      </div>
    </section>
  );
};
