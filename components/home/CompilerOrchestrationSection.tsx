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
    <section className="bg-ink px-section py-section">
      <div className="mx-auto flex max-w-content flex-col items-center gap-10">
        <div className="flex max-w-measure flex-col items-center gap-5 text-center">
          <h2 className="font-display text-display-4 text-paper">Compiler &amp; Orchestration</h2>
          <p className="text-body-lg text-paper">
            A unified platform that automatically transforms high-level cryptographic applications
            <br />
            into optimized execution for any target hardware.
          </p>
        </div>

        <div className="grid w-full grid-cols-2 gap-5">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-8"
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-title-3 font-medium text-ink">{pillar.title}</h3>
                <p className="text-body text-ink">{pillar.description}</p>
              </div>
              <ol className="flex flex-col gap-1">
                {pillar.capabilities.map((capability, index) => (
                  <li
                    key={capability.title}
                    className="flex gap-2 rounded-lg border border-line bg-paper p-5"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center p-1">
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-ink text-caption font-medium text-paper">
                        {index + 1}
                      </span>
                    </span>
                    <div className="flex flex-col">
                      <h4 className="text-title-4 font-medium leading-[1.875rem] text-ink">
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
      </div>
    </section>
  );
}
