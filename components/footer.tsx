import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.svg";

const FOOTER_LINKS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Solutions",
    links: [
      { label: "All Solutions", href: "/coming-soon" },
      { label: "Residential", href: "/coming-soon" },
      { label: "Commercial", href: "/coming-soon" },
      { label: "Mixed-Use", href: "/coming-soon" },
      { label: "Pre-Launch", href: "/coming-soon" },
      { label: "Portfolio Management", href: "/coming-soon" },
    ],
  },
  {
    heading: "How It Works",
    links: [
      { label: "Project Structures", href: "/how-we-work" },
      { label: "Platform", href: "/coming-soon" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Log In", href: "/coming-soon" },
      { label: "Sustainability", href: "/coming-soon" },
      { label: "Press", href: "/coming-soon" },
      { label: "Blog", href: "/coming-soon" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "Our Company", href: "/coming-soon" },
      { label: "Careers", href: "/careers" },
      { label: "LinkedIn", href: "/coming-soon" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/coming-soon" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12 lg:gap-24">
          <div>
            <Link href="/">
              <Image src={Logo} alt="Credvest" className="h-8 w-auto" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {FOOTER_LINKS.map((col) => (
              <div key={col.heading}>
                <h5 className="font-sans text-[11px] font-semibold tracking-[0.12em] uppercase text-neutral-400 mb-4">
                  {col.heading}
                </h5>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-sans text-[13px] text-neutral-600 hover:text-neutral-black transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-brand h-1.5 w-full" />
    </footer>
  );
}
