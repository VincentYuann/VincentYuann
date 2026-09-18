import React, { useState } from 'react';
import { getDeviconSlug, normalizeTechName } from '../lib/techIcons';
import '../styles/tech-badge.css';

interface TechBadgeProps {
  name: string;
  icon?: string;
  className?: string;
}

export const TechBadge: React.FC<TechBadgeProps> = ({ name, icon, className = '' }) => {
  const [imgError, setImgError] = useState(false);
  const [triedFallback, setTriedFallback] = useState(false);

  const cleanName = normalizeTechName(name);
  const effectiveIcon = icon || getDeviconSlug(cleanName);

  // Default to Devicon for full original multi-color brand logos
  // If Devicon doesn't have it, fall back to Simple Icons
  const iconSrc = !triedFallback
    ? `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${effectiveIcon}/${effectiveIcon}-original.svg`
    : `https://cdn.simpleicons.org/${effectiveIcon}`;

  const handleError = () => {
    if (!triedFallback) {
      setTriedFallback(true);
    } else {
      setImgError(true);
    }
  };

  const showImage = effectiveIcon && !imgError;

  return (
    <span
      className={`tech-badge ${className}`}
      title={name}
    >
      {showImage && (
        <img
          src={iconSrc}
          alt=""
          loading="lazy"
          className="tech-badge-icon"
          onError={handleError}
        />
      )}
      <span className="tech-badge-name uppercase tracking-wider text-[10px] font-sans font-semibold">
        {cleanName}
      </span>
    </span>
  );
};
