import {Reveal} from '@/components/Reveal';

export function ProductionGapSection() {
  return (
    <section className="bg-ink gutter py-16 md:py-20 xl:py-section">
      <Reveal className="mx-auto flex max-w-[75rem] flex-col items-center gap-4 text-center md:gap-5">
        <h2 className="font-display text-title-2 text-paper md:text-title-1 xl:text-display-4">
          The Production Gap
        </h2>
        {/* Two sentences, two blocks. The pivot on "But" is the whole point of
            the section, and a paragraph break carries it at every width — the
            forced line break it replaces only held above about 1830px. The
            column is narrower than the section because 75rem of 18px type runs
            past 110 characters a line at 1920. */}
        <div className="flex max-w-measure flex-col gap-3 text-balance text-body-sm text-paper md:text-body-lg">
          <p>
            Advanced cryptography is moving from research into production, powering privacy,
            verifiability, and secure collaboration in modern systems.
          </p>
          <p>
            But it is still out of reach for most teams: the computation is orders of magnitude too
            heavy, the systems are hand built by a small pool of specialists, and the road from
            prototype to production takes years.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
