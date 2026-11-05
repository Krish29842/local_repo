import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabaseClient';
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
  const [subject, setSubject] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('new');
  const [savedSet, setSavedSet] = useState(new Set());
  const [openRequest, setOpenRequest] = useState(null);

  useEffect(() => {
    supabase
      .from('products')
      .select(
        'id, title, author, category, semester, subject, sale_price, rent_price, condition, image_url, owner_id, profiles(full_name), status',
      )
      .eq('status', 'available')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
          setProducts([]);
        } else {
          setProducts(data || []);
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
        const matchesSubject = !subject || p.subject === subject;
        const matchesQuery =
          !q ||
          [p.title, p.author, p.subject].some((v) => v && v.toLowerCase().includes(q));
        return matchesMode && matchesCategory && matchesSemester && matchesSubject && matchesQuery;
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
  }, [products, mode, category, semester, subject, searchQuery, sortBy]);

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

          <div id="sell" className="mt-14 p-6 sm:p-9 bg-sand-3 rounded-3xl border border-sand-2 shadow-paper relative">
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
              <NavLink
                to="/sell"
                className="inline-flex items-center gap-2 bg-ink hover:bg-sea text-sand-4 hover:text-white px-7 py-3 rounded-full font-bold text-base transition-all shadow-paper active:scale-95"
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
