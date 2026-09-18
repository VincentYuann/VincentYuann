import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Command, Settings, User, Menu, Home, FolderGit2, FileText, Mail, Palette, ShieldCheck } from 'lucide-react';
import { GithubIcon } from './Icons';
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
  onOpenSettings?: () => void;
  profile: ProfileData;
  isAdmin?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenCommand, 
  onOpenProfile, 
  onOpenSettings,
  profile,
  isAdmin: propIsAdmin,
}) => {
  const location = useLocation();
  const { isAdmin: authIsAdmin } = useAuth();
  const isAdmin = propIsAdmin ?? authIsAdmin;
  const [isMobileOpen, setIsMobileOpen] = useState(false);


  return (
    <nav className="navbar-wrapper">
      {/* Brand Identity */}
      <div className="navbar-brand-group">
        <Link to="/" className="navbar-brand-link group">
          <div className="navbar-brand-avatar">
            V
          </div>
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

      {/* Nav Links & Actions */}
      <div className="navbar-actions">
        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-2">
          {/* Home */}
          <Link
            to="/"
            className={`navbar-link ${
              location.pathname === '/'
                ? 'navbar-link-active'
                : 'navbar-link-inactive'
            }`}
          >
            Home
          </Link>

          {/* Projects Gallery */}
          <Link
            to="/projects"
            className={`navbar-link ${
              location.pathname.startsWith('/projects')
                ? 'navbar-link-active'
                : 'navbar-link-inactive'
            }`}
          >
            Projects Gallery
          </Link>

          {/* My Resume */}
          <Link
            to="/resume"
            className={`navbar-link ${
              location.pathname.startsWith('/resume')
                ? 'navbar-link-active'
                : 'navbar-link-inactive'
            }`}
          >
            Resume
          </Link>
        </div>

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

        {/* Actions Cluster: Hire Me, GitHub, Profile, Settings */}
        <TooltipProvider delayDuration={150}>
          <div className="navbar-cluster-divider">
            {/* Hire Me Button (Desktop) */}
            <Link
              to="/contact"
              className="navbar-hire-btn hidden sm:flex"
              title="Hire Me / Send Message"
            >
              Hire Me
            </Link>

            {/* GitHub Profile */}
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="navbar-icon-btn"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              </TooltipTrigger>
              <TooltipContent>GitHub Profile</TooltipContent>
            </Tooltip>

            {/* Profile Overview & Quick Actions */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={onOpenProfile}
                  className="navbar-icon-btn relative cursor-pointer"
                  aria-label="Profile Overview"
                >
                  <User className="w-4 h-4" />
                  {isAdmin && (
                    <span 
                      className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" 
                      title="Admin Active"
                    />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>{isAdmin ? "Profile & Admin Controls" : "View Profile"}</TooltipContent>
            </Tooltip>

            {/* Site Settings & Theme Preferences (Publicly Accessible) */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={onOpenSettings}
                  className="navbar-icon-btn cursor-pointer"
                  aria-label="Site Settings & Themes"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Settings & Themes</TooltipContent>
            </Tooltip>

            {/* Admin CMS (Visible when logged in as Admin) */}
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
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
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
                  className="md:hidden p-1.5 rounded-lg text-[#57606A] hover:text-[#1B2127] hover:bg-[#F6F8FA] border border-[#D0D7DE] transition-colors cursor-pointer"
                  aria-label="Open mobile navigation menu"
                >
                  <Menu className="w-4 h-4" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px] p-6 flex flex-col justify-between">
                <div>
                  <SheetHeader className="p-0 text-left mb-6">
                    <div className="flex items-center gap-3">
                      <div className="navbar-brand-avatar">V</div>
                      <div>
                        <SheetTitle className="text-base font-bold text-foreground">
                          {profile.name}
                        </SheetTitle>
                        <p className="text-xs text-muted-foreground">{profile.role}</p>
                      </div>
                    </div>
                  </SheetHeader>

                  {/* Mobile Links */}
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/"
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        location.pathname === '/'
                          ? 'bg-muted text-foreground font-bold border border-border'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <Home className="w-4 h-4 text-[#3894B3]" />
                      <span>Home</span>
                    </Link>

                    <Link
                      to="/projects"
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        location.pathname.startsWith('/projects')
                          ? 'bg-muted text-foreground font-bold border border-border'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <FolderGit2 className="w-4 h-4 text-[#3894B3]" />
                      <span>Projects Gallery</span>
                    </Link>

                    <Link
                      to="/resume"
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        location.pathname.startsWith('/resume')
                          ? 'bg-muted text-foreground font-bold border border-border'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <FileText className="w-4 h-4 text-[#3894B3]" />
                      <span>Resume</span>
                    </Link>

                    <Link
                      to="/contact"
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        location.pathname.startsWith('/contact')
                          ? 'bg-muted text-foreground font-bold border border-border'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <Mail className="w-4 h-4 text-[#3894B3]" />
                      <span>Hire Me / Contact</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileOpen(false);
                        onOpenSettings?.();
                      }}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all text-left cursor-pointer w-full"
                    >
                      <div className="flex items-center gap-3">
                        <Settings className="w-4 h-4 text-[#3894B3]" />
                        <span>Settings & Themes</span>
                      </div>
                      <Palette className="w-4 h-4 text-muted-foreground" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileOpen(false);
                        onOpenCommand();
                      }}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Command className="w-4 h-4 text-[#3894B3]" />
                        <span>Search</span>
                      </div>
                      <kbd className="px-1.5 py-0.5 rounded bg-card text-[10px] text-muted-foreground font-mono border border-border">⌘K</kbd>
                    </button>
                  </div>
                </div>

                {/* Mobile Footer Actions */}
                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>

                  <Link
                    to="/admin"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Admin CMS</span>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </TooltipProvider>
      </div>
    </nav>
  );
};
