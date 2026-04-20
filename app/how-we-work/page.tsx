"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CredvestEdgeSection } from "@/components/credvest-edge-section";

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

/* ── Tabbed Stages Data ── */

const PROCESS_TABS = [
  {
    label: "Branding & Strategy",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        className="text-brand"
      >
        <circle cx="24" cy="20" r="6" fill="currentColor" />
        <circle cx="14" cy="30" r="3" fill="currentColor" opacity="0.6" />
        <circle cx="34" cy="30" r="3" fill="currentColor" opacity="0.6" />
        <circle cx="8" cy="22" r="2" fill="currentColor" opacity="0.3" />
        <circle cx="40" cy="22" r="2" fill="currentColor" opacity="0.3" />
        <line
          x1="24"
          y1="20"
          x2="14"
          y2="30"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
        <line
          x1="24"
          y1="20"
          x2="34"
          y2="30"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
        <line
          x1="24"
          y1="20"
          x2="8"
          y2="22"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.3"
        />
        <line
          x1="24"
          y1="20"
          x2="40"
          y2="22"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.3"
        />
      </svg>
    ),
    headline: "Your brand, built with intent",
    description:
      "Before anything goes to market, we define what the project stands for. Who it\u2019s for, how it\u2019s different, where it sits against everything else. We sit with developers and tell them how to build, what to build, when to build.",
    points: [
      {
        title: "Market Positioning",
        text: "We benchmark micro-markets, pricing bands, absorption patterns, and buyer demand before defining launch strategy.",
      },
      {
        title: "Pricing Discipline",
        text: "We align pricing to sales-momentum goals while protecting long-term brand and margin integrity.",
      },
    ],
  },
  {
    label: "Marketing",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        className="text-brand"
      >
        <rect
          x="8"
          y="14"
          width="32"
          height="20"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M8 18l16 10 16-10" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    headline: "Consistent narrative, one team",
    description:
      "Brand, narrative, demand generation. Managed by the same team that set the positioning. The story stays consistent because nobody has to translate it secondhand.",
    points: [
      {
        title: "Performance Marketing",
        text: "Every rupee spent is tracked against qualified walk-ins, site visits, and conversions — not vanity metrics.",
      },
      {
        title: "ATL & BTL Campaigns",
        text: "We reach out to target customers at key touch points for visibility and awareness.",
      },
    ],
  },
  {
    label: "Sales",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        className="text-brand"
      >
        <path
          d="M12 36V20l12-8 12 8v16"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="20"
          y="28"
          width="8"
          height="8"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
    headline: "Dedicated teams, structured systems",
    description:
      "Dedicated teams, trained on your product, deployed to your project. Sales is a system here. Structured, tracked, reviewed. Not dependent on who happens to be on shift.",
    points: [
      {
        title: "Pipeline Management",
        text: "Every lead is tracked through a structured funnel with defined stages, follow-up protocols, and conversion targets.",
      },
      {
        title: "Customer Experience",
        text: "From first touchpoint to site visit, the buyer journey is designed, not improvised.",
      },
    ],
  },
  {
    label: "Post Sales",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        className="text-brand"
      >
        <circle
          cx="24"
          cy="24"
          r="14"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M18 24l4 4 8-8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    headline: "The relationship continues after closure",
    description:
      "Structured handover, documentation, CRM management, and buyer follow-up. The post-sales process ensures satisfaction, reduces cancellations, and drives referral generation.",
    points: [
      {
        title: "CRM & Documentation",
        text: "Complete buyer lifecycle management from agreement to possession, with structured touchpoints at every milestone.",
      },
      {
        title: "Retention & Referrals",
        text: "Buyer satisfaction programmes that convert closures into repeat business and organic referrals.",
      },
    ],
  },
];

/* ── Deep-Dive Stage Sections Data ── */

