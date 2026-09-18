import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import type { ProfileData } from '../lib/useProfile';
import { tokenizeLatexLine, getTokenClass } from '../lib/latex/highlight';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/useAuth';
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
  Sparkles,
  Upload,
} from 'lucide-react';

interface ResumePageProps {
  profile: ProfileData;
  onOpenCommand: () => void;
}

export const ResumePage: React.FC<ResumePageProps> = ({ profile, onOpenCommand }) => {
  const [activeTab, setActiveTab] = useState<'rendered' | 'source'>('rendered');
  const { isAdmin } = useAuth();
  const [latexSource, setLatexSource] = useState<string>('');
  const [isLoadingLatex, setIsLoadingLatex] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [pdfUrl, setPdfUrl] = useState<string>(`${import.meta.env.BASE_URL}resumes/resume.pdf`);

  useEffect(() => {
    let isMounted = true;

    // Check if a remote resume.pdf exists in Supabase Storage
    const checkStoragePdf = async () => {
      try {
        const { data } = supabase.storage.from('portfolio-assets').getPublicUrl('resumes/resume.pdf');
        if (data?.publicUrl) {
          const res = await fetch(data.publicUrl, { method: 'HEAD' });
          if (res.ok && isMounted) {
            setPdfUrl(data.publicUrl);
          }
        }
      } catch {
        // use local fallback
      }
    };

    checkStoragePdf();

    // Check if remote resume.tex exists in Supabase Storage, otherwise fetch local
    const fetchTex = async () => {
      try {
        const { data } = supabase.storage.from('portfolio-assets').getPublicUrl('resumes/resume.tex');
        if (data?.publicUrl) {
          const res = await fetch(data.publicUrl);
          if (res.ok) {
            const text = await res.text();
            if (isMounted) {
              setLatexSource(text);
              setIsLoadingLatex(false);
              return;
            }
          }
        }
      } catch {
        // fallback to local
      }

      // Local fallback
      try {
        const localRes = await fetch(`${import.meta.env.BASE_URL}resumes/resume.tex`);
        if (localRes.ok) {
          const text = await localRes.text();
          if (isMounted) {
            setLatexSource(text);
            setIsLoadingLatex(false);
            return;
          }
        }
      } catch (err) {
        console.error('Error fetching resume.tex:', err);
      }

      if (isMounted) {
        setLatexSource('% Error loading resume.tex source code.');
        setIsLoadingLatex(false);
      }
    };

    fetchTex();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCopySource = async () => {
    if (!latexSource) return;
    try {
      await navigator.clipboard.writeText(latexSource);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy source:', err);
    }
  };

  const handleDownloadTex = () => {
    const element = document.createElement('a');
    const file = new Blob([latexSource], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'Vincent_Yuan_Resume.tex';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const lines = latexSource.split('\n');

  return (
    <div className="min-h-screen bg-[#F6F8FA] text-[#1B2127] flex flex-col font-sans selection:bg-[#3894B3]/20">
      <Navbar onOpenCommand={onOpenCommand} profile={profile} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Title Section */}
        <div className="flex flex-col gap-4 pb-6 border-b border-[#D0D7DE]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#3894B3] uppercase tracking-wider mb-2">
              <FileCode className="w-4 h-4" />
              <span>Curriculum Vitae & Technical Credentials</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1B2127] tracking-tight">
              Resume & LaTeX Source
            </h1>
            <p className="mt-2 text-sm text-[#57606A] max-w-2xl">
              Engineered with clean typography in LaTeX, published as high-definition PDF and compiled for review. Explore the compiled document or inspect the underlying LaTeX source code.
            </p>
          </div>

          {/* Action Buttons Aligned to Left */}
          <div className="flex items-center gap-2.5 flex-wrap pt-1">
            <a
              href={pdfUrl}
              download="Vincent_Yuan_Resume.pdf"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#1B2127] hover:bg-[#3894B3] text-white text-xs font-medium transition-all shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
            <button
              onClick={handleDownloadTex}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#D0D7DE] text-[#24292F] hover:bg-[#F6F8FA] text-xs font-medium transition-all shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-[#57606A]" />
              <span>Download .tex</span>
            </button>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-[#D0D7DE] text-[#57606A] hover:text-[#1B2127] hover:bg-[#F6F8FA] text-xs font-medium transition-all shadow-xs"
              title="Open PDF in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in new tab</span>
            </a>

            {/* Admin Upload / Manage Resume Shortcut */}
            {isAdmin && (
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#EBF6F9] border border-[#3894B3]/40 text-[#2B6D83] hover:bg-[#3894B3] hover:text-white text-xs font-bold transition-all shadow-xs"
                title="Manage & Upload Resume in Admin CMS"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload New Resume</span>
              </Link>
            )}
          </div>
        </div>

        {/* Viewer Controls Card */}
        <div className="mt-6 bg-white border border-[#D0D7DE] rounded-xl shadow-xs overflow-hidden">
          {/* Bar with Mode Toggle and Actions */}
          <div className="px-4 py-3 border-b border-[#D0D7DE] bg-[#F6F8FA] flex items-center justify-between flex-wrap gap-3">
            {/* View Mode Switcher */}
            <div className="inline-flex p-1 bg-[#EAEFF4] rounded-lg border border-[#D0D7DE]">
              <button
                onClick={() => setActiveTab('rendered')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeTab === 'rendered'
                    ? 'bg-white text-[#1B2127] shadow-xs'
                    : 'text-[#57606A] hover:text-[#1B2127]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Rendered (PDF)</span>
              </button>
              <button
                onClick={() => setActiveTab('source')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeTab === 'source'
                    ? 'bg-white text-[#1B2127] shadow-xs'
                    : 'text-[#57606A] hover:text-[#1B2127]'
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
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-[#D0D7DE] text-[#24292F] hover:bg-[#F6F8FA] font-medium transition-all"
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
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-[#D0D7DE] text-[#24292F] hover:bg-[#F6F8FA] font-medium transition-all"
                  title="Expand Fullscreen"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#57606A]" />
                  <span>Fullscreen</span>
                </button>
              )}
            </div>
          </div>

          {/* View Container with Responsive Height */}
          <div className="relative min-h-[550px] sm:min-h-[780px] bg-white">
            {activeTab === 'rendered' ? (
              <div className="w-full h-[650px] sm:h-[850px] bg-[#525659]/5 flex items-center justify-center p-2 sm:p-4">
                <object
                  data={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                  type="application/pdf"
                  className="w-full h-full rounded-lg shadow-md border border-[#D0D7DE]"
                >
                  {/* Fallback iframe/content if browser plugin is disabled */}
                  <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white rounded-xl border border-[#D0D7DE] max-w-md mx-auto my-12">
                    <FileText className="w-12 h-12 text-[#8C959F] mb-4" />
                    <h3 className="text-base font-semibold text-[#1B2127] mb-2">
                      PDF preview unavailable in browser
                    </h3>
                    <p className="text-xs text-[#57606A] mb-4">
                      Your browser does not support inline PDF rendering. You can view it directly or download the file.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-[#1B2127] hover:bg-[#3894B3] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
                      >
                        Open PDF in New Window
                      </a>
                      <a
                        href={pdfUrl}
                        download
                        className="px-4 py-2 bg-white border border-[#D0D7DE] text-[#24292F] hover:bg-[#F6F8FA] text-xs font-semibold rounded-lg transition-colors"
                      >
                        Download PDF
                      </a>
                    </div>
                  </div>
                </object>
              </div>
            ) : (
              /* LaTeX Source Code Display with Capped Responsive Height & Internal Scrolling */
              <div className="h-[650px] sm:h-[850px] max-h-[850px] overflow-y-auto overflow-x-auto text-xs font-mono bg-white select-text">
                {isLoadingLatex ? (
                  <div className="p-12 text-center text-[#57606A]">Loading LaTeX source code...</div>
                ) : (
                  <table className="w-full border-collapse">
                    <tbody>
                      {lines.map((line, idx) => {
                        const lineTokens = tokenizeLatexLine(line);
                        return (
                          <tr key={idx} className="hover:bg-[#F6F8FA]/80 group transition-colors">
                            {/* Line Number with Sticky Left Alignment */}
                            <td className="w-12 py-1 px-3 text-right select-none text-[#8C959F] bg-[#F6F8FA] border-r border-[#E1E6EB] text-[11px] sticky left-0 font-mono">
                              {idx + 1}
                            </td>
                            {/* Tokenized Content */}
                            <td className="py-1 px-4 whitespace-pre font-mono leading-relaxed">
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

        {/* Architecture Note footer callout */}
        <div className="mt-8 bg-white border border-[#D0D7DE] rounded-xl p-5 flex items-start gap-4 shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-[#EBF6F9] border border-[#3894B3]/20 flex items-center justify-center text-[#3894B3] shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <h4 className="font-bold text-[#1B2127] text-sm mb-1 flex items-center gap-2">
              <span>Dual-Mode Architecture</span>
              <span className="px-2 py-0.5 rounded-full bg-[#F6F8FA] text-[#57606A] border border-[#D0D7DE] font-mono text-[10px]">
                resume.tex &bull; resume.pdf
              </span>
            </h4>
            <p className="text-[#57606A] leading-relaxed">
              This viewer mirrors Mohamed's architecture: the PDF is served directly with high-performance vector rendering, while the LaTeX source is parsed into an AST/lexical stream in real time with line-by-line syntax tokenization.
            </p>
          </div>
        </div>
      </main>

      {/* Fullscreen PDF Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex flex-col">
          <div className="flex items-center justify-between px-6 py-3 bg-[#1B2127] text-white">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#3894B3]" />
              <span className="text-sm font-semibold">Vincent Yuan — Resume (Fullscreen View)</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={pdfUrl}
                download="Vincent_Yuan_Resume.pdf"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-xs font-medium transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
                title="Close Fullscreen"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
          <div className="flex-1 p-2 sm:p-6 flex items-center justify-center">
            <object
              data={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
              type="application/pdf"
              className="w-full h-full max-w-5xl rounded-lg shadow-2xl bg-white"
            >
              <div className="text-white text-center p-8">
                PDF preview not supported in modal. Please download the file or open in a new tab.
              </div>
            </object>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};