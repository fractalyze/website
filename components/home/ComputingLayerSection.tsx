import {CpuIcon, FpgaIcon, GpuIcon, TpuIcon} from '@/components/icons/PlatformIcons';

const DIAGRAM_WIDTH = 552;
const COLUMN_GAP = 8;

const todaySpecialistWork = [
  ['Compiler', 'Optimization'],
  ['Runtime &', 'Memory Tuning'],
  ['GPU Kernel', 'Engineering'],
  ['Benchmarking &', 'Profiling'],
  ['Infra /', 'Deployment'],
];

const todayHandwork = [
  ['Manual', 'Tuning'],
  ['Debugging &', 'Logging'],
  ['Integration &', 'Handoffs'],
  ['QA &', 'Validation'],
  ['Vendor-specific', 'Fixes'],
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
      <line x1={Math.min(...span)} y1={20} x2={Math.max(...span)} y2={20} strokeWidth={1.5} />
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

function PlatformRow({withArrows = false}: {withArrows?: boolean}) {
  return (
    <div className="flex w-full items-stretch gap-2">
      {platforms.map(({label, Icon}) => (
        <div key={label} className="flex flex-1 flex-col items-center">
          {withArrows && <ArrowRow count={1} height={40} />}
          <div className="flex w-full items-center justify-center gap-1 rounded-lg border border-line bg-surface px-5 py-4">
            <Icon />
            <span className="text-body-sm text-ink">{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProcessRow({steps, tone}: {steps: string[][]; tone: 'brand' | 'blue'}) {
  return (
    <div className="flex w-full items-stretch gap-2">
      {steps.map((lines) => (
        <div
          key={lines.join(' ')}
          className={`flex flex-1 items-center justify-center rounded-lg px-5 py-4 text-center text-micro leading-[1.1] text-ink ${
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
    <section className="bg-paper px-section py-section">
      <div className="mx-auto flex max-w-content flex-col items-center gap-10">
        <div className="flex max-w-measure flex-col items-center gap-5 text-center">
          <h2 className="font-display text-display-4 text-ink">
            The Computing Layer for Cryptography
          </h2>
          <p className="text-body-lg text-ink">
            A unified platform that automatically transforms high-level cryptographic applications
            <br />
            into optimized execution for any target hardware.
          </p>
        </div>

        <div className="grid w-[81.25rem] max-w-full grid-cols-2 gap-5">
          <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-6">
            <span className="w-fit rounded-full border border-line bg-paper px-4 py-1.5 text-caption text-muted">
              Today
            </span>
            <div className="flex flex-col gap-4">
              <h3 className="text-title-2 font-medium text-ink">Expensive &amp; Complex</h3>
              <p className="text-body-lg font-medium text-ink">
                Many specialists. Months of engineering.
              </p>
              <ul className="list-disc pl-5 text-body text-ink">
                <li>Protocol, compiler, GPU, and runtime engineers working in separate silos</li>
                <li>Months of manual integration, tuning, and performance iteration</li>
                <li>Every new scheme or hardware target starts from scratch</li>
              </ul>
            </div>

            <div className="flex flex-col items-center gap-2 rounded-xl border border-line bg-paper p-5 text-ink">
              <AppHeader />
              <ArrowRow count={5} />
              <ProcessRow steps={todaySpecialistWork} tone="brand" />
              <BusConnector from={5} to={5} />
              <ProcessRow steps={todayHandwork} tone="blue" />
              <BusConnector from={5} to={1} />
              <div className="flex w-full items-center justify-center rounded-lg bg-accent px-5 py-4 text-body-sm text-ink">
                {todayHardwareWork}
              </div>
              <BusConnector from={1} to={4} />
              <PlatformRow />
            </div>
          </div>

          <div className="flex flex-col gap-5 rounded-2xl bg-ink p-6">
            <span className="w-fit rounded-full border border-line bg-paper px-4 py-1.5 text-caption text-muted">
              With Fractalyze
            </span>
            <div className="flex flex-col gap-4">
              <h3 className="text-title-2 font-medium text-paper">Automated &amp; Simple</h3>
              <p className="text-body-lg font-medium text-paper">
                Focus on your application, we handle the rest.
              </p>
              <ul className="list-disc pl-5 text-body text-paper">
                <li>One compiler automatically optimizes and generates execution code</li>
                <li>A runtime handles high-performance execution and memory management</li>
                <li>Orchestration scales the same workload across CPU, GPU, TPU, and FPGA</li>
              </ul>
            </div>

            <div className="flex flex-col items-center gap-2 rounded-xl border border-line bg-paper p-5 text-ink">
              <AppHeader />
              <ExchangeArrows />
              <div className="flex w-full flex-col gap-2 rounded-2xl border border-accent bg-accent/40 p-5">
                <div className="flex items-center justify-center rounded-lg bg-accent px-5 py-10 text-body-sm text-ink">
                  Orchestration Layer
                </div>
                <div className="flex items-center justify-center rounded-lg bg-accent px-5 py-10 text-body-sm text-ink">
                  Compiler Layer
                </div>
              </div>
              <PlatformRow withArrows />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
