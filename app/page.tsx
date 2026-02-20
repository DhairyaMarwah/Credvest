"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { DitherShader } from "@/components/dither-shader";

const STAGES = [
  { number: "01", title: "Branding", sectionId: "stage-branding" },
  { number: "02", title: "Marketing", sectionId: "stage-marketing" },
  { number: "03", title: "Sales", sectionId: "stage-sales" },
  { number: "04", title: "Post Sales", sectionId: "stage-post-sales" },
];

const GROWTH_CARDS = [
  {
    id: "stage-branding",
    title: "Your Brand, Our Team",
    subtitle: "Branding",
    description:
      "Before anything goes to market, we define what the project stands for. Who it\u2019s for, how it\u2019s different, where it sits. Our people carry the developer\u2019s identity, not ours. Every interaction a buyer has feels like the developer\u2019s organisation.",
    bg: "var(--color-pastel-blue)",
    image: "/bg1.png",
  },
  {
    id: "stage-marketing",
    title: "Marketing",
    subtitle: "Marketing",
    description:
      "Brand, narrative, demand generation \u2014 managed by the same team that set the positioning. Every rupee spent is tracked against qualified walk-ins, site visits, and conversions. The story stays consistent because nobody has to translate it secondhand.",
    bg: "var(--color-pastel-yellow)",
    image: "/bg1.png",
  },
  {
    id: "stage-sales",
    title: "Sales / Velocity",
    subtitle: "Sales",
    description:
      "Dedicated teams, trained on your product, deployed to your project. We guarantee higher velocity \u2014 the number of units sold each month. Sales is a system here. Structured, tracked, reviewed. Not dependent on channel partners.",
    bg: "var(--color-pastel-green)",
    image: "/bg1.png",
  },
  {
    id: "stage-post-sales",
    title: "Post Sales",
    subtitle: "Post Sales",
    description:
      "Structured handover, documentation, CRM management, and follow-up ensure buyer satisfaction and referral generation. The relationship doesn\u2019t end at closure \u2014 it compounds into advocacy.",
    bg: "var(--color-pastel-pink)",
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!imageWrapperRef.current || !heroRef.current) return;

      const scrollY = window.scrollY;
      const windowWidth = window.innerWidth;
      const containerWidth = Math.min(1600, windowWidth - 96);
      const containerPct = (containerWidth / windowWidth) * 100;
      const scrollRange = 500;

      const progress = Math.min(scrollY / scrollRange, 1);
      const isMob = windowWidth < 768;
      const width = isMob ? 100 : 100 - progress * (100 - containerPct);
      const scale = isMob ? 1 : 1 + progress * 0.15;

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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-end pt-20 md:pt-44 pb-12 md:pb-28">
          <div>
            <h1 className="font-serif text-[clamp(2.8rem,5.8vw,5.5rem)] font-semibold text-neutral-black leading-[1.08] tracking-[-0.07em]">
              Real estate&apos;s{" "}
              <span className="font-semibold text-stroke-brand">most</span>{" "}
              <span className="font-semibold text-stroke-brand">trusted</span>{" "}
              strategy partner
            </h1>
          </div>

          <div className="flex flex-col gap-6 pb-2">
            <p className="text-[13px] text-neutral-500 leading-relaxed max-w-[280px]">
              We build and run the systems that move projects from launch to
              sell-out — with discipline, structure, and direct accountability.
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

      {/* Full-bleed image — shrinks on scroll (desktop: width, mobile: height) */}
      <div
        ref={imageWrapperRef}
        className="relative z-10 mx-auto"
        style={{ width: `${imageWidth}%` }}
      >
        <div
          className="relative w-full overflow-hidden"
          style={isMobile ? { height: "110vh" } : { aspectRatio: "16/9" }}
        >
          <Image
            src="/bg1.png"
            alt="Aerial view of a modern city intersection"
            fill
            className="object-cover transition-transform duration-100 ease-out"
            style={{ transform: `scale(${imageScale})` }}
            priority
          />

          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Overlay content inside the image */}
          <div className="absolute inset-x-0 bottom-0 z-20 px-3 md:px-10 pb-3 md:pb-10">
            {/* Headline */}
            <div className="pb-3 md:pb-5">
              <h2 className="font-sans text-[2.5rem] md:text-[clamp(1.5rem,3.5vw,2.8rem)] font-medium text-white leading-[0.95] md:leading-[1.15] tracking-[-0.06em] md:tracking-[-0.05em]">
                <span className="md:hidden">
                  One system.
                  <br />
                  Four stages.
                </span>
                <span className="hidden md:inline">
                  One system. Four stages.
                </span>
              </h2>
            </div>

            {/* Stage cards */}
            <div className="border-t border-white/30 pt-3 md:pt-5 mb-3 md:mb-5" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-[5px] md:gap-[10px]">
              {STAGES.map((stage) => (
                <button
                  key={stage.title}
                  onClick={() => {
                    const el = document.getElementById(stage.sectionId);
                    if (el)
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="bg-white px-3 py-3 md:px-5 md:py-5 flex flex-col justify-between min-h-[90px] md:min-h-[120px] group cursor-pointer hover:bg-neutral-50 transition-colors text-left"
                >
                  <span className="text-[11px] text-neutral-400 font-sans tracking-wider">
                    [ {stage.number} ]
                  </span>
                  <div className="flex items-end justify-between mt-auto">
                    <span className="font-sans text-lg md:text-xl font-medium tracking-[-0.04em] text-neutral-black group-hover:text-brand transition-colors">
                      {stage.title}
                    </span>
                    <ArrowDown className="text-neutral-400 group-hover:text-neutral-black transition-colors" />
                  </div>
                </button>
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
          Taking a project from readiness to sell-out requires sustained
          coordination across branding, marketing, sales, and post-sales.
          Credvest consolidates that into a single mandate. One team. One
          system. Full accountability.
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
              What We Do
            </span>
            <h2 className="font-serif text-3xl md:text-[2.8rem] font-semibold text-neutral-black leading-[1.12] tracking-[-0.07em] mb-5">
              Why developers choose Credvest.
            </h2>
            <p className="font-sans text-[14px] text-neutral-500 leading-relaxed mb-8">
              Built by people who have spent a decade inside real estate. Every
              project runs through the same framework. Four stages, one team,
              full ownership.
            </p>
            <Link
              href="/how-we-work"
              className="flex items-center gap-3 group w-fit"
            >
              <span className="flex items-center justify-center w-9 h-9 bg-brand text-white transition-colors group-hover:bg-brand-600">
                <ArrowRight />
              </span>
              <span className="text-[13px] font-semibold text-neutral-black">
                How We Work
              </span>
            </Link>
          </div>

          {/* Right — scrolling cards */}
          <div className="flex flex-col gap-6">
            {GROWTH_CARDS.map((card) => (
              <div
                key={card.title}
                id={card.id}
                className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-0 overflow-hidden scroll-mt-24"
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
                  <div>
                    <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand mb-2 block font-sans">
                      {card.subtitle}
                    </span>
                    <h3 className="font-serif text-xl md:text-2xl font-semibold text-neutral-black leading-[1.2] tracking-[-0.04em]">
                      {card.title}
                    </h3>
                  </div>
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
  { value: "10", suffix: "Yr.", label: "Developer Partnerships" },
  { value: "5,000+", label: "Customers Trust Us" },
  { value: "\u20B98,000", suffix: "Cr", label: "Transactions Managed" },
  { value: "10", suffix: "Mn Sq Ft", label: "Real Estate Managed" },
  { value: "5+", label: "Cities Serviced" },
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
            <span className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-neutral-black tracking-[-0.07em]">
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
      "Too many vendors. Too many narratives. By the time the project reaches the market, the first impression is already compromised.",
  },
  {
    number: "02",
    title: "Fragmented Ownership",
    description:
      "When branding, marketing, and sales sit with different teams carrying different incentives, the buyer experience fractures. Nobody owns the full picture.",
  },
  {
    number: "03",
    title: "Experience Gaps",
    description:
      "What the collateral promises and what the buyer encounters on the ground don\u2019t match. That gap is where trust is lost. Deals follow.",
  },
];

function VelocitySection() {
  return (
    <section className="bg-white">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12 lg:gap-28">
          {/* Left — sticky */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-neutral-black leading-[1.1] tracking-[-0.07em]">
              Why projects lose velocity.
            </h2>
            <p className="font-sans text-[14px] text-neutral-500 leading-relaxed mt-5 max-w-sm">
              Most projects don&apos;t underperform because of the product. They
              underperform because the system behind the sale was never properly
              built.
            </p>
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
                <span className="font-serif text-4xl md:text-5xl font-light text-neutral-200 leading-none tracking-[-0.04em]">
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
    title: "Single-Point Accountability",
    description:
      "Most developers coordinate four or five vendors to take a project to market. Each runs its own process. Each reports on its own terms. We replace that with one team. Branding, marketing, sales, post-sales. One reporting line, one set of standards.",
  },
  {
    title: "Sales treated as a discipline",
    description:
      "Sales here is built as a structured system. Dedicated teams, defined processes, real-time accountability. A different model entirely.",
  },
  {
    title: "Dedicated teams on every project",
    description:
      "Each mandate gets its own people. Aligned to the project, embedded in the product, accountable to the numbers. Not rotated. Not shared.",
  },
  {
    title: "Real-time performance tracking",
    description:
      "Live pipeline data, weekly reviews, structured reporting. Developers see what\u2019s happening in real time, not in a monthly summary.",
  },
  {
    title: "Partnerships built on outcomes",
    description:
      "We don\u2019t chase transactions. We commit to full project lifecycles \u2014 aligning incentives with the developer\u2019s success.",
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
            backgroundColor:
              "color-mix(in srgb, var(--color-brand) 6%, transparent)",
          }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand mb-4 block font-sans">
              The Credvest Model
            </span>
            <h2 className="font-serif text-3xl md:text-[2.6rem] font-semibold text-neutral-black leading-[1.12] tracking-[-0.07em] mb-5">
              Single-Point Accountability
            </h2>
            <p className="font-sans text-[14px] text-neutral-500 leading-relaxed mb-10 max-w-md">
              Most developers coordinate four or five vendors to take a project
              to market. We replace that with one team. When something needs to
              change, it changes the same week.
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
                    className={`cursor-pointer border-b ${isActive ? "border-brand" : "border-brand/20"} transition-colors`}
                    onClick={() => setActiveIndex(i)}
                  >
                    <div className="py-4">
                      <div>
                        <h4
                          className={`font-serif text-base md:text-xl font-semibold tracking-[-0.04em] transition-colors ${
                            isActive ? "text-neutral-black" : "text-black/90"
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
        <div
          className="px-2 pt-2 pb-3 border-b"
          style={{ borderColor: "rgba(0,0,0,0.08)" }}
        >
          <h3 className="font-serif text-2xl md:text-3xl font-semibold text-neutral-black tracking-[-0.04em] leading-[1.1]">
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

const BIG_CARD_IMAGES = [
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
];

function BigCard({
  desc,
  person,
  role,
  imgSrc,
}: {
  desc?: string;
  person: string;
  role: string;
  imgSrc: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex h-full p-2 cursor-pointer"
      style={{ backgroundColor: "#F1F2EE", minHeight: 320 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-[40%] flex-shrink-0 overflow-hidden">
        <Image
          src={imgSrc}
          alt={person}
          fill
          className={`object-cover transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`}
          sizes="20vw"
        />
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${hovered ? "opacity-0" : "opacity-100"}`}
        >
          <DitherShader
            src={imgSrc}
            gridSize={2}
            ditherMode="bayer"
            colorMode="duotone"
            invert={false}
            animated={false}
            primaryColor="#1a1a1a"
            secondaryColor="#f0e0d4"
            threshold={0.5}
            className="absolute inset-0"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between flex-1 pl-5 pr-3 py-3">
        <p className="font-sans tracking-tight text-[18px] font-semibold text-neutral-800 leading-relaxed">
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
      <div className="max-w-[1200px] mx-auto px-8 lg:px-12 py-20 md:py-32">
        <div className="text-center mb-14">
          <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand mb-4 block font-sans">
            Our People
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-neutral-black leading-[1.12] tracking-[-0.07em] mb-4 max-w-2xl mx-auto">
            Built by people who run real estate sales at scale.
          </h2>
          <p className="font-sans text-[14px] text-neutral-500 leading-relaxed max-w-md mx-auto mb-6">
            Disciplined, ambitious, and growing. If that&apos;s the kind of
            place you work well in, we should talk.
          </p>
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
                  desc="Guiding decisions, not moving inventory. Trust converts better than pressure."
                  person="Sales Department"
                  role=""
                />
              </div>
              <div className="flex-1">
                <TextCard
                  bg="var(--color-pastel-blue)"
                  title="Pipeline visibility"
                  desc="Pipeline visibility isn't a reporting feature. It's how better decisions get made."
                  person="Bhavya"
                  role="GM"
                />
              </div>
            </div>
            <div className="md:flex-1">
              <BigCard
                imgSrc={BIG_CARD_IMAGES[0]}
                desc={
                  "\u201COur focus isn\u2019t just on selling. It\u2019s on guiding clients through their decision as consultants, not salespeople.\u201D"
                }
                person="Bhavya"
                role="GM, Sales"
              />
            </div>
          </div>

          {/* Row 2: [BIG] | [small + small] */}
          <div className="flex flex-col md:flex-row gap-5">
            <div className="md:flex-1">
              <BigCard
                imgSrc={BIG_CARD_IMAGES[1]}
                desc={
                  "\u201CWhat sets this apart is how branding, marketing, and sales actually function as one system.\u201D"
                }
                person="Neeti A"
                role="AGM, Marketing"
              />
            </div>
            <div className="md:flex-1 flex flex-col md:flex-row gap-5">
              <div className="flex-1">
                <TextCard
                  bg="var(--color-pastel-pink)"
                  title="1 year growth"
                  desc="Trainee to senior role in under a year. Live project experience from day one."
                  person="Aishwarya"
                  role="Sales"
                />
              </div>
              <div className="flex-1">
                <TextCard
                  bg="var(--color-pastel-yellow)"
                  title="Market learning"
                  desc="The training here builds market understanding, not just process fluency."
                  person="Nikhil"
                  role="AGM"
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
                  desc="Good work gets noticed. People are given real responsibility early, not after a waiting period."
                  person="Roopesh"
                  role="HR"
                />
              </div>
              <div className="flex-1">
                <TextCard
                  bg="#F5F5F5"
                  title="Client support"
                  desc="Buying property is a considered decision. Our teams are trained to consult, not to close."
                  person="Dharti"
                  role="Sales"
                />
              </div>
            </div>
            <div className="md:flex-1">
              <BigCard
                imgSrc={BIG_CARD_IMAGES[2]}
                desc={
                  "\u201CPipeline visibility isn\u2019t a reporting feature. It\u2019s how better decisions get made.\u201D"
                }
                person="Roopesh"
                role="Direct Sales"
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
      { value: "3.2x", label: "Sales Velocity Improvement" },
      { value: "\u20B94,200+ Cr", label: "in Transactions" },
    ],
    descriptions: [
      "Residential and mixed-use developments across key micro-markets.",
      "Across structured sales and exclusive mandates.",
    ],
    tagline: "What structured execution looks like in practice.",
  },
  Hyderabad: {
    stats: [
      { value: "60+", label: "Projects Served" },
      { value: "2.8x", label: "Sales Velocity Improvement" },
      { value: "\u20B92,800+ Cr", label: "in Transactions" },
    ],
    descriptions: [
      "Active and expanding across West and East Hyderabad corridors.",
      "City-specific data available on request.",
    ],
    tagline: "Deep micro-market expertise driving scale.",
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
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-neutral-black leading-[1.12] tracking-[-0.07em] mb-8">
            Measured outcomes across
            <br />
            Active Mandates
          </h2>

          {/* City tabs */}
          <div className="inline-flex rounded-sm overflow-hidden   bg-[#F0F0F0] p-[3px]">
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
            style={{ backgroundColor: "#F0F0F0" }}
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
                style={{ backgroundColor: "#F0F0F0" }}
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
                  style={{ backgroundColor: "#F0F0F0" }}
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
                  style={{ backgroundColor: "#F0F0F0" }}
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
              style={{ backgroundColor: "#F0F0F0" }}
            >
              <p className="font-serif text-2xl md:text-2xl font-medium text-neutral-black tracking-[-0.04em]  ">
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
            <h2 className="font-serif text-3xl md:text-[2.8rem] font-semibold text-neutral-black leading-[1.12] tracking-[-0.07em]">
              One partner for the entire journey.
            </h2>
          </div>

          {/* Right */}
          <div className="flex flex-col justify-center gap-6">
            <p className="font-sans text-[14px] text-neutral-500 leading-relaxed">
              Taking a project from readiness to sell-out requires sustained
              coordination across branding, marketing, sales, and post-sales.
              Most developers manage this across multiple vendors, each working
              independently.
            </p>
            <p className="font-sans text-[14px] text-neutral-500 leading-relaxed">
              Credvest consolidates that into a single mandate. One team. One
              system. Full accountability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const FAQ_ITEMS = [
  {
    question: "How does Credvest work with developers?",
    answer:
      "As an extension of the developer\u2019s own team. We manage the sales lifecycle from branding through to post-sales, replacing what would otherwise be three or four separate vendors.",
  },
  {
    question: "Is Credvest a brokerage?",
    answer:
      "No. Sales here is built as a structured system. Dedicated teams, defined processes, real-time accountability. A different model entirely.",
  },
  {
    question: "Do your teams represent the developer\u2019s brand?",
    answer:
      "Yes. The buyer\u2019s experience is entirely within the developer\u2019s brand. Our involvement is behind the scenes.",
  },
  {
    question: "What cities are you in?",
    answer: "Bangalore and Hyderabad. Deep micro-market expertise in both.",
  },
  {
    question: "How do you track performance?",
    answer:
      "Live pipeline data, weekly reviews, structured reporting. Developers see what\u2019s happening in real time, not in a monthly summary.",
  },
  {
    question: "What kinds of projects do you take on?",
    answer:
      "Residential and commercial, at varying scales. We configure team size and systems to match the mandate.",
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
              FAQs
            </span>
            <h2 className="font-serif text-3xl md:text-[2.8rem] font-semibold text-neutral-black leading-[1.12] tracking-[-0.07em] mb-4">
              Common
              <br />
              Questions
            </h2>
            <p className="font-sans text-[14px] text-neutral-500 leading-relaxed mb-10 max-w-sm">
              Everything you need to know about how we work, what we do, and
              what makes this different.
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
        <h2 className="font-serif text-4xl md:text-[3.8rem] font-semibold text-neutral-black leading-[1.12] tracking-[-0.07em] mb-10">
          Let&apos;s talk about your{" "}
          <span className="font-semibold text-stroke-brand">next</span> <br />
          project.
        </h2>
        <Link
          href="/contact"
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
