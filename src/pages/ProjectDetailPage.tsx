import React, { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, CheckCircle2, Activity, Cpu, ShieldCheck, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { GithubIcon } from '../components/Icons';
import { TechBadge } from '../components/TechBadge';
import type { FlagshipProject } from '../data/projects';
import type { ProfileData } from '../lib/useProfile';
import '../styles/project-detail-page.css';

interface ProjectDetailPageProps {
  projects: FlagshipProject[];
  profile: ProfileData;
  onOpenCommand: () => void;
  onOpenProfile?: () => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  projects,
  profile,
  onOpenCommand,
  onOpenProfile,
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
      <div className="detail-page-container">
        <Navbar onOpenCommand={onOpenCommand} onOpenProfile={onOpenProfile} profile={profile} />
        <main className="detail-notfound-main">
          <div className="detail-notfound-card">
            <div className="detail-notfound-badge">
              404
            </div>
            <h1 className="detail-notfound-title">System Not Found</h1>
            <p className="detail-notfound-text">
              Could not find a project milestone with ID <code className="detail-notfound-code">{id}</code>.
            </p>
            <Link
              to="/projects"
              className="detail-notfound-link"
            >
              <span>Back to Systems Gallery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="detail-page-container">
      <Navbar onOpenCommand={onOpenCommand} onOpenProfile={onOpenProfile} profile={profile} />

      <main className="detail-main-content">
        {/* Breadcrumb & Navigation Bar */}
        <div className="detail-top-nav">
          <div className="flex items-center gap-3">
            <Link
              to="/projects"
              className="detail-back-link"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Projects Gallery</span>
            </Link>

            <div className="detail-breadcrumb-trail">
              <span>/</span>
              <span className="detail-breadcrumb-level">Level 2 Deep-Dive</span>
              <span>/</span>
              <span className="detail-breadcrumb-id">{project.id}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="detail-category-badge"
              style={{
                backgroundColor: `${project.stoneAccent}15`,
                color: project.stoneAccent,
                border: `1px solid ${project.stoneAccent}30`,
              }}
            >
              {project.category}
            </span>
            {project.isFlagship && (
              <span className="detail-flagship-badge">
                Flagship Milestone
              </span>
            )}
          </div>
        </div>

        {/* Hero Identity Header */}
        <div className="detail-hero-section">
          <div className="detail-title-row">
            <span
              className="detail-stone-dot"
              style={{ backgroundColor: project.stoneAccent }}
            />
            <h1 className="detail-title">
              {project.title}
            </h1>
          </div>

          <p className="detail-subtitle">
            {project.subtitle}
          </p>

          {/* Action Row */}
          <div className="detail-cta-row">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="detail-cta-github"
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
                className="detail-cta-demo"
              >
                <ExternalLink className="w-4 h-4 text-[#3894B3]" />
                <span>Open Live Production Demo ↗</span>
              </a>
            )}
          </div>
        </div>

        {/* Media / Screenshot Showcase (Supabase Storage) */}
        {project.imageUrl && (
          <div className="detail-image-card">
            <img
              src={project.imageUrl}
              alt={`${project.title} screenshot`}
              className="detail-image-img"
              loading="lazy"
            />
            <div className="detail-image-footer">
              <span>Architecture snapshot via Supabase Storage (`portfolio-assets`)</span>
              <span className="detail-image-footer-code">{project.title}</span>
            </div>
          </div>
        )}

        {/* Metrics & System Benchmarks Grid */}
        {project.stats && project.stats.length > 0 && (
          <div className="detail-section-block">
            <div className="detail-section-label">
              <Activity className="w-4 h-4 text-[#3894B3]" />
              <span>Verified System Benchmarks</span>
            </div>
            <div className="detail-benchmarks-grid">
              {project.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="detail-benchmark-cell"
                >
                  <div className="detail-benchmark-label">
                    {stat.label}
                  </div>
                  <div className="detail-benchmark-value">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Executive Problem Statement */}
        <div className="detail-section-block">
          <div className="detail-section-label">
            <Cpu className="w-4 h-4 text-[#588A75]" />
            <span>Executive Problem Formulation & Impact</span>
          </div>
          <div className="detail-description-card">
            <p>{project.description}</p>
          </div>
        </div>

        {/* Engineered Architecture Patterns & Invariants */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="detail-section-block">
            <div className="detail-section-label">
              <ShieldCheck className="w-4 h-4 text-[#3894B3]" />
              <span>Engineered Architectural Invariants</span>
            </div>
            <div className="detail-invariants-grid">
              {project.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="detail-invariant-card"
                >
                  <CheckCircle2 className="detail-invariant-check" />
                  <span className="detail-invariant-text">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Breakdown */}
        {project.tags && project.tags.length > 0 && (
          <div className="detail-section-block">
            <div className="detail-section-label">
              <Layers className="w-4 h-4 text-[#A35D43]" />
              <span>Technology Stack & Integrations</span>
            </div>
            <div className="detail-tags-card">
              {project.tags.map((tag, idx) => (
                <TechBadge key={idx} name={tag.name} icon={tag.icon} />
              ))}
            </div>
          </div>
        )}

        {/* Deep-Dive Engineering Log (Markdown) */}
        {project.detailsMarkdown && (
          <div className="detail-section-block pt-4">
            <div className="detail-section-label">
              <Sparkles className="w-4 h-4 text-[#3894B3]" />
              <span>Deep-Dive Engineering Log & Documentation</span>
            </div>
            <div className="detail-markdown-card">
              {project.detailsMarkdown}
            </div>
          </div>
        )}

        {/* Next / Prev Navigation Stack */}
        <div className="detail-pagination-footer">
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.id}`}
              className="detail-pagination-btn"
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
              className="detail-pagination-btn"
            >
              <span>Next: {nextProject.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              to="/projects"
              className="detail-pagination-btn"
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
