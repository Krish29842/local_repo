import React, { useState } from 'react';
import { PlusCircle, Sparkles } from './Icons';

const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

export default function SellBookCard({ onAddListing }) {
  const [category, setCategory] = useState('book');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [semester, setSemester] = useState('3');
  const [subject, setSubject] = useState('');
  const [condition, setCondition] = useState('Like new');
  const [salePrice, setSalePrice] = useState('');
  const [rentPrice, setRentPrice] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please add a title.');
      return;
    }
    if (!subject.trim()) {
      setError('Please add the subject this item belongs to.');
      return;
    }
    const sale = salePrice === '' ? null : Number(salePrice);
    const rent = rentPrice === '' ? null : Number(rentPrice);
    if (sale !== null && sale <= 0) {
      setError('Sale price must be greater than 0.');
      return;
    }
    if (rent !== null && rent <= 0) {
      setError('Rent price must be greater than 0.');
      return;
    }
    if (sale === null && rent === null) {
      setError('Enter at least a sale price or a rent price (D002).');
      return;
    }

    setError('');
    onAddListing({
      title: title.trim(),
      author: author.trim(),
      category,
      semester: Number(semester),
      subject: subject.trim(),
      sale_price: sale,
      rent_price: rent,
      condition,
      owner_name: 'You',
      note: note.trim(),
    });

    setTitle('');
    setAuthor('');
    setSubject('');
    setSalePrice('');
    setRentPrice('');
    setNote('');
  };

  return (
    <section id="sell" className="mt-14 p-6 sm:p-9 bg-sand-3 rounded-3xl border border-sand-2 shadow-paper relative">
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-coral animate-ping" />
          <span className="text-xs font-bold uppercase tracking-wider text-coral">
            Campus Bulletin
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
          Finished with it? Add it to the page.
        </h2>
        <p className="font-hand text-sea text-lg sm:text-xl mt-1 mb-6">
          Sell it, rent it for a semester — juniors will message you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Form grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-xs font-semibold text-soft mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-transparent border-b-2 border-ink py-2 px-1 text-base text-ink focus:border-sea focus:outline-none cursor-pointer"
              >
                <option value="book" className="bg-sand-4 text-ink">Book</option>
                <option value="accessory" className="bg-sand-4 text-ink">
                  Accessory (lab coat, calculator…)
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-soft mb-1">Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Data Structures using C"
                className="w-full bg-transparent border-b-2 border-ink py-2 px-1 text-base text-ink placeholder:text-soft/60 focus:border-sea focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-soft mb-1">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Reema Thareja"
                className="w-full bg-transparent border-b-2 border-ink py-2 px-1 text-base text-ink placeholder:text-soft/60 focus:border-sea focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-soft mb-1">Subject *</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Data Structures"
                className="w-full bg-transparent border-b-2 border-ink py-2 px-1 text-base text-ink placeholder:text-soft/60 focus:border-sea focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-soft mb-1">Semester</label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full bg-transparent border-b-2 border-ink py-2 px-1 text-base text-ink focus:border-sea focus:outline-none cursor-pointer"
              >
                {SEMESTERS.map((s) => (
                  <option key={s} value={String(s)} className="bg-sand-4 text-ink">
                    Semester {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-soft mb-1">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full bg-transparent border-b-2 border-ink py-2 px-1 text-base text-ink focus:border-sea focus:outline-none cursor-pointer"
              >
                <option className="bg-sand-4 text-ink">Like new</option>
                <option className="bg-sand-4 text-ink">Good</option>
                <option className="bg-sand-4 text-ink">Some wear</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-soft mb-1">
                Sale price in ₹
              </label>
              <input
                type="number"
                min="1"
                inputMode="numeric"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                placeholder="250"
                className="w-full bg-transparent border-b-2 border-ink py-2 px-1 text-base text-ink placeholder:text-soft/60 focus:border-sea focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-soft mb-1">
                Rent per month in ₹
              </label>
              <input
                type="number"
                min="1"
                inputMode="numeric"
                value={rentPrice}
                onChange={(e) => setRentPrice(e.target.value)}
                placeholder="40"
                className="w-full bg-transparent border-b-2 border-ink py-2 px-1 text-base text-ink placeholder:text-soft/60 focus:border-sea focus:outline-none transition-colors"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-soft mb-1">
                Note for juniors (optional handwritten tip)
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Highlighted chapters 2 to 4, solved exercises in pencil, no torn pages"
                className="w-full bg-transparent border-b-2 border-ink py-2 px-1 text-base text-ink placeholder:text-soft/60 focus:border-sea focus:outline-none transition-colors"
              />
            </div>
          </div>

          <p className="text-xs text-soft -mt-2">
            Fill at least one of sale or rent price — one listing can offer both.
          </p>

          {error && (
            <p className="text-red-700 font-semibold text-sm pt-1" role="alert">
              {error}
            </p>
          )}

          <div className="pt-2 flex items-center justify-between">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-ink hover:bg-sea text-sand-4 hover:text-white px-7 py-3 rounded-full font-bold text-base transition-all shadow-paper active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Add listing</span>
            </button>

            <span className="text-xs text-soft hidden sm:inline flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-sea" />
              100% free peer exchange
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}
