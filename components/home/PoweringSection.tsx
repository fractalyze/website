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
    <section className="bg-paper px-section py-section">
      <Reveal className="mx-auto flex max-w-content flex-col items-center gap-10">
        <div className="flex max-w-measure flex-col items-center gap-5 text-center">
          <h2 className="font-display text-display-4 text-ink">
            Powering the Next Generation of Cryptography
          </h2>
          <p className="text-body-lg text-ink">
            The next generation of applications will be built on cryptographic computation.
          </p>
        </div>

        <div className="flex w-[62.5rem] max-w-full flex-col gap-20">
          {domains.map((domain, index) => (
            <div key={domain.title} className="flex items-center gap-20">
              <div
                className={`flex w-[28.75rem] flex-col gap-3 ${index % 2 === 1 ? 'order-2' : ''}`}
              >
                <h3 className="text-title-2 font-medium text-ink">{domain.title}</h3>
                <p className="text-body-lg text-ink">{domain.description}</p>
                <ul className="list-disc pl-5 text-body text-ink">
                  {domain.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="relative h-[15rem] w-[28.75rem] overflow-hidden rounded-2xl border border-line">
                <Image
                  src={domain.image}
                  alt=""
                  fill
                  sizes="460px"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