const STAGE_SECTIONS = [
  {
    id: "branding-strategy",
    number: "01",
    label: "Branding & Strategy",
    headline: "Every project begins with positioning, not promotion.",
    lead: "Before the first hoarding goes up or a single rupee is spent on marketing, we sit with the developer and define the foundation. What does this project stand for? Who is it for? How is it different from everything else in the micro-market?",
    paragraphs: [
      "Most projects enter the market without a clear identity. They compete on price because they never established value. We reverse that. Our team benchmarks the micro-market, studies absorption patterns, maps buyer profiles, and builds a pricing strategy that balances sales momentum with margin protection.",
      "We then build the entire brand narrative — naming, visual identity, sales collateral, experience centre design, and launch planning. Our people carry the developer's identity, not ours. Every interaction a buyer has feels like the developer's organisation.",
    ],
    capabilities: [
      {
        title: "Micro-Market Benchmarking",
        text: "Pricing bands, absorption rates, competitive landscape, and buyer demand mapping before any positioning decision is made.",
      },
      {
        title: "Brand Narrative & Identity",
        text: "From project naming to visual language, we build an identity that creates perceived value — not just awareness.",
      },
      {
        title: "Pricing Discipline",
        text: "We align pricing to sales-momentum goals while protecting long-term brand and margin integrity. No reactive discounting.",
      },
      {
        title: "Experience Centre Design",
        text: "The physical experience is designed to reinforce the brand — layout, materials, customer flow, and staff training.",
      },
    ],
  },
  {
    id: "marketing-system",
    number: "02",
    label: "Marketing",
    headline: "Demand generation managed by the team that built the brand.",
    lead: "The same team that defines your positioning runs your marketing. There is no briefing document passed to a separate agency. No dilution. No lost context. The story stays consistent because nobody has to translate it secondhand.",
    paragraphs: [
      "Every rupee spent is tracked against qualified walk-ins, site visits, and conversions — not impressions, not reach, not vanity metrics. We run ATL & BTL campaigns alongside digital performance marketing, reaching buyers at every key touchpoint with a consistent narrative and measurable accountability.",
      "The result is a demand engine that doesn't just generate leads — it generates the right leads. Buyers who arrive already understanding the project's value proposition, pricing logic, and differentiation.",
    ],
    capabilities: [
      {
        title: "Performance Marketing",
        text: "Every campaign is tracked to conversions. We measure cost per qualified walk-in — not cost per click.",
      },
      {
        title: "ATL & BTL Campaigns",
        text: "We reach out to target customers at key touch points for visibility and awareness.",
      },
      {
        title: "Digital Presence",
        text: "SEO, paid search, social media, and content marketing unified under one narrative. No fragmented messaging.",
      },
      {
        title: "Lead Qualification",
        text: "Structured scoring and routing ensures sales teams receive buyers who match the project's target profile.",
      },
    ],
  },
  {
    id: "sales-velocity",
    number: "03",
    label: "Sales",
    headline: "Dedicated teams. Structured pipeline. Predictable momentum.",
    lead: "Sales at Credvest is not a department — it's a system. Dedicated teams are trained on your product, deployed to your project, and measured against sales-momentum targets. Not shared across ten projects. Not dependent on who happens to be on shift.",
    paragraphs: [
      "Every lead enters a structured pipeline with defined stages, follow-up protocols, and conversion targets. Site visits are orchestrated, not improvised. Negotiations follow an approval hierarchy that protects margin without stalling deals. The customer journey — from first enquiry to booking — is designed with the same precision as the marketing that preceded it.",
      "We guarantee higher sales momentum — the number of units closed each month. That's not a promise made lightly. It's the result of a system where branding, marketing, and sales are run by the same team, sharing the same data, towards the same goal.",
    ],
    capabilities: [
      {
        title: "Dedicated Project Teams",
        text: "Sales staff assigned exclusively to your project. Trained on your product, your pricing, your buyer profile.",
      },
      {
        title: "Pipeline Management",
        text: "Every lead tracked through a structured funnel with defined stages, follow-up protocols, and conversion targets.",
      },
      {
        title: "Customer Journey Design",
        text: "From first touchpoint to site visit to booking, the buyer experience is mapped, measured, and optimised.",
      },
      {
        title: "Approval Hierarchy",
        text: "Structured negotiation discipline with defined authority levels. Protects margin without losing deal momentum.",
      },
    ],
  },
  {
    id: "post-sales-trust",
    number: "04",
    label: "Post Sales",
    headline: "The relationship doesn't end at closure. It compounds.",
    lead: "Most consulting firms disappear after the last unit is booked. We don't — because post-sales is where trust is either validated or broken. Structured handover, documentation, CRM management, and buyer follow-up ensure the promise made during sales is the experience delivered after.",
    paragraphs: [
      "Every buyer receives a structured lifecycle from agreement to possession. Milestone communications are automated and personal. Documentation is meticulous. When issues arise — and they do in any project — they are addressed through a defined escalation process, not ad hoc firefighting.",
      "The result is measurable: lower cancellation rates, higher satisfaction scores, and a referral pipeline that compounds with every project. When buyers trust the process, they become advocates. That advocacy feeds directly back into the next project's demand engine.",
    ],
    capabilities: [
      {
        title: "Buyer Lifecycle Management",
        text: "Complete journey from agreement to possession, with structured touchpoints at every milestone.",
      },
      {
        title: "CRM & Documentation",
        text: "Meticulous record-keeping and communication protocols that keep buyers informed and engaged.",
      },
      {
        title: "Satisfaction Programmes",
        text: "Systematic buyer engagement that converts closures into repeat business and organic referrals.",
      },
      {
        title: "Cancellation Prevention",
        text: "Proactive intervention protocols that identify at-risk buyers early and address concerns before they escalate.",
      },
    ],
  },
];

