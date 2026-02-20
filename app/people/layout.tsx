import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our People",
  description:
    "Meet the team behind Credvest. Disciplined, ambitious, and growing — the people who run real estate sales at scale.",
};

export default function PeopleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
