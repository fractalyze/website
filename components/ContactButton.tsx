import siteMetadata from '@/data/siteMetadata';

type Props = {
  variant?: 'outline' | 'solid';
  className?: string;
};

const variants = {
  outline: 'border border-ink text-ink',
  solid: 'bg-ink text-paper',
};

export function ContactButton({variant = 'outline', className}: Props) {
  const formUrl = siteMetadata.contactFormUrl;
  const href = formUrl || `mailto:${siteMetadata.email}`;

  return (
    <a
      href={href}
      {...(formUrl && {target: '_blank', rel: 'noopener noreferrer'})}
      className={`inline-flex h-10 items-center rounded-md px-3 text-label font-medium transition-opacity hover:opacity-70 ${variants[variant]} ${className ?? ''}`}
    >
      Contact Us
    </a>
  );
}
