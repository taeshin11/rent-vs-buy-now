import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  verification: {
    google: "WddgcbVJsL2BGHNAje5m6DK56IcR0Mw5UOqozI2Xtrc",
  },
  title: "RentVsBuyNow — Rent vs Buy Breakeven Analysis by City",
  description: "Free rent vs buy calculator and breakeven analysis for 50+ US cities. Find out when buying beats renting with real 2025 data.",
  metadataBase: new URL("https://rent-vs-buy-now.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
