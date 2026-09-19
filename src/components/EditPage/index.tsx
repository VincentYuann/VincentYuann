import React, { useState } from 'react';
import { IntroEditor } from './sections/IntroEditor';
import { ExperienceEditor } from './sections/ExperienceEditor';
import { ProjectsEditor } from './sections/ProjectsEditor';
import { ResumeEditor } from './sections/ResumeEditor';
import { PhilosophyEditor } from './sections/PhilosophyEditor';

type EditSection = 'intro' | 'experience' | 'projects' | 'resume' | 'philosophy';

interface EditPageProps {
  onNavigate: (view: 'home' | 'projects' | 'resume' | 'login' | 'edit') => void;
}

const SECTIONS: { id: EditSection; label: string; num: string }[] = [
  { id: 'intro', label: 'Intro & Profile', num: '01' },
  { id: 'experience', label: 'Experience', num: '02' },
  { id: 'projects', label: 'Projects', num: '03' },
  { id: 'resume', label: 'Resume', num: '04' },
  { id: 'philosophy', label: 'Philosophy', num: '05' },
];

export const EditPage: React.FC<EditPageProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState<EditSection>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_admin_section') as EditSection | null;
      if (saved && SECTIONS.some((s) => s.id === saved)) {
        return saved;
      }
    }
    return 'projects'; // default to projects since it is the primary editing tool
  });

  const handleSelectSection = (sec: EditSection) => {
    setActiveSection(sec);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_admin_section', sec);
    }
  };

  return (
    // pt-20 clears the fixed main header (h-20)
    <div className="min-h-screen bg-light-canvas dark:bg-dark-canvas text-light-ink dark:text-dark-ink pt-20">
      {/* Sub Navbar — sticks just below main header */}
      <div className="sticky top-20 z-40 bg-light-surface/95 dark:bg-dark-surface/95 backdrop-blur-md border-b border-light-border dark:border-dark-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center gap-1 overflow-x-auto">
          {/* Badge */}
          <span className="font-mono text-[10px] text-terracotta border border-terracotta/40 rounded px-1.5 py-0.5 mr-3 uppercase tracking-widest shrink-0">
            Edit Mode
          </span>

          {/* Section toggles */}
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelectSection(s.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-sans text-xs whitespace-nowrap transition-all duration-150 shrink-0 ${
                activeSection === s.id
                  ? 'bg-terracotta/10 text-terracotta border border-terracotta/30 font-semibold'
                  : 'text-light-ink-muted dark:text-dark-ink-muted hover:text-light-ink dark:hover:text-dark-ink hover:bg-light-surface-raised dark:hover:bg-dark-surface-raised'
              }`}
            >
              <span className="font-mono text-[10px] opacity-50">{s.num}</span>
              <span>{s.label}</span>
            </button>
          ))}

          <div className="ml-auto shrink-0">
            <button
              onClick={() => onNavigate('home')}
              className="font-sans text-xs text-light-ink-muted dark:text-dark-ink-muted hover:text-terracotta transition-colors"
            >
              ← Back to Portfolio
            </button>
          </div>
        </div>
      </div>

      {/* Section Content — extra top padding so sticky sub-bar never overlaps content */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        {activeSection === 'intro' && <IntroEditor />}
        {activeSection === 'experience' && <ExperienceEditor />}
        {activeSection === 'projects' && <ProjectsEditor />}
        {activeSection === 'resume' && <ResumeEditor />}
        {activeSection === 'philosophy' && <PhilosophyEditor />}
      </div>
    </div>
  );
};
