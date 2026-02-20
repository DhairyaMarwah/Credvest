"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

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

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/* ── Data ── */

const STATS = [
  { value: "10+", label: "Years in Real Estate" },
  { value: "\u20B98,000 Cr", label: "Transactions Managed" },
  { value: "100+", label: "Projects Delivered" },
  { value: "5,000+", label: "Customers Served" },
  { value: "5+", label: "Cities Active" },
  { value: "10 Mn", label: "Sq Ft Managed" },
];

const PRINCIPLES = [
  {
    number: "01",
    title: "One team, not five vendors",
    description:
      "Most developers coordinate branding, marketing, sales, and post-sales across separate agencies. Each runs its own process. We consolidate all of it into one mandate, one team, one reporting line.",
  },
  {
    number: "02",
    title: "Systems, not stars",
    description:
      "Results come from the process, not from hoping the right person is in the room. Every stage of the sales cycle has a defined framework. Performance is tracked, reviewed, improved.",
  },
  {
    number: "03",
    title: "Direct accountability",
    description:
      "We don\u2019t layer vendors between the developer and the outcome. One team owns the entire lifecycle. When something needs to change, it changes the same week.",
  },
  {
    number: "04",
    title: "Partnerships, not transactions",
    description:
      "We commit to full project lifecycles. Our incentives are aligned with the developer\u2019s success \u2014 not with closing the next deal and moving on.",
  },
];

const MILESTONES = [
  {
    marker: "The Beginning",
    text: "Started with a single mandate in Bangalore. One developer, one project, one team. The thesis was simple: real estate sales could be run as a structured operation, not a broker network.",
  },
  {
    marker: "\u20B91,000 Cr",
    text: "Crossed a thousand crore in managed transactions. The system had proven itself across multiple micro-markets and project types. Developers started coming to us.",
  },
  {
    marker: "Hyderabad",
    text: "Expanded into Hyderabad with the same operating model. Proved the system was transferable \u2014 different city, same discipline, same results.",
  },
  {
    marker: "Today",
    text: "100+ projects. \u20B98,000 Cr in transactions. 5,000+ customers served. Two cities deep, more on the horizon. The platform is built. Now we\u2019re scaling it.",
  },
];

const ECOSYSTEM = [
  {
    label: "CREDVEST CORE",
    tagline: "Velocity to Value",
    description:
      "Structured sales execution across the project lifecycle. Dedicated teams, pipeline management, channel discipline, performance tracking, and margin protection \u2014 from first lead to final closure.",
    points: [
      "Dedicated project sales teams",
      "Structured pipeline management",
      "Real-time performance tracking",
      "Channel architecture & discipline",
    ],
  },
  {
    label: "CREDVEST EDGE",
    tagline: "Land to Launch",
    description:
      "Strategic positioning and market entry. Before sales begins, we define the narrative, build the brand presence, and create the conditions for velocity \u2014 so the project enters the market with clarity.",
    points: [
      "Market positioning & pricing strategy",
      "Brand narrative & storytelling",
      "Digital presence & demand generation",
      "Launch planning & experience design",
    ],
  },
];

