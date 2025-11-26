import Link from 'next/link';
import siteMetadata from '@/data/siteMetadata';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <img
              src="/logo/Fractalyze-logo-b.svg"
              alt="Fractalyze"
              className="h-5 dark:hidden"
            />
            <img
              src="/logo/Fractalyze-logo-w.svg"
              alt="Fractalyze"
              className="hidden h-5 dark:block"
            />
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {siteMetadata.description}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 text-sm text-gray-600 dark:text-gray-400 sm:items-end">
            <div>© 2028 Fractalyze</div>
            <Link
              href={`mailto:${siteMetadata.email}`}
              className="hover:text-primary-600 dark:hover:text-primary-400"
            >
              {siteMetadata.email}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
