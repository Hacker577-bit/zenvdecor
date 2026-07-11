import type { CategorySlug } from "@/lib/types";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  icon: "bonsai" | "flower" | "succulent";
}

export const categories: Category[] = [
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
    slug: "succulents",
    name: "Succulents",
    description: "Compact greenery for windowsills and tabletops",
    icon: "succulent",
  },
];

export function getCategory(slug: CategorySlug): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
