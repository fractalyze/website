'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useCallback, useEffect, useRef, useState} from 'react';
import headerNavLinks from '@/data/headerNavLinks';
import {ContactButton} from './ContactButton';
import {NavMenu} from './NavMenu';

const MENU_ID = 'header-nav-menu';

export function Header() {
  // The header and the page behind it are both white, so once content starts
  // passing underneath there is nothing to say where one ends. A rule appears
  // for exactly as long as that is true.
  const [scrolled, setScrolled] = useState(false);
  // Below the desktop breakpoint the links and the call to action move into a
  // panel the hamburger opens.
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The panel only covers the top of the screen, so the page underneath is still
  // clickable — and the header outlives the page, which would otherwise leave the
  // next one with an open menu and a locked scroll.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // At desktop widths the panel is not rendered at all, so a viewport that grows
  // past the breakpoint has to take the scroll lock and the focus trap with it.
  useEffect(() => {
    // Tailwind's xl, and the width app/globals.css hands the root back to the
    // desktop clamp at. All three have to name the same number.
    const desktop = window.matchMedia('(min-width: 1280px)');
    const sync = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    sync();
    desktop.addEventListener('change', sync);
    return () => desktop.removeEventListener('change', sync);
  }, []);

  return (
    // Transparent rather than absent at rest: a border that appears would
    // otherwise add its pixel to the header and nudge the page down.
    <header
      className={`sticky top-0 z-50 border-b bg-paper px-6 transition-colors duration-200 md:px-10 xl:px-28 ${
        scrolled ? 'border-line' : 'border-transparent'
      }`}
    >
      {/*
        The bar and the mark are in pixels while the gutters around them are not.
        Every frame draws this header at one size — the mark measures 156x26 of
        ink on the 1024 tablet and 155x26 on the 1920 desktop — but a rem is 16px
        below the breakpoint and 12px above it, so h-20 drew an 80px bar on a
        phone against a 60px one at 1440: the small screen got the bigger header.
        The gutters keep scaling because they set the header against the sections
        under it, which do the same.
      */}
      <div className="mx-auto flex h-[80px] max-w-content items-center justify-between">
        <div className="flex items-center gap-20">
          <Link href="/" aria-label="Fractalyze">
            <img
              src="/logo/fractalyze-logo-black.svg"
              alt="Fractalyze"
              className="h-[42px] w-auto"
            />
          </Link>
          <nav className="hidden xl:block">
            <ul className="flex items-center gap-6">
              {headerNavLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    // 16px, not the 14px the buttons carry. The two are drawn at
                    // different sizes: the frame's Contact Us button is 132x40
                    // with a 13.75px label, and the desktop nav sits a size above
                    // it.
                    className="flex min-h-6 items-center px-4 py-2 text-body font-medium text-ink transition-opacity hover:opacity-70"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <ContactButton className="hidden xl:inline-flex" />
        {/* The name stays "Menu"; aria-expanded is what carries the state. */}
        <button
          ref={hamburgerRef}
          type="button"
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls={MENU_ID}
          onClick={() => setMenuOpen((value) => !value)}
          className="-mr-2 flex h-10 w-10 items-center justify-center text-ink transition-opacity hover:opacity-70 xl:hidden"
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
      <NavMenu
        id={MENU_ID}
        open={menuOpen}
        onClose={closeMenu}
        triggerRef={hamburgerRef}
      />
    </header>
  );
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden focusable="false">
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <line x1="3" y1="7" x2="21" y2="7" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="17" x2="21" y2="17" />
      </g>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden focusable="false">
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <line x1="5.5" y1="5.5" x2="18.5" y2="18.5" />
        <line x1="18.5" y1="5.5" x2="5.5" y2="18.5" />
      </g>
    </svg>
  );
}
