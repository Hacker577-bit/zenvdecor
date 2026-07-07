import { Suspense } from "react";
import type { Metadata } from "next";
import ShopClient from "./ShopClient";

export const metadata: Metadata = {
  title: "Shop All Plants",
  description:
    "Browse our full collection of artificial trees, bonsai, flowering arrangements, hanging greenery, succulents and planters.",
};

export default function ShopPage() {
  return (
    <Suspense>
      <ShopClient />
    </Suspense>
  );
}
