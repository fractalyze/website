import Image from 'next/image';
import bandImage from '@/assets/images/home/cta-band.webp';
import {Reveal} from '@/components/Reveal';

export function ClosingBandSection() {
  return (
    <section className="relative isolate gutter py-16 md:py-20 xl:py-section">
      <Image
        src={bandImage}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover"
        placeholder="blur"
      />
      <Reveal className="mx-auto flex max-w-measure flex-col items-center gap-4 text-center md:gap-5">
        {/* The mark scales by its height, and 2.5rem is 40px below the desktop
            breakpoint against the 30px it draws at 1280. */}
        <img
          src="/logo/fractalyze-logo-white.svg"
          alt="Fractalyze"
          className="h-[1.75rem] w-auto md:h-[2.25rem] xl:h-[2.5rem]"
        />
        <h2 className="font-display text-title-1 text-paper md:text-display-4 xl:text-display-3">
          Cryptography replaces trust
        </h2>
        <p className="text-body-sm text-paper md:text-body">
          Fractalyze transforms trust-based digital systems into cryptographically verifiable
          infrastructure.
        </p>
      </Reveal>
    </section>
  );
}
