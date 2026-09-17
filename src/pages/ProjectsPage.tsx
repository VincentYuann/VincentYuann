import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowRight, ExternalLink } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { GithubIcon } from '../components/Icons';
import { TechBadge } from '../components/TechBadge';
import type { FlagshipProject } from '../data/projects';
import type { ProfileData } from '../lib/useProfile';

interface ProjectsPageProps {
  projects: FlagshipProject[];
  profile: ProfileData;
  onOpenCommand: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  projects,
  profile,
  onOpenCommand,
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
          : p.category.toLowerCase().includes(selectedCategory.toLowerCase());

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
    <div className="min-h-screen bg-[#FAFBFD] text-gray-900 flex flex-col">
      <Navbar onOpenCommand={onOpenCommand} profile={profile} />

      {/* Main Page Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-8">
        {/* Page Header & Intro */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6E7E8E]">
            <Link to="/" className="hover:text-[#1B2127] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#3894B3]">Level 1 Architecture Discovery</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1B2127] tracking-tight">
            All Projects & Exploratory Systems
          </h1>

          <p className="text-sm sm:text-base text-[#57606A] max-w-2xl leading-relaxed">
            A comprehensive catalog of production architectures, real-time sync systems, applied GenAI pipelines, and exploratory sandboxes. Click any card to inspect the deep-dive engineering log.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="p-4 sm:p-5 bg-white border border-[#D0D7DE] rounded-2xl shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <Search className="w-4 h-4 text-[#8C959F] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search systems, frameworks (Docker, React, Qdrant), keywords..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-[#F6F8FA] border border-[#D0D7DE] rounded-xl focus:bg-white focus:outline-none focus:border-[#3894B3] focus:ring-2 focus:ring-[#3894B3]/20 transition-all placeholder:text-[#8C959F]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6E7E8E] hover:text-[#1B2127]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Count Badge */}
            <div className="text-xs font-medium text-[#57606A] px-3 py-1.5 bg-[#F6F8FA] border border-[#E1E6EB] rounded-lg self-start sm:self-auto shrink-0 font-mono">
              Showing <span className="font-bold text-[#1B2127]">{filteredProjects.length}</span> of {projects.length} systems
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#1B2127] text-white shadow-xs'
                  : 'bg-white border border-[#D0D7DE] text-[#57606A] hover:text-[#1B2127]'
              }`}
            >
              All Systems ({projects.length})
            </button>
            <button
              onClick={() => setSelectedCategory('flagships')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 cursor-pointer ${
                selectedCategory === 'flagships'
                  ? 'bg-[#1B2127] text-white shadow-xs'
                  : 'bg-white border border-[#D0D7DE] text-[#57606A] hover:text-[#1B2127]'
              }`}
            >
              Flagships ({projects.filter((p) => p.isFlagship).length})
            </button>
            <button
              onClick={() => setSelectedCategory('experiments')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 cursor-pointer ${
                selectedCategory === 'experiments'
                  ? 'bg-[#1B2127] text-white shadow-xs'
                  : 'bg-white border border-[#D0D7DE] text-[#57606A] hover:text-[#1B2127]'
              }`}
            >
              River Pebbles ({projects.filter((p) => !p.isFlagship).length})
            </button>
            {categories
              .filter((c) => c !== 'all')
              .map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#1B2127] text-white shadow-xs'
                      : 'bg-white border border-[#D0D7DE] text-[#57606A] hover:text-[#1B2127]'
                  }`}
                >
                  {cat}
                </button>
              ))}
          </div>
        </div>

        {/* Card Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#D0D7DE] rounded-2xl p-8 space-y-3">
            <Filter className="w-8 h-8 text-[#8C959F] mx-auto opacity-50" />
            <div className="text-base font-bold text-[#1B2127]">No matching systems found</div>
            <p className="text-xs text-[#57606A] max-w-sm mx-auto">
              No projects matched &ldquo;{searchQuery}&rdquo;. Try adjusting your keywords or clearing the category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-2 text-xs font-semibold text-[#3894B3] hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col bg-white border border-[#D0D7DE] hover:border-[#8C959F] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-200"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-md"
                    style={{
                      backgroundColor: `${project.stoneAccent}15`,
                      color: project.stoneAccent,
                      border: `1px solid ${project.stoneAccent}30`,
                    }}
                  >
                    {project.category}
                  </span>

                  {project.isFlagship ? (
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-[#3894B3]/10 text-[#3894B3] border border-[#3894B3]/20">
                      Flagship
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded bg-[#F6F8FA] text-[#6E7E8E] border border-[#E1E6EB]">
                      Sandbox
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <Link to={`/projects/${project.id}`} className="block group">
                  <h2 className="text-lg font-serif font-bold text-[#1B2127] group-hover:text-[#3894B3] transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-xs text-[#57606A] font-medium mt-0.5 mb-3 line-clamp-1">
                    {project.subtitle}
                  </p>
                </Link>

                {/* Description */}
                <p className="text-xs text-[#57606A] leading-relaxed line-clamp-3 mb-4 flex-1">
                  {project.description}
                </p>

                {/* Tech Stack Badges */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.slice(0, 4).map((tag, idx) => (
                      <TechBadge key={idx} name={tag.name} icon={tag.icon} />
                    ))}
                    {project.tags.length > 4 && (
                      <span className="text-[10px] text-[#6E7E8E] self-center px-1.5 py-0.5 rounded bg-[#F6F8FA] border border-[#E1E6EB]">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Metric Grid Preview if present */}
                {project.stats && project.stats[0] && (
                  <div className="flex items-center justify-between text-[11px] p-2 rounded-lg bg-[#FAFBFC] border border-[#E1E6EB] mb-4">
                    <span className="text-[#6E7E8E]">{project.stats[0].label}:</span>
                    <span className="font-mono font-bold text-[#1B2127]">{project.stats[0].value}</span>
                  </div>
                )}

                {/* Action Row */}
                <div className="pt-3 border-t border-[#E1E6EB] flex items-center justify-between gap-2">
                  <Link
                    to={`/projects/${project.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B2127] group-hover:text-[#3894B3] transition-colors"
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
                        className="p-1.5 text-[#57606A] hover:text-[#1B2127] hover:bg-[#F6F8FA] rounded-md transition-colors"
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
                        className="p-1.5 text-[#57606A] hover:text-[#3894B3] hover:bg-[#F6F8FA] rounded-md transition-colors"
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
