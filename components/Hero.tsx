"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-sand">
      {/* decorative background blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-forest/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-terracotta/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(36,31,24,0.06)_1px,transparent_0)] bg-[length:28px_28px] opacity-40" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-forest/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-forest-dark">
            <Sparkle className="h-3.5 w-3.5" strokeWidth={1.5} />
            New Season Collection
          </span>
          <h1 className="text-balance mt-5 font-display text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
            Greenery that
            <span className="relative block italic text-forest">
              never fades.
              <svg
                aria-hidden
                viewBox="0 0 300 20"
                className="absolute -bottom-2 left-0 h-4 w-full max-w-[280px] text-terracotta/70"
              >
                <path
                  d="M2 15 Q 80 2 150 10 T 298 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/65 sm:text-lg">
            Hand-finished artificial plants, trees and botanical decor —
            styled to look alive, built to stay flawless for years.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3.5 text-sm font-semibold text-cream shadow-glow transition-all hover:-translate-y-0.5 hover:bg-forest-dark"
            >
              Shop the Collection
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about"
              className="link-underline text-sm font-semibold text-ink/70 transition-colors hover:text-ink"
            >
              Our Story
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-8 border-t border-ink/10 pt-6">
            <div>
              <p className="font-display text-2xl font-semibold text-forest-dark">
                12k+
              </p>
              <p className="text-xs text-ink/50">Happy homes styled</p>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-forest-dark">
                4.8/5
              </p>
              <p className="text-xs text-ink/50">Average rating</p>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-forest-dark">
                Zero
              </p>
              <p className="text-xs text-ink/50">Watering required</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="relative mx-auto w-full max-w-md md:max-w-none"
        >
          <div className="relative aspect-square overflow-hidden rounded-[2rem] shadow-2xl shadow-forest-dark/25 ring-1 ring-cream/40">
            <Image
              src="/products/hero-bonsai.jpg"
              alt="Hand-holding a potted faux bonsai tree"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute -left-3 top-1/3 hidden rounded-2xl bg-cream px-4 py-3 shadow-xl sm:flex sm:flex-col sm:items-center">
            <p className="font-display text-lg font-semibold text-forest-dark">
              4.8★
            </p>
            <p className="text-[10px] text-ink/50">2,300+ reviews</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
