import {HeroSection} from '@/components/home/HeroSection';
import {SolutionSection} from '@/components/home/SolutionSection';
import {TechnicalSection} from '@/components/home/TechnicalSection';

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <HeroSection />
      <SolutionSection />
      <TechnicalSection />
    </div>
  );
}
