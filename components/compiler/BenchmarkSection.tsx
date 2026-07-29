import {axisOf, benchmarks, magnitude, readout, speedup, type Benchmark} from '@/data/benchmarks';
import {Reveal} from '@/components/Reveal';

const axis = axisOf(benchmarks);

// One bar per (workload, baseline) pair. Flattening here rather than nesting
// keeps every row the same height, which is what lets the parity line read as
// one continuous rule down the card instead of a stack of segments.
const rows = benchmarks.flatMap((benchmark) =>
  benchmark.baselines.map((baseline, index) => {
    const ratio = speedup(benchmark, baseline);
    return {
      benchmark,
      baseline,
      ...readout(ratio),
      length: axis.lengthPercent(magnitude(ratio)),
      // Only the first bar of a workload repeats its name.
      lead: index === 0,
    };
  })
);

const GRID = 'grid grid-cols-[15rem_1fr_9rem] items-center gap-4';

/** What the clock covered, plus anything qualifying the run. */
const meta = ({basis, note}: Benchmark) => (note ? `${basis} · ${note}` : basis);

export function BenchmarkSection() {
  return (
    <section className="bg-ink px-section py-section">
      <Reveal className="mx-auto flex max-w-content flex-col items-center gap-10">
        <div className="flex max-w-measure flex-col items-center gap-5 text-center">
          <h2 className="font-display text-display-4 text-paper">
            The Verifiable Difference a Compiler Makes
          </h2>
          <p className="text-body-lg text-paper">
            Every figure is a measured time against a named baseline on the same problem.
            <br />
            Bars run right where the compiler wins and left where the baseline still does.
          </p>
        </div>

        <div className="w-[75rem] max-w-full rounded-2xl border border-line bg-surface p-10">
          <div className={`${GRID} pb-3`}>
            <span />
            <span className="relative block text-micro uppercase tracking-wide text-muted">
              <span
                className="absolute -translate-x-1/2 whitespace-nowrap"
                style={{left: `${axis.parityPercent}%`}}
              >
                baseline
              </span>
            </span>
            <span />
          </div>

          <ul>
            {rows.map(({benchmark, baseline, times, faster, length, lead}) => (
              <li
                key={`${benchmark.workload}/${baseline.name}`}
                className={`${GRID} h-[3.75rem] ${lead ? 'border-t border-line' : ''}`}
              >
                {/* Cells truncate rather than wrap, so each carries its own full
                    text: a longer instance or note stays readable on hover instead
                    of forcing every row taller to fit the worst case. */}
                <div className="min-w-0">
                  {lead && (
                    <>
                      <span
                        title={benchmark.workload}
                        className="block truncate text-body font-semibold leading-[1.1rem] text-ink"
                      >
                        {benchmark.workload}
                      </span>
                      <span
                        title={benchmark.instance}
                        className="block truncate text-body-sm text-muted"
                      >
                        {benchmark.instance}
                      </span>
                      <span
                        title={meta(benchmark)}
                        className="block truncate text-micro text-muted"
                      >
                        {meta(benchmark)}
                      </span>
                    </>
                  )}
                </div>

                <div className="relative h-full">
                  <span
                    aria-hidden
                    className="absolute inset-y-0 w-px bg-line-strong"
                    style={{left: `${axis.parityPercent}%`}}
                  />
                  <span
                    data-grow={faster ? 'right' : 'left'}
                    // A near-parity result rounds to a bar under a pixel wide, which
                    // reads as a missing bar rather than a close one; the floor keeps
                    // the mark on the page without inflating what it claims.
                    className={`absolute inset-y-0 my-auto h-6 min-w-[3px] ${faster ? 'bg-accent-blue' : 'bg-line-strong'}`}
                    style={
                      faster
                        ? {left: `${axis.parityPercent}%`, width: `${length}%`}
                        : {right: `${100 - axis.parityPercent}%`, width: `${length}%`}
                    }
                  />
                </div>

                <div className="text-right">
                  <span
                    className={`block text-body font-semibold leading-[1.1rem] ${faster ? 'text-ink' : 'text-muted'}`}
                  >
                    {times.toFixed(2)}× {faster ? 'faster' : 'slower'}
                  </span>
                  <span
                    title={`vs ${baseline.name}`}
                    className="block truncate text-body-sm text-muted"
                  >
                    vs {baseline.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
