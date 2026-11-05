import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../lib/useAuth';

export default function Dashboard() {
  const { user, profile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState(profile?.role === 'senior' ? 'incoming' : 'mine');

  useEffect(() => {
    if (authLoading || !user) return;
    setLoading(true);
    const isSenior = profile?.role === 'senior';

    let query = supabase
      .from('requests')
      .select(
        'id, type, status, created_at, product_id, requester_id, products(id, title, sale_price, rent_price, image_url, owner_id), profiles(full_name)',
      )
      .order('created_at', { ascending: false });

    if (isSenior) {
      // requests on products this senior owns
      query = query.eq('products.owner_id', user.id);
    } else {
      // requests this junior made
      query = query.eq('requester_id', user.id);
    }

    query.then(({ data, error: err }) => {
      if (err) {
        setError(err.message);
        setLoading(false);
        return;
      }
      setRequests(data || []);
      setLoading(false);
    });
  }, [user, profile, authLoading]);

  const handleRespond = async (requestId, newStatus) => {
    const { error: err } = await supabase
      .from('requests')
      .update({ status: newStatus })
      .eq('id', requestId);
    if (err) {
      alert(err.message);
      return;
    }
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: newStatus } : r)),
    );
  };

  if (authLoading || loading) return <div className="text-center py-20 text-soft">Loading…</div>;
  if (!user) return <div className="text-center py-20">Please log in.</div>;

  const isSenior = profile?.role === 'senior';
  const myRequests = isSenior
    ? requests.filter((r) => r.products && r.products.owner_id === user.id)
    : requests;

  return (
    <div className="min-h-screen bg-sand-5 text-ink">
      <nav className="border-b border-sand-2 bg-white px-6 py-4">
        <NavLink
          to="/"
          end
          className="flex items-center gap-2 text-sea font-semibold hover:underline"
        >
          ← Browse
        </NavLink>
        <span className="ml-auto text-xs text-soft">
          {isSenior ? 'Senior' : 'Junior'} • {profile?.full_name}
        </span>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 py-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-ink mb-6">
          {isSenior ? 'Incoming Requests' : 'My Requests'}
        </h1>

        {isSenior && (
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setTab('incoming')}
              className={`px-4 py-2 rounded-xl font-semibold text-sm transition-colors ${
                tab === 'incoming'
                  ? 'bg-sea text-white'
                  : 'bg-sand-3 text-ink hover:bg-sand-4'
              }`}
            >
              On my listings
            </button>
            <button
              onClick={() => setTab('mine')}
              className={`px-4 py-2 rounded-xl font-semibold text-sm transition-colors ${
                tab === 'mine'
                  ? 'bg-sea text-white'
                  : 'bg-sand-3 text-ink hover:bg-sand-4'
              }`}
            >
              I sent
            </button>
          </div>
        )}

        <div className="space-y-4">
          {myRequests.length === 0 ? (
            <div className="py-16 text-center bg-sand-4/60 border border-dashed border-sand-2 rounded-3xl">
              <p className="text-soft">
                {isSenior ? 'No requests yet on your listings.' : "You haven't sent any requests yet."}
              </p>
            </div>
          ) : (
            myRequests.map((r) => {
              const product = r.products?.[0];
              const statusColor =
                r.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' :
                r.status === 'declined' ? 'bg-red-100 text-red-700' :
                'bg-sand-1 text-ink';
              return (
                <div
                  key={r.id}
                  className="bg-white rounded-3xl border border-sand-2 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    {product?.image_url ? (
                      <img src={product.image_url} alt="" className="w-16 h-16 rounded-xl object-cover" />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-sand-3 flex items-center justify-center text-soft">📖</div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-ink truncate">{product?.title || 'Listing'}</h3>
                      <p className="text-xs text-soft">
                        {r.type === 'buy' ? 'Buy request' : 'Rent request'} • Sem {product?.semester}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
                      {r.status}
                    </span>
                    {r.status === 'pending' && isSenior && (
                      <>
                        <button
                          onClick={() => handleRespond(r.id, 'accepted')}
                          className="text-xs font-semibold text-emerald-600 hover:underline mr-3"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleRespond(r.id, 'declined')}
                          className="text-xs font-semibold text-red-600 hover:underline"
                        >
                          Decline
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
