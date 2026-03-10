'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef(null);
  const ruleRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const btnRef = useRef(null);
  const noteRef = useRef(null);
  const glowRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      // Gold rule draws in from center
      tl.fromTo(
        ruleRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: 'power3.inOut' },
        0
      );

      // Eyebrow fades in
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0.2
      );

      // Headline words stagger in
      const words = headlineRef.current?.querySelectorAll('.cta-word');
      if (words?.length) {
        tl.fromTo(
          words,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: 'power2.out' },
          0.35
        );
      }

      // Subtext fades in
      tl.fromTo(
        subtextRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0.7
      );

      // Button scales up with glow
      tl.fromTo(
        btnRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
        0.9
      );

      // Glow pulses in
      tl.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
        0.9
      );

      // Note fades in last
      tl.fromTo(
        noteRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' },
        1.2
      );
    },
    { scope: sectionRef }
  );

  // Split headline into words for stagger animation
  const headline = 'Let\u2019s create something extraordinary together.';
  const headlineWords = headline.split(' ');

  return (
    <section
      ref={sectionRef}
      className="relative bg-dark overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/[0.02] blur-[120px]" />
      </div>

      <div
        className="relative z-10 mx-auto px-[var(--gutter)] py-32 md:py-48 lg:py-56"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <div className="text-center max-w-3xl mx-auto">
          {/* Gold rule - draws in from center */}
          <div
            ref={ruleRef}
            className="w-24 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mb-10 origin-center"
          />

          {/* Eyebrow */}
          <p
            ref={eyebrowRef}
            className="font-body text-[length:var(--type-caption)] text-gold/70 uppercase tracking-[var(--type-label-ls)] mb-8"
          >
            Start a Project
          </p>

          {/* Large italic headline - word-by-word reveal */}
          <h2
            ref={headlineRef}
            className="font-display italic font-normal text-text-light text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] mb-8"
          >
            {headlineWords.map((word, i) => (
              <span key={i} className="cta-word inline-block mr-[0.3em]">
                {word}
              </span>
            ))}
          </h2>

          {/* Supporting text */}
          <p
            ref={subtextRef}
            className="font-body text-[length:var(--type-body)] leading-[var(--type-body-lh)] text-text-muted-light/60 font-light mb-12 max-w-lg mx-auto"
          >
            We partner with premium brands ready for their digital moment.
            Tell us where you want to grow.
          </p>

          {/* Magnetic button with glow */}
          <div className="relative inline-block">
            {/* Gold glow behind button */}
            <div
              ref={glowRef}
              className="absolute inset-0 -inset-x-8 -inset-y-4 bg-gold/[0.06] blur-2xl rounded-full pointer-events-none transition-opacity duration-500"
              aria-hidden="true"
            />

            <Link
              href="/contact"
              ref={btnRef}
              className="relative inline-flex items-center justify-center gap-3 bg-gold hover:bg-gold-light active:scale-97 text-dark font-body text-[length:var(--type-button)] font-medium tracking-[var(--type-button-ls)] uppercase w-full sm:w-auto px-10 py-4 min-h-[48px] transition-all duration-500 hover:tracking-[0.12em] group"
            >
              <span>Begin Your Project</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
              >
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Response note */}
          <p
            ref={noteRef}
            className="font-body text-[length:var(--type-caption)] leading-[var(--type-caption-lh)] text-text-muted-light/30 tracking-wide mt-8"
          >
            Free consultation &middot; No obligations &middot; We respond within 24 hours
          </p>
        </div>
      </div>
    </section>
  );
}
