interface PipelineStage {
  name: string;
  description: string;
  isProprietary?: boolean;
}

const stages: PipelineStage[] = [
  {name: 'Python', description: 'Zorch High-level SDK'},
  {name: 'Jaxpr', description: 'JAX IR'},
  {name: 'StableHLO', description: 'ZKX IR'},
  {name: 'HLO', description: 'ZKX IR'},
  {
    name: 'ZKX',
    description: 'Runtime compiler with ZK-specific optimizations',
    isProprietary: true,
  },
  {name: 'ZKIR', description: 'ZK Intermediate Representation', isProprietary: true},
  {name: 'Binary', description: 'Optimized executable'},
];

function StageBox({stage}: {stage: PipelineStage}) {
  return (
    <div
      className={`min-w-[140px] rounded-2xl px-6 py-4 text-center transition-all ${
        stage.isProprietary
          ? 'bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-sm dark:from-primary-600 dark:to-primary-800'
          : ''
      }`}
    >
      <div
        className={`text-sm font-semibold ${
          stage.isProprietary ? 'text-white' : 'text-gray-900 dark:text-gray-100'
        }`}
      >
        {stage.name}
      </div>
      <div
        className={`mt-1 text-xs ${
          stage.isProprietary
            ? 'text-primary-100 dark:text-primary-200'
            : 'text-gray-600 dark:text-gray-400'
        }`}
      >
        {stage.description}
      </div>
    </div>
  );
}

export function CompilerPipeline() {
  return (
    <div className="flex flex-col items-center gap-8">
      {/* Mobile: Vertical stack */}
      <div className="flex flex-col items-center gap-4 sm:hidden">
        {stages.map((stage, index) => (
          <div key={stage.name} className="flex flex-col items-center gap-3">
            <StageBox stage={stage} />
            {index < stages.length - 1 && (
              <div className="text-2xl text-gray-400 dark:text-gray-600">↓</div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop: Two-row flow layout */}
      <div className="hidden sm:flex sm:flex-col sm:items-start sm:gap-4">
        {/* Row 1: Python → Jaxpr → StableHLO → HLO → */}
        <div className="flex items-center gap-4">
          <StageBox stage={stages[0]} />
          <div className="text-2xl text-gray-400 dark:text-gray-600">→</div>
          <StageBox stage={stages[1]} />
          <div className="text-2xl text-gray-400 dark:text-gray-600">→</div>
          <StageBox stage={stages[2]} />
          <div className="text-2xl text-gray-400 dark:text-gray-600">→</div>
          <StageBox stage={stages[3]} />
          <div className="text-2xl text-gray-400 dark:text-gray-600">→</div>
        </div>

        {/* Row 2: ZKX → ZKIR → Binary */}
        <div className="flex items-center gap-4">
          <StageBox stage={stages[4]} />
          <div className="text-2xl text-gray-400 dark:text-gray-600">→</div>
          <StageBox stage={stages[5]} />
          <div className="text-2xl text-gray-400 dark:text-gray-600">→</div>
          <StageBox stage={stages[6]} />
        </div>
      </div>
    </div>
  );
}
