import React, { useState, useEffect, useRef } from 'react';
import {
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
  X,
  Github,
  ExternalLink,
  GripVertical,
  Loader2,
} from 'lucide-react';
import { supabase } from '../../../lib/supabase';

/* ─── Types ──────────────────────────────────────────────────────────── */

/**
 * A "section" matches the card in image 2:
 *   heading  →  bold card title  (e.g. "Local Inference Runtime")
 *   bullets  →  the ⊘ bullet lines inside that card
 */
interface ProjectSection {
  id: string;
  heading: string;
  bullets: string[];
}

interface ProjectEntry {
  id: string;
  /** Primary identifier — maps to the DB `title` column (table key) */
  title: string;
  summary: string;
  sections: ProjectSection[];
  techStacks: string[];
  githubLink: string;
  liveLink: string;
}

const newSection = (): ProjectSection => ({
  id: crypto.randomUUID(),
  heading: '',
  bullets: [''],
});

const newProject = (): ProjectEntry => ({
  id: crypto.randomUUID(),
  title: '',
  summary: '',
  sections: [newSection()],
  techStacks: [],
  githubLink: '',
  liveLink: '',
});

type SaveState = 'idle' | 'saving' | 'success' | 'error';

/* ─── Styles ─────────────────────────────────────────────────────────── */
const inputCls =
  'w-full px-3 py-2 rounded-lg text-sm bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-light-ink dark:text-dark-ink placeholder:text-light-ink-subtle dark:placeholder:text-dark-ink-subtle focus:outline-none focus:border-terracotta transition-colors';
const labelCls =
  'block font-sans text-[10px] font-semibold text-light-ink-muted dark:text-dark-ink-muted uppercase tracking-widest mb-1';

/* ─── Tech color map ─────────────────────────────────────────────────── */
const TECH_COLORS: Record<string, string> = {
  'react':       'bg-sky-500/15 border-sky-400/40 text-sky-300',
  'next.js':     'bg-sky-600/15 border-sky-500/40 text-sky-300',
  'vue':         'bg-emerald-500/15 border-emerald-400/40 text-emerald-300',
  'svelte':      'bg-orange-500/15 border-orange-400/40 text-orange-300',
  'angular':     'bg-red-500/15 border-red-400/40 text-red-300',
  'typescript':  'bg-blue-500/15 border-blue-400/40 text-blue-300',
  'javascript':  'bg-yellow-500/15 border-yellow-400/40 text-yellow-300',
  'python':      'bg-blue-400/15 border-blue-300/40 text-blue-200',
  'rust':        'bg-orange-600/15 border-orange-500/40 text-orange-300',
  'go':          'bg-cyan-500/15 border-cyan-400/40 text-cyan-300',
  'java':        'bg-red-600/15 border-red-500/40 text-red-300',
  'c++':         'bg-purple-500/15 border-purple-400/40 text-purple-300',
  'node.js':     'bg-green-500/15 border-green-400/40 text-green-300',
  'postgresql':  'bg-indigo-500/15 border-indigo-400/40 text-indigo-300',
  'mysql':       'bg-blue-600/15 border-blue-500/40 text-blue-200',
  'supabase':    'bg-emerald-600/15 border-emerald-500/40 text-emerald-300',
  'redis':       'bg-red-500/15 border-red-400/40 text-red-300',
  'mongodb':     'bg-green-600/15 border-green-500/40 text-green-300',
  'docker':      'bg-blue-600/15 border-blue-500/40 text-blue-300',
  'kubernetes':  'bg-blue-700/15 border-blue-600/40 text-blue-200',
  'linux':       'bg-yellow-600/15 border-yellow-500/40 text-yellow-300',
  'aws':         'bg-orange-400/15 border-orange-300/40 text-orange-200',
  'gcp':         'bg-blue-500/15 border-blue-400/40 text-blue-200',
  'pytorch':     'bg-orange-500/15 border-orange-400/40 text-orange-300',
  'tensorflow':  'bg-yellow-500/15 border-yellow-400/40 text-yellow-200',
  'llama.cpp':   'bg-purple-500/15 border-purple-400/40 text-purple-300',
  'websockets':  'bg-pink-500/15 border-pink-400/40 text-pink-300',
  'graphql':     'bg-pink-600/15 border-pink-500/40 text-pink-300',
  'tailwind':    'bg-cyan-500/15 border-cyan-400/40 text-cyan-300',
};

