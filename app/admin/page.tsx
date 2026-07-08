import type { Metadata } from "next";
import { listOrders } from "@/lib/db";
import AdminOrdersClient from "./AdminOrdersClient";

export const metadata: Metadata = {
  title: "Orders",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  let orders: Awaited<ReturnType<typeof listOrders>> = [];
  let error: string | null = null;

  try {
    orders = await listOrders();
  } catch (err) {
    error =
      err instanceof Error
        ? err.message
        : "Failed to load orders. Is the database connected?";
  }

  return <AdminOrdersClient initialOrders={orders} initialError={error} />;
}
