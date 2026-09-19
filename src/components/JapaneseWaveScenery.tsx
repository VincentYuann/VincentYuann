import React from 'react';

/**
 * JapaneseWaveScenery (波濤図)
 * Uses real transparent PNG cutouts extracted directly from the reference sheet.
 * Positioned on the left and right flanks with gentle overlapping waves in the
 * center, blending seamlessly into both Day and Night theme palettes.
 */
export const JapaneseWaveScenery: React.FC = () => {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* ── 1. Left Flank: Authentic Great Wave Cutout ── */}
      <div className="absolute left-0 -bottom-4 sm:bottom-0 w-[280px] sm:w-[460px] lg:w-[580px] h-auto max-h-[70vh] pointer-events-none z-0">
        <img
          src="./images/waves/wave-cutout-great-left.png"
          alt="Japanese Great Wave cutout on left flank"
          className="w-full h-auto object-contain object-left-bottom opacity-40 sm:opacity-50 dark:opacity-35 sm:dark:opacity-40 mix-blend-multiply dark:mix-blend-screen dark:saturate-[1.3] dark:brightness-110 animate-ocean-wave transition-all duration-700"
          style={{
            maskImage: 'radial-gradient(ellipse 92% 90% at 35% 65%, black 50%, transparent 92%)',
            WebkitMaskImage: 'radial-gradient(ellipse 92% 90% at 35% 65%, black 50%, transparent 92%)',
          }}
        />
      </div>

      {/* ── 2. Right Flank: Surging Wave Ridge Cutout ── */}
      <div className="absolute right-0 bottom-4 sm:bottom-8 w-[280px] sm:w-[440px] lg:w-[540px] h-auto max-h-[60vh] pointer-events-none z-0">
        <img
          src="./images/waves/wave-cutout-mid-right.png"
          alt="Japanese surging wave ridge cutout on right flank"
          className="w-full h-auto object-contain object-right-bottom opacity-40 sm:opacity-50 dark:opacity-35 sm:dark:opacity-40 mix-blend-multiply dark:mix-blend-screen dark:saturate-[1.3] dark:brightness-110 animate-ocean-wave transition-all duration-700"
          style={{
            maskImage: 'radial-gradient(ellipse 92% 90% at 65% 65%, black 50%, transparent 92%)',
            WebkitMaskImage: 'radial-gradient(ellipse 92% 90% at 65% 65%, black 50%, transparent 92%)',
          }}
        />
      </div>

      {/* ── 3. Lower Left / Center: Stylized Flowing Wave Ribbon with Claws ── */}
      <div className="absolute left-1/4 -translate-x-1/2 bottom-0 sm:bottom-4 w-[240px] sm:w-[360px] lg:w-[440px] h-auto pointer-events-none z-0">
        <img
          src="./images/waves/wave-cutout-stylized-ribbon.png"
          alt="Stylized Japanese wave ribbon with claws"
          className="w-full h-auto object-contain object-bottom opacity-35 sm:opacity-45 dark:opacity-30 sm:dark:opacity-35 mix-blend-multiply dark:mix-blend-screen dark:saturate-[1.25] dark:brightness-110 transition-all duration-700"
        />
      </div>

      {/* ── 4. Lower Right / Center: Rolling Wave Billow ── */}
      <div className="absolute right-1/4 translate-x-1/2 bottom-0 sm:bottom-2 w-[240px] sm:w-[380px] lg:w-[460px] h-auto pointer-events-none z-0">
        <img
          src="./images/waves/wave-cutout-lower-right.png"
          alt="Rolling Japanese wave billow"
          className="w-full h-auto object-contain object-bottom opacity-35 sm:opacity-45 dark:opacity-30 sm:dark:opacity-35 mix-blend-multiply dark:mix-blend-screen dark:saturate-[1.25] dark:brightness-110 transition-all duration-700"
        />
      </div>

      {/* ── 5. Top Right Subtle Floating Wave Crest ── */}
      <div className="absolute right-4 sm:right-12 top-28 sm:top-36 w-[200px] sm:w-[320px] h-auto pointer-events-none z-0 hidden md:block">
        <img
          src="./images/waves/wave-cutout-top-right.png"
          alt="Subtle distant cresting wave"
          className="w-full h-auto object-contain opacity-25 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen dark:saturate-[1.2] transition-all duration-700"
        />
      </div>
    </div>
  );
};
