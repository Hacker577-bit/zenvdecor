"use client";

import {
  TreePine,
  Trees,
  Flower2,
  Leaf,
  Sprout,
  Vault,
} from "lucide-react";
import type { CategorySlug } from "@/lib/types";

const ICONS: Record<CategorySlug, typeof TreePine> = {
  trees: Trees,
  bonsai: TreePine,
  flowering: Flower2,
  hanging: Leaf,
  succulents: Sprout,
  planters: Vault,
};

const CATEGORY_THEME: Record<
  CategorySlug,
  { gradient: string; glow: string }
> = {
  trees: {
    gradient: "from-forest-light via-forest to-forest-dark",
    glow: "bg-gold/40",
  },
  bonsai: {
    gradient: "from-terracotta via-terracotta-dark to-forest-dark",
    glow: "bg-terracotta/30",
  },
  flowering: {
    gradient: "from-terracotta-dark via-forest-dark to-ink",
    glow: "bg-terracotta/40",
  },
  hanging: {
    gradient: "from-forest via-forest-dark to-ink",
    glow: "bg-forest-light/40",
  },
  succulents: {
    gradient: "from-forest-light via-forest to-terracotta-dark",
    glow: "bg-gold/30",
  },
  planters: {
    gradient: "from-ink via-forest-dark to-terracotta-dark",
    glow: "bg-terracotta/30",
  },
};

const ACCENT_POSITIONS = [
  "top-[10%] left-[15%]",
  "top-[65%] left-[70%]",
  "top-[20%] left-[75%]",
  "top-[70%] left-[10%]",
  "top-[40%] left-[50%]",
  "top-[15%] left-[45%]",
];

interface ProductImageProps {
  category: CategorySlug;
  imageVariant: number;
  className?: string;
  iconClassName?: string;
}

export default function ProductImage({
  category,
  imageVariant,
  className = "",
  iconClassName = "",
}: ProductImageProps) {
  const Icon = ICONS[category] ?? Leaf;
  const theme = CATEGORY_THEME[category] ?? CATEGORY_THEME.trees;
  const accentPos = ACCENT_POSITIONS[imageVariant % ACCENT_POSITIONS.length];
  const rotate = (imageVariant % 5) * 3 - 6;

  return (
    <div
      className={`bg-grain relative flex items-center justify-center overflow-hidden bg-linear-to-br ${theme.gradient} ring-1 ring-inset ring-cream/10 ${className}`}
    >
      {/* soft light glow */}
      <div
        className={`absolute h-2/3 w-2/3 rounded-full blur-3xl opacity-50 ${theme.glow} ${accentPos} -translate-x-1/2 -translate-y-1/2`}
      />
      {/* diagonal sheen */}
      <div className="absolute inset-0 bg-linear-to-br from-cream/15 via-transparent to-transparent" />
      {/* ghost icon for depth */}
      <Icon
        className="absolute h-2/3 w-2/3 text-cream/6"
        style={{ transform: `rotate(${rotate}deg) translate(8%, 8%)` }}
        strokeWidth={0.75}
      />
      {/* main icon */}
      <Icon
        className={`relative text-cream drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)] ${iconClassName || "w-1/3 h-1/3"}`}
        strokeWidth={1}
      />
      {/* bottom vignette for grounding */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-ink/25 to-transparent" />
    </div>
  );
}
