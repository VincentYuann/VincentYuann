import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Command, Settings, User } from 'lucide-react';
import { GithubIcon } from './Icons';
import { useAuth } from '../lib/useAuth';
import type { ProfileData } from '../lib/useProfile';
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
        <div className="navbar-cluster-divider">
          {/* Hire Me Button */}
          <Link
            to="/contact"
            className="navbar-hire-btn"
            title="Hire Me / Send Message"
          >
            Hire Me
          </Link>

          {/* GitHub Profile */}
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="navbar-icon-btn"
            title="GitHub Profile"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* Profile Overview & Quick Actions */}
          <button
            type="button"
            onClick={onOpenProfile}
            className="navbar-icon-btn relative cursor-pointer"
            title={isAdmin ? "Profile Overview & Admin Controls" : "View Profile Overview"}
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

          {/* Admin Settings */}
          <Link
            to="/admin"
            className={
              location.pathname.startsWith('/admin')
                ? 'navbar-icon-btn-admin-active'
                : 'navbar-icon-btn-admin-inactive'
            }
            title={isAdmin ? "Admin CMS (Logged In)" : "Admin CMS & Settings"}
            aria-label="Admin Settings"
          >
            <Settings className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </nav>
  );
};
