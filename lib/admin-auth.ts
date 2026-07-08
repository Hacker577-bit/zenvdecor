export const ADMIN_SESSION_COOKIE = "admin_session";

async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const digest = await globalThis.crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function getExpectedSessionToken(): Promise<string | null> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return sha256Hex(`zenv-admin:${password}`);
}

export async function verifySessionCookie(
  cookieValue: string | undefined
): Promise<boolean> {
  if (!cookieValue) return false;
  const expected = await getExpectedSessionToken();
  if (!expected) return false;
  return cookieValue === expected;
}

export async function verifyPassword(password: string): Promise<boolean> {
  const configured = process.env.ADMIN_PASSWORD;
  if (!configured) return false;
  return password === configured;
}
