import React from 'react';
import {
  Cpu,
  Server,
  Code2,
  Database,
  Terminal,
  Layers,
  Box,
  Sparkles,
  Workflow,
} from 'lucide-react';

interface TechTagProps {
  tag: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
  onClick?: () => void;
}

/**
 * Maps technology names to a relevant architectural icon from lucide-react.
 * All icons and tags use the canonical neutral Akari Wabi-Sabi palette
 * without rainbow/multi-color tints, adhering strictly to design.md.
 */
function getTechIcon(tag: string) {
  const t = tag.toLowerCase().trim();

  // AI & ML
  if (
    t.includes('llama') ||
    t.includes('pytorch') ||
    t.includes('ai') ||
    t.includes('llm') ||
    t.includes('openai') ||
    t.includes('gemini') ||
    t.includes('embedding') ||
    t.includes('llamaindex') ||
    t.includes('qdrant')
  ) {
    return Sparkles;
  }

  // Languages & CLI runtimes
  if (
    t.includes('rust') ||
    t.includes('python') ||
    t.includes('c++') ||
    t.includes('c/c++') ||
    t.includes('go') ||
    t.includes('shell') ||
    t.includes('bash')
  ) {
    return Terminal;
  }

  // Frontend & UI frameworks
  if (
    t.includes('react') ||
    t.includes('next.js') ||
    t.includes('typescript') ||
    t.includes('javascript') ||
    t.includes('tailwind') ||
    t.includes('vue') ||
    t.includes('svelte') ||
    t.includes('html') ||
    t.includes('css')
  ) {
    return Code2;
  }

  // Containers & Packaging
  if (
    t.includes('docker') ||
    t.includes('k8s') ||
    t.includes('kubernetes') ||
    t.includes('wasm')
  ) {
    return Box;
  }

  // Databases & Storage
  if (
    t.includes('postgres') ||
    t.includes('supabase') ||
    t.includes('sql') ||
    t.includes('timescale') ||
    t.includes('sqlite') ||
    t.includes('redis') ||
    t.includes('database') ||
    t.includes('db')
  ) {
    return Database;
  }

  // Concurrency & Event Streams
  if (
    t.includes('websocket') ||
    t.includes('socket') ||
    t.includes('kafka') ||
    t.includes('grpc') ||
    t.includes('n8n') ||
    t.includes('flow')
  ) {
    return Workflow;
  }

  // Cloud & Linux Infrastructure
  if (
    t.includes('aws') ||
    t.includes('gcp') ||
    t.includes('linux') ||
    t.includes('cloud') ||
    t.includes('server') ||
    t.includes('distributed')
  ) {
    return Server;
  }

  // Graphics & Creative Tech
  if (
    t.includes('three.js') ||
    t.includes('webgl') ||
    t.includes('shader') ||
    t.includes('gpu') ||
    t.includes('three')
  ) {
    return Layers;
  }

  return Cpu;
}

const SIZE_STYLES: Record<'sm' | 'md' | 'lg', { pill: string; icon: string }> = {
  sm: {
    pill: 'px-2 py-0.5 text-[10px] gap-1',
    icon: 'w-2.5 h-2.5',
  },
  md: {
    pill: 'px-2.5 py-1 text-[11px] gap-1.5',
    icon: 'w-3 h-3',
  },
  lg: {
    pill: 'px-3 py-1.5 text-xs gap-1.5',
    icon: 'w-3.5 h-3.5',
  },
};

export const TechTag: React.FC<TechTagProps> = ({
  tag,
  size = 'md',
  showIcon = true,
  className = '',
  onClick,
}) => {
  const Icon = getTechIcon(tag);
  const sizeStyle = SIZE_STYLES[size];

  const Comp = onClick ? 'button' : 'span';

  return (
    <Comp
      onClick={onClick}
      className={`inline-flex items-center font-mono font-medium rounded-md border tracking-tight transition-colors duration-150 select-none ${sizeStyle.pill} bg-light-surface dark:bg-[#16171D] border-light-border dark:border-[#333640] text-light-ink dark:text-dark-ink hover:border-terracotta hover:text-terracotta dark:hover:border-terracotta dark:hover:text-terracotta shadow-[0_1px_2px_rgba(43,46,58,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.4)] ${className}`}
    >
      {showIcon && (
        <Icon
          className={`${sizeStyle.icon} text-light-ink-muted dark:text-dark-ink-muted shrink-0 transition-colors group-hover:text-terracotta`}
          aria-hidden="true"
        />
      )}
      <span>{tag}</span>
    </Comp>
  );
};
