import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Credvest Group",
  description:
    "An integrated ecosystem of ventures spanning real estate, interiors, hospitality, and lifestyle. Connecting ventures, enhancing value, driving success.",
};

export default function GroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
