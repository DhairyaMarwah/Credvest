import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How We Work",
  description:
    "From positioning and authority building to marketing, sales execution, and closure — discover the structured 4-stage process Credvest uses to deliver sell-out results for developers.",
  openGraph: {
    title: "How We Work | Credvest",
    description:
      "From positioning to closure — discover Credvest's structured 4-stage process for sell-out results.",
  },
};

export default function HowWeWorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
