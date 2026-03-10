'use client';

import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionReveal from '@/components/ui/SectionReveal';
import RevealText from '@/components/ui/RevealText';

const services = [
  {
    number: '01',
    title: 'Get Found',
    subtitle: 'Design & Development',
    description: 'A website that looks premium and converts. Faster load times, intuitive booking flows, and a design that builds trust the moment someone lands. No templates — built for your brand, your audience, your goals.',
    outcome: 'Clients see 2–3x more enquiries within the first quarter.',
  },
  {
    number: '02',
    title: 'Get Chosen',
    subtitle: 'SEO & Search Strategy',
    description: 'Rank for the searches your ideal customers are making. We build the technical foundation and content strategy that puts you ahead of competitors in Google — and keeps you there.',
    outcome: 'Average #1 local ranking within 6 months.',
  },
  {
    number: '03',
    title: 'Get Recommended',
    subtitle: 'AI Visibility',
    description: 'When someone asks ChatGPT for "the best spa near me" or "top golf clubs in London" — your name comes up. We optimise your brand for the AI-powered search that\'s replacing Google for millions.',
    outcome: 'Crestview Members Club built a 400+ waitlist in 3 months.',
  },
];

export default function ServicesOverview() {
  return (
    <section className="bg-cream py-[var(--section-gap)]">
      <div
        className="mx-auto px-[var(--gutter)]"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <Eyebrow className="mb-4 block">How We Grow Your Business</Eyebrow>
        <RevealText
          as="h2"
          className="font-display font-normal text-text-dark text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] max-w-[700px] mb-12"
        >
          Three ways we put more customers through your door
        </RevealText>

        <SectionReveal className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-[var(--grid-gap)]">
          {services.map((service) => (
            <div key={service.number} className="group">
              <span className="font-display text-[clamp(36px,4vw,56px)] text-gold/30 leading-none block mb-4">
                {service.number}
              </span>
              <h3 className="font-display text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-dark mb-1">
                {service.title}
              </h3>
              <p className="font-body text-xs text-gold-muted uppercase tracking-[0.15em] mb-4">
                {service.subtitle}
              </p>
              <p className="font-body text-[length:var(--type-body)] leading-[var(--type-body-lh)] text-text-muted-dark font-light mb-4">
                {service.description}
              </p>
              <p className="font-body text-sm text-gold-muted font-medium italic">
                {service.outcome}
              </p>
              <div className="h-px bg-gold/20 w-full mt-6" />
            </div>
          ))}
        </SectionReveal>

        <div className="mt-12">
          <Link
            href="/services"
            className="font-body text-sm font-medium text-gold-muted hover:text-gold transition-colors"
          >
            See Pricing & Packages →
          </Link>
        </div>
      </div>
    </section>
  );
}
