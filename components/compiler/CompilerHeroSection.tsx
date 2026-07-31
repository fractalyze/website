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
              16px below 1280, so the desktop size would draw 72px on a phone
              against 54px on a desktop. The forced break goes with it — below
              1280 the title wraps to the column it is given. */}
          <h1 className="font-display text-[2.25rem] uppercase leading-[1.1] text-ink md:text-[2.75rem] xl:text-display-2 xl:leading-[4.95rem]">
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
            className="inline-flex h-10 w-fit items-center gap-1 rounded-md bg-ink px-3 text-label font-medium text-paper transition-opacity hover:opacity-70"
          >
            Awesome Zorch
            <ArrowTailIcon />
          </a>
        </div>
        <div className="relative h-[12rem] w-full overflow-hidden rounded-[1.25rem] md:h-[16rem] md:w-[45%] md:shrink-0 xl:h-[25rem] xl:w-[31.625rem]">
          <Image
            src={compilerHero}
            alt=""
            fill
            priority
            sizes="(min-width: 1280px) 506px, (min-width: 768px) 45vw, 100vw"
            className="object-cover"
            placeholder="blur"
          />
        </div>
      </div>
    </section>
  );
}
