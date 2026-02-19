import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Let\u2019s talk about your next project. Schedule a consultation with Credvest to discuss mandates, partnerships, or opportunities.",
  openGraph: {
    title: "Contact | Credvest",
    description:
      "Let\u2019s talk about your next project. Schedule a consultation with Credvest.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
