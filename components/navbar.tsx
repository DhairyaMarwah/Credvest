"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/assets/logo.svg";

const NAV_LINKS = [
  { label: "People", href: "/people" },
  { label: "Company", href: "/company" },
  { label: "Group", href: "/group" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastScrollY.current;

        if (open) {
          // never hide while menu is open
        } else if (y < 10) {
          setHidden(false);
        } else if (delta > 4) {
          setHidden(true);
        } else if (delta < -4) {
          setHidden(false);
        }

        lastScrollY.current = y;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <>
      <nav
        className={`fixed left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100 p-1 transition-transform duration-300 ease-out ${hidden ? "-translate-y-full" : "translate-y-0"}`}
        style={{ top: 0 }}
      >
        <div className="w-full pl-7 lg:pl-11 pr-0 flex items-center justify-between h-14">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src={Logo}
              alt="Credvest"
              height={28}
              className="h-7 w-auto"
            />
          </Link>

          {/* Desktop nav */}
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

          {/* Mobile hamburger */}
          <button
            onClick={() => {
              const next = !open;
              setOpen(next);
              if (next) setHidden(false);
            }}
            className="md:hidden flex items-center justify-center w-14 h-14 flex-shrink-0"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-[5px]">
              <span
                className={`block w-5 h-[1.5px] bg-neutral-black transition-all duration-300 ${open ? "rotate-45 translate-y-[6.5px]" : ""}`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-neutral-black transition-all duration-300 ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-neutral-black transition-all duration-300 ${open ? "-rotate-45 -translate-y-[6.5px]" : ""}`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile slide-in overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 md:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />

      {/* Mobile slide-in panel */}
      <div
        className={`fixed top-0 right-0 z-[45] h-full w-[280px] bg-white shadow-xl transition-transform duration-300 ease-out md:hidden ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="pt-20 px-8 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-serif text-xl font-semibold text-neutral-black py-3 border-b border-neutral-100 tracking-[-0.03em]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center justify-center bg-brand text-white text-[14px] font-semibold py-3.5 hover:bg-brand-600 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
}
