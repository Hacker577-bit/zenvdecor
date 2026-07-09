import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Zenv Decor for product questions, bulk orders or styling advice.",
};

const INFO = [
  { icon: Mail, label: "Email", value: "hello@zenvdecor.com" },
  { icon: Phone, label: "Phone", value: "+1 (000) 000-0000" },
  { icon: MapPin, label: "Studio", value: "123 Greenhouse Ave, Portland, OR" },
  { icon: Clock, label: "Hours", value: "Mon–Sat, 9am–6pm" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
          Say Hello
        </span>
        <h1 className="mt-2 font-display text-4xl font-semibold text-ink">
          Get in Touch
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-ink/60">
          Questions about a product, bulk or trade orders, or just want
          styling advice? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="space-y-5">
            {INFO.map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest">
                  <item.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-ink/40">
                    {item.label}
                  </p>
                  <p className="text-sm font-medium text-ink">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
