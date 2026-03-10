'use client';

import Link from 'next/link';
import RevealText from '@/components/ui/RevealText';
import Eyebrow from '@/components/ui/Eyebrow';

export default function CTASection() {
  return (
    <section className="bg-dark py-[var(--section-gap)]">
      <div
        className="mx-auto px-[var(--gutter)] text-center"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <Eyebrow className="mb-6 block">Ready?</Eyebrow>

        <RevealText
          as="h2"
          className="font-display italic font-normal text-text-light text-[length:var(--type-h1)] leading-[var(--type-h1-lh)] max-w-[700px] mx-auto justify-center mb-6"
        >
          Your competitors are already investing in this. Are you?
        </RevealText>

        <p className="font-body text-[length:var(--type-body)] text-text-muted-light font-light mb-10 max-w-md mx-auto">
          Tell us about your business and where you want to grow. We&rsquo;ll show you exactly how we&rsquo;d get you there.
        </p>

        <Link href="/contact" className="btn-primary px-10">
          <span>Get Your Growth Plan →</span>
        </Link>

        <p className="font-body text-xs text-text-muted-light mt-6">
          Free consultation. No obligations. We respond within 24 hours.
        </p>
      </div>
    </section>
  );
}
