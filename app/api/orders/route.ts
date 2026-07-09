import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  insertOrder,
  listOrders,
  type OrderItem,
  type PaymentMethod,
} from "@/lib/db";
import { ADMIN_SESSION_COOKIE, verifySessionCookie } from "@/lib/admin-auth";

interface OrderPayload {
  customerName: string;
  phone: string;
  address: string;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  paymentMethod: PaymentMethod;
  paymentReference?: string;
}

const VALID_PAYMENT_METHODS: PaymentMethod[] = ["cod", "jazzcash_easypaisa"];

function isValidPayload(body: unknown): body is OrderPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  const validBase =
    typeof b.customerName === "string" &&
    b.customerName.trim().length > 0 &&
    typeof b.phone === "string" &&
    b.phone.trim().length > 0 &&
    typeof b.address === "string" &&
    b.address.trim().length > 0 &&
    Array.isArray(b.items) &&
    b.items.length > 0 &&
    typeof b.subtotal === "number" &&
    typeof b.paymentMethod === "string" &&
    VALID_PAYMENT_METHODS.includes(b.paymentMethod as PaymentMethod);

  if (!validBase) return false;

  if (b.paymentMethod === "jazzcash_easypaisa") {
    return (
      typeof b.paymentReference === "string" &&
      b.paymentReference.trim().length > 0
    );
  }

  return true;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json({ error: "Invalid order payload" }, { status: 400 });
  }

  try {
    const { id, orderNumber } = await insertOrder(body);
    return NextResponse.json({ id, orderNumber }, { status: 201 });
  } catch (err) {
    console.error("Failed to save order:", err);
    return NextResponse.json(
      { error: "Failed to save order" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!(await verifySessionCookie(cookie))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const orders = await listOrders();
    return NextResponse.json({ orders });
  } catch (err) {
    console.error("Failed to list orders:", err);
    return NextResponse.json(
      { error: "Failed to list orders" },
      { status: 500 }
    );
  }
}
