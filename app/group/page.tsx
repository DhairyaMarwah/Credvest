"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { DitherShader } from "@/components/dither-shader";

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M4.5 10h11m0 0L10 4.5M15.5 10l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Corner brackets for Credvest logo ── */
function CornerBrackets() {
  const arm = "28px";
  const weight = "2px";
  const color = "var(--color-brand)";

  const common: React.CSSProperties = { position: "absolute", width: arm, height: arm };

  return (
    <>
      <span style={{ ...common, top: 0, left: 0, borderTop: `${weight} solid ${color}`, borderLeft: `${weight} solid ${color}` }} />
      <span style={{ ...common, top: 0, right: 0, borderTop: `${weight} solid ${color}`, borderRight: `${weight} solid ${color}` }} />
      <span style={{ ...common, bottom: 0, left: 0, borderBottom: `${weight} solid ${color}`, borderLeft: `${weight} solid ${color}` }} />
      <span style={{ ...common, bottom: 0, right: 0, borderBottom: `${weight} solid ${color}`, borderRight: `${weight} solid ${color}` }} />
    </>
  );
}

/* ── Ventures Data ── */

/* ── Dithered logo cell for the logo row ── */
function DitherLogo({ src, alt }: { src: string; alt: string }) {
  const [hovered, setHovered] = useState(false);
  const isSvg = src.endsWith(".svg");

  return (
    <div
      className="relative h-[35px] md:h-[50px] w-[120px] md:w-[160px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-contain transition-opacity duration-400 ${!isSvg && hovered ? "opacity-0" : "opacity-100"}`}
      />
      {!isSvg && (
        <div className={`absolute inset-0 transition-opacity duration-400 ${hovered ? "opacity-100" : "opacity-0"}`}>
          <DitherShader
            src={src}
            gridSize={2}
            ditherMode="bayer"
            colorMode="duotone"
            primaryColor="#FA412A"
            secondaryColor="#1a1a1a"
            threshold={0.5}
            objectFit="contain"
            className="absolute inset-0"
          />
        </div>
      )}
    </div>
  );
}

