"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

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

/* ── Data ── */

const OFFICES = [
  {
    city: "Bangalore",
    address: "12th Floor, Prestige Tower, MG Road, Bangalore 560001",
    phone: "+91 80 4567 8900",
    email: "bangalore@credvest.com",
  },
  {
    city: "Hyderabad",
    address: "7th Floor, Cyber Gateway, HITEC City, Hyderabad 500081",
    phone: "+91 40 6789 0123",
    email: "hyderabad@credvest.com",
  },
  {
    city: "Mumbai",
    address: "15th Floor, One BKC, Bandra Kurla Complex, Mumbai 400051",
    phone: "+91 22 4567 8900",
    email: "mumbai@credvest.com",
  },
];

const CONTACT_FAQS = [
  {
    question: "How quickly can Credvest onboard a new project?",
    answer:
      "We typically onboard within 2–3 weeks depending on project complexity. Our structured systems allow rapid deployment of dedicated teams, reporting infrastructure, and sales processes from day one.",
  },
  {
    question: "What is the minimum project size you work with?",
    answer:
      "We work with projects of 100+ units or ₹200 Cr+ in inventory value. Our operating model is built for scale — smaller projects may not fully benefit from our structured approach.",
  },
  {
    question: "Do you operate in cities outside Bangalore and Hyderabad?",
    answer:
      "We are expanding selectively into new markets. If you have a project in another city, reach out — we evaluate opportunities based on market potential and alignment with our operating model.",
  },
  {
    question: "What does the partnership model look like?",
    answer:
      "Credvest operates on a mandate basis with performance-linked fee structures. We align incentives so our success is directly tied to your project outcomes. Every engagement is customized.",
  },
  {
    question: "Can I schedule a consultation before committing?",
    answer:
      "Absolutely. We encourage an initial conversation to understand your project, goals, and challenges. Use the form above or email us directly to schedule a no-obligation consultation.",
  },
];

/* ── Hero Section ── */

