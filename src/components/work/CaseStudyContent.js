'use client';

import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import RevealText from '@/components/ui/RevealText';
import SectionReveal from '@/components/ui/SectionReveal';
import Counter from '@/components/ui/Counter';

export default function CaseStudyContent({ project, nextProject }) {
  // Extract leading number from metric for counter
  const metricMatch = project.metric.match(/(\d+)/);
  const metricNumber = metricMatch ? parseInt(metricMatch[1]) : null;

  return (
    <main>
      {/* Intro bar */}
      <div className="bg-cream border-b border-[var(--border-light)]">
        <div
          className="mx-auto px-[var(--gutter)] py-4 flex items-center justify-between"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Link
            href="/work"
            className="font-body text-sm text-text-muted-dark hover:text-text-dark transition-colors"
          >
            ← Back to Work
          </Link>
          <span className="font-body text-sm text-text-dark">{project.name}</span>
          <span className="font-body text-sm text-text-muted-dark">{project.year}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative h-[70vh] md:h-screen bg-dark overflow-hidden flex items-end">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-2 to-dark" />
        <div
          className="relative z-10 px-[var(--gutter)] pb-12 md:pb-20 w-full"
          style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}
        >
          <Eyebrow className="mb-4 block">{project.niche}</Eyebrow>
          <h1 className="font-display italic text-[length:var(--type-display)] leading-[var(--type-display-lh)] text-text-light max-w-[800px]">
            {project.name}
          </h1>
        </div>
      </section>

      {/* Metadata bar */}
      <section className="bg-dark-2 border-y border-[var(--border-dark)]">
        <div
          className="mx-auto px-[var(--gutter)] py-8 grid grid-cols-2 md:grid-cols-4 gap-6"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <div>
            <Eyebrow className="block mb-2">Client Type</Eyebrow>
            <p className="font-body text-sm text-text-light">{project.niche}</p>
          </div>
          <div>
            <Eyebrow className="block mb-2">Timeline</Eyebrow>
            <p className="font-body text-sm text-text-light">{project.timeline}</p>
          </div>
          <div>
            <Eyebrow className="block mb-2">Services</Eyebrow>
            <p className="font-body text-sm text-text-light">{project.services_detail}</p>
          </div>
          <div>
            <Eyebrow className="block mb-2">Key Result</Eyebrow>
            <p className="font-body text-sm text-gold font-medium">{project.metric}</p>
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="bg-cream py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-8 block">The Challenge</Eyebrow>
          <SectionReveal className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <blockquote className="font-display italic text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-dark">
              {project.headline}
            </blockquote>
            <p className="font-body text-[length:var(--type-body)] leading-[var(--type-body-lh)] text-text-muted-dark font-light">
              {project.challenge}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-dark py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-8 block">Our Approach</Eyebrow>
          <SectionReveal className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.approach.map((step, i) => (
              <div key={i} className="flex gap-4">
                <span className="font-display text-gold text-lg shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-body text-[length:var(--type-body)] leading-[var(--type-body-lh)] text-text-light font-light">
                  {step}
                </p>
              </div>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* Design Gallery — placeholder */}
      <section className="bg-dark-2 py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-8 block">Design Gallery</Eyebrow>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--grid-gap)]">
            {[1, 2, 3].map((n) => (
              <div key={n} className="aspect-[4/3] bg-dark rounded" />
            ))}
          </div>
        </div>
      </section>

      {/* The Outcome */}
      <section className="bg-cream py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-8 block">The Outcome</Eyebrow>
          <SectionReveal>
            {/* Large stat */}
            <div className="mb-12">
              <p className="font-display text-[clamp(48px,8vw,96px)] text-gold leading-none">
                {project.metric}
              </p>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {project.results.map((result, i) => (
                <div key={i} className="border-l border-gold/30 pl-6">
                  <p className="font-body text-[length:var(--type-body)] text-text-dark font-light">
                    {result}
                  </p>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            {project.testimonial && (
              <div className="max-w-2xl">
                <div className="w-12 h-px bg-gold mb-8" />
                <blockquote className="font-display italic text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-dark mb-4">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </blockquote>
                <p className="font-body text-sm text-text-dark font-medium">
                  {project.testimonial.author}
                </p>
                <p className="font-body text-xs text-text-muted-dark mt-1">
                  {project.testimonial.role}
                </p>
              </div>
            )}
          </SectionReveal>
        </div>
      </section>

      {/* Next Project */}
      <section className="bg-dark py-16">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Link
            href={`/work/${nextProject.slug}`}
            data-cursor="portfolio"
            className="group flex items-center justify-between"
          >
            <div>
              <Eyebrow className="block mb-2">Next Project</Eyebrow>
              <h3 className="font-display italic text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] text-text-light group-hover:text-gold transition-colors">
                {nextProject.name}
              </h3>
            </div>
            <span className="font-body text-2xl text-gold">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
