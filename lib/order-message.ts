import type { CartItem } from "./cart-store";
import { formatPrice } from "./format";
import type { PaymentMethod } from "./db";

export const STORE_EMAIL =
  process.env.NEXT_PUBLIC_STORE_EMAIL || "hello@zenvdecor.com";
export const PAYMENT_NUMBER =
  process.env.NEXT_PUBLIC_PAYMENT_NUMBER || "0000000000";

export interface CheckoutDetails {
  name: string;
  phone: string;
  address: string;
  notes?: string;
  paymentMethod: PaymentMethod;
  paymentReference?: string;
  orderNumber?: number;
}

const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  cod: "Cash on Delivery",
  jazzcash_easypaisa: "JazzCash / EasyPaisa",
};

export function buildOrderMessage(
  items: CartItem[],
  subtotal: number,
  details: CheckoutDetails
): string {
  const lines = [
    details.orderNumber
      ? `Hello Zenv Decor! I'd like to place order #${details.orderNumber}:`
      : "Hello Zenv Decor! I'd like to place an order:",
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
    `Payment Method: ${PAYMENT_LABELS[details.paymentMethod]}`,
  ];
  if (details.paymentMethod === "jazzcash_easypaisa" && details.paymentReference) {
    lines.push(`Payment Reference: ${details.paymentReference}`);
  }
  if (details.notes) lines.push(`Notes: ${details.notes}`);
  return lines.join("\n");
}

export function buildMailtoLink(message: string, subject: string): string {
  return `mailto:${STORE_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(message)}`;
}
