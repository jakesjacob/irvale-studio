'use client';

import { useRef, useState, useCallback } from 'react';
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
    title: 'Get Recommended',
    subtitle: 'AI Visibility',
    description:
      'When someone asks ChatGPT for the best spa or top golf clubs near them, your name comes up. We optimise your brand for AI-powered search.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Get Found',
    subtitle: 'SEO & Search Strategy',
    description:
      'Technical SEO and content strategy that puts you ahead of competitors in Google for the searches your ideal customers are making.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Get Chosen',
    subtitle: 'Design & Development',
    description:
      'A bespoke website that builds trust on first impression and converts visitors into enquiries through considered design and intuitive booking flows.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];


/* ─── Desktop card (unchanged from before) ─── */
function ServiceCard({ service, cardRef, numberRef, iconRef, accentRef }) {
  const tiltRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;
    const card = tiltRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 800,
    });

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
    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' });
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
  }, []);

  return (
    <div
      ref={(el) => { tiltRef.current = el; cardRef(el); }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="service-card group relative border border-[var(--border-light)] bg-cream p-8 md:p-10 overflow-hidden will-change-transform transition-[border-color,box-shadow] duration-500 ease-out hover:border-gold/25 hover:shadow-[0_6px_30px_rgba(201,169,110,0.1)] active:scale-[0.98]"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        ref={glowRef}
        className="absolute w-80 h-80 rounded-full pointer-events-none opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(201,169,110,0.25) 0%, rgba(201,169,110,0.08) 40%, transparent 70%)',
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        }}
      />
      <div style={{ transform: 'translateZ(20px)' }}>
        <div className="flex items-start justify-between mb-6">
          <div className="overflow-hidden">
            <span ref={numberRef} className="font-display text-[clamp(48px,5vw,72px)] text-gold/15 leading-none block">
              {service.number}
            </span>
          </div>
          <div ref={iconRef} className="text-gold/40 transition-colors duration-500 group-hover:text-gold">
            {service.icon}
          </div>
        </div>
        <h3 className="font-display text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-dark mb-1 transition-colors duration-500 group-hover:text-gold-muted">
          {service.title}
        </h3>
        <p className="font-body text-[length:var(--type-caption)] leading-[var(--type-caption-lh)] text-gold-muted uppercase tracking-[var(--type-label-ls)] mb-5">
          {service.subtitle}
        </p>
        <div ref={accentRef} className="h-px bg-gradient-to-r from-gold/50 to-gold/0 w-2/3 mb-5" />
        <p className="font-body text-[length:var(--type-body)] leading-[var(--type-body-lh)] text-text-muted-dark font-light">
          {service.description}
        </p>
      </div>
    </div>
  );
}

/* ─── Mobile accordion item ─── */
function AccordionItem({ service, isOpen, onClick }) {

  return (
    <div
      className={`border-b border-[var(--border-light)] transition-colors duration-300 ${isOpen ? 'bg-cream-2/50' : ''}`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 px-4 min-h-[56px] text-left cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <span className="font-display text-gold/40 text-[length:var(--type-body-sm)]">
            {service.number}
          </span>
          <h3 className={`font-display text-[length:var(--type-body-lg)] leading-tight transition-colors duration-300 ${isOpen ? 'text-gold-muted' : 'text-text-dark'}`}>
            {service.title}
          </h3>
        </div>
        <div className={`text-gold/50 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 3v10M3 8h10" strokeLinecap="round" />
          </svg>
        </div>
      </button>

      {/* Expandable content */}
      <div
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{ maxHeight: isOpen ? '200px' : '0px', opacity: isOpen ? 1 : 0 }}
      >
        <div className="px-4 pb-5">
          <p className="font-body text-[length:var(--type-caption)] leading-[var(--type-caption-lh)] text-gold-muted uppercase tracking-[var(--type-label-ls)] mb-3">
            {service.subtitle}
          </p>
          <p className="font-body text-[length:var(--type-body-sm)] leading-[var(--type-body-sm-lh)] text-text-muted-dark font-light">
            {service.description}
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

  // Mobile accordion state
  const [activeIndex, setActiveIndex] = useState(0);

  const handleAccordionClick = useCallback((i) => {
    setActiveIndex(activeIndex === i ? -1 : i);
  }, [activeIndex]);

  // Desktop GSAP animations
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const initTimer = requestAnimationFrame(() => {
        const mm = gsap.matchMedia();

        mm.add('(min-width: 768px)', () => {
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

          cardsRef.current.forEach((card, i) => {
            if (!card) return;
            gsap.set(card, { y: 60, opacity: 0 });

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 65%',
                once: true,
              },
            });

            tl.to(card, {
              y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: i * 0.2,
            });

            if (numbersRef.current[i]) {
              gsap.set(numbersRef.current[i], { yPercent: 100, opacity: 0 });
              tl.to(numbersRef.current[i], { yPercent: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.6');
            }

            if (iconsRef.current[i]) {
              gsap.set(iconsRef.current[i], { scale: 0, opacity: 0 });
              tl.to(iconsRef.current[i], { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.5');
            }

            if (accentsRef.current[i]) {
              gsap.set(accentsRef.current[i], { scaleX: 0, transformOrigin: 'left center' });
              tl.to(accentsRef.current[i], { scaleX: 1, duration: 0.8, ease: 'power2.inOut' }, '-=0.4');
            }
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
        <Eyebrow className="mb-4 block">What We Do</Eyebrow>
        <RevealText
          as="h2"
          className="font-display font-normal text-text-dark text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] max-w-[700px] mb-16"
        >
          Design, search, and AI — working together to grow your business.
        </RevealText>

        {/* Desktop: connecting line + card grid */}
        <div className="hidden md:block mb-12">
          <div
            ref={lineRef}
            className="h-px bg-gradient-to-r from-gold/0 via-gold/40 to-gold/0 w-full"
          />
        </div>

        <div className="hidden md:grid md:grid-cols-3 gap-[var(--grid-gap)]">
          {services.map((service, i) => (
            <ServiceCard
              key={service.number}
              service={service}
              cardRef={(el) => (cardsRef.current[i] = el)}
              numberRef={(el) => (numbersRef.current[i] = el)}
              iconRef={(el) => (iconsRef.current[i] = el)}
              accentRef={(el) => (accentsRef.current[i] = el)}
            />
          ))}
        </div>

        {/* Mobile: auto-cycling accordion — fixed height prevents layout shift */}
        <div className="md:hidden border-t border-[var(--border-light)] min-h-[360px]">
          {services.map((service, i) => (
            <AccordionItem
              key={service.number}
              service={service}
              isOpen={activeIndex === i}
              onClick={() => handleAccordionClick(i)}
            />
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link href="/services" className="btn-outline inline-block">
            <span>Explore Services</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
