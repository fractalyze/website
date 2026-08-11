import type {Metadata} from 'next';
import {DM_Mono} from 'next/font/google';
import './globals.css';
import 'katex/dist/katex.min.css';
import {Header} from '@/components/Header';
import {Footer} from '@/components/Footer';
import siteMetadata from '@/data/siteMetadata';
import {Analytics} from '@vercel/analytics/next';

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
});

// Share cards are drawn at 1200x630, which no cover in the library reaches —
// they are cut to 906x400 for the slot they occupy on a listing. This one is
// cut from the home hero for the card and nothing else. JPEG because a handful
// of crawlers still refuse webp, and a card that renders beats a smaller file.
const SOCIAL_IMAGE = '/images/og.jpg';

export const metadata: Metadata = {
  // Every relative URL below, and in each page's own metadata, is resolved
  // against this — which is also what lets a page declare its canonical as a
  // path rather than repeating the domain.
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  alternates: {canonical: '/'},
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: '/',
    siteName: siteMetadata.title,
    locale: siteMetadata.locale,
    type: 'website',
    images: [SOCIAL_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [SOCIAL_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={siteMetadata.language}>
      <head>
        {/* Only the Latin subset is on every page. Fetching it alongside the
            stylesheet rather than after it parses is what stops the reflow when
            the webfont replaces the fallback. */}
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/pretendard/PretendardVariable.subset.91.woff2"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="/fonts/pretendard/pretendard.css" />
        {/* Code blocks only, and deliberately not preloaded: the declaration
            costs one stylesheet, while the woff2 itself is fetched only once a
            page actually renders a glyph in its ranges. Most pages have no code
            block and never pay for it. */}
        <link rel="stylesheet" href="/fonts/jetbrains-mono/jetbrains-mono.css" />
      </head>
      <body className={`${dmMono.variable} font-sans`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
