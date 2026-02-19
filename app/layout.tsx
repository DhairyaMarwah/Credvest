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

const siteUrl = "https://credvest.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Credvest — Real Estate's Most Trusted Operations Partner",
    template: "%s | Credvest",
  },
  description:
    "Credvest operates as a long-term sales partner for developers, managing entire project mandates from launch to sell-out across residential and commercial developments.",
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
    title: "Credvest — Real Estate's Most Trusted Operations Partner",
    description:
      "We operate as an extended arm of developers to plan, execute, and optimize project sales at scale.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Credvest — Real Estate Sales Operations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Credvest — Real Estate's Most Trusted Operations Partner",
    description:
      "We operate as an extended arm of developers to plan, execute, and optimize project sales at scale.",
    images: ["/og.png"],
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
