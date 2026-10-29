import siteMetadata from '@/data/siteMetadata';
import {SocialLinks} from './icons/SocialIcons';

export function Footer() {
  return (
    // px-section is 6.25rem, which the 16px root below the desktop breakpoint
    // makes 100px a side — a third of a 360px screen gone to gutters, under a
    // page whose own gutters are 24px.
    <footer className="bg-paper gutter py-12 md:py-16 xl:py-20">
      <div className="mx-auto flex max-w-content flex-col gap-8">
        <SocialLinks hrefs={siteMetadata.social} className="gap-5" />

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
