import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { SiteDataProvider } from './context/SiteDataContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SectionDivider } from './components/SectionDivider';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { PhilosophyBento } from './components/PhilosophyBento';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectsPage } from './components/ProjectsPage';
import { ResumePage } from './components/ResumePage';
import { LoginPage } from './components/LoginPage';
import { EditPage } from './components/EditPage';
import { supabase } from './lib/supabase';
import { Toaster } from 'sonner';

export type ViewMode = 'home' | 'projects' | 'resume' | 'login' | 'edit';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [isAdmin, setIsAdmin] = useState(false);

  // Stable refs so hash routing effect never needs to re-run on isAdmin changes
  const isAdminRef = useRef(false);
  const setViewRef = useRef(setCurrentView);
  setViewRef.current = setCurrentView;

  // Only navigate home on the very first successful sign-in, not on every token refresh
  const hasNavigatedAfterLoginRef = useRef(false);

  const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL || 'vincentyuan1020@gmail.com').toLowerCase();

  const isOwnerSession = (session: any): boolean => {
    const email = session?.user?.email?.toLowerCase();
    return !!email && email === ADMIN_EMAIL;
  };

  /* ── Supabase auth listener — single subscription, strict admin verification ── */
  useEffect(() => {
    if (!supabase) return;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const isOwner = isOwnerSession(session);

      if (event === 'INITIAL_SESSION') {
        isAdminRef.current = isOwner;
        setIsAdmin(isOwner);
        if (isOwner) hasNavigatedAfterLoginRef.current = true;
      } else if (event === 'SIGNED_IN') {
        if (isOwner) {
          isAdminRef.current = true;
          setIsAdmin(true);
          if (!hasNavigatedAfterLoginRef.current) {
            hasNavigatedAfterLoginRef.current = true;
            setViewRef.current('home');
            window.history.replaceState(null, '', '#home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        } else {
          // Unauthorized GitHub user logged in — revoke and reject
          isAdminRef.current = false;
          setIsAdmin(false);
          supabase?.auth.signOut();
          alert('Access Denied: Only the portfolio owner is authorized to access the edit dashboard.');
        }
      } else if (event === 'SIGNED_OUT') {
        isAdminRef.current = false;
        setIsAdmin(false);
        hasNavigatedAfterLoginRef.current = false;
        setViewRef.current((prev) => (prev === 'edit' ? 'home' : prev));
      } else if (event === 'TOKEN_REFRESHED') {
        isAdminRef.current = isOwner;
        setIsAdmin(isOwner);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  /* ── URL hash routing ── */
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();

      // Ignore OAuth callback hashes (contain access_token)
      if (hash.includes('access_token') || hash.includes('type=signup') || hash.includes('type=recovery')) {
        return;
      }

      if (hash === '#resume' || hash === '#cv') {
        setViewRef.current('resume');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#all-projects' || hash === '#projects' || hash === '#archive') {
        setViewRef.current('projects');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#login') {
        setViewRef.current('login');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#edit') {
        // Use the ref — not state — so this effect has zero dependencies
        if (isAdminRef.current) {
          setViewRef.current('edit');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (hash === '' || hash === '#home' || hash === '#') {
        setViewRef.current('home');
      }
      // Any unrecognised hash (e.g. section anchors like #contact) — do nothing
    };

    handleHashChange(); // Run once on mount
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []); // ← empty deps: no re-runs from state changes

  const handleNavigate = (view: ViewMode, sectionId?: string) => {
    // Guard: edit is only accessible when admin
    if (view === 'edit' && !isAdminRef.current) return;

    setCurrentView(view);

    if (view === 'resume') {
      window.location.hash = '#resume';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'projects') {
      window.location.hash = '#all-projects';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'login') {
      window.location.hash = '#login';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'edit') {
      window.location.hash = '#edit';
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

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    // SIGNED_OUT event handles state cleanup
  };

  return (
    <ThemeProvider>
      <SiteDataProvider>
        <div className="min-h-screen bg-light-canvas dark:bg-dark-canvas text-light-ink dark:text-dark-ink washi-pattern transition-colors duration-300 flex flex-col selection:bg-terracotta/20 selection:text-terracotta">
          <Header
            currentView={currentView}
            onNavigate={handleNavigate}
            onOpenContact={() => handleNavigate('home', 'contact')}
            isAdmin={isAdmin}
            onLogout={handleLogout}
          />

          <main className="flex-1 w-full">
            {currentView === 'login' && (
              <LoginPage onNavigate={handleNavigate} />
            )}

            {currentView === 'edit' && isAdmin && (
              <EditPage onNavigate={handleNavigate} />
            )}

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

          {currentView === 'home' && <Footer onNavigate={handleNavigate} />}
        </div>
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: 'font-sans text-xs bg-light-surface-card dark:bg-[#181920] text-light-ink dark:text-dark-ink border border-light-border dark:border-[#2D3039] shadow-lg rounded-xl',
          }}
          richColors
        />
      </SiteDataProvider>
    </ThemeProvider>
  );
};

export default App;
