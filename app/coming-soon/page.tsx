import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

function ArrowRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
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

export default function ComingSoonPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-black font-sans">
      <Navbar />

      <section className="relative pt-16">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
            backgroundSize: "calc(100% / 8) 80px",
          }}
        />

        <div className="relative z-10 max-w-[1600px] mx-auto px-8 lg:px-12 flex flex-col items-center justify-center min-h-[80vh] text-center">
          <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand mb-4 block font-sans">
            Coming Soon
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-medium text-neutral-black leading-[1.08] tracking-[-0.04em] mb-6">
            We&apos;re building
            <br />
            <span
              className="font-semibold text-stroke-brand"
            >
              something great.
            </span>
          </h1>
          <p className="text-[14px] text-neutral-500 leading-relaxed max-w-md mb-10">
            This page is under construction. Check back soon or explore
            other parts of our platform.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="inline-flex items-center gap-3 bg-brand text-white font-sans text-[14px] font-semibold px-8 py-4 hover:bg-brand-600 transition-colors"
            >
              <ArrowRight />
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 font-sans text-[14px] font-semibold text-neutral-black px-8 py-4 border border-neutral-200 hover:border-brand hover:text-brand transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
