import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateOrderStatus, type OrderStatus } from "@/lib/db";
import { ADMIN_SESSION_COOKIE, verifySessionCookie } from "@/lib/admin-auth";

const VALID_STATUSES: OrderStatus[] = [
  "new",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const cookie = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!(await verifySessionCookie(cookie))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const status = (body as Record<string, unknown>)?.status;
  if (typeof status !== "string" || !VALID_STATUSES.includes(status as OrderStatus)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  try {
    await updateOrderStatus(id, status as OrderStatus);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to update order:", err);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}
