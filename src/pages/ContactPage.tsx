import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Shield, Clock, MailCheck } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ContactForm } from '../components/ContactForm';
import type { ProfileData } from '../lib/useProfile';
import '../styles/contact-page.css';

interface ContactPageProps {
  profile: ProfileData;
  onOpenCommand: () => void;
  onOpenProfile?: () => void;
  onOpenSettings?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  profile,
  onOpenCommand,
  onOpenProfile,
  onOpenSettings,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="contact-page-container">
      <Navbar onOpenCommand={onOpenCommand} onOpenProfile={onOpenProfile} onOpenSettings={onOpenSettings} profile={profile} />

      <main className="contact-main-content">
        {/* Navigation Breadcrumbs */}
        <div className="contact-breadcrumb-bar">
          <Link
            to="/"
            className="contact-back-link"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Journey Stream</span>
          </Link>
          <span className="contact-breadcrumb-divider">/</span>
          <span className="contact-breadcrumb-current">Hire Me & Contact</span>
        </div>

        {/* Page Hero Header */}
        <div className="contact-hero-block">
          <div className="contact-status-pill">
            <Sparkles className="contact-status-pill-icon" />
            <span>Open for Opportunities & Collaborations</span>
          </div>

          <h1 className="contact-title">
            Let's build something exceptional together.
          </h1>

          <p className="contact-subtitle">
            I am currently available for Full-Stack, Distributed Systems, and Applied AI Engineering roles. 
            Fill out the form below to deliver a message with optional specs, resumes, or documents attached directly to my inbox.
          </p>
        </div>

        {/* Value Highlights Cards */}
        <div className="contact-value-grid">
          <div className="contact-value-card">
            <div className="contact-value-card-title">
              <Clock className="w-4 h-4 text-[#3894B3]" />
              <span>Fast Response</span>
            </div>
            <p className="contact-value-card-text">
              Direct delivery via Resend API. I typically review and reply to inquiries within 24–48 hours.
            </p>
          </div>

          <div className="contact-value-card">
            <div className="contact-value-card-title">
              <MailCheck className="w-4 h-4 text-[#588A75]" />
              <span>Spec & File Attachments</span>
            </div>
            <p className="contact-value-card-text">
              Easily attach job descriptions, architecture RFCs, or project specs (PDF, DOCX, images up to 5MB).
            </p>
          </div>

          <div className="contact-value-card">
            <div className="contact-value-card-title">
              <Shield className="w-4 h-4 text-[#A35D43]" />
              <span>Rate-Limited & Secure</span>
            </div>
            <p className="contact-value-card-text">
              Guarded by IP-based backend rate limiting and spam traps to prevent automated harvesting.
            </p>
          </div>
        </div>

        {/* Contact Form Container */}
        <div className="pt-2">
          <ContactForm />
        </div>
      </main>

      <Footer profile={profile} showCta={false} />
    </div>
  );
};
