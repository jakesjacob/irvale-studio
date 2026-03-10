'use client';

import { useRef, useCallback } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Eyebrow from '@/components/ui/Eyebrow';
import RevealText from '@/components/ui/RevealText';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01',
    title: 'Get Found',
    subtitle: 'Design & Development',
    description:
      'A website that looks premium and converts. Faster load times, intuitive booking flows, and a design that builds trust the moment someone lands. No templates — built for your brand, your audience, your goals.',
    outcome: 'Clients see 2–3x more enquiries within the first quarter.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Get Chosen',
    subtitle: 'SEO & Search Strategy',
    description:
      'Rank for the searches your ideal customers are making. We build the technical foundation and content strategy that puts you ahead of competitors in Google — and keeps you there.',
    outcome: 'Average #1 local ranking within 6 months.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Get Recommended',
    subtitle: 'AI Visibility',
    description:
      "When someone asks ChatGPT for \"the best spa near me\" or \"top golf clubs in London\" — your name comes up. We optimise your brand for the AI-powered search that's replacing Google for millions.",
    outcome: 'Crestview Members Club built a 400+ waitlist in 3 months.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
];

function ServiceCard({ service, index, cardRef, numberRef, iconRef, accentRef, outcomeRef }) {
  const tiltRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const card = tiltRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Keep rotation subtle — max 6deg for luxury restraint
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 800,
    });

    // Move glow to follow cursor
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x: x - rect.width / 2,
        y: y - rect.height / 2,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = tiltRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power3.out',
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0,
        duration: 0.4,
      });
    }
  }, []);

  return (
    <div
      ref={(el) => {
        tiltRef.current = el;
        cardRef(el);
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="service-card group relative border border-[var(--border-light)] bg-cream p-8 md:p-10 will-change-transform transition-[border-color,box-shadow] duration-500 ease-out hover:border-gold/30 hover:shadow-[0_8px_40px_rgba(201,169,110,0.12)] active:scale-[0.98]"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Animated gradient border glow — visible on hover */}
      <div className="absolute -inset-px rounded-[1px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 service-border-glow" />
      </div>

      {/* Cursor glow follow */}
      <div
        ref={glowRef}
        className="absolute w-64 h-64 rounded-full pointer-events-none opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Card content — slightly "lifted" in 3D */}
      <div style={{ transform: 'translateZ(20px)' }}>
        {/* Top row: number + icon */}
        <div className="flex items-start justify-between mb-6">
          <div className="overflow-hidden">
            <span
              ref={numberRef}
              className="font-display text-[clamp(48px,5vw,72px)] text-gold/15 leading-none block"
            >
              {service.number}
            </span>
          </div>
          <div
            ref={iconRef}
            className="text-gold/40 transition-colors duration-500 group-hover:text-gold"
          >
            {service.icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-dark mb-1 transition-colors duration-500 group-hover:text-gold-muted">
          {service.title}
        </h3>

        {/* Subtitle */}
        <p className="font-body text-xs text-gold-muted uppercase tracking-[0.15em] mb-5">
          {service.subtitle}
        </p>

        {/* Gold accent line */}
        <div
          ref={accentRef}
          className="h-px bg-gradient-to-r from-gold/50 to-gold/0 w-2/3 mb-5"
        />

        {/* Description */}
        <p className="font-body text-[length:var(--type-body)] leading-[var(--type-body-lh)] text-text-muted-dark font-light mb-6">
          {service.description}
        </p>

        {/* Outcome */}
        <div
          ref={outcomeRef}
          className="border-t border-[var(--border-light)] pt-5"
        >
          <p className="font-body text-sm text-gold-muted font-medium italic">
            {service.outcome}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ServicesOverview() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const lineRef = useRef(null);
  const numbersRef = useRef([]);
  const accentsRef = useRef([]);
  const iconsRef = useRef([]);
  const outcomesRef = useRef([]);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // Small delay to ensure child refs are fully populated
      const initTimer = requestAnimationFrame(() => {
        const mm = gsap.matchMedia();

        mm.add('(min-width: 768px)', () => {
          // Animate the connecting line across top of cards
          if (lineRef.current) {
            gsap.fromTo(lineRef.current,
              { scaleX: 0 },
              {
                scaleX: 1,
                transformOrigin: 'left center',
                duration: 1.5,
                ease: 'power3.inOut',
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: 'top 60%',
                  once: true,
                },
              }
            );
          }

          // Staggered card reveal with GSAP timelines
          cardsRef.current.forEach((card, i) => {
            if (!card) return;

            // Set initial state explicitly
            gsap.set(card, { y: 60, opacity: 0 });

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 65%',
                once: true,
              },
            });

            // Card slides up and fades in
            tl.to(card, {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power3.out',
              delay: i * 0.2,
            });

            // Number slides up from below
            if (numbersRef.current[i]) {
              gsap.set(numbersRef.current[i], { yPercent: 100, opacity: 0 });
              tl.to(
                numbersRef.current[i],
                {
                  yPercent: 0,
                  opacity: 1,
                  duration: 0.7,
                  ease: 'power3.out',
                },
                '-=0.6'
              );
            }

            // Icon fades and scales in
            if (iconsRef.current[i]) {
              gsap.set(iconsRef.current[i], { scale: 0, opacity: 0 });
              tl.to(
                iconsRef.current[i],
                {
                  scale: 1,
                  opacity: 1,
                  duration: 0.5,
                  ease: 'back.out(1.7)',
                },
                '-=0.5'
              );
            }

            // Gold accent line draws across
            if (accentsRef.current[i]) {
              gsap.set(accentsRef.current[i], { scaleX: 0, transformOrigin: 'left center' });
              tl.to(
                accentsRef.current[i],
                {
                  scaleX: 1,
                  duration: 0.8,
                  ease: 'power2.inOut',
                },
                '-=0.4'
              );
            }

            // Outcome text fades in last
            if (outcomesRef.current[i]) {
              gsap.set(outcomesRef.current[i], { y: 20, opacity: 0 });
              tl.to(
                outcomesRef.current[i],
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.6,
                  ease: 'power2.out',
                },
                '-=0.3'
              );
            }
          });
        });

        // Mobile: simpler staggered fade-in
        mm.add('(max-width: 767px)', () => {
          cardsRef.current.forEach((card, i) => {
            if (!card) return;
            gsap.set(card, { y: 40, opacity: 0 });
            gsap.to(card, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
              delay: i * 0.1,
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                once: true,
              },
            });
          });
        });
      });

      return () => cancelAnimationFrame(initTimer);
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-cream py-[var(--section-gap)]">
      <div
        className="mx-auto px-[var(--gutter)]"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <Eyebrow className="mb-4 block">How We Grow Your Business</Eyebrow>
        <RevealText
          as="h2"
          className="font-display font-normal text-text-dark text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] max-w-[700px] mb-16"
        >
          Three ways we put more customers through your door
        </RevealText>

        {/* Connecting line — desktop only */}
        <div className="hidden md:block mb-12">
          <div
            ref={lineRef}
            className="h-px bg-gradient-to-r from-gold/0 via-gold/40 to-gold/0 w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-[var(--grid-gap)]">
          {services.map((service, i) => (
            <ServiceCard
              key={service.number}
              service={service}
              index={i}
              cardRef={(el) => (cardsRef.current[i] = el)}
              numberRef={(el) => (numbersRef.current[i] = el)}
              iconRef={(el) => (iconsRef.current[i] = el)}
              accentRef={(el) => (accentsRef.current[i] = el)}
              outcomeRef={(el) => (outcomesRef.current[i] = el)}
            />
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/services"
            className="btn-outline inline-block"
          >
            <span>See Pricing & Packages</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
