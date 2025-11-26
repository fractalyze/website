import Link from 'next/link';
import {ThemeSwitch} from './ThemeSwitch';
import headerNavLinks from '@/data/headerNavLinks';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-black/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <Link href="/" aria-label="Fractalyze">
            <div className="flex items-center">
              <img
                src="/logo/Fractalyze-logo-b.svg"
                alt="Fractalyze"
                className="h-6 dark:hidden"
              />
              <img
                src="/logo/Fractalyze-logo-w.svg"
                alt="Fractalyze"
                className="hidden h-6 dark:block"
              />
            </div>
          </Link>
        </div>
        <div className="flex items-center space-x-4 sm:space-x-6">
          <nav className="hidden sm:block">
            <ul className="flex space-x-6">
              {headerNavLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
