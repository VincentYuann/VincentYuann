import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SectionDivider } from './components/SectionDivider';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { PhilosophyBento } from './components/PhilosophyBento';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-light-canvas dark:bg-dark-canvas text-light-ink dark:text-dark-ink washi-pattern transition-colors duration-300 flex flex-col selection:bg-terracotta/20 selection:text-terracotta">
        {/* Fixed Navigation Header */}
        <Header />

        {/* Main Content Sections */}
        <main className="flex-1 w-full">
          <Hero />

          <SectionDivider label="MA · WABI-SABI · CRAFT" />
          <ProjectsShowcase />

          <SectionDivider label="PHILOSOPHY · SHOKUNIN · MA" />
          <PhilosophyBento />

          <SectionDivider label="INITIATE A DIALOGUE · 対話" />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
