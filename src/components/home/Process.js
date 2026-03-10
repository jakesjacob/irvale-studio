'use client';

import Eyebrow from '@/components/ui/Eyebrow';
import SectionReveal from '@/components/ui/SectionReveal';

const steps = [
  {
    number: '01',
    title: 'We Learn Your Business',
    description: 'Your goals, your customers, your competitors. We go deep so the strategy is built on reality — not guesswork.',
  },
  {
    number: '02',
    title: 'We Map the Growth Plan',
    description: 'A clear roadmap covering what we\'ll build, how it\'ll convert, and where the traffic will come from. You\'ll know the ROI before we write a line of code.',
  },
  {
    number: '03',
    title: 'We Build & Launch',
    description: 'Bespoke design and development with weekly progress updates. You see everything as it comes together — no surprises.',
  },
  {
    number: '04',
    title: 'You Grow',
    description: 'Your site goes live and starts working. We monitor performance, optimise for conversions, and make sure the growth keeps compounding.',
  },
];

export default function Process() {
  return (
    <section className="bg-dark py-[var(--section-gap)]">
      <div
        className="mx-auto px-[var(--gutter)]"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <Eyebrow className="mb-12 block">From Brief to Growth</Eyebrow>

        <SectionReveal className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-[var(--grid-gap)] relative">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px border-t border-dashed border-gold/30" />

          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="hidden md:block absolute top-[29px] left-0 w-2 h-2 rounded-full bg-gold -translate-y-1/2" />

              <span className="font-display text-gold text-sm tracking-wider block mb-3 md:mt-12">
                {step.number}
              </span>
              <h3 className="font-display text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-light mb-3">
                {step.title}
              </h3>
              <p className="font-body text-sm text-text-muted-light font-light leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </SectionReveal>

        <p className="font-body text-xs text-text-muted-light mt-12">
          Most clients see measurable results within 90 days of launch.
        </p>
      </div>
    </section>
  );
}
