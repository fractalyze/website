import siteMetadata from '@/data/siteMetadata';
import {GitHubIcon, LinkedInIcon, XIcon} from './icons/SocialIcons';

const socialIcons = [
  {key: 'linkedin', label: 'LinkedIn', Icon: LinkedInIcon},
  {key: 'x', label: 'X', Icon: XIcon},
  {key: 'github', label: 'GitHub', Icon: GitHubIcon},
] as const;

export function Footer() {
  const social = socialIcons.map((entry) => ({
    ...entry,
    href: siteMetadata.social?.[entry.key] ?? '',
  }));

  return (
    <footer className="bg-paper px-section py-20">
      <div className="mx-auto flex max-w-content flex-col gap-8">
        <ul className="flex items-center gap-5 text-subtle">
          {social.map(({key, label, Icon, href}) =>
            href ? (
              <li key={key}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="block transition-colors hover:text-ink"
                >
                  <Icon />
                </a>
              </li>
            ) : (
              <li key={key} aria-hidden>
                <Icon />
              </li>
            )
          )}
        </ul>

        <div className="flex flex-col gap-2 border-t border-line py-5">
          <a
            href={`mailto:${siteMetadata.email}`}
            className="text-body-sm text-muted transition-colors hover:text-ink"
          >
            {siteMetadata.email}
          </a>
          <p className="text-caption text-muted">
            Copyright © 2026 Fractalyze. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
