import {Reveal} from '@/components/Reveal';

const pillars = [
  {
    title: 'FRX Compiler',
    description:
      'Optimizes cryptographic applications end to end and targets the right hardware automatically.',
    capabilities: [
      {
        title: 'Python-First Development',
        description: 'Build cryptographic applications in familiar Python.',
      },
      {
        title: 'Cryptography-Aware Compilation',
        description: 'Optimize using finite-field semantics and domain-specific compiler passes.',
      },
      {
        title: 'Hardware-Aware Code Generation',
        description: 'Generate optimized execution for CPUs, GPUs, and future accelerators.',
      },
      {
        title: 'One Stack for All of Cryptography',
        description: 'One compiler stack for ZK, FHE, and MPC built on the same underlying math.',
      },
    ],
  },
  {
    title: 'FRX Orchestration',
    description:
      'The distributed-systems stack hyperscale computing runs on, brought to cryptographic proving.',
    capabilities: [
      {
        title: 'Two-Layer Scheduling',
        description: 'Service-level SLAs and compute placement, optimized as separate layers.',
      },
      {
        title: 'Hardware-Agnostic',
        description: 'One proving service across CPU, GPU, and FPGA on any cloud.',
      },
      {
        title: 'Elastic Autoscaling',
        description: 'Scale from zero to N with demand. No idle GPU burning cost.',
      },
      {
        title: 'Fault-Tolerant by Design',
        description: 'Retries, lineage recovery, and checkpointing keep proofs alive.',
      },
    ],
  },
];

export function CompilerOrchestrationSection() {
  return (
    <section className="bg-ink gutter py-16 md:py-20 xl:py-section">
      <Reveal className="mx-auto flex max-w-content flex-col items-center gap-8 md:gap-10">
        <div className="flex max-w-measure flex-col items-center gap-4 text-center md:gap-5">
          <h2 className="font-display text-title-2 text-paper md:text-title-1 xl:text-display-4">
            Compiler &amp; Orchestration
          </h2>
          <p className="text-body-sm text-paper md:text-body-lg">
            Two layers do the work: a compiler that turns Python into hardware-specific execution,
            and orchestration that runs it across a fleet of CPUs, GPUs, and FPGAs.
          </p>
        </div>

        {/* The two pillars stack below the desktop breakpoint: each one is a
            numbered list four rows deep, and half a tablet is not a column. */}
        <div className="grid w-full grid-cols-1 gap-5 xl:grid-cols-2">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5 md:p-8"
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-title-4 font-medium text-ink md:text-title-3">{pillar.title}</h3>
                <p className="text-body-sm text-ink md:text-body">{pillar.description}</p>
              </div>
              <ol className="flex flex-col gap-1">
                {pillar.capabilities.map((capability, index) => (
                  <li
                    key={capability.title}
                    className="flex gap-2 rounded-lg border border-line bg-paper p-4 md:p-5"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center p-1">
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-ink text-caption font-medium text-paper">
                        {index + 1}
                      </span>
                    </span>
                    {/* min-w-0, or "Cryptography-Aware Compilation" sets a floor
                        the row cannot shrink under and the card runs off a phone. */}
                    <div className="flex min-w-0 flex-col">
                      <h4 className="text-body-lg font-medium leading-tight text-ink md:text-title-4 md:leading-[1.875rem]">
                        {capability.title}
                      </h4>
                      <p className="text-body-sm text-ink">{capability.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
