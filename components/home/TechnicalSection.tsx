import {CodeBlock} from '@/components/CodeBlock';
import {CompilerPipeline} from '@/components/CompilerPipeline';

const PYTHON_CODE = `import zorch
from zk_dtypes import babybear  # ZK field type (BabyBear)
import zorch.numpy as znp  # NumPy for field/group operations

class BrakedownCommitment:
  ...

class BrakedownProof:
  ...
# High-level SDK for defining the proving scheme
class Brakedown(zorch.PCS):
    @zorch.jit  # JIT compilation to optimized binary
    def commit(self, polynomial: znp.array) -> BrakedownCommitment:
      ...

    @zorch.jit
    def open(self, commitment: BrakedownCommitment, points: znp.array) -> BrakedownProof:
      ...

# Configure prover with field, PCS, and others.
prover = zorch.Prover(field=babybear, pcs=Brakedown(), ...)
# Generate proof
proof = prover.prove(input)`;

export function TechnicalSection() {
  return (
    <section className="border-t border-gray-100 py-32 dark:border-gray-900 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl lg:text-6xl">
          Zorch in Action
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-relaxed text-gray-600 dark:text-gray-400 lg:text-xl">
          Express proving schemes in Python. Let the compiler handle the complexity.
        </p>

        <div className="mt-16">
          <CodeBlock code={PYTHON_CODE} language="python" title="zorch_example.py" />
        </div>

        <div className="mt-24">
          <h3 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 lg:text-3xl">
            The Compilation Pipeline
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-gray-600 dark:text-gray-400 lg:text-lg">
            From Python to optimized binaries across all hardware targets
          </p>
          <div className="mt-12">
            <CompilerPipeline />
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          <div className="rounded-2xl bg-gray-50/50 p-8 shadow-sm transition-all hover:shadow-md dark:bg-gray-900/20 lg:p-10">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 lg:text-2xl">
              ZKX: Zero-Knowledge Accelerator
            </h3>
            <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
              XLA-inspired runtime compiler responsible for automatic optimization passes (fusion,
              partitioning) before conversion to ZKIR. Eliminates manual hardware tuning across CPU,
              GPU, and FPGA.
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50/50 p-8 shadow-sm transition-all hover:shadow-md dark:bg-gray-900/20 lg:p-10">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 lg:text-2xl">
              ZKIR: ZK Intermediate Representation
            </h3>
            <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
              Custom MLIR dialect that models ZK's unique algebraic structure, including specific
              dialects like elliptic_curve, field, and mod_arith.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
