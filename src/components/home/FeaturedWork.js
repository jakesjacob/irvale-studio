'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import Image from 'next/image';
import Eyebrow from '@/components/ui/Eyebrow';
import RevealText from '@/components/ui/RevealText';
import { projects } from '@/lib/data/projects';

const projectImages = {
  'heathland-golf-club': '/images/work-heathland.svg',
  'aura-wellness-retreat': '/images/work-aura.svg',
  'blackwood-performance': '/images/work-blackwood.svg',
};

gsap.registerPlugin(ScrollTrigger);

const featured = projects.slice(0, 3);

export default function FeaturedWork() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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
        {/* Header — results-focused */}
        <div
          className="mx-auto px-[var(--gutter)] mb-12"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-4 block">Trusted Clients</Eyebrow>
          <RevealText
            as="h2"
            className="font-display font-normal text-text-light text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] max-w-[600px]"
          >
            Real results for real businesses.
          </RevealText>
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
              {/* Project image */}
              {projectImages[project.slug] && (
                <Image
                  src={projectImages[project.slug]}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 768px) 45vw, 100vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-br from-dark-2/40 to-dark/60" />

              {/* Always-visible result metric */}
              <div className="absolute top-6 left-6 z-10">
                <span className="font-display text-[clamp(20px,2.5vw,32px)] text-gold leading-none">
                  {project.metric}
                </span>
              </div>

              {/* Hover overlay with details */}
              <div className="absolute inset-0 bg-dark/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="font-body text-[length:var(--type-caption)] text-gold uppercase tracking-[var(--type-label-ls)] mb-2">
                  {project.niche}
                </span>
                <h3 className="font-display text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-light">
                  {project.name}
                </h3>
                <p className="font-body text-[length:var(--type-body-sm)] leading-[var(--type-body-sm-lh)] text-text-muted-light mt-2 max-w-sm">
                  {project.headline}
                </p>
                <span className="font-body text-[length:var(--type-body-sm)] text-gold mt-3">
                  Read Case Study →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div
          className="mx-auto px-[var(--gutter)] mt-12"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Link
            href="/work"
            className="font-body text-[length:var(--type-body-sm)] font-medium text-gold hover:text-gold-light transition-colors"
          >
            See All Work →
          </Link>
        </div>
      </div>
    </section>
  );
}
