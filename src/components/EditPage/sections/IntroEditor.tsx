import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, AlertCircle, Loader2, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { useSiteData, CapabilityPillar, DEFAULT_PROFILE } from '../../../context/SiteDataContext';

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

type SaveState = 'idle' | 'saving' | 'success' | 'error';

const inputCls =
  'w-full px-3 py-2 rounded-lg text-sm bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-light-ink dark:text-dark-ink placeholder:text-light-ink-subtle dark:placeholder:text-dark-ink-subtle focus:outline-none focus:border-terracotta transition-colors';
const labelCls =
  'block font-sans text-xs font-semibold text-light-ink dark:text-dark-ink uppercase tracking-widest mb-1.5';

export const IntroEditor: React.FC = () => {
  const { profile, refresh } = useSiteData();
  const [data, setData] = useState<IntroData>(DEFAULT_PROFILE);
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (profile) {
      setData({
        name: profile.name || DEFAULT_PROFILE.name,
        headline: profile.headline || DEFAULT_PROFILE.headline,
        tagline: profile.tagline || DEFAULT_PROFILE.tagline,
        email: profile.email || DEFAULT_PROFILE.email,
        github: profile.github || DEFAULT_PROFILE.github,
        linkedin: profile.linkedin || DEFAULT_PROFILE.linkedin,
        role: profile.role || DEFAULT_PROFILE.role,
        capability_pillars:
          Array.isArray(profile.capability_pillars) && profile.capability_pillars.length > 0
            ? profile.capability_pillars
            : DEFAULT_PROFILE.capability_pillars,
      });
      setLoading(false);
    }
  }, [profile]);

  const set = <K extends keyof IntroData>(key: K, val: IntroData[K]) =>
    setData((prev) => ({ ...prev, [key]: val }));

  const updatePillar = (idx: number, patch: Partial<CapabilityPillar>) =>
    setData((prev) => ({
      ...prev,
      capability_pillars: prev.capability_pillars.map((p, i) =>
        i === idx ? { ...p, ...patch } : p,
      ),
    }));

  const addPillar = () => {
    if (data.capability_pillars.length >= 3) return;
    setData((prev) => ({
      ...prev,
      capability_pillars: [...prev.capability_pillars, { label: '', items: '' }],
    }));
  };

  const removePillar = (idx: number) =>
    setData((prev) => ({
      ...prev,
      capability_pillars: prev.capability_pillars.filter((_, i) => i !== idx),
    }));

  const handleSave = async () => {
    if (saveState === 'saving') return;
    setSaveState('saving');
    setErrorMsg('');

    try {
      if (!supabase) throw new Error('Supabase not configured');
      const { error } = await supabase
        .from('profile')
        .upsert({ id: 1, ...data, updated_at: new Date().toISOString() });

      if (error) throw error;

      await refresh();
      setSaveState('success');
      setTimeout(() => setSaveState('idle'), 4000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMsg(msg);
      setSaveState('error');
      setTimeout(() => setSaveState('idle'), 6000);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center font-sans text-sm text-light-ink-muted dark:text-dark-ink-muted">
        Loading profile…
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Row */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-light-ink dark:text-dark-ink font-normal">
            Intro &amp; Profile
          </h2>
          <p className="font-sans text-xs text-light-ink-muted dark:text-dark-ink-muted mt-1">
            Edits the hero section, seal card, and contact links on the homepage.
          </p>
        </div>

        {/* Save Button */}
        <div className="flex flex-col items-end gap-2 shrink-0">
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
            <p className="font-sans text-[11px] text-red-400 max-w-xs text-right">
              {errorMsg || 'Save failed.'}
            </p>
          )}
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-light-surface-card dark:bg-[#181920] border border-light-border dark:border-[#2D3039] rounded-2xl p-8 space-y-6 shadow-sm">
        {/* Identity */}
        <div>
          <p className="font-sans text-[10px] font-semibold text-terracotta uppercase tracking-widest mb-3">
            Identity &amp; Seal Card
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>Display Name</label>
              <input
                type="text"
                className={inputCls}
                value={data.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className={labelCls}>Role / Subtitle</label>
              <input
                type="text"
                className={inputCls}
                value={data.role}
                onChange={(e) => set('role', e.target.value)}
                placeholder="e.g. Software & Generative AI Engineer"
              />
            </div>
          </div>
        </div>

        {/* Hero Text */}
        <div>
          <p className="font-sans text-[10px] font-semibold text-terracotta uppercase tracking-widest mb-3">
            Hero Section Text
          </p>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Headline (H1)</label>
              <textarea
                rows={2}
                className={`${inputCls} resize-none`}
                value={data.headline}
                onChange={(e) => set('headline', e.target.value)}
                placeholder="Main hero heading…"
              />
            </div>
            <div>
              <label className={labelCls}>Body Paragraph</label>
              <textarea
                rows={3}
                className={`${inputCls} resize-none`}
                value={data.tagline}
                onChange={(e) => set('tagline', e.target.value)}
                placeholder="Narrative paragraph below headline…"
              />
            </div>
          </div>
        </div>

        {/* Contact Links */}
        <div>
          <p className="font-sans text-[10px] font-semibold text-terracotta uppercase tracking-widest mb-3">
            Contact Links
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className={labelCls}>Email</label>
              <input
                type="email"
                className={inputCls}
                value={data.email}
                onChange={(e) => set('email', e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className={labelCls}>Github URL</label>
              <input
                type="url"
                className={inputCls}
                value={data.github}
                onChange={(e) => set('github', e.target.value)}
                placeholder="https://github.com/…"
              />
            </div>
            <div>
              <label className={labelCls}>Linkedin URL</label>
              <input
                type="url"
                className={inputCls}
                value={data.linkedin}
                onChange={(e) => set('linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/…"
              />
            </div>
          </div>
        </div>

        {/* Capability Pillars */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-sans text-[10px] font-semibold text-terracotta uppercase tracking-widest">
                Capability Pillars (max 3)
              </p>
              <p className="font-sans text-[11px] text-light-ink-muted dark:text-dark-ink-muted">
                These appear as the DOMAINS ribbon in your Hero section.
              </p>
            </div>
            {data.capability_pillars.length < 3 && (
              <button
                type="button"
                onClick={addPillar}
                className="inline-flex items-center gap-1 font-sans text-[11px] text-terracotta hover:underline"
              >
                <Plus className="w-3 h-3" /> Add Pillar
              </button>
            )}
          </div>

          <div className="space-y-3">
            {data.capability_pillars.map((p, idx) => (
              <div key={idx} className="flex items-center gap-3 w-full">
                {/* Pillar Label Input */}
                <input
                  type="text"
                  className="w-40 shrink-0 px-3 py-2 rounded-lg text-sm bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-light-ink dark:text-dark-ink placeholder:text-light-ink-subtle dark:placeholder:text-dark-ink-subtle focus:outline-none focus:border-terracotta transition-colors font-mono uppercase text-xs"
                  value={p.label}
                  onChange={(e) => updatePillar(idx, { label: e.target.value })}
                  placeholder="LABEL (e.g. SYSTEMS)"
                />

                {/* Pillar Items Input */}
                <input
                  type="text"
                  className="flex-1 min-w-0 px-3 py-2 rounded-lg text-sm bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-light-ink dark:text-dark-ink placeholder:text-light-ink-subtle dark:placeholder:text-dark-ink-subtle focus:outline-none focus:border-terracotta transition-colors"
                  value={p.items}
                  onChange={(e) => updatePillar(idx, { items: e.target.value })}
                  placeholder="Tech · Stack · Items (e.g. Rust · Docker · Linux)"
                />

                {/* Trash Button */}
                <button
                  type="button"
                  onClick={() => removePillar(idx)}
                  className="p-2 text-light-ink-muted hover:text-red-500 shrink-0 transition-colors rounded-lg hover:bg-light-surface-raised dark:hover:bg-dark-surface-raised"
                  title="Remove pillar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            {data.capability_pillars.length === 0 && (
              <p className="font-sans text-xs text-light-ink-muted dark:text-dark-ink-muted italic py-2">
                No capability pillars added.{' '}
                <button
                  type="button"
                  onClick={addPillar}
                  className="text-terracotta hover:underline"
                >
                  Add one
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
