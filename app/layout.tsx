import type { Metadata } from "next";
import { Inter, Noto_Serif_SC, Playfair_Display } from "next/font/google";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSwitcher } from "@/components/theme-switcher";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  variable: "--font-noto-serif-sc",
  display: "swap",
  weight: ["400", "500", "600"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const siteUrl = "https://credvest-ten.vercel.app/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Credvest — Real Estate's Most Trusted Operations Partner",
    template: "%s | Credvest",
  },
  description:
    "Credvest builds and runs the systems that move real estate projects from launch to sell-out \u2014 with discipline, structure, and direct accountability.",
  keywords: [
    "real estate sales",
    "project mandates",
    "sales operations",
    "real estate partner",
    "developer sales",
    "Credvest",
    "property sales management",
    "residential sales",
    "commercial sales",
    "real estate consulting",
  ],
  authors: [{ name: "Credvest" }],
  creator: "Credvest",
  publisher: "Credvest",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Credvest",
    title: "Credvest \u2014 Real Estate\u2019s Most Trusted Operations Partner",
    description:
      "One team. One system. Full accountability. From positioning to sell-out.",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "Credvest — Real Estate Sales Operations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Credvest \u2014 Real Estate\u2019s Most Trusted Operations Partner",
    description:
      "One team. One system. Full accountability. From positioning to sell-out.",
    images: ["/og.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoSerifSC.variable} ${playfairDisplay.variable}`}
    >
      <body className="antialiased">
        <ThemeProvider>
          <ScrollToTop />
          {children}
          <ThemeSwitcher />
        </ThemeProvider>
      </body>
    </html>
  );
}
