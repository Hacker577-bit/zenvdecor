"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import {
  useCartStore,
  useCartSubtotal,
  type CartItem,
} from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import ProductImage from "./ProductImage";
import type { CategorySlug } from "@/lib/types";

function CartRow({ item }: { item: CartItem }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="flex gap-3 py-4">
      <Link
        href={`/product/${item.slug}`}
        className="h-20 w-20 shrink-0 overflow-hidden rounded-xl"
      >
        <ProductImage
          category={item.category as CategorySlug}
          imageVariant={item.imageVariant}
          image={item.image}
          alt={item.name}
          className="h-full w-full"
          iconClassName="w-8 h-8"
        />
      </Link>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/product/${item.slug}`}
            className="font-display text-sm font-medium leading-snug text-ink hover:text-forest"
          >
            {item.name}
          </Link>
          <button
            onClick={() => removeItem(item.productId)}
            aria-label="Remove item"
            className="text-ink/40 transition-colors hover:text-terracotta cursor-pointer"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center rounded-full border border-sand-dark">
            <button
              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
              aria-label="Decrease quantity"
              className="flex h-7 w-7 items-center justify-center text-ink/70 hover:text-forest cursor-pointer"
            >
              <Minus className="h-3 w-3" strokeWidth={1.5} />
            </button>
            <span className="w-6 text-center text-xs font-medium">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
              aria-label="Increase quantity"
              className="flex h-7 w-7 items-center justify-center text-ink/70 hover:text-forest cursor-pointer"
            >
              <Plus className="h-3 w-3" strokeWidth={1.5} />
            </button>
          </div>
          <span className="text-sm font-semibold text-forest-dark">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const subtotal = useCartSubtotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-xs"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-sand-dark/60 px-5 py-4">
              <h2 className="font-display text-lg font-semibold text-forest-dark">
                Your Cart ({items.reduce((n, i) => n + i.quantity, 0)})
              </h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink/70 hover:bg-sand cursor-pointer"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <ShoppingBag
                  className="h-10 w-10 text-ink/20"
                  strokeWidth={1}
                />
                <p className="text-sm text-ink/60">Your cart is empty.</p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="mt-2 rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-forest-dark"
                >
                  Browse the shop
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto divide-y divide-sand-dark/50 px-5">
                  {items.map((item) => (
                    <CartRow key={item.productId} item={item} />
                  ))}
                </div>
                <div className="border-t border-sand-dark/60 px-5 py-5">
                  <div className="mb-4 flex items-center justify-between text-sm">
                    <span className="text-ink/60">Subtotal</span>
                    <span className="font-display text-lg font-semibold text-forest-dark">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="flex w-full items-center justify-center rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-forest-dark"
                  >
                    Checkout via WhatsApp
                  </Link>
                  <p className="mt-3 text-center text-xs text-ink/50">
                    Free delivery on orders over {formatPrice(150)}
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
