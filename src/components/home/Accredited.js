'use client';

import { useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Eyebrow from '@/components/ui/Eyebrow';
import RevealText from '@/components/ui/RevealText';

gsap.registerPlugin(ScrollTrigger);

const credentials = [
  {
    title: 'Certified Web Design',
    body: 'Google UX Design Professional Certificate — designing intuitive, conversion-focused experiences for luxury brands.',
    number: '01',
  },
  {
    title: 'SEO Specialist',
    body: 'Advanced search engine optimisation & analytics. Technical SEO, content strategy, and local ranking dominance.',
    number: '02',
  },
  {
    title: 'AI Search Pioneer',
    body: 'Early adopter of AI visibility strategies — ensuring your brand appears when ChatGPT, Gemini, and Perplexity recommend.',
    number: '03',
  },
  {
    title: 'Full-Stack Development',
    body: 'React, Next.js & modern JavaScript architecture. Bespoke builds, not templates — performance-first engineering.',
    number: '04',
  },
  {
    title: 'Conversion Optimisation',
    body: 'Data-driven UX design focused on revenue outcomes. Every element tested, every flow optimised for action.',
    number: '05',
  },
  {
    title: 'Digital Strategy',
    body: 'Integrated brand, content & performance marketing. The full picture, not just isolated tactics.',
    number: '06',
  },
];

function CredentialCard({ credential }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const card = cardRef.current;
    if (!card || !glowRef.current) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glowRef.current, {
      x: x - rect.width / 2,
      y: y - rect.height / 2,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!glowRef.current) return;
    gsap.to(glowRef.current, {
      opacity: 0,
      duration: 0.5,
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="credential-card group relative border border-white/[0.06] bg-dark-2/40 p-8 md:p-10 overflow-hidden transition-[border-color] duration-500 hover:border-gold/20 cursor-default"
    >
      {/* Cursor-following glow */}
      <div
        ref={glowRef}
        className="absolute w-72 h-72 rounded-full pointer-events-none opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(201,169,110,0.10) 0%, rgba(201,169,110,0.03) 40%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Corner accents — appear on hover */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold/0 transition-all duration-500 group-hover:border-gold/30 group-hover:w-6 group-hover:h-6" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold/0 transition-all duration-500 group-hover:border-gold/30 group-hover:w-6 group-hover:h-6" />

      {/* Number */}
      <span className="font-display text-gold/10 text-[clamp(32px,3vw,44px)] leading-none block mb-4 transition-colors duration-500 group-hover:text-gold/20">
        {credential.number}
      </span>

      {/* Title — always visible, prominent */}
      <h3 className="font-display text-lg md:text-xl text-text-light/90 leading-snug mb-0 transition-colors duration-500 group-hover:text-text-light">
        {credential.title}
      </h3>

      {/* Reveal line — draws on hover */}
      <div className="h-px bg-gold/30 w-0 mt-4 mb-0 transition-all duration-500 ease-out group-hover:w-1/2 group-hover:mt-5 group-hover:mb-4" />

      {/* Description — slides up and fades in on hover */}
      <div className="overflow-hidden max-h-0 opacity-0 transition-all duration-500 ease-out group-hover:max-h-32 group-hover:opacity-100">
        <p className="font-body text-sm text-text-muted-light font-light leading-relaxed translate-y-3 transition-transform duration-500 ease-out group-hover:translate-y-0">
          {credential.body}
        </p>
      </div>
    </div>
  );
}

export default function Accredited() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const initTimer = requestAnimationFrame(() => {
        const cards = cardsRef.current.filter(Boolean);

        cards.forEach((card, i) => {
          gsap.set(card, { y: 50, opacity: 0 });
          gsap.to(card, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              once: true,
            },
          });
        });
      });

      return () => cancelAnimationFrame(initTimer);
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-dark py-[var(--section-gap)]">
      <div
        className="mx-auto px-[var(--gutter)]"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <Eyebrow className="mb-4 block">Accredited & Proven</Eyebrow>
        <RevealText
          as="h2"
          className="font-display font-normal text-text-light text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] max-w-[600px] mb-14"
        >
          Expertise you can trust
        </RevealText>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {credentials.map((cred, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
            >
              <CredentialCard credential={cred} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
