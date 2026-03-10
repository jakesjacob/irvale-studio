'use client';

import { useRef, useCallback } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/ai-visibility', label: 'AI Visibility' },
  { href: '/marketing', label: 'Marketing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  const footerRef = useRef(null);
  const columnsRef = useRef([]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const cols = columnsRef.current.filter(Boolean);

      cols.forEach((col, i) => {
        gsap.set(col, { opacity: 0, y: -8, filter: 'blur(4px)' });
        gsap.to(col, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power2.out',
          delay: i * 0.12,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            once: true,
          },
        });
      });
    },
    { scope: footerRef }
  );

  return (
    <footer ref={footerRef} className="relative bg-[#0a0a0a] overflow-hidden">
      {/* Top glow line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Giant background wordmark */}
      <div className="absolute inset-x-0 bottom-16 flex items-end justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span
          className="font-display uppercase tracking-[0.2em] text-[clamp(120px,15vw,280px)] leading-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(201,169,110,0.06) 0%, transparent 80%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Irvale
        </span>
      </div>

      <div
        className="relative z-10 mx-auto px-[var(--gutter)] pt-32 md:pt-48 pb-20 md:pb-32"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">
          {/* Brand column */}
          <div
            ref={(el) => (columnsRef.current[0] = el)}
            className="md:col-span-5"
          >
            <Link href="/" className="inline-block group">
              <span className="font-display text-text-light tracking-[0.3em] text-[length:var(--type-body)] uppercase transition-all duration-500 group-hover:tracking-[0.4em] group-hover:text-gold">
                Irvale
              </span>
              <span className="font-display text-text-muted-light tracking-[0.3em] text-[length:var(--type-body)] uppercase ml-2 transition-all duration-500 group-hover:text-text-light">
                Studio
              </span>
            </Link>
            <p className="mt-6 font-body text-[length:var(--type-body-sm)] leading-[var(--type-body-sm-lh)] text-text-muted-light/70 max-w-sm">
              Bespoke websites, search dominance, and AI visibility for premium brands.
            </p>
            <div className="mt-8 w-12 h-px bg-gradient-to-r from-gold/40 to-transparent" />
          </div>

          {/* Navigation column */}
          <div
            ref={(el) => (columnsRef.current[1] = el)}
            className="md:col-span-3"
          >
            <p className="font-body text-[length:var(--type-caption)] text-gold/60 uppercase tracking-[var(--type-label-ls)] mb-6">
              Navigation
            </p>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="footer-link font-body text-[length:var(--type-body-sm)] text-text-muted-light/60 hover:text-text-light transition-all duration-300 hover:tracking-wider w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact column */}
          <div
            ref={(el) => (columnsRef.current[2] = el)}
            className="md:col-span-4"
          >
            <p className="font-body text-[length:var(--type-caption)] text-gold/60 uppercase tracking-[var(--type-label-ls)] mb-6">
              Start a Project
            </p>
            <a
              href="mailto:hello@irvale.studio"
              className="font-display text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-light/80 hover:text-gold transition-colors duration-500 block"
            >
              hello@irvale.studio
            </a>
            <p className="mt-4 font-body text-[length:var(--type-caption)] leading-[var(--type-caption-lh)] text-text-muted-light/50">
              We respond within 24 hours.<br />
              London, United Kingdom.
            </p>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="mt-10 group flex items-center gap-3 cursor-pointer"
              aria-label="Back to top"
            >
              <span className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:border-gold/40 group-hover:bg-gold/5">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-4 h-4 text-text-muted-light transition-all duration-500 group-hover:text-gold group-hover:-translate-y-0.5"
                >
                  <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="font-body text-[length:var(--type-caption)] text-text-muted-light/40 uppercase tracking-[var(--type-label-ls)] transition-colors duration-500 group-hover:text-text-muted-light">
                Back to top
              </span>
            </button>
          </div>
        </div>

      </div>

      {/* Bottom bar — pinned to very bottom */}
      <div
        className="relative z-10 mx-auto px-[var(--gutter)] pb-8"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <div className="border-t border-white/[0.06] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-[length:var(--type-caption)] leading-[var(--type-caption-lh)] text-text-muted-light/30 tracking-wide">
            &copy; {new Date().getFullYear()} Irvale Studio. All rights reserved.
          </p>
          <p className="font-body text-[length:var(--type-caption)] leading-[var(--type-caption-lh)] text-text-muted-light/30 tracking-wide">
            Designed & built by Irvale
          </p>
        </div>
      </div>
    </footer>
  );
}
