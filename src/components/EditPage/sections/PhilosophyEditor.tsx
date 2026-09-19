import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface Pillar {
  position: number; // 1, 2, or 3
  kanji: string;
  romaji: string;
  title: string;
  tag: string;
  description: string;
}

const blank = (pos: number): Pillar => ({ position: pos, kanji: '', romaji: '', title: '', tag: '', description: '' });

type SaveState = 'idle' | 'saving' | 'success' | 'error';

const inputCls = 'w-full px-3 py-2 rounded-lg text-sm bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-light-ink dark:text-dark-ink placeholder:text-light-ink-subtle dark:placeholder:text-dark-ink-subtle focus:outline-none focus:border-terracotta transition-colors';
const labelCls = 'block font-sans text-[10px] font-semibold text-light-ink-muted dark:text-dark-ink-muted uppercase tracking-widest mb-1';

export const PhilosophyEditor: React.FC = () => {
  const [pillars, setPillars] = useState<Pillar[]>([blank(1)]);
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    supabase.from('philosophy_pillars').select('*').order('position').limit(3).then(({ data }) => {
      if (data && data.length > 0) {
        setPillars(data.map(row => ({
          position: row.position,
          kanji: row.kanji || '',
          romaji: row.romaji || '',
          title: row.title || '',
          tag: row.tag || '',
          description: row.description || '',
        })));
      }
      setLoading(false);
    });
  }, []);

  const update = (pos: number, patch: Partial<Pillar>) =>
    setPillars(prev => prev.map(p => p.position === pos ? { ...p, ...patch } : p));

  const addPillar = () => {
    if (pillars.length >= 3) return;
    const nextPos = Math.max(0, ...pillars.map(p => p.position)) + 1;
    setPillars(prev => [...prev, blank(nextPos)]);
  };

  const removePillar = (pos: number) =>
    setPillars(prev => prev.filter(p => p.position !== pos));

  const handleSave = async () => {
    if (saveState === 'saving') return;
    setSaveState('saving');
    setErrorMsg('');
    try {
      if (!supabase) throw new Error('Supabase not configured');
      const rows = pillars.map(p => ({ ...p, updated_at: new Date().toISOString() }));
      const { error } = await supabase.from('philosophy_pillars').upsert(rows, { onConflict: 'position' });
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

  if (loading) return <div className="py-20 text-center font-sans text-sm text-light-ink-muted dark:text-dark-ink-muted">Loading pillars…</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-light-ink dark:text-dark-ink font-normal">Philosophy Pillars</h2>
          <p className="font-sans text-xs text-light-ink-muted dark:text-dark-ink-muted mt-1">
            Up to 3 pillars. Each maps to one card on the homepage philosophy section.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {pillars.length < 3 && (
            <button onClick={addPillar} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-light-border dark:border-dark-border text-light-ink dark:text-dark-ink hover:border-terracotta hover:text-terracotta font-sans text-xs transition-colors">
              <Plus className="w-3.5 h-3.5" /> Add Pillar
            </button>
          )}
          <div className="flex flex-col items-end gap-1.5">
            <button
              onClick={handleSave}
              disabled={saveState === 'saving' || saveState === 'success'}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-sans text-xs font-semibold uppercase tracking-widest transition-all ${
                saveState === 'success' ? 'bg-bamboo/80 text-white cursor-default'
                : saveState === 'error' ? 'bg-red-500 text-white hover:bg-red-600'
                : saveState === 'saving' ? 'bg-terracotta/60 text-white cursor-wait'
                : 'bg-terracotta hover:bg-terracotta-hover text-white'
              }`}
            >
              {saveState === 'saving' && <Loader2 className="w-4 h-4 animate-spin" />}
              {saveState === 'success' && <CheckCircle2 className="w-4 h-4" />}
              {saveState === 'error' && <AlertCircle className="w-4 h-4" />}
              {saveState === 'idle' && <Save className="w-4 h-4" />}
              {saveState === 'saving' ? 'Saving…' : saveState === 'success' ? 'Saved!' : saveState === 'error' ? 'Retry' : 'Save'}
            </button>
            {saveState === 'error' && <p className="font-sans text-[11px] text-red-400 text-right max-w-xs">{errorMsg || 'Save failed.'}</p>}
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {pillars.map((pillar, idx) => (
          <div key={pillar.position} className="bg-light-surface-card dark:bg-[#181920] border border-light-border dark:border-[#2D3039] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <span className="font-mono text-xs text-terracotta border border-terracotta/30 rounded px-1.5 py-0.5">PILLAR {String(idx + 1).padStart(2, '0')}</span>
              <button onClick={() => removePillar(pillar.position)} className="p-1.5 rounded text-light-ink-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div><label className={labelCls}>Kanji</label><input type="text" className={inputCls} value={pillar.kanji} onChange={e => update(pillar.position, { kanji: e.target.value })} placeholder="e.g. 間" /></div>
              <div><label className={labelCls}>Romaji</label><input type="text" className={inputCls} value={pillar.romaji} onChange={e => update(pillar.position, { romaji: e.target.value })} placeholder="e.g. Ma" /></div>
              <div><label className={labelCls}>Title</label><input type="text" className={inputCls} value={pillar.title} onChange={e => update(pillar.position, { title: e.target.value })} placeholder="e.g. Intentional Space" /></div>
            </div>
            <div className="mb-4"><label className={labelCls}>Tag Line</label><input type="text" className={inputCls} value={pillar.tag} onChange={e => update(pillar.position, { tag: e.target.value })} placeholder="e.g. Uncluttered System Boundaries" /></div>
            <div><label className={labelCls}>Description</label><textarea rows={3} className={`${inputCls} resize-none`} value={pillar.description} onChange={e => update(pillar.position, { description: e.target.value })} placeholder="Philosophy paragraph…" /></div>
          </div>
        ))}
      </div>

      {pillars.length === 0 && (
        <div className="text-center py-16 text-light-ink-muted font-sans text-sm">
          No pillars. <button className="text-terracotta hover:underline" onClick={addPillar}>Add one</button>
        </div>
      )}
    </div>
  );
};
