import Image from 'next/image';
import confidentialFinance from '@/assets/images/home/domain-confidential-finance.webp';
import aiInfrastructure from '@/assets/images/home/domain-ai-infrastructure.webp';
import digitalIdentity from '@/assets/images/home/domain-digital-identity.webp';
import secureCollaboration from '@/assets/images/home/domain-secure-collaboration.webp';
import {Reveal} from '@/components/Reveal';

const domains = [
  {
    title: 'Confidential Finance',
    description:
      'Privacy-preserving financial systems for institutions, markets, and everyday users.',
    items: ['Stablecoins & Payments', 'RWA & Tokenization', 'KYC & Compliance', 'Institutional DeFi'],
    image: confidentialFinance,
  },
  {
    title: 'AI Infrastructure',
    description: 'Build private, verifiable, and trustworthy AI and agent systems at scale.',
    items: ['Private AI & Inference', 'Verifiable AI', 'Autonomous Agents', 'AI Workflows'],
    image: aiInfrastructure,
  },
  {
    title: 'Digital Identity',
    description: 'Secure identity, credentials, and access control for the digital world.',
    items: [
      'Identity & Credentials',
      'Access Control',
      'KYC & Onboarding',
      'Privacy-Preserving Verification',
    ],
    image: digitalIdentity,
  },
  {
    title: 'Secure Collaboration',
    description:
      'Enable privacy-preserving collaboration and data workflows across organizations.',
    items: [
      'Cross-Company Analytics',
      'Secure Data Sharing',
      'Joint Computation',
      'Multi-Party Workflows',
    ],
    image: secureCollaboration,
  },
];

export function PoweringSection() {
  return (
    <section className="bg-paper gutter py-16 md:py-20 xl:py-section">
      <Reveal className="mx-auto flex max-w-content flex-col items-center gap-8 md:gap-10">
        <div className="flex max-w-measure flex-col items-center gap-4 text-center md:gap-5">
          {/* The four domains below never mentioned cryptography; only the
              heading and this line did, and they framed the section as what the
              compiler makes possible. Naming what we build instead lets the same
              four read as customer problems, which is what the rest of the page
              now says we take on. The line holds one row at every width the
              measure is drawn at: 68 characters against the 75 it holds at 1024,
              where it is narrowest relative to the type. */}
          <h2 className="font-display text-title-2 text-ink md:text-title-1 xl:text-display-4">
            What We Build
          </h2>
          <p className="text-body-sm text-ink md:text-body-lg">
            Where confidential and verifiable systems are going into production.
          </p>
        </div>

        <div className="flex w-full flex-col gap-12 md:gap-16 xl:w-[62.5rem] xl:max-w-full xl:gap-20">
          {domains.map((domain, index) => (
            <div
              key={domain.title}
              className="flex flex-col gap-5 md:flex-row md:items-center md:gap-10 xl:gap-20"
            >
              {/* The alternation is a two-column effect, so it only starts where
                  there are two columns. Stacked, every pair reads text then image. */}
              <div
                className={`flex w-full flex-col gap-3 md:flex-1 xl:w-[28.75rem] xl:flex-none ${
                  index % 2 === 1 ? 'md:order-2' : ''
                }`}
              >
                <h3 className="text-title-3 font-medium text-ink md:text-title-2">{domain.title}</h3>
                <p className="text-body-sm text-ink md:text-body-lg">{domain.description}</p>
                <ul className="list-disc pl-5 text-body-sm text-ink md:text-body">
                  {domain.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="relative aspect-[460/240] w-full overflow-hidden rounded-2xl border border-line md:flex-1 xl:aspect-auto xl:h-[15rem] xl:w-[28.75rem] xl:flex-none">
                <Image
                  src={domain.image}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 460px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  placeholder="blur"
                />
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
