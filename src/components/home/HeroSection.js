'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import Image from 'next/image';
import RevealText from '@/components/ui/RevealText';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Parallax on the background image
    gsap.to(imageRef.current, {
      yPercent: 20,
      scale: 1.05,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Overlay darkens as you scroll
    gsap.to(overlayRef.current, {
      opacity: 0.85,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Content fade in on load
    gsap.from(contentRef.current.children, {
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
      delay: 0.3,
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-dark"
    >
      {/* Full-bleed background image */}
      <div ref={imageRef} className="absolute inset-0 scale-110">
        <Image
          src="/images/hero-golf.jpg"
          alt="Luxury golf course landscape"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Dark overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-dark"
        style={{ opacity: 0.6 }}
      />

      {/* Radial vignette — center spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(17,17,17,0.5)_50%,rgba(17,17,17,0.85)_100%)]" />

      {/* Top edge vignette */}
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-dark/70 to-transparent" />

      {/* Bottom edge vignette */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-dark/80 to-transparent" />

      {/* Content — centered like Boxx */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-[var(--gutter)] w-full"
        style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}
      >
        {/* Brand wordmark */}
        <p
          className="font-display text-gold tracking-[0.35em] text-[length:var(--type-body-sm)] uppercase mb-8"
          style={{ textShadow: '0 2px 20px rgba(201,169,110,0.3)' }}
        >
          Irvale Studio
        </p>

        <RevealText
          as="h1"
          className="font-display italic font-normal text-white text-[length:var(--type-h1)] leading-[var(--type-h1-lh)] max-w-[700px] mx-auto justify-center"
          style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.3)' }}
        >
          Premium software solutions.
        </RevealText>

        <p
          className="mt-6 font-display italic text-[length:var(--type-body-lg)] leading-[var(--type-body-lg-lh)] text-text-light/80 font-light max-w-xl mx-auto"
          style={{ textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}
        >
          Bespoke websites, custom booking systems, member experiences, and AI automations. Specialised for hospitality, wellness, and membership brands.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}>
          <Link href="/contact" className="btn-primary">
            <span>Start a Project →</span>
          </Link>
          <Link href="/work" className="btn-outline border-white/30 text-text-light hover:text-dark">
            <span>See Client Results</span>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-2">
          <span className="font-body text-[length:var(--type-caption)] text-text-light/50 uppercase tracking-[var(--type-label-ls)]">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-gold/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}