function getTagCls(tag: string): string {
  return TECH_COLORS[tag.toLowerCase()] ?? 'bg-terracotta/10 border-terracotta/30 text-terracotta';
}

/* ─── Tech Tag Input ─────────────────────────────────────────────────── */
const TechTagInput: React.FC<{
  tags: string[];
  onChange: (tags: string[]) => void;
}> = ({ tags, onChange }) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const add = () => {
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed)) onChange([...tags, trimmed]);
    setInput('');
    setOpen(false);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { e.preventDefault(); add(); }
    if (e.key === 'Escape') { setOpen(false); setInput(''); }
  };

  const openInput = () => {
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className={labelCls}>Tech Stack</label>
        <button
          type="button"
          onClick={openInput}
          className="inline-flex items-center gap-1 font-sans text-[11px] text-terracotta hover:underline"
        >
          <Plus className="w-3 h-3" />
          Add
        </button>
      </div>

      {/* Inline add row */}
      {open && (
        <div className="flex gap-2 mb-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            onBlur={() => { if (!input.trim()) { setOpen(false); } }}
            className={`${inputCls} flex-1 text-xs`}
            placeholder="Type tech name, press Enter…"
          />
          <button
            type="button"
            onClick={add}
            className="px-3 py-1.5 rounded-lg bg-terracotta/20 border border-terracotta/40 text-terracotta font-sans text-xs hover:bg-terracotta/30 transition-colors"
          >
            Add
          </button>
        </div>
      )}

      {/* Tag pills */}
      <div className="flex flex-wrap gap-1.5 min-h-[22px]">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border font-mono text-[11px] font-medium ${getTagCls(tag)}`}
          >
            {tag}
            <button
              type="button"
              onClick={() => onChange(tags.filter((t) => t !== tag))}
              className="hover:opacity-60 transition-opacity ml-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        {tags.length === 0 && !open && (
          <span className="font-sans text-xs text-light-ink-subtle dark:text-dark-ink-subtle italic">
            No tech stacks yet
          </span>
        )}
      </div>
    </div>
  );
};

/* ─── Section Card editor (heading + bullets) ────────────────────────── */
const SectionCardEditor: React.FC<{
  section: ProjectSection;
  onChange: (patch: Partial<ProjectSection>) => void;
  onRemove: () => void;
}> = ({ section, onChange, onRemove }) => {
  const updateBullet = (idx: number, val: string) => {
    const next = [...section.bullets];
    next[idx] = val;
    onChange({ bullets: next });
  };
  const addBullet = () => onChange({ bullets: [...section.bullets, ''] });
  const removeBullet = (idx: number) =>
    onChange({ bullets: section.bullets.filter((_, i) => i !== idx) });

  return (
    <div className="rounded-xl border border-light-border dark:border-[#2D3039] bg-light-surface dark:bg-[#111218] p-4 space-y-3">
      {/* Card heading row */}
      <div className="flex items-center gap-2">
        <GripVertical className="w-3.5 h-3.5 text-light-ink-subtle dark:text-dark-ink-subtle shrink-0 cursor-grab" />
        <input
          type="text"
          value={section.heading}
          onChange={(e) => onChange({ heading: e.target.value })}
          className={`${inputCls} font-semibold flex-1`}
          placeholder="Section heading (e.g. Local Inference Runtime)"
        />
        <button
          type="button"
          onClick={onRemove}
          className="p-1.5 text-light-ink-muted dark:text-dark-ink-muted hover:text-red-500 transition-colors shrink-0"
          title="Remove section"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bullet lines */}
      <div className="pl-5 space-y-2">
        {section.bullets.map((bullet, idx) => (
          <div key={idx} className="flex items-center gap-2">
            {/* Enso-style bullet marker */}
            <span className="text-terracotta text-sm shrink-0 leading-none">⊘</span>
            <input
              type="text"
              value={bullet}
              onChange={(e) => updateBullet(idx, e.target.value)}
              className={`${inputCls} flex-1`}
              placeholder={`Bullet ${idx + 1}…`}
            />
            <button
              type="button"
              onClick={() => removeBullet(idx)}
              className="p-1 text-light-ink-muted dark:text-dark-ink-muted hover:text-red-500 transition-colors shrink-0"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addBullet}
          className="inline-flex items-center gap-1 font-sans text-[11px] text-terracotta hover:underline"
        >
          <Plus className="w-3 h-3" />
          Add bullet
        </button>
      </div>
    </div>
  );
};

/* ─── Save button helper ─────────────────────────────────────────────── */
const SaveButton: React.FC<{ state: SaveState; errorMsg: string; onClick: () => void }> = ({
  state, errorMsg, onClick,
}) => (
  <div className="flex flex-col items-end gap-1.5 shrink-0">
    <button
      onClick={onClick}
      disabled={state === 'saving' || state === 'success'}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-sans text-xs font-semibold uppercase tracking-widest transition-all ${
        state === 'success'
          ? 'bg-bamboo/80 text-white cursor-default'
          : state === 'error'
          ? 'bg-red-500 text-white hover:bg-red-600'
          : state === 'saving'
          ? 'bg-terracotta/60 text-white cursor-wait'
          : 'bg-terracotta hover:bg-terracotta-hover text-white'
      }`}
    >
      {state === 'saving' && <Loader2 className="w-4 h-4 animate-spin" />}
      {state === 'success' && <CheckCircle2 className="w-4 h-4" />}
      {state === 'error' && <AlertCircle className="w-4 h-4" />}
      {state === 'idle' && <Save className="w-4 h-4" />}
      {state === 'saving' ? 'Saving…' : state === 'success' ? 'Saved!' : state === 'error' ? 'Retry' : 'Save All'}
    </button>
    {state === 'error' && (
      <p className="font-sans text-[11px] text-red-400 text-right max-w-xs">
        {errorMsg || 'Save failed.'}
      </p>
    )}
  </div>
);

