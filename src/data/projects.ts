export interface Project {
  id: string;
  title: string;
  kanji: string;
  category: 'All' | 'Distributed Systems' | 'Generative AI' | 'Creative Tech' | 'Full-Stack';
  badge: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  overview: string;
  architectureDetails: {
    title: string;
    points: string[];
  }[];
  links: {
    github?: string;
    live?: string;
    caseStudyText?: string;
  };
  isFeatured?: boolean;
  displayOrder?: number;
}

export const PROJECTS: Project[] = [
  {
    id: 'sumi-os',
    title: 'Sumi OS & Workspace',
    kanji: '墨',
    category: 'Distributed Systems',
    badge: 'DISTRIBUTED DESKTOP',
    subtitle: 'Contemplative Digital Environment & Local Intelligence',
    description:
      'A distraction-free digital environment engineered around local privacy-first LLMs, e-paper display emulation, and ambient notifications governed by user attention telemetry.',
    image: './images/sumi-os-workspace.jpg',
    tags: ['React', 'Next.js', 'Python', 'Docker', 'Llama-3 Local', 'WebSockets'],
    metrics: [
      { label: 'Privacy', value: '100% On-Device' },
      { label: 'Token Latency', value: '< 18ms TTFT' },
      { label: 'Memory Footprint', value: '2.4 GB' },
    ],
    overview:
      'Sumi OS merges minimalist Japanese stationery traditions with modern high-concurrency client-server architecture. By decoupling computing workloads from visual clutter, it preserves deep creative focus while maintaining sovereign data control.',
    architectureDetails: [
      {
        title: 'Local Inference Runtime',
        points: [
          'Direct integration with llama.cpp C++ runtime via custom Unix domain socket daemon',
          'Dynamic context pruning keeping KV cache bounded during multi-hour writing sessions',
          'Zero telemetry leakage; all embeddings and conversation state remain in encrypted local SQLite',
        ],
      },
      {
        title: 'Interface Cadence & E-Paper Emulation',
        points: [
          'Variable refresh pipeline (8Hz–60Hz) simulating physical micro-capsule ink settling',
          'Sub-millisecond keyboard input response using off-main-thread Web Workers',
          'Intentional micro-animations inspired by sumi ink flowing into handmade paper',
        ],
      },
    ],
    links: {
      github: 'https://github.com',
      live: '#',
      caseStudyText: 'View Project Architecture',
    },
  },
  {
    id: 'komorebi',
    title: 'Komorebi Living Architecture',
    kanji: '木漏れ日',
    category: 'Creative Tech',
    badge: 'SPATIAL TELEMETRY & AI',
    subtitle: 'Sensory Intelligence & Environmental Synthesis',
    description:
      'Spatial intelligence platform synthesizing environmental sensor telemetry into real-time generative audio-visual ambiance. Transforms raw architectural air quality, acoustic resonance, and sunlight data into organic responsive art.',
    image: './images/komorebi-spatial.jpg',
    tags: ['FastAPI', 'PyTorch', 'Three.js / WebGL', 'PostgreSQL', 'MQTT', 'TimescaleDB'],
    metrics: [
      { label: 'Framerate', value: '60 FPS WebGL' },
      { label: 'Sensory Stream', value: '12k events/s' },
      { label: 'Uptime', value: '99.98%' },
    ],
    overview:
      'Named after the sunlight filtering through tree leaves (木漏れ日), this system gives architectural spaces an organic voice. It treats room telemetry not as dry numbers, but as acoustic and visual parameters for generative generative compositions.',
    architectureDetails: [
      {
        title: 'High-Throughput Telemetry Broker',
        points: [
          'Embedded MQTT cluster ingesting CO2, humidity, Lux, and acoustic decibels at 100ms intervals',
          'TimescaleDB hypertable partitioning ensuring constant-time aggregate queries over months of data',
          'Automatic baseline calibration adapting to seasonal daylight shifts across Tokyo and Kyoto studios',
        ],
      },
      {
        title: 'Generative Audio-Visual Pipeline',
        points: [
          'PyTorch recurrent harmonic model driving gentle generative wind chime and koto soundscapes',
          'WebGL procedural ray-marched shadows simulating sunbeams passing through bamboo shoji blinds',
          'Web Audio API synthesized sound nodes with spatial binaural panning',
        ],
      },
    ],
    links: {
      github: 'https://github.com',
      live: '#',
      caseStudyText: 'View Project Case Study',
    },
  },
  {
    id: 'akari-commerce',
    title: 'Akari Light & Commerce',
    kanji: '明かり',
    category: 'Full-Stack',
    badge: 'HEADLESS COMMERCE',
    subtitle: 'Artisan Lighting Showcase & Interactive 3D Configurator',
    description:
      'Headless bespoke commerce experience celebrating handcrafted Japanese washi paper lighting fixtures and artisan provenance. Features sub-second global page loads, dynamic currency hedging, and custom interactive 3D configurator.',
    image: './images/akari-commerce.jpg',
    tags: ['Next.js 14', 'Tailwind CSS', 'Stripe Engine', 'Supabase', 'Edge Cache', 'Three.js'],
    metrics: [
      { label: 'TTI Global', value: '240 ms' },
      { label: 'Lighthouse Perf', value: '99 / 100' },
      { label: 'Conversion Lift', value: '+34%' },
    ],
    overview:
      'Akari Light transforms online shopping into an editorial gallery visit. By blending tactile material shaders with zero-latency edge delivery, collectors experience the warmth of handmade washi paper lamps before ordering.',
    architectureDetails: [
      {
        title: 'Global Edge Invalidation & Cache',
        points: [
          'Stale-while-revalidate edge CDN nodes across 280+ cities with instantaneous tag purging',
          'Supabase Postgres triggers broadcasting inventory changes through Realtime WebSockets',
          'Server-side rendered product catalogues with embedded micro-data for rich editorial SEO',
        ],
      },
      {
        title: 'Tactile Washi Shader Configurator',
        points: [
          'Custom GLSL subsurface scattering shader simulating internal incandescent bulb glow through Mulberry fibers',
          'Procedural bamboo ribbing deformation allowing interactive height and accordion folding previews',
          'Seamless Apple Pay and multi-currency checkout via Stripe Payment Element',
        ],
      },
    ],
    links: {
      github: 'https://github.com',
      live: '#',
      caseStudyText: 'Explore Store Architecture',
    },
  },
  {
    id: 'bonsai-vector',
    title: 'Bonsai Pruned Vector Engine',
    kanji: '盆栽',
    category: 'Distributed Systems',
    badge: 'ALGORITHMIC SYSTEMS',
    subtitle: 'High-Precision Pruned In-Memory HNSW Indexer',
    description:
      'Minimalist, highly pruned hierarchical navigable small world (HNSW) vector search indexer written in Rust & Python. Designed for edge AI devices with tight memory budgets and microsecond search bounds.',
    image: './images/botanical-ink-accent.jpg',
    tags: ['Rust', 'Python C-API', 'HNSW', 'AVX-512', 'Vector Embeddings'],
    metrics: [
      { label: 'Memory Savings', value: '7.8x' },
      { label: 'Search Latency', value: '1.2 ms' },
      { label: 'Recall @ 10', value: '98.4%' },
    ],
    overview:
      'Just as bonsai master craftsmen selectively prune branches to expose structural essence, this search engine aggressively prunes redundant graph edges without degrading top-k semantic recall.',
    architectureDetails: [
      {
        title: 'Heuristic Graph Pruning',
        points: [
          'Distance-skewed edge elimination reducing edge count by 82% compared to standard HNSW',
          'SIMD-vectorized L2 and Cosine similarity computation leveraging AVX-512 and ARM NEON intrinsics',
          'Cache-line aligned memory layout ensuring zero L3 cache eviction during multi-hop graph traversals',
        ],
      },
    ],
    links: {
      github: 'https://github.com',
      live: '#',
      caseStudyText: 'Inspect Engine Benchmarks',
    },
  },
];
