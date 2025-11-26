import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="py-32 sm:py-48">
      <div className="text-center">
        <h1 className="mx-auto max-w-5xl text-4xl font-bold leading-tight tracking-tighter text-gray-900 dark:text-gray-100 sm:text-5xl lg:text-6xl xl:text-7xl">
          Accelerate a Verifiable World,
          <br />
          where Proof Replaces Trust
        </h1>
        <p className="mt-8 text-2xl font-medium tracking-tight text-gray-600 dark:text-gray-400 sm:mt-10 lg:text-3xl">
          Unlock Unprecedented ZK Development Speed with Compiler Automation.
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:mt-8 lg:text-lg">
          Our compiler collapses the R&D cycle from <strong className="font-semibold text-gray-900 dark:text-gray-100">years to weeks.</strong>
        </p>
        <div className="mt-12 flex items-center justify-center gap-x-4 sm:mt-16">
          <Link
            href="/blog"
            className="rounded-2xl bg-primary-600 px-8 py-4 text-base font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-primary-700 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            🚀 Check our performance
          </Link>
          <a
            href="https://github.com/fractalyze"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border-2 border-gray-300 px-8 py-4 text-base font-semibold text-gray-900 transition-all hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:bg-gray-900"
          >
            🐙 How Compiler works?
          </a>
        </div>
      </div>
    </section>
  );
}
