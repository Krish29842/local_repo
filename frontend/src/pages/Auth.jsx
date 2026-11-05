import { useState } from 'react';
import { useAuth } from '../lib/useAuth';
import { X } from '../components/Icons';

export default function Auth({ onClose }) {
  const { signUp, signIn, loading } = useAuth();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('senior');
  const [fullName, setFullName] = useState('');
  const [college, setCollege] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (mode === 'login') {
        const { error: err } = await signIn(email, password);
        if (err) setError(err.message);
      } else {
        const { error: err } = await signUp(email, password, role, fullName);
        if (err) setError(err.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-sand-5 rounded-3xl border-2 border-sand-2 max-w-md w-full p-6 sm:p-8 shadow-paperLift">
        <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full text-soft hover:text-ink transition-colors" aria-label="Close">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-1">
          {mode === 'login' ? 'Welcome back' : 'Join Campus Market'}
        </h2>
        <p className="text-soft text-sm mb-6">
          {mode === 'login' ? 'Sign in to your student account' : 'Create a verified student account'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-soft mb-1">Email *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@college.edu"
              className="w-full bg-sand-4 border border-sand-2 rounded-xl px-3 py-2 text-ink focus:border-sea focus:outline-none focus:ring-2 focus:ring-sea/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-soft mb-1">Password *</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-sand-4 border border-sand-2 rounded-xl px-3 py-2 text-ink focus:border-sea focus:outline-none focus:ring-2 focus:ring-sea/20"
            />
          </div>
          {mode === 'signup' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-soft mb-1">Full name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Rahul Sharma"
                  className="w-full bg-sand-4 border border-sand-2 rounded-xl px-3 py-2 text-ink focus:border-sea focus:outline-none focus:ring-2 focus:ring-sea/20"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-soft mb-1">College</label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="Your college"
                  className="w-full bg-sand-4 border border-sand-2 rounded-xl px-3 py-2 text-ink focus:border-sea focus:outline-none focus:ring-2 focus:ring-sea/20"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-soft mb-1">I am a *</label>
                <div className="flex gap-2">
                  <label className="flex-1 border rounded-xl p-2 text-center text-xs font-semibold cursor-pointer text-sm">
                    <input
                      type="radio"
                      name="role"
                      value="senior"
                      checked={role === 'senior'}
                      onChange={() => setRole('senior')}
                      className="sr-only"
                    />
                    Senior
                  </label>
                  <label className="flex-1 border rounded-xl p-2 text-center text-xs font-semibold cursor-pointer text-sm">
                    <input
                      type="radio"
                      name="role"
                      value="junior"
                      checked={role === 'junior'}
                      onChange={() => setRole('junior')}
                      className="sr-only"
                    />
                    Junior
                  </label>
                </div>
                <p className="text-[10px] text-soft mt-1">
                  Role is locked after signup (college policy).
                </p>
              </div>
            </>
          )}
          {error && <p className="text-sm text-red-700 font-semibold" role="alert">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-ink hover:bg-sea text-sand-4 hover:text-white py-2.5 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-soft">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-sea font-semibold hover:underline"
          >
            {mode === 'login' ? 'Create one' : 'Sign in instead'}
          </button>
        </p>
      </div>
    </div>
  );
}
