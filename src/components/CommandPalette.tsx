import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FolderKanban,
  FileText,
  Lock,
  Home,
  Mail,
  SunMoon,
  Layers,
  ArrowRight,
} from 'lucide-react';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from './ui/command';
import { useAppDispatch, useAppSelector } from '../store';
import { toggleTheme } from '../store/slices/themeSlice';
import { FLAGSHIP_PROJECTS, type FlagshipProject } from '../data/projects';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  flagships?: FlagshipProject[];
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  flagships = FLAGSHIP_PROJECTS,
}) => {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector((state) => state.theme.mode);
  const navigate = useNavigate();

  // Keyboard shortcut listener (Cmd + K or Ctrl + K, and Esc to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSelect = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <CommandDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title="Akari Studio Command Palette"
      description="Quick search and jump to systems, code repositories, or theme toggles"
    >
      <CommandInput placeholder="Search systems, frameworks, jump to view, or switch theme..." />

      <CommandList>
        <CommandEmpty>No matching systems or views found.</CommandEmpty>

        {/* Quick Page Jumps */}
        <CommandGroup heading="Pages & Views">
          <CommandItem onSelect={() => handleSelect(() => navigate('/projects'))}>
            <FolderKanban className="size-4 text-accent" />
            <div className="flex-1 min-w-0">
              <span className="font-semibold">Projects Index Gallery</span>
              <span className="text-muted-foreground ml-2 text-[11px]">All technical systems & architectures</span>
            </div>
            <ArrowRight className="size-3.5 text-muted-foreground" />
          </CommandItem>

          <CommandItem onSelect={() => handleSelect(() => navigate('/resume'))}>
            <FileText className="size-4 text-[#8250DF] dark:text-[#A371F7]" />
            <div className="flex-1 min-w-0">
              <span className="font-semibold">Resume & LaTeX Source</span>
              <span className="text-muted-foreground ml-2 text-[11px]">PDF preview and syntax-highlighted source</span>
            </div>
            <ArrowRight className="size-3.5 text-muted-foreground" />
          </CommandItem>

          <CommandItem onSelect={() => handleSelect(() => navigate('/contact'))}>
            <Mail className="size-4 text-[#2E6171] dark:text-[#3894B3]" />
            <div className="flex-1 min-w-0">
              <span className="font-semibold">Contact & Inquiries</span>
              <span className="text-muted-foreground ml-2 text-[11px]">Send direct message or book discussion</span>
            </div>
            <ArrowRight className="size-3.5 text-muted-foreground" />
          </CommandItem>

          <CommandItem onSelect={() => handleSelect(() => navigate('/admin'))}>
            <Lock className="size-4 text-[#9E5A3F]" />
            <div className="flex-1 min-w-0">
              <span className="font-semibold">Admin CMS & Editor</span>
              <span className="text-muted-foreground ml-2 text-[11px]">Manage projects, uploads, and profile</span>
            </div>
            <ArrowRight className="size-3.5 text-muted-foreground" />
          </CommandItem>

          <CommandItem onSelect={() => handleSelect(() => navigate('/'))}>
            <Home className="size-4 text-[#526D57]" />
            <div className="flex-1 min-w-0">
              <span className="font-semibold">Home Landing</span>
              <span className="text-muted-foreground ml-2 text-[11px]">Architectural showcase</span>
            </div>
            <ArrowRight className="size-3.5 text-muted-foreground" />
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Theme Quick Switch */}
        <CommandGroup heading="Aesthetic Mode">
          <CommandItem onSelect={() => handleSelect(() => dispatch(toggleTheme()))}>
            <SunMoon className="size-4 text-accent" />
            <div className="flex-1 min-w-0">
              <span className="font-semibold">
                Toggle Mode ({currentTheme === 'dark' ? 'Switch to Day Mode' : 'Switch to Night Mode'})
              </span>
              <span className="text-muted-foreground ml-2 text-[11px]">
                Currently {currentTheme === 'dark' ? 'Night (#1E1F24)' : 'Day (#F2E9DA)'}
              </span>
            </div>
            <CommandShortcut>Theme</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Technical Systems */}
        <CommandGroup heading="Architectural Systems">
          {flagships.map((project) => (
            <CommandItem
              key={project.id}
              value={`${project.title} ${project.category} ${project.tags.map((t) => t.name).join(' ')}`}
              onSelect={() => handleSelect(() => navigate(`/projects/${project.id}`))}
            >
              <Layers className="size-4 text-accent" />
              <div className="flex-1 min-w-0">
                <span className="font-semibold">{project.title}</span>
                <span className="text-muted-foreground ml-2 text-[11px] truncate">
                  {project.subtitle || project.category}
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-sm bg-muted text-muted-foreground border border-border">
                {project.category}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
