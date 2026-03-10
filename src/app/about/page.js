import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import RevealText from '@/components/ui/RevealText';
import SectionReveal from '@/components/ui/SectionReveal';
import MagneticButton from '@/components/ui/MagneticButton';

export const metadata = {
  title: 'About — Irvale Studio',
  description: 'A small studio with a singular focus: building digital experiences for brands that refuse to blend in.',
};

const principles = [
  {
    title: 'Craft Over Speed',
    description: 'We don\'t rush. Every decision — from typography to transition timing — is made with intention. The result is work that ages well.',
  },
  {
    title: 'Strategy Before Pixels',
    description: 'We start with understanding, not wireframes. The best design solves the right problem. Everything else is decoration.',
  },
  {
    title: 'Partnership, Not Service',
    description: 'We work with a handful of clients at a time. That means proper attention, honest counsel, and work we\'re genuinely proud of.',
  },
];

const team = [
  { name: 'Jacob', role: 'Founder & Creative Director' },
  { name: 'Studio', role: 'Design & Development' },
];

const logos = [
  'Heathland GC', 'Aura Wellness', 'Blackwood',
  'The Halcyon', 'Elara Dining', 'Crestview',
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-dark pt-32 pb-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)] text-center"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <RevealText
            as="h1"
            className="font-display italic font-normal text-text-light text-[length:var(--type-h1)] leading-[var(--type-h1-lh)] max-w-[700px] mx-auto justify-center"
          >
            We build for brands that won&rsquo;t settle
          </RevealText>
        </div>
      </section>

      {/* Studio Story */}
      <section className="bg-cream py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <SectionReveal className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-[var(--component-gap)]">
            {/* Image placeholder */}
            <div className="aspect-[3/4] bg-dark/5 rounded" />

            <div className="flex flex-col justify-center">
              <Eyebrow className="mb-6 block">The Studio</Eyebrow>
              <div className="space-y-6">
                <p className="font-body text-[length:var(--type-body-lg)] leading-[var(--type-body-lg-lh)] text-text-dark font-light">
                  Irvale Studio was founded on a simple observation: the luxury brands we admired in person rarely had digital experiences to match.
                </p>
                <p className="font-body text-[length:var(--type-body)] leading-[var(--type-body-lh)] text-text-muted-dark font-light">
                  Golf clubs with century-old legacies had websites that looked like they were built in 2015. Five-star hotels were losing half their revenue to OTA commissions. Michelin-level restaurants had booking flows that felt like admin software.
                </p>
                <p className="font-body text-[length:var(--type-body)] leading-[var(--type-body-lh)] text-text-muted-dark font-light">
                  We set out to fix that. Not with templates or page builders, but with bespoke work — designed from scratch, built by hand, and optimised for performance. Every project is treated as a one-of-one.
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-dark py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-12 block">What We Believe</Eyebrow>
          <SectionReveal className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-[var(--grid-gap)]">
            {principles.map((principle, i) => (
              <div key={i}>
                <h3 className="font-display text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-light mb-4">
                  {principle.title}
                </h3>
                <p className="font-body text-sm text-text-muted-light font-light leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* Team */}
      <section className="bg-cream py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-12 block">The Team</Eyebrow>
          <SectionReveal className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name}>
                <div className="aspect-square bg-dark/5 rounded mb-4" />
                <h4 className="font-body text-sm font-medium text-text-dark">
                  {member.name}
                </h4>
                <p className="font-body text-xs text-text-muted-dark mt-1">
                  {member.role}
                </p>
              </div>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* Client Logos */}
      <section className="bg-cream-2 py-16">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <SectionReveal className="flex flex-wrap items-center justify-center gap-12">
            {logos.map((logo) => (
              <span
                key={logo}
                className="font-display text-lg text-text-dark/40 tracking-[0.1em] uppercase"
              >
                {logo}
              </span>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dark py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)] text-center"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <RevealText
            as="h2"
            className="font-display italic font-normal text-text-light text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] max-w-[600px] mx-auto justify-center mb-6"
          >
            Let&rsquo;s build something worth remembering
          </RevealText>
          <MagneticButton className="inline-block">
            <Link
              href="/contact"
              className="inline-block font-body text-sm font-medium bg-gold text-dark px-10 py-4 hover:bg-gold-light transition-colors"
            >
              Start a Project →
            </Link>
          </MagneticButton>
        </div>
      </section>
    </main>
  );
}
