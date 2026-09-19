import React, { useState } from 'react';
import { Plus, Trash2, Save, CheckCircle2, AlertCircle, GripVertical, Loader2 } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface ExperienceEntry {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

const newEntry = (): ExperienceEntry => ({
  id: crypto.randomUUID(),
  title: '',
  company: '',
  location: '',
  startDate: '',
  endDate: '',
  description: '',
});

type SaveState = 'idle' | 'saving' | 'success' | 'error';

const inputCls =
  'w-full px-3 py-2 rounded-lg text-sm bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-light-ink dark:text-dark-ink placeholder:text-light-ink-subtle dark:placeholder:text-dark-ink-subtle focus:outline-none focus:border-terracotta transition-colors';
const labelCls =
  'block font-sans text-[10px] font-semibold text-light-ink-muted dark:text-dark-ink-muted uppercase tracking-widest mb-1';

export const ExperienceEditor: React.FC = () => {
  const [entries, setEntries] = useState<ExperienceEntry[]>([newEntry()]);
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const updateEntry = (id: string, patch: Partial<ExperienceEntry>) =>
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));

  const handleSave = async () => {
    if (saveState === 'saving') return;
    setSaveState('saving');
    setErrorMsg('');

    try {
      if (!supabase) throw new Error('Supabase not configured');
      const rows = entries.map(({ id: _localId, ...rest }) => ({
        ...rest,
        updated_at: new Date().toISOString(),
      }));
      const { error } = await supabase.from('experience').upsert(rows, { onConflict: 'title,company' });
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
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-light-ink dark:text-dark-ink font-normal">Experience</h2>
          <p className="font-sans text-xs text-light-ink-muted dark:text-dark-ink-muted mt-1">
            Add or remove work experience entries.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setEntries((prev) => [...prev, newEntry()])}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-light-border dark:border-dark-border text-light-ink dark:text-dark-ink hover:border-terracotta hover:text-terracotta font-sans text-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Entry
          </button>

          {/* Save button */}
          <div className="flex flex-col items-end gap-1.5">
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
              {saveState === 'saving' ? 'Saving…' : saveState === 'success' ? 'Saved!' : saveState === 'error' ? 'Retry' : 'Save'}
            </button>
            {saveState === 'error' && (
              <p className="font-sans text-[11px] text-red-400 text-right max-w-xs">{errorMsg || 'Save failed.'}</p>
            )}
          </div>
        </div>
      </div>

      {/* Entry cards */}
      <div className="space-y-5">
        {entries.map((entry, idx) => (
          <div
            key={entry.id}
            className="bg-light-surface-card dark:bg-[#181920] border border-light-border dark:border-[#2D3039] rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-5">
              <GripVertical className="w-4 h-4 text-light-ink-subtle cursor-grab shrink-0" />
              <span className="font-mono text-xs text-terracotta border border-terracotta/30 rounded px-1.5 py-0.5">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <button
                onClick={() => setEntries((prev) => prev.filter((e) => e.id !== entry.id))}
                className="ml-auto p-1.5 rounded text-light-ink-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Job Title</label>
                <input type="text" className={inputCls} value={entry.title} onChange={(e) => updateEntry(entry.id, { title: e.target.value })} placeholder="e.g. Software Engineer" />
              </div>
              <div>
                <label className={labelCls}>Company</label>
                <input type="text" className={inputCls} value={entry.company} onChange={(e) => updateEntry(entry.id, { company: e.target.value })} placeholder="e.g. Acme Corp" />
              </div>
              <div>
                <label className={labelCls}>Location</label>
                <input type="text" className={inputCls} value={entry.location} onChange={(e) => updateEntry(entry.id, { location: e.target.value })} placeholder="e.g. San Francisco, CA" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Start</label>
                  <input type="text" className={inputCls} value={entry.startDate} onChange={(e) => updateEntry(entry.id, { startDate: e.target.value })} placeholder="Jan 2022" />
                </div>
                <div>
                  <label className={labelCls}>End</label>
                  <input type="text" className={inputCls} value={entry.endDate} onChange={(e) => updateEntry(entry.id, { endDate: e.target.value })} placeholder="Present" />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className={labelCls}>Description</label>
              <textarea rows={3} className={`${inputCls} resize-none`} value={entry.description} onChange={(e) => updateEntry(entry.id, { description: e.target.value })} placeholder="Role and impact…" />
            </div>
          </div>
        ))}
      </div>

      {entries.length === 0 && (
        <div className="text-center py-16 text-light-ink-muted font-sans text-sm">
          No entries.{' '}
          <button className="text-terracotta hover:underline" onClick={() => setEntries([newEntry()])}>Add one</button>
        </div>
      )}
    </div>
  );
};
