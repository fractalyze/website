import {Reveal} from '@/components/Reveal';
import {CpuIcon, FpgaIcon, GpuIcon, TpuIcon} from '@/components/icons/PlatformIcons';

// Every line is kept under 56px at 12px, which is what a chip has to spend once
// the panel is one of two columns at 1024 — the narrowest the diagram is ever
// drawn. The labels are a flat 12px from the tablet up rather than a rem, so a
// chip that fits at 1920 no longer fits everywhere: "Benchmarking &" ran 33px
// past its chip at 1024. Below the tablet they are 11px against a 47px chip,
// which is the other end these strings have to survive.
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

const dashed = {strokeWidth: 1.5, strokeDasharray: '3 3'} as const;

function head(x: number, y: number) {
  return `M${x - 4} ${y} L${x + 4} ${y} L${x} ${y + 8} Z`;
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
          // 11px below the tablet, and no horizontal padding to hold it. Five
          // chips share a phone's 243px, and the longest label — "Integrate/
          // Handoff" — draws 4.04px of ink per pixel of font, so 11px is 44.4px
          // against the 47.0px a chip has. 12px would need 48.5 and is only
          // reachable by taking the padding off the frames entirely; 10px was
          // what the boxes cost before they were tightened. The text is
          // centred, so what padding buys here is ink the chip cannot give.
          className={`flex min-w-0 flex-1 items-center justify-center rounded-lg px-0 py-4 text-center text-[11px] leading-[1.1] text-ink md:px-1 md:text-micro ${
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
    <section className="bg-paper gutter py-16 md:py-20 xl:py-section">
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

        {/* Side by side only at desktop. Each panel carries a diagram whose
            narrowest row is five chips, and halving a screen that is already
            narrower than the widest of those rows leaves nothing to draw it in. */}
        {/* Subgrid at the desktop step, where the two panels stand side by
            side: badge, prose and diagram then share three rows across both, so
            the drawings start on the same line and end on the same one. Left to
            themselves the panels each stacked their own content, and a prose
            block 17px taller on one side pushed that side's diagram down and
            shortened it by the same amount. */}
        <div className="grid w-full grid-cols-1 gap-5 xl:w-[81.25rem] xl:max-w-full xl:grid-cols-2 xl:grid-rows-[auto_auto_1fr]">
          <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-3 md:p-6 xl:grid xl:row-span-3 xl:grid-rows-subgrid">
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

            {/* The same three things stacked as the panel opposite —
                application, one container, hardware — so the two diagrams are
                read as one pair and the difference between them is what is
                inside the container, not how it is drawn. The dashed connectors
                that used to run between the inner rows are gone with the 552px
                grid that positioned them; the arrows into and out of the
                container are all that is left, and they are the same two the
                other side has.

                Revealed a piece at a time, against the other column's single
                piece: the staging is now the only thing carrying "many hands,
                months of it". */}
            <div className="w-full">
              <div className="flex h-full flex-col items-center gap-2 rounded-xl border border-line bg-paper p-1.5 text-ink md:p-5">
                {[
                  <AppHeader key="app" />,
                  <DownArrow key="into" />,
                  <div
                    key="work"
                    // Neutral where the box opposite is accent: the rows inside
                    // are already accent and accent-blue, and one undifferentiated
                    // grey holding all of them is this side's whole claim.
                    //
                    // p-1.5 below the tablet, matched by the frame outside it and
                    // by the panel outside that. The five-chip row is what sets
                    // the 360 floor, so every pixel the labels are read at is a
                    // pixel these three rings gave up: 12/6/6 against the 16/20/-
                    // they started at, which is 24px of row and the difference
                    // between a 10px label and an 11px one.
                    className="flex w-full flex-col gap-2 rounded-2xl border border-line bg-surface p-1.5 md:p-5"
                  >
                    <ProcessRow steps={todaySpecialistWork} tone="brand" />
                    <ProcessRow steps={todayHandwork} tone="blue" />
                    {/* text-center as well as justify-center: the flex property
                        centres the block, and on a phone the label wraps, leaving
                        the second line ranged left inside a centred block. */}
                    <div className="flex w-full items-center justify-center rounded-lg bg-accent px-5 py-4 text-center text-body-sm text-ink">
                      {todayHardwareWork}
                    </div>
                  </div>,
                  <PlatformRow key="platforms" withArrows />,
                ].map((step, index) => (
                  // justify-center rather than a bare block: the arrow is the one
                  // child narrower than the column, and its wrapper is what has to
                  // centre it now that it sits in one.
                  <Reveal key={step.key} className="flex w-full justify-center" delay={index * 150}>
                    {step}
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* The border is transparent rather than absent: the panel opposite
              has one, and without it this box measures 2px wider inside. */}
          <div className="flex flex-col gap-5 rounded-2xl border border-transparent bg-ink p-3 md:p-6 xl:grid xl:row-span-3 xl:grid-rows-subgrid">
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

            {/* Arrives as one piece, against the other column's four. */}
            <div className="w-full">
              {/* p-1.5 below the tablet to match the frame opposite, which gave
                  up that padding to buy its chips a readable label. */}
              <Reveal className="flex h-full flex-col items-center gap-2 rounded-xl border border-line bg-paper p-1.5 text-ink md:p-5">
                <AppHeader />
                <DownArrow />
                {/* Stacked, this column is shorter than the one opposite it —
                    still, now that both are three things: the container here
                    holds two rows against that one's three plus a bar. On a
                    phone and a tablet it takes the drawn height; at the
                    desktop step, where the two diagrams share a row, it absorbs
                    whatever that row leaves rather than carrying a number tuned
                    to one width — 18.8125rem matched at 1920 and was 27px short
                    at 1024. */}
                <div className="flex h-[12rem] w-full flex-col gap-2 rounded-2xl border border-accent bg-accent/40 p-5 md:h-[16rem] xl:h-auto xl:flex-1">
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
