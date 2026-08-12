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
            past 110 characters a line at 1920.
            The two blocks are written to the same length, 123 and 141
            characters, and that is what keeps the shape rectangular. Balanced
            wrapping makes the lines within a block equal, so the block's shape
            is set by how many lines it has: a one-line opening over a
            three-line body reads as a wedge however even each line is. At these
            lengths both blocks take two lines and hold them at every width the
            measure is drawn at — 99 characters a line at 1920, 75 at 1024 where
            56rem of a 12px root meets 18px copy that does not scale, and 78 at
            768. */}
        <div className="flex max-w-measure flex-col gap-3 text-balance text-body-sm text-paper md:text-body-lg">
          {/* The tail names domains rather than properties. Following the
              category with what it powers made the sentence define itself:
              "verifiable computing" powering "verifiability", "confidential"
              powering "privacy". The old sentence escaped that only because its
              subject was "advanced cryptography", a different word from
              anything in its list. Domains carry the same weight without the
              echo, and they are the four the use-case section goes on to
              open. */}
          <p>
            Confidential and verifiable computing is moving from research into production, across
            finance, AI infrastructure, and digital identity.
          </p>
          <p>
            But building these systems takes specialized expertise across cryptography, secure
            computing, performance engineering, and infrastructure.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
