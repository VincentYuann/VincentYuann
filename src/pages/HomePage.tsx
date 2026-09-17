import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { RiverTimeline } from '../components/RiverTimeline';
import { Footer } from '../components/Footer';
import type { FlagshipProject, RiverPebble } from '../data/projects';
import type { ProfileData } from '../lib/useProfile';

interface HomePageProps {
  flagships: FlagshipProject[];
  pebbles: RiverPebble[];
  allProjects: FlagshipProject[];
  profile: ProfileData;
  onOpenCommand: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  flagships,
  pebbles,
  allProjects,
  profile,
  onOpenCommand,
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Navbar onOpenCommand={onOpenCommand} profile={profile} />

      <Hero profile={profile} />

      <main className="flex-1">
        <RiverTimeline
          flagships={flagships}
          pebbles={pebbles}
          allProjects={allProjects}
          onOpenGallery={() => navigate('/projects')}
          onViewDetails={(project) => navigate(`/projects/${project.id}`)}
        />
      </main>

      <Footer profile={profile} />
    </div>
  );
};
