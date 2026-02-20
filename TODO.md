# Credvest — Remaining Tasks

## Content & Assets

- Replace all Unsplash placeholder images with real team photos (People page — 24 images, Homepage BigCards — 3 images, Careers page — 2 story images)
- Replace placeholder leadership images on Company page (3 leaders) with actual photos
- Update leadership names on Company page (currently Arjun Mehta, Priya Sharma, Sameer Bhayani)
- Write real venture descriptions for Group page (Parking Capital, Äiti Intérieurs, Suvaii, Vanamo)
- Add venture logos for Grahm, Tanjore Tiffins, Navathanyam if needed on Group page
- Replace "Coming Soon" link text for ventures without live sites

## SEO

- Add `sitemap.ts` (auto-generated sitemap for all routes)
- Add `robots.ts` (allow indexing, reference sitemap)
- Add page-level metadata to `/people`, `/brand`, `/group` pages (title, description, OG tags)
- Verify OG image (`og.webp`) renders correctly on social shares
- Add structured data (JSON-LD) for Organization schema

## Analytics & Tracking

- Set up Google Tag Manager (GTM) container
- Add GTM script to root layout
- Configure Google Analytics 4 (GA4) via GTM
- Set up conversion tracking on contact form submission
- Add event tracking for CTA clicks, page scrolls, career inquiries

## Contact Form

- Create API route (`/api/contact`) or integrate form service (Formspree, Resend, etc.)
- Wire up form submission (currently `e.preventDefault()` with no handler)
- Add form validation and success/error states
- Set up email notifications on new submissions

## Mobile Optimisation

- Final QA pass on all pages at 375px, 390px, 428px widths
- Test hamburger menu + slide-in nav on real devices
- Verify hero image heights and scroll behaviour on iOS Safari
- Check touch targets are minimum 44x44px on all interactive elements
- Test DitherShader performance on mobile (canvas rendering can be heavy)
- Verify Group page logo grid (Credvest top, 2x2 below) on small screens

## Performance

- Audit Lighthouse scores (target 90+ on all metrics)
- Lazy-load DitherShader canvases that are below the fold
- Optimise image sizes (currently using Unsplash URLs with `w=400`)
- Consider converting PNGs to WebP for venture logos

## Miscellaneous

- Add favicon as white SVG in black square (currently just the SVG)
- Review footer links — ensure all point to correct routes
- Add 404 page styling (currently uses Next.js default `_not-found`)
- Consider adding page transition animations
- Brand page (`/brand`) — verify content is complete

