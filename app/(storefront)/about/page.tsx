import type { Metadata } from "next";
import Image from "next/image";
import { Leaf, Hammer, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Zenv Decor crafts lifelike artificial plants and botanical decor, obsessing over texture, color and form so your space never has to compromise.",
};

const VALUES = [
  {
    icon: Leaf,
    title: "Botanically Accurate",
    desc: "Every mold is taken from real specimens, down to vein texture and natural color variation.",
  },
  {
    icon: Hammer,
    title: "Hand-Finished",
    desc: "Each piece is shaped, trimmed and dusted by hand before it ever reaches your door.",
  },
  {
    icon: Heart,
    title: "Made to Last",
    desc: "UV-stable, fade-resistant materials mean your greenery looks this good for years.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-sand">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
              Our Story
            </span>
            <h1 className="mt-2 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Greenery, reimagined.
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink/65 sm:text-base">
              Zenv Decor started with a simple frustration: beautiful indoor
              plants that couldn&apos;t survive our low-light apartment. So
              we set out to design faux botanicals so convincing, so
              carefully detailed, that no one would ever guess. Today we
              craft trees, bonsai, blooms and greenery for homes, studios and
              hospitality spaces that refuse to compromise on style.
            </p>
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl">
            <Image
              src="/products/hero-bonsai.jpg"
              alt="Hand-holding a potted faux bonsai tree"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
            What We Believe
          </span>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
            Our Values
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-sand-dark/50 bg-sand/40 p-7"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest/10 text-forest">
                <v.icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                {v.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-forest-dark">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <p className="font-display text-2xl italic leading-relaxed text-cream sm:text-3xl">
            &ldquo;We don&apos;t just make plants — we make the moment you
            walk in and feel at home.&rdquo;
          </p>
          <p className="mt-4 text-sm text-cream/60">
            — The Zenv Decor Founding Team
          </p>
        </div>
      </section>
    </div>
  );
}
