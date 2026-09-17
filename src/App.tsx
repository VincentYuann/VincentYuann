import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { RiverTimeline } from './components/RiverTimeline';
import { CommandPalette } from './components/CommandPalette';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [isCommandOpen, setIsCommandOpen] = useState(false);

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
    <div className="relative min-h-screen topo-pattern selection:bg-[#3894B3]/25 selection:text-[#11232B]">
      {/* Subtle warm glow orbs in background */}
      <div className="fixed top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-[#EAE3D2]/40 blur-[120px] pointer-events-none -z-10" />
      <div className="fixed top-[45%] right-[10%] w-[450px] h-[450px] rounded-full bg-[#D4E8EE]/35 blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-[10%] left-[15%] w-[400px] h-[400px] rounded-full bg-[#E5ECE5]/40 blur-[130px] pointer-events-none -z-10" />

      {/* Main Page Layout */}
      <Hero onOpenCommand={() => setIsCommandOpen(true)} />

      <main>
        <RiverTimeline />
      </main>

      <Footer />

      {/* Spotlight Command Search Modal */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />
    </div>
  );
};

export default App;
