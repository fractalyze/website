import Image from 'next/image';
import siteMetadata from '@/data/siteMetadata';
import {ArrowTailIcon} from '@/components/icons/CompilerIcons';

export function CompilerHeroSection() {
  return (
    <section className="bg-paper px-section py-20">
      <div className="mx-auto flex max-w-content items-center justify-between gap-40">
        <div className="flex flex-col gap-6">
          <h1 className="font-display text-display-2 uppercase text-ink">
            A Compiler Built
            <br />
            for Cryptography
          </h1>
          <p className="text-body-lg text-ink">
            Build cryptographic applications in Python. Compile them into highly optimized
            execution for modern hardware.
          </p>
          <a
            href={siteMetadata.zorchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-fit items-center gap-1 rounded-md bg-ink px-3 text-body-sm font-medium text-paper transition-opacity hover:opacity-70"
          >
            Awesome Zorch
            <ArrowTailIcon />
          </a>
        </div>
        <div className="relative h-[25rem] w-[31.625rem] shrink-0 overflow-hidden rounded-[1.25rem]">
          <Image
            src="/images/compiler/hero.webp"
            alt=""
            fill
            priority
            sizes="506px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
