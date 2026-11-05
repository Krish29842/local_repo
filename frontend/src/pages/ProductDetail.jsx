import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import ChatModal from '../components/ChatModal';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openRequest, setOpenRequest] = useState(null); // { product, type }

  useEffect(() => {
    setLoading(true);
    supabase
      .from('products')
      .select(
        'id, title, author, category, semester, subject, sale_price, rent_price, condition, image_url, owner_id, profiles(full_name)',
      )
      .eq('id', id)
      .single()
      .then(({ data, error: err }) => {
        if (err || !data) {
          setError(err?.message || 'Listing not found.');
          setLoading(false);
          return;
        }
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  const handleBuyRent = (type) => {
    if (!product) return;
    setOpenRequest({ product, type });
  };

  if (loading) return <div className="text-center py-20 text-soft">Loading listing…</div>;
  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-ink mb-2">{error}</h2>
        <button onClick={() => navigate(-1)} className="bg-sea text-white px-6 py-2 rounded-full font-semibold hover:bg-sea-hover transition-colors">
          Back
        </button>
      </div>
    );
  }

  const isBook = product.category === 'book';
  const ownerName = product.profiles?.[0]?.full_name || 'A senior';
  const salePrice = product.sale_price != null ? `₹${product.sale_price}` : null;
  const rentPrice = product.rent_price != null ? `₹${product.rent_price}/mo` : null;

  return (
    <div className="min-h-screen bg-sand-5 text-ink">
      <nav className="border-b border-sand-2 bg-white px-6 py-4">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sea font-semibold hover:underline">
          ← Back to browse
        </button>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 py-10">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden border border-sand-2 shadow-xs aspect-[4/5] lg:aspect-[1/1] bg-sand-3">
            {product.image_url ? (
              <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-soft">
                <span className="text-4xl mb-2">📖</span>
                <p>No image</p>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-sand-1 text-ink text-xs font-bold">
                {isBook ? 'Book' : 'Accessory'}
              </span>
              <span className="px-3 py-1 rounded-full bg-sand-3 text-ink text-xs">
                Sem {product.semester}
              </span>
              <span className="px-3 py-1 rounded-full bg-sand-3 text-ink text-xs">
                {product.subject}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight leading-snug">
              {product.title}
            </h1>
            {product.author && (
              <p className="text-lg text-soft">by {product.author}</p>
            )}

            <div className="border-t border-sand-2 pt-4">
              <p className="text-xs font-semibold text-soft uppercase tracking-wider mb-2">Condition</p>
              <p className="text-ink">{product.condition}</p>
            </div>

            {/* Pricing & actions */}
            <div className="bg-sand-3 rounded-3xl p-6 shadow-xs border border-sand-2">
              <p className="text-xs font-semibold text-soft uppercase tracking-wider mb-4">Price</p>
              <div className="space-y-3">
                {salePrice && (
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-ink">{salePrice}</span>
                    <span className="text-sm text-soft">one-time purchase</span>
                  </div>
                )}
                {rentPrice && (
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-ink">{rentPrice}</span>
                    <span className="text-sm text-soft">per month</span>
                  </div>
                )}
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {salePrice && (
                  <button
                    onClick={() => handleBuyRent('buy')}
                    disabled={!product}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sea text-white font-bold text-sm hover:bg-sea-hover transition-all active:scale-95 disabled:opacity-50"
                  >
                    💬 Buy
                  </button>
                )}
                {rentPrice && (
                  <button
                    onClick={() => handleBuyRent('rent')}
                    disabled={!product}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-coral text-white font-bold text-sm hover:bg-coral-hover transition-all active:scale-95 disabled:opacity-50"
                  >
                    🔑 Rent
                  </button>
                )}
              </div>
            </div>

            <div className="mt-2">
              <p className="text-xs font-semibold text-soft uppercase tracking-wider mb-1">Listed by</p>
              <p className="text-lg font-bold text-ink">{ownerName}</p>
              <p className="text-xs text-soft mt-1">Senior • Verified student</p>
            </div>
          </div>
        </div>
      </main>

      {openRequest && (
        <ChatModal product={openRequest.product} type={openRequest.type} onClose={() => setOpenRequest(null)} />
      )}
    </div>
  );
}
