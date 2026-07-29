import Image from 'next/image';
import {ContactButton} from '@/components/ContactButton';

export function HeroSection() {
  return (
    <section className="bg-paper px-section py-20">
      <div className="mx-auto flex max-w-content flex-col items-center gap-20">
        <div className="flex w-full items-center gap-20">
          <h1 className="flex-1 font-display text-display-1 uppercase text-ink">
            The Computing Layer
            <br />
            for Cryptography
          </h1>
          <div className="flex w-[390px] flex-col gap-5">
            <p className="text-body-lg text-ink">
              We build, optimize, and operate production cryptography systems — powered by our
              compiler and orchestration stack.
            </p>
            <div>
              <ContactButton variant="solid" />
            </div>
          </div>
        </div>
        <div className="relative h-[400px] w-full overflow-hidden rounded-[20px]">
          <Image
            src="/images/home/hero.webp"
            alt=""
            fill
            priority
            sizes="1400px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
