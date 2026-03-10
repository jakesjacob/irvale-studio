'use client';

import Image from 'next/image';
import Eyebrow from '@/components/ui/Eyebrow';

const tools = [
  { name: 'Claude', logo: '/logos/claude.svg' },
  { name: 'ChatGPT', logo: '/logos/chatgpt.svg' },
  { name: 'Cursor', logo: '/logos/cursor.svg' },
  { name: 'Gemini', logo: '/logos/gemini.svg' },
  { name: 'React', logo: '/logos/react.svg' },
  { name: 'Next.js', logo: '/logos/nextjs.svg' },
  { name: 'Vercel', logo: '/logos/vercel.svg' },
  { name: 'Google', logo: '/logos/google.svg' },
  { name: 'Instagram', logo: '/logos/instagram.svg' },
  { name: 'Facebook', logo: '/logos/facebook.svg' },
  { name: 'TikTok', logo: '/logos/tiktok.svg' },
  { name: 'Figma', logo: '/logos/figma.svg' },
  { name: 'Shopify', logo: '/logos/shopify.svg' },
  { name: 'WordPress', logo: '/logos/wordpress.svg' },
];

// Duplicate for seamless loop
const items = [...tools, ...tools];

function LogoItem({ tool }) {
  return (
    <div className="flex flex-col items-center gap-2 shrink-0">
      <Image
        src={tool.logo}
        alt={tool.name}
        width={40}
        height={40}
        className="h-8 md:h-10 w-8 md:w-10 object-contain opacity-20"
      />
      <span className="font-body text-[10px] md:text-xs text-text-dark/20 tracking-[0.15em] uppercase">
        {tool.name}
      </span>
    </div>
  );
}

export default function TechStack() {
  return (
    <section className="bg-cream-2 py-16 overflow-hidden">
      <div
        className="mx-auto px-[var(--gutter)] mb-10"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <Eyebrow className="block text-center">Powered By</Eyebrow>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="marquee-track gap-10 md:gap-14"
          style={{ '--marquee-speed': '30s' }}
        >
          {items.map((tool, i) => (
            <LogoItem key={i} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
