import { useState } from 'react';
import { useAuth } from '../lib/useAuth';
import { X } from '../components/Icons';

export default function Auth({ onClose, onSuccess }) {
  const { signUp, signIn, resetPassword, loading, user } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('senior');
  const [fullName, setFullName] = useState('');
  const [college, setCollege] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [resetCooldown, setResetCooldown] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);
    try {
      if (mode === 'login') {
        const { error: err } = await signIn(email, password);
        if (err) {
          setError(err.message || 'Login failed. Please try again.');
        } else if (onSuccess) {
          onSuccess();
          onClose();
        }
      } else if (mode === 'forgot') {
        const { error: err } = await resetPassword(email);
        if (err) {
          if (err.message?.includes('45 seconds') || err.message?.includes('only request')) {
            setError('Please wait 45 seconds before requesting again.');
          } else {
            setError(err.message);
          }
        } else {
          setSuccess('Password reset link sent to your email.');
          setResetCooldown(45);
          const timer = setInterval(() => {
            setResetCooldown((prev) => {
              if (prev <= 1) {
                clearInterval(timer);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        }
      } else {
        const { error: err, session } = await signUp(email, password, role, fullName);
        if (err) {
          setError(err.message || 'Signup failed. Please try again.');
        } else if (session && user) {
          // Auto signed in (email confirmations OFF)
          setSuccess('Account created & logged in!');
          setTimeout(() => {
            onSuccess();
            onClose();
          }, 1200);
        } else {
          // Email confirmations may still be ON
          setSuccess('Account created! Please log in.');
          setMode('login');
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return null;

  const selectRole = (r) => {
    setRole(r);
    setError('');
  };

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
          {mode === 'login'
            ? 'Welcome back'
            : mode === 'signup'
              ? 'Join Campus Market'
              : 'Reset Password'}
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
            {resetCooldown > 0 && (
              <p className="text-sm text-coral font-semibold" role="alert">
                Please wait {resetCooldown} seconds before requesting again.
              </p>
            )}
            {error && <p className="text-sm text-red-700 font-semibold" role="alert">{error}</p>}
            <button
              type="submit"
              disabled={submitting || resetCooldown > 0}
              className={`w-full py-2.5 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                resetCooldown > 0 || submitting
                  ? 'bg-sand-3 text-soft'
                  : 'bg-ink text-sand-4 hover:bg-sea hover:text-white'
              }`}
            >
              {submitting ? 'Sending…' : resetCooldown > 0 ? `Wait ${resetCooldown}s` : 'Send reset link'}
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
                    <button
                      type="button"
                      onClick={() => selectRole('senior')}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all border ${
                        role === 'senior'
                          ? 'bg-sea text-white border-sea shadow-sm'
                          : 'bg-sand-3 text-ink border-sand-2 hover:bg-sand-4'
                      }`}
                    >
                      Senior
                    </button>
                    <button
                      type="button"
                      onClick={() => selectRole('junior')}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all border ${
                        role === 'junior'
                          ? 'bg-coral text-white border-coral shadow-sm'
                          : 'bg-sand-3 text-ink border-sand-2 hover:bg-sand-4'
                      }`}
                    >
                      Junior
                    </button>
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
                Forgot password?
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
