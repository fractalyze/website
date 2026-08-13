import {Reveal} from '@/components/Reveal';

// One label over all three, which leaves exactly one phrasing available.
//
// "Backed by" and "Supported by" are the conventions for an Inception badge and
// a grant, but both are untrue of a relationship still being discussed.
// "Partners" is the worst of the options rather than the neutral one it looks
// like: Partner is the name of a separate NVIDIA program, the invitation-only
// NPN, whose trademark licence is tied to that agreement, and the Ethereum
// Foundation states as a grant principle that it gives no stamp of approval. A
// row with no label at all reads as customers. "Working with" claims no funding
// and no formal status, so it is the one phrase the whole set can stand under.
//
// Heights are px rather than rem. The desktop root falls to 12px between 1024
// and 1440, so a rem height would draw every mark here a quarter smaller across
// the commonest desktop widths there are.
//
// They differ from each other because the files are not built alike: two are
// bare wordmarks and the third is a framed badge, whose frame has to clear the
// wordmarks for the type inside it to read at the same weight.
const partners = [
  {
    name: 'Ethereum Foundation',
    // The dark of the two variants the Foundation ships. Each bakes its ink into
    // a style attribute rather than currentColor, so the variant is picked for
    // the background it lands on and this band is bg-surface.
    src: '/logo/partners/ef-logo-dark.svg',
    height: 'h-[24px] md:h-[32px]',
    // The only one of the three not already a single black: #26293b is a navy,
    // and at the band's opacity it reads a shade bluer than the other two.
    tone: 'brightness-0',
  },
  {
    name: 'NVIDIA Inception Program',
    // The portal's one-colour file, which is a keyline frame around a white
    // plate rather than bare type, and so takes no filter. It is set taller than
    // the other two because the frame is what gets read at this size and the
    // type inside it is a third of that: the frame is 76.5% of the file's
    // height, leaving a 43px box at the 56px below.
    src: '/logo/partners/nvidia-inception-badge-1c-black.svg',
    height: 'h-[42px] md:h-[56px]',
  },
  {
    name: 'KODA',
    // The green in the shipped mark is a symbol knocked into a black tile, not
    // ink on a ground, so flattening it to black loses the symbol into the tile.
    // Cutting it out with the tile's own evenodd rule does not work either: its
    // three subpaths overlap, and evenodd fills the overlap back in. It is white
    // in this copy, which is what carries a one-colour mark, and takes no filter.
    src: '/logo/partners/koda-mono.svg',
    height: 'h-[18px] md:h-[24px]',
  },
];

export function WorkingWithSection() {
  return (
    // A band, not a section: rules top and bottom, and only enough padding to
    // clear the tallest mark.
    <section className="gutter border-y border-line bg-surface py-5 md:py-6">
      <Reveal className="mx-auto flex max-w-content flex-col items-center gap-3 md:gap-4">
        {/* Set as an eyebrow rather than at a heading size. Every other h2 on
            the page is display type at text-title-2 and up, so the same words in
            the body face at text-caption read as a heading that had lost its
            scale. Caps and the tracking that caps need make it a label. */}
        <h2 className="text-micro uppercase tracking-[0.14em] text-subtle">Working with</h2>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-14">
          {partners.map((partner) => (
            <li key={partner.name}>
              {/* block, because an inline image sits on the text baseline and
                  carries the descender gap under it. Three marks of three
                  heights then each stand on a different amount of that gap,
                  which is what threw the row out of line.

                  Raw <img> rather than next/image, which cannot optimize an SVG
                  and all three of these are one.

                  One tone across the row, black at the opacity below, which
                  lands it on the same grey as text-muted. grayscale would not
                  have done it: it maps each mark's own hues and leaves three
                  different greys. Two of the files are already black, so only
                  the third carries a filter. */}
              <img
                src={partner.src}
                alt={partner.name}
                className={`${partner.height} ${partner.tone ?? ''} block w-auto opacity-60`}
              />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
