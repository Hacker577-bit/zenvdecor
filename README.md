# Zenv Decor

An exquisite, deployment-ready storefront for artificial plants, trees and botanical decor. Built with Next.js (App Router), TypeScript and Tailwind CSS.

## Stack

- **Next.js 16** (App Router, Turbopack) + TypeScript
- **Tailwind CSS v4** for styling, custom warm forest/terracotta palette
- **Framer Motion** for scroll-reveal and hover animations
- **Zustand** for cart state (persisted to `localStorage`)
- **lucide-react** for icons
- No CMS or payment gateway — product data is a typed catalog in `data/products.ts`, and checkout hands off a formatted order to WhatsApp or email
- **Postgres** (Neon, via Vercel's dashboard) for order storage, behind a password-protected `/admin` dashboard — see "Managing Orders" below

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/                  routes: home, /shop, /product/[slug], /checkout, /about, /contact, /admin
app/api/               orders (create/list/update), admin/login, admin/logout
components/            Header, Footer, CartDrawer, ProductCard/Grid, Hero, etc.
data/                  products.ts, categories.ts — edit these to manage your catalog
lib/                   cart-store.ts (zustand), whatsapp.ts (order message builder), db.ts (orders), admin-auth.ts, types.ts, format.ts
middleware.ts          protects /admin behind the login cookie
```

## Managing products

Products live in [data/products.ts](data/products.ts) as a plain TypeScript array — no build step or CMS required. Each product needs a unique `id` and `slug`, a `category` (must match a slug in [data/categories.ts](data/categories.ts)), pricing, description, `details` bullet points, `dimensions`, and an `imageVariant` number (used to vary the placeholder gradient/icon).

Product photography defaults to a generated placeholder (`components/ProductImage.tsx` — a category-tinted gradient with a botanical icon) so the site looks polished with zero external assets. To use your own photos:

1. Drop image files into `public/products/` (see `public/products/README.md`).
2. Add an `images` array to the product entry in `data/products.ts`, e.g. `images: ["/products/monstera-1.jpg"]`.
3. That's it — `<ProductImage />` automatically renders the real photo (via `next/image`) whenever `images` is set, and falls back to the placeholder otherwise. The first image is used everywhere; extras appear as a thumbnail gallery on the product detail page.

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

## Managing orders

Every checkout submission is saved to a Postgres database, in addition to opening the WhatsApp/email handoff. Orders are visible at **`/admin`**, protected by a single shared password.

### 1. Add a database (one-time, in the Vercel dashboard)

1. Open your project on [vercel.com](https://vercel.com) → **Storage** tab → **Create Database** → choose **Postgres** (powered by Neon).
2. Once created, Vercel automatically adds a `DATABASE_URL` (and related) environment variable to your project — no manual copying needed.
3. Redeploy (Vercel does this automatically after the storage is linked, or trigger it from the Deployments tab).

The `orders` table is created automatically on first use — there's no separate migration step to run.

### 2. Set the admin password

In your Vercel project → **Settings → Environment Variables**, add:

```
ADMIN_PASSWORD=<a password only you know>
```

Redeploy after adding it (env var changes require a new deployment to take effect).

### 3. View and manage orders

Go to `yourdomain.com/admin`, sign in with that password, and you'll see every order — customer details, items, subtotal, and a status dropdown (`new → confirmed → shipped → delivered`, or `cancelled`). Status changes save immediately.

If the database isn't connected yet, checkout still works normally (WhatsApp/email fire as before) — it just won't have anything to show at `/admin` until storage is set up.

### Local development

To test order storage locally, run `vercel link` then `vercel env pull .env.local` (after creating the database in the dashboard) to pull down the real `DATABASE_URL`. Without it, `/api/orders` will fail to save but checkout still completes via WhatsApp/email.

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

The storefront (home, shop, all product pages, about, contact, checkout) prerenders as static HTML. `/admin` and the `/api/*` routes are server-rendered on demand since they talk to the database.

### Deploy to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Add the environment variables from `.env.example` in the Vercel project settings.
4. Deploy.
5. Add Postgres storage and set `ADMIN_PASSWORD` as described in "Managing orders" above, then redeploy.

### Deploy to Netlify

1. Push the repo, then "Add new site" → import from Git.
2. Build command: `npm run build`. Netlify's Next.js runtime plugin handles the rest automatically.
3. Add the same environment variables in Site settings → Environment variables.
4. The one-click Postgres setup above is Vercel-specific. On Netlify, create a database directly at [neon.com](https://neon.com) (free tier) and set its connection string as `DATABASE_URL`.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build locally
- `npm run lint` — lint the project
