import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenContact?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact }) => {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'featured-works', 'system-craft', 'philosophy', 'motifs', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', num: '01', label: 'Home', href: '#home' },
    { id: 'featured-works', num: '02', label: 'Projects', href: '#featured-works' },
    { id: 'system-craft', num: '03', label: 'Craft', href: '#system-craft' },
    { id: 'philosophy', num: '04', label: 'Philosophy', href: '#philosophy' },
    { id: 'motifs', num: '05', label: 'Motifs', href: '#motifs' },
    { id: 'contact', num: '06', label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-light-canvas/90 dark:bg-dark-canvas/90 backdrop-blur-md border-b border-light-border/70 dark:border-dark-border/80 shadow-sm'
          : 'bg-light-canvas/70 dark:bg-dark-canvas/70 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="h-20 w-full max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
        {/* Left: Brand Identity with Hanko Stamp */}
        <div className="flex items-center gap-4">
          <a
            href="#home"
            className="flex items-center gap-3 group"
          >
            {/* Hanko Stamp Logo */}
            <div className="relative flex items-center justify-center -rotate-1 transition-transform duration-300 group-hover:rotate-0">
              <img
                src="/stitch/hanko-stamp.svg"
                alt="Hanko Stamp Logo 原"
                className="h-9 w-9 object-contain drop-shadow-sm rounded-sm transition-all duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-medium tracking-tight text-light-ink dark:text-dark-ink leading-tight">
                Vincent Yuann
              </span>
              <span className="font-sans text-[10px] uppercase font-semibold text-light-ink-muted dark:text-dark-ink-muted tracking-widest mt-0.5">
                Software & AI Engineer
              </span>
            </div>
          </a>

          {/* Availability Status Pill */}
          <div className="hidden lg:flex items-center gap-2 pl-4 py-1 border-l border-light-border dark:border-dark-border ml-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracotta opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-terracotta"></span>
            </span>
            <span className="font-sans text-[11px] text-light-ink-muted dark:text-dark-ink-muted uppercase font-medium tracking-wider">
              Open to Full-Stack & AI Roles
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`font-sans text-[13px] tracking-wide transition-colors flex items-center gap-1.5 py-1 ${
                  isActive
                    ? 'text-terracotta font-semibold'
                    : 'text-light-ink-muted dark:text-dark-ink-muted hover:text-light-ink dark:hover:text-dark-ink'
                }`}
              >
                <span className="opacity-40 text-[10px] font-mono">{item.num}</span>
                <span>{item.label}</span>
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
            <Sparkles className="w-3.5 h-3.5 text-terracotta" />
            <span>Connect</span>
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
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between py-2 text-sm font-sans ${
                  activeSection === item.id
                    ? 'text-terracotta font-semibold'
                    : 'text-light-ink-muted dark:text-dark-ink-muted'
                }`}
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs opacity-50">{item.num}</span>
              </a>
            ))}
            <div className="pt-3 border-t border-light-border dark:border-dark-border flex items-center justify-between">
              <span className="text-xs font-sans text-light-ink-muted dark:text-dark-ink-muted">
                Status: Available
              </span>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-sans font-medium text-terracotta"
              >
                Get in Touch →
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
