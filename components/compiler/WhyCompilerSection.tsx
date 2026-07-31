import Image from 'next/image';
import whyGcc from '@/assets/images/compiler/why-gcc.webp';
import whyXla from '@/assets/images/compiler/why-xla.webp';
import whyIcicle from '@/assets/images/compiler/why-icicle.webp';
import whyAi from '@/assets/images/compiler/why-ai.webp';
import {CheckMark, CrossMark, PartialMark} from '@/components/icons/CompilerIcons';
import {Reveal} from '@/components/Reveal';

const cards = [
  {
    title: "General-purpose compilers can't see the math",
    body: 'To GCC, a * b % p is three integer instructions. C and Rust give you no way to say that p is a prime modulus, and no analysis recovers what the language could not express.',
    tags: ['gcc', 'rustc', 'clang'],
    image: whyGcc,
  },
  {
    title: 'ML compilers see math a different math',
    body: 'XLA reshapes whole programs around tensor algebra over floats. Nothing in it can say "this u32 is a field element," so an optimization like lazy reduction never comes up.',
    tags: ['xla', 'tvm', 'triton'],
    image: whyXla,
  },
  {
    title: 'Hand-written kernels, one kernel at a time',
    body: 'A hand-tuned kernel knows the math, but couples one operation, whether MSM, NTT, or a hash, to one GPU. Research moves fast and hardware faster, so that code rarely lives long enough to reuse.',
    tags: ['icicle', 'sppark'],
    image: whyIcicle,
  },
  {
    title: "Won't AI just optimize it?",
    body: 'AI is good at local, profiling-guided tuning. But lazy reduction and fusion are global decisions across the whole computation graph, which it does not see. A compiler optimizes the graph, not the snippet.',
    tags: ['claude', 'codex'],
    image: whyAi,
  },
];

const columns = ['gcc · rustc · clang', 'xla · tvm · triton', 'icicle · sppark', 'AI coding agents', 'zorch'];

type Mark = 'yes' | 'no' | 'partial';

const rows: {capability: string; detail: string; marks: Mark[]}[] = [
  {
    capability: 'Field-aware semantics',
    detail: 'sees a·b mod p as one op in F_p',
    marks: ['no', 'no', 'yes', 'partial', 'yes'],
  },
  {
    capability: 'Whole-graph optimization',
    detail: 'lazy reduction, fusion',
    marks: ['no', 'partial', 'no', 'partial', 'yes'],
  },
  {
    capability: 'Hardware portability',
    detail: 'same source, next GPU',
    marks: ['partial', 'partial', 'no', 'no', 'yes'],
  },
  {
    capability: 'Math-level source',
    detail: 'reads like the paper, not tuned CUDA',
    marks: ['no', 'no', 'no', 'no', 'yes'],
  },
  {
    capability: 'Algorithm agility',
    detail: 'new scheme, no new kernels',
    marks: ['no', 'no', 'no', 'partial', 'yes'],
  },
];

const marks = {yes: CheckMark, no: CrossMark, partial: PartialMark};
const markLabels = {yes: 'supported', no: 'not supported', partial: 'partial'};

export function WhyCompilerSection() {
  return (
    <section className="bg-surface px-6 py-16 md:px-10 md:py-20 xl:px-section xl:py-section">
      <Reveal className="mx-auto flex max-w-content flex-col items-center gap-8 md:gap-10">
        <div className="flex max-w-[57.25rem] flex-col items-center gap-4 text-center md:gap-5">
          <h2 className="font-display text-title-2 text-ink md:text-title-1 xl:text-display-4">
            Why Cryptography Needs a Domain-Specific Compiler
          </h2>
          <p className="text-body-sm text-ink md:text-body-lg">
            General-purpose compiler optimizations weren&apos;t designed for finite fields,
            polynomial arithmetic, or proof systems.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:w-[81.25rem] xl:max-w-full">
          {cards.map((card) => (
            <article key={card.title} className="overflow-hidden rounded-2xl border border-line bg-paper">
              <div className="relative h-[11rem] w-full md:h-[15rem]">
                <Image src={card.image} alt="" fill sizes="(min-width: 768px) 640px, 100vw"
                  className="object-cover" placeholder="blur" />
              </div>
              <div className="flex flex-col gap-4 p-5">
                <h3 className="text-title-3 font-medium text-ink md:text-title-2">{card.title}</h3>
                <p className="text-body-sm text-ink md:text-body">{card.body}</p>
                <ul className="flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-line bg-paper px-3.5 py-2 text-micro text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* Six columns of marks only mean something read across, so the table
            keeps its shape at every width and scrolls sideways on a phone rather
            than being transposed into five stacked lists. The floor is what the
            narrowest legible columns come to; from 767 up the gutters already
            leave more than that, so the scrollbar only ever appears on a phone.
            The mobile frame drops this table altogether, which would drop the
            comparison the section is built around. */}
        <div
          className="w-full overflow-x-auto"
          tabIndex={0}
          role="group"
          aria-label="Compiler capability comparison"
        >
          <table className="mx-auto w-full min-w-[41rem] max-w-full table-fixed border-collapse text-ink xl:w-[81.25rem] xl:min-w-0">
            <thead>
              <tr className="border border-line-strong bg-surface-sunken">
                {/* The corner cell labels nothing, so it is not a header. */}
                <td className="w-[10.5rem] p-0 md:w-[13rem] xl:w-[18.75rem]" />
                {columns.map((column, index) => (
                  <th
                    key={column}
                    // Every font-size step repeats the leading: a `text-*` utility
                    // carries a line-height of its own, and its responsive variant
                    // is emitted after the unprefixed `leading-*`, so it would win.
                    className={`h-[3.75rem] text-center text-body-sm font-semibold leading-[1.2375rem] md:text-body md:leading-[1.2375rem] xl:text-body-lg xl:leading-[1.2375rem] ${
                      index === columns.length - 1 ? 'bg-accent/60' : ''
                    }`}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.capability} className="h-20 border border-line">
                  <th scope="row" className="pl-4 text-left align-middle md:pl-5">
                    <span className="block text-body font-semibold leading-[1.2375rem] xl:text-body-lg xl:leading-[1.2375rem]">
                      {row.capability}
                    </span>
                    <span className="block text-body-sm font-normal text-muted">{row.detail}</span>
                  </th>
                  {row.marks.map((mark, index) => {
                    const Mark = marks[mark];
                    return (
                      <td
                        key={columns[index]}
                        className={`align-middle ${index === row.marks.length - 1 ? 'bg-accent/60' : ''}`}
                      >
                        <span className="flex justify-center" title={markLabels[mark]}>
                          <Mark />
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </section>
  );
}
