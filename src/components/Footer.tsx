import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowUpRight, Settings } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { ContactForm } from './ContactForm';
import { PROFILE_INFO } from '../data/projects';
import '../styles/footer.css';

import type { ProfileData } from '../lib/useProfile';

interface FooterProps {
  profile?: ProfileData;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const currentProfile = profile || {
    name: PROFILE_INFO.name,
    role: PROFILE_INFO.title,
    status: PROFILE_INFO.status,
    email: PROFILE_INFO.email,
    github: PROFILE_INFO.github,
    linkedin: PROFILE_INFO.linkedin,
    about: PROFILE_INFO.about,
    tagline: PROFILE_INFO.tagline,
    location: PROFILE_INFO.location,
  };
  return (
    <footer className="footer-container" id="contact">
      <div className="footer-grid">
        <div className="footer-main-col">
          <span className="footer-eyebrow">
            Get in touch
          </span>
          <h3 className="footer-heading">
            Let's build something exceptional together.
          </h3>
          <p className="footer-bio">
            {currentProfile.about || (
              <>
                Currently available for Full-Stack and Applied AI Engineering roles. Whether you want to discuss real-time WebSockets, LLM vector search architectures, or just talk tech, I'd love to connect.
              </>
            )}
          </p>

          <ContactForm className="mb-6" />

          <div className="footer-links">
            <Link
              to="/contact"
              className="footer-btn-primary"
            >
              <Mail className="w-4 h-4" />
              <span>Hire Me / Send Message</span>
            </Link>
            <a
              href={currentProfile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="footer-btn-secondary"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-[#7B8B9A]" />
            </a>
            <a
              href={currentProfile.github}
              target="_blank"
              rel="noreferrer"
              className="footer-btn-secondary"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-[#7B8B9A]" />
            </a>
            <Link
              to="/projects"
              className="footer-btn-secondary cursor-pointer"
            >
              <span>Browse All Systems Gallery →</span>
            </Link>
          </div>
        </div>

        <div className="footer-side-col">
          <div className="footer-colophon-box">
            <div className="footer-colophon-title">
              Architecture Colophon
            </div>
            <p className="footer-colophon-desc">
              Designed as an organic, static showcase. Powered by <strong>React 19</strong>,{' '}
              <strong>Vite</strong>, <strong>Tailwind CSS</strong>, and <strong>Supabase</strong> with Postgres RLS.
              Zero server overhead, zero exposed secrets, deployed automatically via GitHub Pages.
            </p>
          </div>

          <div className="footer-copyright flex items-center justify-between">
            <span>© {new Date().getFullYear()} {currentProfile.name}. Built with care and craft.</span>
            <Link
              to="/admin"
              className="opacity-40 hover:opacity-100 transition-opacity p-1 text-gray-500 hover:text-gray-900 cursor-pointer"
              title="Admin CMS & Settings"
            >
              <Settings className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