/* ─── Main Component ─────────────────────────────────────────────────── */
export const ProjectsEditor: React.FC = () => {
  const [projects, setProjects] = useState<ProjectEntry[]>([newProject()]);
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Load existing projects from Supabase on mount
  useEffect(() => {
    if (!supabase) return;
    supabase.from('projects').select('*').order('created_at').then(({ data }) => {
      if (data && data.length > 0) {
        setProjects(data.map(row => ({
          id: crypto.randomUUID(),
          title: row.title || '',
          summary: row.summary || '',
          sections: Array.isArray(row.sections) ? row.sections : [newSection()],
          techStacks: Array.isArray(row.tech_stacks) ? row.tech_stacks : [],
          githubLink: row.github_link || '',
          liveLink: row.live_link || '',
        })));
      }
    });
  }, []);

  const updateProject = (id: string, patch: Partial<ProjectEntry>) =>
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  const updateSection = (projId: string, secId: string, patch: Partial<ProjectSection>) =>
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projId
          ? {
              ...p,
              sections: p.sections.map((s) => (s.id === secId ? { ...s, ...patch } : s)),
            }
          : p,
      ),
    );

  const addSection = (projId: string) =>
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projId ? { ...p, sections: [...p.sections, newSection()] } : p,
      ),
    );

  const removeSection = (projId: string, secId: string) =>
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projId
          ? { ...p, sections: p.sections.filter((s) => s.id !== secId) }
          : p,
      ),
    );

  const handleSave = async () => {
    if (saveState === 'saving') return;
    setSaveState('saving');
    setErrorMsg('');

    try {
      if (!supabase) throw new Error('Supabase not configured');

      // Map camelCase → snake_case for DB columns
      const rows = projects.map(({ id: _localId, techStacks, githubLink, liveLink, sections, ...rest }) => ({
        ...rest,
        tech_stacks: techStacks,
        github_link: githubLink,
        live_link: liveLink,
        sections, // stored as JSONB
        updated_at: new Date().toISOString(),
      }));

      const { error } = await supabase.from('projects').upsert(rows, { onConflict: 'title' });
      if (error) throw error;

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
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-light-ink dark:text-dark-ink font-normal">Projects</h2>
          <p className="font-sans text-xs text-light-ink-muted dark:text-dark-ink-muted mt-1">
            Each section card = one heading + its bullet list. Title is the table key.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setProjects((prev) => [...prev, newProject()])}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-light-border dark:border-dark-border text-light-ink dark:text-dark-ink hover:border-terracotta hover:text-terracotta font-sans text-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Project
          </button>
          <SaveButton state={saveState} errorMsg={errorMsg} onClick={handleSave} />
        </div>
      </div>

      {/* Project cards */}
      <div className="space-y-8">
        {projects.map((project, idx) => (
          <div
            key={project.id}
            className="bg-light-surface-card dark:bg-[#181920] border border-light-border dark:border-[#2D3039] rounded-2xl p-6 shadow-sm space-y-5"
          >
            {/* Project card header */}
            <div className="flex items-center gap-3">
              <GripVertical className="w-4 h-4 text-light-ink-subtle cursor-grab shrink-0" />
              <span className="font-mono text-xs text-terracotta border border-terracotta/30 rounded px-1.5 py-0.5">
                {String(idx + 1).padStart(2, '0')}
              </span>
              {project.title && (
                <span className="font-sans text-sm text-light-ink dark:text-dark-ink truncate">
                  {project.title}
                </span>
              )}
              <button
                onClick={() => setProjects((prev) => prev.filter((p) => p.id !== project.id))}
                className="ml-auto p-1.5 rounded text-light-ink-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Title */}
            <div>
              <label className={`${labelCls} text-terracotta`}>
                Title{' '}
                <span className="text-light-ink-subtle dark:text-dark-ink-subtle normal-case tracking-normal ml-1 font-normal">
                  (table identifier / unique key)
                </span>
              </label>
              <input
                type="text"
                className={`${inputCls} font-semibold`}
                value={project.title}
                onChange={(e) => updateProject(project.id, { title: e.target.value })}
                placeholder="e.g. distributed-cache-engine"
              />
            </div>

            {/* Summary */}
            <div>
              <label className={labelCls}>Summary</label>
              <textarea
                rows={2}
                className={`${inputCls} resize-none`}
                value={project.summary}
                onChange={(e) => updateProject(project.id, { summary: e.target.value })}
                placeholder="One-to-two sentence project overview…"
              />
            </div>

            {/* Section Cards (heading + bullets) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={labelCls}>Sections (highlight cards)</label>
                <button
                  type="button"
                  onClick={() => addSection(project.id)}
                  className="inline-flex items-center gap-1 font-sans text-[11px] text-terracotta hover:underline"
                >
                  <Plus className="w-3 h-3" />
                  Add section
                </button>
              </div>
              <div className="space-y-3">
                {project.sections.map((sec) => (
                  <SectionCardEditor
                    key={sec.id}
                    section={sec}
                    onChange={(patch) => updateSection(project.id, sec.id, patch)}
                    onRemove={() => removeSection(project.id, sec.id)}
                  />
                ))}
                {project.sections.length === 0 && (
                  <p className="font-sans text-xs text-light-ink-muted dark:text-dark-ink-muted italic">
                    No sections yet.
                  </p>
                )}
              </div>
            </div>

            {/* Tech stack */}
            <TechTagInput
              tags={project.techStacks}
              onChange={(techStacks) => updateProject(project.id, { techStacks })}
            />

            {/* Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Github Link</label>
                <div className="relative">
                  <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-light-ink-subtle pointer-events-none" />
                  <input
                    type="url"
                    className={`${inputCls} pl-8`}
                    value={project.githubLink}
                    onChange={(e) => updateProject(project.id, { githubLink: e.target.value })}
                    placeholder="https://github.com/…"
                  />
                </div>
              </div>
              <div>
                <label className={labelCls}>Live Link</label>
                <div className="relative">
                  <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-light-ink-subtle pointer-events-none" />
                  <input
                    type="url"
                    className={`${inputCls} pl-8`}
                    value={project.liveLink}
                    onChange={(e) => updateProject(project.id, { liveLink: e.target.value })}
                    placeholder="https://your-project.com"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-16 text-light-ink-muted dark:text-dark-ink-muted font-sans text-sm">
          No projects yet.{' '}
          <button className="text-terracotta hover:underline" onClick={() => setProjects([newProject()])}>
            Add one
          </button>
        </div>
      )}
    </div>
  );
};
