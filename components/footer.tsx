import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.svg";

const FOOTER_LINKS: { heading: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/company" },
      { label: "The Group", href: "/group" },
      { label: "Our People", href: "/people" },
      { label: "Careers", href: "/careers" },
      { label: "Brand", href: "/brand" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "How We Work", href: "/how-we-work" },
      { label: "Branding & Strategy", href: "/how-we-work" },
      { label: "Marketing", href: "/how-we-work" },
      { label: "Sales", href: "/how-we-work" },
      { label: "Post Sales", href: "/how-we-work" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/company/credvest", external: true },
      { label: "Instagram", href: "https://www.instagram.com/credvest", external: true },
      { label: "Twitter / X", href: "https://x.com/credvest", external: true },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/coming-soon" },
      { label: "Terms of Service", href: "/coming-soon" },
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
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-sans text-[13px] text-neutral-600 hover:text-neutral-black transition-colors"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="font-sans text-[13px] text-neutral-600 hover:text-neutral-black transition-colors"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 pb-8">
        <div className="border-t border-neutral-200 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="font-sans text-[12px] text-neutral-400">
            &copy; {new Date().getFullYear()} Credvest. All rights reserved.
          </p>
          <p className="font-sans text-[12px] text-neutral-400">
            Bangalore &middot; Hyderabad &middot; Dubai
          </p>
        </div>
      </div>

      <div className="bg-brand h-1.5 w-full" />
    </footer>
  );
}
