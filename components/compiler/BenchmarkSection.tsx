import {benchmarks} from '@/data/benchmarks';

export function BenchmarkSection() {
  return (
    <section className="bg-ink px-section py-section">
      <div className="mx-auto flex max-w-content flex-col items-center gap-10">
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
          <ul>
            {benchmarks.map((benchmark) => (
              <li key={benchmark.workload} className="flex h-[3.125rem] items-center gap-4">
                <div className="w-[15rem] shrink-0">
                  <span className="block text-body font-semibold leading-[1.1rem] text-ink">
                    {benchmark.workload}
                  </span>
                  {benchmark.baseline && (
                    <span className="block text-body text-ink">{benchmark.baseline}</span>
                  )}
                </div>
                <div className="flex flex-1 items-center gap-4">
                  <span
                    className="h-6 shrink-0 bg-accent"
                    style={{width: `${benchmark.percent}%`}}
                  />
                  <span className="text-body font-semibold leading-[1.1rem] text-ink">
                    {benchmark.percent}%
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
