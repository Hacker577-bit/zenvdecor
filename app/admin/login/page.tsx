"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock, Leaf } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Incorrect password");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col items-center justify-center px-4">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest/10">
        <Leaf className="h-6 w-6 text-terracotta" strokeWidth={1.5} />
      </span>
      <h1 className="mt-4 font-display text-2xl font-semibold text-ink">
        Admin Login
      </h1>
      <p className="mt-1 text-sm text-ink/50">
        Enter the store password to view orders.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 w-full space-y-4">
        <div className="relative">
          <Lock
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
            strokeWidth={1.5}
          />
          <input
            type="password"
            required
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-full border border-sand-dark bg-cream py-3 pl-11 pr-4 text-sm focus:border-forest focus:outline-none"
          />
        </div>
        {error && <p className="text-center text-sm text-terracotta-dark">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-forest-dark disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
