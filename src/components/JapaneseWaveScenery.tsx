import React from 'react';

/**
 * JapaneseWaveScenery (波濤図)
 * Pure monochrome Sumi-e ink wash wave artwork rendered with the exact same
 * seamless blending technique as the Hero landscape banner:
 *   - Day Mode: `mix-blend-multiply` (paper dissolves into washi canvas)
 *   - Night Mode: `dark:mix-blend-screen dark:invert` (ink turns to luminous silver brushwork)
 *   - Radial vignette mask for smooth, feather-light blending
 */
export const JapaneseWaveScenery: React.FC = () => {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* ── 1. Stretched Panoramic Sumi-e Ocean Wave Masterpiece Banner ── */}
      <img
        src="./images/sumie-ocean-waves-backdrop.jpg"
        alt="Panoramic sumi-e ocean waves backdrop"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-70 sm:opacity-75 dark:opacity-40 mix-blend-multiply dark:mix-blend-screen dark:invert animate-gentle-drift transition-opacity duration-700"
        style={{
          maskImage: 'radial-gradient(ellipse 98% 90% at 50% 50%, black 45%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse 98% 90% at 50% 50%, black 45%, transparent 95%)',
        }}
      />

      {/* ── 2. Dedicated Sumi-e Wave prominently anchoring the left flank ── */}
      <div className="absolute left-0 sm:left-2 lg:left-6 bottom-0 h-4/5 max-h-[720px] w-auto max-w-lg hidden sm:block pointer-events-none z-0">
        <img
          src="./images/sumie-wave-left.jpg"
          alt="Sumi-e ocean wave left flank"
          className="w-full h-full object-contain object-bottom-left opacity-75 dark:opacity-45 mix-blend-multiply dark:mix-blend-screen dark:invert transition-opacity duration-300"
          style={{
            maskImage: 'radial-gradient(ellipse 92% 90% at 35% 65%, black 50%, transparent 90%)',
            WebkitMaskImage: 'radial-gradient(ellipse 92% 90% at 35% 65%, black 50%, transparent 90%)',
          }}
        />
      </div>

      {/* ── 3. Dedicated Sumi-e Wave anchoring the right flank ── */}
      <div className="absolute right-0 sm:right-2 lg:right-6 bottom-4 h-3/5 max-h-[560px] w-auto max-w-md hidden sm:block pointer-events-none z-0">
        <img
          src="./images/sumie-wave-right.jpg"
          alt="Sumi-e ocean wave right flank"
          className="w-full h-full object-contain object-bottom-right opacity-65 dark:opacity-35 mix-blend-multiply dark:mix-blend-screen dark:invert transition-opacity duration-300"
          style={{
            maskImage: 'radial-gradient(ellipse 90% 90% at 65% 65%, black 45%, transparent 90%)',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 65% 65%, black 45%, transparent 90%)',
          }}
        />
      </div>

      {/* ── 4. Subtle Japanese Washi Texture Layer ── */}
      <div className="absolute inset-0 bg-transparent washi-pattern opacity-40 dark:opacity-20 pointer-events-none" />
    </div>
  );
};
