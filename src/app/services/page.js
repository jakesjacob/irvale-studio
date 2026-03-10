import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import RevealText from '@/components/ui/RevealText';
import SectionReveal from '@/components/ui/SectionReveal';
import Marquee from '@/components/ui/Marquee';
import ServiceCards from '@/components/services/ServiceCards';
import AddOnsGrid from '@/components/services/AddOnsGrid';
import FAQAccordion from '@/components/services/FAQAccordion';

export const metadata = {
  title: 'Services — Irvale Studio',
  description: 'Bespoke web design, SEO, and AI visibility for luxury brands. Three tiers, one standard: exceptional.',
};

export default function ServicesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-dark pt-32 pb-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-6 block">Services & Pricing</Eyebrow>
          <RevealText
            as="h1"
            className="font-display italic font-normal text-text-light text-[length:var(--type-h1)] leading-[var(--type-h1-lh)] max-w-[800px] mb-6"
          >
            Three tiers. One standard: exceptional
          </RevealText>
          <p className="font-body text-[length:var(--type-body-lg)] text-text-muted-light font-light max-w-lg">
            Every project includes bespoke design, clean development, and foundational SEO.
            Choose the scope that fits your ambition.
          </p>
        </div>
      </section>

      {/* Tier Cards */}
      <ServiceCards />

      {/* Marquee */}
      <div className="bg-dark py-4 border-y border-[var(--border-dark)]">
        <Marquee
          items={['ESSENTIALS', 'SIGNATURE', 'ELITE', 'BESPOKE']}
          className="font-display text-lg text-gold/60 tracking-[0.2em]"
          speed={20}
        />
      </div>

      {/* Add-Ons */}
      <AddOnsGrid />

      {/* FAQ */}
      <FAQAccordion />
    </main>
  );
}
