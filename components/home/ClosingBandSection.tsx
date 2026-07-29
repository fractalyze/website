import Image from 'next/image';
import bandImage from '@/assets/images/home/cta-band.webp';
import {Reveal} from '@/components/Reveal';

export function ClosingBandSection() {
  return (
    <section className="relative isolate px-section py-section">
      <Image
        src={bandImage}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <Reveal className="mx-auto flex max-w-measure flex-col items-center gap-5 text-center">
        <img src="/logo/fractalyze-logo-white.svg" alt="Fractalyze" className="h-[2.5rem] w-auto" />
        <h2 className="font-display text-display-3 text-paper">Cryptography replaces trust</h2>
        <p className="text-body text-paper">
          Fractalyze transforms trust-based digital systems into cryptographically verifiable
          infrastructure.
        </p>
      </Reveal>
    </section>
  );
}
