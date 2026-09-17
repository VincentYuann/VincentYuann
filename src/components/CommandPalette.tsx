import React, { useState, useEffect } from 'react';
import { Search, X, ExternalLink, Terminal, ArrowRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import { FLAGSHIP_PROJECTS, RIVER_PEBBLES, PROFILE_INFO } from '../data/projects';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (id: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProject,
}) => {
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener (Cmd + K or Ctrl + K, and Esc to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredFlagships = FLAGSHIP_PROJECTS.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.name.toLowerCase().includes(query.toLowerCase())) ||
      p.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPebbles = RIVER_PEBBLES.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.tag.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-[#12161A]/40 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-xl rounded-2xl bg-white border border-[#2A2F35]/15 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#2A2F35]/10">
          <Search className="w-4 h-4 text-[#758492]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, technologies, or jump to repo..."
            className="w-full bg-transparent text-sm text-[#1B2127] placeholder-[#8C9AA7] focus:outline-none font-mono"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[#F2EFE9] text-[#758492] hover:text-[#1B2127]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {/* Flagship Projects */}
          {filteredFlagships.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[#8A96A3]">
                Flagship Systems
              </div>
              {filteredFlagships.map((project) => (
                <div
                  key={project.id}
                  onClick={() => {
                    onSelectProject?.(project.id);
                    onClose();
                  }}
                  className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#F4F1EA] cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.stoneAccent }} />
                    <div>
                      <div className="text-xs font-semibold text-[#1B2127] group-hover:text-[#21677E]">
                        {project.title}
                      </div>
                      <div className="text-[11px] text-[#606D7A]">{project.subtitle}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#8C9AA7] hidden sm:inline">
                      {project.tags[0]?.name}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#8C9AA7] group-hover:text-[#1B2127] group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* River Pebbles */}
          {filteredPebbles.length > 0 && (
            <div className="pt-2">
              <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[#8A96A3]">
                Exploratory & DevOps Work
              </div>
              {filteredPebbles.map((pebble) => (
                <a
                  key={pebble.id}
                  href={pebble.githubUrl || '#'}
                  target={pebble.githubUrl ? '_blank' : '_self'}
                  rel="noreferrer"
                  className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#F4F1EA] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Terminal className="w-3.5 h-3.5 text-[#738392]" />
                    <div>
                      <div className="text-xs font-medium text-[#1B2127]">
                        {pebble.title}
                      </div>
                      <div className="text-[11px] text-[#606D7A]">{pebble.tag}</div>
                    </div>
                  </div>
                  {pebble.githubUrl && <ExternalLink className="w-3 h-3 text-[#8C9AA7]" />}
                </a>
              ))}
            </div>
          )}

          {/* Quick External Links */}
          <div className="pt-2 border-t border-[#2A2F35]/10">
            <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[#8A96A3]">
              Navigation & Profiles
            </div>
            <a
              href={PROFILE_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#F4F1EA] text-xs text-[#1B2127]"
            >
              <div className="flex items-center gap-2.5">
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub Profile (github.com/VincentYuann)</span>
              </div>
              <ExternalLink className="w-3 h-3 text-[#8C9AA7]" />
            </a>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2 bg-[#F9F7F2] border-t border-[#2A2F35]/10 flex items-center justify-between text-[11px] font-mono text-[#738392]">
          <span>Use ⌘K to open anytime</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
