"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Mail,
  ArrowLeft,
  Loader2,
  Truck,
  Smartphone,
  Copy,
  Check,
} from "lucide-react";
import { useCartStore, useCartSubtotal, useCartCount } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { FREE_DELIVERY_MIN_ITEMS, DELIVERY_FEE } from "@/lib/shipping";
import ProductImage from "@/components/ProductImage";
import type { CategorySlug } from "@/lib/types";
import type { PaymentMethod } from "@/lib/db";
import {
  buildOrderMessage,
  buildMailtoLink,
  PAYMENT_NUMBER,
} from "@/lib/order-message";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clear);
  const subtotal = useCartSubtotal();
  const itemCount = useCartCount();
  const qualifiesForFreeDelivery = itemCount >= FREE_DELIVERY_MIN_ITEMS;
  const deliveryFee = qualifiesForFreeDelivery ? 0 : DELIVERY_FEE;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [paymentReference, setPaymentReference] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [placed, setPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState<number | null>(null);

  const needsReference =
    paymentMethod === "jazzcash_easypaisa" && !paymentReference.trim();
  const canSubmit =
    items.length > 0 && !!name && !!phone && !!address && !needsReference;

  async function handleCopyNumber() {
    try {
      await navigator.clipboard.writeText(PAYMENT_NUMBER);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — user can select/copy manually
    }
  }

  async function submitOrder(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    setSaveError(null);

    let placedOrderNumber: number | undefined;

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          phone,
          address,
          notes: notes || undefined,
          items: items.map((i) => ({
            name: i.name,
            price: i.price,
            quantity: i.quantity,
          })),
          subtotal,
          paymentMethod,
          paymentReference: paymentReference || undefined,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        placedOrderNumber = data.orderNumber;
        setOrderNumber(data.orderNumber ?? null);
      } else {
        setSaveError(
          "We couldn't save your order in our system, but you can still send it below — we'll follow up manually."
        );
      }
    } catch {
      setSaveError(
        "We couldn't save your order in our system, but you can still send it below — we'll follow up manually."
      );
    }

    const message = buildOrderMessage(items, subtotal, {
      name,
      phone,
      address,
      notes,
      paymentMethod,
      paymentReference: paymentReference || undefined,
      orderNumber: placedOrderNumber,
    });

    setPlaced(true);
    clearCart();
    window.location.href = buildMailtoLink(message, "New Order — Zenv Decor");
    setSubmitting(false);
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink">
          {placed ? "Order placed!" : "Your cart is empty"}
        </h1>
        <p className="mt-2 text-sm text-ink/60">
          {placed
            ? "Thanks for your order — we'll confirm delivery details shortly."
            : "Add a few plants to your cart before checking out."}
        </p>
        {placed && orderNumber && (
          <div className="mt-5 rounded-2xl border border-forest/30 bg-forest/5 px-6 py-4">
            <p className="text-xs uppercase tracking-wide text-ink/50">
              Your order number
            </p>
            <p className="mt-1 font-display text-3xl font-semibold text-forest-dark">
              #{orderNumber}
            </p>
            <p className="mt-1.5 text-xs text-ink/50">
              Save this — use it with your phone number on the Track Order
              page to check your status.
            </p>
          </div>
        )}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/shop"
            className="rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream hover:bg-forest-dark"
          >
            {placed ? "Keep shopping" : "Browse the shop"}
          </Link>
          {placed && (
            <Link
              href="/track"
              className="rounded-full border border-forest px-6 py-3 text-sm font-semibold text-forest-dark hover:bg-forest hover:text-cream"
            >
              Track your order
            </Link>
          )}
        </div>
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
        Fill in your details, choose how you&apos;d like to pay, and we&apos;ll
        confirm your order and delivery shortly.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-5">
        <form onSubmit={submitOrder} className="lg:col-span-3">
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

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-ink/80">
              Payment method
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-colors cursor-pointer ${
                  paymentMethod === "cod"
                    ? "border-forest bg-forest/5"
                    : "border-sand-dark hover:bg-sand/40"
                }`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest">
                  <Truck className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">
                    Cash on Delivery
                  </span>
                  <span className="block text-xs text-ink/50">
                    Pay when your order arrives
                  </span>
                </span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("jazzcash_easypaisa")}
                className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-colors cursor-pointer ${
                  paymentMethod === "jazzcash_easypaisa"
                    ? "border-forest bg-forest/5"
                    : "border-sand-dark hover:bg-sand/40"
                }`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest">
                  <Smartphone className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">
                    JazzCash / EasyPaisa
                  </span>
                  <span className="block text-xs text-ink/50">
                    Pay online before delivery
                  </span>
                </span>
              </button>
            </div>

            {paymentMethod === "jazzcash_easypaisa" && (
              <div className="mt-4 space-y-4 rounded-xl border border-forest/30 bg-forest/5 p-5">
                <p className="text-sm text-ink/70">
                  Send{" "}
                  <span className="font-display font-semibold text-forest-dark">
                    {formatPrice(subtotal + deliveryFee)}
                  </span>{" "}
                  via JazzCash or EasyPaisa to:
                </p>
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-cream px-4 py-2.5 font-display text-lg font-semibold tracking-wide text-forest-dark">
                    {PAYMENT_NUMBER}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyNumber}
                    aria-label="Copy payment number"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-sand-dark bg-cream text-ink/60 hover:text-forest cursor-pointer"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-forest" strokeWidth={1.5} />
                    ) : (
                      <Copy className="h-4 w-4" strokeWidth={1.5} />
                    )}
                  </button>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink/80">
                    Transaction ID / reference number
                  </label>
                  <input
                    required
                    value={paymentReference}
                    onChange={(e) => setPaymentReference(e.target.value)}
                    placeholder="e.g. TXN123456789"
                    className="w-full rounded-xl border border-sand-dark bg-cream px-4 py-3 text-sm focus:border-forest focus:outline-none"
                  />
                  <p className="mt-1.5 text-xs text-ink/50">
                    We&apos;ll verify your payment and confirm your order
                    shortly after you submit.
                  </p>
                </div>
              </div>
            )}
          </div>

          {saveError && (
            <p className="mt-4 text-xs text-terracotta-dark">{saveError}</p>
          )}

          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-forest-dark disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
            ) : (
              <Mail className="h-4 w-4" strokeWidth={1.5} />
            )}
            Place Order
          </button>
          {!canSubmit && (
            <p className="mt-3 text-xs text-ink/50">
              {needsReference
                ? "Please enter your JazzCash/EasyPaisa transaction reference to continue."
                : "Please fill in your name, phone and address to continue."}
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
                      image={item.image}
                      alt={item.name}
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
                <span>
                  {qualifiesForFreeDelivery ? "Free" : formatPrice(DELIVERY_FEE)}
                </span>
              </div>
              {!qualifiesForFreeDelivery && (
                <p className="text-xs text-terracotta-dark">
                  Add {FREE_DELIVERY_MIN_ITEMS - itemCount} more{" "}
                  {FREE_DELIVERY_MIN_ITEMS - itemCount === 1 ? "item" : "items"}{" "}
                  for free delivery
                </p>
              )}
              <div className="flex justify-between border-t border-sand-dark/60 pt-2 font-display text-base font-semibold text-forest-dark">
                <span>Total</span>
                <span>{formatPrice(subtotal + deliveryFee)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
