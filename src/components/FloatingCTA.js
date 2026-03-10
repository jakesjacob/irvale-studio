'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInteraction = useCallback((e) => {
    if (isTouchDevice) {
      // On touch, first tap expands, second tap follows link
      if (!expanded) {
        e.preventDefault();
        setExpanded(true);
        // Auto-collapse after 3 seconds
        setTimeout(() => setExpanded(false), 3000);
      }
    }
  }, [isTouchDevice, expanded]);

  return (
    <Link
      href="/contact"
      onClick={handleInteraction}
      onMouseEnter={() => !isTouchDevice && setExpanded(true)}
      onMouseLeave={() => !isTouchDevice && setExpanded(false)}
      className={cn(
        'floating-cta',
        'fixed bottom-6 right-6 z-90',
        'flex items-center justify-center',
        'bg-gold text-dark font-body font-semibold',
        'rounded-full shadow-lg cursor-pointer',
        'no-underline',
        'h-[48px] w-[48px] md:h-[56px] md:w-[56px]',
        'transition-all duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
        'hover:shadow-xl active:scale-95',
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-4 opacity-0 pointer-events-none',
        expanded && 'w-[220px] md:w-[240px]',
        'motion-reduce:transition-none',
        'pb-[env(safe-area-inset-bottom,0px)]'
      )}
      aria-label="Start a Project"
    >
      <span
        className={cn(
          'whitespace-nowrap text-[length:var(--type-body-sm)] tracking-wide overflow-hidden',
          'transition-all duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
          'motion-reduce:transition-none',
          expanded
            ? 'max-w-[200px] opacity-100 px-2'
            : 'max-w-0 opacity-0 px-0'
        )}
      >
        Start a Project
      </span>
      <span
        className={cn(
          'text-lg md:text-xl leading-none shrink-0',
          'transition-transform duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
          'motion-reduce:transition-none',
          expanded && 'translate-x-0.5'
        )}
        aria-hidden="true"
      >
        &rarr;
      </span>
    </Link>
  );
}
