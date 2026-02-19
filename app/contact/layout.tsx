import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Credvest to discuss project mandates, partnerships, or career opportunities. Schedule a consultation with our team.",
  openGraph: {
    title: "Contact | Credvest",
    description:
      "Discuss project mandates, partnerships, or schedule a consultation with Credvest.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
