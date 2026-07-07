"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Amara O.",
    role: "Interior Stylist",
    quote:
      "The Monstera tree is indistinguishable from the real thing in photos. Clients ask where I sourced it every time.",
  },
  {
    name: "Daniel K.",
    role: "Studio Owner",
    quote:
      "Zero maintenance, always photo-ready. My studio finally has the greenery I wanted without the upkeep.",
  },
  {
    name: "Priya S.",
    role: "Homeowner",
    quote:
      "The bonsai collection is stunning — genuinely thought it was hand-shaped by a bonsai master.",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
          Loved by many
        </span>
        <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
          What Our Customers Say
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative flex flex-col overflow-hidden rounded-2xl border border-sand-dark/50 bg-cream p-7 shadow-sm transition-shadow duration-300 hover:shadow-lg"
          >
            <Quote
              className="pointer-events-none absolute -right-3 -top-3 h-24 w-24 text-forest/5"
              strokeWidth={1}
              fill="currentColor"
            />
            <div className="relative flex gap-0.5">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  className="h-3.5 w-3.5 fill-terracotta text-terracotta"
                />
              ))}
            </div>
            <p className="relative mt-4 flex-1 text-sm leading-relaxed text-ink/70">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="relative mt-5 flex items-center gap-3 border-t border-sand-dark/60 pt-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-forest to-forest-dark font-display text-sm font-semibold text-cream">
                {t.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-ink">
                  {t.name}
                </p>
                <p className="text-xs text-ink/50">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
