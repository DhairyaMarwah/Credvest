import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Real developers. Real numbers. Verified case studies of projects where Credvest took full ownership — and delivered.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
