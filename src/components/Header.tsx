import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
import { HankoStamp } from './HankoStamp';

interface HeaderProps {
  onOpenContact?: () => void;
  currentView?: 'home' | 'projects' | 'resume';
  onNavigate?: (view: 'home' | 'projects' | 'resume', sectionId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact, currentView = 'home', onNavigate }) => {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (currentView !== 'home') return;

      const sections = ['home', 'featured-works', 'philosophy', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const navItems = [
    { id: 'home', num: '01', label: 'Home', href: '#home', view: 'home' as const },
    { id: 'featured-works', num: '02', label: 'Projects', href: '#featured-works', view: 'home' as const },
    { id: 'philosophy', num: '03', label: 'Philosophy', href: '#philosophy', view: 'home' as const },
    { id: 'contact', num: '04', label: 'Contact', href: '#contact', view: 'home' as const },
    { id: 'resume', num: '05', label: 'Resume', href: '#resume', view: 'resume' as const },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof navItems[0]) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(item.view, item.id);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-light-canvas/90 dark:bg-dark-canvas/90 backdrop-blur-md border-b border-light-border/70 dark:border-dark-border/80 shadow-sm'
          : 'bg-light-canvas/70 dark:bg-dark-canvas/70 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="h-20 w-full max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
        {/* Left: Brand Identity — Hanko Seal Stamp Only (No Name Text) */}
        <div className="flex items-center gap-3">
          <a
            href="#home"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate('home', 'home');
              }
            }}
            className="flex items-center group cursor-pointer"
            aria-label="Vincent Yuan — Home"
            title="Vincent Yuan — Home"
          >
            {/* Hanko Stamp Logo */}
            <div className="relative flex items-center justify-center -rotate-1 transition-transform duration-300 group-hover:rotate-0 group-hover:scale-105">
              <HankoStamp className="h-9 w-9 transition-all duration-300" />
            </div>
          </a>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => {
            const isActive = currentView === 'resume'
              ? item.id === 'resume'
              : currentView === 'projects'
              ? item.id === 'featured-works'
              : activeSection === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`group relative font-sans text-xs uppercase tracking-widest transition-colors flex items-center gap-1.5 py-1 ${
                  isActive
                    ? 'text-terracotta'
                    : 'text-light-ink-muted dark:text-dark-ink-muted hover:text-light-ink dark:hover:text-dark-ink'
                }`}
              >
                <span className="opacity-40 text-[10px] font-mono">{item.num}</span>
                <span>{item.label}</span>
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-terracotta rounded-full transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Right: Theme Toggle & Contact Button */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Day / Night Segmented Switch */}
          <div className="flex items-center bg-light-surface-muted/90 dark:bg-dark-surface/90 p-1 rounded-full border border-light-border dark:border-dark-border text-[11px]">
            <button
              onClick={() => setTheme('day')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-sans font-semibold tracking-wider transition-all duration-200 ${
                theme === 'day'
                  ? 'bg-light-surface-raised text-light-ink shadow-sm'
                  : 'text-light-ink-muted hover:text-light-ink dark:text-dark-ink-muted dark:hover:text-dark-ink'
              }`}
              title="Day Mode (Akari Warm Washi)"
            >
              <Sun className="w-3 h-3" />
              <span>DAY</span>
            </button>
            <button
              onClick={() => setTheme('night')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-sans font-semibold tracking-wider transition-all duration-200 ${
                theme === 'night'
                  ? 'bg-dark-surface-raised text-dark-ink shadow-sm'
                  : 'text-light-ink-muted hover:text-light-ink dark:text-dark-ink-muted dark:hover:text-dark-ink'
              }`}
              title="Night Mode (Charcoal Glow)"
            >
              <Moon className="w-3 h-3" />
              <span>NIGHT</span>
            </button>
          </div>

          {/* Quick Contact CTA */}
          <a
            href="#contact"
            onClick={onOpenContact}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-[12px] font-sans font-medium tracking-wide bg-light-button-dark dark:bg-dark-button-light text-light-on-dark dark:text-dark-on-light hover:opacity-90 transition-opacity"
          >
            <span>Hire Me</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md border border-light-border dark:border-dark-border text-light-ink dark:text-dark-ink"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 py-5 bg-light-surface dark:bg-dark-surface border-b border-light-border dark:border-dark-border shadow-lg">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`flex items-center justify-between py-2 text-sm font-sans ${
                  (currentView === 'resume' && item.id === 'resume') ||
                  (currentView === 'projects' && item.id === 'featured-works') ||
                  (currentView === 'home' && activeSection === item.id)
                    ? 'text-terracotta'
                    : 'text-light-ink-muted dark:text-dark-ink-muted'
                }`}
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs opacity-50">{item.num}</span>
              </a>
            ))}
            <div className="pt-3 border-t border-light-border dark:border-dark-border flex items-center justify-between">
              <span className="text-xs font-sans text-light-ink-muted dark:text-dark-ink-muted">
                Vincent Yuan · 侘寂
              </span>
              <a
                href="#contact"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('home', 'contact');
                  }
                }}
                className="text-xs font-sans font-medium text-terracotta"
              >
                Initiate a Dialogue →
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
