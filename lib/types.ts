export type CategorySlug =
  | "trees"
  | "bonsai"
  | "flowering"
  | "hanging"
  | "succulents"
  | "planters";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  compareAtPrice?: number;
  description: string;
  details: string[];
  dimensions: string;
  badge?: "Bestseller" | "New" | "Limited";
  rating: number;
  reviewCount: number;
  imageVariant: number;
}
