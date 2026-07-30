import {
  AsteriskIcon,
  NestedSquaresIcon,
  OrbitIcon,
  StackedPlanesIcon,
} from '@/components/icons/CompilerIcons';
import {Reveal} from '@/components/Reveal';

const stages = ['Zorch', 'FRX', 'StableHLO', 'XLA', 'PrimeIR', 'CPU · GPU'];

const layers = [
  {
    Icon: AsteriskIcon,
    title: 'Frontend framework',
    body: 'Build a SNARK in Python: define your IOP rounds and compose them. You write the protocol, and never touch the kernels.',
  },
  {
    Icon: OrbitIcon,
    title: 'FRX',
    body: 'A JAX-based runtime that traces your Python into a graph and lowers it to StableHLO, carrying field types, not floats.',
  },
  {
    Icon: NestedSquaresIcon,
    title: 'XLA',
    body: 'Runs a full optimization pipeline over the whole graph, from fusion and layout to lazy reduction, treating it as one program.',
  },
  {
    Icon: StackedPlanesIcon,
    title: 'PrimeIR',
    body: 'An MLIR layer that lowers the optimized graph into kernels and tunes the generated code for each CPU and GPU target.',
  },
];

export function PipelineSection() {
  return (
    <section className="bg-surface px-section py-section">
      <Reveal className="mx-auto flex max-w-content flex-col items-center gap-10">
        <div className="flex max-w-measure flex-col items-center gap-5 text-center">
          <h2 className="font-display text-display-4 text-ink">From Python to the Hardware</h2>
          <p className="text-body-lg text-ink">
            One pipeline: a Python framework for SNARKs, lowered through StableHLO and
            <br />
            optimized all the way down to CPU and GPU kernels.
          </p>
        </div>

        <ol className="flex items-center justify-center gap-4">
          {stages.map((stage, index) => (
            <li key={stage} className="flex items-center gap-4">
              <span className="rounded-xl border border-line bg-paper px-10 py-8 text-title-4 font-medium text-ink">
                {stage}
              </span>
              {index < stages.length - 1 && (
                <span className="h-px w-10 bg-ink" aria-hidden />
              )}
            </li>
          ))}
        </ol>

        <div className="grid w-[81.25rem] max-w-full grid-cols-4 gap-5">
          {layers.map(({Icon, title, body}) => (
            <article
              key={title}
              className="flex flex-col gap-4 rounded-2xl border border-line bg-paper p-8 text-ink"
            >
              <Icon />
              <h3 className="text-title-3 font-medium">{title}</h3>
              <p className="text-body-sm">{body}</p>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
