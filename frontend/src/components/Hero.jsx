import React from 'react';
import { Search, ArrowRight } from './Icons';

export default function Hero({ searchQuery, setSearchQuery, onSearchSubmit, onQuickSearch }) {
  const quickPills = ['Data Structures', 'Mathematics', 'Operating Systems', 'Thermodynamics', 'Computer Networks'];

  return (
    <section className="relative bg-sand-4 pt-10 pb-0 overflow-hidden border-b border-sand-3">
      {/* Sun gradient aura */}
      <div
        className="absolute right-[-40px] top-6 w-[220px] sm:w-[320px] aspect-square rounded-full pointer-events-none opacity-85"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #f5d197 0%, #eabe75 70%, transparent 100%)',
          filter: 'blur(8px)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center pb-12">
        {/* Term badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand-5 border border-sand-2 text-ink text-xs font-semibold shadow-xs mb-5">
          <span className="w-2 h-2 rounded-full bg-sea animate-pulse" />
          <span>Semester Exams Prep • Campus Peer Exchange</span>
          <span className="text-coral font-bold hidden sm:inline">● Verified Seniors</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-ink tracking-tight leading-[1.08] max-w-3xl mx-auto">
          Books your seniors already finished.
        </h1>

        {/* Handwritten note in Kalam */}
        <div className="mt-3 flex justify-center items-center">
          <p className="font-hand text-sea text-xl sm:text-2xl font-semibold -rotate-1 tracking-wide max-w-xl">
            Buy them cheaper, rent them for a semester, or pass yours on.
          </p>
        </div>

        {/* Pill Search Bar */}
        <div className="mt-8 max-w-xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSearchSubmit();
            }}
            className="flex items-center bg-sand-5 rounded-full p-2 pl-5 border-2 border-sand-2 shadow-paper focus-within:border-sea focus-within:ring-4 focus-within:ring-sea/15 transition-all"
            role="search"
          >
            <Search className="w-5 h-5 text-soft shrink-0 mr-2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, subject or semester..."
              className="w-full bg-transparent border-0 text-ink placeholder-soft text-base focus:ring-0 focus:outline-none"
              aria-label="Search books"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 bg-ink hover:bg-sea text-sand-4 hover:text-white px-5 py-2.5 rounded-full font-bold text-sm transition-all shrink-0 active:scale-95"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Search Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-medium text-soft">
            <span className="text-ink font-semibold">Popular:</span>
            {quickPills.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onQuickSearch(item)}
                className="px-2.5 py-1 rounded-full bg-sand-3 hover:bg-sand-2 text-ink border border-sand-2 transition-colors cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Layered Beach & Tide SVG Waves */}
      <div className="w-full relative leading-none pointer-events-none -mb-[1px]">
        <svg
          className="block w-full h-[70px] sm:h-[110px]"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path fill="#fbe3bc" d="M0 70 C240 10 420 120 720 70 S1200 20 1440 80 V160 H0Z" />
          <path fill="#f5d197" d="M0 98 C260 50 470 140 760 100 S1220 60 1440 110 V160 H0Z" />
          <path fill="#eabe75" d="M0 124 C300 90 520 150 800 124 S1250 100 1440 134 V160 H0Z" />
          <path fill="#fffaf3" d="M0 146 C320 124 560 160 860 144 S1280 130 1440 150 V160 H0Z" />
        </svg>
      </div>
    </section>
  );
}
