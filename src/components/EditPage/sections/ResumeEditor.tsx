import React, { useState, useEffect, useRef } from 'react';
import {
  Upload,
  FileText,
  X,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileCode2,
  Eye,
  EyeOff,
} from 'lucide-react';
import {
  supabase,
  uploadResumePdf,
  fetchResumeLatex,
  saveResumeLatex,
} from '../../../lib/supabase';

type SaveState = 'idle' | 'saving' | 'success' | 'error';
type Tab = 'upload' | 'editor';

const DEFAULT_LATEX_CV = `% ── Vincent Yuan — Curriculum Vitae ──────────────────────────────────
\\documentclass[letterpaper,11pt]{article}
\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\begin{document}

%----------HEADING----------
\\begin{center}
    \\textbf{\\Huge \\scshape Vincent Yuan} \\\\ \\vspace{1pt}
    \\small Distributed Systems $\\cdot$ Generative AI $\\cdot$ Creative Technologist \\\\ \\vspace{1pt}
    \\href{mailto:vincentyuan1020@gmail.com}{\\underline{vincentyuan1020@gmail.com}} $|$ 
    \\href{https://github.com/VincentYuann}{\\underline{github.com/VincentYuann}} $|$
    \\href{https://linkedin.com}{\\underline{linkedin.com}}
\\end{center}

%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubheading
      {University of Waterloo}{Waterloo, ON, Canada}
      {Bachelor of Applied Science in Computer Engineering}{Sept 2020 -- Apr 2025}

%-----------EXPERIENCE-----------
\\section{Experience}
  \\resumeSubheading
      {Full-Stack \\& AI Systems Engineer}{Remote}
      {Sumi Intelligence Studio}{May 2024 -- Present}

%-----------PROJECTS-----------
\\section{Featured Engineering Projects}
  \\resumeProjectHeading
      {\\textbf{Sumi OS \\& Workspace} $|$ \\emph{React, Next.js, Python, Docker, Llama-3, WebSockets}}{}

\\end{document}
`;