function HeroSection() {
  return (
    <section className="relative pt-16">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
          backgroundSize: "calc(100% / 8) 80px",
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-end pt-32 md:pt-44 pb-20 md:pb-28">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand mb-4 block font-sans">
              Get in Touch
            </span>
            <h1 className="font-serif text-[clamp(2.8rem,5.8vw,5.5rem)] font-medium text-neutral-black leading-[1.08] tracking-[-0.04em]">
              Let&apos;s build{" "}
              <span
                className="font-semibold text-stroke-brand"
              >
                something
              </span>
              <br />
              structured together.
            </h1>
          </div>

          <div className="flex flex-col gap-6 pb-2">
            <p className="text-[14px] text-neutral-500 leading-relaxed max-w-[340px]">
              Whether you&apos;re a developer looking for a structured sales partner,
              or a professional looking to join our team — we&apos;d love to hear
              from you.
            </p>
            <div className="flex flex-col gap-2 text-[13px] text-neutral-500">
              <a
                href="mailto:hello@credvest.com"
                className="hover:text-brand transition-colors"
              >
                hello@credvest.com
              </a>
              <a
                href="tel:+918045678900"
                className="hover:text-brand transition-colors"
              >
                +91 80 4567 8900
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Contact Form Section ── */

function ContactFormSection() {
  const [inquiryType, setInquiryType] = useState("developer");

  return (
    <section className="bg-white">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-16 lg:gap-24">
          {/* Form */}
          <div className="bg-white p-8 md:p-12">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-neutral-black tracking-[-0.03em] mb-8">
              Send us a message
            </h2>

            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              {/* Inquiry type tabs */}
              <div>
                <label className="text-[11px] font-semibold tracking-[0.1em] uppercase text-neutral-400 mb-3 block">
                  I am a
                </label>
                <div className="flex gap-2">
                  {[
                    { value: "developer", label: "Developer / Builder" },
                    { value: "professional", label: "Job Seeker" },
                    { value: "other", label: "Other" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setInquiryType(opt.value)}
                      className={`px-5 py-2.5 text-[13px] font-medium transition-all ${
                        inquiryType === opt.value
                          ? "bg-neutral-900 text-white"
                          : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] font-semibold tracking-[0.1em] uppercase text-neutral-400 mb-2 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full border border-neutral-200 px-4 py-3 text-[14px] text-neutral-800 placeholder:text-neutral-300 focus:outline-none focus:border-brand transition-colors bg-transparent"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold tracking-[0.1em] uppercase text-neutral-400 mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="john@company.com"
                    className="w-full border border-neutral-200 px-4 py-3 text-[14px] text-neutral-800 placeholder:text-neutral-300 focus:outline-none focus:border-brand transition-colors bg-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] font-semibold tracking-[0.1em] uppercase text-neutral-400 mb-2 block">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full border border-neutral-200 px-4 py-3 text-[14px] text-neutral-800 placeholder:text-neutral-300 focus:outline-none focus:border-brand transition-colors bg-transparent"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold tracking-[0.1em] uppercase text-neutral-400 mb-2 block">
                    Company / Project
                  </label>
                  <input
                    type="text"
                    placeholder="Company name or project"
                    className="w-full border border-neutral-200 px-4 py-3 text-[14px] text-neutral-800 placeholder:text-neutral-300 focus:outline-none focus:border-brand transition-colors bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold tracking-[0.1em] uppercase text-neutral-400 mb-2 block">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your project, timeline, and what you're looking for..."
                  className="w-full border border-neutral-200 px-4 py-3 text-[14px] text-neutral-800 placeholder:text-neutral-300 focus:outline-none focus:border-brand transition-colors bg-transparent resize-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-3 bg-brand text-white font-sans text-[14px] font-semibold px-8 py-4 hover:bg-brand-600 transition-colors w-fit"
              >
                <ArrowRight />
                Send Message
              </button>
            </form>
          </div>

          {/* Office Cards */}
          <div className="flex flex-col gap-5">
            <h3 className="font-serif text-2xl font-medium text-neutral-black tracking-[-0.03em] mb-2">
              Our Offices
            </h3>

            {OFFICES.map((office) => (
              <div
                key={office.city}
                className="bg-white p-6 md:p-8 group hover:border-brand border border-transparent transition-colors"
              >
                <h4 className="font-serif text-lg font-semibold text-neutral-black mb-3 tracking-[-0.01em]">
                  {office.city}
                </h4>
                <p className="text-[13px] text-neutral-500 leading-relaxed mb-4">
                  {office.address}
                </p>
                <div className="flex flex-col gap-1.5">
                  <a
                    href={`tel:${office.phone.replace(/\s/g, "")}`}
                    className="text-[13px] text-neutral-600 hover:text-brand transition-colors flex items-center gap-2"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                    {office.phone}
                  </a>
                  <a
                    href={`mailto:${office.email}`}
                    className="text-[13px] text-neutral-600 hover:text-brand transition-colors flex items-center gap-2"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
                    </svg>
                    {office.email}
                  </a>
                </div>
              </div>
            ))}

            <div className="bg-brand/5 border border-brand/10 p-6 md:p-8">
              <p className="text-[13px] text-neutral-600 leading-relaxed mb-3">
                Need to speak with someone immediately?
              </p>
              <a
                href="tel:+918045678900"
                className="inline-flex items-center gap-2 text-brand text-[14px] font-semibold hover:underline"
              >
                <ArrowRight />
                Call us directly
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ Section ── */

function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section className="bg-white">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand mb-4 block font-sans">
              FAQs
            </span>
            <h2 className="font-serif text-3xl md:text-[2.8rem] font-medium text-neutral-black leading-[1.12] tracking-[-0.04em] mb-6">
              Common
              <br />
              Questions
            </h2>
            <p className="text-[14px] text-neutral-500 leading-relaxed">
              Can&apos;t find what you&apos;re looking for? Reach out to us
              directly — we&apos;re always happy to help.
            </p>
          </div>

          {/* Right — Accordion */}
          <div className="flex flex-col">
            {CONTACT_FAQS.map((item, i) => {
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
          Let&apos;s talk about your{" "}
          <span
            className="font-semibold text-stroke-brand"
          >
            next
          </span>{" "}
          <br />
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

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-black font-sans">
      <Navbar />
      <HeroSection />
      <ContactFormSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
