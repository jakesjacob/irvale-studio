import { cn } from '@/lib/utils';

export default function Marquee({ items, separator = '·', className = '', speed = 30 }) {
  const content = items.join(` ${separator} `) + ` ${separator} `;

  return (
    <div className={cn('overflow-hidden whitespace-nowrap', className)}>
      <div
        className="marquee-track"
        style={{ '--marquee-speed': `${speed}s` }}
      >
        <span className="inline-block">{content}</span>
        <span className="inline-block">{content}</span>
      </div>
    </div>
  );
}
