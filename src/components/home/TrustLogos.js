'use client';

import SectionReveal from '@/components/ui/SectionReveal';
import Eyebrow from '@/components/ui/Eyebrow';

const logos = [
  'Heathland GC',
  'Aura Wellness',
  'Blackwood',
  'The Halcyon',
  'Elara Dining',
  'Crestview',
];

export default function TrustLogos() {
  return (
    <section className="bg-cream py-[var(--section-gap)]">
      <div
        className="mx-auto px-[var(--gutter)]"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <SectionReveal className="text-center">
          <Eyebrow className="mb-12 block">Brands That Grew With Us</Eyebrow>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
            {logos.map((logo) => (
              <div
                key={logo}
                className="font-display text-lg text-text-dark/40 hover:text-text-dark/60 transition-opacity tracking-[0.1em] uppercase"
              >
                {logo}
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
