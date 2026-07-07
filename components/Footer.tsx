import Link from "next/link";
import { Leaf, Camera, Share2 } from "lucide-react";
import { categories } from "@/data/categories";

export default function Footer() {
  return (
    <footer className="border-t border-sand-dark/60 bg-forest-dark text-cream/90">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="col-span-2 md:col-span-1">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-lg font-semibold text-cream"
          >
            <Leaf className="h-5 w-5 text-terracotta" strokeWidth={1.5} />
            Zenv Decor
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/60">
            Lifelike artificial plants and botanical decor that never wilt,
            never wither, always welcome.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 transition-colors hover:bg-terracotta"
            >
              <Camera className="h-4 w-4" strokeWidth={1.5} />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 transition-colors hover:bg-terracotta"
            >
              <Share2 className="h-4 w-4" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold tracking-wide text-cream/90">
            Shop
          </h3>
          <ul className="mt-4 space-y-2.5">
            {categories.slice(0, 5).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/shop?category=${c.slug}`}
                  className="text-sm text-cream/60 transition-colors hover:text-cream"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold tracking-wide text-cream/90">
            Company
          </h3>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link
                href="/about"
                className="text-sm text-cream/60 transition-colors hover:text-cream"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-sm text-cream/60 transition-colors hover:text-cream"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                className="text-sm text-cream/60 transition-colors hover:text-cream"
              >
                Full Catalog
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold tracking-wide text-cream/90">
            Get in touch
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-cream/60">
            <li>hello@zenvdecor.com</li>
            <li>+1 (000) 000-0000</li>
            <li>Mon–Sat, 9am–6pm</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 px-4 py-5 text-center text-xs text-cream/50 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} Zenv Decor. All rights reserved.
      </div>
    </footer>
  );
}
