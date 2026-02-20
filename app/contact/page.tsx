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
            <h1 className="font-serif text-[clamp(2.8rem,5.8vw,5.5rem)] font-semibold text-neutral-black leading-[1.08] tracking-[-0.07em]">
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

/* ── Contact Form Section with Live Preview ── */

const INQUIRY_LABELS: Record<string, string> = {
  developer: "a developer looking for a structured sales partner",
  professional: "a professional interested in joining the team",
  other: "reaching out to learn more about Credvest",
};

function ContactFormSection() {
  const [inquiryType, setInquiryType] = useState("developer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const hasContent = name || email || company || message;

  return (
    <section className="bg-white">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-16 lg:gap-20">
          {/* Form */}
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-neutral-black tracking-[-0.03em] mb-8">
              Send us a message
            </h2>

            <form
              className="flex flex-col gap-6"
              onSubmit={(e) => e.preventDefault()}
            >
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
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
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
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

          {/* Live Preview */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-neutral-400 mb-4">
              Preview
            </p>
            <div
              className="border border-neutral-200 p-8 md:p-10 min-h-[400px] flex flex-col justify-between transition-all duration-300"
              style={{
                backgroundColor: hasContent ? "#F8F8F8" : "transparent",
              }}
            >
              <div className="font-serif text-[15px] md:text-[17px] text-neutral-700 leading-[1.8] tracking-[-0.01em]">
                <p>Dear Credvest,</p>
                <br />
                <p>
                  {name ? (
                    <>
                      My name is{" "}
                      <span className="font-semibold text-neutral-900">
                        {name}
                      </span>
                    </>
                  ) : (
                    <span className="text-neutral-300">My name is ...</span>
                  )}
                  {company ? (
                    <>
                      {" "}
                      from{" "}
                      <span className="font-semibold text-neutral-900">
                        {company}
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                  . I am {INQUIRY_LABELS[inquiryType]}.
                </p>
                {(email || phone) && (
                  <>
                    <br />
                    <p>
                      You can reach me at{" "}
                      {email && (
                        <span className="font-semibold text-neutral-900">
                          {email}
                        </span>
                      )}
                      {email && phone && " or "}
                      {phone && (
                        <span className="font-semibold text-neutral-900">
                          {phone}
                        </span>
                      )}
                      .
                    </p>
                  </>
                )}
                {message && (
                  <>
                    <br />
                    <p className="text-neutral-800">{message}</p>
                  </>
                )}
              </div>

              <div className="mt-10 pt-6 border-t border-neutral-200">
                <p className="font-serif text-[15px] text-neutral-500">
                  {name ? (
                    <>
                      Regards,
                      <br />
                      <span className="text-neutral-800 font-medium">
                        {name}
                      </span>
                    </>
                  ) : (
                    <span className="text-neutral-300">
                      Regards,
                      <br />
                      ...
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Office info below preview */}
            <div className="mt-8 flex flex-col gap-4">
              {OFFICES.map((office) => (
                <div key={office.city} className="flex items-start gap-3">
                  <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-neutral-400 w-24 flex-shrink-0 pt-0.5">
                    {office.city}
                  </span>
                  <div className="text-[13px] text-neutral-500 leading-relaxed">
                    <p>{office.address}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <a
                        href={`tel:${office.phone.replace(/\s/g, "")}`}
                        className="hover:text-brand transition-colors"
                      >
                        {office.phone}
                      </a>
                      <span className="text-neutral-200">&middot;</span>
                      <a
                        href={`mailto:${office.email}`}
                        className="hover:text-brand transition-colors"
                      >
                        {office.email}
                      </a>
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
            <h2 className="font-serif text-3xl md:text-[2.8rem] font-semibold text-neutral-black leading-[1.12] tracking-[-0.07em] mb-6">
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
        <h2 className="font-serif text-4xl md:text-[3.8rem] font-semibold text-neutral-black leading-[1.12] tracking-[-0.07em] mb-10">
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
