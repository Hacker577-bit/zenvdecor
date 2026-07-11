import type { Product } from "@/lib/types";

export const products: Product[] = [
  {
    id: "p19",
    slug: "emerald-spike",
    name: "Emerald Spike",
    category: "succulents",
    price: 199,
    description:
      "Slender, spiky deep-green fronds in a fluted ceramic pot with a polished gold band — a compact, sculptural accent for shelves and side tables.",
    details: [
      "Real-touch spiked foliage",
      "Fluted ceramic pot with gold band",
      "No watering, no trimming",
    ],
    dimensions: '8" H x 6" W',
    badge: "New",
    rating: 4.8,
    reviewCount: 12,
    imageVariant: 19,
    images: ["/products/emerald-spike.jpg"],
  },
  {
    id: "p20",
    slug: "honey-petals",
    name: "Honey Petals",
    category: "flowering",
    price: 199,
    description:
      "A cheerful burst of golden-yellow blooms set in a textured white scalloped pot — warm, tabletop color that never wilts.",
    details: [
      "Hand-finished golden-yellow blooms",
      "Textured white ceramic pot",
      "Fade-resistant petals",
    ],
    dimensions: '9" H x 7" W',
    badge: "New",
    rating: 4.7,
    reviewCount: 9,
    imageVariant: 20,
    images: ["/products/honey-petals.jpg"],
  },
  {
    id: "p21",
    slug: "evergreen-charm",
    name: "EverGreen Charm",
    category: "succulents",
    price: 199,
    description:
      "A dense, dome-shaped bush of green and honey-gold foliage in a woven black textured pot — an easy pop of layered greenery.",
    details: [
      "Dense two-tone foliage",
      "Woven-texture black pot",
      "Compact tabletop size",
    ],
    dimensions: '9" H x 7" W',
    badge: "New",
    rating: 4.8,
    reviewCount: 7,
    imageVariant: 21,
    images: ["/products/evergreen-charm.jpg"],
  },
  {
    id: "p22",
    slug: "trio-set",
    name: "Trio Set — Emerald Spike, Honey Petals & EverGreen Charm",
    category: "succulents",
    price: 500,
    compareAtPrice: 597,
    description:
      "All three tabletop favorites together — Emerald Spike, Honey Petals and EverGreen Charm — bundled at a set price so you can style a whole shelf in one order.",
    details: [
      "Includes one each: Emerald Spike, Honey Petals, EverGreen Charm",
      "Bundle price — cheaper than buying separately",
      "Ready to style straight out of the box",
    ],
    dimensions: 'Set of 3, each approx. 8-9" H',
    badge: "Bestseller",
    rating: 4.9,
    reviewCount: 4,
    imageVariant: 22,
    images: ["/products/trio-set.jpg"],
  },
  {
    id: "p23",
    slug: "pocket-bonsai",
    name: "Pocket Bonsai",
    category: "bonsai",
    price: 250,
    description:
      "A palm-sized faux bonsai with three delicate leaf clusters on a hand-shaped trunk, set in a compact rectangular ceramic pot — sculptural greenery for the smallest spaces.",
    details: [
      "Hand-shaped trunk with real-touch leaf clusters",
      "Compact rectangular ceramic pot",
      "Fits on a desk, shelf or windowsill",
    ],
    dimensions: '6" H x 5" W',
    badge: "New",
    rating: 4.9,
    reviewCount: 3,
    imageVariant: 23,
    images: ["/products/hero-bonsai.jpg"],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}
