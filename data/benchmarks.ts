// Figures shown on the compiler page. Measured times are stored rather than
// ratios so the chart cannot drift from the measurement: every speedup and bar
// length on the page is derived from these two numbers.
//
// Times are milliseconds. Sub-millisecond results are recorded in ms as well
// (240 µs is 0.24) so that a single unit divides cleanly.

export type Baseline = {
  /**
   * Implementation, printed beside the bar it produced.
   *
   * One name covers a library and its bindings — every icicle comparison reads
   * `ICICLE` whether it ran against the CUDA library or the gnark integration
   * over it. Which of the two a row actually used is on the row.
   */
  name: string;
  ms: number;
};

export type Benchmark = {
  /** Identifier the operation goes by in the provers being compared. */
  workload: string;
  /**
   * Problem size, printed in parentheses after the name.
   *
   * Only the kernels have one. A prover stage is whatever the block it ran on
   * happened to need, so there is no size to state and no parentheses to print.
   */
  size?: string;
  /** What was actually run — a block, a shard, a circuit. */
  instance?: string;
  /** Our time, against which every baseline on the row is compared. */
  ms: number;
  /** One bar is drawn per entry, so a workload may be measured against several. */
  baselines: Baseline[];
  /** What the clock covered — a single kernel, or the run end to end. */
  basis: 'kernel' | 'wall-clock';
  /** Anything a reader needs to weigh the row, especially unequal hardware. */
  note?: string;
};

export const benchmarks: Benchmark[] = [
  {
    workload: 'msm_bn254_g1',
    size: '2^24',
    ms: 59.13,
    baselines: [{name: 'ICICLE', ms: 64.49}],
    basis: 'kernel',
  },
  {
    workload: 'msm_bn254_g2',
    size: '2^24',
    ms: 154.45,
    baselines: [{name: 'ICICLE', ms: 163.42}],
    basis: 'wall-clock',
  },
  {
    workload: 'ntt_bn254',
    size: '2^24',
    ms: 5.21,
    baselines: [{name: 'ICICLE', ms: 4.51}],
    basis: 'kernel',
    note: 'ICICLE v4, Montgomery form',
  },
  {
    workload: 'ntt_koalabear',
    size: '2^24',
    ms: 0.3385,
    baselines: [{name: 'SP1', ms: 0.24}],
    basis: 'kernel',
    note: 'sppark, Montgomery form',
  },
  {
    workload: 'ntt_gf2_32',
    size: '2^24',
    ms: 12.894,
    baselines: [{name: 'Binius GPU', ms: 16.797}],
    basis: 'kernel',
  },
  {
    workload: 'groth16_prove',
    size: '2^24',
    instance: 'SP1 verifier circuit',
    ms: 1573,
    baselines: [{name: 'ICICLE', ms: 2355}],
    basis: 'wall-clock',
    note: 'gnark binding, 15,965,950 constraints',
  },
  {
    workload: 'sp1_checkpoint_gen',
    instance: 'block 21740136',
    ms: 1200,
    baselines: [{name: 'SP1', ms: 2230}],
    basis: 'wall-clock',
    note: 'both CPU',
  },
  {
    workload: 'sp1_trace_gen',
    instance: 'block 21740136',
    ms: 518.67,
    baselines: [{name: 'SP1', ms: 1140}],
    basis: 'wall-clock',
    note: 'our GPU vs SP1 CPU',
  },
  {
    workload: 'sp1_trace_commit',
    instance: 'block 21740136, shard 17',
    ms: 17.6,
    baselines: [{name: 'SP1', ms: 16.6}],
    basis: 'wall-clock',
    note: 'both GPU',
  },
  {
    workload: 'sp1_logup_gkr',
    instance: 'block 21740136, shard 17',
    ms: 20.4,
    baselines: [{name: 'SP1', ms: 19.9}],
    basis: 'wall-clock',
    note: 'both GPU',
  },
  {
    workload: 'sp1_zerocheck',
    instance: 'block 21740136, shard 17',
    ms: 50.8,
    baselines: [{name: 'SP1', ms: 156.9}],
    basis: 'wall-clock',
    note: 'both GPU',
  },
  {
    workload: 'sp1_jagged_evals',
    instance: 'block 21740136, shard 17',
    ms: 37.8,
    baselines: [{name: 'SP1', ms: 41.1}],
    basis: 'wall-clock',
    note: 'both GPU',
  },
];

/** How many times faster we are. Below 1 means the baseline is ahead. */
export function speedup(benchmark: Benchmark, baseline: Baseline): number {
  return baseline.ms / benchmark.ms;
}

/**
 * Bar length in "times" units, signed so that winning points right.
 *
 * Parity is zero, and being twice as fast is the same distance from it as
 * being twice as slow — a ratio of 2 and a ratio of 0.5 both give length 1.
 * Without that reflection a 6× loss would draw at 0.84 and a 6× win at 5.
 */
export function magnitude(ratio: number): number {
  return ratio >= 1 ? ratio - 1 : -(1 / ratio - 1);
}

/** The multiple a reader sees: always at or above 1, with the side named. */
export function readout(ratio: number): {times: number; faster: boolean} {
  return ratio >= 1 ? {times: ratio, faster: true} : {times: 1 / ratio, faster: false};
}

// Room past the longest bar on each side, so nothing runs into the card edge.
const HEADROOM = 1.12;

/**
 * Where parity sits, and how long a bar of a given magnitude is — both as a
 * percentage of the track.
 *
 * Derived from the data rather than fixed, so the line settles wherever the two
 * sides balance — right of centre while the worst loss exceeds the best win,
 * left of it once the wins are larger. Pinning it would misreport both.
 */
export function axisOf(rows: Benchmark[]) {
  const lengths = rows.flatMap((row) => row.baselines.map((b) => magnitude(speedup(row, b))));
  const behind = Math.max(0, ...lengths.map((v) => -v)) * HEADROOM;
  const ahead = Math.max(0, ...lengths.map((v) => v)) * HEADROOM;
  const span = behind + ahead;

  return {
    parityPercent: span === 0 ? 50 : (behind / span) * 100,
    lengthPercent: (value: number) => (span === 0 ? 0 : (Math.abs(value) / span) * 100),
  };
}
