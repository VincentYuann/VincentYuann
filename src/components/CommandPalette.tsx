import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ExternalLink, Terminal, ArrowRight, FolderKanban, Lock, Home, Mail, FileText, Settings } from 'lucide-react';
import { useTheme } from 'next-themes';
import { GithubIcon } from './Icons';
import { FLAGSHIP_PROJECTS, RIVER_PEBBLES, PROFILE_INFO, type FlagshipProject, type RiverPebble } from '../data/projects';
import { THEME_OPTIONS } from './ThemeSelector';
import '../styles/command-palette.css';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSettings?: () => void;
  flagships?: FlagshipProject[];
  pebbles?: RiverPebble[];
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenSettings,
  flagships = FLAGSHIP_PROJECTS,
  pebbles = RIVER_PEBBLES,
}) => {
  const [query, setQuery] = useState('');
  const { setTheme } = useTheme();
  const navigate = useNavigate();

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

  const filteredFlagships = flagships.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.name.toLowerCase().includes(query.toLowerCase())) ||
      p.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPebbles = pebbles.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.tag.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
  );

  const filteredThemes = query.trim().length > 0 ? THEME_OPTIONS.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.category.toLowerCase().includes(query.toLowerCase()) ||
      t.description.toLowerCase().includes(query.toLowerCase()) ||
      'theme appearance mode color'.includes(query.toLowerCase())
  ) : [];

  return (
    <div
      onClick={onClose}
      className="command-backdrop"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="command-modal"
      >
        {/* Search Input Bar */}
        <div className="command-input-row">
          <Search className="w-4 h-4 text-[#738392] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search systems, frameworks, jump to page, or change theme..."
            autoFocus
            className="command-input"
          />
          <button
            onClick={onClose}
            className="p-1 text-[#8C9AA7] hover:text-[#1B2127] rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="command-results-list">
          {/* Quick Page Jumps */}
          <div className="command-group-heading">
            Pages & Views
          </div>
          <div
            onClick={() => {
              navigate('/projects');
              onClose();
            }}
            className="command-item cursor-pointer"
          >
            <div className="command-item-main">
              <FolderKanban className="w-3.5 h-3.5 text-[#3894B3]" />
              <div>
                <div className="command-item-title">Projects Index Gallery</div>
                <div className="command-item-sub">View all {flagships.length + pebbles.length} systems & experiments</div>
              </div>
            </div>
            <ArrowRight className="command-item-icon w-3.5 h-3.5 text-[#8C9AA7]" />
          </div>

          <div
            onClick={() => {
              navigate('/resume');
              onClose();
            }}
            className="command-item cursor-pointer"
          >
            <div className="command-item-main">
              <FileText className="w-3.5 h-3.5 text-[#8250DF]" />
              <div>
                <div className="command-item-title">Resume & LaTeX Source</div>
                <div className="command-item-sub">View rendered PDF and syntax-highlighted .tex source</div>
              </div>
            </div>
            <ArrowRight className="command-item-icon w-3.5 h-3.5 text-[#8C9AA7]" />
          </div>

          {onOpenSettings && (
            <div
              onClick={() => {
                onClose();
                onOpenSettings();
              }}
              className="command-item cursor-pointer"
            >
              <div className="command-item-main">
                <Settings className="w-3.5 h-3.5 text-[#3894B3]" />
                <div>
                  <div className="command-item-title">Settings & Appearance</div>
                  <div className="command-item-sub">Customize color palettes, dark mode, and themes</div>
                </div>
              </div>
              <ArrowRight className="command-item-icon w-3.5 h-3.5 text-[#8C9AA7]" />
            </div>
          )}

          {/* Theme Quick Switch (when searching) */}
          {filteredThemes.length > 0 && (
            <div className="pt-2">
              <div className="command-group-heading">
                Color Themes & Appearance
              </div>
              {filteredThemes.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => {
                    setTheme(opt.id);
                    onClose();
                  }}
                  className="command-item cursor-pointer"
                >
                  <div className="command-item-main">
                    <span 
                      className="w-3 h-3 rounded-full border border-black/20 shrink-0" 
                      style={{ backgroundColor: opt.bgHex }}
                    />
                    <div>
                      <div className="command-item-title">Switch to {opt.name}</div>
                      <div className="command-item-sub">{opt.description}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                    {opt.category}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div
            onClick={() => {
              navigate('/admin');
              onClose();
            }}
            className="command-item cursor-pointer"
          >
            <div className="command-item-main">
              <Lock className="w-3.5 h-3.5 text-[#A35D43]" />
              <div>
                <div className="command-item-title">Admin CMS & Editor</div>
                <div className="command-item-sub">Manage projects, uploads, and profile info</div>
              </div>
            </div>
            <ArrowRight className="command-item-icon w-3.5 h-3.5 text-[#8C9AA7]" />
          </div>

          <div
            onClick={() => {
              navigate('/');
              onClose();
            }}
            className="command-item cursor-pointer"
          >
            <div className="command-item-main">
              <Home className="w-3.5 h-3.5 text-[#588A75]" />
              <div>
                <div className="command-item-title">River Timeline (Home)</div>
                <div className="command-item-sub">Trace the chronological current</div>
              </div>
            </div>
            <ArrowRight className="command-item-icon w-3.5 h-3.5 text-[#8C9AA7]" />
          </div>

          <div
            onClick={() => {
              navigate('/contact');
              onClose();
            }}
            className="command-item cursor-pointer"
          >
            <div className="command-item-main">
              <Mail className="w-3.5 h-3.5 text-[#3894B3]" />
              <div>
                <div className="command-item-title">Hire Me / Get in Touch</div>
                <div className="command-item-sub">Send a direct message or job opportunity with specs</div>
              </div>
            </div>
            <ArrowRight className="command-item-icon w-3.5 h-3.5 text-[#8C9AA7]" />
          </div>

          {/* Flagship Systems */}
          {filteredFlagships.length > 0 && (
            <div className="pt-2">
              <div className="command-group-heading">
                Flagship Milestones
              </div>
              {filteredFlagships.map((project) => (
                <div
                  key={project.id}
                  onClick={() => {
                    navigate(`/projects/${project.id}`);
                    onClose();
                  }}
                  className="command-item cursor-pointer"
                >
                  <div className="command-item-main">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.stoneAccent }} />
                    <div>
                      <div className="command-item-title">
                        {project.title}
                      </div>
                      <div className="command-item-sub">{project.subtitle}</div>
                    </div>
                  </div>
                  <div className="command-item-meta">
                    <span className="text-[10px] font-mono text-[#8C9AA7] hidden sm:inline">
                      {project.tags[0]?.name}
                    </span>
                    <ArrowRight className="command-item-icon w-3.5 h-3.5 text-[#8C9AA7] transition-all" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* River Pebbles */}
          {filteredPebbles.length > 0 && (
            <div className="pt-2">
              <div className="command-group-heading">
                Exploratory & DevOps Work
              </div>
              {filteredPebbles.map((pebble) => (
                <div
                  key={pebble.id}
                  onClick={() => {
                    navigate(`/projects/${pebble.id}`);
                    onClose();
                  }}
                  className="command-item cursor-pointer"
                >
                  <div className="command-item-main">
                    <Terminal className="w-3.5 h-3.5 text-[#738392]" />
                    <div>
                      <div className="command-item-title">
                        {pebble.title}
                      </div>
                      <div className="command-item-sub">{pebble.tag}</div>
                    </div>
                  </div>
                  <ArrowRight className="command-item-icon w-3.5 h-3.5 text-[#8C9AA7]" />
                </div>
              ))}
            </div>
          )}

          {/* Quick External Links */}
          <div className="pt-2 border-t border-[#2A2F35]/10">
            <div className="command-group-heading">
              External Profiles
            </div>
            <a
              href={PROFILE_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="command-item text-xs text-[#1B2127]"
            >
              <div className="command-item-main">
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub Profile (github.com/VincentYuann)</span>
              </div>
              <ExternalLink className="w-3 h-3 text-[#8C9AA7]" />
            </a>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="command-footer">
          <span>Use ⌘K to open anytime</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
