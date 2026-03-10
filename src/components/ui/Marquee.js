import { cn } from '@/lib/utils';

export default function Marquee({ items, separator = '·', className = '', speed = 30 }) {
  // Repeat items enough times for seamless loop on wide screens
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className={cn('overflow-hidden whitespace-nowrap', className)}>
      <div
        className="marquee-track gap-0"
        style={{ '--marquee-speed': `${speed}s` }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="shrink-0">{item}</span>
        )).reduce((acc, item, i) => {
          if (i > 0) {
            acc.push(
              <span key={`dot-${i}`} className="w-1.5 h-1.5 rounded-full bg-gold/30 shrink-0 mx-6 md:mx-8" />
            );
          }
          acc.push(item);
          return acc;
        }, [])}
      </div>
    </div>
  );
}
