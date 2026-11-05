import React, { useState } from 'react';
import { X, Send, Sparkles } from './Icons';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../lib/useAuth';

export default function ChatModal({ product, type, onClose }) {
  const { user } = useAuth();
  const [message, setMessage] = useState(
    type === 'rent'
      ? `Hi ${product.owner_name}, I'd like to rent "${product.title}" for this semester. Can we meet at the library?`
      : `Hi ${product.owner_name}, is "${product.title}" still available? Can we meet on campus today?`,
  );
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const isRent = type === 'rent';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      onClose();
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from('requests').insert({
        product_id: product.id,
        requester_id: user.id,
        type: isRent ? 'rent' : 'buy',
        status: 'pending',
      });
      if (error) throw error;
      setSent(true);
    } catch (err) {
      alert(err.message || 'Request failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!product) return null;

  if (sent) {
    return (
      <div className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-sand-5 rounded-3xl border-2 border-sand-2 max-w-lg w-full p-8 sm:p-10 shadow-paperLift text-center">
          <div className="w-16 h-16 rounded-full bg-sea/10 text-sea flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-ink mb-2">
            Request sent ✓
          </h3>
          <p className="text-soft mb-6">
            Your {isRent ? 'rent' : 'buy'} request for <strong>"{product.title}"</strong> is pending. The owner will respond in your Dashboard.
          </p>
          <button onClick={onClose} className="bg-ink text-sand-4 hover:bg-sea px-6 py-2 rounded-full font-bold transition-colors">
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-sand-5 rounded-3xl border-2 border-sand-2 max-w-lg w-full p-6 sm:p-7 shadow-paperLift relative">
        <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full text-soft hover:text-ink transition-colors" aria-label="Close">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-sea"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-sea">
            Direct Peer Request
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-ink">
          {isRent ? 'Send Rent Request' : 'Send Buy Request'}
        </h3>
        <p className="text-sm text-soft mt-0.5 mb-5">
          Connecting you with <strong className="text-ink">{product.owner_name}</strong> for{' '}
          <em className="text-ink font-medium">"{product.title}"</em>.
          {isRent && product.rent_price != null && (
            <>
              Rent: <strong className="text-ink">₹{product.rent_price}/month</strong>.
            </>
          )}
          {!isRent && product.sale_price != null && (
            <>
              Price: <strong className="text-ink">₹{product.sale_price}</strong>.
            </>
          )}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-soft mb-1.5">Your Message</label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-sand-4 border border-sand-2 rounded-xl p-3 text-sm text-ink placeholder:text-soft/60 focus:outline-none focus:border-sea focus:ring-2 focus:ring-sea/20"
              required
            />
          </div>

          <div className="p-3 bg-sand-3 rounded-xl flex items-start gap-2.5 text-xs text-ink">
            <Sparkles className="w-4 h-4 text-sea shrink-0 mt-0.5" />
            <span>
              Meeting tip: Suggest a public spot such as the campus library foyer, Nescafe stall, or canteen.
            </span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-full text-sm font-semibold text-soft hover:text-ink hover:bg-sand-4 transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-sea text-white font-bold text-sm hover:bg-sea-hover transition-all active:scale-95 shadow-xs disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Sending…' : 'Send Request'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
