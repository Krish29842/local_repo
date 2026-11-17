import { useState } from 'react';
import { useAuth } from '../lib/useAuth';
import { X, Mail } from '../components/Icons';

export default function Auth({ onClose }) {
  const { signUp, signIn, resetPassword, loading } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('senior');
  const [fullName, setFullName] = useState('');
  const [college, setCollege] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);
    try {
      if (mode === 'login') {
        const { error: err } = await signIn(email, password);
        if (err) {
          // Friendly message for unconfirmed email
          if (err.message?.includes('not confirmed') || err.message?.includes('Email not confirmed')) {
            setError('Please confirm your email first. Check your inbox for the confirmation link.');
          } else {
            setError(err.message);
          }
        }
      } else if (mode === 'forgot') {
        const { error: err } = await resetPassword(email);
        if (err) setError(err.message);
        else setSuccess('Password reset link sent to your email.');
      } else {
        const { error: err } = await signUp(email, password, role, fullName);
        if (err) setError(err.message);
        else setSuccess('Account created! Please check your email to confirm, then log in.');
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

        {/* Mode Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
            className={`flex-1 py-2 rounded-xl font-bold text-sm transition-all ${
              mode === 'login' ? 'bg-sea text-white shadow-sm' : 'bg-sand-3 text-ink hover:bg-sand-4'
            }`}
          >
            Log in
          </button>
          <button
            onClick={() => { setMode('signup'); setError(''); setSuccess(''); }}
            className={`flex-1 py-2 rounded-xl font-bold text-sm transition-all ${
              mode === 'signup' ? 'bg-sea text-white shadow-sm' : 'bg-sand-3 text-ink hover:bg-sand-4'
            }`}
          >
            Sign up
          </button>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-1">
          {mode === 'login' ? 'Welcome back' : mode === 'signup' ? 'Join Campus Market' : 'Reset Password'}
        </h2>
        <p className="text-soft text-sm mb-6">
          {mode === 'login'
            ? 'Sign in to your student account'
            : mode === 'signup'
              ? 'Create a verified student account'
              : 'Enter your email to reset your password'}
        </p>

        {success && (
          <p className="mb-4 text-sm text-emerald-700 font-semibold bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-100" role="status">
            {success}
          </p>
        )}

        {mode === 'forgot' ? (
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
            {error && <p className="text-sm text-red-700 font-semibold" role="alert">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-ink hover:bg-sea text-sand-4 hover:text-white py-2.5 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Sending…' : 'Send reset link'}
            </button>
          </form>
        ) : (
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
        )}

        <p className="mt-4 text-center text-xs text-soft">
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => { setMode('signup'); setError(''); setSuccess(''); }}
                className="text-sea font-semibold hover:underline"
              >
                Create one
              </button>
              <br />
              <button
                type="button"
                onClick={() => { setMode('forgot'); setError(''); setSuccess(''); }}
                className="text-coral font-semibold hover:underline mt-2 block"
              >
                <Mail className="w-3 h-3 inline mr-1" /> Forgot password?
              </button>
            </>
          ) : mode === 'signup' ? (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
                className="text-sea font-semibold hover:underline"
              >
                Sign in instead
              </button>
            </>
          ) : (
            <>
              Remember your password?{' '}
              <button
                type="button"
                onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
                className="text-sea font-semibold hover:underline"
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
