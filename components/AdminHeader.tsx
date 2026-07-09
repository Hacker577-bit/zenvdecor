import Link from "next/link";
import { Leaf } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-sand-dark/60 bg-cream/90 backdrop-blur supports-backdrop-blur:bg-cream/70">
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

        <Link
          href="/about"
          className="link-underline text-sm font-medium text-ink/80 transition-colors hover:text-forest"
        >
          About
        </Link>
      </div>
    </header>
  );
}
