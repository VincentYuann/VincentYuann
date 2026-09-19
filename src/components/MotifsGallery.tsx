import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export const MotifsGallery: React.FC = () => {
  const [activeMotif, setActiveMotif] = useState<number>(0);

  const motifs = [
    {
      id: 'hanko',
      num: '01',
      kanji: '印章',
      romaji: 'Hanko',
      title: 'Carved Vermilion Seal',
      desc: 'Hand-carved seal with weathered contours, representing verified architectural authenticity and human agency.',
      color: '#C83C23',
    },
    {
      id: 'enso',
      num: '02',
      kanji: '円相',
      romaji: 'Ensō',
      title: 'Gestural Sumi Brushwork',
      desc: 'Zen circle painted in a single uninhibited breath, celebrating the beauty of imperfection and circular lifecycle.',
      color: '#D49B6A',
    },
    {
      id: 'seigaiha',
      num: '03',
      kanji: '青海波',
      romaji: 'Seigaiha',
      title: 'Organic Surging Waves',
      desc: 'Concentric wave crests symbolizing peaceful streaming data, continuous resilience, and good fortune.',
      color: '#C83C23',
    },
    {
      id: 'sumie',
      num: '04',
      kanji: '墨竹',
      romaji: 'Sumi-e Bamboo',
      title: 'Painterly Bamboo & Patina',
      desc: 'Natural segmented bamboo joints and calligraphic leaves, symbolizing flexibility and principled strength under wind.',
      color: '#446557',
    },
  ];

  return (
    <section id="motifs" className="w-full max-w-7xl mx-auto px-6 py-12 lg:py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-terracotta font-serif text-sm">04 //</span>
            <span className="font-sans text-[11px] font-semibold text-light-ink-subtle dark:text-dark-ink-subtle uppercase tracking-widest">
              AESTHETIC VOCABULARY
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-light-ink dark:text-dark-ink">
            Wabi-Sabi Motifs Pack{' '}
            <span className="font-serif font-normal text-light-ink-muted dark:text-dark-ink-muted text-2xl ml-2">
              文様
            </span>
          </h2>
        </div>
        <p className="font-sans text-sm text-light-ink-muted dark:text-dark-ink-muted max-w-md leading-relaxed">
          Vector motifs crafted specifically for this portfolio system, compatible with both Akari Day and Charcoal
          Night modes.
        </p>
      </div>

      {/* Interactive Motifs Display Container */}
      <div className="bg-light-surface-card dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg shadow-akari dark:shadow-night-glow overflow-hidden">
        {/* Motif Selector Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-light-border dark:border-dark-border bg-light-surface-raised dark:bg-dark-surface-muted">
          {motifs.map((m, idx) => {
            const active = activeMotif === idx;
            return (
              <button
                key={m.id}
                onClick={() => setActiveMotif(idx)}
                className={`p-4 text-left transition-all border-r last:border-r-0 border-light-border/60 dark:border-dark-border/60 ${
                  active
                    ? 'bg-light-surface dark:bg-dark-surface border-b-2 border-b-terracotta'
                    : 'hover:bg-light-surface/60 dark:hover:bg-dark-surface/60 opacity-75'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-terracotta">{m.num}</span>
                  <span className="font-serif text-lg text-light-ink dark:text-dark-ink">{m.kanji}</span>
                </div>
                <div className="font-sans font-semibold text-xs text-light-ink dark:text-dark-ink mt-1">
                  {m.romaji}
                </div>
                <div className="font-sans text-[11px] text-light-ink-muted dark:text-dark-ink-muted truncate">
                  {m.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Big Motifs Visual Board */}
        <div className="p-6 sm:p-10 flex flex-col items-center justify-center bg-light-surface-card dark:bg-dark-surface-muted/50">
          <div className="w-full max-w-4xl rounded-md overflow-hidden border border-light-border dark:border-dark-border p-4 sm:p-6 bg-light-surface-raised dark:bg-dark-surface shadow-inner">
            <img
              src="/stitch/motifs-pack.svg"
              alt="Artistic Wabi-Sabi Decorative Motifs Pack"
              className="w-full h-auto object-contain filter drop-shadow-xs dark:drop-shadow-[0_0_12px_rgba(200,60,35,0.15)]"
            />
          </div>

          {/* Active Motif Highlight Callout */}
          <div className="mt-8 max-w-xl text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-light-surface-raised dark:bg-dark-surface border border-light-border dark:border-dark-border text-xs font-sans text-terracotta font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                Focusing on: {motifs[activeMotif].kanji} ({motifs[activeMotif].romaji})
              </span>
            </div>
            <p className="font-sans text-sm text-light-ink-muted dark:text-dark-ink-muted leading-relaxed">
              {motifs[activeMotif].desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
