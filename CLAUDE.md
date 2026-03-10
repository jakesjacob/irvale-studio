# Irvale Studio

## Tech Stack
- Next.js 16 + React 19 (JavaScript, no TypeScript)
- Tailwind CSS v4 via @tailwindcss/postcss
- GSAP + @gsap/react for animations (ScrollTrigger, pinned scroll, clip-path reveals)
- Lenis for smooth scrolling
- clsx + tailwind-merge for cn() utility

## Project Structure
```
src/
├── app/              # Next.js App Router pages and layouts
│   ├── globals.css   # Design tokens, type scale, spacing, base styles
│   ├── layout.js     # Root layout (Cormorant Garamond + DM Sans fonts)
│   └── page.js       # Homepage
├── components/       # React components
│   └── ui/           # Reusable UI components
├── lib/
│   ├── utils.js      # cn() utility
│   └── data/         # Hardcoded portfolio/content data as JS objects
└── public/           # Static assets (images in WebP)
```

## Conventions
- All files are .js (no TypeScript)
- Path alias: @/* maps to ./src/*
- Use 'use client' directive for client components
- Use cn() from @/lib/utils for Tailwind class merging
- Prefer Tailwind classes over inline styles
- Images should be WebP format, optimized
- Design tokens defined in globals.css (@theme for Tailwind + :root for custom properties)
- Fonts: Cormorant Garamond (display/serif) + DM Sans (body/sans)
- GSAP animations: use useGSAP hook from @gsap/react, always clean up with context.revert()
- All animations must respect prefers-reduced-motion

## MCP Servers Available
- **@21st-dev/magic** — Use this to search for and generate beautiful UI component examples. When building interactive components (buttons, cards, modals, navigation, forms, etc.), search 21st.dev first for inspiration and production-ready patterns.
- **context7** — Use this to fetch up-to-date documentation for any library (GSAP, Next.js, Tailwind, Lenis, etc.) before implementing. Always resolve the library ID first, then fetch relevant docs.
- **Figma** — Use for implementing designs from Figma files when URLs are provided.

## UI Inspiration
- When building premium UI components or interactions, search CodePen (https://codepen.io) for creative examples and animation inspiration. Particularly useful for: scroll animations, text reveals, custom cursors, magnetic buttons, parallax effects, and other luxury micro-interactions.

## Dev Spec
- The single source of truth for this build is `docs/dev-spec.md`
- Always reference it before starting any new section or component
