import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { FLAGSHIP_PROJECTS, RIVER_PEBBLES, type FlagshipProject, type RiverPebble } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import '../styles/river-timeline.css';

interface RiverTimelineProps {
  flagships?: FlagshipProject[];
  pebbles?: RiverPebble[];
  allProjects?: FlagshipProject[];
  isAdmin?: boolean;
  onOpenGallery?: (filter?: string) => void;
  onViewDetails?: (project: FlagshipProject) => void;
}

export const RiverTimeline: React.FC<RiverTimelineProps> = ({
  flagships = FLAGSHIP_PROJECTS,
  pebbles = RIVER_PEBBLES,
  allProjects = [],
  isAdmin = false,
  onOpenGallery,
  onViewDetails,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeBoulderId, setActiveBoulderId] = useState<string>(flagships[0]?.id || 'anim-y');

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
      if (v < 0.35 && flagships[0]) {
        setActiveBoulderId(flagships[0].id);
      } else if (v < 0.7 && flagships[1]) {
        setActiveBoulderId(flagships[1].id);
      } else if (flagships[2]) {
        setActiveBoulderId(flagships[2].id);
      }
    });
  }, [scrollYProgress, flagships]);

  return (
    <section ref={containerRef} className="timeline-section">
      {/* Section Header */}
      <div className="timeline-header">
        <span className="timeline-eyebrow">
          Architecture Milestones
        </span>
        <h2 className="timeline-title">
          Flagship Systems
        </h2>
        <p className="timeline-desc">
          Core full-stack web applications, real-time sync engines, and distributed architectures.
        </p>
        {onOpenGallery && (
          <div className="pt-2">
            <button
              onClick={() => onOpenGallery('all')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-[#1B2127] bg-white hover:bg-[#F6F8FA] border border-[#D0D7DE] hover:border-[#8C959F] rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <span>Explore Full Systems Gallery ({allProjects.length || 6}) →</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Layout: River Spine + Project Showcases */}
      <div className="timeline-container">
        {/* Riverbed SVG Spline running vertically through the milestones */}
        <div className="timeline-svg-channel">
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
        <div className="timeline-milestones-stack">
          {flagships.map((project, index) => {
            const isActive = activeBoulderId === project.id;
            const correspondingPebble = pebbles[index];

            return (
              <div key={project.id} id={project.id} className="relative scroll-mt-24">
                <div className="milestone-row">
                  {/* Left Column: Tactile River Stone Node */}
                  <div className="milestone-stone-col">
                    {/* Sculpted River Boulder Node */}
                    <button
                      onClick={() => setActiveBoulderId(project.id)}
                      className={`boulder-node ${isActive ? 'active' : ''}`}
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
                        <span className="boulder-ripple" />
                      )}

                      <span className="boulder-idx">
                        0{index + 1}
                      </span>
                      <span className="boulder-title">
                        {project.title.split(' ')[0]}
                      </span>
                    </button>

                    <div className="milestone-meta">
                      <span className="milestone-badge-text">
                        {index === 0 ? 'Foundation' : index === 1 ? 'Real-Time' : 'AI Pipeline'}
                      </span>
                      <span className="milestone-sub-text">
                        {project.stats[0].value}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Detailed Project Case Card */}
                  <div className="milestone-card-col">
                    <ProjectCard
                      project={project}
                      isActive={isActive}
                      isAdmin={isAdmin}
                      onViewDetails={onViewDetails}
                    />
                  </div>
                </div>

                {/* Riverbank Pebble (Secondary Exploration) resting below each milestone */}
                {correspondingPebble && (
                  <div className="pebble-row">
                    <div 
                      onClick={() => {
                        if (onViewDetails) {
                          const fullProject = allProjects.find((p) => p.id === correspondingPebble.id);
                          if (fullProject) {
                            onViewDetails(fullProject);
                            return;
                          }
                          onViewDetails({
                            id: correspondingPebble.id,
                            title: correspondingPebble.title,
                            category: correspondingPebble.tag || 'River Pebble',
                            subtitle: correspondingPebble.description,
                            description: correspondingPebble.description,
                            tags: correspondingPebble.tags || (correspondingPebble.icon ? [{ name: correspondingPebble.title, icon: correspondingPebble.icon }] : []),
                            stats: correspondingPebble.stats || [{ label: 'Category', value: correspondingPebble.tag }],
                            highlights: correspondingPebble.highlights || ['Exploratory sandbox & architecture practice'],
                            stoneAccent: '#6E7E8E',
                            githubUrl: correspondingPebble.githubUrl,
                            liveUrl: correspondingPebble.liveUrl,
                            imageUrl: correspondingPebble.imageUrl,
                            detailsMarkdown: correspondingPebble.detailsMarkdown,
                            isFlagship: false,
                          });
                        } else if (onOpenGallery) {
                          onOpenGallery('experiments');
                        }
                      }}
                      className="pebble-pill cursor-pointer"
                      title="Click to inspect exploratory sandbox details"
                    >
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
                      <span className="pebble-title">
                        {correspondingPebble.title}
                      </span>
                      <span className="pebble-tag">
                        ({correspondingPebble.tag})
                      </span>
                      <span className="pebble-desc line-clamp-1">
                        — {correspondingPebble.description}
                      </span>
                      {correspondingPebble.githubUrl && (
                        <a
                          href={correspondingPebble.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
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
      <div className="timeline-footer">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3894B3]" />
          <span>Continuous Integration & Deployment via GitHub Actions</span>
        </div>
        <div>All systems version-controlled on GitHub</div>
      </div>
    </section>
  );
};
