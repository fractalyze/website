import Image from 'next/image';

const engagements = [
  {
    title: 'Build',
    description:
      'We design and build next generation cryptographic systems with your team, from proving systems to private AI and beyond. We cover everything from architecture to implementation.',
    image: '/images/home/working-build.webp',
  },
  {
    title: 'Optimize',
    description:
      'We dig into your existing ZK, FHE, MPC and cryptographic workloads and rebuild their performance with our compiler stack and hardware acceleration.',
    image: '/images/home/working-optimize.webp',
  },
  {
    title: 'Operate',
    description:
      'We stay with the system after launch. We run it, improve it, and scale it in production as your workload grows.',
    image: '/images/home/working-operate.webp',
  },
];

export function WorkingWithUsSection() {
  return (
    <section className="bg-surface px-section py-section">
      <div className="mx-auto flex max-w-content flex-col items-center gap-10">
        <div className="flex max-w-measure flex-col items-center gap-5 text-center">
          <h2 className="font-display text-display-4 text-ink">Working With Us</h2>
          <p className="text-body-lg text-ink">
            Building production cryptography takes more than software.
            <br />
            Our engineers work as part of your team, from first design to live operations
          </p>
        </div>

        <div className="grid w-full grid-cols-3 gap-5">
          {engagements.map((engagement) => (
            <article
              key={engagement.title}
              className="overflow-hidden rounded-2xl border border-line bg-paper"
            >
              <div className="relative h-[240px] w-full">
                <Image
                  src={engagement.image}
                  alt=""
                  fill
                  sizes="453px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-4 p-8">
                <h3 className="text-title-3 font-medium text-ink">{engagement.title}</h3>
                <p className="text-body-sm text-ink">{engagement.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
