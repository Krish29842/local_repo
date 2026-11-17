import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabaseClient';
import { DUMMY_PRODUCTS } from '../lib/dummyData';
import { NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FilterBar from '../components/FilterBar';
import NotebookList from '../components/NotebookList';
import SafetyBanner from '../components/SafetyBanner';
import Footer from '../components/Footer';
import ChatModal from '../components/ChatModal';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState('all');
  const [category, setCategory] = useState('');
  const [semester, setSemester] = useState('');
  const [year, setYear] = useState('');
  const [subject, setSubject] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('new');
  const [savedSet, setSavedSet] = useState(new Set());
  const [openRequest, setOpenRequest] = useState(null);

  useEffect(() => {
    supabase
      .from('products')
      .select(
        'id, title, author, category, semester, subject, sale_price, rent_price, condition, image_url, owner_id, owner_name, status, created_at',
      )
      .eq('status', 'available')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
          setProducts(DUMMY_PRODUCTS);
        } else if (!data || data.length === 0) {
          setProducts(DUMMY_PRODUCTS);
        } else {
          setProducts(data);
        }
        setLoading(false);
      });
  }, []);

  const subjectOptions = useMemo(() => {
    const names = products.map((p) => p.subject).filter(Boolean);
    return [...new Set(names)].sort();
  }, [products]);

  const handleToggleSave = (id) => {
    setSavedSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleContact = (product, type) => {
    setOpenRequest({ product, type });
  };

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return products
      .filter((p) => {
        const matchesMode =
          mode === 'all' ||
          (mode === 'buy' ? p.sale_price != null : p.rent_price != null);
        const matchesCategory = !category || p.category === category;
        const matchesSemester = !semester || String(p.semester) === semester;
        const matchesYear = !year || {
          '1': ['1', '2'],
          '2': ['3', '4'],
          '3': ['5', '6'],
          '4': ['7', '8'],
        }[year].includes(String(p.semester));
        const matchesSubject = !subject || p.subject === subject;
        const matchesQuery =
          !q ||
          [p.title, p.author, p.subject].some((v) => v && v.toLowerCase().includes(q));
        return (
          matchesMode &&
          matchesCategory &&
          matchesSemester &&
          matchesYear &&
          matchesSubject &&
          matchesQuery
        );
      })
      .sort((a, b) => {
        if (sortBy === 'low') {
          const pa = a.sale_price ?? a.rent_price ?? Infinity;
          const pb = b.sale_price ?? b.rent_price ?? Infinity;
          return pa - pb;
        }
        if (sortBy === 'high') {
          const pa = a.sale_price ?? a.rent_price ?? -Infinity;
          const pb = b.sale_price ?? b.rent_price ?? -Infinity;
          return pb - pa;
        }
        return new Date(b.created_at) - new Date(a.created_at);
      });
  }, [products, mode, category, semester, year, subject, searchQuery, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-soft">Loading campus listings…</div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-sand-5 text-ink">
      <Navbar savedCount={savedSet.size} />

      <main className="flex-1">
        <Hero
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearchSubmit={() => {}}
          onQuickSearch={(query) => setSearchQuery(query)}
        />

        <div id="catalog" className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-16">
          <FilterBar
            mode={mode}
            setMode={setMode}
            category={category}
            setCategory={setCategory}
            semester={semester}
            setSemester={setSemester}
            year={year}
            setYear={setYear}
            subject={subject}
            setSubject={setSubject}
            subjects={subjectOptions}
            sortBy={sortBy}
            setSortBy={setSortBy}
            productCount={filteredProducts.length}
          />

          <NotebookList
            products={filteredProducts}
            savedSet={savedSet}
            onToggleSave={handleToggleSave}
            onContact={handleContact}
          />

          <div id="sell" className="mt-16 p-8 sm:p-12 bg-gradient-to-r from-sea to-sea-hover rounded-3xl border border-sea/30 shadow-sea/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" aria-hidden="true">
              <div className="w-64 h-64 rounded-full bg-white/20 blur-[100px] -top-24 -right-24" />
              <div className="w-64 h-64 rounded-full bg-coral/20 blur-[100px] -bottom-24 -left-24" />
            </div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-coral animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-coral">
                  Campus Bulletin
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Finished with it? Add it to the page.
              </h2>
              <p className="font-hand text-sea-light text-lg sm:text-xl mt-2 mb-8">
                Sell it, rent it for a semester — juniors will message you.
              </p>
              <NavLink
                to="/sell"
                className="inline-flex items-center gap-2 bg-white text-ink hover:bg-coral hover:text-white px-8 py-3 rounded-full font-bold text-base transition-all shadow-lg active:scale-95"
              >
                📝 Create listing
              </NavLink>
            </div>
          </div>

          <SafetyBanner />
        </div>
      </main>

      <Footer />

      {openRequest && (
        <ChatModal
          product={openRequest.product}
          type={openRequest.type}
          onClose={() => setOpenRequest(null)}
        />
      )}
    </div>
  );
}
