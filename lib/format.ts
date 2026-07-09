export function formatPrice(value: number): string {
  return `Rs. ${Math.round(value).toLocaleString("en-PK")}`;
}
