import {CompilerHeroSection} from '@/components/compiler/CompilerHeroSection';
import {WhyCompilerSection} from '@/components/compiler/WhyCompilerSection';
import {BenchmarkSection} from '@/components/compiler/BenchmarkSection';
import {PipelineSection} from '@/components/compiler/PipelineSection';

export const metadata = {
  title: 'Compiler',
  description:
    'Build cryptographic applications in Python. Compile them into highly optimized execution for modern hardware.',
  alternates: {canonical: '/compiler'},
  // Declared rather than inherited: a page that leaves openGraph alone keeps
  // the root's, and would tell a share card it lives at the site root.
  openGraph: {
    title: 'Compiler',
    description:
      'Build cryptographic applications in Python. Compile them into highly optimized execution for modern hardware.',
    url: '/compiler',
    images: ['/images/og.jpg'],
  },
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
