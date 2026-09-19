import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { supabase, formatErrorMessage } from '../../../lib/supabase';
import { toast } from 'sonner';
import { useSiteData, PhilosophyPillar, DEFAULT_PILLARS } from '../../../context/SiteDataContext';

type SaveState = 'idle' | 'saving' | 'success' | 'error';

const inputCls =
  'w-full px-3 py-2 rounded-lg text-sm bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-light-ink dark:text-dark-ink placeholder:text-light-ink-subtle dark:placeholder:text-dark-ink-subtle focus:outline-none focus:border-terracotta transition-colors';
const labelCls =
  'block font-sans text-[10px] font-semibold text-light-ink-muted dark:text-dark-ink-muted uppercase tracking-widest mb-1';

const blank = (pos: number): PhilosophyPillar => ({
  position: pos,
  kanji: '',
  romaji: '',
  title: '',
  tag: '',
  description: '',
});

export const PhilosophyEditor: React.FC = () => {
  const { pillars: contextPillars, refresh } = useSiteData();
  const [pillars, setPillars] = useState<PhilosophyPillar[]>(DEFAULT_PILLARS);
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (contextPillars && contextPillars.length > 0) {
      setPillars(contextPillars);
      setLoading(false);
    }
  }, [contextPillars]);

  const update = (pos: number, patch: Partial<PhilosophyPillar>) =>
    setPillars((prev) =>
      prev.map((p) => (p.position === pos ? { ...p, ...patch } : p)),
    );

  const addPillar = () => {
    if (pillars.length >= 3) return;
    const nextPos = pillars.length + 1;
    setPillars((prev) => [...prev, blank(nextPos)]);
  };

  const removePillar = (pos: number) => {
    setPillars((prev) =>
      prev
        .filter((p) => p.position !== pos)
        .map((p, idx) => ({ ...p, position: idx + 1 })),
    );
  };

  const handleSave = async () => {
    if (saveState === 'saving') return;
    setSaveState('saving');
    setErrorMsg('');

    try {
      if (!supabase) throw new Error('Supabase not configured');

      // Re-index positions 1, 2, 3
      const rows = pillars.map((p, idx) => ({
        position: idx + 1,
        kanji: p.kanji,
        romaji: p.romaji,
        title: p.title,
        tag: p.tag,
        description: p.description,
        updated_at: new Date().toISOString(),
      }));

      // Delete any existing pillars that are beyond our new length
      await supabase
        .from('philosophy_pillars')
        .delete()
        .gt('position', rows.length);

      if (rows.length > 0) {
        const { error } = await supabase
          .from('philosophy_pillars')
          .upsert(rows, { onConflict: 'position' });
        if (error) throw error;
      }

      await refresh();
      setSaveState('success');
      toast.success('Philosophy pillars updated & synced to homepage!');
      setTimeout(() => setSaveState('idle'), 4000);
    } catch (err: unknown) {
      const msg = formatErrorMessage(err);
      setErrorMsg(msg);
      setSaveState('error');
      toast.error(msg || 'Failed to save philosophy pillars.');
      setTimeout(() => setSaveState('idle'), 6000);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center font-sans text-sm text-light-ink-muted dark:text-dark-ink-muted">
        Loading pillars…
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Row */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-light-ink dark:text-dark-ink font-normal">
            Philosophy Pillars
          </h2>
          <p className="font-sans text-xs text-light-ink-muted dark:text-dark-ink-muted mt-1">
            Up to 3 pillars. Each maps directly to one card in the homepage Architectural Philosophy section.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {pillars.length < 3 && (
            <button
              onClick={addPillar}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-light-border dark:border-dark-border text-light-ink dark:text-dark-ink hover:border-terracotta hover:text-terracotta font-sans text-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Pillar
            </button>
          )}
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
      </div>

      {/* Cards */}
      <div className="space-y-5">
        {pillars.map((pillar, idx) => (
          <div
            key={pillar.position}
            className="bg-light-surface-card dark:bg-[#181920] border border-light-border dark:border-[#2D3039] rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-5">
              <span className="font-mono text-xs text-terracotta border border-terracotta/30 rounded px-1.5 py-0.5">
                PILLAR {String(idx + 1).padStart(2, '0')}
              </span>
              <button
                onClick={() => removePillar(pillar.position)}
                className="p-1.5 rounded text-light-ink-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                title="Delete pillar"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className={labelCls}>Kanji (Japanese Symbol)</label>
                <input
                  type="text"
                  className={inputCls}
                  value={pillar.kanji}
                  onChange={(e) => update(pillar.position, { kanji: e.target.value })}
                  placeholder="e.g. 間"
                />
              </div>
              <div>
                <label className={labelCls}>Romaji</label>
                <input
                  type="text"
                  className={inputCls}
                  value={pillar.romaji}
                  onChange={(e) => update(pillar.position, { romaji: e.target.value })}
                  placeholder="e.g. Ma"
                />
              </div>
              <div>
                <label className={labelCls}>English Title</label>
                <input
                  type="text"
                  className={inputCls}
                  value={pillar.title}
                  onChange={(e) => update(pillar.position, { title: e.target.value })}
                  placeholder="e.g. Intentional Space"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className={labelCls}>Tag Line (Bottom Label)</label>
              <input
                type="text"
                className={inputCls}
                value={pillar.tag}
                onChange={(e) => update(pillar.position, { tag: e.target.value })}
                placeholder="e.g. Uncluttered System Boundaries"
              />
            </div>
            <div>
              <label className={labelCls}>Description</label>
              <textarea
                rows={3}
                className={`${inputCls} resize-none`}
                value={pillar.description}
                onChange={(e) => update(pillar.position, { description: e.target.value })}
                placeholder="Philosophy paragraph explaining this tenet…"
              />
            </div>
          </div>
        ))}
      </div>

      {pillars.length === 0 && (
        <div className="text-center py-16 text-light-ink-muted font-sans text-sm">
          No pillars.{' '}
          <button className="text-terracotta hover:underline" onClick={addPillar}>
            Add one
          </button>
        </div>
      )}
    </div>
  );
};
