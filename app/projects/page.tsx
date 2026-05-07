"use client";

import { useRef } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion, useInView } from "motion/react";

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className={className}>
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

/* ── Case Study Data ── */

const CASE_STUDIES = [
  {
    id: "01",
    type: "Premium Villas",
    location: "Sarjapur Corridor",
    headline:
      "A 15-acre villa development on the Chikkatirupati–Sarjapur stretch.",
    units: "127 units",
    timeline: "10 months",
    revenue: "On request",
    challenge:
      "A first-time developer launching in a corridor with no surrounding infrastructure and no model villa to walk buyers through.",
    approach:
      "Pivoted the product to a sub-₹1Cr UDS villa — engineered to convert 3BHK apartment seekers into villa buyers. Sales ran on VR walkthroughs and in-home meetings. No site office. No precedent.",
    result:
      "127 units in 10 months. Steady 12–13 closures every month, with no sales office on the ground. Buyers who entered at ₹85L are seeing resale cross ₹1.4Cr — the appreciation that built the developer’s credibility for everything that came next.",
    stat: { value: "₹85L → ₹1.4Cr+", label: "Buyer entry to resale" },
  },
  {
    id: "02",
    type: "Mixed-Use Residential",
    location: "Gunjur, East Bangalore",
    headline:
      "A 20-acre apartment and villa development in one of Bangalore’s most contested corridors.",
    units: "1,293 units",
    timeline: "Multi-phase",
    revenue: "On request",
    challenge:
      "1,293 units to absorb in a corridor with new competing launches landing every quarter.",
    approach:
      "A “Carnival Living” teaser campaign anchored the launch — built around lived-in moments and the micro-market story, not a feature list. Followed by a structured, channel-disciplined sales engine sustained across phases.",
    result:
      "909 units allocated across the early phases. 656 mixed-asset units cleared through 2024. Sustained absorption in a corridor where most projects stall the month after launch.",
    stat: { value: "100", label: "Bookings on launch day" },
  },
  {
    id: "03",
    type: "Managed Farmland",
    location: "Hoskote",
    headline:
      "A large-format managed farmland community with plot sizes starting at 5,500 sq.ft.",
    units: "On request",
    timeline: "On request",
    revenue: "On request",
    challenge:
      "Selling large farm plots without a physical site office — and without the usual sales infrastructure category buyers expect.",
    approach:
      "Re-cast the buyer. Not a land investor — a second-home owner. The pitch: clear titles, a wellness-led township, no infrastructure shortcuts. The sales process stayed virtual.",
    result:
      "Phase 1 absorbed almost on day one. Subsequent phases cleared at the same pace. The community sold out in full — with no on-ground marketing infrastructure.",
    stat: { value: "Sold Out", label: "Zero spend on a sales office" },
  },
  {
    id: "04",
    type: "Luxury Villas",
    location: "Sarjapur–Attibele",
    headline:
      "A 3-acre luxury villa enclave with ticket sizes between ₹1.5–1.8Cr.",
    units: "On request",
    timeline: "8 months",
    revenue: "On request",
    challenge:
      "A ₹1.5–1.8Cr ticket size in a corridor largely priced for the mid-segment. The product didn’t have local comparables that justified the ask.",
    approach:
      "Benchmarked pricing against legitimate luxury comparables — not the immediate neighbourhood. Built a narrative that earned the price.",
    result:
      "Mid-2023 to early 2024 — full exit at full price. Moved the developer up-segment, from mid-market housing into a credible luxury villa portfolio.",
    stat: { value: "8 months", label: "Full project exit" },
  },
  {
    id: "05",
    type: "Mid-Segment Residential",
    location: "Budigere Cross, East Bangalore",
    headline:
      "An apartment community in one of East Bangalore’s most contested IT corridors.",
    units: "218 units",
    timeline: "~12 months",
    revenue: "On request",
    challenge:
      "32 active competing projects in the same micro-market. All chasing the same IT buyer. Generic affordability messaging would have disappeared in the noise.",
    approach:
      "Hyper-local targeting. A “value-for-money” narrative sharpened to the IT professional’s actual decision criteria — commute, builder credibility, configuration — not headline price.",
    result:
      "218 units sold. 20 units a month at peak. Pricing moved 46% from launch to closeout — without ever losing sales momentum.",
    stat: { value: "₹6,500 → ₹9,500", label: "Per sq.ft., launch to closeout" },
  },
  {
    id: "06",
    type: "Affordable Residential",
    location: "East Bangalore",
    headline: "An 800-unit budget apartment community launched mid-Covid.",
    units: "800 units",
    timeline: "12 months",
    revenue: "On request",
    challenge:
      "Site visits were not possible. The buyer base — first-time owners — was carrying real financial anxiety. Site visits, model homes, walk-ins: all gone.",
    approach:
      "Led with fully-fitted homes and a financing structure built for the moment. Targeted investors first, who could underwrite the cycle while end-user confidence rebuilt.",
    result:
      "650 of 800 units closed in one year. Proof that a strong financial hook and a working video pipeline can close real estate even through a global lockdown.",
    stat: { value: "80%", label: "Of deals signed over video" },
  },
  {
    id: "07",
    type: "Inventory Clear-Out",
    location: "East Bangalore",
    headline:
      "A late-stage sustenance mandate taken over with the project at 80% construction-complete and 20% sold.",
    units: "On request",
    timeline: "6 months",
    revenue: "On request",
    challenge:
      "The market had already labelled the project stale. Most of the inventory was unsold. Construction was nearly done, which meant the developer’s capital was sitting locked.",
    approach:
      "New positioning. End-user buyer, not investor. Affordability sharpened to the segment that actually wanted to live in the building. Six-month campaign window, no extensions.",
    result:
      "The remaining 80% of inventory cleared in 6 months. Developer’s blocked capital unlocked. Project books closed.",
    stat: { value: "80%", label: "Inventory cleared in 6 months" },
  },
  {
    id: "08",
    type: "Market Entry / High-Rise",
    location: "Hyderabad — Financial District",
    headline: "A high-rise mandate for a first-time developer entering Hyderabad.",
    units: "On request",
    timeline: "16 months",
    revenue: "On request",
    challenge:
      "A first-time developer entering a city already sitting on heavy unsold inventory. The developer was a Bangalore-based architect with 1,000+ projects delivered as a designer — and none as a builder.",
    approach:
      "Started before the launch. Product fitment first — a mix from affordable to luxury, anchored by concierge services. Then a 16-month go-to-market built on the micro-market thesis: buy the future at today’s price.",
    result:
      "A first-time developer established as a credible Tier-1 player in Hyderabad — inside a single project cycle.",
    stat: { value: "80%", label: "Sold in 16 months" },
  },
];

