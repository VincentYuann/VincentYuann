import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { LoginPage } from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';
import { ContactPage } from './pages/ContactPage';
import { ResumePage } from './pages/ResumePage';
import { CommandPalette } from './components/CommandPalette';
import { ProfileModal } from './components/ProfileModal';
import { useProjects } from './lib/useProjects';
import { useProfile } from './lib/useProfile';
import { useAuth } from './lib/useAuth';

export const App: React.FC = () => {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { allProjects, flagships, pebbles, refreshProjects } = useProjects();
  const { profile, refreshProfile } = useProfile();
  const { isAdmin, signOut } = useAuth();

  // Global keyboard shortcut listener for Cmd + K or Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <HashRouter>
      <div className="min-h-screen bg-white text-gray-900">
        <Routes>
          {/* Level 0: Landing Page */}
          <Route
            path="/"
            element={
              <HomePage
                flagships={flagships}
                pebbles={pebbles}
                allProjects={allProjects}
                profile={profile}
                onOpenCommand={() => setIsCommandOpen(true)}
                onOpenProfile={() => setIsProfileOpen(true)}
              />
            }
          />

          {/* Level 1: Dedicated Projects & Systems Gallery Page */}
          <Route
            path="/projects"
            element={
              <ProjectsPage
                projects={allProjects}
                profile={profile}
                onOpenCommand={() => setIsCommandOpen(true)}
                onOpenProfile={() => setIsProfileOpen(true)}
              />
            }
          />

          {/* Level 2: Dedicated Deep-Dive Architectural Detail Page */}
          <Route
            path="/projects/:id"
            element={
              <ProjectDetailPage
                projects={allProjects}
                profile={profile}
                onOpenCommand={() => setIsCommandOpen(true)}
                onOpenProfile={() => setIsProfileOpen(true)}
              />
            }
          />

          {/* Dedicated OAuth & Magic Link Login Page */}
          <Route
            path="/login"
            element={<LoginPage />}
          />

          {/* Dedicated Admin CMS & Content Editor Page */}
          <Route
            path="/admin"
            element={
              <AdminPage
                projects={allProjects}
                profile={profile}
                onRefreshProjects={refreshProjects}
                onRefreshProfile={refreshProfile}
              />
            }
          />

          {/* Dedicated Hire Me / Contact Page with Resend & Attachments */}
          <Route
            path="/contact"
            element={
              <ContactPage
                profile={profile}
                onOpenCommand={() => setIsCommandOpen(true)}
                onOpenProfile={() => setIsProfileOpen(true)}
              />
            }
          />

          {/* Dedicated My Resume & LaTeX Source Page */}
          <Route
            path="/resume"
            element={
              <ResumePage
                profile={profile}
                onOpenCommand={() => setIsCommandOpen(true)}
                onOpenProfile={() => setIsProfileOpen(true)}
              />
            }
          />

          {/* Fallback */}
          <Route
            path="*"
            element={
              <HomePage
                flagships={flagships}
                pebbles={pebbles}
                allProjects={allProjects}
                profile={profile}
                onOpenCommand={() => setIsCommandOpen(true)}
                onOpenProfile={() => setIsProfileOpen(true)}
              />
            }
          />
        </Routes>

        {/* Global Spotlight Command Search Modal */}
        <CommandPalette
          isOpen={isCommandOpen}
          onClose={() => setIsCommandOpen(false)}
          flagships={flagships}
          pebbles={pebbles}
        />

        {/* Global Profile Overview & Quick Actions Modal */}
        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          profile={profile}
          isAdmin={isAdmin}
          onSignOut={signOut}
        />
      </div>
    </HashRouter>
  );
};

export default App;
