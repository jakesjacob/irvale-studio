'use client';

import { useState } from 'react';
import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import RevealText from '@/components/ui/RevealText';
import SectionReveal from '@/components/ui/SectionReveal';
import { projects, niches } from '@/lib/data/projects';
import { cn } from '@/lib/utils';

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.nicheSlug === activeFilter);

  return (
    <main>
      {/* Header */}
      <section className="bg-dark pt-32 pb-16">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-6 block">Portfolio</Eyebrow>
          <RevealText
            as="h1"
            className="font-display italic font-normal text-text-light text-[length:var(--type-h1)] leading-[var(--type-h1-lh)] max-w-[700px] mb-4"
          >
            Work that speaks for itself
          </RevealText>
          <p className="font-body text-[length:var(--type-body-lg)] text-text-muted-light font-light max-w-lg">
            Six projects. Six brands that refused to settle. Every one built from scratch.
          </p>
          <div className="mt-4 inline-block font-body text-xs text-gold border border-gold/30 px-3 py-1">
            {projects.length} Projects
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="bg-dark sticky top-[65px] z-50 border-b border-[var(--border-dark)]">
        <div
          className="mx-auto px-[var(--gutter)] py-4 flex gap-6 overflow-x-auto scrollbar-hide"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          {niches.map((niche) => (
            <button
              key={niche.slug}
              onClick={() => setActiveFilter(niche.slug)}
              className={cn(
                'font-body text-sm whitespace-nowrap transition-colors',
                activeFilter === niche.slug
                  ? 'text-gold font-medium'
                  : 'text-text-muted-light hover:text-text-light'
              )}
            >
              {niche.label}
            </button>
          ))}
        </div>
      </div>

      {/* Project Grid — Asymmetric Masonry */}
      <section className="bg-dark py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <SectionReveal className="grid grid-cols-1 md:grid-cols-12 gap-[var(--grid-gap)]">
            {filtered.map((project, i) => {
              // Alternating column rhythm: 8/4, 4/8, 6/6
              const patterns = [
                ['md:col-span-8', 'md:col-span-4'],
                ['md:col-span-4', 'md:col-span-8'],
                ['md:col-span-6', 'md:col-span-6'],
              ];
              const patternIndex = Math.floor(i / 2) % 3;
              const colClass = patterns[patternIndex][i % 2];

              return (
                <Link
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  data-cursor="portfolio"
                  className={cn(
                    'group relative col-span-1 aspect-[4/3] bg-dark-2 overflow-hidden',
                    colClass
                  )}
                >
                  {/* Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-dark-2 to-dark" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-dark/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-8">
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
              );
            })}
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
