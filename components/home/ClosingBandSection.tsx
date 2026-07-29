import Image from 'next/image';

export function ClosingBandSection() {
  return (
    <section className="relative isolate px-section py-section">
      <Image
        src="/images/home/cta-band.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="mx-auto flex max-w-measure flex-col items-center gap-5 text-center">
        <img src="/logo/Fractalyze-logo-w.svg" alt="Fractalyze" className="h-[25px] w-auto" />
        <h2 className="font-display text-display-3 text-paper">Cryptography replaces trust</h2>
        <p className="text-body text-paper">
          Fractalyze transforms trust-based digital systems into cryptographically verifiable
          infrastructure.
        </p>
      </div>
    </section>
  );
}
