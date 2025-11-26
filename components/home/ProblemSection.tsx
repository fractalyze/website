export default function ProblemSection() {
  return (
    <section className="border-t border-gray-200 py-20 dark:border-gray-800 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          The ZK Development Crisis
        </h2>
        <p className="mt-3 text-center text-lg text-gray-600 dark:text-gray-400">
          Why traditional ZK engineering fails at scale
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              18-24 Month Research Gap
            </h3>
            <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-300">
              Novel proving schemes take years to reach production. The pipeline from academic
              research to deployed systems is painfully slow, delaying critical innovations.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Scarce, Expensive Talent
            </h3>
            <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-300">
              Requires a rare combination of cryptographers AND low-level hardware engineers.
              This talent bottleneck limits who can build ZK systems at all.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Manual, Brittle Optimization
            </h3>
            <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-300">
              Hardware-specific tuning is non-portable across CPUs, GPUs, and FPGAs. Manual
              optimizations break on every update, requiring constant rework.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
