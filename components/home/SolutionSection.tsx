export function SolutionSection() {
  return (
    <section className="border-t border-gray-100 py-32 dark:border-gray-900 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl lg:text-6xl">
          Zorch: The Pytorch for Zero-Knowledge
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-relaxed text-gray-600 dark:text-gray-400 lg:text-xl">
          Build in Python, Optimize by Compiler. We industrializes Zero-Knowledge proof systems.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="rounded-2xl bg-gray-50/50 p-8 transition-all hover:bg-gray-50 dark:bg-gray-900/20 dark:hover:bg-gray-900/30 lg:p-10">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Build
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-gray-100 lg:text-2xl">
              Abstract
            </h3>
            <p className="mt-3 text-base leading-relaxed text-gray-600 dark:text-gray-400">
              Express complex proving schemes using familiar Python syntax
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50/50 p-8 transition-all hover:bg-gray-50 dark:bg-gray-900/20 dark:hover:bg-gray-900/30 lg:p-10">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Optimize
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-gray-100 lg:text-2xl">
              Efficient
            </h3>
            <p className="mt-3 text-base leading-relaxed text-gray-600 dark:text-gray-400">
              Compiler intelligence maximizes speed and cost-efficiency through optimization
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50/50 p-8 transition-all hover:bg-gray-50 dark:bg-gray-900/20 dark:hover:bg-gray-900/30 lg:p-10">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Package
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-gray-100 lg:text-2xl">
              Agnostic
            </h3>
            <p className="mt-3 text-base leading-relaxed text-gray-600 dark:text-gray-400">
              Packages a single codebase for seamless integration into any hardware environment
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50/50 p-8 transition-all hover:bg-gray-50 dark:bg-gray-900/20 dark:hover:bg-gray-900/30 lg:p-10">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Deploy
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-gray-100 lg:text-2xl">
              Universal
            </h3>
            <p className="mt-3 text-base leading-relaxed text-gray-600 dark:text-gray-400">
              Enables instant, cross-platform execution on all targets (CPU, GPU, FPGA)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
