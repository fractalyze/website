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
          {/* Stepped, not inherited: the root is pinned at 16px below 1024
              against the 12px it clamps to there, so the desktop size would draw
              its full value on a phone and three quarters of it on a desktop.
              The forced break goes with it — below 1024 the title wraps to the
              column it is given.
              Three lines, and the ampersand ends the first one. What caps the
              type here is the longest line, and the tempting break — the pair
              "CONFIDENTIAL & VERIFIABLE" held together on one line — is the
              expensive one: in Times capitals that string measures 14.55 times
              the font size, so the 697px the row leaves at 1024 would hold no
              more than 47.9px, below what the tablet already draws. Breaking
              after the ampersand costs nothing in reading — a conjunction at the
              end of a line reads as continued, where one at the head of a line
              reads as a new thought.
              With the article carried, "THE CONFIDENTIAL &" is the longest line
              at 10.61 times the font size, ahead of "COMPUTING LAYER" at 9.53.
              That sets the ceiling at 65.7px for the 697px the row leaves at
              1024 and 87.7px for the 930px it leaves at 1920, once the 390px
              copy column and the 80px gap are taken. Both land on the same rem
              value, 5.48, so 5.375rem is the step under it: 64.5px at 1024
              drawing 684px, and 86px at 1920 drawing 912px.
              The tablet clamp is unchanged from the old title, since the step
              across 1024 climbs again rather than falling. Its floor is the
              longest single word, and nothing can break "CONFIDENTIAL", 7.39
              times the font size, which is 310px of the 360px the row leaves at
              768. */}
          <h1 className="font-display text-[2.25rem] uppercase leading-[1.1] text-ink md:text-[clamp(2.625rem,5vw,3.125rem)] xl:shrink-0 xl:whitespace-nowrap xl:text-[5.375rem] xl:leading-[0.9]">
            The Confidential &amp;{' '}
            <br className="hidden xl:inline" />
            Verifiable{' '}
            <br className="hidden xl:inline" />
            Computing Layer
          </h1>
          {/* shrink-0, or the title's max-content basis wins the whole row and
              squeezes this column to 148px on a 768 tablet. */}
          <div className="flex w-full flex-col gap-5 md:w-[18rem] md:shrink-0 xl:w-[24.375rem]">
            {/* The column is a rem width holding pixel type, so it narrows to
                244px at 1024 while the copy stays 18px. */}
            <p className="text-body-sm text-ink md:text-body-lg">
              We build, optimize, and operate production systems powered by ZK, FHE, MPC, and TEE.
            </p>
            <div>
              <ContactButton variant="solid" className="w-[132px] justify-center" />
            </div>
          </div>
        </div>
        <div className="relative h-[12rem] w-full overflow-hidden rounded-[1.25rem] md:h-[18rem] xl:h-[25rem]">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="(min-width: 1280px) 1400px, 100vw"
            className="object-cover"
            placeholder="blur"
          />
        </div>
      </div>
    </section>
  );
}
