"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { DitherShader } from "@/components/dither-shader";

const PEOPLE_IMAGES = [
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", name: "Arjun Mehta", h: 380 },
  { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80", name: "Priya Sharma", h: 300 },
  { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80", name: "Sameer Bhayani", h: 420 },
  { src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80", name: "Kshitiz Verma", h: 340 },
  { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80", name: "Nikhil Rao", h: 400 },
  { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80", name: "Deekshitha B C", h: 320 },
  { src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80", name: "Anirudh Gupta", h: 360 },
  { src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80", name: "Nikita Singh", h: 410 },
  { src: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&q=80", name: "Abhin Shetty", h: 330 },
  { src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80", name: "Mayank Shah", h: 390 },
  { src: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&q=80", name: "Riya Patel", h: 350 },
  { src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80", name: "Niranjan Murthi", h: 440 },
  { src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80", name: "Ananya Joshi", h: 300 },
  { src: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&q=80", name: "Rohan Desai", h: 380 },
  { src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80", name: "Kavya Nair", h: 400 },
  { src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80", name: "Vikram Reddy", h: 340 },
  { src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80", name: "Sneha Kulkarni", h: 360 },
  { src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80", name: "Meera Iyer", h: 410 },
  { src: "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400&q=80", name: "Aditya Kumar", h: 320 },
  { src: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&q=80", name: "Rahul Menon", h: 390 },
  { src: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80", name: "Divya Kapoor", h: 350 },
  { src: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=400&q=80", name: "Harsh Agarwal", h: 430 },
  { src: "https://images.unsplash.com/photo-1528892952291-009c663ce843?w=400&q=80", name: "Tanvi Hegde", h: 330 },
  { src: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=400&q=80", name: "Pranav Srinivasan", h: 380 },
];

function distributeToColumns(images: typeof PEOPLE_IMAGES, cols: number) {
  const columns: (typeof PEOPLE_IMAGES)[] = Array.from({ length: cols }, () => []);
  const heights = new Array(cols).fill(0);

  images.forEach((img) => {
    const shortest = heights.indexOf(Math.min(...heights));
    columns[shortest].push(img);
    heights[shortest] += img.h;
  });

  return columns;
}

function PersonCard({ person, height }: { person: (typeof PEOPLE_IMAGES)[number]; height: number }) {
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);

  return (
    <div
      className="relative overflow-hidden cursor-pointer"
      style={{ height }}
      onMouseEnter={() => { setHovered(true); setMounted(true); }}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={person.src}
        alt={person.name}
        fill
        className="object-cover grayscale"
        sizes="25vw"
      />

      {mounted && (
        <div
          className={`absolute inset-0 transition-opacity duration-500 ease-out ${hovered && ready ? "opacity-100" : "opacity-0"}`}
        >
          <DitherShader
            src={person.src}
            gridSize={2}
            ditherMode="bayer"
            colorMode="duotone"
            invert={false}
            animated={false}
            primaryColor="#1a1a1a"
            secondaryColor="#f0e0d4"
            threshold={0.5}
            className="absolute inset-0"
            onReady={() => setReady(true)}
          />
        </div>
      )}

      <div
        className={`absolute bottom-3 left-3 z-10 transition-all duration-300 ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
      >
        <span className="font-serif text-sm font-semibold text-neutral-black bg-white px-2 py-1.5 inline-block">
          {person.name}
        </span>
      </div>
    </div>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
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

export default function PeoplePage() {
  const columns = distributeToColumns(PEOPLE_IMAGES, 4);
  const mobileColumns = distributeToColumns(PEOPLE_IMAGES, 2);

  return (
    <main className="min-h-screen bg-white text-neutral-black font-sans">
      <Navbar />

      {/* Hero */}
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
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-end pt-20 md:pt-44 pb-12 md:pb-28">
            <div>
              <h1 className="font-serif text-[clamp(2.8rem,5.8vw,5.5rem)] font-semibold text-neutral-black leading-[1.08] tracking-[-0.07em]">
                Built by people who run{" "}
                <span className="text-stroke-brand">real estate sales</span> at scale.
              </h1>
            </div>
            <div className="flex flex-col gap-6 pb-2">
              <p className="text-[13px] text-neutral-500 leading-relaxed max-w-[280px]">
                From strategy to post-sales, our team brings decades of combined
                experience in transforming how developers sell.
              </p>
              <Link href="/careers" className="flex items-center gap-3 group w-fit">
                <span className="flex items-center justify-center w-9 h-9 bg-brand text-white transition-colors group-hover:bg-brand-600">
                  <ArrowRight />
                </span>
                <span className="text-[13px] font-semibold text-neutral-black">
                  Join the Team
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Image grid */}
      <section className="pb-10 px-4 md:px-8 lg:px-12">
        <div className="max-w-[1600px] mx-auto">

          {/* Desktop grid: 4 columns with dither hover */}
          <div className="hidden md:flex gap-2">
            {columns.map((col, colIdx) => (
              <div key={colIdx} className="flex-1 flex flex-col gap-2">
                {col.map((img, imgIdx) => (
                  <PersonCard key={imgIdx} person={img} height={img.h} />
                ))}
              </div>
            ))}
          </div>

          {/* Mobile grid: 2 columns, B&W only, with name overlay */}
          <div className="flex md:hidden gap-2">
            {mobileColumns.map((col, colIdx) => (
              <div key={colIdx} className="flex-1 flex flex-col gap-2">
                {col.map((img, imgIdx) => (
                  <div
                    key={imgIdx}
                    className="relative overflow-hidden"
                    style={{ height: img.h * 0.55 }}
                  >
                    <Image
                      src={img.src}
                      alt={img.name}
                      fill
                      className="object-cover grayscale"
                      sizes="50vw"
                    />
                    <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 bg-gradient-to-t from-black/60 to-transparent">
                      <span className="font-serif text-[11px] font-semibold text-white">
                        {img.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-[1600px] mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-4xl font-semibold text-neutral-black tracking-[-0.07em] mb-4">
            Want to be part of the team?
          </h2>
          <p className="text-[13px] text-neutral-500 mb-8 max-w-md mx-auto">
            We&apos;re always looking for driven people who want to build something meaningful in real estate.
          </p>
          <Link
            href="/careers"
            className="inline-flex items-center gap-3 bg-brand text-white font-sans text-[14px] font-semibold px-8 py-4 hover:bg-brand-600 transition-colors"
          >
            <ArrowRight />
            View Open Roles
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
