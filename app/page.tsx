"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const STAGES = [
  { number: "01", title: "Positioning" },
  { number: "01", title: "Marketing" },
  { number: "01", title: "Sales" },
  { number: "01", title: "Execution" },
];

const GROWTH_CARDS = [
  {
    title: "White-label execution",
    description: "Our teams represent the developer's brand, not ours.",
    bg: "var(--color-pastel-blue)",
    image: "/bg1.png",
  },
  {
    title: "Structured sales systems",
    description:
      "Processes, reporting, and performance tracking built for scale.",
    bg: "var(--color-pastel-yellow)",
    image: "/bg1.png",
  },
  {
    title: "Experienced project teams",
    description:
      "Project managers, sales heads, and channel managers aligned to each mandate.",
    bg: "var(--color-pastel-green)",
    image: "/bg1.png",
  },
];

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function ArrowDown({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  );
}

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
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
          backgroundSize: "calc(100% / 8) 80px",
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-end pt-32 md:pt-44 pb-20 md:pb-28">
          <div>
            <h1 className="font-serif text-[clamp(2.8rem,5.8vw,5.5rem)] font-medium text-neutral-black leading-[1.08] tracking-[-0.04em]">
              Real estate&apos;s{" "}
              <span
                className="font-semibold text-stroke-brand"
              >
                most
              </span>
              <br />
              <span
                className="font-semibold text-stroke-brand"
              >
                trusted
              </span>{" "}
              operations partner
            </h1>
          </div>

          <div className="flex flex-col gap-6 pb-2">
            <p className="text-[13px] text-neutral-500 leading-relaxed max-w-[280px]">
              We operate as an extended arm of developers to plan, execute, and
              optimize project sales at scale.
            </p>
            <a href="#" className="flex items-center gap-3 group w-fit">
              <span className="flex items-center justify-center w-9 h-9 bg-brand text-white transition-colors group-hover:bg-brand-600">
                <ArrowRight />
              </span>
              <span className="text-[13px] font-semibold text-neutral-black">
                Work With Us
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
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <Image
            src="/bg1.png"
            alt="Aerial view of a modern city intersection"
            fill
            className="object-cover transition-transform duration-100 ease-out"
            style={{ transform: `scale(${imageScale})` }}
            priority
          />

          {/* Overlay content inside the image */}
          <div className="absolute inset-x-0 bottom-0 z-20 px-6 md:px-10 pb-6 md:pb-10">
            {/* Headline */}
            <div className="pb-5">
              <h2 className="font-sans text-[clamp(1.5rem,3.5vw,2.8rem)] font-medium text-white leading-[1.15] tracking-[-0.05em]">
                One structured system. Four controlled stages.
              </h2>
            </div>

            {/* Stage cards */}
            <div className="border-t border-white/30 pt-5 mb-5" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-[10px]">
              {STAGES.map((stage) => (
                <div
                  key={stage.title}
                  className="bg-white px-5 py-5 flex flex-col justify-between min-h-[120px] group cursor-pointer hover:bg-neutral-50 transition-colors"
                >
                  <span className="text-[11px] text-neutral-400 font-sans tracking-wider">
                    [ {stage.number} ]
                  </span>
                  <div className="flex items-end justify-between mt-auto">
                    <span className="font-sans text-lg md:text-xl font-medium tracking-[-0.02em] text-neutral-black group-hover:text-brand transition-colors">
                      {stage.title}
                    </span>
                    <ArrowDown className="text-neutral-400 group-hover:text-neutral-black transition-colors" />
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

function DescriptionSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
        <p className="font-sans text-[15px] md:text-base text-neutral-600 leading-relaxed max-w-xl">
          Credvest operates as a long-term sales partner for developers,
          managing entire project mandates from launch to sell-out across
          residential and commercial developments.
        </p>
        <a href="#" className="flex items-center gap-3 group w-fit mt-8">
          <span className="flex items-center justify-center w-9 h-9 bg-brand text-white transition-colors group-hover:bg-brand-600">
            <ArrowRight />
          </span>
          <span className="text-[13px] font-semibold text-neutral-black">
            Learn More
          </span>
        </a>
      </div>
    </section>
  );
}

function GrowthSystemSection() {
  return (
    <section className="bg-white  ">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12 lg:gap-28">
          {/* Left — sticky */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand mb-4 block font-sans">
              Customer Agent
            </span>
            <h2 className="font-serif text-3xl md:text-[2.8rem] font-medium text-neutral-black leading-[1.12] tracking-[-0.04em] mb-5">
              The Full-Stack Growth System
            </h2>
            <p className="font-sans text-[14px] text-neutral-500 leading-relaxed mb-8">
              Credvest builds and runs the complete systems that move real
              estate projects from launch to sell-out — combining positioning,
              marketing, sales execution, channel management, and reporting into
              one integrated engine.
            </p>
            <a href="#" className="flex items-center gap-3 group w-fit">
              <span className="flex items-center justify-center w-9 h-9 bg-brand text-white transition-colors group-hover:bg-brand-600">
                <ArrowRight />
              </span>
              <span className="text-[13px] font-semibold text-neutral-black">
                Learn More
              </span>
            </a>
          </div>

          {/* Right — scrolling cards */}
          <div className="flex flex-col gap-6">
            {GROWTH_CARDS.map((card) => (
              <div
                key={card.title}
                className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-0 overflow-hidden"
              >
                {/* Card image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Card content */}
                <div
                  className="p-8 md:p-10 flex flex-col justify-between"
                  style={{ backgroundColor: card.bg }}
                >
                  <h3 className="font-serif text-xl md:text-2xl font-semibold text-neutral-black leading-[1.2] tracking-[-0.02em]">
                    {card.title}
                  </h3>
                  <div>
                    <p className="font-sans text-[13px] text-neutral-600 leading-relaxed mb-5">
                      {card.description}
                    </p>
                    <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-neutral-black underline underline-offset-4 cursor-pointer hover:text-brand transition-colors">
                      Learn More
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const STATS = [
  { value: "5+", label: "Serviced" },
  { value: "10 yr.", label: "Developer partnerships" },
  { value: "10", suffix: "Mn SqFt", label: "Real Estate Managed" },
  { value: "5000+", label: "Customers Trust Us" },
  { value: "8,000", suffix: "Cr", label: "Transaction Managed" },
  { value: "35+", label: "States Served" },
];

function MarqueeRow() {
  return (
    <div className="flex-shrink-0 flex">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="flex-shrink-0 flex flex-col mx-8 md:mx-14"
        >
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium text-neutral-black tracking-[-0.04em]">
              {stat.value}
            </span>
            {stat.suffix && (
              <span className="font-sans text-base md:text-lg text-neutral-500">
                {stat.suffix}
              </span>
            )}
          </div>
          <span className="font-sans text-[11px] md:text-xs text-neutral-400 mt-2">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function StatsMarquee() {
  return (
    <section className="border-t border-b border-neutral-200 overflow-hidden py-8 md:py-10 bg-white">
      <div
        className="flex animate-marquee w-fit"
        style={{ animationDuration: "35s" }}
      >
        <MarqueeRow />
        <MarqueeRow />
        <MarqueeRow />
        <MarqueeRow />
        <MarqueeRow />
      </div>
    </section>
  );
}

const VELOCITY_PROBLEMS = [
  {
    number: "01",
    title: "Pre-Launch Misalignment",
    description:
      "Multiple agencies. Diluted positioning. Delayed market entry.",
  },
  {
    number: "02",
    title: "Channel Dilution",
    description:
      "Over-reliance on brokers reduces margins and distorts brand narrative.",
  },
  {
    number: "03",
    title: "Experience Gaps",
    description:
      "Marketing promises don't match on-ground sales experience — eroding buyer trust.",
  },
];

function VelocitySection() {
  return (
    <section className="bg-white">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12 lg:gap-28">
          {/* Left — sticky */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-neutral-black leading-[1.1] tracking-[-0.04em]">
              Why projects lose velocity.
            </h2>
          </div>

          {/* Right — scrolling numbered cards */}
          <div className="flex flex-col border-l border-neutral-200 pl-10 lg:pl-14">
            {VELOCITY_PROBLEMS.map((problem, i) => (
              <div
                key={problem.number}
                className="grid grid-cols-[70px_1fr] gap-10 py-10 md:py-14"
                style={{
                  borderTop: i === 0 ? "1px solid #E0E0E0" : "none",
                  borderBottom: "1px solid #E0E0E0",
                }}
              >
                <span className="font-serif text-4xl md:text-5xl font-light text-neutral-200 leading-none tracking-[-0.02em]">
                  {problem.number}
                </span>
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl font-semibold text-neutral-black leading-[1.15] tracking-[-0.03em] mb-3">
                    {problem.title}
                  </h3>
                  <p className="font-sans text-[14px] text-neutral-500 leading-relaxed max-w-md">
                    {problem.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const WHY_CHOOSE_ITEMS = [
  {
    title: "Full-Stack Accountability",
    description:
      "As a single operating partner across positioning, marketing, sales, and execution, Credvest eliminates vendor coordination and narrative misalignment. One aligned team means faster decisions, fewer compromises, and complete ownership from launch to sell-out.",
  },
  {
    title: "Sales is treated as an operational system, not brokerage",
    description:
      "We build structured pipelines with defined stages, conversion metrics, and channel discipline — not ad-hoc broker networks.",
  },
  {
    title: "Real-time performance tracking and reporting",
    description:
      "Every mandate runs on live dashboards with weekly reviews, pipeline visibility, and data-backed course corrections.",
  },
  {
    title: "Long-term mandate partnerships",
    description:
      "We don't chase transactions. We commit to full project lifecycles — aligning incentives with the developer's success.",
  },
  {
    title: "City Depth",
    description:
      "Deep micro-market expertise in Bangalore and Hyderabad with ground teams, channel networks, and buyer databases built over a decade.",
  },
];

function WhyChooseSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [highlightStyle, setHighlightStyle] = useState<{
    top: number;
    height: number;
  }>({ top: 0, height: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = accordionRefs.current[activeIndex];
    const container = sectionRef.current;
    if (!el || !container) return;
    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setHighlightStyle({
      top: elRect.top - containerRect.top,
      height: elRect.height,
    });
  }, [activeIndex]);

  return (
    <section className="  overflow-hidden">
      <div
        ref={sectionRef}
        className="relative max-w-[1600px] mx-auto px-8 lg:px-12 py-20 md:py-32"
      >
        {/* Active highlight band — extends to the right edge from container */}
        <div
          className="absolute transition-all duration-300 ease-out pointer-events-none"
          style={{
            top: highlightStyle.top,
            height: highlightStyle.height,
            left: 0,
            right: "-100vw",
            backgroundColor: "color-mix(in srgb, var(--color-brand) 6%, transparent)",
          }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand mb-4 block font-sans">
              Customer Agent
            </span>
            <h2 className="font-serif text-3xl md:text-[2.6rem] font-medium text-neutral-black leading-[1.12] tracking-[-0.04em] mb-5">
              Why result-focused Developers Choose Credvest.
            </h2>
            <p className="font-sans text-[14px] text-neutral-500 leading-relaxed mb-10 max-w-md">
              Give your team the tools to move faster, stay on brand, and scale
              content across every channel and market.
            </p>

            {/* Accordion */}
            <div className="flex flex-col">
              {WHY_CHOOSE_ITEMS.map((item, i) => {
                const isActive = activeIndex === i;
                return (
                  <div
                    key={item.title}
                    ref={(el) => {
                      accordionRefs.current[i] = el;
                    }}
                    className={`cursor-pointer border-b ${isActive ? "border-brand" : "border-neutral-200"} transition-colors`}
                    onClick={() => setActiveIndex(i)}
                  >
                    <div className="py-4">
                      <div>
                        <h4
                          className={`font-serif text-base md:text-lg font-semibold tracking-[-0.02em] transition-colors ${
                            isActive ? "text-neutral-black" : "text-neutral-500"
                          }`}
                        >
                          {item.title}
                        </h4>
                        {isActive && (
                          <div className="mt-3">
                            <p className="font-sans text-[13px] text-neutral-500 leading-relaxed mb-3">
                              {item.description}
                            </p>
                            <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-brand cursor-pointer hover:text-brand-600 transition-colors">
                              Learn More
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — image */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <Image
                src="/bg1.png"
                alt="Team collaboration"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Inside Credvest Grid ── */

function TextCard({
  bg,
  title,
  desc,
  person,
  role,
}: {
  bg: string;
  title: string;
  desc: string;
  person: string;
  role: string;
}) {
  return (
    <div
      className="flex flex-col justify-between h-full"
      style={{ backgroundColor: bg, minHeight: 320 }}
    >
      <div>
        <div className="px-2 pt-2 pb-3 border-b" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
          <h3 className="font-serif text-2xl md:text-3xl font-semibold text-neutral-black tracking-[-0.02em] leading-[1.1]">
            {title}
          </h3>
        </div>
        <div className="px-2 pt-3">
          <p className="font-sans text-[14px] font-semibold tracking-tight text-neutral-700  max-w-[260px]">
            {desc}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between px-2 pb-2">
        <p className="font-serif text-2xl tracking-tight   font-regular text-neutral-black tracking-[-0.01em]">
          {person}
          {role && <span className="text-neutral-400">, {role}</span>}
        </p>
        <span className="text-neutral-400">
          <ArrowRight />
        </span>
      </div>
    </div>
  );
}

function BigCard({
  desc,
  person,
  role,
}: {
  desc?: string;
  person: string;
  role: string;
}) {
  return (
    <div
      className="flex h-full p-2"
      style={{ backgroundColor: "#F1F2EE", minHeight: 320 }}
    >
      <div className="relative w-[40%] flex-shrink-0 overflow-hidden">
        <Image src="/bg1.png" alt={person} fill className="object-cover" />
      </div>
      <div className="flex flex-col justify-between flex-1 pl-5 pr-3 py-3">
        <p className="font-sans tracking-tight text-[18px]  font-semibold text-neutral-800 leading-relaxed">
          {desc}
        </p>
        <div className="flex items-center justify-between mt-4">
          <p className="font-serif text-lg md:text-xl font-medium text-neutral-black tracking-[-0.01em]">
            {person}
            {role && <span className="text-neutral-400">, {role}</span>}
          </p>
          <span className="text-neutral-400">
            <ArrowRight />
          </span>
        </div>
      </div>
    </div>
  );
}

function InsideCredvestSection() {
  return (
    <section className="bg-white">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 py-20 md:py-32">
        <div className="text-center mb-14">
          <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand mb-4 block font-sans">
            Inside Credvest
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-neutral-black leading-[1.12] tracking-[-0.04em] mb-6">
            Built by people who run
            <br />
            real estate sales at scale.
          </h2>
          <a
            href="/careers"
            className="inline-flex items-center gap-3 group w-fit mx-auto"
          >
            <span className="flex items-center justify-center w-9 h-9 bg-brand text-white transition-colors group-hover:bg-brand-600">
              <ArrowRight />
            </span>
            <span className="text-[13px] font-semibold text-neutral-black">
              Explore Careers
            </span>
          </a>
        </div>

        {/* 3 rows with alternating 50/50 layout */}
        <div className="flex flex-col gap-5">
          {/* Row 1: [small + small] | [BIG] */}
          <div className="flex flex-col md:flex-row gap-5">
            <div className="md:flex-1 flex flex-col md:flex-row gap-5">
              <div className="flex-1">
                <TextCard
                  bg="var(--color-pastel-green)"
                  title="Sales is consulting"
                  desc="Guiding buyers through decisions, not pushing inventory."
                  person="Sales Department"
                  role=""
                />
              </div>
              <div className="flex-1">
                <TextCard
                  bg="var(--color-pastel-blue)"
                  title="Pipeline visibility"
                  desc="Data-driven sales tracking that improves outcomes."
                  person="Bhavya"
                  role="GM"
                />
              </div>
            </div>
            <div className="md:flex-1">
              <BigCard
                desc={"\u201CEvery interaction is a chance to build trust and move the deal forward with clarity.\u201D"}
                person="Roopesh"
                role="Direct Sales"
              />
            </div>
          </div>

          {/* Row 2: [BIG] | [small + small] */}
          <div className="flex flex-col md:flex-row gap-5">
            <div className="md:flex-1">
              <BigCard
                desc={"\u201CWhat sets Credvest apart is how marketing, sales, and investments work together as one system.\u201D"}
                person="Neeti A"
                role="AGM, Marketing"
              />
            </div>
            <div className="md:flex-1 flex flex-col md:flex-row gap-5">
              <div className="flex-1">
                <TextCard
                  bg="var(--color-pastel-pink)"
                  title="Client support"
                  desc="From planning to problem-solving, every step is handled."
                  person="Dharti"
                  role="Sales"
                />
              </div>
              <div className="flex-1">
                <TextCard
                  bg="var(--color-pastel-yellow)"
                  title="1 year growth"
                  desc="From trainee to senior role through structured learning."
                  person="Aishwarya"
                  role="Sales"
                />
              </div>
            </div>
          </div>

          {/* Row 3: [small + small] | [BIG] */}
          <div className="flex flex-col md:flex-row gap-5">
            <div className="md:flex-1 flex flex-col md:flex-row gap-5">
              <div className="flex-1">
                <TextCard
                  bg="var(--color-pastel-green)"
                  title="People first"
                  desc="Performance, ideas, and effort are genuinely rewarded."
                  person="Roopesh"
                  role="HR"
                />
              </div>
              <div className="flex-1">
                <TextCard
                  bg="#F5F5F5"
                  title="Market learning"
                  desc="Training that builds deep real estate understanding."
                  person="Nikhil"
                  role="AGM"
                />
              </div>
            </div>
            <div className="md:flex-1">
              <BigCard
                desc={"\u201CProviding visibility into the sales pipeline supports better decisions and better client outcomes.\u201D"}
                person="RANDOM COMPANY"
                role=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const CITY_DATA: Record<
  string,
  {
    stats: { value: string; label: string }[];
    descriptions: string[];
    tagline: string;
  }
> = {
  Bangalore: {
    stats: [
      { value: "100+", label: "Projects Served" },
      { value: "3.2x", label: "Average Sales Velocity Improvement" },
      { value: "₹4,200+ Cr", label: "Transaction Value Managed" },
    ],
    descriptions: [
      "Residential & mixed-use developments across key micro-markets.",
      "Across structured sales and exclusive mandates.",
    ],
    tagline:
      "Structured systems drive predictable conversion and margin protection.",
  },
  Hyderabad: {
    stats: [
      { value: "60+", label: "Projects Served" },
      { value: "2.8x", label: "Average Sales Velocity Improvement" },
      { value: "₹2,800+ Cr", label: "Transaction Value Managed" },
    ],
    descriptions: [
      "Rapid expansion across West and East Hyderabad corridors.",
      "Full-stack mandate coverage from positioning to closure.",
    ],
    tagline:
      "Deep channel networks and micro-market intelligence driving scale.",
  },
};

function MandatesSection() {
  const [activeCity, setActiveCity] = useState<string>("Bangalore");
  const data = CITY_DATA[activeCity];

  return (
    <section className="">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-20 md:py-32">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand mb-4 block font-sans">
            Measured outcomes
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-neutral-black leading-[1.12] tracking-[-0.04em] mb-8">
            Performance Across
            <br />
            Active Mandates
          </h2>

          {/* City tabs */}
          <div className="inline-flex rounded-sm overflow-hidden   bg-[#F4F4F1] p-[3px]">
            {Object.keys(CITY_DATA).map((city) => (
              <button
                key={city}
                onClick={() => setActiveCity(city)}
                className={`px-7 py-2.5 text-[13px] font-serif font-semibold transition-colors ${
                  activeCity === city
                    ? "bg-brand text-white"
                    : "  text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Content — flex-based layout */}
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Globe card */}
          <div
            className="p-5 flex flex-col justify-between lg:w-[420px] lg:flex-shrink-0 min-h-[460px] rounded-sm"
            style={{ backgroundColor: "#F4F4F1" }}
          >
            <div className="flex-1 flex items-center justify-center">
              <Image
                src="/globe.png"
                alt="Globe"
                width={460}
                height={460}
                className="opacity-80"
              />
            </div>
            <h3 className="font-serif text-3xl md:text-4xl font-medium text-brand tracking-[-0.03em] mt-4">
              {activeCity}
            </h3>
          </div>

          {/* Right section */}
          <div className="flex flex-col gap-5 flex-1">
            {/* Top row: 100+ card | right stack (3.2x + ₹4,200+) */}
            <div className="flex flex-col md:flex-row gap-5 flex-1">
              {/* 100+ card */}
              <div
                className="p-5 flex flex-col justify-between rounded-sm md:flex-1"
                style={{ backgroundColor: "#F4F4F1" }}
              >
                <div>
                  <span className="font-serif text-5xl md:text-6xl font-medium text-neutral-black tracking-[-0.03em]">
                    {data.stats[0].value}
                  </span>
                  <p className="font-sans text-lg font-semibold text-neutral-black mt-2">
                    {data.stats[0].label}
                  </p>
                </div>
                <p className="font-sans text-base  tracking-tight text-neutral-600 leading-relaxed mt-8 max-w-[260px]">
                  {data.descriptions[0]}
                </p>
              </div>

              {/* Right stack: 3.2x on top, ₹4,200+ below */}
              <div className="flex flex-col gap-5 md:flex-1">
                {/* 3.2x — flex row layout */}
                <div
                  className="p-5 flex items-center justify-between gap-4 rounded-sm"
                  style={{ backgroundColor: "#F4F4F1" }}
                >
                  <span className="font-serif text-5xl md:text-6xl font-medium text-neutral-black tracking-[-0.03em]">
                    {data.stats[1].value}
                  </span>
                  <p className="font-sans text-lg font-semibold text-neutral-black max-w-[200px] text-right">
                    {data.stats[1].label}
                  </p>
                </div>

                {/* ₹4,200+ Cr — stacked vertically */}
                <div
                  className="p-5 flex flex-col justify-between rounded-sm flex-1"
                  style={{ backgroundColor: "#F4F4F1" }}
                >
                  <div>
                    <span className="font-serif text-5xl md:text-6xl font-medium text-neutral-black tracking-[-0.03em]">
                      {data.stats[2].value}
                    </span>
                    <p className="font-sans text-lg font-semibold text-neutral-black mt-2">
                      {data.stats[2].label}
                    </p>
                  </div>
                  <p className="font-sans text-base  text-neutral-600 tracking-tight mt-6 max-w-[220px]">
                    {data.descriptions[1]}
                  </p>
                </div>
              </div>
            </div>

            {/* Tagline row */}
            <div
              className="p-5 rounded-sm"
              style={{ backgroundColor: "#F4F4F1" }}
            >
              <p className="font-serif text-2xl md:text-2xl font-medium text-neutral-black tracking-[-0.02em]  ">
                {data.tagline}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhilosophySection() {
  return (
    <section className="bg-white border-t border-b border-dashed border-neutral-200">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase bg-brand text-white px-2 py-1 mb-5 inline-block font-sans">
              Operating Philosophy
            </span>
            <h2 className="font-serif text-3xl md:text-[2.8rem] font-medium text-neutral-black leading-[1.12] tracking-[-0.04em]">
              Structured growth begins with structured execution.
            </h2>
          </div>

          {/* Right */}
          <div className="flex flex-col justify-center gap-6">
            <p className="font-sans text-[14px] text-neutral-500 leading-relaxed">
              Credvest works as an extended arm of developers, managing every
              stage of the sales lifecycle — from project positioning and launch
              planning to on-ground execution, channel management, and customer
              closure.
            </p>
            <p className="font-sans text-[14px] text-neutral-500 leading-relaxed">
              Instead of multiple vendors handling disconnected pieces, we bring
              structure, ownership, and continuity to how real estate projects
              are taken to market and sold.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const FAQ_ITEMS = [
  {
    question: "What types of projects does Credvest work with?",
    answer:
      "We work across residential, commercial, and mixed-use developments. Our mandate model is designed for projects that require structured sales operations — from pre-launch positioning through to final unit closure.",
  },
  {
    question: "How does the mandate model differ from traditional brokerage?",
    answer:
      "Unlike brokerage, we don't operate on a per-deal basis. Credvest takes on complete project mandates — managing the full sales cycle with dedicated teams, structured systems, and ongoing performance accountability.",
  },
  {
    question: "What markets does Credvest currently operate in?",
    answer:
      "We are currently active across Bangalore and Hyderabad, with deep micro-market expertise in both cities. Our expansion plans include additional Tier-1 and Tier-2 cities based on developer demand.",
  },
  {
    question: "Can Credvest integrate with our existing sales processes?",
    answer:
      "Yes. We work as an extension of your team, not a replacement. Our systems are designed to layer on top of your existing processes while adding structure, tracking, and execution discipline.",
  },
  {
    question: "How is performance tracked and reported?",
    answer:
      "We provide real-time dashboards and periodic reports covering lead flow, conversion rates, channel performance, and revenue milestones — giving developers full visibility into sales operations.",
  },
];

function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section className="">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase bg-brand text-white px-2 py-1 mb-5 inline-block font-sans">
              Faqs
            </span>
            <h2 className="font-serif text-3xl md:text-[2.8rem] font-medium text-neutral-black leading-[1.12] tracking-[-0.04em] mb-4">
              Frequently asked
              <br />
              questions
            </h2>
            <p className="font-sans text-[14px] text-neutral-500 leading-relaxed mb-10 max-w-sm">
              Find answers to your questions about our real estate operations
              and mandate model.
            </p>

            {/* Contact box */}
            <div className="bg-white border border-neutral-200 p-5 flex items-center justify-between gap-4 max-w-sm">
              <div>
                <p className="font-sans text-[14px] font-semibold text-neutral-black">
                  Still have questions?
                </p>
                <p className="font-sans text-[12px] text-neutral-400">
                  We&apos;re here to help you!
                </p>
              </div>
              <button className="bg-brand text-white font-sans text-[13px] font-semibold px-5 py-2.5 hover:bg-brand-600 transition-colors flex-shrink-0">
                Contact Us
              </button>
            </div>
          </div>

          {/* Right — Accordion */}
          <div className="flex flex-col">
            {FAQ_ITEMS.map((item, i) => {
              const isActive = activeIndex === i;
              return (
                <div
                  key={item.question}
                  className="border-t border-neutral-200 last:border-b"
                >
                  <button
                    onClick={() => setActiveIndex(isActive ? -1 : i)}
                    className="w-full py-5 flex items-start justify-between gap-4 text-left"
                  >
                    <h4 className="font-sans text-[15px] md:text-base font-medium text-neutral-black">
                      {item.question}
                    </h4>
                    <span className="text-neutral-400 text-xl flex-shrink-0 leading-none mt-0.5">
                      {isActive ? "×" : "+"}
                    </span>
                  </button>
                  {isActive && (
                    <div className="pb-5">
                      <p className="font-sans text-[13px] text-neutral-500 leading-relaxed max-w-lg">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className=" relative overflow-hidden">
      {/* Grid overlay */}
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
            className="font-semibold text-stroke-brand"
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

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-neutral-black font-sans">
      <Navbar />
      <HeroSection />
      <DescriptionSection />
      <GrowthSystemSection />
      <StatsMarquee />
      <VelocitySection />
      <WhyChooseSection />
      <InsideCredvestSection />
      <MandatesSection />
      <PhilosophySection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
