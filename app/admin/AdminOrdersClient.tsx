"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  LogOut,
  PackageSearch,
  RefreshCw,
  Truck,
  Smartphone,
} from "lucide-react";
import { formatPrice } from "@/lib/format";
import type { Order, OrderStatus, PaymentMethod } from "@/lib/db";

const STATUS_OPTIONS: OrderStatus[] = [
  "new",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

const STATUS_STYLES: Record<OrderStatus, string> = {
  new: "bg-forest/10 text-forest-dark",
  confirmed: "bg-gold/20 text-ink",
  shipped: "bg-terracotta/15 text-terracotta-dark",
  delivered: "bg-forest text-cream",
  cancelled: "bg-ink/10 text-ink/50",
};

const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  cod: "Cash on Delivery",
  jazzcash_easypaisa: "JazzCash / EasyPaisa",
};

const PAYMENT_ICONS: Record<PaymentMethod, typeof Truck> = {
  cod: Truck,
  jazzcash_easypaisa: Smartphone,
};

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

export default function AdminOrdersClient({
  initialOrders,
  initialError,
}: {
  initialOrders: Order[];
  initialError: string | null;
}) {
  const router = useRouter();
  const [orders, setOrders] = useState(initialOrders);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  async function handleStatusChange(id: string, status: OrderStatus) {
    const previous = orders;
    setUpdating(id);
    setOrders((cur) => cur.map((o) => (o.id === id ? { ...o, status } : o)));
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update");
    } catch {
      setOrders(previous);
    } finally {
      setUpdating(null);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink">
            Orders
          </h1>
          <p className="mt-1 text-sm text-ink/50">
            {orders.length} order{orders.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.refresh()}
            aria-label="Refresh"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink/60 hover:bg-sand cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-full border border-sand-dark px-4 py-2 text-sm font-medium text-ink/70 hover:bg-sand cursor-pointer"
          >
            <LogOut className="h-4 w-4" strokeWidth={1.5} />
            Log out
          </button>
        </div>
      </div>

      {initialError && (
        <div className="mb-6 rounded-xl border border-terracotta/30 bg-terracotta/5 p-4 text-sm text-terracotta-dark">
          Couldn&apos;t load orders: {initialError}
        </div>
      )}

      {orders.length === 0 && !initialError ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-sand-dark/60 bg-sand/30 py-20 text-center">
          <PackageSearch className="h-10 w-10 text-ink/20" strokeWidth={1} />
          <p className="text-sm text-ink/60">No orders yet.</p>
        </div>
      ) : (
        <div className="divide-y divide-sand-dark/50 rounded-2xl border border-sand-dark/60">
          {orders.map((order) => (
            <div key={order.id} className="p-5">
              <button
                onClick={() =>
                  setExpanded(expanded === order.id ? null : order.id)
                }
                className="flex w-full items-center justify-between gap-4 text-left cursor-pointer"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-display text-base font-semibold text-ink">
                      {order.customerName}
                    </p>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${STATUS_STYLES[order.status]}`}
                    >
                      {order.status}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-sand px-2.5 py-0.5 text-[11px] font-semibold text-ink/60">
                      {(() => {
                        const Icon = PAYMENT_ICONS[order.paymentMethod];
                        return <Icon className="h-3 w-3" strokeWidth={1.5} />;
                      })()}
                      {PAYMENT_LABELS[order.paymentMethod]}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-ink/50">
                    {formatDate(order.createdAt)} · {order.phone}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <span className="font-display text-lg font-semibold text-forest-dark">
                    {formatPrice(order.subtotal)}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-ink/40 transition-transform ${expanded === order.id ? "rotate-180" : ""}`}
                    strokeWidth={1.5}
                  />
                </div>
              </button>

              {expanded === order.id && (
                <div className="mt-4 space-y-4 border-t border-sand-dark/50 pt-4">
                  <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-ink/40">
                        Delivery Address
                      </p>
                      <p className="mt-1 text-ink/80">{order.address}</p>
                    </div>
                    {order.paymentMethod === "jazzcash_easypaisa" && (
                      <div>
                        <p className="text-xs uppercase tracking-wide text-ink/40">
                          Payment Reference
                        </p>
                        <p className="mt-1 text-ink/80">
                          {order.paymentReference || "—"}
                        </p>
                        <p className="mt-0.5 text-xs text-terracotta-dark">
                          Verify this transaction in your JazzCash/EasyPaisa
                          account before marking as confirmed.
                        </p>
                      </div>
                    )}
                    {order.notes && (
                      <div>
                        <p className="text-xs uppercase tracking-wide text-ink/40">
                          Notes
                        </p>
                        <p className="mt-1 text-ink/80">{order.notes}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="mb-2 text-xs uppercase tracking-wide text-ink/40">
                      Items
                    </p>
                    <ul className="space-y-1.5 text-sm text-ink/80">
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

                  <div className="flex items-center gap-3">
                    <label className="text-xs uppercase tracking-wide text-ink/40">
                      Status
                    </label>
                    <select
                      value={order.status}
                      disabled={updating === order.id}
                      onChange={(e) =>
                        handleStatusChange(
                          order.id,
                          e.target.value as OrderStatus
                        )
                      }
                      className="rounded-full border border-sand-dark bg-cream px-3 py-1.5 text-sm capitalize focus:border-forest focus:outline-none disabled:opacity-50"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
