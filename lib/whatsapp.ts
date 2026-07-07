import type { CartItem } from "./cart-store";
import { formatPrice } from "./format";

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "10000000000";
export const STORE_EMAIL =
  process.env.NEXT_PUBLIC_STORE_EMAIL || "hello@zenvdecor.com";

export interface CheckoutDetails {
  name: string;
  phone: string;
  address: string;
  notes?: string;
}

export function buildOrderMessage(
  items: CartItem[],
  subtotal: number,
  details: CheckoutDetails
): string {
  const lines = [
    "Hello Zenv Decor! I'd like to place an order:",
    "",
    ...items.map(
      (i) => `• ${i.name} x${i.quantity} — ${formatPrice(i.price * i.quantity)}`
    ),
    "",
    `Subtotal: ${formatPrice(subtotal)}`,
    "",
    `Name: ${details.name}`,
    `Phone: ${details.phone}`,
    `Delivery Address: ${details.address}`,
  ];
  if (details.notes) lines.push(`Notes: ${details.notes}`);
  return lines.join("\n");
}

export function buildWhatsAppLink(message: string): string {
  const digits = WHATSAPP_NUMBER.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoLink(message: string, subject: string): string {
  return `mailto:${STORE_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(message)}`;
}
