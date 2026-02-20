import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Built over a decade. Credvest is an operating platform for real estate sales \u2014 managing the full lifecycle for developers as a single, accountable team.",
  openGraph: {
    title: "Company | Credvest",
    description:
      "10+ years. \u20B98,000 Cr in transactions. One operating platform for real estate sales.",
  },
};

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
