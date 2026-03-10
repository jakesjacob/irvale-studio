'use client';

import { useState } from 'react';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionReveal from '@/components/ui/SectionReveal';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'How long does a typical project take?',
    answer: 'Essentials projects take around 5 weeks, Signature around 8–10 weeks, and Elite projects 12–16 weeks. Timelines depend on content readiness and feedback speed.',
  },
  {
    question: 'Do you work with brands outside hospitality?',
    answer: 'Our expertise is deepest in luxury hospitality, wellness, and private membership. If your brand shares those values of quality and exclusivity, we\'re open to a conversation.',
  },
  {
    question: 'What\'s included in the retainer pricing?',
    answer: 'Retainers cover ongoing maintenance, performance monitoring, content updates, and priority support. SEO and AI Visibility retainers include monthly strategy and optimisation work.',
  },
  {
    question: 'Can I start with Essentials and upgrade later?',
    answer: 'Absolutely. We build every site with scalability in mind. Many clients start with Essentials and move to Signature or Elite as their needs grow.',
  },
  {
    question: 'Do you handle content and photography?',
    answer: 'We offer photography direction as an add-on and can recommend trusted collaborators. For copy, we provide guidance and structure — you bring the brand voice, we shape it for the web.',
  },
  {
    question: 'What is AI Visibility?',
    answer: 'AI Visibility ensures your brand appears in AI-generated recommendations (ChatGPT, Gemini, Perplexity). It\'s the next evolution of search — and most brands aren\'t prepared for it. Our Elite tier includes it by default.',
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-dark py-[var(--section-gap)]">
      <div
        className="mx-auto px-[var(--gutter)]"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <Eyebrow className="mb-8 block">Frequently Asked Questions</Eyebrow>
        <SectionReveal className="max-w-2xl">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-[var(--border-dark)]">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-6 flex items-center justify-between text-left"
              >
                <span className="font-body text-[length:var(--type-body)] text-text-light font-light pr-8">
                  {faq.question}
                </span>
                <span className={cn(
                  'text-gold text-xl transition-transform duration-300 shrink-0',
                  openIndex === i && 'rotate-45'
                )}>
                  +
                </span>
              </button>
              <div
                className={cn(
                  'overflow-hidden transition-all duration-300',
                  openIndex === i ? 'max-h-96 pb-6' : 'max-h-0'
                )}
              >
                <p className="font-body text-sm text-text-muted-light font-light leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </SectionReveal>
      </div>
    </section>
  );
}
