"use client";

import { useState, type FormEvent } from "react";
import { Loader2, PackageSearch, Search } from "lucide-react";
import { formatPrice } from "@/lib/format";
import type { Order } from "@/lib/db";
import {
  STATUS_LABELS,
  STATUS_DESCRIPTIONS,
  STATUS_STYLES,
} from "@/lib/order-status";

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export default function TrackOrderPage() {
  const [phone, setPhone] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOrders(null);

    try {
      const res = await fetch("/api/orders/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          orderNumber: orderNumber.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setOrders(data.orders);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
          Order Status
        </span>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Track My Orders
        </h1>
        <p className="mt-3 text-sm text-ink/60">
          Enter the phone number you used at checkout — add your order
          number too if you have it, to jump straight to that order.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Your phone number"
            className="rounded-full border border-sand-dark bg-cream px-5 py-3 text-sm focus:border-forest focus:outline-none"
          />
          <input
            type="text"
            inputMode="numeric"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="Order number (optional), e.g. 1042"
            className="rounded-full border border-sand-dark bg-cream px-5 py-3 text-sm focus:border-forest focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-forest-dark disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
          ) : (
            <Search className="h-4 w-4" strokeWidth={1.5} />
          )}
          Track
        </button>
      </form>
      {error && (
        <p className="mt-3 text-center text-sm text-terracotta-dark">
          {error}
        </p>
      )}

      {orders && (
        <div className="mt-10">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-sand-dark/60 bg-sand/30 py-16 text-center">
              <PackageSearch
                className="h-10 w-10 text-ink/20"
                strokeWidth={1}
              />
              <p className="text-sm text-ink/60">
                No orders found for that phone number.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-sand-dark/60 p-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-display text-sm font-semibold text-ink">
                        Order #{order.orderNumber}
                      </p>
                      <p className="text-xs text-ink/50">
                        {formatDate(order.createdAt)}
                      </p>
                      <span
                        className={`mt-1.5 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[order.status]}`}
                      >
                        {STATUS_LABELS[order.status]}
                      </span>
                    </div>
                    <span className="font-display text-lg font-semibold text-forest-dark">
                      {formatPrice(order.subtotal)}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-ink/60">
                    {STATUS_DESCRIPTIONS[order.status]}
                  </p>
                  <ul className="mt-4 space-y-1.5 border-t border-sand-dark/50 pt-4 text-sm text-ink/80">
                    {order.items.map((item, i) => (
                      <li key={i} className="flex justify-between">
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
