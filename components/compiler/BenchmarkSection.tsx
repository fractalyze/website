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

/**
 * Three columns — workload, track, readout — down to the tablet, and three
 * lines on a phone.
 *
 * A 360px screen cannot hold a bar worth reading next to two columns of text,
 * so below the tablet the row folds: the workload and its readout share the
 * first line, the baseline sits under the workload, and the track spans the
 * width beneath both. Placement is explicit rather than left to auto-flow,
 * because the readout is the last cell in the source and has to come back up to
 * the first line. The mobile design frame drops this chart, but the section's
 * own subtitle promises benchmark data, so it stays.
 */
// The two text columns are in pixels at the desktop step, and the row height
// with them: their contents are body copy, which no longer scales with the root,
// so a column that did would squeeze "3.09x faster" onto two lines at 1440 and
// push the label pair out of a 37.5px row. The figures are what the rem values
// come to at 1920, so the chart is unchanged at the width it is drawn for.
const GRID =
  'grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 md:grid-cols-[10rem_1fr_6rem] md:gap-y-4 xl:grid-cols-[240px_1fr_112px]';

/** The track: the full width under both cells on a phone, the middle column above. */
const TRACK = 'col-start-1 col-end-3 row-start-2 md:col-end-2 md:col-start-2 md:row-start-1';

/** The readout: top-right of the folded row, its own column once there is one. */
const READOUT = 'col-start-2 row-start-1 md:col-start-3';

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
    <section className="bg-ink px-6 py-16 md:px-10 md:py-20 xl:px-section xl:py-section">
      <Reveal className="mx-auto flex max-w-content flex-col items-center gap-8 md:gap-10">
        <div className="flex max-w-measure flex-col items-center gap-4 text-center md:gap-5">
          <h2 className="font-display text-title-2 text-paper md:text-title-1 xl:text-display-4">
            The Verifiable Difference a Compiler Makes
          </h2>
          <p className="text-body-sm text-paper md:text-body-lg">
            Explore real-time benchmark data on compilation throughput, compute cost reduction,{' '}
            <br className="hidden xl:inline" />
            and verification latency compared with manual optimization.
          </p>
        </div>

        <div className="w-full rounded-2xl border border-line bg-surface p-5 md:p-8 xl:w-[75rem] xl:max-w-full xl:p-10">
          <div className={`${GRID} pb-3`}>
            <span className="hidden md:block" />
            <span className="relative col-start-1 col-end-3 block text-micro uppercase tracking-wide text-muted md:col-start-2 md:col-end-3">
              <span
                className="absolute -translate-x-1/2 whitespace-nowrap"
                style={{left: `${axis.parityPercent}%`}}
              >
                baseline
              </span>
            </span>
            <span className="hidden md:block" />
          </div>

          <ul>
            {rows.map(({benchmark, baseline, times, faster, length}) => (
              <li
                key={`${benchmark.workload}/${baseline.name}`}
                className={`${GRID} py-3 md:h-[50px] md:py-0`}
              >
                {/* Cells truncate rather than wrap, so the name and the baseline
                    each carry their own text, and the row carries how it was
                    measured. */}
                <div className="min-w-0" title={provenance(benchmark)}>
                  <span
                    title={label(benchmark)}
                    className="block truncate text-body font-semibold leading-[17.6px] text-ink"
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

                <div className={`relative h-6 ${TRACK} md:h-full`}>
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
                  className={`${READOUT} text-right text-body-sm font-semibold leading-[17.6px] xl:text-body xl:leading-[17.6px] ${faster ? 'text-ink' : 'text-muted'}`}
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
