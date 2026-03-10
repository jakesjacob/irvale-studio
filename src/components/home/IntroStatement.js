'use client';

import RevealText from '@/components/ui/RevealText';
import SectionReveal from '@/components/ui/SectionReveal';
import Eyebrow from '@/components/ui/Eyebrow';
import Counter from '@/components/ui/Counter';

const stats = [
  { value: 340, suffix: '%', label: 'Increase in enquiries' },
  { value: 180, suffix: '%', label: 'More direct bookings' },
  { value: 72, suffix: 'hrs', label: 'Sell-out after launch' },
];

export default function IntroStatement() {
  return (
    <section className="bg-dark py-[var(--section-gap)]">
      <div
        className="mx-auto px-[var(--gutter)]"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <Eyebrow className="mb-8 block">What We Do For You</Eyebrow>

        <RevealText
          as="h2"
          className="font-display font-normal text-text-light text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] max-w-[800px] mb-12"
        >
          Your digital presence should be as refined as the experience you offer.
        </RevealText>

        <SectionReveal className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <p className="font-body text-[length:var(--type-body-lg)] leading-[var(--type-body-lg-lh)] text-text-muted-light font-light">
            We design and build bespoke websites for hospitality, wellness, and private membership brands — paired with SEO, AI visibility, and digital marketing that turns your digital presence into a growth channel.
          </p>
          <p className="font-body text-[length:var(--type-body-lg)] leading-[var(--type-body-lg-lh)] text-text-muted-light font-light">
            No templates. No generic agencies. Every project is built around your brand, your audience, and the metrics that actually matter to your business.
          </p>
        </SectionReveal>

        {/* Client result stats */}
        <SectionReveal className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[var(--border-dark)]">
          {stats.map((stat, i) => (
            <div key={i} className="relative pl-6 border-l border-gold/30">
              <div className="font-display text-[clamp(36px,5vw,64px)] text-gold leading-none mb-2">
                +<Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="font-body text-[length:var(--type-caption)] leading-[var(--type-caption-lh)] text-text-muted-light uppercase tracking-[var(--type-label-ls)]">
                {stat.label}
              </p>
            </div>
          ))}
        </SectionReveal>
      </div>
    </section>
  );
}
