import Image from 'next/image';
import buildImage from '@/assets/images/home/working-build.webp';
import optimizeImage from '@/assets/images/home/working-optimize.webp';
import operateImage from '@/assets/images/home/working-operate.webp';
import {Reveal} from '@/components/Reveal';

const engagements = [
  {
    title: 'Build',
    // The technology choice is ours to make, not the customer's to arrive with.
    // That is the whole claim of this card, so it leads rather than trailing the
    // list of what we can build.
    description:
      'We design the right architecture and build production systems using ZK, FHE, MPC, TEE, or a combination of them, from proving systems to private AI and beyond.',
    image: buildImage,
  },
  {
    title: 'Optimize',
    description:
      'We dig into your existing confidential and verifiable workloads and rebuild their performance with our compiler stack and hardware acceleration.',
    image: optimizeImage,
  },
  {
    title: 'Operate',
    description:
      'We stay with the system after launch. We run it, improve it, and scale it in production as your workload grows.',
    image: operateImage,
  },
];

export function WorkingWithUsSection() {
  return (
    <section className="bg-surface gutter py-16 md:py-20 xl:py-section">
      <Reveal className="mx-auto flex max-w-content flex-col items-center gap-8 md:gap-10">
        <div className="flex max-w-measure flex-col items-center gap-4 text-center md:gap-5">
          <h2 className="font-display text-title-2 text-ink md:text-title-1 xl:text-display-4">
            Working With Us
          </h2>
          <p className="text-balance text-body-sm text-ink md:text-body-lg">
            Building confidential and verifiable systems takes more than software. Our engineers
            work as part of your team, from first design to live operations.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
          {engagements.map((engagement) => (
            <article
              key={engagement.title}
              className="overflow-hidden rounded-2xl border border-line bg-paper"
            >
              {/* A ratio rather than a height until the card is the known 453px
                  wide the desktop grid gives it: one fixed height crops a
                  different part of the art at every width in between. */}
              <div className="relative aspect-[15/8] w-full xl:aspect-auto xl:h-[15rem]">
                <Image
                  src={engagement.image}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 453px, (min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                  placeholder="blur"
                />
              </div>
              <div className="flex flex-col gap-4 p-6 xl:p-8">
                <h3 className="text-title-4 font-medium text-ink md:text-title-3">
                  {engagement.title}
                </h3>
                <p className="text-body-sm text-ink">{engagement.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
