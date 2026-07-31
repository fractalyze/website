import {Reveal} from '@/components/Reveal';
import {CpuIcon, FpgaIcon, GpuIcon, TpuIcon} from '@/components/icons/PlatformIcons';

const DIAGRAM_WIDTH = 552;
const COLUMN_GAP = 8;

// Every line is kept under 56px at 12px, which is what a chip has to spend once
// the panel is one of two columns at 1024 — the narrowest the diagram is ever
// drawn. The labels are 12px at every width now, so a chip that fits at 1920 no
// longer fits everywhere: "Benchmarking &" ran 33px past its chip at 1024.
const todaySpecialistWork = [
  ['Compiler', 'Optimize'],
  ['Runtime', 'Tuning'],
  ['GPU', 'Kernels'],
  ['Bench &', 'Profiling'],
  ['Infra &', 'Deploy'],
];

const todayHandwork = [
  ['Manual', 'Tuning'],
  ['Debug', 'Logging'],
  ['Integrate', 'Handoff'],
  ['QA &', 'Testing'],
  ['Vendor', 'Fixes'],
];

const todayHardwareWork = 'Hardware-Specific Implementations';

const platforms = [
  {label: 'CPU', Icon: CpuIcon},
  {label: 'GPU', Icon: GpuIcon},
  {label: 'TPU', Icon: TpuIcon},
  {label: 'FPGA', Icon: FpgaIcon},
];

// Horizontal centre of each column, so connectors line up with the boxes they join.
function columnCentres(count: number) {
  const item = (DIAGRAM_WIDTH - COLUMN_GAP * (count - 1)) / count;
  return Array.from({length: count}, (_, i) => i * (item + COLUMN_GAP) + item / 2);
}

const dashed = {strokeWidth: 1.5, strokeDasharray: '3 3'} as const;

function head(x: number, y: number) {
  return `M${x - 4} ${y} L${x + 4} ${y} L${x} ${y + 8} Z`;
}

function ArrowRow({count, height = 30}: {count: number; height?: number}) {
  return (
    <svg
      viewBox={`0 0 ${DIAGRAM_WIDTH} ${height}`}
      className="h-auto w-full"
      fill="none"
      stroke="currentColor"
      aria-hidden
    >
      {columnCentres(count).map((x) => (
        <g key={x}>
          <line x1={x} y1={0} x2={x} y2={height - 8} {...dashed} />
          <path d={head(x, height - 8)} fill="currentColor" stroke="none" />
        </g>
      ))}
    </svg>
  );
}

// A run of stubs into a shared horizontal rule, then arrows down to the next row.
function BusConnector({from, to}: {from: number; to: number}) {
  const top = columnCentres(from);
  const bottom = columnCentres(to);
  const span = [...top, ...bottom];
  return (
    <svg
      viewBox={`0 0 ${DIAGRAM_WIDTH} 50`}
      className="h-auto w-full"
      fill="none"
      stroke="currentColor"
      aria-hidden
    >
      {top.map((x) => (
        <line key={`t${x}`} x1={x} y1={0} x2={x} y2={20} {...dashed} />
      ))}
      <line x1={Math.min(...span)} y1={20} x2={Math.max(...span)} y2={20} {...dashed} />
      {bottom.map((x) => (
        <g key={`b${x}`}>
          <line x1={x} y1={20} x2={x} y2={42} {...dashed} />
          <path d={head(x, 42)} fill="currentColor" stroke="none" />
        </g>
      ))}
    </svg>
  );
}

