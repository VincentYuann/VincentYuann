import React, { useState, useMemo, useEffect } from 'react';
import { X, Search, Filter, ExternalLink, ArrowRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import { TechBadge } from './TechBadge';
import type { FlagshipProject } from '../data/projects';

interface ProjectsGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: FlagshipProject[];
  onSelectProject: (project: FlagshipProject) => void;
  initialFilter?: string;
}

export const ProjectsGalleryModal: React.FC<ProjectsGalleryModalProps> = ({
  isOpen,
  onClose,
  projects,
  onSelectProject,
  initialFilter = 'all',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialFilter);

  useEffect(() => {
    if (initialFilter) {
      setSelectedCategory(initialFilter);
    }
  }, [initialFilter, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/45 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div 
        className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-[#FAFBFD] border border-[#D0D7DE] rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-6 py-5 border-b border-[#E1E6EB] bg-white sticky top-0 z-20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6E7E8E]">
                <span>Architecture Index</span>
                <span>•</span>
                <span className="text-[#3894B3]">Level 1 Discovery</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1B2127]">
                All Projects & Exploratory Systems
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[#57606A] hover:text-[#1B2127] hover:bg-[#E1E6EB]/50 transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search and Category Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
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
            <div className="text-xs font-medium text-[#57606A] px-3 py-1 bg-white border border-[#E1E6EB] rounded-lg self-start sm:self-auto shrink-0 shadow-xs">
              Showing <span className="font-bold text-[#1B2127]">{filteredProjects.length}</span> of {projects.length} systems
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-[#1B2127] text-white shadow-xs'
                  : 'bg-white border border-[#D0D7DE] text-[#57606A] hover:text-[#1B2127]'
              }`}
            >
              All Systems ({projects.length})
            </button>
            <button
              onClick={() => setSelectedCategory('flagships')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 ${
                selectedCategory === 'flagships'
                  ? 'bg-[#1B2127] text-white shadow-xs'
                  : 'bg-white border border-[#D0D7DE] text-[#57606A] hover:text-[#1B2127]'
              }`}
            >
              Flagships ({projects.filter((p) => p.isFlagship).length})
            </button>
            <button
              onClick={() => setSelectedCategory('experiments')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 ${
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
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 ${
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

        {/* Scrollable Gallery Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Filter className="w-8 h-8 text-[#8C959F] mx-auto opacity-50" />
              <div className="text-base font-medium text-[#1B2127]">No matching systems found</div>
              <p className="text-xs text-[#57606A] max-w-sm mx-auto">
                No projects matched &ldquo;{searchQuery}&rdquo;. Try adjusting your keywords or clearing the category filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-2 text-xs font-semibold text-[#3894B3] hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group flex flex-col bg-white border border-[#D0D7DE] hover:border-[#8C959F] rounded-xl p-5 shadow-xs hover:shadow-md transition-all duration-200"
                >
                  {/* Card Header: Category & Type */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-md"
                      style={{
                        backgroundColor: `${project.stoneAccent}15`,
                        color: project.stoneAccent,
                        border: `1px solid ${project.stoneAccent}30`,
                      }}
                    >
                      {project.category}
                    </span>

                    {project.isFlagship ? (
                      <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-[#3894B3]/10 text-[#3894B3]">
                        Flagship
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded bg-[#F6F8FA] text-[#6E7E8E] border border-[#E1E6EB]">
                        Sandbox
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-serif font-bold text-[#1B2127] group-hover:text-[#3894B3] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#57606A] font-medium mb-3 line-clamp-1">
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-[#57606A] leading-relaxed line-clamp-3 mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
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

                  {/* Key Stat Badge if present */}
                  {project.stats && project.stats[0] && (
                    <div className="flex items-center justify-between text-[11px] p-2 rounded-lg bg-[#FAFBFC] border border-[#E1E6EB] mb-4">
                      <span className="text-[#6E7E8E]">{project.stats[0].label}:</span>
                      <span className="font-mono font-bold text-[#1B2127]">{project.stats[0].value}</span>
                    </div>
                  )}

                  {/* Action Row */}
                  <div className="pt-3 border-t border-[#E1E6EB] flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B2127] group-hover:text-[#3894B3] transition-colors"
                    >
                      <span>Read Deep-Dive</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>

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
        </div>

        {/* Footer info bar */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-[#E1E6EB] bg-[#FAFBFC] text-xs text-[#6E7E8E]">
          <span>Uniform Project Architecture • Click any card for comprehensive breakdown</span>
          <button
            onClick={onClose}
            className="text-[#1B2127] font-semibold hover:underline"
          >
            Close Index (Esc)
          </button>
        </div>
      </div>
    </div>
  );
};
