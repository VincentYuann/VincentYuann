import React from 'react';

interface SectionDividerProps {
  label?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  label = 'MA · WABI-SABI · CRAFT',
}) => {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 my-12 sm:my-16 flex items-center justify-center select-none">
      <div className="relative w-full flex items-center justify-center">
        {/* Hairline rules with warm gold/amber tone */}
        <div className="w-full absolute inset-x-0 flex items-center justify-center pointer-events-none">
          <div className="w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-ochre/30 dark:via-[#8B7355]/40 to-transparent" />
        </div>

        {/* SVG Hairline Motif */}
        <div className="w-full absolute inset-x-0 flex items-center justify-center pointer-events-none opacity-50 dark:opacity-35">
          <img
            src="/stitch/section-divider.svg"
            alt="Section divider"
            className="w-full max-w-3xl text-light-border dark:text-dark-border"
          />
        </div>

        {/* Center Label Pill */}
        <div className="relative z-10 inline-flex items-center gap-3 px-5 py-1.5 rounded-full bg-light-surface dark:bg-[#181920] border border-light-border dark:border-[#3A332A] shadow-xs backdrop-blur-sm hover:border-ochre/50 transition-colors">
          <span className="w-1.5 h-1.5 rounded-full bg-terracotta animate-pulse" />
          <span className="font-sans font-semibold tracking-[0.24em] text-light-ink-muted dark:text-[#B8A892] uppercase text-[10px]">
            {label}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-terracotta animate-pulse" />
        </div>
      </div>
    </div>
  );
};
