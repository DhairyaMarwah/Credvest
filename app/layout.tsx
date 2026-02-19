import type { Metadata } from "next";
import { Inter, Noto_Serif_SC } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Credvest — Real Estate's Most Trusted Operations Partner",
  description:
    "Credvest operates as a long-term sales partner for developers, managing entire project mandates from launch to sell-out across residential and commercial developments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSerifSC.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
