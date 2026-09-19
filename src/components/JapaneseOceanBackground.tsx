import React from 'react';

export const JapaneseOceanBackground: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none" aria-hidden="true">
      {/* 1. Prussian Blue / Indigo Deep Atmospheric Gradients */}
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] rounded-full bg-gradient-to-b from-[#183a66]/15 via-[#235284]/10 to-transparent dark:from-[#1b3d6c]/30 dark:via-[#132c4f]/20 dark:to-transparent blur-3xl transition-colors duration-500"
      />
      <div
        className="absolute top-1/3 -left-40 w-[600px] h-[600px] rounded-full bg-[#1b3f6b]/10 dark:bg-[#1e4b82]/15 blur-3xl"
      />
      <div
        className="absolute top-1/2 -right-40 w-[600px] h-[600px] rounded-full bg-[#133156]/10 dark:bg-[#163861]/15 blur-3xl"
      />

      {/* 2. Panoramic Hokusai Great Wave off Kanagawa (神奈川沖浪裏) Artwork */}
      <div className="absolute inset-0 flex items-start justify-center overflow-hidden">
        <img
          src="./images/great-wave-kanagawa.jpg"
          alt="The Great Wave off Kanagawa Japanese ocean art backdrop"
          className="w-full min-w-[1024px] max-w-none lg:max-w-7xl h-auto object-cover object-top opacity-25 sm:opacity-30 mix-blend-multiply dark:opacity-30 sm:dark:opacity-35 dark:mix-blend-screen dark:saturate-[1.35] dark:brightness-105 animate-ocean-wave transition-all duration-700"
          style={{
            maskImage: 'radial-gradient(ellipse 95% 85% at 50% 40%, black 45%, transparent 95%)',
            WebkitMaskImage: 'radial-gradient(ellipse 95% 85% at 50% 40%, black 45%, transparent 95%)',
          }}
        />
      </div>

      {/* 3. Classical Japanese Seigaiha (青海波) Geometric Wave Pattern Accent */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.07] dark:opacity-[0.05] text-[#1a365d] dark:text-[#7eb6ff] transition-opacity duration-500"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="seigaiha-pattern"
            width="60"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            {/* Concentric Seigaiha wave arches */}
            <path
              d="M0,30 A30,30 0 0,1 60,30 M6,30 A24,24 0 0,1 54,30 M12,30 A18,18 0 0,1 48,30 M18,30 A12,12 0 0,1 42,30 M24,30 A6,6 0 0,1 36,30"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M-30,15 A30,30 0 0,1 30,15 M-24,15 A24,24 0 0,1 24,15 M-18,15 A18,18 0 0,1 18,15 M-12,15 A12,12 0 0,1 12,15 M-6,15 A6,6 0 0,1 6,15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M30,15 A30,30 0 0,1 90,15 M36,15 A24,24 0 0,1 84,15 M42,15 A18,18 0 0,1 78,15 M48,15 A12,12 0 0,1 72,15 M54,15 A6,6 0 0,1 66,15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#seigaiha-pattern)" />
      </svg>

      {/* 4. Delicate Sea Spray & Ink Particles */}
      <div className="absolute inset-0 bg-transparent washi-pattern opacity-40 dark:opacity-20 pointer-events-none" />
    </div>
  );
};
