import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  FolderGit2,
  User,
  FileText,
  Mail,
  Sun,
  Moon,
  Monitor,
  Command,
  ArrowRight,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { setTheme } from '../store/slices/themeSlice';
import { setCommandOpen } from '../store/slices/uiSlice';
import { HankoStamp, EnsoCircle } from './JapaneseMotifs';
import { PROFILE_INFO } from '../data/projects';
import type { ProfileData } from '../lib/useProfile';

interface SidebarProps {
  profile?: ProfileData;
  onOpenCommand?: () => void;
  onOpenProfile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  profile,
  onOpenCommand,
  onOpenProfile,
}) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.theme.mode);

  const currentProfile = profile || {
    name: PROFILE_INFO.name,
    role: PROFILE_INFO.title,
    status: PROFILE_INFO.status,
  };

  const navItems = [
    { label: 'HOME', path: '/', icon: Home },
    { label: 'PROJECTS', path: '/projects', icon: FolderGit2 },
    { label: 'RESUME', path: '/resume', icon: FileText },
    { label: 'CONTACT', path: '/contact', icon: Mail },
  ];

  const handleCommandClick = () => {
    if (onOpenCommand) {
      onOpenCommand();
    } else {
      dispatch(setCommandOpen(true));
    }
  };

  return (
    <aside className="hidden lg:flex flex-col justify-between w-[240px] shrink-0 h-screen sticky top-0 bg-sidebar border-r border-border p-6 overflow-y-auto z-40 transition-colors">
      {/* Top Section: Brand Identity & Navigation */}
      <div className="space-y-7">
        {/* Brand Lockup with Authentic Hanko Seal */}
        <Link to="/" className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
          <div className="flex items-start gap-3">
            <HankoStamp size={32} className="group-hover:scale-105 transition-transform" />

            <div>
              <div className="font-serif text-lg leading-tight text-foreground font-normal tracking-tight group-hover:text-accent transition-colors">
                {currentProfile.name}
              </div>
              <div className="text-[10px] font-sans font-semibold tracking-wider text-muted-foreground uppercase mt-0.5">
                {currentProfile.role || 'Software & AI Engineer'}
              </div>
            </div>
          </div>
        </Link>

        {/* Navigation Items */}
        <nav className="space-y-1" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive =
              item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path);
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-[11px] font-sans font-semibold tracking-wider transition-all min-h-[44px] ${
                  isActive
                    ? 'text-accent bg-accent/10 font-bold'
                    : 'text-foreground/80 hover:text-foreground hover:bg-card/60'
                }`}
              >
                <Icon
                  className={`size-4 shrink-0 transition-colors ${
                    isActive ? 'text-accent' : 'text-muted-foreground'
                  }`}
                  strokeWidth={1.5}
                />
                <span>{item.label}</span>
                {isActive && (
                  <span className="ml-auto size-1.5 rounded-full bg-accent" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Quick Tools: Cmd+K and Profile */}
        <div className="border-t border-border pt-4 flex items-center gap-1.5">
          <button
            onClick={handleCommandClick}
            className="flex-1 inline-flex items-center justify-between px-2.5 py-1.5 rounded-sm border border-border bg-card/60 hover:bg-card text-[10px] font-sans font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer min-h-[36px]"
            title="Search commands (Cmd+K)"
          >
            <span className="flex items-center gap-1.5">
              <Command className="size-3" strokeWidth={1.5} />
              <span>Search</span>
            </span>
            <kbd className="text-[10px] font-mono px-1 py-0.5 rounded bg-muted/60 border border-border">
              ⌘K
            </kbd>
          </button>

          {onOpenProfile && (
            <button
              onClick={onOpenProfile}
              className="p-1.5 rounded-sm border border-border bg-card/60 hover:bg-card text-muted-foreground hover:text-foreground transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
              title="Profile Overview"
            >
              <User className="size-3.5" strokeWidth={1.5} />
            </button>
          )}
        </div>

        {/* Featured Editorial Card (from Website Overall Theme.webp reference) */}
        <div className="rounded-sm border border-border bg-card/50 p-2.5 space-y-2">
          <div className="relative w-full h-24 rounded-sm overflow-hidden border border-border/80">
            <img 
              src="/images/editorial-lantern-shelf.jpg" 
              alt="Akari Studio Craft" 
              className="w-full h-full object-cover filter contrast-[0.95] brightness-[0.98]"
              loading="lazy"
            />
            <span className="absolute top-1.5 left-1.5 text-[10px] font-sans font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-xs bg-card/90 text-foreground backdrop-blur-xs border border-border/40">
              AKARI EDITORIAL
            </span>
          </div>
          <div className="space-y-0.5 pt-0.5">
            <div className="text-[11px] font-serif text-foreground font-normal">
              Tactile Software Craft
            </div>
            <div className="text-[10px] font-sans text-muted-foreground">
              Quiet systems & distributed design
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Day / Night / System Switcher & Ensō Studio Card */}
      <div className="space-y-4 pt-4 border-t border-border">
        {/* 3-Way Theme Switcher (Day / Night / System) */}
        <div className="flex items-center p-0.5 rounded-sm bg-card border border-border">
          <button
            onClick={() => dispatch(setTheme('light'))}
            className={`flex-1 flex items-center justify-center gap-1 py-1.5 text-[10px] font-sans font-semibold tracking-wider rounded-sm transition-all cursor-pointer min-h-[32px] ${
              themeMode === 'light'
                ? 'bg-primary text-primary-foreground shadow-2xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            title="Day Mode (Warm Washi)"
          >
            <Sun className="size-3" strokeWidth={1.75} />
            <span>DAY</span>
          </button>

          <button
            onClick={() => dispatch(setTheme('dark'))}
            className={`flex-1 flex items-center justify-center gap-1 py-1.5 text-[10px] font-sans font-semibold tracking-wider rounded-sm transition-all cursor-pointer min-h-[32px] ${
              themeMode === 'dark'
                ? 'bg-primary text-primary-foreground shadow-2xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            title="Night Mode (Charcoal Slate)"
          >
            <Moon className="size-3" strokeWidth={1.75} />
            <span>NIGHT</span>
          </button>

          <button
            onClick={() => {
              if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                dispatch(setTheme('dark'));
              } else {
                dispatch(setTheme('light'));
              }
            }}
            className="px-2 py-1.5 text-[10px] font-sans font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer min-h-[32px] flex items-center justify-center"
            title="System Mode"
          >
            <Monitor className="size-3" strokeWidth={1.75} />
          </button>
        </div>

        {/* Ensō Studio Signoff */}
        <div className="flex items-center justify-between px-1 text-muted-foreground">
          <div className="flex items-center gap-2">
            <EnsoCircle size={22} className="text-foreground/40" />
            <span className="text-[10px] font-sans font-semibold tracking-wider uppercase">
              STUDIO
            </span>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1 text-[10px] font-sans font-semibold uppercase tracking-wider text-accent hover:underline"
          >
            <span>Let's talk</span>
            <ArrowRight className="size-2.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
};
