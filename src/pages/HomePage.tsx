import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { RiverTimeline } from '../components/RiverTimeline';
import { Footer } from '../components/Footer';
import { useAuth } from '../lib/useAuth';
import type { FlagshipProject, RiverPebble } from '../data/projects';
import type { ProfileData } from '../lib/useProfile';
import '../styles/home-page.css';

interface HomePageProps {
  flagships: FlagshipProject[];
  pebbles: RiverPebble[];
  allProjects: FlagshipProject[];
  profile: ProfileData;
  onOpenCommand: () => void;
  onOpenProfile?: () => void;
  onOpenSettings?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  flagships,
  pebbles,
  allProjects,
  profile,
  onOpenCommand,
  onOpenProfile,
  onOpenSettings,
}) => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  return (
    <div className="home-page-container">
      <Navbar 
        onOpenCommand={onOpenCommand} 
        onOpenProfile={onOpenProfile}
        onOpenSettings={onOpenSettings}
        profile={profile} 
        isAdmin={isAdmin}
      />

      <Hero profile={profile} isAdmin={isAdmin} />

      <main className="home-main-content">
        <RiverTimeline
          flagships={flagships}
          pebbles={pebbles}
          allProjects={allProjects}
          isAdmin={isAdmin}
          onOpenGallery={() => navigate('/projects')}
          onViewDetails={(project) => navigate(`/projects/${project.id}`)}
        />
      </main>

      <Footer profile={profile} />
    </div>
  );
};