const AGGREGATE_STATS = [
  { value: "₹8,000Cr+", label: "Transaction Value" },
  { value: "100+", label: "Projects Delivered" },
  { value: "5,000+", label: "Units Sold" },
  { value: "92%", label: "Avg. Sell-Through" },
];

/* ── Animated stat counter ── */
function StatBlock({ value, label }: { value: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <span className="font-serif text-4xl md:text-6xl lg:text-7xl font-semibold text-neutral-black tracking-[-0.07em] block">
        {value}
      </span>
      <span className="font-sans text-[11px] md:text-xs text-neutral-400 mt-2 block uppercase tracking-[0.1em]">
        {label}
      </span>
    </motion.div>
  );
}

/* ── Single case study card ── */
function CaseStudyCard({
  study,
  index,
}: {
  study: (typeof CASE_STUDIES)[number];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="border border-neutral-200"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-neutral-200 bg-neutral-50/50">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] text-neutral-400 tracking-wider">
            CASE {study.id}
          </span>
          <span className="w-px h-4 bg-neutral-200" />
          <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-brand">
            {study.type}
          </span>
        </div>
        <span className="text-[11px] text-neutral-400">{study.location}</span>
      </div>

      {/* Content */}
      <div className={`grid grid-cols-1 lg:grid-cols-2`}>
        {/* Left / info side */}
        <div className={`p-6 md:p-10 flex flex-col ${isEven ? "" : "lg:order-2"}`}>
          <div className="mb-8">
            <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-black tracking-[-0.04em] leading-[1.1]">
              {study.headline}
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-dashed border-neutral-200">
            <div>
              <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 block mb-1">
                Units
              </span>
              <span className="font-serif text-lg font-semibold text-neutral-black">
                {study.units}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 block mb-1">
                Timeline
              </span>
              <span className="font-serif text-lg font-semibold text-neutral-black">
                {study.timeline}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 block mb-1">
                Revenue
              </span>
              <span className="font-serif text-lg font-semibold text-neutral-black">
                {study.revenue}
              </span>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand block mb-2">
                The Challenge
              </span>
              <p className="text-[13px] text-neutral-500 leading-relaxed">
                {study.challenge}
              </p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-black block mb-2">
                Our Approach
              </span>
              <p className="text-[13px] text-neutral-500 leading-relaxed">
                {study.approach}
              </p>
            </div>
          </div>
        </div>

        {/* Right / result + stat side */}
        <div
          className={`p-6 md:p-10 flex flex-col justify-between border-t lg:border-t-0 ${isEven ? "lg:border-l" : "lg:border-r lg:order-1"} border-neutral-200 bg-neutral-50/30`}
        >
          {/* Big stat */}
          <div className="flex-1 flex items-center justify-center py-10 md:py-16">
            <div className="text-center">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-black tracking-[-0.05em] block"
              >
                {study.stat.value}
              </motion.span>
              <span className="text-[11px] uppercase tracking-[0.15em] text-neutral-400 mt-3 block">
                {study.stat.label}
              </span>
            </div>
          </div>

          {/* Result text */}
          <div className="border-t border-dashed border-neutral-200 pt-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand block mb-2">
              The Result
            </span>
            <p className="text-[13px] text-neutral-600 leading-relaxed font-medium">
              {study.result}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Page ── */

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-black font-sans">
      <Navbar />

      {/* Hero */}
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
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-end pt-20 md:pt-44 pb-12 md:pb-28">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-[clamp(2.8rem,5.8vw,5.5rem)] font-semibold text-neutral-black leading-[1.08] tracking-[-0.07em]"
              >
                Projects that{" "}
                <span className="text-stroke-brand">prove</span> the
                <br />
                model works.
              </motion.h1>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-6 pb-2"
            >
              <p className="text-[13px] text-neutral-500 leading-relaxed max-w-[280px]">
                Real developers. Real numbers. Every case study here is a project
                where Credvest took full ownership — and delivered.
              </p>
              <Link
                href="/contact"
                className="flex items-center gap-3 group w-fit"
              >
                <span className="flex items-center justify-center w-9 h-9 bg-brand text-white transition-colors group-hover:bg-brand-600">
                  <ArrowRight />
                </span>
                <span className="text-[13px] font-semibold text-neutral-black">
                  Start a Project
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Aggregate Stats */}
      <section className="border-t border-b border-neutral-200 bg-white">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-neutral-200">
            {AGGREGATE_STATS.map((stat) => (
              <div key={stat.label} className="py-10 md:py-14 px-4 md:px-8">
                <StatBlock value={stat.value} label={stat.label} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-white">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-12 pt-16 md:pt-24">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-block w-2 h-2 bg-brand rounded-full animate-pulse" />
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand">
              Case Studies
            </span>
          </div>
          <p className="text-[13px] text-neutral-500 leading-relaxed max-w-2xl">
            Project names are withheld out of respect for our developer partners
            and the sensitivity of their P&amp;Ls. Strategies and figures below
            are verified records of performance.
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="bg-white">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-12 md:py-16">
          <div className="flex flex-col gap-8 md:gap-12">
            {CASE_STUDIES.map((study, i) => (
              <CaseStudyCard key={study.id} study={study} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom pull quote */}
      <section className="bg-white border-t border-neutral-200">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <motion.blockquote
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-serif text-2xl md:text-4xl lg:text-[2.8rem] font-semibold text-neutral-black leading-[1.2] tracking-[-0.04em] block mb-6">
                &ldquo;We don&apos;t pitch decks.
                <br />
                We pitch{" "}
                <span className="text-stroke-brand">track records.</span>&rdquo;
              </span>
              <span className="text-[13px] text-neutral-400 block">
                — The Credvest philosophy
              </span>
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-brand text-white font-sans text-[14px] font-semibold px-8 py-4 hover:bg-brand-600 transition-colors"
              >
                <ArrowRight />
                Discuss Your Project
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
