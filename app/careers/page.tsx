"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.svg";

const NAV_LINKS = [
  { label: "People", href: "#" },
  { label: "Company", href: "#" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M4 10h12m0 0l-4-4m4 4l-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100 p-1">
      <div className="w-full pl-8 lg:pl-12 pr-0 flex items-center justify-between h-14">
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

/* ── Data ── */

const CAREER_PILLARS = [
  {
    number: "01",
    title: "Structured Growth",
    description:
      "Every role has a defined progression path. From trainee to team lead, from analyst to market head — growth here is earned through measurable impact.",
  },
  {
    number: "02",
    title: "Exposure Across the Lifecycle",
    description:
      "You don't work in silos. You see positioning, marketing, sales, and execution — end to end. This creates sharper operators, not narrow specialists.",
  },
  {
    number: "03",
    title: "Real Responsibility",
    description:
      "Mandates are real. Revenue is real. Deadlines are real. You own outcomes — not just tasks.",
  },
  {
    number: "04",
    title: "Performance Culture",
    description:
      "We value clarity, discipline, and data-backed decisions. Effort matters. Results matter more.",
  },
];

const CAREER_PATH = [
  { role: "Associate", desc: "Own channel coordination and reporting." },
  {
    role: "Senior Associate",
    desc: "Manage performance metrics and conversion tracking.",
  },
  {
    role: "Manager",
    desc: "Lead project sales operations and team alignment.",
  },
  { role: "Market Lead", desc: "Own city-level mandate outcomes." },
];

const OPEN_ROLES = [
  {
    category: "Sales Operations",
    roles: [
      {
        title: "Sales Associate",
        location: "Bangalore",
        experience: "0–2 years",
      },
      {
        title: "Senior Sales Manager",
        location: "Hyderabad",
        experience: "4–6 years",
      },
    ],
  },
  {
    category: "Marketing & Strategy",
    roles: [
      {
        title: "Brand Strategist",
        location: "Bangalore",
        experience: "2–4 years",
      },
      {
        title: "Performance Marketing Lead",
        location: "Remote",
        experience: "3–5 years",
      },
    ],
  },
  {
    category: "City Operations",
    roles: [
      {
        title: "Market Lead",
        location: "Hyderabad",
        experience: "5–8 years",
      },
      {
        title: "Operations Associate",
        location: "Bangalore",
        experience: "1–3 years",
      },
    ],
  },
  {
    category: "Corporate Functions",
    roles: [
      {
        title: "HR & People Ops",
        location: "Bangalore",
        experience: "2–4 years",
      },
      {
        title: "Finance Analyst",
        location: "Bangalore",
        experience: "1–3 years",
      },
    ],
  },
];

const FOOTER_LINKS: { heading: string; links: string[] }[] = [
  {
    heading: "Solutions",
    links: [
      "All Solutions",
      "Residential",
      "Commercial",
      "Mixed-Use",
      "Pre-Launch",
      "Portfolio Management",
    ],
  },
  {
    heading: "How It Works",
    links: ["Project Structures", "Platform"],
  },
  {
    heading: "Resources",
    links: ["Log In", "Sustainability", "Press", "Blog"],
  },
  {
    heading: "About",
    links: [
      "Our Company",
      "Careers",
      "LinkedIn",
      "General Inquiries",
      "Privacy Policy",
    ],
  },
];

/* ── Hero Section ── */

function HeroSection() {
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [imageWidth, setImageWidth] = useState(100);
  const [imageScale, setImageScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (!imageWrapperRef.current || !heroRef.current) return;

      const scrollY = window.scrollY;
      const windowWidth = window.innerWidth;
      const containerWidth = Math.min(1600, windowWidth - 96);
      const containerPct = (containerWidth / windowWidth) * 100;
      const scrollRange = 500;

      const progress = Math.min(scrollY / scrollRange, 1);
      const width = 100 - progress * (100 - containerPct);
      const scale = 1 + progress * 0.15;

      setImageWidth(width);
      setImageScale(scale);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={heroRef} className="relative pt-16">
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
            <h1 className="font-serif text-[clamp(2.8rem,5.8vw,5.5rem)] font-medium text-neutral-black leading-[1.08] tracking-[-0.04em]">
              Build the systems that
              <br />
              move real estate{" "}
              <span className="text-brand font-semibold">at scale.</span>
            </h1>
          </div>

          <div className="flex flex-col gap-6 pb-2">
            <p className="text-[13px] text-neutral-500 leading-relaxed max-w-[280px]">
              Credvest is not a brokerage. We are an operating platform built
              for structured growth.
            </p>
            <a
              href="#open-roles"
              className="flex items-center gap-3 group w-fit"
            >
              <span className="flex items-center justify-center w-9 h-9 bg-brand text-white transition-colors group-hover:bg-brand-600">
                <ArrowRight />
              </span>
              <span className="text-[13px] font-semibold text-neutral-black">
                View Open Roles
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Full-bleed image — shrinks on scroll */}
      <div
        ref={imageWrapperRef}
        className="relative z-10 mx-auto"
        style={{ width: `${imageWidth}%` }}
      >
        <div className="relative w-full aspect-[16/4.5] overflow-hidden">
          <Image
            src="/careers.png"
            alt="Team at Credvest"
            fill
            className="object-cover transition-transform duration-100 ease-out"
            style={{ transform: `scale(${imageScale})` }}
            priority
          />
        </div>
      </div>
    </section>
  );
}

/* ── Career Progression Section ── */

function CareerProgressionSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const barPcts = [25, 45, 70, 100];

  return (
    <section className="bg-white">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-20 md:py-32">
        <div className="text-center mb-14">
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-neutral-black leading-[1.12] tracking-[-0.04em]">
            Career Progression at
            <br />
            Credvest
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-end">
          {/* Bar chart */}
          <div>
            <div
              className="relative"
              style={{ height: 400 }}
              onMouseLeave={() => setActiveIndex(0)}
            >
              {/* Dashed grid lines */}
              <div className="absolute left-0 right-0 top-0 bottom-0">
                {[0, 33, 66, 100].map((pct) => (
                  <div
                    key={pct}
                    className="absolute left-0 right-0"
                    style={{
                      bottom: `${pct}%`,
                      borderTop:
                        pct === 0 ? "1px solid #E8E8E8" : "1px dashed #ECECEC",
                    }}
                  />
                ))}
              </div>

              {/* Bars */}
              <div className="absolute left-0 right-0 top-0 bottom-0 flex items-end gap-1">
                {CAREER_PATH.map((step, i) => {
                  const isActive = activeIndex === i;

                  return (
                    <div
                      key={step.role}
                      className="flex-1 relative h-full flex items-end cursor-default"
                      onMouseEnter={() => setActiveIndex(i)}
                    >
                      {/* Active column highlight */}
                      {isActive && (
                        <div
                          className="absolute inset-0 z-0 transition-opacity duration-200"
                          style={{
                            backgroundColor: "rgba(250,65,42,0.05)",
                          }}
                        />
                      )}

                      {/* Bar */}
                      <div
                        className="relative z-10 overflow-hidden transition-all duration-300 w-full"
                        style={{
                          height: `${barPcts[i]}%`,
                          backgroundColor: "#F6F7F3",
                        }}
                      >
                        {/* Diagonal grey lines overlay */}
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(-45deg, transparent, transparent 6px, rgba(0,0,0,0.04) 6px, rgba(0,0,0,0.04) 7px)",
                          }}
                        />

                        {/* Role label pill inside bar at top */}
                        <div className="absolute top-3 left-3 z-10">
                          <span className="inline-block bg-white px-3 py-1 font-serif text-[10px] md:text-[11px] font-semibold text-neutral-700 tracking-[-0.01em]">
                            {step.role}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Active info overlay */}
              {activeIndex !== null && (
                <div className="absolute top-3 left-4 z-20 max-w-[220px]">
                  <h3
                    className="font-serif text-2xl md:text-3xl font-semibold leading-[1.1] tracking-[-0.03em] mb-1 transition-colors duration-200"
                    style={{
                      color:
                        activeIndex === CAREER_PATH.length - 1
                          ? "#FA412A"
                          : "#1A1A1A",
                    }}
                  >
                    {CAREER_PATH[activeIndex].role}
                  </h3>
                  <a
                    href="#open-roles"
                    className="inline-flex items-center gap-2 mt-2 group"
                  >
                    <span className="flex items-center justify-center w-7 h-7 bg-brand text-white">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[11px] font-semibold text-neutral-black">
                      View Open Roles
                    </span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Testimonial card — solid orange with white inner box */}
          <div
            className="flex bg-brand/80 flex-col overflow-hidden p-3"
            style={{
              minHeight: 400,
            }}
          >
            <div
              className="flex-1 flex bg-white/10 flex-col justify-between p-6"
              style={{
                backdropFilter: "blur(4px)",
              }}
            >
              <div>
                <svg
                  width="32"
                  height="24"
                  viewBox="0 0 40 32"
                  fill="none"
                  className="mb-4"
                >
                  <path
                    d="M0 20.8C0 12.267 5.867 4.8 16 0l2.133 4.267C11.467 8 8.533 12.267 8 16h8v16H0V20.8zm24 0C24 12.267 29.867 4.8 40 0l2.133 4.267C35.467 8 32.533 12.267 32 16h8v16H24V20.8z"
                    fill="white"
                    fillOpacity="0.6"
                  />
                </svg>
                <p className="font-serif text-[15px] md:text-[17px] font-medium text-white/90 leading-relaxed tracking-[-0.01em]">
                  &ldquo;In sales, our focus isn&apos;t just on selling but on
                  guiding clients through their home-buying journey as trusted
                  consultants.&rdquo;
                </p>
              </div>

              {/* Author inside the white box */}
              <div className="mt-8">
                <p className="font-serif text-2xl md:text-3xl font-medium text-white tracking-[-0.02em]">
                  Nikhil, <span className="text-white/50">AGM</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Open Roles Section ── */

function OpenRolesSection() {
  const [expandedCategory, setExpandedCategory] = useState<string>(
    OPEN_ROLES[0].category,
  );
  const activeGroup = OPEN_ROLES.find((g) => g.category === expandedCategory);

  return (
    <section id="open-roles" className="bg-white">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand mb-4 block font-sans">
              Open Positions
            </span>
            <h2 className="font-serif text-3xl md:text-[2.8rem] font-medium text-neutral-black leading-[1.12] tracking-[-0.04em] mb-12">
              Find Your Role
            </h2>

            <div>
              {OPEN_ROLES.map((group) => {
                const isActive = expandedCategory === group.category;
                return (
                  <button
                    key={group.category}
                    onClick={() => setExpandedCategory(group.category)}
                    className={`w-full text-left py-4 flex items-center justify-between transition-all border-b ${
                      isActive ? "border-brand" : "border-neutral-200"
                    }`}
                  >
                    <span
                      className={`font-serif text-lg md:text-xl font-semibold tracking-[-0.01em] transition-colors duration-300 ${
                        isActive ? "text-neutral-black" : "text-neutral-400"
                      }`}
                    >
                      {group.category}
                    </span>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-brand/10 text-brand"
                          : "bg-neutral-100 text-neutral-400"
                      }`}
                    >
                      {group.roles.length} roles
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col justify-center">
            {activeGroup && (
              <div>
                <p className="text-[11px] font-semibold text-brand mb-6 tracking-[0.15em] uppercase">
                  {activeGroup.category}
                </p>
                <div>
                  {activeGroup.roles.map((role, i) => (
                    <div
                      key={role.title}
                      className={`py-5 hover:pl-2 transition-all ${
                        i < activeGroup.roles.length - 1
                          ? "border-b border-neutral-200"
                          : ""
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-serif text-lg font-semibold text-neutral-black mb-1 tracking-[-0.01em]">
                            {role.title}
                          </h4>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-neutral-400 flex items-center gap-1">
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                              </svg>
                              {role.location}
                            </span>
                            <span className="text-neutral-200">&middot;</span>
                            <span className="text-xs text-neutral-400">
                              {role.experience}
                            </span>
                          </div>
                        </div>
                        <button className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wide bg-neutral-900 text-white hover:bg-brand transition-colors flex-shrink-0">
                          Apply +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Why Choose Section — 4 Pillars ── */

function WhyChooseSection() {
  return (
    <section className="bg-white">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-20 md:py-32">
        <div className="text-center mb-14">
          <h2 className="font-serif text-3xl md:text-[2.8rem] font-medium text-neutral-black leading-[1.12] tracking-[-0.04em]">
            Why result-focused
            <br />
            operators choose <span className="text-brand">Credvest.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2px]">
          {CAREER_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="bg-white p-8 md:p-10 group hover:bg-white transition-colors"
            >
              <span className="text-[11px] font-bold tracking-widest text-brand mb-3 block">
                {pillar.number}
              </span>
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-neutral-black mb-3 tracking-[-0.02em] leading-[1.15]">
                {pillar.title}
              </h3>
              <p className="font-sans text-[13px] text-neutral-500 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA Section ── */

function CtaSection() {
  return (
    <section className="bg-white relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
          backgroundSize: "calc(100% / 8) 80px",
        }}
      />
      <div className="relative z-10 max-w-[1600px] mx-auto px-8 lg:px-12 py-24 md:py-36 text-center">
        <h2 className="font-serif text-4xl md:text-[3.8rem] font-medium text-neutral-black leading-[1.12] tracking-[-0.04em] mb-10">
          Ready to{" "}
          <span
            className="font-semibold"
            style={{
              textShadow:
                "2px 0 #E3F99D, -2px 0 #E3F99D, 0 2px #E3F99D, 0 -2px #E3F99D, 1px 1px #E3F99D, -1px -1px #E3F99D, 1px -1px #E3F99D, -1px 1px #E3F99D",
            }}
          >
            transform
          </span>{" "}
          your
          <br />
          operation strategy?
        </h2>
        <Link
          href="#"
          className="inline-flex items-center gap-3 bg-brand text-white font-sans text-[14px] font-semibold px-8 py-4 hover:bg-brand-600 transition-colors"
        >
          <ArrowRight />
          Schedule a Consultation
        </Link>
      </div>
    </section>
  );
}

/* ── Footer ── */

function Footer() {
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
                    <li key={link}>
                      <Link
                        href="#"
                        className="font-sans text-[13px] text-neutral-600 hover:text-neutral-black transition-colors"
                      >
                        {link}
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

/* ── Page ── */

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-black font-sans">
      <Navbar />
      <HeroSection />
      <CareerProgressionSection />
      <OpenRolesSection />
      <WhyChooseSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
