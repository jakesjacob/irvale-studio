'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Eyebrow from '@/components/ui/Eyebrow';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: 'We went from losing 70% of bookings to OTAs to taking the majority direct. The ROI was immediate.',
    author: 'Catherine Ashworth',
    role: 'General Manager, The Halcyon Hotel',
    result: '+180% direct bookings',
  },
  {
    quote: 'We went from having nothing online to being fully booked within two months. Irvale made it effortless.',
    author: 'Marcus Cole',
    role: 'Founder, Blackwood Performance',
    result: '+210% class bookings',
  },
  {
    quote: 'Our enquiry rate tripled within six weeks of launch. We had to hire two extra staff to keep up with demand.',
    author: 'James Thornton',
    role: 'Director, Heathland Golf Club',
    result: '+340% enquiries',
  },
];

const INTERVAL = 6000;

export default function Testimonial() {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);
  const authorRef = useRef(null);
  const resultRef = useRef(null);
  const [active, setActive] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const intervalRef = useRef(null);

  // Track when section is in viewport
  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => setIsInView(true),
        onLeave: () => setIsInView(false),
        onEnterBack: () => setIsInView(true),
        onLeaveBack: () => setIsInView(false),
      });
    },
    { scope: sectionRef }
  );

  const transitionTo = useCallback(
    (nextIndex) => {
      const tl = gsap.timeline();

      // Fade out current
      tl.to([resultRef.current, quoteRef.current, authorRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: 'power2.in',
        stagger: 0.05,
        onComplete: () => setActive(nextIndex),
      });

      // Fade in next (runs after state update via useEffect)
    },
    []
  );

  // Fade in after active changes
  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      gsap.fromTo(
        [resultRef.current, quoteRef.current, authorRef.current],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.08,
        }
      );
    });
    return () => cancelAnimationFrame(timer);
  }, [active]);

  // Auto-cycle
  useEffect(() => {
    if (!isInView) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      const next = (active + 1) % testimonials.length;
      transitionTo(next);
    }, INTERVAL);

    return () => clearInterval(intervalRef.current);
  }, [isInView, active, transitionTo]);

  const goTo = (index) => {
    if (index === active) return;
    clearInterval(intervalRef.current);
    transitionTo(index);
  };

  const current = testimonials[active];

  return (
    <section ref={sectionRef} className="bg-cream py-[var(--section-gap)] overflow-hidden">
      <div
        className="mx-auto px-[var(--gutter)] relative"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        {/* Large decorative quote mark */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
          aria-hidden="true"
        >
          <span className="font-display text-[clamp(200px,30vw,400px)] leading-none text-text-dark/[0.03]">
            &ldquo;
          </span>
        </div>

        <Eyebrow className="mb-16 block text-center">What Our Clients Say</Eyebrow>

        {/* Testimonial content — centered, single at a time */}
        <div className="max-w-3xl mx-auto text-center relative min-h-[280px] md:min-h-[240px] flex flex-col items-center justify-center">
          {/* Result metric */}
          <p
            ref={resultRef}
            className="font-display text-gold text-[clamp(20px,2.5vw,28px)] leading-tight mb-8 font-medium"
          >
            {current.result}
          </p>

          {/* Quote */}
          <blockquote
            ref={quoteRef}
            className="font-display italic text-[clamp(22px,3vw,38px)] leading-[1.25] text-text-dark mb-8"
          >
            &ldquo;{current.quote}&rdquo;
          </blockquote>

          {/* Author */}
          <div ref={authorRef}>
            <p className="font-body text-sm font-medium text-text-dark">
              {current.author}
            </p>
            <p className="font-body text-xs text-text-muted-dark mt-1">
              {current.role}
            </p>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex items-center justify-center gap-3 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className="group relative p-2"
            >
              <span
                className={`block w-2 h-2 rounded-full transition-all duration-500 ${
                  i === active
                    ? 'bg-gold scale-100'
                    : 'bg-text-dark/15 scale-75 group-hover:bg-gold/40 group-hover:scale-100'
                }`}
              />
              {/* Active dot progress ring */}
              {i === active && (
                <svg
                  className="absolute inset-0 w-full h-full -rotate-90"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="8"
                    fill="none"
                    stroke="rgba(201,169,110,0.3)"
                    strokeWidth="1"
                    strokeDasharray="50.265"
                    className="animate-progress-ring"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
