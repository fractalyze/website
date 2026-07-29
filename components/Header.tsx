'use client';

import Link from 'next/link';
import {useEffect, useState} from 'react';
import headerNavLinks from '@/data/headerNavLinks';
import {ContactButton} from './ContactButton';

export function Header() {
  // The header and the page behind it are both white, so once content starts
  // passing underneath there is nothing to say where one ends. A rule appears
  // for exactly as long as that is true.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    // Transparent rather than absent at rest: a border that appears would
    // otherwise add its pixel to the header and nudge the page down.
    <header
      className={`sticky top-0 z-50 border-b bg-paper px-28 transition-colors duration-200 ${
        scrolled ? 'border-line' : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-content items-center justify-between">
        <div className="flex items-center gap-20">
          <Link href="/" aria-label="Fractalyze">
            <img
              src="/logo/fractalyze-logo-black.svg"
              alt="Fractalyze"
              className="h-[2.625rem] w-auto"
            />
          </Link>
          <nav>
            <ul className="flex items-center gap-6">
              {headerNavLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="flex min-h-6 items-center px-4 py-2 text-label font-medium text-ink transition-opacity hover:opacity-70"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <ContactButton />
      </div>
    </header>
  );
}
