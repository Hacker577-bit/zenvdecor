import Link from "next/link";
import { ArrowRight, Truck, Sparkles, Undo2 } from "lucide-react";
import Hero from "@/components/Hero";
import CategoryStrip from "@/components/CategoryStrip";
import ProductGrid from "@/components/ProductGrid";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import ProductImage from "@/components/ProductImage";
import { products } from "@/data/products";

const PERKS = [
  {
    icon: Truck,
    title: "Free Delivery",
    desc: "On all orders over $150",
  },
  {
    icon: Sparkles,
    title: "Lifelike Finish",
    desc: "Real-touch, UV-stable materials",
  },
  {
    icon: Undo2,
    title: "30-Day Returns",
    desc: "Not in love? Send it back",
  },
];

export default function HomePage() {
  const bestsellers = products.filter((p) => p.badge === "Bestseller").slice(0, 4);
  const newArrivals = products.filter((p) => p.badge === "New").slice(0, 4);

  return (
    <>
      <Hero />

      <section className="border-b border-sand-dark/60 bg-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
          {PERKS.map((perk) => (
            <div key={perk.title} className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest">
                <perk.icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-ink">
                  {perk.title}
                </p>
                <p className="text-xs text-ink/50">{perk.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CategoryStrip />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
              Fan Favorites
            </span>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
              Bestsellers
            </h2>
          </div>
          <Link
            href="/shop"
            className="group hidden items-center gap-1.5 text-sm font-semibold text-forest sm:flex"
          >
            View all
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <ProductGrid products={bestsellers} />
      </section>

      <section className="bg-sand">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="order-2 md:order-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
              Our Craft
            </span>
            <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Botanical detail, without the upkeep.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/65">
              Every leaf is molded from a real specimen and finished by hand
              — variegation, texture and all. We obsess over the details so
              your space never has to compromise between beauty and ease.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest-dark underline decoration-terracotta decoration-2 underline-offset-4"
            >
              Read our story
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="order-1 grid grid-cols-2 gap-4 md:order-2">
            <div className="aspect-3/4 overflow-hidden rounded-2xl shadow-lg shadow-forest-dark/10 ring-1 ring-ink/5">
              <ProductImage category="hanging" imageVariant={11} className="h-full w-full" iconClassName="w-1/3 h-1/3" />
            </div>
            <div className="mt-8 aspect-3/4 overflow-hidden rounded-2xl shadow-lg shadow-forest-dark/10 ring-1 ring-ink/5">
              <ProductImage category="flowering" imageVariant={9} className="h-full w-full" iconClassName="w-1/3 h-1/3" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
              Just In
            </span>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/shop"
            className="group hidden items-center gap-1.5 text-sm font-semibold text-forest sm:flex"
          >
            View all
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <ProductGrid products={newArrivals} />
      </section>

      <Testimonials />
      <Newsletter />
    </>
  );
}