/* ── Credvest Edge Lifecycle Data ── */

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
              One system.{" "}
              <span className="font-semibold text-stroke-brand">Four</span>{" "}
              stages.
              <br />
              Full accountability.
            </h1>
          </div>

          <div className="flex flex-col gap-6 pb-2">
            <p className="text-[13px] text-neutral-500 leading-relaxed max-w-[280px]">
              Most developers coordinate multiple vendors. We replace that with
              a single team running one integrated system from branding to
              post-sales.
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
    </section>
  );
}

/* ── Tabbed Process Section ── */

function ProcessSection() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = PROCESS_TABS[activeTab];

  return (
    <section className="bg-white">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-20 md:py-32">
        {/* Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 border border-neutral-200">
          {PROCESS_TABS.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setActiveTab(i)}
              className={`py-4 px-5 text-[13px] font-serif font-semibold text-center transition-colors border-r last:border-r-0 border-neutral-200 ${
                activeTab === i
                  ? "bg-brand text-white"
                  : "bg-white text-neutral-600 hover:bg-neutral-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mt-0">
          {/* Left — overview */}
          <div
            className="p-8 md:p-12 flex flex-col justify-between border border-t-0 border-neutral-200"
            style={{ backgroundColor: "#F8F8F8" }}
          >
            <div>
              <div className="mb-6">{tab.icon}</div>
              <h3 className="font-serif text-2xl md:text-3xl font-medium text-neutral-black leading-[1.15] tracking-[-0.03em] mb-5">
                {tab.headline}
              </h3>
              <p className="font-sans text-[14px] text-neutral-500 leading-relaxed mb-8 max-w-md">
                {tab.description}
              </p>
            </div>
            <a href="#" className="flex items-center gap-3 group w-fit">
              <span className="flex items-center justify-center w-9 h-9 bg-brand text-white transition-colors group-hover:bg-brand-600">
                <ArrowRight />
              </span>
              <span className="text-[13px] font-semibold text-neutral-black">
                Work With Us
              </span>
            </a>
          </div>

          {/* Right — numbered points */}
          <div className="flex flex-col border border-t-0 border-l-0 border-neutral-200">
            {tab.points.map((point, i) => (
              <div
                key={point.title}
                className={`p-8 md:p-12 flex-1 ${
                  i < tab.points.length - 1 ? "border-b border-neutral-200" : ""
                }`}
              >
                <span className="font-serif text-lg text-brand font-semibold mb-2 block">
                  {i + 1}. {point.title}
                </span>
                <p className="font-sans text-[14px] text-neutral-500 leading-relaxed max-w-md">
                  {point.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Deep-Dive Stage Sections ── */

function StageSections() {
  return (
    <>
      {STAGE_SECTIONS.map((stage, idx) => (
        <section
          key={stage.id}
          id={stage.id}
          className="bg-white scroll-mt-20"
        >
          <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-20 md:py-28">
            {/* Divider line between sections */}
            {idx > 0 && (
              <div className="border-t border-neutral-200 mb-20 md:mb-28" />
            )}

            {/* Section header */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-24 mb-16 md:mb-20">
              <div>
                <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand mb-4 block font-sans">
                  Stage {stage.number} — {stage.label}
                </span>
                <h2 className="font-serif text-3xl md:text-[2.8rem] font-semibold text-neutral-black leading-[1.12] tracking-[-0.07em]">
                  {stage.headline}
                </h2>
              </div>

              <div className="flex flex-col justify-center gap-5">
                <p className="font-sans text-[15px] text-neutral-600 leading-relaxed">
                  {stage.lead}
                </p>
                {stage.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="font-sans text-[14px] text-neutral-500 leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {/* Capabilities grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-neutral-200">
              {stage.capabilities.map((cap, i) => (
                <div
                  key={cap.title}
                  className={`p-8 md:p-10 ${
                    i % 2 === 0 ? "md:border-r border-neutral-200" : ""
                  } ${i < 2 ? "border-b border-neutral-200" : ""} ${
                    i === 0 || i === 1 ? "" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className="font-serif text-2xl text-brand font-semibold leading-none mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h4 className="font-serif text-lg font-semibold text-neutral-black mb-2 tracking-[-0.02em]">
                        {cap.title}
                      </h4>
                      <p className="font-sans text-[14px] text-neutral-500 leading-relaxed">
                        {cap.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

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

export default function HowWeWorkPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-black font-sans">
      <Navbar />
      <HeroSection />
      <StageSections />
      <CredvestEdgeSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
