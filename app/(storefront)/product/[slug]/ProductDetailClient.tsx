"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Minus,
  Plus,
  Star,
  Truck,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/lib/cart-store";
import { FREE_DELIVERY_MIN_ITEMS } from "@/lib/shipping";
import { categories } from "@/data/categories";
import ProductImage from "@/components/ProductImage";
import ProductGrid from "@/components/ProductGrid";

export default function ProductDetailClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const category = categories.find((c) => c.slug === product.category);
  const images = product.images ?? [];

  function handleAddToCart() {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-ink/50">
        <Link href="/" className="hover:text-forest">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/shop" className="hover:text-forest">
          Shop
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-ink/70">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="aspect-square overflow-hidden rounded-3xl">
            <ProductImage
              category={product.category}
              imageVariant={product.imageVariant}
              image={images[activeImage]}
              alt={product.name}
              className="h-full w-full"
              iconClassName="w-1/3 h-1/3"
            />
          </div>
          {images.length > 1 && (
            <div className="mt-3 grid grid-cols-5 gap-3">
              {images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`aspect-square overflow-hidden rounded-xl ring-2 transition-all cursor-pointer ${
                    activeImage === i
                      ? "ring-forest"
                      : "ring-transparent hover:ring-sand-dark"
                  }`}
                >
                  <ProductImage
                    category={product.category}
                    imageVariant={product.imageVariant}
                    image={img}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    className="h-full w-full"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          {product.badge && (
            <span className="inline-flex rounded-full bg-terracotta px-3 py-1 text-[11px] font-semibold tracking-wide text-cream">
              {product.badge}
            </span>
          )}
          <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            {product.name}
          </h1>
          <div className="mt-3 flex items-center gap-2 text-sm text-ink/60">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(product.rating)
                      ? "fill-terracotta text-terracotta"
                      : "text-sand-dark"
                  }`}
                />
              ))}
            </div>
            <span>
              {product.rating.toFixed(1)} · {product.reviewCount} reviews
            </span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-3xl font-semibold text-forest-dark">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-lg text-ink/40 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <p className="mt-6 max-w-lg text-sm leading-relaxed text-ink/65">
            {product.description}
          </p>

          <ul className="mt-5 space-y-2">
            {product.details.map((d) => (
              <li
                key={d}
                className="flex items-start gap-2 text-sm text-ink/70"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                {d}
              </li>
            ))}
          </ul>

          <p className="mt-5 text-sm text-ink/50">
            <span className="font-medium text-ink/70">Dimensions:</span>{" "}
            {product.dimensions}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-full border border-sand-dark">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex h-12 w-12 items-center justify-center text-ink/70 hover:text-forest cursor-pointer"
              >
                <Minus className="h-4 w-4" strokeWidth={1.5} />
              </button>
              <span className="w-8 text-center text-sm font-semibold">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="flex h-12 w-12 items-center justify-center text-ink/70 hover:text-forest cursor-pointer"
              >
                <Plus className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 rounded-full bg-forest px-8 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-forest-dark cursor-pointer sm:flex-none"
            >
              {added ? "Added to Cart ✓" : "Add to Cart"}
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 border-t border-sand-dark/60 pt-6 sm:grid-cols-2">
            <div className="flex items-center gap-3 text-sm text-ink/60">
              <Truck className="h-4 w-4 text-forest" strokeWidth={1.5} />
              Free delivery on orders of {FREE_DELIVERY_MIN_ITEMS}+ pieces
            </div>
            <div className="flex items-center gap-3 text-sm text-ink/60">
              <ShieldCheck className="h-4 w-4 text-forest" strokeWidth={1.5} />
              30-day hassle-free returns
            </div>
          </div>

          {category && (
            <Link
              href={`/shop?category=${category.slug}`}
              className="mt-6 inline-block text-xs font-medium uppercase tracking-widest text-ink/40 hover:text-forest"
            >
              More in {category.name}
            </Link>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="mb-8 font-display text-2xl font-semibold text-ink">
            You May Also Like
          </h2>
          <ProductGrid products={related} />
        </div>
      )}
    </div>
  );
}
