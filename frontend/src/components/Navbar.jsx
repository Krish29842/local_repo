import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BookOpen, User, LogOut } from './Icons';
import { useAuth } from '../lib/useAuth';

export default function Navbar({ savedCount = 0 }) {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-sand-5/95 backdrop-blur-md border-b border-sand-3 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand */}
        <NavLink
          to="/"
          className="flex items-center gap-2.5 group"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="w-10 h-10 rounded-xl bg-sea text-sand-4 flex items-center justify-center shadow-xs group-hover:bg-sea-hover transition-colors">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-ink">
              Campus Market
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-soft -mt-1">
              Peer Marketplace
            </span>
          </div>
        </NavLink>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-ink">
          <NavLink
            to="/"
            end
            className="hover:text-sea transition-colors pb-1 border-b-2 border-sea"
          >
            Browse
          </NavLink>
          {user && (
            <>
              <NavLink
                to="/dashboard"
                className="text-soft hover:text-ink transition-colors"
              >
                Dashboard
              </NavLink>
              {profile?.role === 'senior' && (
                <NavLink
                  to="/sell"
                  className="text-soft hover:text-ink transition-colors"
                >
                  Sell
                </NavLink>
              )}
            </>
          )}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-soft hidden sm:inline">
                {profile?.full_name || 'Student'}
              </span>
              <button
                onClick={async () => {
                  await signOut();
                  navigate('/');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-full bg-ink text-sand-4 hover:bg-sea hover:text-white transition-all shadow-xs"
              >
                <LogOut className="w-4 h-4" />
                <span>Log out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/auth')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-full bg-ink text-sand-4 hover:bg-sea hover:text-white transition-all shadow-xs"
            >
              <User className="w-4 h-4" />
              <span>Log in</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
