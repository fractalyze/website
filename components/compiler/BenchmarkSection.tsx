import {axisOf, benchmarks, magnitude, readout, speedup, type Benchmark} from '@/data/benchmarks';
import {Reveal} from '@/components/Reveal';

const axis = axisOf(benchmarks);

// One bar per (workload, baseline) pair, ordered by how far ahead we are, so
// the chart reads as a single ranking from our best result down to our worst.
// That ordering is why each row repeats its own workload: a workload measured
// against two baselines lands in two places, and neither can rely on the other
// sitting above it.
const rows = benchmarks
  .flatMap((benchmark) =>
    benchmark.baselines.map((baseline) => {
      const ratio = speedup(benchmark, baseline);
      return {
        benchmark,
        baseline,
        ratio,
        ...readout(ratio),
        length: axis.lengthPercent(magnitude(ratio)),
      };
    })
  )
  .sort((a, b) => b.ratio - a.ratio);

const GRID = 'grid grid-cols-[15rem_1fr_7rem] items-center gap-4';

/** The operation and, where one applies, the size it was run at. */
const label = ({workload, size}: Benchmark) => (size ? `${workload}(${size})` : workload);

/**
 * The same label with the exponent raised.
 *
 * Sizes are written 2^24 in the data, where they stay greppable and easy to
 * edit. Real digits in a sup tag rather than the unicode superscripts: those
 * are absent from the Pretendard subsets the site ships, so they would come
 * from whatever fallback the browser reaches for.
 */
function Label({benchmark}: {benchmark: Benchmark}) {
  const [base, exponent] = (benchmark.size ?? '').split('^');
  if (!exponent) return <>{benchmark.workload}</>;

  return (
    <>
      {benchmark.workload}({base}
      <sup className="text-[0.7em] leading-none">{exponent}</sup>)
    </>
  );
}

/**
 * How the run was set up, for the hover title.
 *
 * What was run, what the clock covered, and any hardware caveat are all
 * provenance a reader needs only when they question a number, and putting three
 * lines of it under every workload buried the chart. They stay one hover away.
 */
const provenance = ({instance, basis, note}: Benchmark) =>
  [instance, basis, note].filter(Boolean).join(' · ');

export function BenchmarkSection() {
  return (
    <section className="bg-ink px-section py-section">
      <Reveal className="mx-auto flex max-w-content flex-col items-center gap-10">
        <div className="flex max-w-measure flex-col items-center gap-5 text-center">
          <h2 className="font-display text-display-4 text-paper">
            The Verifiable Difference a Compiler Makes
          </h2>
          <p className="text-body-lg text-paper">
            Explore real-time benchmark data on compilation throughput, compute cost reduction,
            <br />
            and verification latency compared with manual optimization.
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
            {rows.map(({benchmark, baseline, times, faster, length}) => (
              <li
                key={`${benchmark.workload}/${baseline.name}`}
                className={`${GRID} h-[3.125rem]`}
              >
                {/* Cells truncate rather than wrap, so the name and the baseline
                    each carry their own text, and the row carries how it was
                    measured. */}
                <div className="min-w-0" title={provenance(benchmark)}>
                  <span
                    title={label(benchmark)}
                    className="block truncate text-body font-semibold leading-[1.1rem] text-ink"
                  >
                    <Label benchmark={benchmark} />
                  </span>
                  <span
                    title={`vs ${baseline.name}`}
                    className="block truncate text-body-sm text-muted"
                  >
                    vs {baseline.name}
                  </span>
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

                <span
                  className={`text-right text-body font-semibold leading-[1.1rem] ${faster ? 'text-ink' : 'text-muted'}`}
                >
                  {times.toFixed(2)}× {faster ? 'faster' : 'slower'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