export const ResumeEditor: React.FC = () => {
  const [tab, setTab] = useState<Tab>('upload');
  const [latex, setLatex] = useState(DEFAULT_LATEX_CV);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load existing LaTeX source on mount
  useEffect(() => {
    fetchResumeLatex().then((content) => {
      if (content) setLatex(content);
    });
  }, []);

  /* ── File upload handler ── */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ['.pdf', '.tex', '.txt'];
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!allowed.includes(ext)) {
      setErrorMsg('Only .pdf, .tex, or .txt files are accepted.');
      setSaveState('error');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('File must be under 10 MB.');
      setSaveState('error');
      return;
    }

    setUploadedFile(file);
    setErrorMsg('');
    setSaveState('idle');

    // If it's a .tex or .txt, read contents directly into editor
    if (ext === '.tex' || ext === '.txt') {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setLatex(ev.target.result as string);
          setTab('editor');
        }
      };
      reader.readAsText(file);
    }
  };

  /* ── Save to Supabase Storage & Database ── */
  const handleSave = async () => {
    if (saveState === 'saving') return;
    setSaveState('saving');
    setErrorMsg('');

    try {
      if (!supabase) throw new Error('Supabase client is not configured.');

      // 1. If a PDF is uploaded, push it to the S3-backed Supabase Storage bucket
      if (tab === 'upload' && uploadedFile && uploadedFile.name.toLowerCase().endsWith('.pdf')) {
        await uploadResumePdf(uploadedFile);
      }

      // 2. Always persist current LaTeX source to database
      await saveResumeLatex(latex);

      setSaveState('success');
      setTimeout(() => setSaveState('idle'), 4000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMsg(msg);
      setSaveState('error');
      setTimeout(() => setSaveState('idle'), 6000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-light-ink dark:text-dark-ink font-normal">
            Resume / CV
          </h2>
          <p className="font-sans text-xs text-light-ink-muted dark:text-dark-ink-muted mt-1">
            Upload a PDF to store in your Supabase S3 bucket, or write / paste LaTeX directly.
            Uploading a .tex file will populate the editor automatically.
          </p>
        </div>

        {/* Save button */}
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <button
            onClick={handleSave}
            disabled={saveState === 'saving' || saveState === 'success'}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-sans text-xs font-semibold uppercase tracking-widest transition-all ${
              saveState === 'success'
                ? 'bg-bamboo/80 text-white cursor-default'
                : saveState === 'error'
                ? 'bg-red-500 text-white hover:bg-red-600'
                : saveState === 'saving'
                ? 'bg-terracotta/60 text-white cursor-wait'
                : 'bg-terracotta hover:bg-terracotta-hover text-white'
            }`}
          >
            {saveState === 'saving' && <Loader2 className="w-4 h-4 animate-spin" />}
            {saveState === 'success' && <CheckCircle2 className="w-4 h-4" />}
            {saveState === 'error' && <AlertCircle className="w-4 h-4" />}
            {saveState === 'idle' && <Save className="w-4 h-4" />}
            {saveState === 'saving'
              ? 'Saving…'
              : saveState === 'success'
              ? 'Saved!'
              : saveState === 'error'
              ? 'Retry'
              : 'Save'}
          </button>
          {saveState === 'error' && (
            <p className="font-sans text-[11px] text-red-400 text-right max-w-xs">
              {errorMsg || 'Save failed.'}
            </p>
          )}
        </div>
      </div>

      {/* Tab toggles */}
      <div className="flex items-center gap-1 p-1 bg-light-surface dark:bg-dark-surface rounded-xl border border-light-border dark:border-dark-border w-fit">
        <button
          onClick={() => setTab('upload')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-sans text-xs font-medium transition-all ${
            tab === 'upload'
              ? 'bg-light-surface-raised dark:bg-dark-surface-raised text-light-ink dark:text-dark-ink shadow-sm'
              : 'text-light-ink-muted dark:text-dark-ink-muted hover:text-light-ink dark:hover:text-dark-ink'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          Upload PDF / .tex
        </button>
        <button
          onClick={() => setTab('editor')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-sans text-xs font-medium transition-all ${
            tab === 'editor'
              ? 'bg-light-surface-raised dark:bg-dark-surface-raised text-light-ink dark:text-dark-ink shadow-sm'
              : 'text-light-ink-muted dark:text-dark-ink-muted hover:text-light-ink dark:hover:text-dark-ink'
          }`}
        >
          <FileCode2 className="w-3.5 h-3.5" />
          LaTeX Editor
        </button>
      </div>

      {/* Upload panel */}
      {tab === 'upload' && (
        <div className="bg-light-surface-card dark:bg-[#181920] border border-light-border dark:border-[#2D3039] rounded-2xl p-8 shadow-sm">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.tex,.txt"
            onChange={handleFileChange}
            className="hidden"
          />

          {uploadedFile ? (
            <div className="flex items-center gap-4 p-5 rounded-xl bg-light-surface dark:bg-dark-surface border border-bamboo/30">
              <FileText className="w-8 h-8 text-bamboo shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-sans text-sm font-medium text-light-ink dark:text-dark-ink truncate">
                  {uploadedFile.name}
                </p>
                <p className="font-mono text-[11px] text-light-ink-muted dark:text-dark-ink-muted mt-0.5">
                  {(uploadedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                onClick={() => {
                  setUploadedFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="p-1.5 text-light-ink-muted hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex flex-col items-center gap-4 py-14 border-2 border-dashed border-light-border dark:border-dark-border rounded-xl hover:border-terracotta hover:bg-terracotta/5 transition-all group"
            >
              <Upload className="w-10 h-10 text-light-ink-subtle dark:text-dark-ink-subtle group-hover:text-terracotta transition-colors" />
              <div className="text-center">
                <p className="font-sans text-sm text-light-ink dark:text-dark-ink font-medium">
                  Drop your PDF or .tex here
                </p>
                <p className="font-sans text-xs text-light-ink-muted dark:text-dark-ink-muted mt-1">
                  Accepts .pdf, .tex, .txt — max 10 MB (stored in Supabase S3 bucket)
                </p>
              </div>
            </button>
          )}

          <p className="mt-4 font-sans text-xs text-light-ink-muted dark:text-dark-ink-muted">
            Uploading a <code className="font-mono">.tex</code> file will also populate the LaTeX
            editor for direct modification.
          </p>
        </div>
      )}

      {/* LaTeX Editor */}
      {tab === 'editor' && (
        <div className="bg-light-surface-card dark:bg-[#181920] border border-light-border dark:border-[#2D3039] rounded-2xl shadow-sm overflow-hidden">
          {/* Editor toolbar */}
          <div className="flex items-center justify-between px-4 py-2 bg-light-surface dark:bg-[#111218] border-b border-light-border dark:border-dark-border">
            <div className="flex items-center gap-2">
              <FileCode2 className="w-3.5 h-3.5 text-terracotta" />
              <span className="font-mono text-[11px] text-light-ink-muted dark:text-dark-ink-muted">
                resume.tex
              </span>
            </div>
            <button
              onClick={() => setPreviewMode((v) => !v)}
              className="inline-flex items-center gap-1.5 font-sans text-[11px] text-light-ink-muted dark:text-dark-ink-muted hover:text-terracotta transition-colors"
            >
              {previewMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {previewMode ? 'Edit' : 'Preview'}
            </button>
          </div>

          {previewMode ? (
            <pre className="p-6 font-mono text-xs text-light-ink dark:text-dark-ink leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[60vh]">
              {latex}
            </pre>
          ) : (
            <textarea
              value={latex}
              onChange={(e) => setLatex(e.target.value)}
              className="w-full p-5 font-mono text-xs text-light-ink dark:text-dark-ink bg-transparent resize-none focus:outline-none leading-relaxed"
              style={{ minHeight: '60vh' }}
              spellCheck={false}
              placeholder="Paste or write your LaTeX source…"
            />
          )}
        </div>
      )}
    </div>
  );
};
