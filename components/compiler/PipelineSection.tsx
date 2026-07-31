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
    <section className="bg-surface px-6 py-16 md:px-10 md:py-20 xl:px-section xl:py-section">
      <Reveal className="mx-auto flex max-w-content flex-col items-center gap-8 md:gap-10">
        <div className="flex max-w-measure flex-col items-center gap-4 text-center md:gap-5">
          <h2 className="font-display text-title-2 text-ink md:text-title-1 xl:text-display-4">
            From Python to the Hardware
          </h2>
          <p className="text-body-sm text-ink md:text-body-lg">
            One pipeline: a Python framework for SNARKs, lowered through StableHLO and{' '}
            <br className="hidden xl:inline" />
            optimized all the way down to CPU and GPU kernels.
          </p>
        </div>

        {/* The six stages run across the page from `lg` and stack downwards below
            it. `lg`, not `md`, because the row is what it is: measured at 1024 it
            needs 890px of the 944 the tablet gutters leave, and a 768 viewport
            has 688. Stacking is what the mobile frame draws, so the only
            question was where to switch, and 1024 is the width it was drawn at. */}
        <ol className="flex w-full flex-col items-stretch gap-2 lg:w-auto lg:flex-row lg:items-center lg:justify-center xl:gap-4">
          {stages.map((stage, index) => (
            <li
              key={stage}
              className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center xl:gap-4"
            >
              <span className="rounded-xl border border-line bg-paper px-6 py-6 text-center text-title-4 font-medium text-ink xl:px-10 xl:py-8">
                {stage}
              </span>
              {index < stages.length - 1 && (
                <span className="mx-auto h-6 w-px bg-ink lg:mx-0 lg:h-px lg:w-6 xl:w-10" aria-hidden />
              )}
            </li>
          ))}
        </ol>

        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 xl:w-[81.25rem] xl:max-w-full">
          {layers.map(({Icon, title, body}) => (
            <article
              key={title}
              className="flex flex-col gap-4 rounded-2xl border border-line bg-paper p-5 text-ink md:p-8"
            >
              <Icon />
              <h3 className="text-title-4 font-medium md:text-title-3">{title}</h3>
              <p className="text-body-sm">{body}</p>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
