"use client";

import { useState, type FormEvent } from "react";
import { Mail, Check } from "lucide-react";

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="bg-forest-dark">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 text-cream">
          <Mail className="h-5 w-5" strokeWidth={1.5} />
        </span>
        <h2 className="mt-5 font-display text-3xl font-semibold text-cream">
          Join the Greenhouse List
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cream/60">
          Get 10% off your first order, early access to new arrivals, and
          styling inspiration in your inbox.
        </p>

        {submitted ? (
          <div className="mx-auto mt-7 flex max-w-md items-center justify-center gap-2 rounded-full bg-cream/10 px-6 py-3.5 text-sm font-medium text-cream">
            <Check className="h-4 w-4 text-terracotta" />
            You&apos;re on the list — welcome!
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="you@email.com"
              className="w-full rounded-full border border-cream/20 bg-cream/5 px-5 py-3.5 text-sm text-cream placeholder:text-cream/40 focus:border-terracotta focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-terracotta px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-terracotta-dark cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
