import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { setTheme, type ThemeMode } from '../store/slices/themeSlice';

interface ThemeToggleProps {
  className?: string;
  showLabels?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = '', 
  showLabels = true 
}) => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);

  const handleSelect = (newMode: ThemeMode) => {
    dispatch(setTheme(newMode));
  };

  return (
    <div className={`inline-flex items-center p-0.5 bg-card border border-border rounded-sm gap-0.5 ${className}`}>
      <button
        type="button"
        onClick={() => handleSelect('light')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[11px] font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer ${
          mode === 'light'
            ? 'bg-primary text-primary-foreground shadow-2xs'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        title="Day Mode (Light)"
        aria-label="Switch to Day mode"
      >
        <Sun className="size-3 text-amber-600 dark:text-amber-400" strokeWidth={1.75} />
        {showLabels && <span>Day</span>}
      </button>

      <button
        type="button"
        onClick={() => handleSelect('dark')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[11px] font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer ${
          mode === 'dark'
            ? 'bg-primary text-primary-foreground shadow-2xs'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        title="Night Mode (Dark)"
        aria-label="Switch to Night mode"
      >
        <Moon className="size-3 text-sky-600 dark:text-sky-300" strokeWidth={1.75} />
        {showLabels && <span>Night</span>}
      </button>
    </div>
  );
};
