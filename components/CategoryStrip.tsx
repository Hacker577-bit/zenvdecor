"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/categories";
import ProductImage from "./ProductImage";

export default function CategoryStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
            Browse
          </span>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
            Shop by Category
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <Link
              href={`/shop?category=${cat.slug}`}
              className="group relative block aspect-3/4 overflow-hidden rounded-2xl shadow-sm ring-1 ring-ink/5 transition-shadow duration-300 hover:shadow-xl hover:shadow-forest-dark/20"
            >
              <ProductImage
                category={cat.slug}
                imageVariant={i}
                className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-110"
                iconClassName="w-1/3 h-1/3"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-linear-to-t from-ink/70 via-ink/10 to-transparent p-3.5 pt-10">
                <span className="font-display text-sm font-medium leading-tight text-cream">
                  {cat.name}
                </span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cream/15 text-cream transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-terracotta">
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
