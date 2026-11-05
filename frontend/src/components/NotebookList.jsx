import React from 'react';
import { Bookmark, MessageSquare, Key } from './Icons';

export default function NotebookList({ products, savedSet, onToggleSave, onContact }) {
  if (products.length === 0) {
    return (
      <div className="py-12 px-6 text-center bg-sand-4/60 border border-dashed border-sand-2 rounded-2xl">
        <p className="font-hand text-sea text-xl sm:text-2xl">
          Nothing here yet matching your filters.
        </p>
        <p className="text-soft text-sm mt-1">
          Add what you need in the form below and seniors will reach out!
        </p>
      </div>
    );
  }

  return (
    <div className="relative pl-12 sm:pl-18 border-t-2 border-sand-2">
      {/* Signature Vertical Coral Notebook Margin Line */}
      <div
        className="absolute left-9 sm:left-14 top-0 bottom-0 w-[2px] bg-coral/80"
        aria-hidden="true"
      />

      <div className="divide-y divide-sand-2">
        {products.map((p) => {
          const isSaved = savedSet.has(p.id);
          const isBook = p.category === 'book';

          return (
            <article
              key={p.id}
              className="relative py-5 pr-2 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start hover:bg-gradient-to-r hover:from-transparent hover:to-sand-4/50 rounded-r-xl transition-colors group"
            >
              {/* Handwritten Left-Margin Tag */}
              <div className="absolute left-[-44px] sm:left-[-54px] top-5 w-10 text-right font-hand font-bold text-base sm:text-lg text-coral uppercase tracking-wide">
                {isBook ? 'book' : 'gear'}
              </div>

              {/* Center Content */}
              <div className="space-y-1.5">
                <h3 className="font-bold text-lg sm:text-xl text-ink leading-snug group-hover:text-sea transition-colors">
                  {p.title}
                </h3>
                {p.author && <p className="text-soft text-sm font-medium">by {p.author}</p>}

                {/* Facts row */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-soft pt-1">
                  <span className="bg-sand-4 border border-sand-2 px-2.5 py-0.5 rounded-full text-ink font-semibold">
                    <strong className="text-ink">Sem {p.semester}</strong> • {p.subject}
                  </span>
                  <span className="bg-sand-3 px-2 py-0.5 rounded-full text-ink font-medium">
                    {p.condition}
                  </span>
                  <span className="text-soft">
                    Listed by <span className="text-ink font-semibold">{p.owner_name}</span>
                  </span>
                </div>

                {/* Senior Handwritten Scribble Tip */}
                {p.note && (
                  <p className="font-hand text-sea text-base sm:text-lg pt-1 leading-snug">
                    ✎ {p.note}
                  </p>
                )}
              </div>

              {/* Right Column: Pricing & Actions */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2 pt-2 md:pt-0 shrink-0">
                <div className="text-left md:text-right">
                  {p.sale_price != null && (
                    <div className="font-extrabold text-2xl sm:text-3xl text-ink tracking-tight">
                      ₹{p.sale_price}
                      <span className="text-[11px] font-semibold text-soft block -mt-0.5">
                        one-time purchase
                      </span>
                    </div>
                  )}
                  {p.rent_price != null && (
                    <div
                      className={`font-extrabold text-ink tracking-tight ${
                        p.sale_price != null ? 'text-lg mt-1' : 'text-2xl sm:text-3xl'
                      }`}
                    >
                      ₹{p.rent_price}
                      <span className="text-[11px] font-semibold text-soft block -mt-0.5">
                        per month
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleSave(p.id)}
                    className={`p-2 rounded-lg border transition-colors ${
                      isSaved
                        ? 'border-coral bg-coral/10 text-coral font-bold'
                        : 'border-sand-2 text-soft hover:text-coral hover:bg-sand-4'
                    }`}
                    title={isSaved ? 'Saved in wishlist' : 'Save for later'}
                    aria-label="Save for later"
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>

                  {/* D002: Buy only if sale_price exists, Rent only if rent_price exists */}
                  {p.sale_price != null && (
                    <button
                      onClick={() => onContact(p, 'buy')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-95 bg-sea text-white hover:bg-sea-hover"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Buy</span>
                    </button>
                  )}
                  {p.rent_price != null && (
                    <button
                      onClick={() => onContact(p, 'rent')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-95 bg-coral text-white hover:bg-coral-hover"
                    >
                      <Key className="w-4 h-4" />
                      <span>Rent</span>
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
