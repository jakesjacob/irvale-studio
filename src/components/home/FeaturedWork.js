'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import { projects } from '@/lib/data/projects';

gsap.registerPlugin(ScrollTrigger);

const featured = projects.slice(0, 3);

export default function FeaturedWork() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Only enable horizontal scroll on desktop
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const track = trackRef.current;
      const scrollWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-dark overflow-hidden">
      <div className="py-[var(--section-gap)]">
        {/* Header */}
        <div
          className="mx-auto px-[var(--gutter)] mb-12"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="block">Selected Work</Eyebrow>
        </div>

        {/* Horizontal scroll track (desktop) / vertical grid (mobile) */}
        <div
          ref={trackRef}
          className="flex md:flex-nowrap flex-wrap gap-[var(--grid-gap)] px-[var(--gutter)]"
        >
          {featured.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
             
              className="group relative flex-shrink-0 w-full md:w-[45vw] aspect-[4/3] bg-dark-2 overflow-hidden mb-4 md:mb-0"
            >
              {/* Placeholder — will be replaced with actual images */}
              <div className="absolute inset-0 bg-gradient-to-br from-dark-2 to-dark" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="font-body text-xs text-gold uppercase tracking-[0.15em] mb-2">
                  {project.niche}
                </span>
                <h3 className="font-display text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-light">
                  {project.name}
                </h3>
                <span className="font-body text-sm text-text-muted-light mt-2">
                  View Case Study →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA after scroll */}
        <div
          className="mx-auto px-[var(--gutter)] mt-12"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Link
            href="/work"
            className="font-body text-sm font-medium text-gold hover:text-gold-light transition-colors"
          >
            See All Work →
          </Link>
        </div>
      </div>
    </section>
  );
}
