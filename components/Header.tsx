"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingBag, Leaf, Truck } from "lucide-react";
import { useCartCount, useCartStore } from "@/lib/cart-store";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/track", label: "Track Order" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const count = useCartCount();
  const openCart = useCartStore((s) => s.openCart);

  return (
    <header className="sticky top-0 z-40">
      <div className="flex items-center justify-center gap-2 bg-forest-dark px-4 py-2 text-center text-[11px] font-medium tracking-wide text-cream/85">
        <Truck className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
        Free delivery on orders over $150 · 30-day hassle-free returns
      </div>

      <div className="border-b border-sand-dark/60 bg-cream/90 backdrop-blur supports-backdrop-blur:bg-cream/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight text-forest-dark"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest/10">
              <Leaf className="h-5 w-5 text-terracotta" strokeWidth={1.5} />
            </span>
            Zenv Decor
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link-underline text-sm font-medium text-ink/80 transition-colors hover:text-forest"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={openCart}
              aria-label="Open cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink/80 transition-colors hover:bg-sand hover:text-forest cursor-pointer"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-terracotta px-1 text-[10px] font-semibold text-cream">
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink/80 transition-colors hover:bg-sand hover:text-forest md:hidden cursor-pointer"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" strokeWidth={1.5} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="flex flex-col gap-1 border-t border-sand-dark/60 bg-cream px-4 py-3 md:hidden">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink/80 transition-colors hover:bg-sand hover:text-forest"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
