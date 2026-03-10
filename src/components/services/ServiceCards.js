'use client';

import Link from 'next/link';
import SectionReveal from '@/components/ui/SectionReveal';
import MagneticButton from '@/components/ui/MagneticButton';
import { cn } from '@/lib/utils';

const tiers = [
  {
    name: 'Essentials',
    price: '£6,000',
    monthly: '£350/mo',
    features: [
      'Up to 6 pages',
      'Bespoke design',
      'Mobile responsive',
      'Basic SEO setup',
      'Contact form integration',
      '30-day post-launch support',
    ],
    highlighted: false,
  },
  {
    name: 'Signature',
    price: '£12,000',
    monthly: '£750/mo',
    badge: 'MOST POPULAR',
    features: [
      'Up to 12 pages',
      'Bespoke design + animations',
      'Full SEO strategy',
      'CMS integration',
      'Booking/payment integration',
      '60-day post-launch support',
    ],
    highlighted: true,
  },
  {
    name: 'Elite',
    price: '£22,000',
    monthly: '£1,500/mo',
    features: [
      'Unlimited pages',
      'Brand workshop included',
      'AI Search Visibility included',
      'Custom admin panel',
      'Dedicated account manager',
      'Priority ongoing support',
    ],
    highlighted: false,
  },
];

export default function ServiceCards() {
  return (
    <section className="bg-cream py-[var(--section-gap)]">
      <div
        className="mx-auto px-[var(--gutter)]"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <SectionReveal className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-[var(--grid-gap)]">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                'relative bg-white p-8 md:p-10 flex flex-col',
                tier.highlighted
                  ? 'border border-gold md:-mt-3 md:pb-[calc(2.5rem+12px)]'
                  : 'border border-[var(--border-light)]'
              )}
            >
              {tier.badge && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 font-body text-[10px] font-medium uppercase tracking-[0.2em] bg-gold text-dark px-4 py-1">
                  {tier.badge}
                </span>
              )}

              <h3 className="font-display text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-dark mb-2">
                {tier.name}
              </h3>

              <div className="mb-6">
                <span className="font-display text-[clamp(28px,3vw,40px)] text-text-dark leading-none">
                  {tier.price}
                </span>
                <span className="font-body text-sm text-text-muted-dark ml-2">
                  from
                </span>
                <p className="font-body text-xs text-text-muted-dark mt-1">
                  or {tier.monthly} retainer
                </p>
              </div>

              <div className="h-px bg-[var(--border-light)] mb-6" />

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature, i) => (
                  <li key={i} className="font-body text-sm text-text-dark font-light flex gap-2">
                    <span className="text-gold shrink-0">—</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <MagneticButton>
                <Link
                  href="/contact"
                  className={cn(
                    'block text-center font-body text-sm font-medium py-3 transition-colors',
                    tier.highlighted
                      ? 'bg-gold text-dark hover:bg-gold-light'
                      : 'border border-gold/40 text-gold-muted hover:bg-gold/5'
                  )}
                >
                  Get Started →
                </Link>
              </MagneticButton>
            </div>
          ))}
        </SectionReveal>

        <p className="font-body text-xs text-text-muted-dark text-center mt-8 max-w-md mx-auto">
          All prices are indicative and based on typical project scope. Retainer terms available.
          Need something bespoke?{' '}
          <Link href="/contact" className="text-gold-muted hover:text-gold transition-colors">
            Let&rsquo;s talk.
          </Link>
        </p>
      </div>
    </section>
  );
}
