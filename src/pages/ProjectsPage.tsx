import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowRight, ExternalLink } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { GithubIcon } from '../components/Icons';
import { TechBadge } from '../components/TechBadge';
import type { FlagshipProject } from '../data/projects';
import type { ProfileData } from '../lib/useProfile';
import '../styles/projects-page.css';

interface ProjectsPageProps {
  projects: FlagshipProject[];
  profile: ProfileData;
  onOpenCommand: () => void;
  onOpenProfile?: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  projects,
  profile,
  onOpenCommand,
  onOpenProfile,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add('all');
    projects.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats);
  }, [projects]);

  // Filter projects based on category and search
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory =
        selectedCategory === 'all'
          ? true
          : selectedCategory === 'flagships'
          ? p.isFlagship
          : selectedCategory === 'experiments'
          ? !p.isFlagship
          : p.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        p.title.toLowerCase().includes(q) ||
        p.subtitle?.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.name.toLowerCase().includes(q)) ||
        p.highlights?.some((h) => h.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div className="projects-page-container">
      <Navbar onOpenCommand={onOpenCommand} onOpenProfile={onOpenProfile} profile={profile} />

      {/* Main Page Container */}
      <main className="projects-main-content">
        {/* Page Header & Intro */}
        <div className="projects-header-block">
          <div className="projects-breadcrumb-bar">
            <Link to="/" className="projects-breadcrumb-link">Home</Link>
            <span>/</span>
            <span className="projects-breadcrumb-current">Level 1 Architecture Discovery</span>
          </div>

          <h1 className="projects-title">
            All Projects & Exploratory Systems
          </h1>

          <p className="projects-subtitle">
            A comprehensive catalog of production architectures, real-time sync systems, applied GenAI pipelines, and exploratory sandboxes. Click any card to inspect the deep-dive engineering log.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="projects-toolbar-card">
          <div className="projects-toolbar-row">
            {/* Search Input */}
            <div className="projects-search-box">
              <Search className="projects-search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search systems, frameworks (Docker, React, Qdrant), keywords..."
                className="projects-search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="projects-search-clear-btn"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Count Badge */}
            <div className="projects-count-badge">
              Showing <span className="projects-count-highlight">{filteredProjects.length}</span> of {projects.length} systems
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="projects-filter-pills">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`projects-filter-pill ${
                selectedCategory === 'all'
                  ? 'projects-filter-pill-active'
                  : 'projects-filter-pill-inactive'
              }`}
            >
              All Systems ({projects.length})
            </button>
            <button
              onClick={() => setSelectedCategory('flagships')}
              className={`projects-filter-pill ${
                selectedCategory === 'flagships'
                  ? 'projects-filter-pill-active'
                  : 'projects-filter-pill-inactive'
              }`}
            >
              Flagships ({projects.filter((p) => p.isFlagship).length})
            </button>
            <button
              onClick={() => setSelectedCategory('experiments')}
              className={`projects-filter-pill ${
                selectedCategory === 'experiments'
                  ? 'projects-filter-pill-active'
                  : 'projects-filter-pill-inactive'
              }`}
            >
              Sandboxes & Labs ({projects.filter((p) => !p.isFlagship).length})
            </button>
            {categories
              .filter((c) => c !== 'all')
              .map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`projects-filter-pill ${
                    selectedCategory === cat
                      ? 'projects-filter-pill-active'
                      : 'projects-filter-pill-inactive'
                  }`}
                >
                  {cat}
                </button>
              ))}
          </div>
        </div>

        {/* Card Grid or Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="projects-empty-card">
            <Filter className="projects-empty-icon" />
            <div className="projects-empty-title">
              {projects.length === 0 ? 'Studio Archive in Preparation' : 'No matching systems found'}
            </div>
            <p className="projects-empty-text">
              {projects.length === 0
                ? 'No published projects are currently loaded from Supabase PostgreSQL. Configure or seed records in the Admin Console.'
                : `No systems matched "${searchQuery}". Try adjusting your keywords or clearing the category filter.`}
            </p>
            {projects.length === 0 ? (
              <Link
                to="/admin"
                className="projects-empty-reset-btn inline-block"
              >
                Go to Admin Console →
              </Link>
            ) : (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="projects-empty-reset-btn"
              >
                Reset filters
              </button>
            )}
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="project-item-card group"
              >
                {/* Card Header */}
                <div className="project-item-header">
                  <span
                    className="project-item-category"
                    style={{
                      backgroundColor: `${project.stoneAccent}15`,
                      color: project.stoneAccent,
                      border: `1px solid ${project.stoneAccent}30`,
                    }}
                  >
                    {project.category}
                  </span>

                  {project.isFlagship ? (
                    <span className="project-item-flagship-pill">
                      Flagship
                    </span>
                  ) : (
                    <span className="project-item-sandbox-pill">
                      Sandbox
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <Link to={`/projects/${project.id}`} className="block group">
                  <h2 className="project-item-title">
                    {project.title}
                  </h2>
                  <p className="project-item-subtitle">
                    {project.subtitle}
                  </p>
                </Link>

                {/* Description */}
                <p className="project-item-desc">
                  {project.description}
                </p>

                {/* Tech Stack Badges */}
                {project.tags && project.tags.length > 0 && (
                  <div className="project-item-tags">
                    {project.tags.slice(0, 4).map((tag, idx) => (
                      <TechBadge key={idx} name={tag.name} icon={tag.icon} />
                    ))}
                    {project.tags.length > 4 && (
                      <span className="project-item-tags-overflow">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Metric Grid Preview if present */}
                {project.stats && project.stats[0] && (
                  <div className="project-item-stat-preview">
                    <span className="project-item-stat-label">{project.stats[0].label}:</span>
                    <span className="project-item-stat-val">{project.stats[0].value}</span>
                  </div>
                )}

                {/* Action Row */}
                <div className="project-item-actions">
                  <Link
                    to={`/projects/${project.id}`}
                    className="project-item-read-link"
                  >
                    <span>Read Deep-Dive</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <div className="flex items-center gap-1.5">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="project-item-icon-link"
                        title="View GitHub Repository"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="project-item-icon-link-live"
                        title="Open Live Demo"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer
        profile={profile}
      />
    </div>
  );
};
