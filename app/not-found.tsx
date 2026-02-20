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
        d="M4.5 10h11m0 0L10 4.5M15.5 10l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const PAGES = [
  {
    label: "Home",
    href: "/",
    description: "Back to the beginning.",
  },
  {
    label: "How We Work",
    href: "/how-we-work",
    description: "One system. Four stages.",
  },
  {
    label: "People",
    href: "/people",
    description: "The team behind the system.",
  },
  {
    label: "Company",
    href: "/company",
    description: "Leadership and ecosystem.",
  },
  {
    label: "The Group",
    href: "/group",
    description: "Many verticals. One group.",
  },
  {
    label: "Careers",
    href: "/careers",
    description: "Build a real career here.",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Start a conversation.",
  },
];

export default function NotFound() {
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

        <div className="relative z-10 max-w-[1600px] mx-auto px-8 lg:px-12 pt-32 md:pt-44 pb-20 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-start">
            {/* Left — Message */}
            <div>
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-serif text-[6rem] md:text-[8rem] font-semibold text-brand leading-none tracking-[-0.06em]">
                  4
                </span>
                <span className="font-serif text-[6rem] md:text-[8rem] font-semibold text-brand/15 leading-none tracking-[-0.06em]">
                  0
                </span>
                <span className="font-serif text-[6rem] md:text-[8rem] font-semibold text-brand leading-none tracking-[-0.06em]">
                  4
                </span>
              </div>

              <h1 className="font-serif text-2xl md:text-[2.4rem] font-semibold text-neutral-black leading-[1.12] tracking-[-0.05em]">
                This page doesn&apos;t exist.
              </h1>
              <p className="font-sans text-[14px] text-neutral-500 leading-relaxed max-w-sm mt-4 mb-8">
                The URL you followed is either outdated, mistyped, or the page
                has been moved. Pick a destination below.
              </p>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-3 bg-brand text-white font-sans text-[14px] font-semibold px-8 py-4 hover:bg-brand-600 transition-colors"
              >
                <ArrowRight />
                Back to Home
              </Link>
            </div>

            {/* Right — Page Links Grid */}
            <div className="border-t border-neutral-200 lg:border-t-0 lg:border-l lg:pl-12 pt-8 lg:pt-0">
              <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-neutral-400 mb-6">
                Or jump to
              </p>
              <div className="flex flex-col">
                {PAGES.map((page, i) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className={`group flex items-center justify-between py-5 ${
                      i < PAGES.length - 1 ? "border-b border-neutral-100" : ""
                    } hover:pl-2 transition-all duration-200`}
                  >
                    <div>
                      <span className="font-serif text-[17px] font-medium text-neutral-black group-hover:text-brand transition-colors">
                        {page.label}
                      </span>
                      <span className="block text-[12px] text-neutral-400 mt-0.5">
                        {page.description}
                      </span>
                    </div>
                    <ArrowRight className="text-neutral-300 group-hover:text-brand transition-colors flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
