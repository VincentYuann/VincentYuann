import React from 'react';
import { Link } from 'react-router-dom';
import { Edit3, ArrowRight, ArrowDown, Activity, Cpu, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CornerBrackets } from './JapaneseMotifs';
import { PROFILE_INFO } from '../data/projects';
import type { ProfileData } from '../lib/useProfile';
import '../styles/hero.css';

interface HeroProps {
  profile?: ProfileData;
  isAdmin?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ profile, isAdmin = false }) => {
  const currentProfile = profile || {
    name: PROFILE_INFO.name,
    role: PROFILE_INFO.title,
    status: PROFILE_INFO.status,
    email: PROFILE_INFO.email,
    github: PROFILE_INFO.github,
    linkedin: PROFILE_INFO.linkedin,
    about: PROFILE_INFO.about,
    tagline: PROFILE_INFO.tagline,
    location: PROFILE_INFO.location,
  };

  return (
    <header className="hero-wrapper">
      {isAdmin && (
        <div className="flex items-center gap-2 mb-4">
          <Link
            to="/admin?tab=profile"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-accent/10 hover:bg-accent/20 border border-accent/30 text-accent text-xs font-mono font-semibold transition-colors"
            title="Edit Profile & Hero text in Admin CMS"
          >
            <Edit3 className="size-3" />
            <span>Edit Profile in CMS ✎</span>
          </Link>
        </div>
      )}

      {/* Editorial Breadcrumbs from Day theme and components */}
      <div className="flex items-center gap-2 text-[10px] font-sans font-semibold tracking-widest text-muted-foreground uppercase mb-6">
        <span className="text-foreground">HOME</span>
        <span className="text-border">/</span>
        <span>SYSTEMS & APPLIED AI</span>
        <span className="text-border">/</span>
        <span className="text-accent">2026 ARCHITECTURE</span>
      </div>

      {/* Main Two-Column Editorial Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Narrative & Action */}
        <div className="lg:col-span-7 space-y-6">
          {/* Availability Status Badge with Terracotta Hanko Dot */}
          <div className="flex items-center gap-2">
            <Badge variant="status" dotColor="#B5482E">
              <span>{currentProfile.status || 'AVAILABLE FOR FULL-STACK & AI ARCHITECTURE'}</span>
            </Badge>
          </div>

          {/* High-Impact Display Headline (Canela Serif) */}
          <h1 className="hero-headline">
            {currentProfile.tagline || 'Carving thoughtful paths from idea to system.'}
          </h1>

          {/* Crisp Editorial Intro */}
          <p className="hero-subtext">
            {currentProfile.about || (
              <>
                Hi, I'm <strong className="text-foreground font-semibold">{currentProfile.name}</strong>. I design and build production-grade web systems, real-time synchronization engines, and low-latency LLM retrieval pipelines.
              </>
            )}
          </p>

          {/* Primary & Secondary Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button asChild variant="default" size="default">
              <Link to="/projects">
                <span>VIEW PROJECTS</span>
                <ArrowRight className="size-3.5" strokeWidth={1.75} />
              </Link>
            </Button>

            <Button asChild variant="secondary" size="default">
              <Link to="/contact">
                <span>GET IN TOUCH</span>
                <ArrowRight className="size-3.5" strokeWidth={1.75} />
              </Link>
            </Button>
          </div>

          {/* Architecture Value Pillars with Vertical Hairline Dividers */}
          <div className="pt-6 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1 sm:pr-4 sm:border-r sm:border-border">
              <div className="flex items-center gap-1.5 text-accent">
                <Activity className="size-3.5" strokeWidth={1.5} />
                <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-foreground">
                  &lt;30ms Sync
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground font-sans leading-tight">
                Full-duplex WebSocket rooms & reconcilers.
              </p>
            </div>

            <div className="space-y-1 sm:px-4 sm:border-r sm:border-border">
              <div className="flex items-center gap-1.5 text-accent">
                <Cpu className="size-3.5" strokeWidth={1.5} />
                <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-foreground">
                  Dual-LLM RAG
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground font-sans leading-tight">
                Qdrant vector retrieval with strict citations.
              </p>
            </div>

            <div className="space-y-1 sm:pl-4">
              <div className="flex items-center gap-1.5 text-accent">
                <Database className="size-3.5" strokeWidth={1.5} />
                <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-foreground">
                  Distributed
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground font-sans leading-tight">
                PostgreSQL RLS, Prisma 7 & Docker pipelines.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Signature 16:9 Akari Workspace Visual Frame with Corner Brackets & Double Frame */}
        <div className="lg:col-span-5">
          <div className="frame-double rounded-lg bg-card p-1.5 relative group">
            <CornerBrackets size={14} className="z-10" />
            <div className="relative rounded-md overflow-hidden image-parchment image-faded-contrast">
              <img
                src="/images/hero-akari-workspace.jpg"
                alt="Akari-inspired creative engineering studio workspace"
                className="w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3] object-cover object-center transition-transform duration-500 group-hover:scale-102"
                loading="eager"
              />
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white/95 text-[10px] font-sans tracking-wider uppercase drop-shadow-xs z-10">
                <span className="font-semibold">Tokyo / Studio Space</span>
                <span className="text-white/80 text-[10px]">Akari 2700K Glow</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stream Source Navigation Hint */}
      <div className="hero-stream-hint mt-10">
        <span className="size-3 rounded-full bg-accent/15 border border-accent flex items-center justify-center">
          <span className="size-1.5 rounded-full bg-accent" />
        </span>
        <span className="text-muted-foreground uppercase tracking-wider text-[11px] font-sans font-medium">
          Scroll to explore the architecture timeline
        </span>
        <ArrowDown className="size-3.5 text-accent opacity-80" />
      </div>
    </header>
  );
};
