import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PROFILE_INFO } from '../data/projects';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full max-w-5xl mx-auto px-6 pt-16 pb-20 border-t border-[#2A2F35]/10 mt-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        <div className="md:col-span-7">
          <span className="text-xs font-mono uppercase tracking-widest text-[#4E7788] font-semibold">
            Get in touch
          </span>
          <h3 className="text-2xl sm:text-4xl font-serif text-[#1B2127] mt-2 mb-4">
            Let's build something exceptional together.
          </h3>
          <p className="text-sm text-[#56616B] max-w-lg leading-relaxed mb-6">
            Currently available for Full-Stack and Applied AI Engineering roles. Whether you want to
            discuss real-time WebSockets, LLM vector search architectures, or just talk tech, I'd
            love to connect.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${PROFILE_INFO.email}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-[#1B2127] text-white hover:bg-[#2F3842] transition-colors shadow-xs"
            >
              <Mail className="w-4 h-4" />
              <span>{PROFILE_INFO.email}</span>
            </a>
            <a
              href={PROFILE_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium bg-white text-[#2B3540] border border-[#2A2F35]/15 hover:border-[#3894B3] transition-colors shadow-2xs"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-[#7B8B9A]" />
            </a>
            <a
              href={PROFILE_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium bg-white text-[#2B3540] border border-[#2A2F35]/15 hover:border-[#3894B3] transition-colors shadow-2xs"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-[#7B8B9A]" />
            </a>
          </div>
        </div>

        <div className="md:col-span-5 md:pl-8 flex flex-col justify-between">
          <div className="p-5 rounded-2xl bg-white/70 border border-[#2A2F35]/10">
            <div className="text-xs font-mono font-semibold uppercase text-[#475766] mb-2">
              Architecture Colophon
            </div>
            <p className="text-xs text-[#56616B] leading-relaxed">
              Designed as an organic, static showcase. Powered by <strong>React 19</strong>,{' '}
              <strong>Vite</strong>, <strong>Tailwind CSS</strong>, and <strong>Framer Motion</strong>. Zero
              server overhead, zero database latency, deployed automatically via GitHub Pages.
            </p>
          </div>

          <div className="text-xs font-mono text-[#8C9AA7] mt-6 md:mt-0">
            © {new Date().getFullYear()} {PROFILE_INFO.name}. Built with care and craft.
          </div>
        </div>
      </div>
    </footer>
  );
};
