import React from 'react';

/**
 * Authentic Japanese Hanko (Seal Stamp) in Terracotta (#B5482E)
 * Used as a signature brand mark beside the monogram or title.
 */
export const HankoStamp: React.FC<{
  size?: number;
  className?: string;
  character?: string;
}> = ({ size = 28, className = '', character = '遠' }) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center rounded-[4px] border border-[#9E3D27] bg-[#B5482E] text-[#FAF6F0] font-serif shadow-2xs select-none shrink-0 ${className}`}
      title="Vincent Yuann Hanko Seal"
    >
      <span className="text-[13px] font-bold leading-none scale-90">
        {character}
      </span>
      {/* Inner subtle seal hairline */}
      <div className="absolute inset-[1.5px] rounded-[2px] border border-white/25 pointer-events-none" />
    </div>
  );
};

/**
 * Authentic Ensō Brush Circle
 * Symbol of minimalism, strength, and quiet enlightenment.
 */
export const EnsoCircle: React.FC<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}> = ({ size = 48, className = '', strokeWidth = 7 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={`text-foreground/50 transition-colors ${className}`}
      aria-hidden="true"
    >
      {/* Organic brush stroke path with traditional opening */}
      <path
        d="M 52 14 A 38 38 0 1 1 22 28"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/**
 * Seigaiha Waves Motif (Blue Sea Waves / Peaceful Flow)
 */
export const SeigaihaWaves: React.FC<{
  className?: string;
  width?: number;
  height?: number;
}> = ({ className = '', width = 120, height = 36 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      className={`text-border transition-colors ${className}`}
      aria-hidden="true"
    >
      {/* Wave Row 1 */}
      <path d="M 0 36 A 16 16 0 0 1 32 36" />
      <path d="M 4 36 A 12 12 0 0 1 28 36" />
      <path d="M 8 36 A 8 8 0 0 1 24 36" />

      {/* Wave Row 2 */}
      <path d="M 32 36 A 16 16 0 0 1 64 36" />
      <path d="M 36 36 A 12 12 0 0 1 60 36" />
      <path d="M 40 36 A 8 8 0 0 1 56 36" />

      {/* Wave Row 3 */}
      <path d="M 64 36 A 16 16 0 0 1 96 36" />
      <path d="M 68 36 A 12 12 0 0 1 92 36" />
      <path d="M 72 36 A 8 8 0 0 1 88 36" />

      {/* Wave Row 4 */}
      <path d="M 96 36 A 16 16 0 0 1 128 36" />
      <path d="M 100 36 A 12 12 0 0 1 124 36" />
      <path d="M 104 36 A 8 8 0 0 1 120 36" />
    </svg>
  );
};

/**
 * Japanese Architectural Corner Brackets
 * Provides tactile framing on feature project cards and containers.
 */
export const CornerBrackets: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 12, className = '' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Top Left */}
      <span
        style={{ width: size, height: size }}
        className="absolute top-1.5 left-1.5 border-t border-l border-border transition-colors"
      />
      {/* Top Right */}
      <span
        style={{ width: size, height: size }}
        className="absolute top-1.5 right-1.5 border-t border-r border-border transition-colors"
      />
      {/* Bottom Left */}
      <span
        style={{ width: size, height: size }}
        className="absolute bottom-1.5 left-1.5 border-b border-l border-border transition-colors"
      />
      {/* Bottom Right */}
      <span
        style={{ width: size, height: size }}
        className="absolute bottom-1.5 right-1.5 border-b border-r border-border transition-colors"
      />
    </div>
  );
};

/**
 * Japanese Rule / Separator with Centered Diamond (◇)
 * From "Day theme and components.png" Rule / Separator specification.
 */
export const DiamondDivider: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center my-8 ${className}`} role="separator">
      <div className="w-full border-t border-border" />
      <div className="absolute px-3 bg-background flex items-center justify-center">
        <span className="size-2 rotate-45 border border-accent/70 bg-background" />
      </div>
    </div>
  );
};

/**
 * Double Hairline Frame Container
 * From "Day theme and components.png" Double Hairline Frame specification.
 */
export const DoubleHairlineFrame: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div className={`p-1 border border-border/80 rounded-sm bg-card/60 ${className}`}>
      <div className="p-4 border border-border/60 rounded-sm">
        {children}
      </div>
    </div>
  );
};
