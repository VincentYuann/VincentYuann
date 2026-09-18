import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { LoginPage } from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';
import { ContactPage } from './pages/ContactPage';
import { ResumePage } from './pages/ResumePage';
import { CommandPalette } from './components/CommandPalette';
import { ProfileModal } from './components/ProfileModal';
import { SettingsModal } from './components/SettingsModal';
import { Toaster } from 'sonner';
import { useProjects } from './lib/useProjects';
import { useProfile } from './lib/useProfile';
import { useAuth } from './lib/useAuth';

export const App: React.FC = () => {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
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
        setIsSettingsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem
      storageKey="portfolio-theme"
      themes={['light', 'dark', 'midnight', 'nord', 'tokyo-night', 'emerald', 'sepia']}
    >
      <HashRouter>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
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
                onOpenSettings={() => setIsSettingsOpen(true)}
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
                onOpenSettings={() => setIsSettingsOpen(true)}
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
                onOpenSettings={() => setIsSettingsOpen(true)}
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
                onOpenSettings={() => setIsSettingsOpen(true)}
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
                onOpenSettings={() => setIsSettingsOpen(true)}
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
                onOpenSettings={() => setIsSettingsOpen(true)}
              />
            }
          />
        </Routes>

        {/* Global Spotlight Command Search Modal */}
        <CommandPalette
          isOpen={isCommandOpen}
          onClose={() => setIsCommandOpen(false)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          flagships={flagships}
          pebbles={pebbles}
        />

        {/* Global Profile Overview & Quick Actions Modal */}
        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          profile={profile}
          isAdmin={isAdmin}
          onSignOut={signOut}
        />

        {/* Global Public Settings & Theme Appearance Modal */}
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />

        {/* Global Sonner Toast Notifications */}
        <Toaster richColors position="bottom-right" />
      </div>
    </HashRouter>
    </ThemeProvider>
  );
};

export default App;
