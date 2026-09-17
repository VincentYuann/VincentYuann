import React, { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, CheckCircle2, Activity, Cpu, ShieldCheck, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { GithubIcon } from '../components/Icons';
import { TechBadge } from '../components/TechBadge';
import type { FlagshipProject } from '../data/projects';
import type { ProfileData } from '../lib/useProfile';

interface ProjectDetailPageProps {
  projects: FlagshipProject[];
  profile: ProfileData;
  onOpenCommand: () => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  projects,
  profile,
  onOpenCommand,
}) => {
  const { id } = useParams<{ id: string }>();

  // Scroll to top on page mount or id change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const currentIndex = useMemo(() => {
    return projects.findIndex((p) => p.id === id);
  }, [projects, id]);

  const project = currentIndex !== -1 ? projects[currentIndex] : null;
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex !== -1 && currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-[#FAFBFD] text-gray-900 flex flex-col">
        <Navbar onOpenCommand={onOpenCommand} profile={profile} />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-4 max-w-md">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-500 font-mono text-lg">
              404
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#1B2127]">System Not Found</h1>
            <p className="text-xs text-[#57606A]">
              Could not find a project milestone with ID <code className="font-mono bg-gray-100 px-1 py-0.5 rounded">{id}</code>.
            </p>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1B2127] text-white text-xs font-semibold rounded-xl hover:bg-[#2C343E] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Projects Gallery</span>
            </Link>
          </div>
        </main>
        <Footer profile={profile} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFBFD] text-gray-900 flex flex-col">
      <Navbar onOpenCommand={onOpenCommand} profile={profile} />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10">
        {/* Breadcrumb & Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E1E6EB] pb-4">
          <div className="flex items-center gap-3">
            <Link
              to="/projects"
              className="flex items-center gap-1.5 text-xs font-semibold text-[#57606A] hover:text-[#1B2127] transition-colors bg-white px-3 py-1.5 rounded-lg border border-[#D0D7DE] shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Projects Gallery</span>
            </Link>

            <div className="hidden sm:flex items-center gap-2 text-xs text-[#6E7E8E]">
              <span>/</span>
              <span className="text-[#3894B3]">Level 2 Deep-Dive</span>
              <span>/</span>
              <span className="font-mono text-[#1B2127] font-medium">{project.id}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md"
              style={{
                backgroundColor: `${project.stoneAccent}15`,
                color: project.stoneAccent,
                border: `1px solid ${project.stoneAccent}30`,
              }}
            >
              {project.category}
            </span>
            {project.isFlagship && (
              <span className="text-[11px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-[#3894B3]/10 text-[#3894B3] border border-[#3894B3]/25">
                Flagship Milestone
              </span>
            )}
          </div>
        </div>

        {/* Hero Identity Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span
              className="w-4 h-4 rounded-full shrink-0 shadow-xs"
              style={{ backgroundColor: project.stoneAccent }}
            />
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1B2127] tracking-tight">
              {project.title}
            </h1>
          </div>

          <p className="text-lg sm:text-xl text-[#57606A] font-light leading-relaxed max-w-3xl">
            {project.subtitle}
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#1B2127] hover:bg-[#2C343E] rounded-xl shadow-sm transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Inspect Source Code (GitHub)</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#1B2127] bg-white hover:bg-[#F6F8FA] border border-[#D0D7DE] rounded-xl shadow-xs transition-all"
              >
                <ExternalLink className="w-4 h-4 text-[#3894B3]" />
                <span>Open Live Production Demo ↗</span>
              </a>
            )}
          </div>
        </div>

        {/* Media / Screenshot Showcase (Supabase Storage) */}
        {project.imageUrl && (
          <div className="rounded-2xl border border-[#D0D7DE] bg-white overflow-hidden shadow-xs">
            <img
              src={project.imageUrl}
              alt={`${project.title} screenshot`}
              className="w-full max-h-[460px] object-cover"
              loading="lazy"
            />
            <div className="px-5 py-3 bg-[#FAFBFC] border-t border-[#E1E6EB] text-xs text-[#57606A] flex items-center justify-between">
              <span>Architecture snapshot via Supabase Storage (`portfolio-assets`)</span>
              <span className="font-mono text-[11px] text-[#6E7E8E]">{project.title}</span>
            </div>
          </div>
        )}

        {/* Metrics & System Benchmarks Grid */}
        {project.stats && project.stats.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6E7E8E]">
              <Activity className="w-4 h-4 text-[#3894B3]" />
              <span>Verified System Benchmarks</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {project.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-[#D0D7DE] space-y-1 shadow-xs hover:border-[#8C959F] transition-colors"
                >
                  <div className="text-xs font-medium text-[#6E7E8E] uppercase tracking-wider">
                    {stat.label}
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-[#1B2127] font-mono">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Executive Problem Statement */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6E7E8E]">
            <Cpu className="w-4 h-4 text-[#588A75]" />
            <span>Executive Problem Formulation & Impact</span>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#D0D7DE] text-[#24292F] text-base leading-relaxed shadow-xs">
            <p>{project.description}</p>
          </div>
        </div>

        {/* Engineered Architecture Patterns & Invariants */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6E7E8E]">
              <ShieldCheck className="w-4 h-4 text-[#3894B3]" />
              <span>Engineered Architectural Invariants</span>
            </div>
            <div className="grid gap-3">
              {project.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#D0D7DE] text-sm text-[#24292F] shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#588A75] shrink-0 mt-0.5" />
                  <span className="leading-snug">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Breakdown */}
        {project.tags && project.tags.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6E7E8E]">
              <Layers className="w-4 h-4 text-[#A35D43]" />
              <span>Technology Stack & Integrations</span>
            </div>
            <div className="flex flex-wrap gap-2.5 p-4 bg-white border border-[#D0D7DE] rounded-2xl shadow-xs">
              {project.tags.map((tag, idx) => (
                <TechBadge key={idx} name={tag.name} icon={tag.icon} />
              ))}
            </div>
          </div>
        )}

        {/* Deep-Dive Engineering Log (Markdown) */}
        {project.detailsMarkdown && (
          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6E7E8E]">
              <Sparkles className="w-4 h-4 text-[#3894B3]" />
              <span>Deep-Dive Engineering Log & Documentation</span>
            </div>
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#D0D7DE] text-sm sm:text-base text-[#24292F] space-y-4 whitespace-pre-line leading-relaxed font-sans shadow-xs">
              {project.detailsMarkdown}
            </div>
          </div>
        )}

        {/* Next / Prev Navigation Stack */}
        <div className="pt-8 border-t border-[#E1E6EB] flex items-center justify-between gap-4">
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.id}`}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[#D0D7DE] hover:border-[#8C959F] rounded-xl text-xs font-semibold text-[#57606A] hover:text-[#1B2127] shadow-xs transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous: {prevProject.title}</span>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              to={`/projects/${nextProject.id}`}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[#D0D7DE] hover:border-[#8C959F] rounded-xl text-xs font-semibold text-[#57606A] hover:text-[#1B2127] shadow-xs transition-all"
            >
              <span>Next: {nextProject.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              to="/projects"
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[#D0D7DE] hover:border-[#8C959F] rounded-xl text-xs font-semibold text-[#57606A] hover:text-[#1B2127] shadow-xs transition-all"
            >
              <span>Back to All Projects →</span>
            </Link>
          )}
        </div>
      </main>

      <Footer profile={profile} />
    </div>
  );
};
