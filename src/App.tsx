import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SectionDivider } from './components/SectionDivider';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { PhilosophyBento } from './components/PhilosophyBento';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectsPage } from './components/ProjectsPage';
import { ResumePage } from './components/ResumePage';

type ViewMode = 'home' | 'projects' | 'resume';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('home');

  // Handle URL hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#resume' || hash === '#cv') {
        setCurrentView('resume');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#all-projects' || hash === '#projects' || hash === '#archive') {
        setCurrentView('projects');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (view: ViewMode, sectionId?: string) => {
    setCurrentView(view);
    if (view === 'resume') {
      window.location.hash = '#resume';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'projects') {
      window.location.hash = '#all-projects';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = sectionId ? `#${sectionId}` : '#home';
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-light-canvas dark:bg-dark-canvas text-light-ink dark:text-dark-ink washi-pattern transition-colors duration-300 flex flex-col selection:bg-terracotta/20 selection:text-terracotta">
        {/* Fixed Navigation Header */}
        <Header
          currentView={currentView}
          onNavigate={handleNavigate}
          onOpenContact={() => handleNavigate('home', 'contact')}
        />

        {/* Dynamic Main View */}
        <main className="flex-1 w-full">
          {currentView === 'resume' && (
            <ResumePage onNavigate={handleNavigate} />
          )}

          {currentView === 'projects' && (
            <ProjectsPage onNavigate={handleNavigate} />
          )}

          {currentView === 'home' && (
            <>
              <Hero onNavigate={handleNavigate} />

              <SectionDivider label="MA · WABI-SABI · CRAFT" />
              <ProjectsShowcase onNavigate={handleNavigate} />

              <SectionDivider label="PHILOSOPHY · SHOKUNIN · MA" />
              <PhilosophyBento />

              <SectionDivider label="INITIATE A DIALOGUE · 対話" />
              <ContactSection />
            </>
          )}
        </main>

        {/* Footer */}
        <Footer onNavigate={handleNavigate} />
      </div>
    </ThemeProvider>
  );
};

export default App;
