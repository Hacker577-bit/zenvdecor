import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, verifySessionCookie } from "@/lib/admin-auth";

export async function proxy(req: NextRequest) {
  const cookie = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const valid = await verifySessionCookie(cookie);

  if (!valid) {
    const loginUrl = new URL("/admin/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/((?!login).*)"],
};
