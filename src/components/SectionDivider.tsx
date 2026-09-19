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
        {/* SVG Hairline Motif */}
        <div className="w-full absolute inset-x-0 flex items-center justify-center pointer-events-none opacity-60 dark:opacity-40">
          <img
            src="/stitch/section-divider.svg"
            alt="Section divider"
            className="w-full max-w-3xl text-light-border dark:text-dark-border"
          />
        </div>

        {/* Center Label Pill */}
        <div className="relative z-10 inline-flex items-center gap-2.5 px-5 py-1.5 rounded-full bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border shadow-xs backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-terracotta inline-block" />
          <span className="font-sans font-semibold tracking-[0.24em] text-light-ink-muted dark:text-dark-ink-muted uppercase text-[10px]">
            {label}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-terracotta inline-block" />
        </div>
      </div>
    </div>
  );
};
