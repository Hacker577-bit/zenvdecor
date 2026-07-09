import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { listOrdersByPhone } from "@/lib/db";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const phone = (body as Record<string, unknown>)?.phone;
  if (typeof phone !== "string" || phone.replace(/\D/g, "").length < 6) {
    return NextResponse.json(
      { error: "Enter the phone number you used at checkout" },
      { status: 400 }
    );
  }

  try {
    const orders = await listOrdersByPhone(phone);
    return NextResponse.json({ orders });
  } catch (err) {
    console.error("Failed to look up orders:", err);
    return NextResponse.json(
      { error: "Failed to look up orders" },
      { status: 500 }
    );
  }
}
