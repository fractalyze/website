import Image from 'next/image';
import heroImage from '@/assets/images/home/hero.webp';
import {ContactButton} from '@/components/ContactButton';

export function HeroSection() {
  return (
    <section className="bg-paper gutter py-12 md:py-16 xl:py-20">
      <div className="mx-auto flex max-w-content flex-col items-center gap-8 md:gap-12 xl:gap-20">
        {/* Tablet keeps the two columns the desktop draws — title left, copy and
            the call to action right — and drops the image below them. Mobile
            unstacks that into title, copy, button, image. */}
        {/* Top-aligned, not centred, at every width. The frame sets the title
            and the copy on the same line — 173px and 167px from the top of the
            1024 canvas — and at 1920 centring happens to land them 1px apart,
            which is why it read as correct. It does not hold anywhere else: the
            button is pinned at 40px while the rest of the column scales with the
            root, so the copy column grows proportionally taller as the desktop
            narrows and centring lifts it 4px above the title at 1440 and 7px at
            1024. */}
        <div className="flex w-full flex-col items-start gap-6 md:flex-row md:justify-between md:gap-10 xl:gap-20">
          {/* Stepped, not inherited: display-1 is 5rem, and the root is pinned at
              16px below 1024 against the 12px it clamps to there, so the desktop
              size would draw 80px on a phone against 60px on a desktop. The
              forced break goes with it — below 1024 the title wraps to the
              column it is given.
              The two lines hold at every desktop width because the root scales
              with the viewport there: the title is 11.63 times the font size
              wide, and the column it sits in scales by the same factor.
              The tablet size is bounded at both ends, which is why it is a
              clamp rather than a number. The frame draws 64px, but it draws
              mixed case: in capitals the same string runs 11.63 times the font
              size rather than 8.89, so 64px would want 744px of the 615px the
              row leaves at 1023 — 51.6px is the largest that still holds the
              two lines the frame draws, and 3.125rem sits under it. The floor
              is the wrap at 768, where the row leaves the title 360px: at 42px
              "THE COMPUTING" comes to 352 and the title breaks three ways, and
              at 44px it comes to 370 and breaks four, stranding "THE" on a line
              of its own. Below that the ceiling is a single word — nothing can
              break "CRYPTOGRAPHY", 7.98 times the font size, so past 45px it
              pushes the copy column into the gutter. */}
          <h1 className="font-display text-[2.25rem] uppercase leading-[1.1] text-ink md:text-[clamp(2.625rem,5vw,3.125rem)] xl:shrink-0 xl:whitespace-nowrap xl:text-display-1 xl:leading-[4.5rem]">
            The Computing Layer{' '}
            <br className="hidden xl:inline" />
            for Cryptography
          </h1>
          {/* shrink-0, or the title's max-content basis wins the whole row and
              squeezes this column to 148px on a 768 tablet. */}
          <div className="flex w-full flex-col gap-5 md:w-[18rem] md:shrink-0 xl:w-[24.375rem]">
            {/* The column is a rem width holding pixel type, so it narrows to
                244px at 1024 while the copy stays 18px. The 114-character line
                this replaces ran to five rows there against a two-row title. */}
            <p className="text-body-sm text-ink md:text-body-lg">
              We build, optimize, and operate production cryptography systems.
            </p>
            <div>
              <ContactButton variant="solid" className="w-[132px] justify-center" />
            </div>
          </div>
        </div>
        <div className="relative h-[12rem] w-full overflow-hidden rounded-[1.25rem] md:h-[18rem] xl:h-[25rem]">
          <Image src={heroImage} alt="" fill priority sizes="(min-width: 1280px) 1400px, 100vw"
            className="object-cover" placeholder="blur" />
        </div>
      </div>
    </section>
  );
}
