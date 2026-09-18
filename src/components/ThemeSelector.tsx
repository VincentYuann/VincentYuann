import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Check, Laptop, Sun, Moon } from 'lucide-react';

export interface ThemeOption {
  id: string;
  name: string;
  category: 'System' | 'Light' | 'Dark';
  description: string;
  bgHex: string;
  fgHex: string;
  accentHex: string;
  icon: React.ReactNode;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'system',
    name: 'System Default',
    category: 'System',
    description: 'Automatically synchronizes with your device OS preference',
    bgHex: '#1C1E26',
    fgHex: '#F2E9DA',
    accentHex: '#B5482E',
    icon: <Laptop className="w-4 h-4" />,
  },
  {
    id: 'light',
    name: 'Warm Editorial',
    category: 'Light',
    description: 'Parchment paper, deep charcoal-navy typography & terracotta red accents',
    bgHex: '#F2E9DA',
    fgHex: '#2B2E3A',
    accentHex: '#B5482E',
    icon: <Sun className="w-4 h-4 text-[#B5482E]" />,
  },
  {
    id: 'dark',
    name: 'Charcoal Slate',
    category: 'Dark',
    description: 'Deep charcoal-navy slate canvas with warm ivory text & coral glow',
    bgHex: '#1C1E26',
    fgHex: '#F2E9DA',
    accentHex: '#E06D53',
    icon: <Moon className="w-4 h-4 text-[#E06D53]" />,
  },
];

interface ThemeSelectorProps {
  onSelect?: () => void;
  layout?: 'grid' | 'compact';
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ 
  onSelect,
  layout = 'grid'
}) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="p-4 text-xs font-mono text-muted-foreground">Loading theme preferences...</div>;
  }

  const handleChoose = (themeId: string) => {
    setTheme(themeId);
    onSelect?.();
  };

  if (layout === 'compact') {
    return (
      <div className="flex flex-wrap gap-1.5 p-1 bg-muted/40 border border-border rounded-xl">
        {THEME_OPTIONS.map((opt) => {
          const isSelected = theme === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleChoose(opt.id)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-card text-foreground shadow-xs ring-1 ring-border'
                  : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
              }`}
              title={`${opt.name} (${opt.description})`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                style={{ backgroundColor: opt.bgHex }}
              />
              <span className="text-[11px] font-sans uppercase tracking-wider">{opt.name.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {THEME_OPTIONS.map((opt) => {
        const isSelected = theme === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => handleChoose(opt.id)}
            className={`flex flex-col p-4 rounded-2xl border text-left transition-all cursor-pointer relative group ${
              isSelected
                ? 'bg-card border-primary ring-2 ring-primary/20 shadow-xs'
                : 'bg-card/70 border-border hover:border-primary/40 hover:bg-card'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-2.5">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground group-hover:text-foreground'}`}>
                  {opt.icon}
                </div>
                <span className="text-sm font-serif font-bold text-foreground">
                  {opt.name}
                </span>
              </div>
              {isSelected && (
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary text-primary-foreground">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
              )}
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              {opt.description}
            </p>
            
            {/* Color Swatch Strip */}
            <div className="flex items-center h-3.5 rounded-md overflow-hidden border border-border w-full mt-auto shadow-2xs">
              <div className="h-full flex-1" style={{ backgroundColor: opt.bgHex }} title="Background" />
              <div className="h-full flex-1" style={{ backgroundColor: opt.fgHex }} title="Typography" />
              <div className="h-full flex-1" style={{ backgroundColor: opt.accentHex }} title="Accent" />
            </div>
          </button>
        );
      })}
    </div>
  );
};
