import React from 'react';
import { ShieldCheck, MapPin } from './Icons';

export default function SafetyBanner() {
  return (
    <aside
      id="safety"
      aria-label="Campus safety guidelines"
      className="mt-14 p-6 sm:p-8 bg-sand-4 border-2 border-sand-2 rounded-3xl flex flex-col md:flex-row items-center gap-6 shadow-xs"
    >
      <div className="w-14 h-14 rounded-2xl bg-coral/15 border border-coral/30 text-coral flex items-center justify-center shrink-0">
        <ShieldCheck className="w-8 h-8" />
      </div>

      <div className="flex-1 text-center md:text-left">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-coral/20 text-coral text-xs font-bold uppercase tracking-wider mb-1.5">
          <span>Safety First</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-ink">
          Campus Exchange Guidelines
        </h3>
        <p className="text-soft text-sm mt-1 leading-relaxed">
          Always meet in a visible campus spot (<strong className="text-ink">Central Library, Nescafe canteen, or Main foyer</strong>). Inspect all pages, exercises, and condition thoroughly before completing payment.
        </p>
      </div>

      <div className="flex items-center gap-2 text-xs font-bold text-ink bg-sand-3 px-4 py-2 rounded-xl shrink-0">
        <MapPin className="w-4 h-4 text-sea" />
        <span>Hostels & Quads Drop-offs</span>
      </div>
    </aside>
  );
}
