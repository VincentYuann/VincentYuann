import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { FLAGSHIP_PROJECTS, RIVER_PEBBLES } from '../data/projects';
import { ProjectCard } from './ProjectCard';

export const RiverTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeBoulderId, setActiveBoulderId] = useState<string>(FLAGSHIP_PROJECTS[0].id);

  // Track scroll position within this timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  // Smooth out scroll progress for a natural liquid momentum
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  });

  // Calculate stream flow length (0% to 100%)
  const pathLength = smoothProgress;

  // Active stone detection based on scroll depth
  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      if (v < 0.35) {
        setActiveBoulderId(FLAGSHIP_PROJECTS[0].id); // AnimY
      } else if (v < 0.7) {
        setActiveBoulderId(FLAGSHIP_PROJECTS[1].id); // FoodFinder
      } else {
        setActiveBoulderId(FLAGSHIP_PROJECTS[2].id); // Modular RAG
      }
    });
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} className="relative w-full max-w-5xl mx-auto px-6 py-12 md:py-20">
      {/* Section Header */}
      <div className="mb-14 text-center md:text-left">
        <span className="text-xs font-mono uppercase tracking-widest text-[#4E7788] font-semibold">
          Chronological Architecture Stream
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#1B2127] mt-2 mb-3">
          The River of Milestones
        </h2>
        <p className="text-sm sm:text-base text-[#56616B] max-w-xl">
          Scroll to trace the current. Water carves through our flagship systems, with exploratory
          pebbles resting along the banks.
        </p>
      </div>

      {/* Main Layout: River Spine + Project Showcases */}
      <div className="relative">
        {/* Riverbed SVG Spline running vertically through the milestones */}
        <div className="hidden md:block absolute left-[38px] top-0 bottom-0 w-[44px] pointer-events-none z-0">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 44 1400"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Multi-strand dry ink contour channels (The Riverbed) */}
            <path
              d="M 22 0 C 36 200, 8 400, 22 600 C 38 800, 6 1000, 22 1200 C 30 1300, 22 1400, 22 1400"
              stroke="#D2D9DF"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <path
              d="M 18 0 C 32 200, 4 400, 18 600 C 34 800, 2 1000, 18 1200 C 26 1300, 18 1400, 18 1400"
              stroke="#C0CBD4"
              strokeWidth="1.2"
            />
            <path
              d="M 26 0 C 40 200, 12 400, 26 600 C 42 800, 10 1000, 26 1200 C 34 1300, 26 1400, 26 1400"
              stroke="#E1E6EB"
              strokeWidth="1"
            />

            {/* Dynamic Cyan Water Stream (Flows as you scroll) */}
            <motion.path
              d="M 22 0 C 36 200, 8 400, 22 600 C 38 800, 6 1000, 22 1200 C 30 1300, 22 1400, 22 1400"
              stroke="#3894B3"
              strokeWidth="4"
              strokeLinecap="round"
              style={{
                pathLength: pathLength,
                filter: 'drop-shadow(0px 0px 8px rgba(56, 148, 179, 0.45))',
              }}
            />

            {/* Inner highlights for watercolor depth */}
            <motion.path
              d="M 20 0 C 34 200, 6 400, 20 600 C 36 800, 4 1000, 20 1200 C 28 1300, 20 1400, 20 1400"
              stroke="#A0D8E9"
              strokeWidth="1.8"
              strokeLinecap="round"
              style={{ pathLength: pathLength }}
            />
          </svg>
        </div>

        {/* Milestone Milestones Stack */}
        <div className="space-y-16 sm:space-y-24">
          {FLAGSHIP_PROJECTS.map((project, index) => {
            const isActive = activeBoulderId === project.id;
            const correspondingPebble = RIVER_PEBBLES[index];

            return (
              <div key={project.id} className="relative">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Left Column: Tactile River Stone Node */}
                  <div className="md:col-span-2 flex md:flex-col items-center gap-4 md:gap-3 md:pt-4">
                    {/* Sculpted River Boulder Node */}
                    <button
                      onClick={() => setActiveBoulderId(project.id)}
                      className={`relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-[28px] flex flex-col items-center justify-center transition-all duration-500 cursor-pointer border shadow-sm ${
                        isActive
                          ? 'bg-[#1B2127] text-white border-[#3894B3] scale-105 shadow-lg shadow-[#3894B3]/25'
                          : 'bg-[#F2EFE9] text-[#2C343D] border-[#2A2F35]/15 hover:bg-[#EAE5DC]'
                      }`}
                      style={{
                        borderRadius:
                          index === 0
                            ? '32px 24px 34px 20px'
                            : index === 1
                            ? '22px 34px 26px 32px'
                            : '30px 22px 32px 26px',
                      }}
                      title={`Jump to ${project.title}`}
                    >
                      {/* Active Water Ripple Ring */}
                      {isActive && (
                        <span className="absolute inset-[-6px] rounded-[34px] border-2 border-[#3894B3]/40 animate-ripple pointer-events-none" />
                      )}

                      <span className="text-[10px] font-mono tracking-wider opacity-70">
                        0{index + 1}
                      </span>
                      <span className="font-serif text-sm sm:text-base font-semibold leading-none mt-0.5">
                        {project.title.split(' ')[0]}
                      </span>
                    </button>

                    <div className="md:text-center">
                      <span className="text-xs font-mono text-[#586A7A] block font-medium">
                        {index === 0 ? 'Foundation' : index === 1 ? 'Real-Time' : 'AI Pipeline'}
                      </span>
                      <span className="text-[11px] text-[#8696A4] hidden sm:block">
                        {project.stats[0].value}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Detailed Project Case Card */}
                  <div className="md:col-span-10">
                    <ProjectCard project={project} isActive={isActive} />
                  </div>
                </div>

                {/* Riverbank Pebble (Secondary Exploration) resting below each milestone */}
                {correspondingPebble && (
                  <div className="mt-8 md:ml-24 md:pl-2 flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFECE4] border border-[#2A2F35]/10 text-xs text-[#444E57] hover:border-[#3894B3]/40 hover:bg-[#E8E4D8] transition-all cursor-pointer group shadow-2xs">
                      {/* Pebble Stone Graphic or Icon */}
                      {correspondingPebble.icon ? (
                        <img
                          src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${correspondingPebble.icon}/${correspondingPebble.icon}-original.svg`}
                          alt=""
                          className="w-3.5 h-3.5 object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <span className="w-2.5 h-2 rounded-full bg-[#788896] group-hover:bg-[#3894B3] transition-colors" />
                      )}
                      <span className="font-mono text-[11px] font-medium text-[#1B2127]">
                        {correspondingPebble.title}
                      </span>
                      <span className="text-[#81909E] text-[10px] hidden sm:inline font-mono">
                        ({correspondingPebble.tag})
                      </span>
                      <span className="text-[#596673] text-[11px] font-normal truncate max-w-[240px] sm:max-w-md hidden md:inline">
                        — {correspondingPebble.description}
                      </span>
                      {correspondingPebble.githubUrl && (
                        <a
                          href={correspondingPebble.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-1 text-[#6E7E8E] group-hover:text-[#1B2127]"
                          title="Open repo"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* River Terminal (Delta / Ocean) */}
      <div className="mt-20 pt-10 border-t border-[#2A2F35]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#586A7A]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3894B3]" />
          <span>Continuous Integration & Deployment via GitHub Actions</span>
        </div>
        <div>All systems version-controlled on GitHub</div>
      </div>
    </section>
  );
};
