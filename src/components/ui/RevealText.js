'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export default function RevealText({ children, as: Tag = 'p', className = '', delay = 0, style }) {
  const containerRef = useRef(null);

  const words = typeof children === 'string' ? children.split(' ') : [children];

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const spans = containerRef.current.querySelectorAll('.word-inner');

    gsap.from(spans, {
      yPercent: 100,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.05,
      delay,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        once: true,
      },
    });
  }, { scope: containerRef });

  return (
    <Tag ref={containerRef} className={cn('flex flex-wrap', className)} style={style}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em] pb-[0.15em]">
          <span className="word-inner inline-block">{word}</span>
        </span>
      ))}
    </Tag>
  );
}
