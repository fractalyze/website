import {CompilerHeroSection} from '@/components/compiler/CompilerHeroSection';
import {WhyCompilerSection} from '@/components/compiler/WhyCompilerSection';
import {BenchmarkSection} from '@/components/compiler/BenchmarkSection';
import {PipelineSection} from '@/components/compiler/PipelineSection';

export const metadata = {
  title: 'Compiler',
  description:
    'Build cryptographic applications in Python. Compile them into highly optimized execution for modern hardware.',
};

export default function CompilerPage() {
  return (
    <>
      <CompilerHeroSection />
      <WhyCompilerSection />
      <BenchmarkSection />
      <PipelineSection />
    </>
  );
}
