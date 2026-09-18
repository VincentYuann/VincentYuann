// Canonical technology icons, slugs, and emoji mapping

export interface TechStackPreset {
  name: string;
  icon: string;
  symbol?: string;
}

export const normalizeTechName = (rawName: string): string => {
  if (!rawName) return '';
  // Strip version suffixes like ' 19', ' 7', ' 5', ' v2', ' v5.1'
  return rawName.replace(/\s+(v?\d+(\.\d+)*)$/i, '').trim();
};

export const POPULAR_STACKS: TechStackPreset[] = [
  { name: 'React', icon: 'react' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'Next.js', icon: 'nextjs' },
  { name: 'Python', icon: 'python' },
  { name: 'FastAPI', icon: 'fastapi' },
  { name: 'Node.js', icon: 'nodejs' },
  { name: 'PostgreSQL', icon: 'postgresql' },
  { name: 'Prisma', icon: 'prisma' },
  { name: 'Docker', icon: 'docker' },
  { name: 'Kubernetes', icon: 'kubernetes' },
  { name: 'Gemini', icon: 'google' },
  { name: 'Qdrant', icon: 'qdrant' },
  { name: 'Socket.IO', icon: 'socketio' },
  { name: 'Express', icon: 'express' },
  { name: 'Tailwind CSS', icon: 'tailwindcss' },
  { name: 'Redis', icon: 'redis' },
  { name: 'AWS', icon: 'amazonwebservices' },
  { name: 'Jenkins', icon: 'jenkins' },
  { name: 'Git', icon: 'git' },
  { name: 'Linux', icon: 'linux' },
];

const TECH_SLUG_MAP: Record<string, string> = {
  'c++': 'cplusplus',
  'cpp': 'cplusplus',
  'c#': 'csharp',
  'cs': 'csharp',
  '.net': 'dot-net',
  'node': 'nodejs',
  'node.js': 'nodejs',
  'nodejs': 'nodejs',
  'vue': 'vuejs',
  'vue.js': 'vuejs',
  'vuejs': 'vuejs',
  'next': 'nextjs',
  'next.js': 'nextjs',
  'nextjs': 'nextjs',
  'tailwind': 'tailwindcss',
  'tailwind css': 'tailwindcss',
  'tailwindcss': 'tailwindcss',
  'postgres': 'postgresql',
  'postgresql': 'postgresql',
  'socket.io': 'socketio',
  'socketio': 'socketio',
  'express': 'express',
  'express.js': 'express',
  'react': 'react',
  'react.js': 'react',
  'react native': 'react',
  'python': 'python',
  'docker': 'docker',
  'typescript': 'typescript',
  'ts': 'typescript',
  'javascript': 'javascript',
  'js': 'javascript',
  'golang': 'go',
  'go': 'go',
  'git': 'git',
  'github': 'github',
  'fastapi': 'fastapi',
  'prisma': 'prisma',
  'supabase': 'supabase',
  'redis': 'redis',
  'mongodb': 'mongodb',
  'graphql': 'graphql',
  'aws': 'amazonwebservices',
  'amazon': 'amazonwebservices',
  'gcp': 'googlecloud',
  'google cloud': 'googlecloud',
  'gemini': 'google',
  'google gemini': 'google',
  'kubernetes': 'kubernetes',
  'k8s': 'kubernetes',
  'linux': 'linux',
  'html': 'html5',
  'html5': 'html5',
  'css': 'css3',
  'css3': 'css3',
  'sass': 'sass',
  'scss': 'sass',
  'vite': 'vitejs',
  'vite.js': 'vitejs',
  'vitejs': 'vitejs',
  'webpack': 'webpack',
  'firebase': 'firebase',
  'flutter': 'flutter',
  'rust': 'rust',
  'java': 'java',
  'kotlin': 'kotlin',
  'swift': 'swift',
  'qdrant': 'qdrant',
  'jenkins': 'jenkins',
  'tanstack': 'reactquery',
  'tanstack query': 'reactquery',
  'react query': 'reactquery',
};

const TECH_EMOJIS: Record<string, string> = {
  react: '⚛️',
  typescript: '🔷',
  javascript: '🟨',
  nextjs: '▲',
  python: '🐍',
  fastapi: '⚡',
  nodejs: '🟢',
  postgresql: '🐘',
  prisma: '◬',
  docker: '🐳',
  kubernetes: '☸️',
  gemini: '✨',
  google: '✨',
  qdrant: '🎯',
  socketio: '🔌',
  express: '🚂',
  tailwindcss: '🎨',
  redis: '🔴',
  aws: '☁️',
  amazonwebservices: '☁️',
  jenkins: '👨‍💼',
  git: '🐙',
  linux: '🐧',
  vite: '⚡',
  vitejs: '⚡',
  supabase: '⚡',
  tanstack: '⚡',
  reactquery: '⚡',
  graphql: '◈',
  mongodb: '🍃',
  html: '🌐',
  css: '🎨',
};

export const getDeviconSlug = (name: string): string => {
  const normalized = normalizeTechName(name).toLowerCase();
  if (TECH_SLUG_MAP[normalized]) return TECH_SLUG_MAP[normalized];
  
  // Try clean key match
  const stripped = normalized.replace(/[^a-z0-9]/g, '');
  if (TECH_SLUG_MAP[stripped]) return TECH_SLUG_MAP[stripped];
  
  return stripped;
};

export const getTechEmoji = (name: string): string => {
  const normalized = normalizeTechName(name).toLowerCase();
  const stripped = normalized.replace(/[^a-z0-9]/g, '');
  
  for (const [key, emoji] of Object.entries(TECH_EMOJIS)) {
    if (stripped.includes(key) || key.includes(stripped)) return emoji;
  }
  return '⚡';
};
