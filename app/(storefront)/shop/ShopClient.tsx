"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import ProductGrid from "@/components/ProductGrid";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import type { CategorySlug } from "@/lib/types";

type SortKey = "featured" | "price-asc" | "price-desc" | "name-asc";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
];

export default function ShopClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory = searchParams.get("category") as CategorySlug | null;
  const [sort, setSort] = useState<SortKey>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = activeCategory
      ? products.filter((p) => p.category === activeCategory)
      : products;

    list = [...list];
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return list;
  }, [activeCategory, sort]);

  function setCategory(slug: CategorySlug | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) params.set("category", slug);
    else params.delete("category");
    router.push(`/shop${params.toString() ? `?${params.toString()}` : ""}`, {
      scroll: false,
    });
    setFiltersOpen(false);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          Shop All Plants
        </h1>
        <p className="mt-2 text-sm text-ink/60">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          {activeCategory
            ? ` in ${categories.find((c) => c.slug === activeCategory)?.name}`
            : ""}
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="hidden w-56 shrink-0 lg:block">
          <h2 className="font-display text-sm font-semibold text-ink">
            Category
          </h2>
          <ul className="mt-4 space-y-1">
            <li>
              <button
                onClick={() => setCategory(null)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors cursor-pointer ${
                  !activeCategory
                    ? "bg-forest text-cream"
                    : "text-ink/70 hover:bg-sand"
                }`}
              >
                All Products
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat.slug}>
                <button
                  onClick={() => setCategory(cat.slug)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors cursor-pointer ${
                    activeCategory === cat.slug
                      ? "bg-forest text-cream"
                      : "text-ink/70 hover:bg-sand"
                  }`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between gap-3">
            <button
              onClick={() => setFiltersOpen(true)}
              className="flex items-center gap-2 rounded-full border border-sand-dark px-4 py-2 text-sm font-medium text-ink/70 lg:hidden cursor-pointer"
            >
              <SlidersHorizontal className="h-4 w-4" strokeWidth={1.5} />
              Filter
            </button>
            <div className="ml-auto flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-ink/50">
                Sort
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-full border border-sand-dark bg-cream px-3 py-2 text-sm text-ink focus:border-forest focus:outline-none"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <ProductGrid products={filtered} />
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="relative ml-auto flex h-full w-72 flex-col bg-cream p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-base font-semibold">
                Category
              </h2>
              <button
                onClick={() => setFiltersOpen(false)}
                aria-label="Close filters"
                className="cursor-pointer"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setCategory(null)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm cursor-pointer ${
                    !activeCategory
                      ? "bg-forest text-cream"
                      : "text-ink/70 hover:bg-sand"
                  }`}
                >
                  All Products
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <button
                    onClick={() => setCategory(cat.slug)}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm cursor-pointer ${
                      activeCategory === cat.slug
                        ? "bg-forest text-cream"
                        : "text-ink/70 hover:bg-sand"
                    }`}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