function ExchangeArrows() {
  return (
    <svg viewBox="0 0 37 40" className="h-10 w-[2.3125rem]" fill="none" stroke="currentColor" aria-hidden>
      <line x1={8.5} y1={0} x2={8.5} y2={32} {...dashed} />
      <path d={head(8.5, 32)} fill="currentColor" stroke="none" />
      <line x1={28.5} y1={8} x2={28.5} y2={40} {...dashed} />
      <path d="M24.5 8 L32.5 8 L28.5 0 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function AppHeader() {
  return (
    <div className="flex w-full items-center justify-center rounded-lg border border-line bg-surface px-5 py-4 text-body-sm text-ink">
      Your application
    </div>
  );
}

function DownArrow() {
  return (
    <svg viewBox="0 0 12 40" className="h-10 w-3" fill="none" stroke="currentColor" aria-hidden>
      <line x1={6} y1={0} x2={6} y2={32} {...dashed} />
      <path d={head(6, 32)} fill="currentColor" stroke="none" />
    </svg>
  );
}

function PlatformRow({withArrows = false}: {withArrows?: boolean}) {
  return (
    <div className="flex w-full items-stretch gap-2">
      {platforms.map(({label, Icon}) => (
        <div key={label} className="flex min-w-0 flex-1 flex-col items-center gap-2">
          {withArrows && <DownArrow />}
          {/* The icon is a fixed 24px and absent below the tablet rather than a
              rem that shrinks with the page. It was drawing 15px at 1024 beside
              a label pinned at 14, and on a phone the chip is 53px wide, which
              flex resolved by squeezing the icon to nothing — present in the
              box, taking a column, drawing zero pixels. */}
          <div className="flex w-full items-center justify-center gap-1 rounded-lg border border-line bg-surface px-5 py-4">
            <Icon className="hidden h-[24px] w-[24px] shrink-0 md:block" />
            <span className="text-body-sm text-ink">{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProcessRow({steps, tone}: {steps: string[][]; tone: 'brand' | 'blue'}) {
  return (
    <div className="flex w-full items-stretch gap-0.5 md:gap-2">
      {steps.map((lines) => (
        <div
          key={lines.join(' ')}
          className={`flex min-w-0 flex-1 items-center justify-center rounded-lg px-0.5 py-4 text-center text-[10px] leading-[1.1] text-ink md:px-1 md:text-micro ${
            tone === 'brand' ? 'bg-accent' : 'bg-accent-blue'
          }`}
        >
          <span>
            {lines[0]}
            <br />
            {lines[1]}
          </span>
        </div>
      ))}
    </div>
  );
}

export function ComputingLayerSection() {
  return (
    <section className="bg-paper px-6 py-16 md:px-10 md:py-20 xl:px-section xl:py-section">
      <div className="mx-auto flex max-w-content flex-col items-center gap-8 md:gap-10">
        <div className="flex max-w-measure flex-col items-center gap-4 text-center md:gap-5">
          <h2 className="font-display text-title-2 text-ink md:text-title-1 xl:text-display-4">
            The Computing Layer for Cryptography
          </h2>
          <p className="text-body-sm text-ink md:text-body-lg">
            A unified platform that automatically transforms high-level cryptographic applications{' '}
            <br className="hidden xl:inline" />
            into optimized execution for any target hardware.
          </p>
        </div>

        {/* Side by side only at desktop. Each panel carries a diagram drawn to a
            552px grid, and halving the width of a screen that is already narrower
            than that leaves nothing to draw it in. */}
        <div className="grid w-full grid-cols-1 gap-5 xl:w-[81.25rem] xl:max-w-full xl:grid-cols-2">
          <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-4 md:p-6">
            <span className="w-fit rounded-full border border-line bg-paper px-4 py-1.5 text-caption text-muted">
              Today
            </span>
            <div className="flex flex-col gap-4">
              <h3 className="text-title-3 font-medium text-ink md:text-title-2">
                Expensive &amp; Complex
              </h3>
              <p className="text-body-sm font-medium text-ink md:text-body-lg">
                Many specialists. Months of engineering.
              </p>
              <ul className="list-disc pl-5 text-body-sm text-ink md:text-body">
                <li>Protocol, compiler, GPU, and runtime engineers working in separate silos</li>
                <li>Months of manual integration, tuning, and performance iteration</li>
                <li>Every new scheme or hardware target starts from scratch</li>
              </ul>
            </div>

            {/* Revealed step by step: the length of the descent is the point
                this column is making.
                */}
            <div className="w-full">
              <div className="flex flex-col items-center gap-2 rounded-xl border border-line bg-paper p-5 text-ink">
                {[
                  <AppHeader key="app" />,
                  <ArrowRow key="fan" count={5} />,
                  <ProcessRow key="specialists" steps={todaySpecialistWork} tone="brand" />,
                  <BusConnector key="bus-1" from={5} to={5} />,
                  <ProcessRow key="handwork" steps={todayHandwork} tone="blue" />,
                  <BusConnector key="bus-2" from={5} to={1} />,
                  <div
                    key="hardware"
                    // text-center as well as justify-center: the flex property
                    // centres the block, and on a phone the label wraps, leaving
                    // the second line ranged left inside a centred block.
                    className="flex w-full items-center justify-center rounded-lg bg-accent px-5 py-4 text-center text-body-sm text-ink"
                  >
                    {todayHardwareWork}
                  </div>,
                  <BusConnector key="bus-3" from={1} to={4} />,
                  <PlatformRow key="platforms" />,
                ].map((step, index) => (
                  <Reveal key={step.key} className="w-full" delay={index * 150}>
                    {step}
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 rounded-2xl bg-ink p-4 md:p-6">
            <span className="w-fit rounded-full border border-line bg-paper px-4 py-1.5 text-caption text-muted">
              With Fractalyze
            </span>
            <div className="flex flex-col gap-4">
              <h3 className="text-title-3 font-medium text-paper md:text-title-2">
                Automated &amp; Simple
              </h3>
              <p className="text-body-sm font-medium text-paper md:text-body-lg">
                Focus on your application, we handle the rest.
              </p>
              <ul className="list-disc pl-5 text-body-sm text-paper md:text-body">
                <li>One compiler automatically optimizes and generates execution code</li>
                <li>A runtime handles high-performance execution and memory management</li>
                <li>Orchestration scales the same workload across CPU, GPU, TPU, and FPGA</li>
              </ul>
            </div>

            {/* Arrives as one piece, against the other column's nine steps. */}
            <div className="w-full">
              <Reveal className="flex flex-col items-center gap-2 rounded-xl border border-line bg-paper p-5 text-ink">
                <AppHeader />
                <ExchangeArrows />
                {/* Empty, so it has no height of its own to take. It stands in
                    for the hardware column opposite it, and the figures are what
                    that column comes to once its rows are stacked: 12rem on a
                    phone, 16rem at tablet, and the drawn 18.8125rem beside the
                    "Today" card. */}
                <div className="flex h-[12rem] w-full flex-col gap-2 rounded-2xl border border-accent bg-accent/40 p-5 md:h-[16rem] xl:h-[18.8125rem]">
                  {['Orchestration Layer', 'Compiler Layer'].map((layer) => (
                    <div
                      key={layer}
                      className="flex min-h-0 flex-1 items-center justify-center rounded-lg bg-accent px-5 text-body-sm text-ink"
                    >
                      {layer}
                    </div>
                  ))}
                </div>
                <PlatformRow withArrows />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
