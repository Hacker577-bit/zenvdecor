"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { MessageCircle, Mail, ArrowLeft } from "lucide-react";
import { useCartStore, useCartSubtotal } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import ProductImage from "@/components/ProductImage";
import type { CategorySlug } from "@/lib/types";
import {
  buildOrderMessage,
  buildWhatsAppLink,
  buildMailtoLink,
} from "@/lib/whatsapp";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartSubtotal();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const details = { name, phone, address, notes };
  const message = buildOrderMessage(items, subtotal, details);
  const canSubmit = items.length > 0 && name && phone && address;

  function handleWhatsApp(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink">
          Your cart is empty
        </h1>
        <p className="mt-2 text-sm text-ink/60">
          Add a few plants to your cart before checking out.
        </p>
        <Link
          href="/shop"
          className="mt-6 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream hover:bg-forest-dark"
        >
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/shop"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-ink/60 hover:text-forest"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
        Continue shopping
      </Link>

      <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
        Checkout
      </h1>
      <p className="mt-2 max-w-xl text-sm text-ink/60">
        We don&apos;t process online payments yet — fill in your details and
        we&apos;ll confirm your order and delivery over WhatsApp or email.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-5">
        <form onSubmit={handleWhatsApp} className="lg:col-span-3">
          <div className="space-y-5 rounded-2xl border border-sand-dark/60 bg-sand/30 p-6">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink/80">
                Full name
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full rounded-xl border border-sand-dark bg-cream px-4 py-3 text-sm focus:border-forest focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink/80">
                Phone number
              </label>
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 555 123 4567"
                className="w-full rounded-xl border border-sand-dark bg-cream px-4 py-3 text-sm focus:border-forest focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink/80">
                Delivery address
              </label>
              <textarea
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street, city, state, postal code"
                rows={3}
                className="w-full resize-none rounded-xl border border-sand-dark bg-cream px-4 py-3 text-sm focus:border-forest focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink/80">
                Order notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Preferred delivery time, gift note, etc."
                rows={2}
                className="w-full resize-none rounded-xl border border-sand-dark bg-cream px-4 py-3 text-sm focus:border-forest focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={!canSubmit}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-forest-dark disabled:cursor-not-allowed disabled:opacity-40"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
              Send Order via WhatsApp
            </button>
            <a
              href={canSubmit ? buildMailtoLink(message, "New Order — Zenv Decor") : undefined}
              aria-disabled={!canSubmit}
              className={`flex flex-1 items-center justify-center gap-2 rounded-full border border-forest px-6 py-3.5 text-sm font-semibold text-forest-dark transition-colors hover:bg-forest hover:text-cream ${
                !canSubmit ? "pointer-events-none opacity-40" : ""
              }`}
            >
              <Mail className="h-4 w-4" strokeWidth={1.5} />
              Send via Email
            </a>
          </div>
          {!canSubmit && (
            <p className="mt-3 text-xs text-ink/50">
              Please fill in your name, phone and address to continue.
            </p>
          )}
        </form>

        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-sand-dark/60 p-6">
            <h2 className="font-display text-lg font-semibold text-ink">
              Order Summary
            </h2>
            <div className="mt-5 divide-y divide-sand-dark/50">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-3 py-3.5">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                    <ProductImage
                      category={item.category as CategorySlug}
                      imageVariant={item.imageVariant}
                      className="h-full w-full"
                      iconClassName="w-6 h-6"
                    />
                  </div>
                  <div className="flex flex-1 items-center justify-between">
                    <div>
                      <p className="font-display text-sm font-medium text-ink">
                        {item.name}
                      </p>
                      <p className="text-xs text-ink/50">
                        Qty {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-forest-dark">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-2 border-t border-sand-dark/60 pt-5 text-sm">
              <div className="flex justify-between text-ink/60">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-ink/60">
                <span>Delivery</span>
                <span>{subtotal >= 150 ? "Free" : formatPrice(12)}</span>
              </div>
              <div className="flex justify-between border-t border-sand-dark/60 pt-2 font-display text-base font-semibold text-forest-dark">
                <span>Total</span>
                <span>
                  {formatPrice(subtotal + (subtotal >= 150 ? 0 : 12))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
