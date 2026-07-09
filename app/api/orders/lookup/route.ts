import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { findOrdersForCustomer } from "@/lib/db";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const phone = b?.phone;
  if (typeof phone !== "string" || phone.replace(/\D/g, "").length < 6) {
    return NextResponse.json(
      { error: "Enter the phone number you used at checkout" },
      { status: 400 }
    );
  }

  let orderNumber: number | undefined;
  if (b?.orderNumber !== undefined && b.orderNumber !== "") {
    const parsed = Number(b.orderNumber);
    if (!Number.isInteger(parsed) || parsed <= 0) {
      return NextResponse.json(
        { error: "Order number must be a positive number" },
        { status: 400 }
      );
    }
    orderNumber = parsed;
  }

  try {
    const orders = await findOrdersForCustomer(phone, orderNumber);
    return NextResponse.json({ orders });
  } catch (err) {
    console.error("Failed to look up orders:", err);
    return NextResponse.json(
      { error: "Failed to look up orders" },
      { status: 500 }
    );
  }
}
