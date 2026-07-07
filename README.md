# Zenv Decor

An exquisite, deployment-ready storefront for artificial plants, trees and botanical decor. Built with Next.js (App Router), TypeScript and Tailwind CSS.

## Stack

- **Next.js 16** (App Router, Turbopack) + TypeScript
- **Tailwind CSS v4** for styling, custom warm forest/terracotta palette
- **Framer Motion** for scroll-reveal and hover animations
- **Zustand** for cart state (persisted to `localStorage`)
- **lucide-react** for icons
- No database, CMS or payment gateway — product data is a typed catalog in `data/products.ts`, and checkout hands off a formatted order to WhatsApp or email

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/                  routes: home, /shop, /product/[slug], /checkout, /about, /contact
components/            Header, Footer, CartDrawer, ProductCard/Grid, Hero, etc.
data/                  products.ts, categories.ts — edit these to manage your catalog
lib/                   cart-store.ts (zustand), whatsapp.ts (order message builder), types.ts, format.ts
```

## Managing products

Products live in [data/products.ts](data/products.ts) as a plain TypeScript array — no build step or CMS required. Each product needs a unique `id` and `slug`, a `category` (must match a slug in [data/categories.ts](data/categories.ts)), pricing, description, `details` bullet points, `dimensions`, and an `imageVariant` number (used to vary the placeholder gradient/icon).

Product photography is currently a generated placeholder (`components/ProductImage.tsx` — a category-tinted gradient with a botanical icon) so the site looks polished with zero external assets. To swap in real photos:

1. Add images to `public/products/`.
2. Add an `image` field to the `Product` type in `lib/types.ts` and product entries.
3. Replace `<ProductImage />` usages with `next/image` pointing at the new field.

## Checkout flow

There's no payment gateway. The cart builds an itemized order message and:

- **WhatsApp** — opens `https://wa.me/<number>?text=...` with the order pre-filled
- **Email** — opens a `mailto:` link with the same order details

Configure your business WhatsApp number and store email via environment variables (see `.env.example`):

```
NEXT_PUBLIC_WHATSAPP_NUMBER=15551234567   # country code + number, no + or spaces
NEXT_PUBLIC_STORE_EMAIL=hello@yourdomain.com
```

Copy `.env.example` to `.env.local` and fill these in before deploying.

## Branding

Colors, fonts and copy are placeholders — update to match your brand:

- **Colors**: `app/globals.css` (`--color-forest`, `--color-terracotta`, `--color-cream`, etc.)
- **Fonts**: `app/layout.tsx` (currently Fraunces + Inter via `next/font/google`)
- **Logo**: `components/Header.tsx` and `components/Footer.tsx` currently use a text wordmark + leaf icon — swap for an image logo if you have one
- **Copy**: hero, about, and testimonials content lives directly in their respective components

## Build & deploy

```bash
npm run build
npm run start
```

The production build prerenders every route (home, shop, all product pages, about, contact, checkout) as static HTML — no server runtime dependency.

### Deploy to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Add the environment variables from `.env.example` in the Vercel project settings.
4. Deploy — no additional configuration needed.

### Deploy to Netlify

1. Push the repo, then "Add new site" → import from Git.
2. Build command: `npm run build`. Netlify's Next.js runtime plugin handles the rest automatically.
3. Add the same environment variables in Site settings → Environment variables.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build locally
- `npm run lint` — lint the project
