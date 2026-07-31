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

        {/* The six stages run across the page on desktop and stack downwards
            below it. The row is what it is: it needs about 890px, and a 768
            tablet leaves 688 once the gutters are out. Stacking is what the
            mobile frame draws. */}
        <ol className="flex w-full flex-col items-stretch gap-2 xl:w-auto xl:flex-row xl:items-center xl:justify-center xl:gap-4">
          {stages.map((stage, index) => (
            <li
              key={stage}
              className="flex flex-col items-stretch gap-2 xl:flex-row xl:items-center xl:gap-4"
            >
              <span className="rounded-xl border border-line bg-paper px-6 py-6 text-center text-title-4 font-medium text-ink xl:px-10 xl:py-8">
                {stage}
              </span>
              {index < stages.length - 1 && (
                <span className="mx-auto h-6 w-px bg-ink xl:mx-0 xl:h-px xl:w-10" aria-hidden />
              )}
            </li>
          ))}
        </ol>

        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:w-[81.25rem] xl:max-w-full xl:grid-cols-4">
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
