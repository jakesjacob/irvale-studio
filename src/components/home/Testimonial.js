'use client';

import SectionReveal from '@/components/ui/SectionReveal';
import Eyebrow from '@/components/ui/Eyebrow';

const testimonials = [
  {
    quote: 'We went from losing 70% of bookings to OTAs to taking the majority direct. The ROI was immediate.',
    author: 'Catherine Ashworth',
    role: 'General Manager, The Halcyon Hotel',
    result: '+180% direct bookings',
  },
  {
    quote: 'We went from having nothing online to being fully booked within two months. Irvale made it effortless.',
    author: 'Marcus Cole',
    role: 'Founder, Blackwood Performance',
    result: '+210% class bookings',
  },
];

export default function Testimonial() {
  return (
    <section className="bg-cream py-[var(--section-gap)]">
      <div
        className="mx-auto px-[var(--gutter)]"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <Eyebrow className="mb-12 block text-center">What Our Clients Say</Eyebrow>

        <SectionReveal className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-[var(--component-gap)]">
          {testimonials.map((t, i) => (
            <div key={i}>
              <div className="w-12 h-px bg-gold mb-8" />

              <p className="font-display text-gold text-[clamp(20px,2.5vw,28px)] leading-tight mb-6 font-medium">
                {t.result}
              </p>

              <blockquote className="font-display italic text-[clamp(20px,2.5vw,36px)] leading-[1.3] text-text-dark mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <p className="font-body text-sm font-medium text-text-dark">
                {t.author}
              </p>
              <p className="font-body text-xs text-text-muted-dark mt-1">
                {t.role}
              </p>
            </div>
          ))}
        </SectionReveal>
      </div>
    </section>
  );
}
