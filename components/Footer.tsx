import Link from 'next/link';
import siteMetadata from '@/data/siteMetadata';
import headerNavLinks from '@/data/headerNavLinks';
import {InstagramIcon, LinkedInIcon, XIcon, YouTubeIcon} from './icons/SocialIcons';

const socialIcons = [
  {key: 'instagram', label: 'Instagram', Icon: InstagramIcon},
  {key: 'linkedin', label: 'LinkedIn', Icon: LinkedInIcon},
  {key: 'x', label: 'X', Icon: XIcon},
  {key: 'youtube', label: 'YouTube', Icon: YouTubeIcon},
] as const;

export function Footer() {
  const social = socialIcons
    .map((entry) => ({...entry, href: siteMetadata.social?.[entry.key] ?? ''}))
    .filter((entry) => entry.href);

  return (
    <footer className="bg-paper px-section py-20">
      <div className="mx-auto flex max-w-content flex-col gap-8">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Fractalyze">
            <img src="/logo/Fractalyze-logo-b.svg" alt="Fractalyze" className="h-[18px] w-auto" />
          </Link>
          <nav>
            <ul className="flex items-center gap-5">
              {headerNavLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-body font-semibold text-ink/80 transition-opacity hover:opacity-70"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {social.length > 0 && (
          <ul className="flex items-center gap-5">
            {social.map(({key, label, Icon, href}) => (
              <li key={key}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="block text-subtle transition-colors hover:text-ink"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-col gap-2 border-t border-line py-5">
          <a
            href={`mailto:${siteMetadata.email}`}
            className="text-body-sm text-muted transition-colors hover:text-ink"
          >
            Contact@fractalyze.io
          </a>
          <p className="text-caption text-muted">
            Copyright © 2026 Fractalyze. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
