import siteMetadata from '@/data/siteMetadata';

type Props = {
  variant?: 'outline' | 'solid';
  className?: string;
};

const variants = {
  outline: 'border border-ink text-ink',
  solid: 'bg-ink text-paper',
};

/**
 * The anchor attributes every Contact Us on the site carries.
 *
 * Returns them ready to spread rather than a flag each caller translates: the
 * noreferrer that has to accompany a _blank is a security detail, and one that
 * is written twice is one that can be corrected in one place only.
 */
export function contactLink() {
  const formUrl = siteMetadata.contactFormUrl;
  if (!formUrl) return {href: `mailto:${siteMetadata.email}`};
  return {href: formUrl, target: '_blank', rel: 'noopener noreferrer'} as const;
}

export function ContactButton({variant = 'outline', className}: Props) {
  return (
    <a
      {...contactLink()}
      className={`inline-flex h-10 items-center rounded-md px-3 text-label font-medium transition-opacity hover:opacity-70 ${variants[variant]} ${className ?? ''}`}
    >
      Contact Us
    </a>
  );
}
