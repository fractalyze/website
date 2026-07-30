import {Reveal} from '@/components/Reveal';

export function ProductionGapSection() {
  return (
    <section className="bg-ink px-6 py-16 md:px-10 md:py-20 xl:px-section xl:py-section">
      <Reveal className="mx-auto flex max-w-[75rem] flex-col items-center gap-4 text-center md:gap-5">
        <h2 className="font-display text-title-2 text-paper md:text-title-1 xl:text-display-4">
          The Production Gap
        </h2>
        <p className="text-body-sm text-paper md:text-body-lg">
          Advanced cryptography is moving from research into production, powering privacy,
          verifiability, and secure collaboration in modern systems.{' '}
          {/* The break is the desktop line the copy was written to; below 1280 the
              paragraph is narrow enough that forcing it only strands a short line. */}
          <br className="hidden xl:inline" />
          But it is still out of reach for most teams: the computation is orders of magnitude too
          heavy, the systems are hand built by a small pool of specialists, and the road from
          prototype to production takes years.
        </p>
      </Reveal>
    </section>
  );
}
