import {Reveal} from '@/components/Reveal';

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

// Both panels open on the same box and close on the same box. What a customer
// arrives with and what they leave with does not change between the two
// columns, so drawing either of them differently would put the difference in
// the wrong place: the claim is about what happens in between, and the diagram
// should have nothing else for the eye to catch on.
const requirements = ['Confidentiality', 'Verifiability', 'Compliance', 'Performance'];

// The two diagrams hold the same five pieces in the same order, so the only
// thing left to say how long each side takes is the gap between them. At 150ms
// the left arrives as a sequence a reader counts; at 50ms the right arrives as
// one motion that happens to be ordered. Last piece starts at 600ms against
// 200ms, which is the three-to-one the panels are claiming in words.
const TODAY_STAGGER_MS = 150;
const FRACTALYZE_STAGGER_MS = 50;

const dashed = {strokeWidth: 1.5, strokeDasharray: '3 3'} as const;

function head(x: number, y: number) {
  return `M${x - 4} ${y} L${x + 4} ${y} L${x} ${y + 8} Z`;
}

function DownArrow() {
  return (
    <svg viewBox="0 0 12 40" className="h-10 w-3" fill="none" stroke="currentColor" aria-hidden>
      <line x1={6} y1={0} x2={6} y2={32} {...dashed} />
      <path d={head(6, 32)} fill="currentColor" stroke="none" />
    </svg>
  );
}

function StageBox({label, detail}: {label: string; detail?: string}) {
  return (
    <div className="flex w-full flex-col items-center gap-1 rounded-lg border border-line bg-surface px-5 py-4 text-center">
      <span className="text-body-sm text-ink">{label}</span>
      {detail && <span className="text-micro text-muted">{detail}</span>}
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
            From Complexity to Production
          </h2>
          <p className="text-balance text-body-sm text-ink md:text-body-lg">
            We bring confidential and verifiable systems to production, from architecture and
            implementation to optimization and operations.
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
                <li>
                  Cryptography, security, compiler, GPU, and infrastructure specialists working
                  across separate stacks
                </li>
                <li>Months of manual integration, tuning, and performance iteration</li>
                <li>Every new scheme or hardware target starts from scratch</li>
              </ul>
            </div>

            {/* Revealed a piece at a time, and slower than the column opposite.
                Same five pieces on both sides, so the gap between them is the
                only thing left to carry how long each side takes. */}
            <div className="w-full">
              <div className="flex h-full flex-col items-center gap-2 rounded-xl border border-line bg-paper p-1.5 text-ink md:p-5">
                {[
                  <StageBox key="req" label="Your requirements" detail={requirements.join(' · ')} />,
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
                    // pixel these three rings gave up.
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
                  <DownArrow key="out" />,
                  <StageBox key="prod" label="Production system" />,
                ].map((step, index) => (
                  // justify-center rather than a bare block: the arrow is the one
                  // child narrower than the column, and its wrapper is what has to
                  // centre it now that it sits in one.
                  <Reveal key={step.key} className="flex w-full justify-center" delay={index * TODAY_STAGGER_MS}>
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
                Production Ready
              </h3>
              <p className="text-body-sm font-medium text-paper md:text-body-lg">
                Focus on your application. We handle the rest.
              </p>
              <ul className="list-disc pl-5 text-body-sm text-paper md:text-body">
                <li>We design and build the right system for your requirements</li>
                <li>We optimize performance with our compiler and hardware stack</li>
                <li>We deploy, operate, and scale it in production</li>
              </ul>
            </div>

            {/* Staged the same way as the column opposite but three times
                quicker. Revealing this side all at once made the pair read as
                two different drawings rather than the same drawing with a
                different middle; revealing it on the same clock lost the one
                thing the staging was for. Same order, shorter gap. */}
            <div className="w-full">
              <div className="flex h-full flex-col items-center gap-2 rounded-xl border border-line bg-paper p-1.5 text-ink md:p-5">
                {[
                  {
                    key: 'req',
                    grow: false,
                    node: (
                      <StageBox label="Your requirements" detail={requirements.join(' · ')} />
                    ),
                  },
                  {key: 'into', grow: false, node: <DownArrow />},
                  {
                    key: 'frx',
                    // The one step that has to stretch: at the desktop step the
                    // diagram takes the height of the taller column opposite,
                    // and this box is what absorbs the difference. The grow sits
                    // on the wrapper because that is the flex child now, and the
                    // box inside fills it.
                    grow: true,
                    node: (
                      // One name and a line of small print, against eleven chips
                      // and a bar opposite. Anything boxed in here would have
                      // been read in the same grammar as that column — objects
                      // in a row, counted — and a smaller count of the same
                      // thing says "less of that work", not "none of it".
                      <div className="flex h-[9rem] w-full flex-col items-center justify-center gap-2 rounded-2xl border border-accent bg-accent/40 p-5 text-center md:h-[11rem] xl:h-full">
                        <span className="text-title-4 font-medium text-ink md:text-title-3">
                          Fractalyze
                        </span>
                        <span className="text-balance text-micro text-muted">
                          Powered by FRX Compiler &amp; Orchestration
                        </span>
                      </div>
                    ),
                  },
                  {key: 'out', grow: false, node: <DownArrow />},
                  {key: 'prod', grow: false, node: <StageBox label="Production system" />},
                ].map((step, index) => (
                  <Reveal
                    key={step.key}
                    className={`flex w-full justify-center ${step.grow ? 'xl:flex-1' : ''}`}
                    delay={index * FRACTALYZE_STAGGER_MS}
                  >
                    {step.node}
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
