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

/* ── Case Study Data (placeholder) ── */

const CASE_STUDIES = [
  {
    id: "01",
    headline: "A 340-unit premium high-rise in North Bangalore",
    location: "North Bangalore",
    type: "Premium Residential",
    units: "340 units",
    timeline: "8 months",
    sold: "92%",
    revenue: "₹480 Cr",
    challenge:
      "Stalled at 18% sell-through after 14 months with three different agencies. The developer was considering a price cut and rebranding.",
    approach:
      "Repositioned the project as a lifestyle-first address. Built a dedicated 12-person sales team, restructured channel partnerships, and launched a targeted digital engine focused on NRI buyers.",
    result:
      "From 18% to 92% sold in 8 months. No price reduction needed. The final tower was released at a 12% premium over the original price.",
    stat: { value: "92%", label: "Sold" },
    accent: "bg-brand",
  },
  {
    id: "02",
    headline: "A mid-segment residential community on Hennur Road",
    location: "Hennur Road, Bangalore",
    type: "Mid-Segment Residential",
    units: "560 units",
    timeline: "6 months",
    sold: "₹620 Cr",
    revenue: "₹620 Cr",
    challenge:
      "A new launch in an oversaturated micro-market with 11 competing projects within a 3km radius. Zero brand recall for the developer in this location.",
    approach:
      "Defined a sharp price-value narrative against every competitor. Deployed a guerrilla ground team of 8, owned all walk-in touchpoints, and created a referral flywheel from Day 1.",
    result:
      "Crossed ₹620 Cr in bookings within the first 6 months. Became the #1 selling project in the micro-market, outpacing competitors with 3x more marketing spend.",
    stat: { value: "₹620Cr", label: "In Bookings" },
    accent: "bg-neutral-black",
  },
  {
    id: "03",
    headline: "An ultra-luxury residential tower in Koramangala",
    location: "Koramangala, Bangalore",
    type: "Luxury Residential",
    units: "86 units",
    timeline: "10 months",
    sold: "100%",
    revenue: "₹310 Cr",
    challenge:
      "Ultra-luxury segment with ticket sizes above ₹3.5 Cr. Previous sales partner managed only 9 closures in 11 months. The developer questioned if the product-market fit existed.",
    approach:
      "Curated an invite-only sales process. Built a concierge-style team of 4 senior closers. Designed private preview events and leveraged HNI networks instead of mass marketing.",
    result:
      "Sold out all 86 units in 10 months at full price. Zero discounting. Repeat clients from this project generated 23 referrals for the developer's next launch.",
    stat: { value: "100%", label: "Sold Out" },
    accent: "bg-brand",
  },
  {
    id: "04",
    headline: "A 20-acre plotted development in Whitefield",
    location: "Whitefield, Bangalore",
    type: "Plotted Development",
    units: "210 plots",
    timeline: "4 months",
    sold: "88%",
    revenue: "₹175 Cr",
    challenge:
      "Plotted development in a zone known for villa projects — buyers didn't associate the area with plots. Launch date was fixed with 60 days of lead time.",
    approach:
      "Created an urgency-driven launch strategy with phase-wise pricing. Deployed a rapid-response digital + ground team. Converted skeptics with transparent ROI comparisons against competing villas.",
    result:
      "88% sold within 4 months. The fastest-selling plotted project in East Bangalore that year. Phase 2 pricing was raised 15% and still maintained sales momentum.",
    stat: { value: "4mo", label: "To 88% Sold" },
    accent: "bg-neutral-black",
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
                className="font-serif text-6xl md:text-7xl lg:text-8xl font-semibold text-neutral-black tracking-[-0.07em] block"
              >
                {study.stat.value}
              </motion.span>
              <span className="text-[11px] uppercase tracking-[0.15em] text-neutral-400 mt-2 block">
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

      {/* Placeholder badge */}
      <section className="bg-white">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-12 pt-16 md:pt-24">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-block w-2 h-2 bg-brand rounded-full animate-pulse" />
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand">
              Case Studies
            </span>
          </div>
          <p className="text-[13px] text-neutral-400 max-w-md">
            Names and figures below are representative placeholders. Actual project
            data will replace these soon.
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
