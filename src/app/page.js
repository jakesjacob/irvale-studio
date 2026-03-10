import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import Marquee from '@/components/ui/Marquee';
import HeroSection from '@/components/home/HeroSection';
import TrustLogos from '@/components/home/TrustLogos';
import IntroStatement from '@/components/home/IntroStatement';
import FeaturedWork from '@/components/home/FeaturedWork';
import ServicesOverview from '@/components/home/ServicesOverview';
import Process from '@/components/home/Process';
import Testimonial from '@/components/home/Testimonial';
import CTASection from '@/components/home/CTASection';

const marqueeItems = [
  '+340% ENQUIRIES', '+180% DIRECT BOOKINGS', 'SOLD OUT IN 72HRS',
  '+210% CLASS BOOKINGS', '400+ WAITLIST', '#1 LOCAL RANKINGS',
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <HeroSection />

      {/* Marquee */}
      <div className="bg-dark-2 py-4 border-y border-[var(--border-dark)]">
        <Marquee
          items={marqueeItems}
          className="font-body text-sm font-medium text-text-muted-light tracking-[0.15em] uppercase"
          speed={25}
        />
      </div>

      {/* Trust Logos */}
      <TrustLogos />

      {/* Intro Statement */}
      <IntroStatement />

      {/* Featured Work */}
      <FeaturedWork />

      {/* Services Overview */}
      <ServicesOverview />

      {/* Process */}
      <Process />

      {/* Testimonial */}
      <Testimonial />

      {/* CTA */}
      <CTASection />
    </main>
  );
}
