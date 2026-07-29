import {HeroSection} from '@/components/home/HeroSection';
import {ProductionGapSection} from '@/components/home/ProductionGapSection';
import {PoweringSection} from '@/components/home/PoweringSection';
import {CompilerOrchestrationSection} from '@/components/home/CompilerOrchestrationSection';
import {ComputingLayerSection} from '@/components/home/ComputingLayerSection';
import {WorkingWithUsSection} from '@/components/home/WorkingWithUsSection';
import {ResearchBlogSection} from '@/components/home/ResearchBlogSection';
import {ClosingBandSection} from '@/components/home/ClosingBandSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductionGapSection />
      <PoweringSection />
      <CompilerOrchestrationSection />
      <ComputingLayerSection />
      <WorkingWithUsSection />
      <ResearchBlogSection />
      <ClosingBandSection />
    </>
  );
}
