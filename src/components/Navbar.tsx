import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Command,
  User,
  Menu,
  Home,
  FolderGit2,
  FileText,
  Mail,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { HankoStamp, EnsoCircle } from './JapaneseMotifs';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../lib/useAuth';
import type { ProfileData } from '../lib/useProfile';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import '../styles/navbar.css';

interface NavbarProps {
  onOpenCommand: () => void;
  onOpenProfile?: () => void;
  profile: ProfileData;
  isAdmin?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenCommand, 
  onOpenProfile, 
  profile, 
  isAdmin: propIsAdmin,
}) => {
  const location = useLocation();
  const { isAdmin: authIsAdmin } = useAuth();
  const isAdmin = propIsAdmin ?? authIsAdmin;
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Strictly enforce single 'n' for Vincent's display name logo
  const displayName = profile.name === 'Vincent Yuann' ? 'Vincent Yuan' : (profile.name || 'Vincent Yuan');

  const navLinks = [
    { label: 'HOME', path: '/', icon: Home },
    { label: 'PROJECTS', path: '/projects', icon: FolderGit2 },
    { label: 'RESUME', path: '/resume', icon: FileText },
    { label: 'CONTACT', path: '/contact', icon: Mail },
  ];

  return (
    <nav className="navbar-wrapper" aria-label="Mobile and Tablet Navigation">
      {/* Brand Identity: Just Hanko Mark and Vincent Yuan (single 'n') */}
      <div className="navbar-brand-group">
        <Link to="/" className="navbar-brand-link group">
          <HankoStamp size={26} className="group-hover:scale-105 transition-transform shrink-0" />
          <span className="navbar-brand-name">
            {displayName}
          </span>
        </Link>
      </div>

      {/* Sidebar Toggle on the Side for Other Access */}
      <div className="navbar-actions">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="navbar-toggle-btn group"
              aria-label="Open navigation sidebar"
            >
              <Menu className="size-4 text-accent group-hover:scale-110 transition-transform" strokeWidth={1.75} />
              <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-foreground">
                Menu
              </span>
            </button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[290px] sm:w-[330px] p-6 flex flex-col justify-between bg-sidebar border-l border-border"
          >
            <div className="space-y-6">
              {/* Drawer Header */}
              <SheetHeader className="p-0 text-left">
                <div className="flex items-start gap-3">
                  <HankoStamp size={32} />
                  <div>
                    <SheetTitle className="text-lg font-serif font-normal text-foreground leading-tight">
                      {displayName}
                    </SheetTitle>
                    <p className="text-[10px] font-sans font-semibold uppercase tracking-wider text-muted-foreground mt-0.5">
                      {profile.role || 'Software & AI Engineer'}
                    </p>
                  </div>
                </div>
              </SheetHeader>

              {/* Quick Search */}
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileOpen(false);
                    onOpenCommand();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-sm bg-card hover:bg-muted border border-border text-xs text-muted-foreground hover:text-foreground transition-all cursor-pointer shadow-2xs"
                >
                  <span className="flex items-center gap-2">
                    <Command className="size-3.5 text-accent" />
                    <span className="font-sans">Spotlight Search...</span>
                  </span>
                  <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded-xs bg-muted border border-border">
                    ⌘K
                  </kbd>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1" aria-label="Mobile Navigation Links">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground block mb-2 px-1">
                  NAVIGATION
                </span>
                {navLinks.map((item) => {
                  const isActive =
                    item.path === '/'
                      ? location.pathname === '/'
                      : location.pathname.startsWith(item.path);
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs font-sans font-semibold tracking-wider transition-all min-h-[44px] ${
                        isActive
                          ? 'text-accent bg-accent/10 font-bold'
                          : 'text-foreground/80 hover:text-foreground hover:bg-card'
                      }`}
                    >
                      <Icon className="size-4 text-accent" strokeWidth={1.5} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Quick Actions: Profile & Admin */}
              <div className="space-y-1.5 pt-3 border-t border-border">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground block mb-1 px-1">
                  PROFILE & CONTROLS
                </span>

                {onOpenProfile && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileOpen(false);
                      onOpenProfile();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-sm text-xs font-sans font-semibold text-foreground/80 hover:text-foreground hover:bg-card transition-all cursor-pointer text-left"
                  >
                    <span className="flex items-center gap-3">
                      <User className="size-4 text-accent" strokeWidth={1.5} />
                      <span>View Bio & Overview</span>
                    </span>
                    <ExternalLink className="size-3 text-muted-foreground" />
                  </button>
                )}

                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-sm text-xs font-sans font-semibold text-foreground/80 hover:text-foreground hover:bg-card transition-all"
                  >
                    <span className="flex items-center gap-3">
                      <ShieldCheck className="size-4 text-accent" strokeWidth={1.5} />
                      <span>Admin CMS Studio</span>
                    </span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-accent/10 text-accent">
                      Active
                    </span>
                  </Link>
                )}
              </div>

              {/* Appearance / Theme Switcher */}
              <div className="pt-3 border-t border-border">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground block mb-2 px-1">
                  APPEARANCE
                </span>
                <ThemeToggle showLabels={true} className="w-full justify-center" />
              </div>
            </div>

            {/* Drawer Footer: Socials & Studio Status */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-center gap-2 px-1">
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-sm border border-border bg-card/60 hover:bg-card text-muted-foreground hover:text-foreground transition-colors"
                    title="GitHub Profile"
                  >
                    <GithubIcon className="size-4" />
                  </a>
                )}
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-sm border border-border bg-card/60 hover:bg-card text-muted-foreground hover:text-foreground transition-colors text-xs font-sans font-bold"
                    title="LinkedIn Profile"
                  >
                    in
                  </a>
                )}
                <div className="flex-1 text-right">
                  <span className="text-[10px] font-sans font-semibold tracking-wider text-muted-foreground uppercase">
                    New York, USA
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-sm border border-border bg-card/40 space-y-1">
                <div className="flex items-center justify-between">
                  <EnsoCircle size={18} className="text-foreground/40" />
                  <span className="text-[10px] font-sans font-bold tracking-widest text-muted-foreground uppercase">
                    AKARI STUDIO
                  </span>
                </div>
                <p className="text-[11px] font-sans text-muted-foreground leading-snug">
                  {profile.status || 'Open to Full-Stack & AI Roles'}
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};
