import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  showLabels?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = '', 
  showLabels = true 
}) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`inline-flex items-center p-1 bg-[#F6F8FA] dark:bg-[#21262D] border border-[#D0D7DE] dark:border-[#30363D] rounded-xl gap-1 h-9 ${className}`} />
    );
  }

  return (
    <div className={`inline-flex items-center p-1 bg-[#F6F8FA] dark:bg-[#21262D] border border-[#D0D7DE] dark:border-[#30363D] rounded-xl gap-1 ${className}`}>
      <button
        type="button"
        onClick={() => setTheme('light')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
          theme === 'light'
            ? 'bg-white dark:bg-[#30363D] text-[#1B2127] dark:text-white shadow-xs'
            : 'text-[#57606A] dark:text-[#8B949E] hover:text-[#1B2127] dark:hover:text-white'
        }`}
        title="Light Theme"
        aria-label="Switch to light theme"
      >
        <Sun className="w-3.5 h-3.5 text-amber-500" />
        {showLabels && <span>Light</span>}
      </button>

      <button
        type="button"
        onClick={() => setTheme('dark')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
          theme === 'dark'
            ? 'bg-white dark:bg-[#30363D] text-[#1B2127] dark:text-white shadow-xs'
            : 'text-[#57606A] dark:text-[#8B949E] hover:text-[#1B2127] dark:hover:text-white'
        }`}
        title="Dark Theme"
        aria-label="Switch to dark theme"
      >
        <Moon className="w-3.5 h-3.5 text-indigo-400" />
        {showLabels && <span>Dark</span>}
      </button>

      <button
        type="button"
        onClick={() => setTheme('system')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
          theme === 'system'
            ? 'bg-white dark:bg-[#30363D] text-[#1B2127] dark:text-white shadow-xs'
            : 'text-[#57606A] dark:text-[#8B949E] hover:text-[#1B2127] dark:hover:text-white'
        }`}
        title="System Preference"
        aria-label="Switch to system theme preference"
      >
        <Monitor className="w-3.5 h-3.5 text-[#6E7E8E]" />
        {showLabels && <span>System</span>}
      </button>
    </div>
  );
};
