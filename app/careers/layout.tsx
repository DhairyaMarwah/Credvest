import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "This isn\u2019t a brokerage. It\u2019s an operating platform. Structured systems, dedicated teams, real ownership. Explore careers at Credvest.",
  openGraph: {
    title: "Careers | Credvest",
    description:
      "Real estate, rebuilt from the inside. Explore careers at Credvest \u2014 an operating platform built for structured growth.",
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