const COMPANY_FAQS = [
  {
    question: "When was Credvest founded?",
    answer:
      "Credvest has been in the real estate space for over a decade, starting with a single mandate in Bangalore and growing into a full-stack strategy platform.",
  },
  {
    question: "What does \u201Cfull-stack\u201D mean in your context?",
    answer:
      "It means we handle the entire sales lifecycle \u2014 branding, marketing, sales, and post-sales \u2014 as a single team. Not separate vendors for each piece.",
  },
  {
    question: "How is Credvest different from a real estate agency?",
    answer:
      "Agencies typically broker deals. We operate as an extension of the developer\u2019s team with dedicated people, structured systems, and full accountability for outcomes.",
  },
  {
    question: "What types of developers do you work with?",
    answer:
      "Residential and commercial, at varying scales. From emerging developers to established groups. We configure team size and systems to match the mandate.",
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
              Built over a{" "}
              <span className="font-semibold text-stroke-brand">decade.</span>
              <br />
              Refined every day.
            </h1>
          </div>

          <div className="flex flex-col gap-6 pb-2">
            <p className="text-[13px] text-neutral-500 leading-relaxed max-w-[280px]">
              Credvest is an operating platform for real estate sales. We manage
              the full lifecycle for developers &mdash; positioning, marketing,
              sales, execution &mdash; as a single, accountable team.
            </p>
            <Link
              href="/contact"
              className="flex items-center gap-3 group w-fit"
            >
              <span className="flex items-center justify-center w-9 h-9 bg-brand text-white transition-colors group-hover:bg-brand-600">
                <ArrowRight />
              </span>
              <span className="text-[13px] font-semibold text-neutral-black">
                Work With Us
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Stats Marquee ── */

function MarqueeRow() {
  return (
    <div className="flex-shrink-0 flex">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="flex-shrink-0 flex flex-col mx-8 md:mx-14"
        >
          <span className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-neutral-black tracking-[-0.07em]">
            {stat.value}
          </span>
          <span className="font-sans text-[11px] md:text-xs text-neutral-400 mt-2">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function StatsSection() {
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

/* ── The Story ── */

function StorySection() {
  return (
    <section className="bg-white">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12 lg:gap-28">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand mb-4 block font-sans">
              Our Story
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-neutral-black leading-[1.1] tracking-[-0.07em]">
              One thesis. A decade of proof.
            </h2>
            <p className="font-sans text-[14px] text-neutral-500 leading-relaxed mt-5 max-w-sm">
              Real estate sales could be run as a structured operating system.
              Not a broker network. Not a collection of vendors. One team, one
              system, full accountability.
            </p>
          </div>

          <div className="flex flex-col">
            {MILESTONES.map((m, i) => (
              <div
                key={m.marker}
                className="grid grid-cols-[100px_1fr] md:grid-cols-[140px_1fr] gap-8 py-10 md:py-14"
                style={{
                  borderTop: i === 0 ? "1px solid #E0E0E0" : "none",
                  borderBottom: "1px solid #E0E0E0",
                }}
              >
                <span className="font-serif text-lg md:text-xl font-semibold text-brand tracking-[-0.01em]">
                  {m.marker}
                </span>
                <p className="font-sans text-[14px] text-neutral-600 leading-relaxed">
                  {m.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Leadership ── */

const LEADERSHIP = [
  { name: "Coming Soon", role: "Founder & CEO", image: null },
  { name: "Coming Soon", role: "Co-Founder & COO", image: null },
  { name: "Coming Soon", role: "Chief Business Officer", image: null },
];

function LeadershipSection() {
  return (
    <section className="bg-white border-t border-dashed border-neutral-200">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12 lg:gap-28">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand mb-4 block font-sans">
              Leadership
            </span>
            <h2 className="font-serif text-3xl md:text-[2.8rem] font-semibold text-neutral-black leading-[1.12] tracking-[-0.07em] mb-5">
              The people behind the system.
            </h2>
            <p className="font-sans text-[14px] text-neutral-500 leading-relaxed max-w-sm">
              A decade of real estate experience across sales, strategy,
              technology, and design. Meet the team building Credvest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-neutral-200">
            {LEADERSHIP.map((person) => (
              <div
                key={person.role}
                className="bg-white p-8 flex flex-col items-center text-center"
              >
                <div className="w-28 h-28 bg-neutral-100 mb-6 flex items-center justify-center">
                  <span className="text-neutral-300 text-[11px] font-sans tracking-wider uppercase">
                    Photo
                  </span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-neutral-black mb-1">
                  {person.name}
                </h3>
                <span className="font-sans text-[12px] text-neutral-400">
                  {person.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── How We Think — Principles ── */

function PrinciplesSection() {
  return (
    <section className="bg-white border-t border-dashed border-neutral-200">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-20 md:py-32">
        <div className="text-center mb-14">
          <span className="text-[11px] font-semibold tracking-[0.15em] uppercase bg-brand text-white px-2 py-1 mb-5 inline-block font-sans">
            How We Think
          </span>
          <h2 className="font-serif text-3xl md:text-[2.8rem] font-semibold text-neutral-black leading-[1.12] tracking-[-0.07em]">
            Not values on a wall.
            <br />
            How we actually operate.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-neutral-200">
          {PRINCIPLES.map((p) => (
            <div key={p.number} className="bg-white p-8 md:p-12">
              <span className="text-[11px] font-bold tracking-widest text-brand mb-4 block">
                {p.number}
              </span>
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-neutral-black mb-4 tracking-[-0.04em] leading-[1.15]">
                {p.title}
              </h3>
              <p className="font-sans text-[14px] text-neutral-500 leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── The Ecosystem — Core + Edge ── */

function EcosystemSection() {
  return (
    <section className="bg-white">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-20 md:py-32">
        <div className="text-center mb-14">
          <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand mb-4 block font-sans">
            The Platform
          </span>
          <h2 className="font-serif text-3xl md:text-[2.8rem] font-semibold text-neutral-black leading-[1.12] tracking-[-0.07em] mb-4">
            Two arms. One system.
          </h2>
          <p className="font-sans text-[14px] text-neutral-500 leading-relaxed max-w-lg mx-auto">
            From land advisory and positioning through sales execution and
            closure. The full lifecycle, under one roof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ECOSYSTEM.map((eco) => (
            <div
              key={eco.label}
              className="border border-neutral-200 p-8 md:p-10 flex flex-col"
            >
              <div className="mb-6">
                <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-brand block mb-2">
                  {eco.label}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-semibold text-neutral-black tracking-[-0.04em] leading-[1.1]">
                  {eco.tagline}
                </h3>
              </div>

              <p className="font-sans text-[14px] text-neutral-500 leading-relaxed mb-8">
                {eco.description}
              </p>

              <div className="mt-auto flex flex-col gap-3">
                {eco.points.map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-3 text-[13px] text-neutral-600"
                  >
                    <span className="w-1.5 h-1.5 bg-brand rounded-full flex-shrink-0" />
                    {point}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Cities ── */

function CitiesSection() {
  return (
    <section className="bg-white border-t border-dashed border-neutral-200">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand mb-4 block font-sans">
              Presence
            </span>
            <h2 className="font-serif text-3xl md:text-[2.8rem] font-semibold text-neutral-black leading-[1.12] tracking-[-0.07em]">
              Deep in two cities.
              <br />
              Building towards more.
            </h2>
          </div>

          <div className="flex flex-col justify-center gap-8">
            <div className="flex gap-8 md:gap-16">
              <div>
                <p className="font-serif text-2xl md:text-3xl font-semibold text-neutral-black tracking-[-0.04em]">
                  Bangalore
                </p>
                <p className="font-sans text-[13px] text-neutral-500 mt-1.5 leading-relaxed max-w-[220px]">
                  100+ projects across key micro-markets. Deep channel networks
                  and buyer databases built over a decade.
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl md:text-3xl font-semibold text-neutral-black tracking-[-0.04em]">
                  Hyderabad
                </p>
                <p className="font-sans text-[13px] text-neutral-500 mt-1.5 leading-relaxed max-w-[220px]">
                  Active and expanding across West and East corridors. Same
                  operating model, same discipline.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-200">
              <p className="font-sans text-[13px] text-neutral-400 leading-relaxed">
                Expansion plans include additional Tier-1 and Tier-2 cities
                based on developer demand and market readiness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ── */

function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section className="bg-white">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 lg:gap-24">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand mb-4 block font-sans">
              About Credvest
            </span>
            <h2 className="font-serif text-3xl md:text-[2.8rem] font-semibold text-neutral-black leading-[1.12] tracking-[-0.07em]">
              Common
              <br />
              Questions
            </h2>
          </div>

          <div className="flex flex-col">
            {COMPANY_FAQS.map((item, i) => {
              const isActive = activeIndex === i;
              return (
                <button
                  key={i}
                  onClick={() => setActiveIndex(isActive ? -1 : i)}
                  className={`text-left py-5 border-b transition-all ${
                    isActive ? "border-brand" : "border-neutral-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-6">
                    <h4
                      className={`font-serif text-lg font-semibold tracking-[-0.01em] transition-colors ${
                        isActive ? "text-neutral-black" : "text-neutral-500"
                      }`}
                    >
                      {item.question}
                    </h4>
                    <span
                      className={`flex-shrink-0 w-6 h-6 flex items-center justify-center text-neutral-400 transition-transform ${
                        isActive ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown />
                    </span>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isActive ? "max-h-40 mt-3" : "max-h-0"
                    }`}
                  >
                    <p className="text-[14px] text-neutral-500 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CTA ── */

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

/* ── Page ── */

export default function CompanyPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-black font-sans">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <StorySection />
      <LeadershipSection />
      <PrinciplesSection />
      <EcosystemSection />
      <CitiesSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
