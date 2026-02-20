"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { DitherShader } from "@/components/dither-shader";

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

const GROWTH_PATHS = [
  {
    question: "Curious about branding after working in research?",
    action: "Work with that team.",
    bg: "var(--color-pastel-green)",
  },
  {
    question: "Want to understand sales after doing marketing?",
    action: "Shadow those cycles.",
    bg: "var(--color-pastel-blue)",
  },
  {
    question: "Ready to lead a function in 18 months instead of 5 years?",
    action: "Show us you can.",
    bg: "var(--color-pastel-yellow)",
  },
];

const ONBOARDING = [
  {
    week: "Week 1",
    title: "Context & Tools",
    desc: "Onboarding, product knowledge, market context. You understand what we do and how the system works.",
  },
  {
    week: "Week 2",
    title: "Real Project, Real Deadline",
    desc: "You\u2019re assigned to a live mandate. Real developer, real numbers, real support from your team.",
  },
  {
    week: "Week 3+",
    title: "You\u2019re in the arena",
    desc: "You\u2019re running. You\u2019ll make mistakes \u2014 everyone does \u2014 but you\u2019ll make them while doing, not simulating.",
  },
];

const CULTURE_POINTS = [
  "Your manager knows your name and your work",
  "Your ideas get heard, not filtered through five layers",
  "Your wins are celebrated by the whole team",
  "Your struggles are solved collaboratively, not bureaucratically",
];

const SUCCESS_STORIES = [
  {
    name: "Sameer Feroz Bhayani",
    currentRole: "Chief Business Officer",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    timeline: [
      { date: "Nov 2021", role: "Joined as Senior Project Manager" },
      { date: "Apr 2022", role: "Promoted to Project Lead" },
      { date: "Dec 2022", role: "Promoted to Regional Head" },
      { date: "Nov 2023", role: "Associate Director of Sales" },
      { date: "Apr 2025", role: "Chief Business Officer" },
    ],
  },
  {
    name: "Deekshitha B C",
    currentRole: "CRM Lead",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    timeline: [
      { date: "Nov 2023", role: "Joined as Project Manager" },
      { date: "Feb 2025", role: "Promoted to Project Lead" },
      { date: "Sep 2025", role: "Moved to CRM as CRM Lead" },
    ],
  },
  {
    name: "Niranjan Murthi K R",
    currentRole: "Design Lead",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&q=80",
    timeline: [
      { date: "Aug 2023", role: "Joined as Sr. Graphic Designer" },
      { date: "Apr 2024", role: "Promoted to Design Lead" },
      { date: "Nov 2024", role: "Moved to AITI Interieurs" },
    ],
  },
];

const THRIVES_HERE = [
  {
    title: "How cities grow",
    desc: "You\u2019re curious about urbanisation, micro-markets, and what drives demand in real estate.",
  },
  {
    title: "Why people choose homes",
    desc: "You think about buyer psychology, lifestyle decisions, and what makes a project resonate.",
  },
  {
    title: "What makes developers succeed",
    desc: "You want to understand the business of real estate \u2014 not just the transactions.",
  },
  {
    title: "Solving problems with data and grit",
    desc: "You\u2019d rather find the answer than wait for someone to give it to you.",
  },
];

const OPEN_ROLES = [
  {
    category: "Direct Sales",
    roles: [
      {
        title: "Project Lead",
        location: "Bangalore",
        experience: "5\u20138 years",
      },
      {
        title: "Project Manager Sales",
        location: "Hyderabad",
        experience: "2\u20137 years",
      },
    ],
  },
  {
    category: "Sales",
    roles: [
      {
        title: "Cluster Manager",
        location: "Bangalore",
        experience: "5\u201310 years",
      },
      {
        title: "Relationship Manager",
        location: "Bangalore",
        experience: "1\u20136 years",
      },
      {
        title: "Project Manager",
        location: "Bangalore",
        experience: "0\u20136 years",
      },
    ],
  },
  {
    category: "Operations",
    roles: [
      {
        title: "Business Planning Manager",
        location: "Bangalore",
        experience: "2\u20133 years",
      },
    ],
  },
  {
    category: "HR",
    roles: [
      {
        title: "HR Manager",
        location: "Bangalore",
        experience: "4\u20138 years",
      },
    ],
  },
];

