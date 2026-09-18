import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  MapPin, 
  Mail, 
  FileText, 
  ExternalLink, 
  ShieldCheck, 
  Edit3, 
  FolderKanban, 
  LogOut, 
  Lock,
  Palette
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { ThemeToggle } from './ThemeToggle';
import { ThemeSelector } from './ThemeSelector';
import type { ProfileData } from '../lib/useProfile';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  isAdmin: boolean;
  onSignOut?: () => void;
  onOpenSettings?: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  isAdmin,
  onSignOut,
  onOpenSettings,
}) => {
  const navigate = useNavigate();

  // Close on Escape key press
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

  const handleAdminNavigate = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-xs animate-fadeIn overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-white dark:bg-[#161B22] rounded-3xl border border-[#D0D7DE] dark:border-[#30363D] shadow-2xl overflow-hidden my-auto animate-fadeIn">
        {/* Decorative Top Accent Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-[#3894B3] via-[#588A75] to-[#1B2127]" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#6E7E8E] dark:text-[#8B949E]">
              Profile Overview
            </span>
            {isAdmin && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-[10px] font-mono font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Admin Active
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#6E7E8E] dark:text-[#8B949E] hover:text-[#1B2127] dark:hover:text-white hover:bg-[#F6F8FA] dark:hover:bg-[#21262D] transition-colors cursor-pointer"
            title="Close (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-4 space-y-5">
          {/* Identity Header */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#1B2127] dark:bg-[#21262D] text-white flex items-center justify-center font-serif text-2xl font-bold shadow-md shrink-0 border-2 border-white dark:border-[#30363D]">
              {profile.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-serif font-bold text-[#1B2127] dark:text-[#F0F6FC] leading-tight truncate">
                {profile.name}
              </h3>
              <p className="text-xs font-semibold text-[#3894B3] mt-0.5">
                {profile.role}
              </p>
              {profile.location && (
                <div className="flex items-center gap-1 text-[11px] text-[#57606A] dark:text-[#8B949E] mt-1">
                  <MapPin className="w-3 h-3 text-[#6E7E8E]" />
                  <span>{profile.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Tagline & Bio */}
          <div className="p-3.5 bg-[#FAFBFD] dark:bg-[#0D1117] border border-[#E1E6EB] dark:border-[#30363D] rounded-2xl space-y-1.5 text-xs text-[#24292F] dark:text-[#C9D1D9] leading-relaxed">
            {profile.tagline && (
              <div className="font-semibold text-[#1B2127] dark:text-white">
                &ldquo;{profile.tagline}&rdquo;
              </div>
            )}
            {profile.about && (
              <p className="text-[#57606A] dark:text-[#8B949E] text-[11px] line-clamp-3">
                {profile.about}
              </p>
            )}
          </div>

          {/* Theme & Appearance Switcher */}
          <div className="p-3 bg-[#FAFBFD] dark:bg-[#0D1117] border border-[#E1E6EB] dark:border-[#30363D] rounded-2xl space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#3894B3]" />
                <div>
                  <span className="text-xs font-bold text-[#1B2127] dark:text-[#F0F6FC] block">Theme Presets</span>
                  <span className="text-[10px] text-[#6E7E8E] dark:text-[#8B949E]">Instant color transformations</span>
                </div>
              </div>
              <ThemeToggle showLabels={false} />
            </div>
            <ThemeSelector layout="compact" />
            {onOpenSettings && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenSettings();
                }}
                className="w-full pt-1 text-center text-[11px] font-semibold text-[#3894B3] hover:underline cursor-pointer"
              >
                All Themes & Visual Settings →
              </button>
            )}
          </div>

          {/* Social & Contact Actions */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center justify-center gap-2 py-2 px-3 bg-white dark:bg-[#21262D] border border-[#D0D7DE] dark:border-[#30363D] hover:border-[#1B2127] dark:hover:border-white text-[#1B2127] dark:text-[#F0F6FC] rounded-xl font-semibold transition-all shadow-xs"
            >
              <Mail className="w-3.5 h-3.5 text-[#3894B3]" />
              <span>Send Email</span>
            </a>
            <button
              onClick={() => {
                onClose();
                navigate('/resume');
              }}
              className="flex items-center justify-center gap-2 py-2 px-3 bg-white dark:bg-[#21262D] border border-[#D0D7DE] dark:border-[#30363D] hover:border-[#1B2127] dark:hover:border-white text-[#1B2127] dark:text-[#F0F6FC] rounded-xl font-semibold transition-all shadow-xs cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#588A75]" />
              <span>View Resume</span>
            </button>
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2 px-3 bg-white dark:bg-[#21262D] border border-[#D0D7DE] dark:border-[#30363D] hover:border-[#1B2127] dark:hover:border-white text-[#1B2127] dark:text-[#F0F6FC] rounded-xl font-semibold transition-all shadow-xs"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 text-[#8C959F]" />
              </a>
            )}
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2 px-3 bg-white dark:bg-[#21262D] border border-[#D0D7DE] dark:border-[#30363D] hover:border-[#1B2127] dark:hover:border-white text-[#1B2127] dark:text-[#F0F6FC] rounded-xl font-semibold transition-all shadow-xs"
              >
                <span className="w-3.5 h-3.5 font-bold font-serif text-blue-700 dark:text-blue-400">in</span>
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-[#8C959F]" />
              </a>
            )}
          </div>

          {/* Admin Convenience Section */}
          {isAdmin ? (
            <div className="border-t border-[#E1E6EB] dark:border-[#30363D] pt-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#1B2127] dark:text-[#F0F6FC] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Admin Quick Controls</span>
                </span>
                <span className="text-[10px] font-mono text-[#57606A] dark:text-[#8B949E]">1-Click Edit</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleAdminNavigate('/admin?tab=profile')}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F6F8FA] dark:bg-[#21262D] hover:bg-[#1B2127] dark:hover:bg-[#30363D] text-[#1B2127] dark:text-[#F0F6FC] hover:text-white border border-[#D0D7DE] dark:border-[#30363D] transition-all cursor-pointer text-left group"
                >
                  <Edit3 className="w-4 h-4 text-[#3894B3] group-hover:text-white shrink-0" />
                  <div>
                    <div className="font-bold text-[11px]">Edit Profile & Bio</div>
                    <div className="text-[10px] text-[#57606A] dark:text-[#8B949E] group-hover:text-gray-300">Name, bio, tagline</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleAdminNavigate('/admin?tab=projects')}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F6F8FA] dark:bg-[#21262D] hover:bg-[#1B2127] dark:hover:bg-[#30363D] text-[#1B2127] dark:text-[#F0F6FC] hover:text-white border border-[#D0D7DE] dark:border-[#30363D] transition-all cursor-pointer text-left group"
                >
                  <FolderKanban className="w-4 h-4 text-[#588A75] group-hover:text-white shrink-0" />
                  <div>
                    <div className="font-bold text-[11px]">Manage Projects</div>
                    <div className="text-[10px] text-[#57606A] dark:text-[#8B949E] group-hover:text-gray-300">Add or edit systems</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleAdminNavigate('/admin?tab=resume')}
                  className="sm:col-span-2 flex items-center gap-2 p-2.5 rounded-xl bg-[#F6F8FA] dark:bg-[#21262D] hover:bg-[#1B2127] dark:hover:bg-[#30363D] text-[#1B2127] dark:text-[#F0F6FC] hover:text-white border border-[#D0D7DE] dark:border-[#30363D] transition-all cursor-pointer text-left group"
                >
                  <FileText className="w-4 h-4 text-[#8250DF] group-hover:text-white shrink-0" />
                  <div>
                    <div className="font-bold text-[11px]">Update Resume & LaTeX Source</div>
                    <div className="text-[10px] text-[#57606A] dark:text-[#8B949E] group-hover:text-gray-300">Upload PDF or edit code directly</div>
                  </div>
                </button>
              </div>

              {onSignOut && (
                <div className="pt-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      onSignOut();
                      onClose();
                    }}
                    className="inline-flex items-center gap-1.5 text-[11px] text-red-600 hover:text-red-700 font-semibold cursor-pointer"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>Sign Out of Admin</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="border-t border-[#E1E6EB] dark:border-[#30363D] pt-3 text-center">
              <button
                type="button"
                onClick={() => handleAdminNavigate('/login')}
                className="inline-flex items-center gap-1.5 text-[11px] text-[#57606A] dark:text-[#8B949E] hover:text-[#1B2127] dark:hover:text-white font-medium transition-colors cursor-pointer"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Login</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
