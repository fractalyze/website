// Figures shown on the compiler page. Kept apart from the component so a
// refresh is a data edit; `percent` is both the label and the bar length.
export type Benchmark = {
  workload: string;
  baseline?: string;
  percent: number;
};

export const benchmarks: Benchmark[] = [
  {workload: 'msm(bn254 g1, 2^24)', baseline: 'vs icicle', percent: 80},
  {workload: 'msm(bn254 g2, 2^24)', baseline: 'vs icicle', percent: 70},
  {workload: 'ntt(bn254, 2^24)', baseline: 'vs icicle', percent: 55},
  {workload: 'ntt(koalabear, 2^24)', baseline: 'vs sp1', percent: 45},
  {workload: 'ntt(F_{2^8}, 2^24', baseline: 'vs binius gpu', percent: 40},
  {workload: 'groth16_proof_gen', baseline: 'vs gnark gpu', percent: 38},
  {workload: 'sp1_hc_checkpoint_gen', percent: 35},
  {workload: 'sp1_hc_trace_gen (gpu)', percent: 30},
  {workload: 'sp1_hc_trace_commit', percent: 20},
  {workload: 'sp1_hc_logup_gkr', percent: 15},
  {workload: 'sp1_hc_zerocheck', percent: 10},
  {workload: 'sp1_hc_jagged_evals', percent: 5},
];
