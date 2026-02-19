import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Credvest and build a career in real estate's most structured sales environment. Explore open roles across sales, marketing, strategy, and operations.",
  openGraph: {
    title: "Careers | Credvest",
    description:
      "Build a career in real estate's most structured sales environment. Explore open roles at Credvest.",
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
