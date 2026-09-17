import React, { useEffect } from 'react';
import { X, ArrowLeft, ExternalLink, CheckCircle2, Cpu, Activity, ShieldCheck, Sparkles, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';
import { TechBadge } from './TechBadge';
import type { FlagshipProject } from '../data/projects';

interface ProjectDetailModalProps {
  project: FlagshipProject | null;
  onClose: () => void;
  onBackToGallery?: () => void;
  isFromGallery?: boolean;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onBackToGallery,
  isFromGallery = false,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFromGallery && onBackToGallery) {
          onBackToGallery();
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onBackToGallery, isFromGallery]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white border border-[#D0D7DE] rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Sticky Navigation Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E1E6EB] bg-[#FAFBFC]/90 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            {isFromGallery && onBackToGallery ? (
              <button
                onClick={onBackToGallery}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#57606A] hover:text-[#1B2127] transition-colors bg-white px-2.5 py-1.5 rounded-lg border border-[#D0D7DE] shadow-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Gallery</span>
              </button>
            ) : (
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#57606A] hover:text-[#1B2127] transition-colors bg-white px-2.5 py-1.5 rounded-lg border border-[#D0D7DE] shadow-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Stream</span>
              </button>
            )}

            <div className="hidden sm:flex items-center gap-2 text-xs text-[#6E7E8E]">
              <span>/</span>
              <span>Architecture Deep-Dive</span>
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
                border: `1px solid ${project.stoneAccent}30` 
              }}
            >
              {project.category}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#57606A] hover:text-[#1B2127] hover:bg-[#E1E6EB]/50 transition-colors"
              title="Close modal (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Zone */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Header & Primary Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span 
                className="w-3 h-3 rounded-full shrink-0 shadow-xs"
                style={{ backgroundColor: project.stoneAccent }}
              />
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B2127] tracking-tight">
                {project.title}
              </h1>
              {project.isFlagship && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#3894B3]/10 text-[#3894B3] border border-[#3894B3]/25">
                  Flagship Milestone
                </span>
              )}
            </div>

            <p className="text-base sm:text-lg text-[#57606A] font-light leading-relaxed">
              {project.subtitle}
            </p>

            {/* Quick Action Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1B2127] hover:bg-[#2C343E] rounded-lg shadow-sm transition-all"
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
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#1B2127] bg-[#F6F8FA] hover:bg-[#E1E6EB] border border-[#D0D7DE] rounded-lg shadow-xs transition-all"
                >
                  <ExternalLink className="w-4 h-4 text-[#3894B3]" />
                  <span>Open Live Production Demo</span>
                </a>
              )}
            </div>
          </div>

          {/* Media / Screenshot Showcase (Supabase Storage) */}
          {project.imageUrl && (
            <div className="relative rounded-xl border border-[#D0D7DE] bg-[#F6F8FA] overflow-hidden shadow-xs">
              <img
                src={project.imageUrl}
                alt={`${project.title} architecture or screenshot`}
                className="w-full max-h-[380px] object-cover"
                loading="lazy"
              />
              <div className="px-4 py-2 bg-white/90 backdrop-blur-xs border-t border-[#E1E6EB] text-xs text-[#57606A] flex items-center justify-between">
                <span>Architecture snapshot via Supabase Storage</span>
                <span className="font-mono text-[10px] text-[#6E7E8E]">{project.title}</span>
              </div>
            </div>
          )}

          {/* Performance & Benchmark Metrics Grid */}
          {project.stats && project.stats.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6E7E8E]">
                <Activity className="w-3.5 h-3.5 text-[#3894B3]" />
                <span>Verified Metrics & System Benchmarks</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.stats.map((stat, idx) => (
                  <div 
                    key={idx} 
                    className="p-3.5 rounded-xl bg-[#F6F8FA] border border-[#E1E6EB] space-y-1 hover:border-[#D0D7DE] transition-colors"
                  >
                    <div className="text-[11px] font-medium text-[#6E7E8E] uppercase tracking-wider">
                      {stat.label}
                    </div>
                    <div className="text-base font-bold text-[#1B2127] font-mono">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Executive Summary & Problem Formulation */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6E7E8E]">
              <Cpu className="w-3.5 h-3.5 text-[#588A75]" />
              <span>Executive Problem Formulation</span>
            </div>
            <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#D0D7DE] text-[#24292F] text-sm sm:text-base leading-relaxed space-y-2">
              <p>{project.description}</p>
            </div>
          </div>

          {/* Key Architecture Patterns & Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6E7E8E]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3894B3]" />
                <span>Engineered Patterns & Invariants</span>
              </div>
              <div className="grid gap-2.5">
                {project.highlights.map((highlight, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start gap-3 p-3 rounded-lg bg-[#FAFBFC] border border-[#E1E6EB] text-xs sm:text-sm text-[#24292F]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#588A75] shrink-0 mt-0.5" />
                    <span className="leading-snug">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Stack Breakdown */}
          {project.tags && project.tags.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6E7E8E]">
                <Layers className="w-3.5 h-3.5 text-[#A35D43]" />
                <span>Technology Stack & Integrations</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <TechBadge key={idx} name={tag.name} icon={tag.icon} />
                ))}
              </div>
            </div>
          )}

          {/* Longform Technical Deep-Dive Markdown */}
          {project.detailsMarkdown && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6E7E8E]">
                <Sparkles className="w-3.5 h-3.5 text-[#3894B3]" />
                <span>Deep-Dive Engineering Log</span>
              </div>
              <div className="p-5 rounded-xl bg-[#F6F8FA] border border-[#D0D7DE] text-xs sm:text-sm text-[#24292F] space-y-3 whitespace-pre-line leading-relaxed font-sans">
                {project.detailsMarkdown}
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-[#E1E6EB] bg-[#FAFBFC] text-xs text-[#6E7E8E]">
          <span>Vincent Yuann Portfolio • Architectural Case Study</span>
          <button
            onClick={onClose}
            className="text-[#1B2127] font-semibold hover:underline"
          >
            Close (Esc)
          </button>
        </div>
      </div>
    </div>
  );
};
