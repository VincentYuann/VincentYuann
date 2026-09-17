import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Shield, Clock, MailCheck } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ContactForm } from '../components/ContactForm';
import type { ProfileData } from '../lib/useProfile';

interface ContactPageProps {
  profile: ProfileData;
  onOpenCommand: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  profile,
  onOpenCommand,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFBFD] text-gray-900 flex flex-col">
      <Navbar onOpenCommand={onOpenCommand} profile={profile} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-8">
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center gap-3 text-xs">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[#57606A] hover:text-[#1B2127] font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Journey Stream</span>
          </Link>
          <span className="text-[#D0D7DE]">/</span>
          <span className="text-[#1B2127] font-bold">Hire Me & Contact</span>
        </div>

        {/* Page Hero Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF6F9] border border-[#3894B3]/30 text-[#2B6D83] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#3894B3]" />
            <span>Open for Opportunities & Collaborations</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1B2127] tracking-tight">
            Let's build something exceptional together.
          </h1>

          <p className="text-sm text-[#57606A] max-w-2xl leading-relaxed">
            I am currently available for Full-Stack, Distributed Systems, and Applied AI Engineering roles. 
            Fill out the form below to deliver a message with optional specs, resumes, or documents attached directly to my inbox.
          </p>
        </div>

        {/* Value Highlights Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-white border border-[#D0D7DE] rounded-xl p-4 space-y-1 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1B2127]">
              <Clock className="w-4 h-4 text-[#3894B3]" />
              <span>Fast Response</span>
            </div>
            <p className="text-[11px] text-[#57606A] leading-normal">
              Direct delivery via Resend API. I typically review and reply to inquiries within 24–48 hours.
            </p>
          </div>

          <div className="bg-white border border-[#D0D7DE] rounded-xl p-4 space-y-1 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1B2127]">
              <MailCheck className="w-4 h-4 text-[#588A75]" />
              <span>Spec & File Attachments</span>
            </div>
            <p className="text-[11px] text-[#57606A] leading-normal">
              Easily attach job descriptions, architecture RFCs, or project specs (PDF, DOCX, images up to 5MB).
            </p>
          </div>

          <div className="bg-white border border-[#D0D7DE] rounded-xl p-4 space-y-1 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1B2127]">
              <Shield className="w-4 h-4 text-[#A35D43]" />
              <span>Rate-Limited & Secure</span>
            </div>
            <p className="text-[11px] text-[#57606A] leading-normal">
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
