"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, ShoppingBag, Heart } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/lib/cart-store";
import ProductImage from "./ProductImage";

const BADGE_STYLES: Record<string, string> = {
  Bestseller: "bg-terracotta text-cream",
  New: "bg-forest text-cream",
  Limited: "bg-ink text-cream",
};

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="group relative flex flex-col">
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-4/5 overflow-hidden rounded-2xl shadow-sm ring-1 ring-ink/5 transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-forest-dark/15"
      >
        <ProductImage
          category={product.category}
          imageVariant={product.imageVariant}
          className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-105"
        />

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badge && (
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide shadow-sm ${BADGE_STYLES[product.badge]}`}
            >
              {product.badge}
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            setWishlisted((v) => !v);
          }}
          aria-label={
            wishlisted ? "Remove from wishlist" : "Add to wishlist"
          }
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-ink/60 opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 hover:text-terracotta group-hover:opacity-100 cursor-pointer"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${wishlisted ? "fill-terracotta text-terracotta" : ""}`}
            strokeWidth={1.5}
          />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            addItem(product);
          }}
          aria-label={`Add ${product.name} to cart`}
          className="absolute bottom-3 right-3 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-cream text-forest-dark opacity-0 shadow-lg transition-all duration-300 hover:bg-forest hover:text-cream hover:scale-105 group-hover:translate-y-0 group-hover:opacity-100 cursor-pointer"
        >
          <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </Link>

      <Link href={`/product/${product.slug}`} className="mt-4">
        <h3 className="font-display text-base font-medium leading-snug text-ink transition-colors group-hover:text-forest">
          {product.name}
        </h3>
      </Link>
      <div className="mt-1 flex items-center gap-1 text-xs text-ink/50">
        <Star className="h-3.5 w-3.5 fill-terracotta text-terracotta" />
        {product.rating.toFixed(1)}
        <span className="text-ink/30">({product.reviewCount})</span>
      </div>
      <div className="mt-1.5 flex items-center gap-2">
        <span className="font-display text-lg font-semibold text-forest-dark">
          {formatPrice(product.price)}
        </span>
        {product.compareAtPrice && (
          <span className="text-sm text-ink/40 line-through">
            {formatPrice(product.compareAtPrice)}
          </span>
        )}
      </div>
    </div>
  );
}