const CANDIDATE_FAQS = [
  {
    question: "Do I need a real estate background?",
    answer:
      "No. We look for clear thinking, ownership, and the willingness to learn quickly. Most of our team didn\u2019t come from real estate. The industry knowledge is built here.",
  },
  {
    question: "What does the interview process look like?",
    answer:
      "Typically a short call, followed by a case discussion or task relevant to the role, then a final conversation with leadership. Usually wraps up within two weeks.",
  },
  {
    question: "What\u2019s the team size?",
    answer:
      "Growing across Bangalore and Hyderabad. Small enough that your work is visible, large enough that you\u2019re working on real-scale mandates from day one.",
  },
  {
    question: "Is this remote?",
    answer:
      "Most roles are on-ground since our work is tied to live projects and developer relationships. Some corporate functions have flexibility \u2014 it\u2019s mentioned in each listing.",
  },
  {
    question: "How fast can I grow here?",
    answer:
      "Depends entirely on you. We\u2019ve had people go from trainee to senior roles in under a year. There\u2019s no waiting period \u2014 impact drives progression.",
  },
];

/* ── Hero ── */

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
      const isMob = windowWidth < 768;
      const containerWidth = Math.min(1600, windowWidth - 96);
      const containerPct = (containerWidth / windowWidth) * 100;
      const progress = Math.min(scrollY / 500, 1);
      setImageWidth(isMob ? 100 : 100 - progress * (100 - containerPct));
      setImageScale(isMob ? 1 : 1 + progress * 0.15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={heroRef} className="relative pt-16">
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
            <h1 className="font-serif text-[clamp(2.8rem,5.8vw,5.5rem)] font-semibold text-neutral-black leading-[1.08] tracking-[-0.07em]">
              Your next{" "}
              <span className="font-semibold text-stroke-brand">move</span>{" "}
              starts here.
            </h1>
          </div>
          <div className="flex flex-col gap-6 pb-2">
            <p className="text-[13px] text-neutral-500 leading-relaxed max-w-[280px]">
              We&apos;re not just building real estate projects. We&apos;re
              building the people who shape how India lives, invests, and
              experiences real estate.
            </p>
            <a
              href="#open-roles"
              className="flex items-center gap-3 group w-fit"
            >
              <span className="flex items-center justify-center w-9 h-9 bg-brand text-white transition-colors group-hover:bg-brand-600">
                <ArrowRight />
              </span>
              <span className="text-[13px] font-semibold text-neutral-black">
                See Open Roles
              </span>
            </a>
          </div>
        </div>
      </div>
      <div
        ref={imageWrapperRef}
        className="relative z-10 mx-auto"
        style={{ width: `${imageWidth}%` }}
      >
        <div className="relative w-full h-[50vh] md:h-auto md:aspect-[16/4.5] overflow-hidden">
          <Image
            src="/careers.png"
            alt="Team at Credvest"
            fill
            className="object-cover transition-transform duration-100 ease-out"
            style={{ transform: `scale(${imageScale})` }}
            priority
          />
        </div>
      </div>
    </section>
  );
}

/* ── Intro Statement ── */

function IntroSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
        <div className="max-w-2xl">
          <p className="font-serif text-xl md:text-2xl text-neutral-black leading-[1.3] tracking-[-0.04em] font-semibold">
            From positioning to sales to post-launch execution, we&apos;re the
            end-to-end partner developers trust. We&apos;re looking for people
            who want to build something meaningful &mdash; not chase
            transactions.
          </p>
          <p className="font-sans text-[13px] text-neutral-400 leading-relaxed mt-4">
            You don&apos;t need a real estate background. You need clear
            thinking, ownership, and the drive to learn fast. The rest is built
            here.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── You'll Actually Build Things ── */

