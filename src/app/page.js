import Marquee from '@/components/ui/Marquee';
import HeroSection from '@/components/home/HeroSection';
import TrustLogos from '@/components/home/TrustLogos';
import IntroStatement from '@/components/home/IntroStatement';
import FeaturedWork from '@/components/home/FeaturedWork';
import ServicesOverview from '@/components/home/ServicesOverview';
import Accredited from '@/components/home/Accredited';
import TechStack from '@/components/home/TechStack';
import Process from '@/components/home/Process';
import Testimonial from '@/components/home/Testimonial';
import CTASection from '@/components/home/CTASection';

const marqueeItems = [
  'Bespoke', 'Considered', 'Refined', 'Strategic',
  'Intentional', 'Elevated', 'Precision', 'Crafted',
];

export default function Home() {
  return (
    <main>
      {/* Hero — full-bleed golf course image, centered text */}
      <HeroSection />

      {/* Premium positioning marquee */}
      <div className="bg-dark-2 py-5 border-y border-[var(--border-dark)]">
        <Marquee
          items={marqueeItems}
          separator="—"
          className="font-display italic text-[length:var(--type-body)] text-text-light/20 tracking-[0.12em]"
          speed={60}
        />
      </div>

      {/* Problem statement + client outcome stats */}
      <IntroStatement />

      {/* Scrolling client logos */}
      <TrustLogos />

      {/* Client results — horizontal scroll */}
      <FeaturedWork />

      {/* Services — Get Found / Get Chosen / Get Recommended */}
      <ServicesOverview />

      {/* Tech stack carousel */}
      <TechStack />

      {/* Accredited & Proven credentials */}
      <Accredited />

      {/* Sticky process section */}
      <Process />

      {/* Client testimonials */}
      <Testimonial />

      {/* Final CTA */}
      <CTASection />
    </main>
  );
}
