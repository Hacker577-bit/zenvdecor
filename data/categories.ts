import type { CategorySlug } from "@/lib/types";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  icon: "tree" | "bonsai" | "flower" | "hanging" | "succulent" | "planter";
}

export const categories: Category[] = [
  {
    slug: "trees",
    name: "Artificial Trees",
    description: "Statement floor trees for corners and entryways",
    icon: "tree",
  },
  {
    slug: "bonsai",
    name: "Bonsai",
    description: "Sculpted miniature trees for desks and shelves",
    icon: "bonsai",
  },
  {
    slug: "flowering",
    name: "Flowering",
    description: "Faux blooms that stay in bloom all year",
    icon: "flower",
  },
  {
    slug: "hanging",
    name: "Hanging Greenery",
    description: "Trailing vines and baskets for shelves & ceilings",
    icon: "hanging",
  },
  {
    slug: "succulents",
    name: "Succulents",
    description: "Compact greenery for windowsills and tabletops",
    icon: "succulent",
  },
  {
    slug: "planters",
    name: "Planters & Vases",
    description: "Ceramic, rattan and stone vessels to complete the look",
    icon: "planter",
  },
];

export function getCategory(slug: CategorySlug): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
