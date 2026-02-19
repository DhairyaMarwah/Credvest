import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coming Soon",
  description:
    "This page is under construction. Check back soon for updates from Credvest.",
  robots: { index: false, follow: true },
};

export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
