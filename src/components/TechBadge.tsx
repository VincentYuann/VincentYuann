import React, { useState } from 'react';
import '../styles/tech-badge.css';

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
      className={`tech-badge ${className}`}
      title={name}
    >
      {icon && !imgError && (
        <img
          src={iconSrc}
          alt=""
          loading="lazy"
          className="tech-badge-icon"
          onError={handleError}
        />
      )}
      <span className="tech-badge-name">{name}</span>
    </span>
  );
};
