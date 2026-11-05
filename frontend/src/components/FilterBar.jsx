import React from 'react';

const CATEGORIES = [
  { value: '', label: 'All items' },
  { value: 'book', label: 'Books' },
  { value: 'accessory', label: 'Accessories' },
];

const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

export default function FilterBar({
  mode,
  setMode,
  category,
  setCategory,
  semester,
  setSemester,
  subject,
  setSubject,
  subjects,
  sortBy,
  setSortBy,
  productCount,
}) {
  return (
    <div className="border-b border-sand-2 pb-4 mb-6">
      {/* Mode Switcher Tabs: matches sale_price / rent_price presence (D002) */}
      <div className="flex gap-6 border-b border-sand-2 mb-3">
        {[
          { id: 'all', label: 'All items' },
          { id: 'buy', label: 'Buy' },
          { id: 'rent', label: 'Rent' },
        ].map((tab) => {
          const isActive = mode === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setMode(tab.id)}
              className={`pb-2.5 font-bold text-base sm:text-lg border-b-4 transition-all -mb-[2px] cursor-pointer ${
                isActive ? 'text-ink border-sea' : 'text-soft border-transparent hover:text-ink'
              }`}
              aria-pressed={isActive}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 py-2">
        {CATEGORIES.map((c) => {
          const isSelected = category === c.value;
          return (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-sand-1 text-ink shadow-xs font-bold'
                  : 'bg-sand-3 text-ink hover:bg-sand-2'
              }`}
              aria-pressed={isSelected}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Secondary Controls: count, semester, subject & sort */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 text-sm text-soft">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>
          <span className="font-semibold text-ink">
            {productCount} {productCount === 1 ? 'item available' : 'items available'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-1.5 text-xs sm:text-sm text-soft">
            <span>Semester</span>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="bg-sand-4 border border-sand-2 text-ink rounded-lg px-2.5 py-1 text-xs sm:text-sm focus:ring-1 focus:ring-sea focus:outline-none"
            >
              <option value="">Any</option>
              {SEMESTERS.map((s) => (
                <option key={s} value={String(s)}>
                  Sem {s}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-1.5 text-xs sm:text-sm text-soft">
            <span>Subject</span>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-sand-4 border border-sand-2 text-ink rounded-lg px-2.5 py-1 text-xs sm:text-sm focus:ring-1 focus:ring-sea focus:outline-none"
            >
              <option value="">Any</option>
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-1.5 text-xs sm:text-sm text-soft">
            <span>Sort</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-sand-4 border border-sand-2 text-ink rounded-lg px-2.5 py-1 text-xs sm:text-sm focus:ring-1 focus:ring-sea focus:outline-none"
            >
              <option value="new">Newest</option>
              <option value="low">Cheapest first</option>
              <option value="high">Costliest first</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}
