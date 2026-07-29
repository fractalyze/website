import Link from 'next/link';
import headerNavLinks from '@/data/headerNavLinks';
import {ContactButton} from './ContactButton';

export function Header() {
  return (
    <header className="bg-paper px-28">
      <div className="mx-auto flex h-20 max-w-content items-center justify-between">
        <div className="flex items-center gap-20">
          <Link href="/" aria-label="Fractalyze">
            <img src="/logo/Fractalyze-logo-b.svg" alt="Fractalyze" className="h-[26px] w-auto" />
          </Link>
          <nav>
            <ul className="flex items-center gap-6">
              {headerNavLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="block px-4 py-2 text-body font-medium text-ink transition-opacity hover:opacity-70"
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
