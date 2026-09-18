import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import type { ProfileData } from '../lib/useProfile';
import { tokenizeLatexLine, getTokenClass } from '../lib/latex/highlight';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/useAuth';
import '../styles/resume-page.css';
import {
  FileText,
  Code2,
  Download,
  ExternalLink,
  Copy,
  Check,
  Maximize2,
  X,
  FileCode,
  Upload,
} from 'lucide-react';

interface ResumePageProps {
  profile: ProfileData;
  onOpenCommand: () => void;
  onOpenProfile?: () => void;
}

const SUPABASE_PDF_URL = supabase.storage.from('portfolio-assets').getPublicUrl('resumes/resume.pdf').data.publicUrl;
const SUPABASE_TEX_URL = supabase.storage.from('portfolio-assets').getPublicUrl('resumes/resume.tex').data.publicUrl;

export const ResumePage: React.FC<ResumePageProps> = ({ profile, onOpenCommand, onOpenProfile }) => {
  const [activeTab, setActiveTab] = useState<'rendered' | 'source'>('rendered');
  const { isAdmin } = useAuth();
  const [latexSource, setLatexSource] = useState<string>('');
  const [isLoadingLatex, setIsLoadingLatex] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [pdfUrl] = useState<string>(SUPABASE_PDF_URL);
  const [isPdfLoading, setIsPdfLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsPdfLoading(true);
    // Safety timeout to ensure skeleton doesn't get stuck if browser plugin doesn't fire onLoad
    const timer = setTimeout(() => {
      setIsPdfLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [pdfUrl]);

  useEffect(() => {
    let isMounted = true;

    // Fetch remote resume.tex directly from Supabase Storage
    const fetchTex = async () => {
      try {
        const res = await fetch(SUPABASE_TEX_URL);
        if (res.ok) {
          const text = await res.text();
          if (isMounted) {
            setLatexSource(text);
            setIsLoadingLatex(false);
            return;
          }
        }
      } catch (err) {
        console.error('Error fetching resume.tex from Supabase Storage:', err);
      }

      if (isMounted) {
        setLatexSource('% Error loading resume.tex source code from Supabase Storage.');
        setIsLoadingLatex(false);
      }
    };

    fetchTex();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCopySource = async () => {
    try {
      await navigator.clipboard.writeText(latexSource);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy LaTeX code:', err);
    }
  };

  const handleDownloadTex = () => {
    const blob = new Blob([latexSource], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume.tex';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const lines = latexSource.split('\n');

  return (
    <div className="resume-page-container">
      <Navbar onOpenCommand={onOpenCommand} onOpenProfile={onOpenProfile} profile={profile} />

      <main className="resume-main-content">
        {/* Header Title Section */}
        <div className="resume-header-card">
          <div>
            <div className="resume-badge">
              <FileCode className="w-4 h-4" />
              <span>Curriculum Vitae & Technical Credentials</span>
            </div>
            <h1 className="resume-title">
              Resume & LaTeX Source
            </h1>
            <p className="resume-description">
              Engineered with clean typography in LaTeX, published as high-definition PDF and compiled for review. Explore the compiled document or inspect the underlying LaTeX source code.
            </p>
          </div>

          {/* Action Buttons Aligned to Left with Clear Visual Hierarchy */}
          <div className="resume-actions-toolbar">
            {/* Primary Hero CTA */}
            <a
              href={pdfUrl}
              download="Vincent_Yuan_Resume.pdf"
              className="resume-primary-btn"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            {/* Secondary Actions */}
            <button
              onClick={handleDownloadTex}
              className="resume-secondary-btn"
            >
              <Download className="w-3.5 h-3.5 text-[#57606A]" />
              <span>Download .tex</span>
            </button>

            {/* Copy LaTeX Action (Prominent when in source mode) */}
            {activeTab === 'source' && (
              <button
                onClick={handleCopySource}
                className="resume-copy-btn"
                title="Copy entire LaTeX source code to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#57606A]" />
                    <span>Copy LaTeX</span>
                  </>
                )}
              </button>
            )}

            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="resume-secondary-btn"
              title="Open PDF in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#57606A]" />
              <span>Open in new tab</span>
            </a>

            {/* Admin Upload / Manage Resume Shortcut */}
            {isAdmin && (
              <div className="resume-admin-cluster">
                <Link
                  to="/admin"
                  className="resume-admin-link"
                  title="Manage & Upload Resume in Admin CMS"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Admin: Upload</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Viewer Controls Card */}
        <div className="resume-viewer-card">
          {/* Bar with Mode Toggle and Actions */}
          <div className="resume-viewer-bar">
            {/* View Mode Switcher */}
            <div className="resume-tab-group">
              <button
                onClick={() => setActiveTab('rendered')}
                className={`resume-tab-btn ${
                  activeTab === 'rendered'
                    ? 'resume-tab-btn-active'
                    : 'resume-tab-btn-inactive'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Rendered (PDF)</span>
              </button>
              <button
                onClick={() => setActiveTab('source')}
                className={`resume-tab-btn ${
                  activeTab === 'source'
                    ? 'resume-tab-btn-active'
                    : 'resume-tab-btn-inactive'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>LaTeX Source (.tex)</span>
              </button>
            </div>

            {/* View-Specific Actions */}
            <div className="flex items-center gap-2 text-xs">
              {activeTab === 'source' ? (
                <button
                  onClick={handleCopySource}
                  className="resume-viewer-action-btn"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#57606A]" />
                      <span>Copy LaTeX</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="resume-viewer-action-btn"
                  title="Expand Fullscreen"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#57606A]" />
                  <span>Fullscreen</span>
                </button>
              )}
            </div>
          </div>

          {/* View Container with Responsive Height */}
          <div className="resume-view-container">
            {activeTab === 'rendered' ? (
              <div className="resume-pdf-wrapper">
                {/* PDF Loading Skeleton Placeholder */}
                {isPdfLoading && (
                  <div className="resume-pdf-skeleton">
                    <div className="resume-skeleton-inner">
                      {/* Name & Subtitle Skeleton */}
                      <div className="resume-skeleton-header">
                        <div className="h-6 w-52 bg-[#E1E6EB] rounded-md" />
                        <div className="h-3 w-64 resume-skeleton-bar" />
                        <div className="h-2.5 w-44 resume-skeleton-bar" />
                      </div>
                      {/* Section 1 Skeleton */}
                      <div className="resume-skeleton-section">
                        <div className="h-4 w-32 resume-skeleton-title" />
                        <div className="h-3 w-full resume-skeleton-bar" />
                        <div className="h-3 w-11/12 resume-skeleton-bar" />
                        <div className="h-3 w-4/5 resume-skeleton-bar" />
                      </div>
                      {/* Section 2 Skeleton */}
                      <div className="resume-skeleton-section-spaced">
                        <div className="h-4 w-28 resume-skeleton-title" />
                        <div className="h-3 w-full resume-skeleton-bar" />
                        <div className="h-3 w-5/6 resume-skeleton-bar" />
                        <div className="h-3 w-3/4 resume-skeleton-bar" />
                      </div>
                      {/* Section 3 Skeleton */}
                      <div className="resume-skeleton-section-spaced">
                        <div className="h-4 w-36 resume-skeleton-title" />
                        <div className="h-3 w-full resume-skeleton-bar" />
                        <div className="h-3 w-4/5 resume-skeleton-bar" />
                      </div>
                    </div>
                    <div className="resume-skeleton-footer-note">
                      Rendering vector PDF stream...
                    </div>
                  </div>
                )}

                <object
                  data={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                  type="application/pdf"
                  className="resume-pdf-object"
                  onLoad={() => setIsPdfLoading(false)}
                />
              </div>
            ) : (
              /* LaTeX Source Code Display with Capped Responsive Height & Internal Scrolling */
              <div className="resume-latex-container">
                {isLoadingLatex ? (
                  <div className="p-12 text-center text-[#57606A]">Loading LaTeX source code...</div>
                ) : (
                  <table className="resume-latex-table">
                    <tbody>
                      {lines.map((line, idx) => {
                        const lineTokens = tokenizeLatexLine(line);
                        return (
                          <tr key={idx} className="resume-latex-row">
                            {/* Line Number with Sticky Left Alignment & Crisp Border */}
                            <td className="resume-latex-num-cell">
                              {idx + 1}
                            </td>
                            {/* Tokenized Content */}
                            <td className="resume-latex-code-cell">
                              {lineTokens.length === 0 ? (
                                <span>&nbsp;</span>
                              ) : (
                                lineTokens.map((token, tIdx) => (
                                  <span key={tIdx} className={getTokenClass(token.type)}>
                                    {token.text}
                                  </span>
                                ))
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>


      </main>

      {/* Fullscreen PDF Modal */}
      {isFullscreen && (
        <div className="resume-fullscreen-modal">
          <div className="resume-fullscreen-header">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#3894B3]" />
              <span className="text-sm font-semibold">Vincent Yuan — Resume (Fullscreen View)</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={pdfUrl}
                download="Vincent_Yuan_Resume.pdf"
                className="resume-viewer-action-btn bg-white/10 hover:bg-white/20 text-white border-transparent"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-1.5 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
                title="Close Fullscreen"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
          <div className="resume-fullscreen-body">
            <object
              data={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
              type="application/pdf"
              className="resume-fullscreen-object"
            />
          </div>
        </div>
      )}

      <Footer profile={profile} />
    </div>
  );
};