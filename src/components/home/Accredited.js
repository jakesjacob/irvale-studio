'use client';

import { useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Eyebrow from '@/components/ui/Eyebrow';
import RevealText from '@/components/ui/RevealText';

gsap.registerPlugin(ScrollTrigger);

const credentials = [
  {
    title: 'Certified UX Design',
    body: 'Google UX Professional Certificate. Intuitive, conversion-focused experiences for premium brands.',
    number: '01',
  },
  {
    title: 'Search Specialist',
    body: 'Technical SEO, content strategy, and local ranking dominance. First page or we keep working.',
    number: '02',
  },
  {
    title: 'AI Visibility Pioneer',
    body: 'Your brand recommended by ChatGPT, Gemini, and Perplexity. Not future-proofing — present-proofing.',
    number: '03',
  },
  {
    title: 'Full-Stack Engineering',
    body: 'React, Next.js, and modern architecture. Every build is bespoke, performance-first.',
    number: '04',
  },
  {
    title: 'Conversion Design',
    body: 'Every element earns its place. Layouts, flows, and interactions engineered for revenue.',
    number: '05',
  },
  {
    title: 'Growth Strategy',
    body: 'Brand, content, and performance marketing working as one system — not isolated tactics.',
    number: '06',
  },
];


/* ─── Desktop card (unchanged hover behavior) ─── */
function CredentialCard({ credential }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;
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
    gsap.to(glowRef.current, { opacity: 0, duration: 0.5 });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="credential-card group relative border border-white/[0.06] bg-dark-2/40 p-8 md:p-10 overflow-hidden transition-[border-color] duration-500 hover:border-gold/20 cursor-default"
    >
      <div
        ref={glowRef}
        className="absolute w-72 h-72 rounded-full pointer-events-none opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(201,169,110,0.064) 0%, rgba(201,169,110,0.019) 40%, transparent 70%)',
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        }}
      />
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold/0 transition-all duration-500 group-hover:border-gold/30 group-hover:w-6 group-hover:h-6" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold/0 transition-all duration-500 group-hover:border-gold/30 group-hover:w-6 group-hover:h-6" />

      <span className="font-display text-gold/10 text-[clamp(32px,3vw,44px)] leading-none block mb-4 transition-colors duration-500 group-hover:text-gold/20">
        {credential.number}
      </span>
      <h3 className="font-display text-[clamp(16px,1.8vw,24px)] leading-[1.2] text-text-light/90 mb-0 whitespace-nowrap transition-colors duration-500 group-hover:text-text-light">
        {credential.title}
      </h3>
      <div className="h-px bg-gold/30 w-0 mt-4 mb-0 transition-all duration-500 ease-out group-hover:w-1/2 group-hover:mt-5 group-hover:mb-4" />
      <div className="overflow-hidden max-h-0 opacity-0 transition-all duration-500 ease-out group-hover:max-h-32 group-hover:opacity-100">
        <p className="font-body text-[length:var(--type-body-sm)] leading-[var(--type-body-sm-lh)] text-text-muted-light font-light translate-y-3 transition-transform duration-500 ease-out group-hover:translate-y-0">
          {credential.body}
        </p>
      </div>
    </div>
  );
}

/* ─── Mobile accordion item ─── */
function AccordionItem({ credential, isOpen, onClick }) {
  return (
    <div className={`border-b border-white/[0.06] transition-colors duration-300 ${isOpen ? 'bg-dark-2/60' : ''}`}>
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 px-4 min-h-[56px] text-left cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <span className="font-display text-gold/30 text-[length:var(--type-body-sm)]">
            {credential.number}
          </span>
          <h3 className={`font-display text-[length:var(--type-body-lg)] leading-tight transition-colors duration-300 ${isOpen ? 'text-text-light' : 'text-text-light/60'}`}>
            {credential.title}
          </h3>
        </div>
        <div className={`text-gold/40 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 3v10M3 8h10" strokeLinecap="round" />
          </svg>
        </div>
      </button>

      <div
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{ maxHeight: isOpen ? '150px' : '0px', opacity: isOpen ? 1 : 0 }}
      >
        <div className="px-4 pb-5 pl-[52px]">
          <p className="font-body text-[length:var(--type-body-sm)] leading-[var(--type-body-sm-lh)] text-text-muted-light font-light">
            {credential.body}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Accredited() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  // Mobile accordion state
  const [activeIndex, setActiveIndex] = useState(0);

  const handleAccordionClick = useCallback((i) => {
    setActiveIndex(activeIndex === i ? -1 : i);
  }, [activeIndex]);

  // Desktop animations
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
          Expertise you can trust.
        </RevealText>

        {/* Desktop: hover-reveal grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 md:gap-5">
          {credentials.map((cred, i) => (
            <div key={i} ref={(el) => (cardsRef.current[i] = el)}>
              <CredentialCard credential={cred} />
            </div>
          ))}
        </div>

        {/* Mobile: auto-cycling accordion — fixed height prevents layout shift */}
        <div className="md:hidden border-t border-white/[0.06] min-h-[480px]">
          {credentials.map((cred, i) => (
            <AccordionItem
              key={i}
              credential={cred}
              isOpen={activeIndex === i}
              onClick={() => handleAccordionClick(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
