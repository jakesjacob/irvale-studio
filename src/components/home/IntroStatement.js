'use client';

import RevealText from '@/components/ui/RevealText';
import SectionReveal from '@/components/ui/SectionReveal';
import Eyebrow from '@/components/ui/Eyebrow';
import Counter from '@/components/ui/Counter';

const stats = [
  { value: 340, suffix: '%', label: 'Average increase in enquiries' },
  { value: 180, suffix: '%', label: 'More direct bookings' },
  { value: 72, suffix: 'hrs', label: 'Fastest sell-out after launch' },
];

export default function IntroStatement() {
  return (
    <section className="bg-dark py-[var(--section-gap)]">
      <div
        className="mx-auto px-[var(--gutter)]"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <Eyebrow className="mb-8 block">The Problem</Eyebrow>

        <RevealText
          as="h2"
          className="font-display font-normal text-text-light text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] max-w-[800px] mb-12"
        >
          Your brand deserves better than a template website that loses you money
        </RevealText>

        <SectionReveal className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <p className="font-body text-[length:var(--type-body-lg)] leading-[var(--type-body-lg-lh)] text-text-muted-light font-light">
            Premium brands lose thousands every month to poorly built websites — high bounce rates, low conversions, and invisible search presence. Your competitors are taking the bookings that should be yours.
          </p>
          <p className="font-body text-[length:var(--type-body)] leading-[var(--type-body-lh)] text-text-muted-light font-light">
            We fix that. Bespoke design, technical SEO, and AI visibility — built specifically for hospitality, wellness, and private membership brands. The result? More people find you, more people trust you, and more people book.
          </p>
        </SectionReveal>

        {/* Client result stats */}
        <SectionReveal className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[var(--border-dark)]">
          {stats.map((stat, i) => (
            <div key={i} className="relative pl-6 border-l border-gold/30">
              <div className="font-display text-[clamp(36px,5vw,64px)] text-gold leading-none mb-2">
                +<Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="font-body text-xs text-text-muted-light uppercase tracking-[0.15em]">
                {stat.label}
              </p>
            </div>
          ))}
        </SectionReveal>
      </div>
    </section>
  );
}
