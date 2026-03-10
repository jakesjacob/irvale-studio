# IRVALE STUDIO — DEV SPEC (Source of Truth)

> Adapted from the v3 brand brief for Next.js + Tailwind implementation.
> This is the single source of truth for building the site.

---

## 1. BRAND

- **Name:** Irvale Studio
- **Tagline:** *Where luxury brands meet their digital moment.*
- **Logo:** Wordmark only — `IRVALE STUDIO` in Cormorant Garamond Regular, `letter-spacing: 0.25em`. Optional thin gold 1px rule beneath (60% width of text).

---

## 2. TECH STACK

| Layer | Tool |
|---|---|
| Framework | Next.js 16 + React 19 (JavaScript, no TS) |
| Styling | Tailwind CSS v4 via @tailwindcss/postcss |
| Utility | clsx + tailwind-merge → `cn()` |
| Animation | GSAP 3.14 + @gsap/react (ScrollTrigger, useGSAP hook) |
| Smooth Scroll | Lenis |
| Text Animation | Manual React word-wrapping (no SplitText — it's a paid plugin) |
| Forms | Next.js API route + Resend (email delivery) |
| CMS | None — portfolio data hardcoded in `src/lib/data/` |
| Hosting | Vercel |
| Analytics | Plausible (defer to launch) |

---

## 3. COLOUR PALETTE

Defined in `globals.css` via Tailwind `@theme` and `:root`.

### Tailwind class mapping:
| Token | Hex | Tailwind class usage |
|---|---|---|
| `--color-dark` | `#111111` | `bg-dark`, `text-dark` |
| `--color-dark-2` | `#1A1A1A` | `bg-dark-2` |
| `--color-cream` | `#F5F0E8` | `bg-cream` |
| `--color-cream-2` | `#EDE8DF` | `bg-cream-2` |
| `--color-navy` | `#0F1F3D` | `bg-navy` (AI Visibility page only) |
| `--color-gold` | `#C9A96E` | `text-gold`, `border-gold` |
| `--color-gold-light` | `#D9BC89` | `text-gold-light` (hover states) |
| `--color-gold-muted` | `#A8895A` | `text-gold-muted` (gold on dark bg) |
| `--color-text-dark` | `#1E1E1E` | `text-text-dark` |
| `--color-text-light` | `#F0EDE6` | `text-text-light` |
| `--color-text-muted-dark` | `#6B6560` | Captions on cream |
| `--color-text-muted-light` | `#9A9590` | Captions on dark |

### Colour rules:
- Gold = accent only (lines, borders, CTA text, hover). Never large fills.
- Dark sections: `bg-dark` + `text-text-light` + gold accents
- Light sections: `bg-cream` + `text-text-dark` + gold-muted accents
- Max 3 colours visible per section
- Navy is exclusive to `/ai-visibility`

---

## 4. TYPOGRAPHY

### Fonts (loaded via next/font/google in layout.js):
- **Display/Headings:** Cormorant Garamond (`--font-display`) — serif
- **Body/UI:** DM Sans (`--font-body`) — sans-serif

### Type scale (CSS custom properties in :root):
| Token | Size | Use |
|---|---|---|
| `--type-display` | `clamp(64px, 9vw, 140px)` | Hero headlines only |
| `--type-h1` | `clamp(48px, 6vw, 96px)` | Page titles, section heroes |
| `--type-h2` | `clamp(36px, 4vw, 64px)` | Section headlines |
| `--type-h3` | `clamp(24px, 2.5vw, 36px)` | Card titles, service names |
| `--type-body-lg` | `clamp(18px, 1.5vw, 22px)` | Intro paragraphs |
| `--type-body` | `clamp(16px, 1.2vw, 18px)` | Body copy |
| `--type-label` | `12px` | Eyebrow labels |

### Type rules:
- **Display headlines:** Cormorant Garamond, *italic*, weight 400–500. Never bold.
- **Section headlines (H2):** Cormorant Garamond, regular (400), not italic.
- **Eyebrow labels:** DM Sans Medium (500), ALL CAPS, `letter-spacing: 0.18em`, gold.
- **Body copy:** DM Sans Light (300) or Regular (400).
- **Navigation:** DM Sans Medium (500).
- **Numbers/stats:** Cormorant Garamond Regular (editorial feel).

---

## 5. SPACING & LAYOUT

| Token | Value |
|---|---|
| `--max-width` | `1320px` |
| `--gutter` | `clamp(24px, 5vw, 80px)` |
| `--section-gap` | `clamp(100px, 12vw, 180px)` |
| `--component-gap` | `clamp(48px, 6vw, 96px)` |
| `--grid-gap` | `clamp(16px, 2vw, 32px)` |

- All content capped at max-width and centred
- Hero sections: full viewport width, images bleed to edge
- 12-column grid for precision layouts

---

## 6. ANIMATION SYSTEM

All animation via GSAP. Use `useGSAP` hook from `@gsap/react` in every animated component.

### 6.1 — Smooth Scrolling (Lenis)
- Initialize in a `<SmoothScroll>` client component wrapping the app
- Sync with GSAP ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)`
- Duration: 1.4, easing: exponential decay

### 6.2 — Preloader (Curtain Reveal)
- Full-screen dark overlay → `IRVALE` wordmark fades in (gold, Cormorant) → fades out → two vertical panels slide outward like theatre curtains
- Total: ~1.4s. Only on first visit (sessionStorage flag `irvale_visited`)
- Build as `<Preloader>` client component

### 6.3 — Page Transitions
- Custom `<TransitionLayout>` wrapper using `usePathname()` + GSAP
- Exit: content fades out (0.3s) → dark curtain sweeps up (0.4s)
- Enter: curtain sweeps away (0.4s) → content fades in
- Total: ~1s

### 6.4 — Text Reveals (Word-by-Word)
- Build a `<RevealText>` component that wraps each word in `<span>` with overflow hidden
- Inner spans start `translateY(100%) opacity(0)`, stagger 0.05s on scroll trigger
- Ease: `power3.out`, duration: 0.8s

### 6.5 — Section Reveals
- Fade up: `opacity 0→1`, `y 30→0`, duration 0.9s, ease `power2.out`
- Staggered children: 0.12s delay between siblings
- Images: clip-path wipe `inset(100% 0 0 0) → inset(0)` + scale `1.2→1.0`

### 6.6 — Custom Cursor
- Build as `<CustomCursor>` client component, hidden on touch devices
- States: default (12px circle, gold border) → link hover (48px, gold 15% fill) → portfolio hover (80px, "VIEW" text) → nav hover (8px, filled gold)
- GSAP `quickTo` for smooth tracking with lag

### 6.7 — Magnetic Buttons
- `<MagneticButton>` wrapper component
- Attracts content toward cursor within ~80px radius
- Spring-back on leave: `elastic.out(1, 0.4)`

### 6.8 — Horizontal Scroll (Homepage Featured Work)
- Pinned section, cards travel left on scroll
- 3–4 cards at ~45vw each
- Falls back to vertical scroll on mobile
- Uses ScrollTrigger pin + scrub

### 6.9 — Parallax Images
- All full-bleed images scroll at 0.85x speed
- `yPercent: 15` with ScrollTrigger scrub

### 6.10 — Marquee/Ticker
- CSS-only infinite marquee (performant)
- Two instances: hero bottom (niche labels) + services divider (tier names)

### 6.11 — Number Counter
- Count from 0 to target on scroll trigger
- GSAP `{ val: 0 }` → `{ val: target }`, duration 1.5s

### 6.12 — Navigation
- Transparent on load → `bg-dark` with gold border on scroll past 80px
- Mobile: hamburger (3 lines → X), full-screen dark overlay with staggered links

### 6.13 — Image Reveals
- Clip-path wipe: `inset(100% 0 0 0) → inset(0)`, duration 1.1s
- Simultaneous image scale: `1.2 → 1.0`

### Accessibility
- All animations respect `prefers-reduced-motion` — disable/reduce when set
- Custom cursor hidden on touch devices
- Smooth scroll degrades to native on preference

---

## 7. NAVIGATION

```
Logo (left)    |    Work · Services · AI Visibility· · About    |    [Start a Project →] (right)
```

- "AI Visibility" has a gold dot suffix and slightly heavier weight
- Gold underline slides in from left on hover
- Mobile: hamburger → full-screen overlay
- CTA button is magnetic

---

## 8. SITE MAP & ROUTES

| Route | Page | Notes |
|---|---|---|
| `/` | Homepage | Hero, marquee, logos, intro, h-scroll work, services, process, testimonial, CTA |
| `/work` | Portfolio Index | Filter bar + asymmetric masonry grid |
| `/work/[slug]` | Case Study | Universal template, 6 projects |
| `/services` | Services & Pricing | Hero, 3 tier cards, marquee, add-ons grid, FAQ accordion |
| `/ai-visibility` | AI Search Optimisation | Navy bg, specialist page, 3 pillars, pricing cards |
| `/about` | Studio Story | Hero, story, 3 principles, team, logos, CTA |
| `/contact` | Enquiry Form | 50/50 split layout, floating labels, form validation |
| `/not-found` | 404 | Custom not-found page |

---

## 9. PAGE SPECS

### 9.1 — Homepage (`/`)

**Sections in order:**
1. **Preloader** — curtain reveal (first visit only)
2. **Hero** — full viewport, bg image/video, radial gradient overlay, left-aligned text (bottom third), word reveal headline, CTAs, editorial counter `01/01`
3. **Marquee** — dark strip, infinite scroll: `GOLF CLUBS · LUXURY SPAS · BOUTIQUE GYMS · PRIVATE HOTELS · FINE DINING · AI VISIBILITY · MEMBERS CLUBS ·`
4. **Trust Logos** — cream bg, `TRUSTED BY PREMIUM BRANDS` eyebrow, 5–6 grayscale logos, 40% opacity → 60% on hover
5. **Intro Statement** — dark bg, `WHO WE ARE` eyebrow, large headline, 2-col body text, 3 stats with gold vertical rules (12 Projects/Year, 100% Bespoke, 3 Disciplines)
6. **Featured Work** — dark bg, `SELECTED WORK` eyebrow, pinned horizontal scroll, 3 portfolio cards at ~45vw, `See All Work →` CTA after unpin
7. **Services Overview** — cream bg, `WHAT WE DO` eyebrow, 3 numbered columns (gold `01`/`02`/`03`), gold rules beneath each, `Explore All Services →`
8. **Process** — dark bg, `HOW WE WORK` eyebrow, 4 horizontal steps connected by gold dotted line, timeline note
9. **Testimonial** — cream bg, large italic Cormorant quote (~48–56px), attribution, gold rules above/below
10. **CTA** — dark bg, italic headline, subtext, gold filled magnetic button, muted response-time note

### 9.2 — Work (`/work`)

- Dark header with headline, subtext, project count badge
- Sticky filter bar: `All · Golf · Spa & Wellness · Hotels · Gyms · Restaurants · Members Clubs`
- Asymmetric masonry grid (alternating 8/4, 4/8, 6/6 column rhythm)
- Cards: full-bleed image, hover overlay (project name, niche tag, `View Case Study →`)
- Clip-path wipe reveal on scroll

### 9.3 — Case Study (`/work/[slug]`)

Universal template with sections:
1. Intro bar — thin cream strip, back link, project name, year
2. Hero — full viewport, full-bleed image, project name at bottom-left, parallax
3. Metadata bar — dark strip, 4 cols: client type, timeline, services, headline result
4. The Challenge — cream bg, 2-col (pull quote left, body right)
5. Our Approach — dark bg, numbered process steps
6. Design Gallery — browser mockup, mobile mockups, detail crops, horizontal scroll gallery
7. The Outcome — cream bg, large stat, testimonial, result bullets
8. Next Project → — dark strip, hover reveals next project image

### 9.4 — Services (`/services`)

**Part A — Hero:** Dark bg, headline + subtext about dual SEO/AI capability
**Part B — 3 Tier Cards:** Cream bg, white cards

| Tier | Price (from) | Monthly | Key differentiator |
|---|---|---|---|
| Essentials | £6,000 | £350/mo | Up to 6 pages, basic SEO, 30-day support |
| Signature ★ | £12,000 | £750/mo | Up to 12 pages, full SEO, CMS, booking integration, 60-day support |
| Elite | £22,000 | £1,500/mo | Unlimited pages, brand workshop, AI Search included, dedicated AM |

- Signature card: gold 1px border, 12px taller, `MOST POPULAR` badge
- Pricing notes beneath cards (indicative pricing, retainer terms, bespoke link)

**Part C — Marquee:** Dark band, gold text: `ESSENTIALS · SIGNATURE · ELITE · BESPOKE ·`

**Part D — Add-Ons Grid:** Cream bg, 3-column cards:
| Add-On | Price |
|---|---|
| SEO Growth Retainer | From £1,200/mo |
| AI Search Optimisation | From £800/mo |
| Analytics Dashboard | From £1,800 |
| Custom Admin Panel | From £4,000 |
| Performance Audit | £950 fixed |
| Digital Ads Management | From £800/mo |
| Email Marketing Setup | From £1,200 |
| CRO Package | From £1,500 |
| Photography Direction | From £750 |
| Maintenance Retainer | From £350/mo |

**Part E — FAQ Accordion:** Content TBD (to be drafted during build)

### 9.5 — AI Visibility (`/ai-visibility`)

- **Entire page uses navy bg** (`--color-navy`) — visual separation as specialist practice
- Hero: eyebrow `THE NEXT ERA OF SEARCH`, italic headline, CTA, subtle animated gradient mesh bg
- Problem stats: `60%` / `1 in 3` / `<5%` with explanations
- 3 Pillars: dark cards with gold borders — Entity & Knowledge Graph, Citation & Authority, Content Architecture for AI
- Pricing: 3 cards — AI Audit (£950), AI Visibility Project (from £2,500), AI Visibility Retainer (from £800/mo)
- CTA section

### 9.6 — About (`/about`)

- Dark hero: centred large headline
- Cream studio story: 2-col (image left, text right), 3 paragraphs
- Dark philosophy: 3-col horizontal principles
- Cream team section: headshots + name + role
- Client logos (shared with homepage)
- CTA

### 9.7 — Contact (`/contact`)

- Full viewport height, 50/50 split
- **Left (dark):** wordmark, response time note, email (gold link), social icons, availability note, gold vertical rule on right edge
- **Right (cream):** form with floating labels
- **Form fields:** Name, Email, Brand/Company, Niche (dropdown), Service Interest (multi-select checkboxes), Budget (dropdown), Project Description (textarea), How Did You Find Us (dropdown)
- **Form UX:** floating labels, gold bottom border on focus (animates from left), red error states, success message on submit
- **Submit:** `Send Enquiry →` — gold filled, magnetic on desktop, full-width on mobile
- **Backend:** Next.js API route → Resend email

### 9.8 — 404

- Custom not-found page, on-brand styling
- Link back to homepage

---

## 10. PORTFOLIO DATA

Hardcoded in `src/lib/data/projects.js`:

| # | Slug | Name | Niche | Services | Metric | Tier |
|---|---|---|---|---|---|---|
| 1 | `heathland-golf-club` | Heathland Golf Club | Private Golf | Signature + SEO | +340% membership enquiries | Signature |
| 2 | `aura-wellness-retreat` | Aura Wellness Retreat | Luxury Spa | Signature | 4.8★ booking experience | Signature |
| 3 | `blackwood-performance` | Blackwood Performance | Boutique Gym | Essentials | +210% class bookings | Essentials |
| 4 | `the-halcyon-hotel` | The Halcyon Hotel | Boutique Hotel | Elite + SEO | +180% direct bookings | Elite |
| 5 | `elara-private-dining` | Elara Private Dining | Fine Dining | Signature | Sold out within 72hrs of launch | Signature |
| 6 | `crestview-members-club` | Crestview Members Club | Members Club | Elite + AI Visibility | 400+ waitlist in 3 months | Elite |

**Note:** Crestview is the AI Visibility hero case study — feature prominently on `/ai-visibility`.

---

## 11. COPY VOICE

**Archetype:** Senior creative director at a Mayfair studio. Confident, precise, never oversells.

| Don't | Do |
|---|---|
| "World-class results" | "+180% direct bookings, first quarter post-launch" |
| "Passionate about design" | "We've spent years building for brands that won't settle." |
| "Cutting-edge AI solutions" | "When someone asks ChatGPT for the best spa in your city — we make sure they hear your name." |
| "Let's chat!" | "We respond within 24 hours." |
| Generic buzzwords | Specific numbers and outcomes |

---

## 12. REUSABLE COMPONENTS TO BUILD

| Component | File | Notes |
|---|---|---|
| `SmoothScroll` | `components/SmoothScroll.js` | Lenis wrapper, syncs with GSAP |
| `Preloader` | `components/Preloader.js` | Curtain reveal, sessionStorage gate |
| `TransitionLayout` | `components/TransitionLayout.js` | Page transition wrapper |
| `Navbar` | `components/Navbar.js` | Transparent→dark, mobile hamburger |
| `CustomCursor` | `components/CustomCursor.js` | Multi-state cursor, hidden on touch |
| `MagneticButton` | `components/ui/MagneticButton.js` | GSAP magnetic effect wrapper |
| `RevealText` | `components/ui/RevealText.js` | Word-by-word scroll reveal |
| `SectionReveal` | `components/ui/SectionReveal.js` | Fade-up wrapper for sections |
| `ImageReveal` | `components/ui/ImageReveal.js` | Clip-path wipe + scale |
| `Marquee` | `components/ui/Marquee.js` | CSS-only infinite ticker |
| `Counter` | `components/ui/Counter.js` | Number count-up on scroll |
| `Eyebrow` | `components/ui/Eyebrow.js` | Gold uppercase label |
| `Footer` | `components/Footer.js` | Site footer |
| `ServiceCard` | `components/ServiceCard.js` | Tier pricing card |
| `PortfolioCard` | `components/PortfolioCard.js` | Image + hover overlay |
| `Accordion` | `components/ui/Accordion.js` | FAQ accordion |
| `ContactForm` | `components/ContactForm.js` | Floating labels, validation |

---

## 13. BUILD PHASES

### Phase 1: Foundation
- [x] Project scaffolding (Next.js, Tailwind, GSAP, Lenis)
- [x] Design tokens in globals.css
- [x] Font setup (Cormorant Garamond + DM Sans)
- [x] cn() utility
- [ ] SmoothScroll component (Lenis + GSAP sync)
- [ ] CustomCursor component
- [ ] Navbar (desktop + mobile)
- [ ] Preloader
- [ ] TransitionLayout (page transitions)
- [ ] Reusable animation components (RevealText, SectionReveal, ImageReveal, Marquee, Counter, Eyebrow, MagneticButton)
- [ ] Footer

### Phase 2: Homepage
- [ ] Hero section (bg image, overlay, headline, CTAs, counter)
- [ ] Marquee ticker
- [ ] Trust logos bar
- [ ] Intro statement + stats
- [ ] Horizontal scroll featured work
- [ ] Services overview (3 columns)
- [ ] Process steps
- [ ] Testimonial
- [ ] CTA section

### Phase 3: Core Pages
- [ ] Portfolio index (`/work`) — grid + filter
- [ ] Case study template (`/work/[slug]`) — build once with data-driven content
- [ ] Portfolio data file (`src/lib/data/projects.js`)
- [ ] Services page — all 5 parts (hero, tiers, marquee, add-ons, FAQ)
- [ ] AI Visibility page (navy theme)

### Phase 4: Supporting Pages
- [ ] About page
- [ ] Contact page + form
- [ ] Contact API route (Resend integration)
- [ ] 404 page

### Phase 5: Polish & Launch Prep
- [ ] All scroll-triggered animations wired up
- [ ] Magnetic buttons on all CTAs
- [ ] Portfolio hover effects
- [ ] Full mobile responsiveness pass
- [ ] Performance audit (Lighthouse 90+ mobile)
- [ ] Schema markup (LocalBusiness, Service, FAQPage, CreativeWork)
- [ ] Meta titles + descriptions per page
- [ ] Open Graph tags + OG image
- [ ] Favicon (gold M monogram)
- [ ] sitemap.xml + robots.txt
- [ ] prefers-reduced-motion respected everywhere
- [ ] No console errors
- [ ] Plausible analytics integration

---

## 14. PERFORMANCE TARGETS

- Lighthouse mobile: 90+
- LCP: < 2.5s
- CLS: < 0.1
- All images: WebP, `loading="lazy"`, explicit width + height
- Fonts: `font-display: swap`, preloaded via next/font
- GSAP: animations degrade gracefully without JS

---

## 15. SCHEMA MARKUP

- `LocalBusiness` on `/contact`
- `Service` on `/services` (one per tier)
- `FAQPage` on FAQ accordion
- `CreativeWork` on each `/work/[slug]`
