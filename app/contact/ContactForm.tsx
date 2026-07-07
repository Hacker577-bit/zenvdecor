"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { buildMailtoLink } from "@/lib/whatsapp";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const body = `From: ${name} (${email})\n\n${message}`;
    window.location.href = buildMailtoLink(body, "Website Inquiry — Zenv Decor");
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-sand-dark/60 bg-sand/30 px-6 py-16 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest text-cream">
          <Check className="h-5 w-5" />
        </span>
        <p className="mt-4 font-display text-lg font-semibold text-ink">
          Thanks for reaching out!
        </p>
        <p className="mt-1 text-sm text-ink/60">
          We&apos;ll get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-sand-dark/60 bg-sand/30 p-6"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink/80">
            Name
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-sand-dark bg-cream px-4 py-3 text-sm focus:border-forest focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink/80">
            Email
          </label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-sand-dark bg-cream px-4 py-3 text-sm focus:border-forest focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink/80">
          Message
        </label>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-none rounded-xl border border-sand-dark bg-cream px-4 py-3 text-sm focus:border-forest focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-forest-dark cursor-pointer sm:w-auto"
      >
        Send Message
      </button>
    </form>
  );
}
