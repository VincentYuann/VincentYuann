import React from 'react';

export type TechCategory = 'ai' | 'systems' | 'fullstack' | 'data' | 'neutral';

interface TechTagProps {
  tag: string;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
  className?: string;
  onClick?: () => void;
}

/**
 * Categorizes a technology string into an architectural domain
 * to apply the harmonious Akari Wabi-Sabi palette from design.md.
 */
export function getTechCategory(tag: string): TechCategory {
  const t = tag.toLowerCase().trim();

  // AI & ML
  if (
    t.includes('llama') ||
    t.includes('pytorch') ||
    t.includes('llm') ||
    t.includes('ai') ||
    t.includes('openai') ||
    t.includes('gemini') ||
    t.includes('embedding') ||
    t.includes('langchain') ||
    t.includes('llamaindex') ||
    t.includes('qdrant') ||
    t.includes('python') ||
    t.includes('fastapi') ||
    t.includes('huggingface')
  ) {
    return 'ai';
  }

  // Systems & Cloud Infrastructure
  if (
    t.includes('rust') ||
    t.includes('docker') ||
    t.includes('linux') ||
    t.includes('c++') ||
    t.includes('c/c++') ||
    t.includes('kubernetes') ||
    t.includes('k8s') ||
    t.includes('kafka') ||
    t.includes('aws') ||
    t.includes('gcp') ||
    t.includes('websocket') ||
    t.includes('socket') ||
    t.includes('grpc') ||
    t.includes('redis')
  ) {
    return 'systems';
  }

  // Full-Stack & Frontend
  if (
    t.includes('react') ||
    t.includes('next.js') ||
    t.includes('typescript') ||
    t.includes('javascript') ||
    t.includes('tailwind') ||
    t.includes('three.js') ||
    t.includes('webgl') ||
    t.includes('node') ||
    t.includes('vue') ||
    t.includes('svelte') ||
    t.includes('html') ||
    t.includes('css')
  ) {
    return 'fullstack';
  }

  // Data & Storage
  if (
    t.includes('postgres') ||
    t.includes('supabase') ||
    t.includes('sql') ||
    t.includes('timescale') ||
    t.includes('sqlite') ||
    t.includes('database') ||
    t.includes('mongodb')
  ) {
    return 'data';
  }

  return 'neutral';
}

const CATEGORY_STYLES: Record<
  TechCategory,
  {
    pill: string;
    dot: string;
  }
> = {
  // AI & ML: Terracotta / Cinnabar theme
  ai: {
    pill: 'bg-terracotta/[0.06] dark:bg-terracotta/[0.12] border-terracotta/30 dark:border-terracotta/40 text-[#9E2612] dark:text-[#FFB5A7] hover:border-terracotta/60',
    dot: 'bg-terracotta',
  },
  // Systems & Cloud: Bamboo Green theme
  systems: {
    pill: 'bg-bamboo/[0.07] dark:bg-bamboo/[0.14] border-bamboo/30 dark:border-bamboo-light/40 text-[#2D4D40] dark:text-[#9DD1BE] hover:border-bamboo/60',
    dot: 'bg-bamboo dark:bg-bamboo-light',
  },
  // Full-Stack & Frontend: Ochre / Amber theme
  fullstack: {
    pill: 'bg-ochre/[0.08] dark:bg-ochre/[0.12] border-ochre/35 dark:border-ochre/40 text-[#7D4E1D] dark:text-[#F3C59D] hover:border-ochre/70',
    dot: 'bg-ochre',
  },
  // Data & Storage: Umber / Earth Slate theme
  data: {
    pill: 'bg-light-surface-muted/90 dark:bg-[#1A1C23] border-light-border-strong/50 dark:border-[#4A4E5A] text-light-ink dark:text-dark-ink hover:border-terracotta/40',
    dot: 'bg-light-ink-muted dark:bg-dark-ink-muted',
  },
  // Default Neutral: Akari Washi hairline
  neutral: {
    pill: 'bg-light-surface-muted/70 dark:bg-[#15161B] border-light-border/80 dark:border-[#2D3039] text-light-ink dark:text-dark-ink hover:border-light-border-strong dark:hover:border-[#565A63]',
    dot: 'bg-light-ink-subtle dark:bg-dark-ink-subtle',
  },
};

const SIZE_STYLES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-[11px]',
  lg: 'px-3 py-1.5 text-xs',
};

export const TechTag: React.FC<TechTagProps> = ({
  tag,
  size = 'md',
  showDot = true,
  className = '',
  onClick,
}) => {
  const category = getTechCategory(tag);
  const style = CATEGORY_STYLES[category];
  const sizeCls = SIZE_STYLES[size];

  const Comp = onClick ? 'button' : 'span';

  return (
    <Comp
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 font-mono font-medium rounded-md border tracking-tight transition-all duration-150 select-none shadow-[0_1px_2px_rgba(0,0,0,0.04)] ${sizeCls} ${style.pill} ${className}`}
    >
      {showDot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 opacity-85 ${style.dot}`}
          aria-hidden="true"
        />
      )}
      <span>{tag}</span>
    </Comp>
  );
};
