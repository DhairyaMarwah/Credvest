import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand",
  description:
    "The Credvest brand — our identity, visual language, and the principles that guide how we present ourselves.",
};

export default function BrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
