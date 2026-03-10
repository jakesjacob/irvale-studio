'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import RevealText from '@/components/ui/RevealText';

export default function HeroSection() {
  const sectionRef = useRef(null);
  const overlayRef = useRef(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.to(overlayRef.current, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-end overflow-hidden bg-dark"
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-br from-dark via-dark-2 to-dark"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(17,17,17,0.7)_70%,rgba(17,17,17,0.95)_100%)]" />

      <div
        className="relative z-10 px-[var(--gutter)] pb-16 md:pb-24 w-full"
        style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}
      >
        <RevealText
          as="h1"
          className="font-display italic font-normal text-text-light text-[length:var(--type-display)] leading-[var(--type-display-lh)] max-w-[900px]"
        >
          More enquiries. More bookings. More revenue.
        </RevealText>

        <p className="mt-6 font-body text-[length:var(--type-body-lg)] leading-[var(--type-body-lg-lh)] text-text-muted-light font-light max-w-lg">
          We build websites that turn premium brands into growth engines — through design, SEO, and AI visibility.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link href="/contact" className="btn-primary">
            <span>Grow Your Brand →</span>
          </Link>
          <Link href="/work" className="btn-outline">
            <span>See Client Results</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
