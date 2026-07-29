// The stack diagrams below are transcribed verbatim from the 260728 design, which
// still carries ML-inference placeholder labels (vLLM / PyTorch / Triton, MAX,
// CUDA / ROCm). They describe the wrong domain for this site and must be replaced
// with cryptography equivalents before launch.
type Box = {label: string; sublabel?: string; tone: 'neutral' | 'accent'; tall?: boolean};

const todayStack: Box[] = [
  {label: 'Your application', tone: 'neutral'},
  {label: 'Custom or open-source model', tone: 'neutral'},
  {label: 'vLLM / PyTorch / Triton', tone: 'accent'},
];

const todayTargets: {head?: Box; device: Box}[] = [
  {head: {label: 'NVIDIA CUDA stack', tone: 'accent'}, device: {label: 'NVIDIA', sublabel: 'B200', tone: 'neutral'}},
  {head: {label: 'AMD ROCm stack', tone: 'accent'}, device: {label: 'AMD', sublabel: 'MI355X', tone: 'neutral'}},
];

const fractalyzeStack: Box[] = [
  {label: 'Your application', tone: 'neutral'},
  {label: 'Custom or open-source model', tone: 'neutral'},
  {label: 'MAX', tone: 'accent', tall: true},
];

const fractalyzeTargets: {head?: Box; device: Box}[] = [
  {device: {label: 'NVIDIA', sublabel: 'B200', tone: 'neutral'}},
  {device: {label: 'AMD', sublabel: 'MI355X', tone: 'neutral'}},
];

const toneClass = {
  neutral: 'bg-surface border border-line',
  accent: 'bg-accent',
};

function StackBox({box}: {box: Box}) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center rounded-lg px-5 py-4 ${toneClass[box.tone]} ${
        box.tall ? 'h-[114px]' : ''
      }`}
    >
      <span
        className={
          box.tall ? 'text-body-lg font-semibold text-ink' : 'text-body-sm text-ink'
        }
      >
        {box.label}
      </span>
      {box.sublabel && <span className="text-[11px] leading-[12px] text-muted">{box.sublabel}</span>}
    </div>
  );
}

function Connector() {
  return (
    <div className="flex h-10 items-center justify-center gap-5" aria-hidden>
      <span className="h-full w-px bg-line-strong" />
      <span className="h-full w-px bg-line-strong" />
    </div>
  );
}

function Diagram({
  stack,
  targets,
}: {
  stack: Box[];
  targets: {head?: Box; device: Box}[];
}) {
  return (
    <div className="flex w-full flex-col items-center gap-2 rounded-xl border border-line bg-paper p-5">
      <StackBox box={stack[0]} />
      <Connector />
      {stack.slice(1).map((box) => (
        <StackBox key={box.label} box={box} />
      ))}
      <div className="flex w-full items-stretch gap-2">
        {targets.map(({head, device}) => (
          <div key={device.sublabel ?? device.label} className="flex flex-1 flex-col items-center gap-2">
            {head && <StackBox box={head} />}
            <Connector />
            <StackBox box={device} />
          </div>
        ))}
      </div>
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

        <div className="flex w-[1300px] max-w-full items-stretch gap-8">
          <div className="flex flex-1 flex-col gap-5 rounded-2xl border border-line bg-surface p-8">
            <span className="w-fit rounded-full border border-line bg-paper px-4 py-1.5 text-caption text-muted">
              Today
            </span>
            <div className="flex flex-col gap-4">
              <h3 className="text-title-2 font-medium text-ink">Expensive &amp; Complex</h3>
              <p className="text-body-lg font-medium text-ink">
                Many specialists. Months of engineering.
              </p>
              <p className="whitespace-pre-line text-body text-ink">
                {'Protocol, compiler, GPU, and runtime engineers working in separate silos\nMonths of manual integration, tuning, and performance iteration\nEvery new scheme or hardware target starts from scratch'}
              </p>
            </div>
            <Diagram stack={todayStack} targets={todayTargets} />
          </div>

          <div className="flex flex-1 flex-col gap-5 rounded-2xl bg-ink p-8">
            <span className="w-fit rounded-full border border-line bg-paper px-4 py-1.5 text-caption text-muted">
              With Fractalyze
            </span>
            <div className="flex flex-col gap-4">
              <h3 className="text-title-2 font-medium text-paper">Automated &amp; Simple</h3>
              <p className="text-body-lg font-medium text-paper">
                Focus on your application, we handle the rest.
              </p>
              <p className="whitespace-pre-line text-body text-paper">
                {'One compiler automatically optimizes and generates execution code\nA runtime handles high-performance execution and memory management\nOrchestration scales the same workload across CPU, GPU, TPU, and FPGA'}
              </p>
            </div>
            <Diagram stack={fractalyzeStack} targets={fractalyzeTargets} />
          </div>
        </div>
      </div>
    </section>
  );
}
