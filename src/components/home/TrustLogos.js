'use client';

import Eyebrow from '@/components/ui/Eyebrow';

const clients = [
  'BOXX',
  'Hang Dong Golf Club',
  'Chiang Mai Go Tours',
];

// Duplicate enough times to fill wide screens
const items = [...clients, ...clients, ...clients, ...clients];

export default function TrustLogos() {
  return (
    <section className="bg-cream py-16 overflow-hidden">
      <div
        className="mx-auto px-[var(--gutter)] mb-8"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <Eyebrow className="block text-center">Brands That Grew With Us</Eyebrow>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="marquee-track gap-16 md:gap-24"
          style={{ '--marquee-speed': '45s' }}
        >
          {items.map((name, i) => (
            <span
              key={i}
              className="font-display text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-dark/30 tracking-[0.15em] uppercase shrink-0"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
