import Image from 'next/image';
import compilerHero from '@/assets/images/compiler/hero.webp';
import siteMetadata from '@/data/siteMetadata';
import {ArrowTailIcon} from '@/components/icons/CompilerIcons';

export function CompilerHeroSection() {
  return (
    <section className="bg-paper px-6 py-12 md:px-10 md:py-16 xl:px-section xl:py-20">
      {/* Tablet keeps the desktop's two columns, narrowing the image rather than
          dropping it; mobile stacks title, copy, button, image. */}
      <div className="mx-auto flex max-w-content flex-col items-start gap-8 md:flex-row md:items-center md:justify-between md:gap-10 xl:gap-40">
        <div className="flex flex-col gap-5 md:gap-6">
          {/* Stepped, not inherited: display-2 is 4.5rem against a root pinned at
              16px below 1024, so the desktop size would draw 72px on a phone
              against 54px on a desktop. The forced break goes with it — below
              1024 the title wraps to the column it is given.
              The tablet ceiling is the frame's own size: it draws 48px, which
              in capitals puts "FOR CRYPTOGRAPHY" at 489px inside the 507px the
              row leaves at 1023. The floor is the 768 end, where "CRYPTOGRAPHY"
              cannot break and 42px is the most that clears the gutter. */}
          <h1 className="font-display text-[2.25rem] uppercase leading-[1.1] text-ink md:text-[clamp(2.625rem,5vw,3rem)] xl:text-display-2 xl:leading-[4.95rem]">
            A Compiler Built{' '}
            <br className="hidden xl:inline" />
            for Cryptography
          </h1>
          <p className="text-body-sm text-ink md:text-body-lg">
            Build cryptographic applications in Python. Compile them into highly optimized
            execution for modern hardware.
          </p>
          <a
            href={siteMetadata.zorchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[40px] w-fit items-center gap-1 rounded-[6px] bg-ink px-[12px] text-label font-medium text-paper transition-opacity hover:opacity-70"
          >
            Awesome Zorch
            <ArrowTailIcon />
          </a>
        </div>
        {/* Sized off the frames rather than guessed. The tablet frame draws the
            image 412x400 in a 980px content width, so it holds that ratio at
            42% of the row instead of a fixed height, which at 768 would leave a
            portrait crop of a landscape photograph. The phone frame draws it
            320x242 on a 360 canvas, which is the 15rem. */}
        <div className="relative h-[15rem] w-full overflow-hidden rounded-[1.25rem] md:h-auto md:w-[42%] md:shrink-0 md:aspect-[412/400] xl:aspect-auto xl:h-[25rem] xl:w-[31.625rem]">
          <Image
            src={compilerHero}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 506px, (min-width: 768px) 42vw, 100vw"
            className="object-cover"
            placeholder="blur"
          />
        </div>
      </div>
    </section>
  );
}
