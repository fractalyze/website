import Image from 'next/image';
import heroImage from '@/assets/images/home/hero.webp';
import {ContactButton} from '@/components/ContactButton';

export function HeroSection() {
  return (
    <section className="bg-paper px-6 py-12 md:px-10 md:py-16 xl:px-section xl:py-20">
      <div className="mx-auto flex max-w-content flex-col items-center gap-8 md:gap-12 xl:gap-20">
        {/* Tablet keeps the two columns the desktop draws — title left, copy and
            the call to action right — and drops the image below them. Mobile
            unstacks that into title, copy, button, image. */}
        <div className="flex w-full flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-10 xl:gap-20">
          {/* Stepped, not inherited: display-1 is 5rem, and the root is pinned at
              16px below 1280 against the 12px it clamps to at 1280, so the
              desktop size would draw 80px on a phone against 60px on a desktop.
              The forced break goes with it — below 1280 the title wraps to the
              column it is given. */}
          <h1 className="font-display text-[2.25rem] uppercase leading-[1.1] text-ink md:text-[2.75rem] xl:shrink-0 xl:whitespace-nowrap xl:text-display-1 xl:leading-[4.5rem]">
            The Computing Layer{' '}
            <br className="hidden xl:inline" />
            for Cryptography
          </h1>
          {/* shrink-0, or the title's max-content basis wins the whole row and
              squeezes this column to 148px on a 768 tablet. */}
          <div className="flex w-full flex-col gap-5 md:w-[18rem] md:shrink-0 xl:w-[24.375rem]">
            <p className="text-body-sm text-ink md:text-body-lg">
              We build, optimize, and operate production cryptography systems — powered by our
              compiler and orchestration stack.
            </p>
            <div>
              <ContactButton variant="solid" className="w-[8.25rem] justify-center" />
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
