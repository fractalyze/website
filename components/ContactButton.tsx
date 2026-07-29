import Link from 'next/link';

type Props = {
  variant?: 'outline' | 'solid';
  className?: string;
};

const variants = {
  outline: 'border border-ink text-ink',
  solid: 'bg-ink text-paper',
};

export function ContactButton({variant = 'outline', className}: Props) {
  return (
    <Link
      href="/contact"
      className={`inline-flex h-10 items-center rounded-md px-3 text-body-sm font-medium transition-opacity hover:opacity-70 ${variants[variant]} ${className ?? ''}`}
    >
      Contact Us
    </Link>
  );
}
