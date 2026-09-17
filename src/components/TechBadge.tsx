import React, { useState } from 'react';

interface TechBadgeProps {
  name: string;
  icon?: string;
  className?: string;
}

export const TechBadge: React.FC<TechBadgeProps> = ({ name, icon, className = '' }) => {
  const [imgError, setImgError] = useState(false);
  const [triedFallback, setTriedFallback] = useState(false);

  // Default to Devicon for full original multi-color brand logos
  // If Devicon doesn't have it, fall back to Simple Icons
  const iconSrc = !triedFallback
    ? `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}/${icon}-original.svg`
    : `https://cdn.simpleicons.org/${icon}`;

  const handleError = () => {
    if (!triedFallback) {
      setTriedFallback(true);
    } else {
      setImgError(true);
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-white/85 text-[#2C353F] border border-[#2A2F35]/10 hover:border-[#3894B3]/40 hover:bg-white transition-all shadow-2xs ${className}`}
      title={name}
    >
      {icon && !imgError && (
        <img
          src={iconSrc}
          alt=""
          loading="lazy"
          className="w-3.5 h-3.5 object-contain shrink-0"
          onError={handleError}
        />
      )}
      <span className="leading-none">{name}</span>
    </span>
  );
};
