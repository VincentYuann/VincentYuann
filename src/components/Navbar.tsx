import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Command, User, Menu, Home, FolderGit2, FileText, Mail, ShieldCheck } from 'lucide-react';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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

  return (
    <nav className="navbar-wrapper" aria-label="Mobile and Tablet Navigation">
      {/* Brand Identity with Hanko Mark */}
      <div className="navbar-brand-group">
        <Link to="/" className="navbar-brand-link group">
          <HankoStamp size={28} className="group-hover:scale-105 transition-transform" />
          <div>
            <span className="navbar-brand-name">
              {profile.name}
            </span>
            <span className="navbar-brand-role">
              {profile.role}
            </span>
          </div>
        </Link>
      </div>

      {/* Nav Actions */}
      <div className="navbar-actions">
        {/* Spotlight Command Search Trigger */}
        <button
          onClick={onOpenCommand}
          className="navbar-search-btn"
          title="Open Spotlight Search (Ctrl + K / Cmd + K)"
        >
          <Command className="navbar-search-icon" />
          <span className="navbar-search-label">Search</span>
          <kbd className="navbar-search-kbd">⌘K</kbd>
        </button>

        {/* Day / Night Theme Toggle */}
        <ThemeToggle showLabels={false} className="hidden sm:inline-flex" />

        <TooltipProvider delayDuration={200}>
          <div className="navbar-cluster-divider">
            {/* GitHub Link */}
            {profile.github && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="navbar-icon-btn"
                    aria-label="GitHub Profile"
                  >
                    <GithubIcon className="size-4" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>GitHub Profile</TooltipContent>
              </Tooltip>
            )}

            {/* Profile Overview & Quick Actions */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={onOpenProfile}
                  className="navbar-icon-btn relative cursor-pointer"
                  aria-label="Profile Overview"
                >
                  <User className="size-4" />
                  {isAdmin && (
                    <span 
                      className="absolute top-1 right-1 size-2 rounded-full bg-accent ring-2 ring-card" 
                      title="Admin Active"
                    />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>{isAdmin ? "Profile & Admin Controls" : "View Profile"}</TooltipContent>
            </Tooltip>

            {/* Admin CMS */}
            {isAdmin && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/admin"
                    className={
                      location.pathname.startsWith('/admin')
                        ? 'navbar-icon-btn-admin-active'
                        : 'navbar-icon-btn-admin-inactive'
                    }
                    aria-label="Admin CMS Dashboard"
                  >
                    <ShieldCheck className="size-4 text-accent" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Admin CMS Studio (Active)</TooltipContent>
              </Tooltip>
            )}

            {/* Mobile Navigation Sheet Trigger */}
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="p-2 rounded-sm text-muted-foreground hover:text-foreground hover:bg-card border border-border transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Open mobile navigation menu"
                >
                  <Menu className="size-4" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px] p-6 flex flex-col justify-between bg-sidebar border-l border-border">
                <div className="space-y-6">
                  <SheetHeader className="p-0 text-left">
                    <div className="flex items-center gap-3">
                      <HankoStamp size={32} />
                      <div>
                        <SheetTitle className="text-base font-serif font-normal text-foreground">
                          {profile.name}
                        </SheetTitle>
                        <p className="text-[10px] font-sans font-semibold uppercase tracking-wider text-muted-foreground">
                          {profile.role}
                        </p>
                      </div>
                    </div>
                  </SheetHeader>

                  {/* Navigation Links */}
                  <div className="space-y-1 pt-2">
                    <Link
                      to="/"
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs font-sans font-semibold tracking-wider transition-all min-h-[44px] ${
                        location.pathname === '/'
                          ? 'text-accent bg-accent/10 font-bold'
                          : 'text-foreground/80 hover:text-foreground hover:bg-card'
                      }`}
                    >
                      <Home className="size-4 text-accent" strokeWidth={1.5} />
                      <span>HOME</span>
                    </Link>

                    <Link
                      to="/projects"
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs font-sans font-semibold tracking-wider transition-all min-h-[44px] ${
                        location.pathname.startsWith('/projects')
                          ? 'text-accent bg-accent/10 font-bold'
                          : 'text-foreground/80 hover:text-foreground hover:bg-card'
                      }`}
                    >
                      <FolderGit2 className="size-4 text-accent" strokeWidth={1.5} />
                      <span>PROJECTS</span>
                    </Link>

                    <Link
                      to="/resume"
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs font-sans font-semibold tracking-wider transition-all min-h-[44px] ${
                        location.pathname.startsWith('/resume')
                          ? 'text-accent bg-accent/10 font-bold'
                          : 'text-foreground/80 hover:text-foreground hover:bg-card'
                      }`}
                    >
                      <FileText className="size-4 text-accent" strokeWidth={1.5} />
                      <span>RESUME</span>
                    </Link>

                    <Link
                      to="/contact"
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs font-sans font-semibold tracking-wider transition-all min-h-[44px] ${
                        location.pathname.startsWith('/contact')
                          ? 'text-accent bg-accent/10 font-bold'
                          : 'text-foreground/80 hover:text-foreground hover:bg-card'
                      }`}
                    >
                      <Mail className="size-4 text-accent" strokeWidth={1.5} />
                      <span>CONTACT</span>
                    </Link>
                  </div>

                  {/* Theme Switcher in Mobile Drawer */}
                  <div className="pt-4 border-t border-border">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground block mb-2">
                      APPEARANCE
                    </span>
                    <ThemeToggle showLabels={true} className="w-full justify-center" />
                  </div>
                </div>

                {/* Bottom Studio Motif */}
                <div className="p-3 rounded-sm border border-border bg-card/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <EnsoCircle size={24} className="text-foreground/40" />
                    <span className="text-[10px] font-sans font-bold tracking-widest text-muted-foreground uppercase">
                      STUDIO
                    </span>
                  </div>
                  <p className="text-[11px] font-sans text-muted-foreground leading-snug">
                    Akari Day & Night architectural portfolio.
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </TooltipProvider>
      </div>
    </nav>
  );
};
