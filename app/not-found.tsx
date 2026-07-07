import Link from "next/link";
import { Leaf } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-28 text-center">
      <Leaf className="h-10 w-10 text-terracotta" strokeWidth={1.5} />
      <h1 className="mt-5 font-display text-4xl font-semibold text-ink">
        404
      </h1>
      <p className="mt-2 text-sm text-ink/60">
        This page seems to have wilted away. Let&apos;s get you back to
        greener pastures.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream hover:bg-forest-dark"
      >
        Back to Home
      </Link>
    </div>
  );
}
