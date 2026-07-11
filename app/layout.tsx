import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zenvdecor.example.com"),
  title: {
    default: "Zenv Decor — Artificial Plants & Botanical Decor",
    template: "%s · Zenv Decor",
  },
  description:
    "Lifelike artificial plants and botanical decor for homes and studios that never wilt. Shop bonsai, flowering arrangements and succulents.",
  keywords: [
    "artificial plants",
    "faux plants",
    "bonsai",
    "home decor",
    "botanical decor",
  ],
  openGraph: {
    title: "Zenv Decor — Artificial Plants & Botanical Decor",
    description:
      "Lifelike artificial plants, trees & botanical decor for homes and studios that never wilt.",
    type: "website",
    siteName: "Zenv Decor",
  },
};

export const viewport: Viewport = {
  themeColor: "#2f4a3c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        {children}
      </body>
    </html>
  );
}
