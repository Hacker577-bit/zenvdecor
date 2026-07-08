import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  getExpectedSessionToken,
  verifyPassword,
} from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const password = (body as Record<string, unknown>)?.password;
  if (typeof password !== "string" || !(await verifyPassword(password))) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const token = await getExpectedSessionToken();
  if (!token) {
    return NextResponse.json(
      { error: "Admin login is not configured (missing ADMIN_PASSWORD)" },
      { status: 500 }
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