/* ── Logo box with dither hover for venture cards ── */
function VentureLogoBox({ src, alt }: { src: string; alt: string }) {
  const [hovered, setHovered] = useState(false);
  const isSvg = src.endsWith(".svg");

  return (
    <div
      className="relative w-full aspect-[16/9] bg-neutral-100/50 overflow-hidden flex items-center justify-center cursor-pointer flex-shrink-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tight wrapper keeps both Image and DitherShader at the same size */}
      <div className="relative h-[40px] md:h-[50px] w-[160px] md:w-[200px]">
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-contain transition-opacity duration-400 ${!isSvg && hovered ? "opacity-0" : "opacity-100"}`}
        />
        {!isSvg && (
          <div className={`absolute inset-0 transition-opacity duration-400 ${hovered ? "opacity-100" : "opacity-0"}`}>
            <DitherShader
              src={src}
              gridSize={2}
              ditherMode="bayer"
              colorMode="duotone"
              primaryColor="#FA412A"
            secondaryColor="#1a1a1a"
            threshold={0.5}
            objectFit="contain"
            className="absolute inset-0"
          />
        </div>
      )}
      </div>
    </div>
  );
}

const SIDE_VENTURES = [
  {
    name: "Parking Capital",
    description:
      "Smart parking investment and management solutions for modern real estate projects.",
    logo: "/ParkingCapital.png",
    href: "#",
  },
  {
    name: "Äiti Intérieurs",
    description:
      "Premium interior design and execution, bringing vision to life with craftsmanship and detail.",
    logo: "/interieurs.png",
    href: "#",
  },
  {
    name: "Suvaii",
    description:
      "A Pandiyan legacy — authentic South Indian cuisine rooted in heritage and tradition.",
    logo: "/suvaii.png",
    href: "#",
  },
  {
    name: "Vanamo",
    description:
      "Global eats and caffeinary — a modern culinary experience bridging cultures and flavors.",
    logo: "/vanamo.png",
    href: "#",
  },
];

/* ── Hero Section ── */

function HeroSection() {
  return (
    <section className="relative pt-16 bg-white">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
          backgroundSize: "calc(100% / 8) 80px",
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-end pt-32 md:pt-44 pb-20 md:pb-28">
          <div>
            <h1 className="font-serif text-[clamp(2.8rem,5.8vw,5.5rem)] font-semibold text-neutral-black leading-[1.08] tracking-[-0.07em]">
              Mastering an{" "}
              <span className="font-semibold text-stroke-brand">
                Integrated
              </span>
              <br />
              Ecosystem.
            </h1>
          </div>

          <div className="flex flex-col gap-6 pb-2">
            <p className="text-[13px] text-neutral-500 leading-relaxed max-w-[280px]">
              Connecting ventures, enhancing value, driving success &mdash;
              across real estate, lifestyle, and beyond.
            </p>
            <Link
              href="/contact"
              className="flex items-center gap-3 group w-fit"
            >
              <span className="flex items-center justify-center w-9 h-9 bg-brand text-white transition-colors group-hover:bg-brand-600">
                <ArrowRight />
              </span>
              <span className="text-[13px] font-semibold text-neutral-black">
                Partner With Us
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Unified bordered content ── */

function BorderedContent() {
  return (
    <section className="bg-white">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
        <div className="border border-dotted border-neutral-300">
          {/* ── Logo Grid ── */}
          {/* Mobile: Credvest full-width top, then 2x2. Desktop: single row of 5 */}

          {/* Credvest — full-width on mobile, part of 5-col row on desktop */}
          <div className="md:hidden flex items-center justify-center p-8 border-b border-dotted border-neutral-300 min-h-[120px] relative bg-brand/[0.03]">
            <CornerBrackets />
            <Image
              src="/logo.svg"
              alt="Credvest"
              width={180}
              height={60}
              className="object-contain w-[140px] h-auto"
            />
          </div>

          {/* Other logos: 2x2 on mobile, 5-col on desktop (with Credvest center) */}
          <div className="grid grid-cols-2 md:grid-cols-5">
            <div className="flex items-center justify-center p-6 md:p-10 border-r border-b md:border-b-0 border-dotted border-neutral-300 min-h-[100px] md:min-h-[160px]">
              <DitherLogo src="/ParkingCapital.png" alt="Parking Capital" />
            </div>

            <div className="flex items-center justify-center p-6 md:p-10 border-b md:border-b-0 md:border-r border-dotted border-neutral-300 min-h-[100px] md:min-h-[160px]">
              <DitherLogo src="/interieurs.png" alt="Äiti Intérieurs" />
            </div>

            {/* Credvest — desktop only, center */}
            <div className="hidden md:flex items-center justify-center p-6 md:p-10 border-r border-dotted border-neutral-300 min-h-[160px] relative bg-brand/[0.03]">
              <CornerBrackets />
              <Image
                src="/logo.svg"
                alt="Credvest"
                width={180}
                height={60}
                className="object-contain w-[180px] h-auto"
              />
            </div>

            <div className="flex items-center justify-center p-6 md:p-10 border-r border-dotted border-neutral-300 min-h-[100px] md:min-h-[160px]">
              <DitherLogo src="/suvaii.png" alt="Suvaii" />
            </div>

            <div className="flex items-center justify-center p-6 md:p-10 min-h-[100px] md:min-h-[160px]">
              <DitherLogo src="/vanamo.png" alt="Vanamo" />
            </div>
          </div>

          {/* ── About + Ventures: sticky left, scrolling right ── */}
          <div className="border-t border-dotted border-neutral-300 grid grid-cols-1 lg:grid-cols-[2fr_3fr]">
            {/* Left — sticky heading */}
            <div className="p-8 md:p-12 lg:border-r border-dotted border-neutral-300">
              <div className="lg:sticky lg:top-28">
                <h2 className="font-serif text-3xl md:text-[2.8rem] font-semibold text-neutral-black leading-[1.12] tracking-[-0.07em]">
                  One group.
                  <br />
                  Many verticals.
                </h2>
              </div>
            </div>

            {/* Right — description then venture cards */}
            <div>
              {/* Description */}
              <div className="p-8 md:p-12 border-b border-dotted border-neutral-300">
                <p className="font-sans text-[14px] text-neutral-500 leading-relaxed">
                  The Credvest Group has masterfully created an integrated
                  ecosystem where each venture amplifies and complements the
                  others. Through strategic partnerships and a commitment to
                  excellence, we seamlessly connect our ventures to offer a
                  comprehensive suite of services.
                </p>
                <p className="font-sans text-[14px] text-neutral-500 leading-relaxed mt-4">
                  Every aspect of real estate, from development to lifestyle
                  enhancement, is covered &mdash; ensuring our partners and
                  clients benefit from the full depth of our ecosystem.
                </p>
              </div>

              {/* Venture cards */}
              {[
                {
                  name: "Credvest",
                  logo: "/logo.svg",
                  description:
                    "Full-stack real estate sales platform. We manage the entire lifecycle for developers \u2014 positioning, marketing, sales, execution \u2014 as a single, accountable team.",
                  href: "/",
                },
                ...SIDE_VENTURES,
              ].map((venture) => (
                <div
                  key={venture.name}
                  className="border-b border-dotted border-neutral-300 last:border-b-0"
                >
                  <div className="p-8 md:p-12 flex flex-col md:flex-row gap-6 md:gap-10">
                    <div className="w-full md:w-[240px] lg:w-[280px] flex-shrink-0">
                      <VentureLogoBox src={venture.logo} alt={venture.name} />
                    </div>
                    <div className="flex flex-col justify-center flex-1">
                      <p className="font-sans text-[14px] text-neutral-500 leading-relaxed max-w-lg">
                        {venture.description}
                      </p>
                      <Link
                        href={venture.href}
                        className="flex items-center gap-3 group w-fit mt-5"
                      >
                        <span className="flex items-center justify-center w-9 h-9 bg-brand text-white transition-colors group-hover:bg-brand-600">
                          <ArrowRight />
                        </span>
                        <span className="text-[13px] font-semibold text-neutral-black">
                          {venture.href !== "#" ? "Learn More" : "Coming Soon"}
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CTA Section ── */

function CtaSection() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
          backgroundSize: "calc(100% / 8) 80px",
        }}
      />
      <div className="relative z-10 max-w-[1600px] mx-auto px-8 lg:px-12 py-24 md:py-36 text-center">
        <h2 className="font-serif text-4xl md:text-[3.8rem] font-semibold text-neutral-black leading-[1.12] tracking-[-0.07em] mb-10">
          Let&apos;s build{" "}
          <span className="font-semibold text-stroke-brand">together.</span>
        </h2>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 bg-brand text-white font-sans text-[14px] font-semibold px-8 py-4 hover:bg-brand-600 transition-colors"
        >
          <ArrowRight />
          Get in Touch
        </Link>
      </div>
    </section>
  );
}

/* ── Page ── */

export default function GroupPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-black font-sans">
      <Navbar />
      <HeroSection />
      <BorderedContent />
      <CtaSection />
      <Footer />
    </main>
  );
}
