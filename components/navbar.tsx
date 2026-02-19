"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.svg";

const NAV_LINKS = [
  { label: "People", href: "/coming-soon" },
  { label: "Company", href: "/coming-soon" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100 p-1">
      <div className="w-full pl-7 lg:pl-11 pr-0 flex items-center justify-between h-14">
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image src={Logo} alt="Credvest" height={28} className="h-7 w-auto" />
        </Link>

        <div className="hidden md:flex items-center">
          <div className="flex items-center gap-8 pr-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[13px] font-medium text-neutral-600 hover:text-neutral-black transition-colors flex items-center gap-1"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 bg-brand text-white text-[13px] font-semibold tracking-wide hover:bg-brand-600 transition-colors h-14 flex-shrink-0"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
