import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How We Work",
  description:
    "One system. Four stages. Full accountability. From positioning to sell-out, Credvest runs the entire sales mandate as a single integrated team.",
  openGraph: {
    title: "How We Work | Credvest",
    description:
      "One system. Four stages. Full accountability. From positioning to sell-out.",
  },
};

export default function HowWeWorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
