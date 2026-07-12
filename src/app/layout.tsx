import type { Metadata } from "next";
import "./fonts.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "FanFest 2026 — Content Creators, Join Us",
  description:
    "FanFest 2026 is calling on creators to be part of the biggest fan-powered event of the year. Apply now — limited spots.",
  openGraph: {
    title: "FanFest 2026 — Content Creators, Join Us",
    description:
      "Three days of panels, activations, live streams, brand collaborations, and unforgettable fan moments.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-body antialiased bg-ink text-paper">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