function BuildSection() {
  return (
    <section className="bg-white">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-20 md:py-32">
        <div className="flex flex-col lg:grid lg:grid-cols-[420px_1fr] gap-8 lg:gap-28">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand mb-4 block font-sans">
              The Work
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-semibold text-neutral-black leading-[1.1] tracking-[-0.07em]">
              You&apos;ll actually build things.
            </h2>
            <p className="font-sans text-[14px] text-neutral-500 leading-relaxed mt-5 max-w-sm">
              This isn&apos;t apprenticeship. It&apos;s ownership. Real
              projects, real accountability, from your first week.
            </p>
          </div>

          <div className="flex flex-col border-l border-neutral-200 pl-6 lg:pl-14">
            {[
              {
                number: "01",
                title: "Real projects from week one",
                desc: "No training wheels. You\u2019re on a live mandate with a real developer, real buyers, and real numbers. The accountability is immediate.",
              },
              {
                number: "02",
                title: "You see the full picture",
                desc: "Positioning, marketing, sales, execution \u2014 you don\u2019t get siloed into one function. You understand how a project goes from launch to sell-out.",
              },
              {
                number: "03",
                title: "Outcomes, not activity",
                desc: "Clear metrics. Weekly reviews. Structured feedback. You\u2019ll always know where you stand, what\u2019s working, and what to fix.",
              },
            ].map((item, i) => (
              <div
                key={item.number}
                className="grid grid-cols-[70px_1fr] gap-10 py-10 md:py-14"
                style={{
                  borderTop: i === 0 ? "1px solid #E0E0E0" : "none",
                  borderBottom: "1px solid #E0E0E0",
                }}
              >
                <span className="font-serif text-[2.5rem] font-medium text-neutral-200 leading-none">
                  {item.number}
                </span>
                <div>
                  <h3 className="font-serif text-xl md:text-2xl font-semibold text-neutral-black tracking-[-0.04em] mb-3">
                    {item.title}
                  </h3>
                  <p className="font-sans text-[14px] text-neutral-500 leading-relaxed max-w-md">
                    {item.desc}
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

/* ── You'll Grow Faster ── */

function GrowSection() {
  return (
    <section className="bg-white border-t border-dashed border-neutral-200">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-20 md:py-32">
        <div className="text-center mb-14">
          <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand mb-4 block font-sans">
            Career Acceleration
          </span>
          <h2 className="font-serif text-3xl md:text-[2.8rem] font-semibold text-neutral-black leading-[1.12] tracking-[-0.07em] mb-4">
            You&apos;ll grow faster here
            <br />
            than anywhere else.
          </h2>
          <p className="font-sans text-[14px] text-neutral-500 leading-relaxed max-w-lg mx-auto">
            Big companies have career paths. We have career velocity. Your
            growth isn&apos;t locked into one vertical &mdash; it moves with
            your curiosity and your output.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {GROWTH_PATHS.map((path) => (
            <div
              key={path.action}
              className="flex flex-col justify-between p-8 md:p-10"
              style={{ backgroundColor: path.bg, minHeight: 240 }}
            >
              <p className="font-serif text-[17px] md:text-lg font-medium text-neutral-800 leading-relaxed tracking-[-0.01em]">
                {path.question}
              </p>
              <p className="font-sans text-[14px] font-semibold text-brand mt-6">
                {path.action}
              </p>
            </div>
          ))}
        </div>

        <p className="font-sans text-[13px] text-neutral-400 text-center mt-8">
          We promote on merit, not tenure. No bureaucracy blocking your path.
        </p>
      </div>
    </section>
  );
}

/* ── You'll Learn By Doing ── */

function LearnSection() {
  return (
    <section className="bg-white">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-20 md:py-32">
        <div className="text-center mb-14">
          <h2 className="font-serif text-3xl md:text-[2.8rem] font-semibold text-neutral-black leading-[1.12] tracking-[-0.07em] mb-4">
            You&apos;ll learn by doing.
            <br />
            Not by watching.
          </h2>
          <p className="font-sans text-[14px] text-neutral-500 leading-relaxed max-w-lg mx-auto">
            No six-month training programmes where you watch others work.
            Here&apos;s how learning actually happens at Credvest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-neutral-200">
          {ONBOARDING.map((step, i) => (
            <div key={step.week} className="bg-white p-8 md:p-10">
              <span className="text-[11px] font-bold tracking-widest text-brand mb-2 block">
                {step.week}
              </span>
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-neutral-black mb-3 tracking-[-0.04em] leading-[1.15]">
                {step.title}
              </h3>
              <p className="font-sans text-[13px] text-neutral-500 leading-relaxed">
                {step.desc}
              </p>
              {i < ONBOARDING.length - 1 && (
                <div className="hidden md:flex items-center justify-end mt-6 text-neutral-300">
                  <ArrowRight />
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="font-sans text-[14px] text-neutral-500 leading-relaxed max-w-2xl mx-auto text-center mt-10">
          You&apos;ll have mentors who&apos;ve been there, not trainers reading
          from manuals.{" "}
          <span className="text-brand font-semibold">
            Learning curve? Steep. But so is your growth.
          </span>
        </p>
      </div>
    </section>
  );
}

/* ── Who You'll Work With ── */

function CultureSection() {
  return (
    <section className="bg-white border-t border-dashed border-neutral-200">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand mb-4 block font-sans">
              Culture
            </span>
            <h2 className="font-serif text-3xl md:text-[2.8rem] font-semibold text-neutral-black leading-[1.12] tracking-[-0.07em]">
              You&apos;ll work with people
              <br />
              who give a damn.
            </h2>
            <p className="font-sans text-[14px] text-neutral-500 leading-relaxed mt-5 max-w-md">
              We&apos;re small enough that your work matters, and direct enough
              that you&apos;ll always know where you stand.
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex flex-col gap-0">
              {CULTURE_POINTS.map((point, i) => (
                <div key={point} className="flex items-center gap-5 py-5 border-b border-neutral-100">
                  <span className="font-serif text-4xl md:text-5xl font-semibold text-neutral-200 leading-none tracking-[-0.04em] select-none w-12 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-serif text-[17px] md:text-[19px] font-medium text-neutral-800 leading-snug tracking-[-0.02em]">
                    {point}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-neutral-50 p-6">
              <p className="font-sans text-[14px] text-neutral-500 leading-relaxed">
                We don&apos;t do office politics. We do direct feedback,
                transparent conversations, and solving problems instead of
                assigning blame.
              </p>
              <p className="font-serif text-[16px] font-semibold text-neutral-black mt-3 tracking-[-0.02em]">
                If you want colleagues who care more about outcomes than
                optics, you&apos;ll fit right in.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Success Stories ── */

function StoryImage({ src }: { src: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-full h-full overflow-hidden cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Real image underneath, shown on hover */}
      <Image
        src={src}
        alt="Team member"
        fill
        className={`object-cover transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`}
        sizes="(max-width: 768px) 100vw, 40vw"
      />
      {/* Dither on top, hidden on hover */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${hovered ? "opacity-0" : "opacity-100"}`}>
        <DitherShader
          src={src}
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
  );
}

function SuccessStoriesSection() {
  const [activeStory, setActiveStory] = useState(0);
  const [progress, setProgress] = useState(0);
  const story = SUCCESS_STORIES[activeStory];
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const elapsedRef = useRef(0);
  const DURATION = 10000;
  const TICK = 50;

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    elapsedRef.current = 0;
    intervalRef.current = setInterval(() => {
      elapsedRef.current += TICK;
      const p = Math.min(elapsedRef.current / DURATION, 1);
      setProgress(p);
      if (elapsedRef.current >= DURATION) {
        setActiveStory((prev) => (prev + 1) % SUCCESS_STORIES.length);
        elapsedRef.current = 0;
      }
    }, TICK);
  }, []);

  useEffect(() => {
    startInterval();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startInterval]);

  const goTo = (idx: number) => {
    setActiveStory(idx);
    setProgress(0);
    startInterval();
  };
  const goPrev = () => goTo((activeStory - 1 + SUCCESS_STORIES.length) % SUCCESS_STORIES.length);
  const goNext = () => goTo((activeStory + 1) % SUCCESS_STORIES.length);

  return (
    <section className="bg-white">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-20 md:py-32">
        <div className="mb-14">
          <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand mb-4 block font-sans">
            Growth Stories
          </span>
          <h2 className="font-serif text-3xl md:text-[2.8rem] font-semibold text-neutral-black leading-[1.12] tracking-[-0.07em]">
            Real careers. Real timelines.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-0 border border-neutral-200 min-h-[480px]">
          {/* Left — image with dither */}
          <div className="relative h-[300px] lg:h-auto">
            <StoryImage key={activeStory} src={story.image} />
            <div className="absolute bottom-4 left-4 z-10">
              <span className="font-serif text-sm font-semibold text-neutral-black bg-white px-2 py-1.5 inline-block">
                {story.name.split(" ")[0]}
              </span>
            </div>
            {/* Progress bar below image */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-neutral-200 z-20">
              <div
                className="h-full bg-brand transition-[width] duration-75 ease-linear"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>

          {/* Right — timeline + nav arrows */}
          <div className="bg-white p-6 md:p-10 flex flex-col">
            <div className="mb-6">
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-neutral-black tracking-[-0.04em]">
                {story.name}
              </h3>
              <p className="font-sans text-[13px] text-brand font-semibold mt-1">
                {story.currentRole}
              </p>
            </div>

            <div className="relative pl-6 flex-1">
              <div className="absolute left-[4px] top-2 bottom-2 w-px bg-neutral-200" />
              <div className="flex flex-col gap-5">
                {story.timeline.map((step, i) => {
                  const isLast = i === story.timeline.length - 1;
                  return (
                    <div key={step.date} className="relative flex gap-5">
                      <div
                        className={`absolute -left-6 top-1.5 w-[9px] h-[9px] rounded-full border-2 flex-shrink-0 ${
                          isLast
                            ? "bg-brand border-brand"
                            : "bg-white border-neutral-300"
                        }`}
                      />
                      <div>
                        <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-neutral-400 block mb-0.5">
                          {step.date}
                        </span>
                        <p
                          className={`font-serif text-[14px] md:text-[16px] tracking-[-0.01em] ${
                            isLast
                              ? "font-semibold text-brand"
                              : "font-medium text-neutral-700"
                          }`}
                        >
                          {step.role}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation arrows bottom-right */}
            <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-neutral-100">
              <span className="text-[12px] text-neutral-400 font-sans mr-auto">
                {activeStory + 1} / {SUCCESS_STORIES.length}
              </span>
              <button
                onClick={goPrev}
                className="w-9 h-9 flex items-center justify-center border border-neutral-200 hover:border-neutral-400 transition-colors"
                aria-label="Previous story"
              >
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                  <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={goNext}
                className="w-9 h-9 flex items-center justify-center border border-neutral-200 hover:border-neutral-400 transition-colors"
                aria-label="Next story"
              >
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                  <path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── People Quotes — TextCard + BigCard Grid ── */

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
          <p className="font-sans text-[14px] font-semibold tracking-tight text-neutral-700 max-w-[260px]">
            {desc}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between px-2 pb-2">
        <p className="font-serif text-2xl tracking-tight text-neutral-black tracking-[-0.01em]">
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

const CAREERS_BIG_CARD_IMAGES = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
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
        <div className={`absolute inset-0 transition-opacity duration-500 ${hovered ? "opacity-0" : "opacity-100"}`}>
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

function PeopleSection() {
  return (
    <section className="bg-white border-t border-dashed border-neutral-200">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 py-20 md:py-32">
        <div className="text-center mb-14">
          <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand mb-4 block font-sans">
            Hear From The Team
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-neutral-black leading-[1.12] tracking-[-0.07em]">
            In their own words.
          </h2>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="md:flex-1 flex flex-col md:flex-row gap-5">
              <div className="flex-1">
                <TextCard
                  bg="var(--color-pastel-green)"
                  title="Trainee to senior in under a year"
                  desc="Live project experience from day one. Not simulations. Actual mandates."
                  person="Aishwarya"
                  role="Sales"
                />
              </div>
              <div className="flex-1">
                <TextCard
                  bg="var(--color-pastel-blue)"
                  title="Market knowledge, not scripts"
                  desc="The training here builds market understanding, not just process fluency."
                  person="Nikhil"
                  role="AGM"
                />
              </div>
            </div>
            <div className="md:flex-1">
              <BigCard
                imgSrc={CAREERS_BIG_CARD_IMAGES[0]}
                desc={
                  "\u201COur focus isn\u2019t just on selling. It\u2019s on guiding clients through their decision as consultants, not salespeople.\u201D"
                }
                person="Bhavya"
                role="GM, Sales"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-5">
            <div className="md:flex-1">
              <BigCard
                imgSrc={CAREERS_BIG_CARD_IMAGES[1]}
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
                  title="Real responsibility, early"
                  desc="Good work gets noticed. People are given real ownership early, not after a waiting period."
                  person="Roopesh"
                  role="HR"
                />
              </div>
              <div className="flex-1">
                <TextCard
                  bg="var(--color-pastel-yellow)"
                  title="Consulting, not closing"
                  desc="Our teams are trained to consult, not to close. Trust converts better than pressure."
                  person="Dharti"
                  role="Sales"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Who Thrives Here ── */

function ThrivesSection() {
  return (
    <section className="bg-white">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-20 md:py-32">
        <div className="text-center mb-14">
          <h2 className="font-serif text-3xl md:text-[2.8rem] font-semibold text-neutral-black leading-[1.12] tracking-[-0.07em] mb-4">
            Who thrives here?
          </h2>
          <p className="font-sans text-[14px] text-neutral-500 leading-relaxed max-w-lg mx-auto">
            You don&apos;t need a degree in real estate. You need curiosity
            about:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-neutral-200">
          {THRIVES_HERE.map((item) => (
            <div key={item.title} className="bg-white p-8 md:p-10">
              <h3 className="font-serif text-xl font-semibold text-neutral-black mb-3 tracking-[-0.04em] leading-[1.15]">
                {item.title}
              </h3>
              <p className="font-sans text-[13px] text-neutral-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <p className="font-sans text-[14px] text-neutral-500 text-center mt-8">
          If you&apos;re intellectually curious and willing to learn,{" "}
          <span className="text-neutral-700 font-medium">
            we&apos;ll teach you the rest.
          </span>
        </p>
      </div>
    </section>
  );
}

/* ── Open Roles ── */

function OpenRolesSection() {
  const [expandedCategory, setExpandedCategory] = useState<string>(
    OPEN_ROLES[0].category,
  );
  const activeGroup = OPEN_ROLES.find((g) => g.category === expandedCategory);

  return (
    <section
      id="open-roles"
      className="bg-white border-t border-dashed border-neutral-200"
    >
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand mb-4 block font-sans">
              Open Positions
            </span>
            <h2 className="font-serif text-3xl md:text-[2.8rem] font-semibold text-neutral-black leading-[1.12] tracking-[-0.07em] mb-12">
              Find Your Role
            </h2>

            <div>
              {OPEN_ROLES.map((group) => {
                const isActive = expandedCategory === group.category;
                return (
                  <button
                    key={group.category}
                    onClick={() => setExpandedCategory(group.category)}
                    className={`w-full text-left py-4 flex items-center justify-between transition-all border-b ${
                      isActive ? "border-brand" : "border-neutral-200"
                    }`}
                  >
                    <span
                      className={`font-serif text-lg md:text-xl font-semibold tracking-[-0.01em] transition-colors duration-300 ${
                        isActive ? "text-neutral-black" : "text-neutral-400"
                      }`}
                    >
                      {group.category}
                    </span>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-brand/10 text-brand"
                          : "bg-neutral-100 text-neutral-400"
                      }`}
                    >
                      {group.roles.length}{" "}
                      {group.roles.length === 1 ? "role" : "roles"}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-10 p-6 border border-dashed border-neutral-300">
              <h4 className="font-serif text-lg font-semibold text-neutral-black tracking-[-0.01em] mb-2">
                Don&apos;t see your role?
              </h4>
              <p className="font-sans text-[13px] text-neutral-500 leading-relaxed mb-4">
                We&apos;re always looking for clear thinkers. Send us your
                profile and we&apos;ll reach out when something fits.
              </p>
              <Link
                href="/contact"
                className="flex items-center gap-2 group w-fit"
              >
                <span className="flex items-center justify-center w-7 h-7 bg-brand text-white">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-[12px] font-semibold text-neutral-black">
                  Get in Touch
                </span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            {activeGroup && (
              <div>
                <p className="text-[11px] font-semibold text-brand mb-6 tracking-[0.15em] uppercase">
                  {activeGroup.category}
                </p>
                <div>
                  {activeGroup.roles.map((role, i) => (
                    <div
                      key={role.title}
                      className={`py-5 hover:pl-2 transition-all ${
                        i < activeGroup.roles.length - 1
                          ? "border-b border-neutral-200"
                          : ""
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-serif text-lg font-semibold text-neutral-black mb-1 tracking-[-0.01em]">
                            {role.title}
                          </h4>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-neutral-400 flex items-center gap-1">
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                              </svg>
                              {role.location}
                            </span>
                            <span className="text-neutral-200">&middot;</span>
                            <span className="text-xs text-neutral-400">
                              {role.experience}
                            </span>
                          </div>
                        </div>
                        <button className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wide bg-neutral-900 text-white hover:bg-brand transition-colors flex-shrink-0">
                          Apply +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
              Before You Apply
            </span>
            <h2 className="font-serif text-3xl md:text-[2.8rem] font-semibold text-neutral-black leading-[1.12] tracking-[-0.07em] mb-6">
              Questions
              <br />
              candidates ask.
            </h2>
            <p className="text-[14px] text-neutral-500 leading-relaxed">
              Straight answers. No HR-speak.
            </p>
          </div>

          <div className="flex flex-col">
            {CANDIDATE_FAQS.map((item, i) => {
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
        <h2 className="font-serif text-4xl md:text-[3.8rem] font-semibold text-neutral-black leading-[1.12] tracking-[-0.07em] mb-6">
          Ready to build something{" "}
          <span className="font-semibold text-stroke-brand">different</span>?
        </h2>
        <p className="font-sans text-[14px] text-neutral-500 leading-relaxed max-w-md mx-auto mb-10">
          Disciplined, ambitious, and growing. If that&apos;s how you work,
          we&apos;d like to hear from you.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 bg-brand text-white font-sans text-[14px] font-semibold px-8 py-4 hover:bg-brand-600 transition-colors"
        >
          <ArrowRight />
          Get in Touch
        </Link>
      </div>
    </section>
  );
}

/* ── Page ── */

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-black font-sans">
      <Navbar />
      <HeroSection />
      <IntroSection />
      <BuildSection />
      <GrowSection />
      <LearnSection />
      <CultureSection />
      <SuccessStoriesSection />
      <PeopleSection />
      <ThrivesSection />
      <OpenRolesSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
