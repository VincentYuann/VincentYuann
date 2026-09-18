import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Settings, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  ExternalLink 
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { ThemeSelector, THEME_OPTIONS } from './ThemeSelector';
import { useAuth } from '../lib/useAuth';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentThemeOption = THEME_OPTIONS.find((t) => t.id === theme) || THEME_OPTIONS[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-modal-title"
    >
      <div 
        className="relative w-full max-w-2xl bg-card text-card-foreground rounded-3xl border border-border shadow-2xl overflow-hidden my-auto animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Ribbon */}
        <div className="h-1 w-full bg-accent" />

        {/* Modal Header */}
        <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 id="settings-modal-title" className="text-lg sm:text-xl font-serif font-bold text-foreground">
                Settings & Appearance
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Customize your portfolio browsing experience. Accessible to everyone with zero login required.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            title="Close (Esc)"
            aria-label="Close settings modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Active Theme Summary Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-muted/40 border border-border">
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-xl border border-black/20 flex items-center justify-center shadow-xs shrink-0"
                style={{ backgroundColor: currentThemeOption.bgHex }}
              >
                <div 
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ backgroundColor: currentThemeOption.accentHex }}
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-foreground">
                    Active: {currentThemeOption.name}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-primary/10 text-primary font-semibold">
                    {currentThemeOption.category}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {currentThemeOption.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg shrink-0 self-start sm:self-auto">
              <Sparkles className="w-3 h-3" />
              <span>0ms Instant Flash-Free</span>
            </div>
          </div>

          {/* Theme Selection */}
          <ThemeSelector layout="grid" />

          {/* Persistence Explanation Box */}
          <div className="p-4 rounded-2xl bg-card border border-border text-xs text-muted-foreground space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-foreground">
              <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />
              <span>Automatic Local Persistence</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Your selected theme is safely stored in your browser&apos;s local storage. You do not need to create an account or sign in. When you return to this portfolio, your selected theme will load immediately without any white flash.
            </p>
          </div>

          {/* Administration Access Gateway (Subtle footer) */}
          <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground text-[11px]">
              {isAdmin ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Admin session active. Content editing unlocked.</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Looking for CMS management & publishing?</span>
                </>
              )}
            </div>

            {isAdmin ? (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate('/admin');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all cursor-pointer shadow-2xs"
              >
                <span>Admin CMS Studio</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate('/login');
                }}
                className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground font-medium transition-colors cursor-pointer"
              >
                <span>Admin Login →</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-muted/30 border-t border-border flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all shadow-xs cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
