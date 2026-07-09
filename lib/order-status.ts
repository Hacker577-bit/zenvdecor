import type { OrderStatus } from "./db";

export const STATUS_OPTIONS: OrderStatus[] = [
  "new",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

export const STATUS_LABELS: Record<OrderStatus, string> = {
  new: "Order Received",
  confirmed: "Confirmed",
  shipped: "On Its Way",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const STATUS_DESCRIPTIONS: Record<OrderStatus, string> = {
  new: "We've received your order and will confirm it shortly.",
  confirmed: "Your order is confirmed and being prepared.",
  shipped: "Your order has shipped and is on its way to you.",
  delivered: "Your order has been delivered. Enjoy!",
  cancelled: "This order was cancelled.",
};

export const STATUS_STYLES: Record<OrderStatus, string> = {
  new: "bg-forest/10 text-forest-dark",
  confirmed: "bg-gold/20 text-ink",
  shipped: "bg-terracotta/15 text-terracotta-dark",
  delivered: "bg-forest text-cream",
  cancelled: "bg-ink/10 text-ink/50",
};
