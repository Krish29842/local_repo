import React from 'react';
import { Bookmark, MessageSquare, Key } from './Icons';

const placeholderByCategory = {
  book: '📖',
  accessory: '🎒',
};

export default function NotebookList({ products, savedSet, onToggleSave, onContact }) {
  if (products.length === 0) {
    return (
      <div className="py-20 px-6 text-center bg-sand-4/40 border border-dashed border-sand-2 rounded-3xl">
        <div className="w-16 h-16 rounded-full bg-sea/10 text-sea flex items-center justify-center mx-auto mb-4 text-3xl">
          📚
        </div>
        <p className="font-hand text-sea text-xl sm:text-2xl font-semibold mb-2">
          Nothing here yet matching your filters.
        </p>
        <p className="text-soft text-sm mt-1 max-w-xs mx-auto">
          Try widening your semester or subject filters — or be the first to list something!
        </p>
      </div>
    );
  }

  return (
    <div className="relative pt-4">
      {/* Signature Vertical Coral Notebook Margin Line */}
      <div
        className="absolute left-[60px] sm:left-[80px] top-0 bottom-0 w-[2px] bg-coral/40"
        aria-hidden="true"
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => {
          const isSaved = savedSet.has(p.id);
          const isBook = p.category === 'book';

          return (
            <article
              key={p.id}
              className="group relative flex flex-col h-full bg-white rounded-3xl border border-sand-2 shadow-sm hover:shadow-paperLift transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              {/* Category tag */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-sand-2 shadow-sm">
                <span className={`w-2 h-2 rounded-full ${isBook ? 'bg-sea' : 'bg-coral'}`} />
                <span className="text-[10px] font-bold uppercase tracking-wider text-soft">
                  {isBook ? 'Book' : 'Gear'}
                </span>
              </div>

              {/* Saved badge */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSave(p.id);
                }}
                className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-200 ${
                  isSaved
                    ? 'bg-coral text-white shadow-md'
                    : 'bg-white text-soft border border-sand-2 hover:bg-sea hover:text-white hover:border-sea'
                }`}
                aria-label={isSaved ? 'Unsave' : 'Save'}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>

              {/* Image area */}
              <div className="aspect-video rounded-t-3xl overflow-hidden bg-sand-3 relative">
                {p.image_url ? (
                  <img
                    src={p.image_url}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-soft">
                    <span className="text-5xl mb-2">{placeholderByCategory[p.category] || '📦'}</span>
                    <p className="text-xs font-medium text-ink/60">No image</p>
                  </div>
                )}
                {/* Semester pill on image */}
                <div className="absolute bottom-3 left-3 bg-ink/90 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg backdrop-blur">
                  Sem {p.semester}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-start gap-2 mb-1">
                  <h3 className="font-bold text-lg text-ink leading-snug group-hover:text-sea transition-colors line-clamp-2">
                    {p.title}
                  </h3>
                </div>
                {p.author && (
                  <p className="text-xs text-soft mb-3 font-medium">by {p.author}</p>
                )}

                {/* Facts row */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-sand-3 text-ink text-xs font-semibold border border-sand-2">
                    Sem {p.semester} • {p.subject}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-sea/10 text-sea text-xs font-semibold border border-sea/20">
                    {p.condition}
                  </span>
                </div>

                <div className="mt-auto pt-3 border-t border-sand-2">
                  <div className="flex items-baseline gap-2 mb-3">
                    {p.sale_price != null && (
                      <span className="text-xl font-extrabold text-ink">
                        ₹{p.sale_price}
                      </span>
                    )}
                    {p.rent_price != null && (
                      <span className="text-base font-bold text-sea">
                        ₹{p.rent_price}/mo
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {p.sale_price != null && (
                      <button
                        onClick={() => onContact(p, 'buy')}
                        className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-ink text-white text-xs font-bold hover:bg-sea-hover transition-all active:scale-95 shadow-sm disabled:opacity-50"
                      >
                        <MessageSquare className="w-3 h-3" />
                        Buy
                      </button>
                    )}
                    {p.rent_price != null && (
                      <button
                        onClick={() => onContact(p, 'rent')}
                        className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-coral text-white text-xs font-bold hover:bg-coral-hover transition-all active:scale-95 shadow-sm disabled:opacity-50"
                      >
                        <Key className="w-3 h-3" />
                        Rent
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
