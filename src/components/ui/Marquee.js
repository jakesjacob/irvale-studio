import { cn } from '@/lib/utils';

export default function Marquee({ items, separator = '·', className = '', speed = 30 }) {
  // Build a single repeated string, duplicated for seamless loop
  const content = items.join(` ${separator} `);
  const repeated = `${content} ${separator} ${content} ${separator} `;

  return (
    <div className={cn('overflow-hidden whitespace-nowrap', className)}>
      <div
        className="marquee-track"
        style={{ '--marquee-speed': `${speed}s` }}
      >
        <span className="inline-block">{repeated}</span>
      </div>
    </div>
  );
}
