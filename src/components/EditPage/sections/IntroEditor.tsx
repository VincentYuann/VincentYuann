import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, AlertCircle, Loader2, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface CapabilityPillar { label: string; items: string; }

interface IntroData {
  name: string;
  headline: string;
  tagline: string;
  email: string;
  github: string;
  linkedin: string;
  role: string;
  capability_pillars: CapabilityPillar[];
}

const DEFAULTS: IntroData = {
  name: 'Vincent Yuan',
  headline: 'Crafting thoughtful digital experiences with algorithmic clarity & Japanese wabi-sabi harmony.',
  tagline: 'Specializing in robust distributed web architecture, local & cloud generative AI systems, and serene user interfaces governed by the timeless cadence of intentional space.',
  email: 'vincentyuan1020@gmail.com',
  github: 'https://github.com/VincentYuann',
  linkedin: 'https://linkedin.com',
  role: 'Software & Generative AI Engineer',
  capability_pillars: [
    { label: 'SYSTEMS', items: 'Rust · Docker · Linux' },
    { label: 'AI & RUNTIME', items: 'PyTorch · llama.cpp · Local LLMs' },
    { label: 'FULL-STACK', items: 'Next.js · TypeScript · PostgreSQL' },
  ],
};

type SaveState = 'idle' | 'saving' | 'success' | 'error';

const inputCls = 'w-full px-3 py-2 rounded-lg text-sm bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-light-ink dark:text-dark-ink placeholder:text-light-ink-subtle dark:placeholder:text-dark-ink-subtle focus:outline-none focus:border-terracotta transition-colors';
const labelCls = 'block font-sans text-xs font-semibold text-light-ink dark:text-dark-ink uppercase tracking-widest mb-1.5';

export const IntroEditor: React.FC = () => {
  const [data, setData] = useState<IntroData>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    supabase.from('profile').select('*').eq('id', 1).single().then(({ data: row }) => {
      if (row) {
        setData({
          name: row.name || DEFAULTS.name,
          headline: row.headline || DEFAULTS.headline,
          tagline: row.tagline || DEFAULTS.tagline,
          email: row.email || DEFAULTS.email,
          github: row.github || DEFAULTS.github,
          linkedin: row.linkedin || DEFAULTS.linkedin,
          role: row.role || DEFAULTS.role,
          capability_pillars: Array.isArray(row.capability_pillars) ? row.capability_pillars : DEFAULTS.capability_pillars,
        });
      }
      setLoading(false);
    });
  }, []);

  const set = <K extends keyof IntroData>(key: K, val: IntroData[K]) =>
    setData(prev => ({ ...prev, [key]: val }));

  const updatePillar = (idx: number, patch: Partial<CapabilityPillar>) =>
    setData(prev => ({ ...prev, capability_pillars: prev.capability_pillars.map((p, i) => i === idx ? { ...p, ...patch } : p) }));

  const addPillar = () => {
    if (data.capability_pillars.length >= 3) return;
    setData(prev => ({ ...prev, capability_pillars: [...prev.capability_pillars, { label: '', items: '' }] }));
  };

  const removePillar = (idx: number) =>
    setData(prev => ({ ...prev, capability_pillars: prev.capability_pillars.filter((_, i) => i !== idx) }));

  const handleSave = async () => {
    if (saveState === 'saving') return;
    setSaveState('saving');
    setErrorMsg('');
    try {
      if (!supabase) throw new Error('Supabase not configured');
      const { error } = await supabase.from('profile').upsert({ id: 1, ...data, updated_at: new Date().toISOString() });
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

  if (loading) return <div className="py-20 text-center font-sans text-sm text-light-ink-muted dark:text-dark-ink-muted">Loading profile…</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-light-ink dark:text-dark-ink font-normal">Intro &amp; Profile</h2>
          <p className="font-sans text-xs text-light-ink-muted dark:text-dark-ink-muted mt-1">Edits the hero section, seal card, and contact links on the homepage.</p>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
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
          {saveState === 'error' && <p className="font-sans text-[11px] text-red-400 max-w-xs text-right">{errorMsg || 'Save failed.'}</p>}
        </div>
      </div>

      <div className="bg-light-surface-card dark:bg-[#181920] border border-light-border dark:border-[#2D3039] rounded-2xl p-8 space-y-6 shadow-sm">
        {/* Identity */}
        <div>
          <p className="font-sans text-[10px] font-semibold text-terracotta uppercase tracking-widest mb-3">Identity &amp; Seal Card</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div><label className={labelCls}>Display Name</label><input type="text" className={inputCls} value={data.name} onChange={e => set('name', e.target.value)} placeholder="Your full name" /></div>
            <div><label className={labelCls}>Role / Subtitle</label><input type="text" className={inputCls} value={data.role} onChange={e => set('role', e.target.value)} placeholder="e.g. Software & Generative AI Engineer" /></div>
          </div>
        </div>

        {/* Hero Text */}
        <div>
          <p className="font-sans text-[10px] font-semibold text-terracotta uppercase tracking-widest mb-3">Hero Section Text</p>
          <div className="space-y-4">
            <div><label className={labelCls}>Headline (H1)</label><textarea rows={2} className={`${inputCls} resize-none`} value={data.headline} onChange={e => set('headline', e.target.value)} placeholder="Main hero heading…" /></div>
            <div><label className={labelCls}>Body Paragraph</label><textarea rows={3} className={`${inputCls} resize-none`} value={data.tagline} onChange={e => set('tagline', e.target.value)} placeholder="Narrative paragraph below headline…" /></div>
          </div>
        </div>

        {/* Contact Links */}
        <div>
          <p className="font-sans text-[10px] font-semibold text-terracotta uppercase tracking-widest mb-3">Contact Links</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div><label className={labelCls}>Email</label><input type="email" className={inputCls} value={data.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" /></div>
            <div><label className={labelCls}>Github URL</label><input type="url" className={inputCls} value={data.github} onChange={e => set('github', e.target.value)} placeholder="https://github.com/…" /></div>
            <div><label className={labelCls}>Linkedin URL</label><input type="url" className={inputCls} value={data.linkedin} onChange={e => set('linkedin', e.target.value)} placeholder="https://linkedin.com/in/…" /></div>
          </div>
        </div>

        {/* Capability Pillars */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="font-sans text-[10px] font-semibold text-terracotta uppercase tracking-widest">Capability Pillars (max 3)</p>
            {data.capability_pillars.length < 3 && (
              <button onClick={addPillar} className="inline-flex items-center gap-1 font-sans text-[11px] text-terracotta hover:underline"><Plus className="w-3 h-3" /> Add</button>
            )}
          </div>
          <div className="space-y-3">
            {data.capability_pillars.map((p, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input type="text" className={`${inputCls} w-32 shrink-0`} value={p.label} onChange={e => updatePillar(idx, { label: e.target.value })} placeholder="LABEL" />
                <input type="text" className={`${inputCls} flex-1`} value={p.items} onChange={e => updatePillar(idx, { items: e.target.value })} placeholder="Tech · Stack · Items" />
                <button onClick={() => removePillar(idx)} className="p-1.5 text-light-ink-muted hover:text-red-500 shrink-0 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
