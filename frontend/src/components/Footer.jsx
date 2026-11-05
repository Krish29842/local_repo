import React from 'react';
import { BookOpen, Heart } from './Icons';

export default function Footer() {
  return (
    <footer className="mt-16 bg-sand-1 text-ink py-10 px-4 sm:px-6 border-t border-sand-2">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 font-extrabold text-lg text-ink">
            <BookOpen className="w-5 h-5 text-sea" />
            <span>Campus Market</span>
          </div>
          <p className="text-xs text-soft mt-1 max-w-sm">
            Meet in a public spot on campus and check the book before you pay. Built with{' '}
            <Heart className="w-3.5 h-3.5 inline text-coral fill-current mx-0.5" /> by seniors for juniors.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-ink">
          <a href="#catalog" className="hover:text-sea transition-colors">
            Browse Books
          </a>
          <a href="#sell" className="hover:text-sea transition-colors">
            Sell a Book
          </a>
          <a href="#safety" className="hover:text-sea transition-colors">
            Safety Code
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-sea transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
