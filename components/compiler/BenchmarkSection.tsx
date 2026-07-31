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
 * Two columns — workload and track — and two lines on a phone.
 *
 * The design frame draws a label block, a bar from a common origin, and the
 * figure sitting against the end of that bar. Carrying the figure on the bar
 * rather than in a column of its own is what makes it a two-column row here and
 * a two-line one on a phone. The frame has no losing result to draw and so no
 * origin to speak of; ours keeps one, and with the present data it lands 7% from
 * the left, which is close enough to the frame that the two read alike.
 *
 * The label column is in pixels because its contents are: body copy stopped
 * scaling with the root, and a column that still did would squeeze it.
 */
const GRID =
  'grid grid-cols-1 items-center gap-y-2 md:grid-cols-[10rem_1fr] md:gap-x-4 md:gap-y-0 xl:grid-cols-[200px_1fr]';

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

                {/* Stretched to the full row height from the tablet up, so the
                    per-row baselines butt against each other and read as one
                    line down the chart rather than a tick beside each bar.
                    The right margin is the figure's own width, held out of the
                    track so the longest bar has somewhere to put it. In pixels,
                    like the figure: reserving a rem would leave 30px at 1024 for
                    a 40px number. */}
                <div className="relative mr-[48px] h-6 md:h-auto md:self-stretch">
                  {/* Absent on a phone. The rows there carry a label above each
                      track, so the segments cannot meet, and parity sits 3% from
                      the left where a lone tick reads as a mark on the card
                      edge. The bars still say which side of it they fell. */}
                  <span
                    aria-hidden
                    className="absolute inset-y-0 hidden w-0 border-l border-dashed border-line md:block"
                    style={{left: `${axis.parityPercent}%`}}
                  />
                  <span
                    data-grow={faster ? 'right' : 'left'}
                    // A near-parity result rounds to a bar under a pixel wide, which
                    // reads as a missing bar rather than a close one; the floor keeps
                    // the mark on the page without inflating what it claims.
                    className={`absolute inset-y-0 my-auto h-5 min-w-[3px] ${faster ? 'bg-accent' : 'bg-line-strong'}`}
                    style={
                      faster
                        ? {left: `${axis.parityPercent}%`, width: `${length}%`}
                        : {right: `${100 - axis.parityPercent}%`, width: `${length}%`}
                    }
                  />
                  {/* Against the end of the bar, which for a losing result is the
                      baseline itself. The multiple alone: the direction and the
                      colour say which side of parity it fell, and the sentence a
                      reader would need to be told that is on the title. */}
                  <span
                    title={`${times.toFixed(2)}× ${faster ? 'faster' : 'slower'} than ${baseline.name}`}
                    className={`absolute top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap text-body-sm font-semibold leading-[17.6px] ${faster ? 'text-ink' : 'text-muted'}`}
                    style={{left: `${faster ? axis.parityPercent + length : axis.parityPercent}%`}}
                  >
                    {times.toFixed(2)}×
                    {/* The direction is a bar pointing one way in one of two
                        colours, which is nothing to a screen reader. */}
                    <span className="sr-only"> {faster ? 'faster' : 'slower'}</span>
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
