"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────
   BRAND TOKENS
   ───────────────────────────────────────────── */

const SERIF_FONT = "'Noto Serif SC', serif";
const SANS_FONT = "'Inter', sans-serif";

const PRIMARY = {
  name: "Orange",
  hex: "#FA412A",
  shades: [
    { label: "50", hex: "#FFF1F0" },
    { label: "100", hex: "#FFE0DC" },
    { label: "200", hex: "#FFC2B8" },
  ],
};

const PRIMARY_ALT_SHADES = [
  { label: "50", hex: "#FFF1F0" },
  { label: "100", hex: "#FFE0DC" },
  { label: "200", hex: "#FFC2B8" },
];

const SECONDARY_COLORS = [
  { name: "Light", hex: "#F2F2F2", opacity: "100%", token: "F2F2F2" },
  { name: "Mid", hex: "#EAEAEA", opacity: "100%", token: "EAEAEA" },
  { name: "Soft", hex: "#F5F5F5", opacity: "100%", token: "F5F5F5" },
  { name: "Muted", hex: "#EFEFEF", opacity: "100%", token: "EFEFEF" },
];

const NEUTRALS_DARK = [
  { label: "Black", hex: "#0A0A0A" },
  { label: "900", hex: "#1A1A1A" },
  { label: "800", hex: "#2E2E2E" },
  { label: "700", hex: "#454545" },
  { label: "600", hex: "#5C5C5C" },
  { label: "500", hex: "#7A7A7A" },
];

const NEUTRALS_LIGHT = [
  { label: "400", hex: "#A0A0A0" },
  { label: "300", hex: "#C4C4C4" },
  { label: "200", hex: "#E0E0E0" },
  { label: "100", hex: "#F0F0F0" },
  { label: "50", hex: "#F8F8F8" },
  { label: "White", hex: "#FFFFFF" },
];

const NOTO_WEIGHTS = [
  { label: "Extra Light", weight: 200 },
  { label: "Light", weight: 300 },
  { label: "Regular", weight: 400 },
  { label: "Medium", weight: 500 },
  { label: "Semi Bold", weight: 600 },
  { label: "Bold", weight: 700 },
  { label: "Black", weight: 900 },
];

const INTER_WEIGHTS = [
  { label: "Thin", weight: 100 },
  { label: "Extra Light", weight: 200 },
  { label: "Light", weight: 300 },
  { label: "Regular", weight: 400 },
  { label: "Medium", weight: 500 },
  { label: "Semi Bold", weight: 600 },
  { label: "Bold", weight: 700 },
  { label: "Extra Bold", weight: 800 },
  { label: "Black", weight: 900 },
];

/* ─────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────── */

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

function isLight(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 155;
}

/* ─────────────────────────────────────────────
   SMALL COMPONENTS
   ───────────────────────────────────────────── */

function ColorSwatch({
  hex,
  label,
  sublabel,
  height = 100,
  opacity,
}: {
  hex: string;
  label: string;
  sublabel?: string;
  height?: number;
  opacity?: string;
}) {
  const [copied, setCopied] = useState(false);
  const light = isLight(hex);

  return (
    <button
      onClick={() => {
        copyToClipboard(hex);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      className="group relative flex flex-col justify-end overflow-hidden transition-transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
      style={{
        backgroundColor: hex,
        opacity: opacity ? parseInt(opacity) / 100 : 1,
        height,
      }}
    >
      {copied && (
        <span
          className="absolute top-2 right-2 text-[10px] font-medium px-1.5 py-0.5"
          style={{
            background: light ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.12)",
            color: light ? "#0A0A0A" : "#fff",
          }}
        >
          Copied
        </span>
      )}
      <div className="p-2.5">
        <p
          className="text-xs font-medium"
          style={{ color: light ? "#0A0A0A" : "#fff" }}
        >
          {label}
        </p>
        {sublabel && (
          <p
            className="text-[10px] mt-0.5"
            style={{ color: light ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.5)" }}
          >
            {sublabel}
          </p>
        )}
      </div>
    </button>
  );
}

/* ─────────────────────────────────────────────
   CREDVEST EDGE — DATA
   ───────────────────────────────────────────── */

const LIFECYCLE_STAGES = [
  {
    id: "positioning",
    number: "01",
    title: "Positioning",
    subtitle: "Pre-Launch",
    tooltip: "Benchmark pricing + narrative control",
    description: "Clear narrative before demand generation begins.",
  },
  {
    id: "launch",
    number: "02",
    title: "Launch",
    subtitle: "Market Entry",
    tooltip: "Demand-aligned go-to-market",
    description: "Spend aligned to qualified buyer intent.",
  },
  {
    id: "sales",
    number: "03",
    title: "Sales",
    subtitle: "Active Pipeline",
    tooltip: "Direct relationship control",
    description: "Channel control eliminates dilution.",
  },
  {
    id: "conversion",
    number: "04",
    title: "Conversion",
    subtitle: "Deal Structuring",
    tooltip: "Structured negotiation discipline",
    description: "Negotiation discipline protects value.",
  },
  {
    id: "closure",
    number: "05",
    title: "Closure",
    subtitle: "Confirmation",
    tooltip: "Margin protection hierarchy",
    description: "Approval hierarchy prevents margin leakage.",
  },
  {
    id: "advocacy",
    number: "06",
    title: "Advocacy",
    subtitle: "Loyalty & Retention",
    tooltip: "Brand authority & retention",
    description: "Structured experience drives repeat and referral.",
  },
];

/* Graph Y values (0–100 scale, higher = better) */
const TYPICAL_Y = [35, 42, 33, 40, 28, 38]; // grey – dips at sales & closure
const CREDVEST_Y = [52, 60, 68, 76, 84, 94]; // red – smooth upward

const STAGE_DURATION = 3000; // ms per stage in auto-advance

function CredvestEdgeSection() {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isUserHovering, setIsUserHovering] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<number>(0);
  const animFrameRef = useRef<number>(0);
  const lastTickRef = useRef<number>(0);

  /* Auto-advance timer with progress bar */
  useEffect(() => {
    if (isUserHovering) return;

    progressRef.current = 0;
    lastTickRef.current = 0;

    const tick = (now: number) => {
      if (lastTickRef.current === 0) {
        lastTickRef.current = now;
      }
      const delta = now - lastTickRef.current;
      lastTickRef.current = now;
      progressRef.current += delta;
      const pct = Math.min(progressRef.current / STAGE_DURATION, 1);
      setProgress(pct);

      if (pct >= 1) {
        setActiveStage((prev) => (prev + 1) % LIFECYCLE_STAGES.length);
      } else {
        animFrameRef.current = requestAnimationFrame(tick);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [activeStage, isUserHovering]);

  const handleStageHover = useCallback((i: number) => {
    setIsUserHovering(true);
    setActiveStage(i);
    setProgress(1);
  }, []);

  const handleStageLeave = useCallback(() => {
    setIsUserHovering(false);
    setProgress(0);
    progressRef.current = 0;
  }, []);

  /* SVG layout constants */
  const svgW = 900;
  const svgH = 320;
  const padL = 60;
  const padR = 60;
  const padT = 60;
  const padB = 40;
  const graphW = svgW - padL - padR;
  const graphH = svgH - padT - padB;

  const stageCount = LIFECYCLE_STAGES.length;
  const xStep = graphW / (stageCount - 1);

  const toX = (i: number) => padL + i * xStep;
  const toY = (v: number) => padT + graphH - (v / 100) * graphH;

  const buildPath = (values: number[]) =>
    values.map((v, i) => `${toX(i)},${toY(v)}`).join(" ");

  const buildSmoothPath = (values: number[]) => {
    const points = values.map((v, i) => ({ x: toX(i), y: toY(v) }));
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpx1 = prev.x + (curr.x - prev.x) * 0.4;
      const cpx2 = curr.x - (curr.x - prev.x) * 0.4;
      d += ` C ${cpx1} ${prev.y}, ${cpx2} ${curr.y}, ${curr.x} ${curr.y}`;
    }
    return d;
  };

  const buildAreaPath = (values: number[]) => {
    const curvePath = buildSmoothPath(values);
    const lastX = toX(values.length - 1);
    const firstX = toX(0);
    return `${curvePath} L ${lastX} ${toY(0)} L ${firstX} ${toY(0)} Z`;
  };

  /* Column width for overlay (percentage per stage) */
  const colWidthPct = 100 / stageCount;

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        {/* Header — left aligned, larger */}
        <div className="mb-14">
          <span className="inline-block text-xs font-semibold tracking-wider uppercase px-3 py-1 border border-[#FA412A]/20 text-[#FA412A] mb-5">
            Lifecycle Framework
          </span>
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 mb-3"
            style={{ fontFamily: SERIF_FONT, letterSpacing: "-0.03em" }}
          >
            The Credvest Edge
          </h2>
          <p className="text-base md:text-lg text-neutral-500 max-w-xl leading-relaxed">
            Lifecycle control that drives margin protection and predictable velocity.
          </p>
        </div>

        {/* ── Interactive area — relative wrapper for column overlay ── */}
        <div className="relative">

          {/* Diagonal-striped column overlay */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none z-10"
            style={{
              left: `${activeStage * colWidthPct}%`,
              width: `${colWidthPct}%`,
              transition: "left 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              background: `
                repeating-linear-gradient(
                  -45deg,
                  rgba(250, 65, 42, 0.04),
                  rgba(250, 65, 42, 0.04) 4px,
                  transparent 4px,
                  transparent 12px
                )
              `,
              borderLeft: "1px solid rgba(250, 65, 42, 0.1)",
              borderRight: "1px solid rgba(250, 65, 42, 0.1)",
            }}
          />

          {/* ── Stage Tabs ── */}
          <div className="grid grid-cols-6 relative z-20">
            {LIFECYCLE_STAGES.map((stage, i) => (
              <button
                key={stage.id}
                onMouseEnter={() => handleStageHover(i)}
                onMouseLeave={handleStageLeave}
                className="relative py-5 px-4 text-left cursor-default transition-all"
              >
                <span
                  className="block text-[11px] font-bold tracking-widest uppercase mb-1 transition-colors duration-300"
                  style={{ color: activeStage === i ? "#FA412A" : "#999" }}
                >
                  {stage.number}
                </span>
                <span
                  className="block text-lg md:text-xl font-semibold transition-colors duration-300"
                  style={{
                    fontFamily: SERIF_FONT,
                    color: activeStage === i ? "#FA412A" : "#454545",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {stage.title}
                </span>
                <span
                  className="block text-[11px] mt-1 transition-colors duration-300"
                  style={{ color: activeStage === i ? "#FA412A99" : "#999" }}
                >
                  {stage.subtitle}
                </span>

                {/* Progress bar under each tab */}
                <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-neutral-100 overflow-hidden">
                  <div
                    className="h-full bg-[#FA412A]"
                    style={{
                      width: activeStage === i ? `${progress * 100}%` : activeStage > i ? "100%" : "0%",
                      transition: activeStage === i ? "none" : "width 0.3s ease",
                    }}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* ── SVG Graph ── */}
          <div
            className="relative z-20 -mt-1 -mb-1"
            onMouseEnter={() => setIsUserHovering(true)}
            onMouseLeave={() => setIsUserHovering(false)}
          >
            <svg
              viewBox={`0 0 ${svgW} ${svgH}`}
              className="w-full h-auto"
              style={{ maxHeight: 340 }}
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="credvest-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FA412A" stopOpacity="0.10" />
                  <stop offset="100%" stopColor="#FA412A" stopOpacity="0.01" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="tooltip-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.08" />
                </filter>
              </defs>

              {/* Horizontal grid lines */}
              {[0, 25, 50, 75, 100].map((v) => (
                <g key={v}>
                  <line
                    x1={padL}
                    y1={toY(v)}
                    x2={svgW - padR}
                    y2={toY(v)}
                    stroke="#F0F0F0"
                    strokeWidth="1"
                  />
                  <text
                    x={padL - 14}
                    y={toY(v) + 3.5}
                    textAnchor="end"
                    fill="#D4D4D4"
                    fontSize="9"
                    fontFamily="Inter, sans-serif"
                  >
                    {v}
                  </text>
                </g>
              ))}

              {/* Vertical stage dashed markers */}
              {LIFECYCLE_STAGES.map((_, i) => (
                <line
                  key={i}
                  x1={toX(i)}
                  y1={padT}
                  x2={toX(i)}
                  y2={svgH - padB}
                  stroke="#F0F0F0"
                  strokeWidth="1"
                  strokeDasharray="3 5"
                />
              ))}

              {/* Area fill under Credvest line */}
              <path d={buildAreaPath(CREDVEST_Y)} fill="url(#credvest-fill)" />

              {/* Typical Developer Journey — grey dashed */}
              <polyline
                points={buildPath(TYPICAL_Y)}
                fill="none"
                stroke="#D4D4D4"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Credvest-Controlled Journey — red smooth curve */}
              <path
                d={buildSmoothPath(CREDVEST_Y)}
                fill="none"
                stroke="#FA412A"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Grey dots — typical journey */}
              {TYPICAL_Y.map((v, i) => (
                <circle
                  key={`grey-${i}`}
                  cx={toX(i)}
                  cy={toY(v)}
                  r={activeStage === i ? 5 : 3}
                  fill="white"
                  stroke="#D4D4D4"
                  strokeWidth="1.5"
                  style={{ transition: "all 0.3s" }}
                />
              ))}

              {/* Red dots — Credvest journey */}
              {CREDVEST_Y.map((v, i) => (
                <g key={`red-${i}`}>
                  {activeStage === i && (
                    <circle
                      cx={toX(i)}
                      cy={toY(v)}
                      r={14}
                      fill="#FA412A"
                      fillOpacity="0.08"
                      style={{ transition: "all 0.3s" }}
                    />
                  )}
                  <circle
                    cx={toX(i)}
                    cy={toY(v)}
                    r={activeStage === i ? 6 : 4}
                    fill="#FA412A"
                    stroke="white"
                    strokeWidth="2.5"
                    filter={activeStage === i ? "url(#glow)" : undefined}
                    style={{ transition: "all 0.3s" }}
                  />
                </g>
              ))}

              {/* Tooltip — only show for the active stage, positioned well above the dot */}
              {CREDVEST_Y.map((v, i) => {
                const stage = LIFECYCLE_STAGES[i];
                const x = toX(i);
                const y = toY(v);
                const isActive = activeStage === i;
                const tooltipW = 190;
                const tooltipH = 34;
                /* Always above the dot with generous spacing */
                const ty = y - 50;
                /* Clamp x so tooltip stays within SVG */
                let tx = x - tooltipW / 2;
                if (tx < 8) tx = 8;
                if (tx + tooltipW > svgW - 8) tx = svgW - tooltipW - 8;

                return (
                  <g
                    key={`tooltip-${i}`}
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateY(0)" : "translateY(4px)",
                      transition: "opacity 0.3s, transform 0.3s",
                    }}
                  >
                    {/* Connector line from tooltip to dot */}
                    <line
                      x1={x}
                      y1={ty + tooltipH}
                      x2={x}
                      y2={y - 8}
                      stroke="#FA412A"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                      strokeOpacity="0.3"
                    />
                    <rect
                      x={tx}
                      y={ty}
                      width={tooltipW}
                      height={tooltipH}
                      rx={6}
                      fill="white"
                      stroke="rgba(250, 65, 42, 0.15)"
                      strokeWidth="1"
                      filter="url(#tooltip-shadow)"
                    />
                    {/* Small red accent bar on left edge */}
                    <rect
                      x={tx}
                      y={ty}
                      width={3}
                      height={tooltipH}
                      rx={1.5}
                      fill="#FA412A"
                    />
                    <text
                      x={tx + 14}
                      y={ty + tooltipH / 2 + 4}
                      textAnchor="start"
                      fill="#2E2E2E"
                      fontSize="10"
                      fontFamily="Inter, sans-serif"
                      fontWeight="500"
                    >
                      {stage.tooltip}
                    </text>
                  </g>
                );
              })}

              {/* Y-axis label */}
              <text
                x={14}
                y={padT + graphH / 2}
                textAnchor="middle"
                fill="#D4D4D4"
                fontSize="8"
                fontFamily="Inter, sans-serif"
                letterSpacing="0.08em"
                transform={`rotate(-90, 14, ${padT + graphH / 2})`}
              >
                CONTROL INDEX
              </text>
            </svg>
          </div>

          {/* ── Legend ── */}
          <div className="flex items-center justify-center gap-8 py-2 relative z-20">
            <div className="flex items-center gap-2">
              <div className="w-6 h-0 border-t-[1.5px] border-dashed border-neutral-300" />
              <span className="text-[11px] text-neutral-400">Typical Developer Journey</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-0 border-t-2 border-[#FA412A]" />
              <span className="text-[11px] text-neutral-600 font-medium">Credvest-Controlled Journey</span>
            </div>
          </div>

          {/* ── Bottom Column Descriptions (description only, no repeated heading) ── */}
          <div className="grid grid-cols-6 relative z-20" style={{ borderTop: "1px solid #F0F0F0" }}>
            {LIFECYCLE_STAGES.map((stage, i) => (
              <div
                key={stage.id}
                className="px-4 py-3 cursor-default transition-all"
                onMouseEnter={() => handleStageHover(i)}
                onMouseLeave={handleStageLeave}
              >
                <p
                  className="text-[11px] leading-relaxed transition-colors duration-300"
                  style={{ color: activeStage === i ? "#FA412A" : "#777" }}
                >
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Closing statement ── */}
        <div className="mt-16 text-center">
          <p
            className="text-xl md:text-2xl text-neutral-800 max-w-lg mx-auto leading-snug"
            style={{ fontFamily: SERIF_FONT, letterSpacing: "-0.02em" }}
          >
            &ldquo;With Credvest, performance does not dip mid-cycle.
            <br />
            <span className="text-[#FA412A] font-semibold">It compounds.</span>&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CAREERS — DATA
   ───────────────────────────────────────────── */

const CAREER_PILLARS = [
  {
    number: "01",
    title: "Structured Growth",
    description:
      "Every role has a defined progression path. From trainee to team lead, from analyst to market head — growth here is earned through measurable impact.",
  },
  {
    number: "02",
    title: "Exposure Across the Lifecycle",
    description:
      "You don't work in silos. You see positioning, marketing, sales, and execution — end to end. This creates sharper operators, not narrow specialists.",
  },
  {
    number: "03",
    title: "Real Responsibility",
    description:
      "Mandates are real. Revenue is real. Deadlines are real. You own outcomes — not just tasks.",
  },
  {
    number: "04",
    title: "Performance Culture",
    description:
      "We value clarity, discipline, and data-backed decisions. Effort matters. Results matter more.",
  },
];

const CAREER_PATH = [
  { role: "Trainee", desc: "Learn systems. Understand ground execution." },
  { role: "Associate", desc: "Own channel coordination and reporting." },
  { role: "Senior Associate", desc: "Manage performance metrics and conversion tracking." },
  { role: "Manager", desc: "Lead project sales operations and team alignment." },
  { role: "Market Lead", desc: "Own city-level mandate outcomes." },
  { role: "Business Head", desc: "Drive strategy, growth, and profitability." },
];




const OPEN_ROLES = [
  {
    category: "Sales Operations",
    roles: [
      { title: "Sales Associate", location: "Bangalore", experience: "0–2 years" },
      { title: "Senior Sales Manager", location: "Hyderabad", experience: "4–6 years" },
    ],
  },
  {
    category: "Marketing & Strategy",
    roles: [
      { title: "Brand Strategist", location: "Bangalore", experience: "2–4 years" },
      { title: "Performance Marketing Lead", location: "Remote", experience: "3–5 years" },
    ],
  },
  {
    category: "City Operations",
    roles: [
      { title: "Market Lead", location: "Hyderabad", experience: "5–8 years" },
      { title: "Operations Associate", location: "Bangalore", experience: "1–3 years" },
    ],
  },
  {
    category: "Corporate Functions",
    roles: [
      { title: "HR & People Ops", location: "Bangalore", experience: "2–4 years" },
      { title: "Finance Analyst", location: "Bangalore", experience: "1–3 years" },
    ],
  },
];

/* ─────────────────────────────────────────────
   OPEN ROLES — ACCORDION COMPONENT
   ───────────────────────────────────────────── */

function OpenRolesSection() {
  const [expandedCategory, setExpandedCategory] = useState<string>(OPEN_ROLES[0].category);

  const activeGroup = OPEN_ROLES.find((g) => g.category === expandedCategory);

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — Title + Accordion Categories */}
          <div>
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#FA412A] mb-5">
              Open Positions
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-neutral-900 leading-[1.1] mb-12"
              style={{ fontFamily: SERIF_FONT, letterSpacing: "-0.03em" }}
            >
              Find Your Role
            </h2>

            {/* Category list */}
            <div>
              {OPEN_ROLES.map((group) => {
                const isActive = expandedCategory === group.category;
                return (
                  <button
                    key={group.category}
                    onClick={() => setExpandedCategory(group.category)}
                    className="w-full text-left py-4 flex items-center justify-between group transition-all"
                    style={{ borderBottom: `2px solid ${isActive ? "#FA412A" : "#F0F0F0"}` }}
                  >
                    <span
                      className="text-lg md:text-xl font-semibold transition-colors duration-300"
                      style={{
                        fontFamily: SERIF_FONT,
                        color: isActive ? "#1A1A1A" : "#999",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {group.category}
                    </span>
                    <span
                      className="text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: isActive ? "rgba(250,65,42,0.08)" : "#F8F8F8",
                        color: isActive ? "#FA412A" : "#B0B0B0",
                      }}
                    >
                      {group.roles.length} {group.roles.length === 1 ? "role" : "roles"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right — Expanded Roles for active category */}
          <div className="flex flex-col justify-center">
            {activeGroup && (
              <div>
                <p className="text-sm font-semibold text-[#FA412A] mb-6 tracking-wider uppercase">
                  {activeGroup.category}
                </p>
                <div>
                  {activeGroup.roles.map((role, i) => (
                    <div
                      key={role.title}
                      className="py-5 hover:pl-2 transition-all"
                      style={{ borderBottom: i < activeGroup.roles.length - 1 ? "1px solid #F0F0F0" : "none" }}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4
                            className="text-lg font-semibold text-neutral-900 mb-1"
                            style={{ fontFamily: SERIF_FONT, letterSpacing: "-0.01em" }}
                          >
                            {role.title}
                          </h4>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-neutral-400 flex items-center gap-1">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                              {role.location}
                            </span>
                            <span className="text-neutral-200">·</span>
                            <span className="text-xs text-neutral-400">{role.experience}</span>
                          </div>
                        </div>
                        <button className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wide bg-neutral-900 text-white hover:bg-[#FA412A] transition-colors flex-shrink-0">
                          Apply
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
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

/* ─────────────────────────────────────────────
   CAREERS SECTION COMPONENT
   ───────────────────────────────────────────── */

function CareersSection() {
  const [hoveredPathIndex, setHoveredPathIndex] = useState<number | null>(null);

  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#F8F8F8" }}>
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 py-28 md:py-40 relative z-10">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#FA412A] mb-6">
            Careers
          </span>
          <h1
            className="text-5xl md:text-6xl lg:text-[80px] font-bold text-neutral-900 leading-[1.05] mb-8 max-w-4xl"
            style={{ fontFamily: SERIF_FONT, letterSpacing: "-0.03em" }}
          >
            Build the systems that move real estate{" "}
            <span className="text-[#FA412A]">at scale.</span>
          </h1>
          <div className="max-w-2xl mb-10">
            <p className="text-lg md:text-xl text-neutral-500 leading-relaxed mb-4">
              Credvest is not a brokerage. We are an operating platform built for structured growth.
            </p>
            <p className="text-base text-neutral-400 leading-relaxed">
              If you want to work where strategy meets execution — and where performance is measured, not guessed — you&apos;ll fit in here.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button className="px-7 py-3.5 bg-[#FA412A] text-white text-sm font-semibold tracking-wide hover:bg-[#e03520] transition-colors">
              View Open Roles
            </button>
            <button className="px-7 py-3.5 border border-neutral-300 text-neutral-700 text-sm font-semibold tracking-wide hover:border-neutral-500 transition-colors">
              Explore Career Paths
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHY CREDVEST — 4 Pillar Grid
          ═══════════════════════════════════════════ */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            <div>
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#FA412A] mb-5">
                Why Credvest
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold text-neutral-900 leading-[1.1]"
                style={{ fontFamily: SERIF_FONT, letterSpacing: "-0.03em" }}
              >
                Why result-focused operators choose{" "}
                <span className="text-[#FA412A]">Credvest.</span>
              </h2>
            </div>
            <div className="flex items-end">
              <p className="text-lg text-neutral-400 leading-relaxed">
                We hire operators, thinkers, and disciplined builders.
                <br />
                <span className="text-neutral-600 font-medium">Not just sellers.</span>
              </p>
            </div>
          </div>

          {/* 4-Pillar Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-100">
            {CAREER_PILLARS.map((pillar) => (
              <div key={pillar.number} className="bg-white p-8 md:p-10 group hover:bg-[#F8F8F8] transition-colors">
                <span className="text-[11px] font-bold tracking-widest text-[#FA412A] mb-3 block">
                  {pillar.number}
                </span>
                <h3
                  className="text-xl md:text-2xl font-semibold text-neutral-900 mb-3"
                  style={{ fontFamily: SERIF_FONT, letterSpacing: "-0.02em" }}
                >
                  {pillar.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CAREER PATH — Bar Chart + Testimonial
          ═══════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#F8F8F8" }}>
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#FA412A] mb-5">
            Growth Journey
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-neutral-900 leading-[1.1] mb-4 max-w-3xl"
            style={{ fontFamily: SERIF_FONT, letterSpacing: "-0.03em" }}
          >
            Career Progression at Credvest
          </h2>
          <p className="text-base text-neutral-400 mb-16 max-w-xl">
            Promotions are performance-based. Growth is earned through consistency and impact.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-end">
            {/* ── Left: Bar Chart ── */}
            <div>
              <div
                className="relative"
                style={{ height: 380 }}
                onMouseLeave={() => setHoveredPathIndex(null)}
              >
                {/* Y-axis */}
                <div className="absolute -left-1 top-0 bottom-8 flex flex-col justify-between text-[9px] text-neutral-300 font-semibold tracking-widest z-10" style={{ width: 28 }}>
                  <span>30%</span>
                  <span>15%</span>
                  <span>8%</span>
                  <span>2%</span>
                  <span>0%</span>
                </div>

                {/* Grid lines */}
                <div className="absolute left-8 right-0 top-0 bottom-8">
                  {[0, 25, 50, 75, 100].map((pct) => (
                    <div
                      key={pct}
                      className="absolute left-0 right-0"
                      style={{
                        bottom: `${pct}%`,
                        borderTop: pct === 0 ? "1px solid #D4D4D4" : "1px dashed #E8E8E8",
                      }}
                    />
                  ))}
                </div>

                {/* Bars area */}
                <div className="absolute left-8 right-0 top-0 bottom-8 flex items-end gap-0">
                  {CAREER_PATH.map((step, i) => {
                    const barPct = [8, 18, 32, 48, 68, 100][i];
                    const isHovered = hoveredPathIndex === i;
                    const isLast = i === CAREER_PATH.length - 1;

                    return (
                      <div
                        key={step.role}
                        className="flex-1 relative h-full flex items-end cursor-default"
                        onMouseEnter={() => setHoveredPathIndex(i)}
                      >
                        {/* Full-height hover highlight */}
                        {isHovered && (
                          <div
                            className="absolute inset-0 z-0"
                            style={{ backgroundColor: "rgba(250,65,42,0.04)" }}
                          />
                        )}

                        {/* Bar */}
                        <div
                          className="relative z-10 mx-1.5 md:mx-3 overflow-hidden transition-all duration-300"
                          style={{
                            height: `${barPct}%`,
                            width: "calc(100% - 12px)",
                            background: isLast
                              ? "linear-gradient(180deg, rgba(250,65,42,0.8) 0%, #FA412A 100%)"
                              : "linear-gradient(180deg, #F0F0F0 0%, #E8E8E8 100%)",
                            border: isHovered && !isLast ? "1.5px solid rgba(250,65,42,0.3)" : "none",
                          }}
                        >
                          {/* Pct label */}
                          <div className="absolute top-2 left-0 right-0 text-center">
                            <span
                              className="text-[10px] font-bold"
                              style={{ color: isLast ? "rgba(255,255,255,0.8)" : isHovered ? "#888" : "#C4C4C4" }}
                            >
                              {[2, 8, 15, 30, 30, 30][i]}%
                            </span>
                          </div>

                          {/* Shine on last */}
                          {isLast && (
                            <div
                              className="absolute inset-0"
                              style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)" }}
                            />
                          )}
                        </div>

                        {/* X label */}
                        <div className="absolute -bottom-8 left-0 right-0 text-center">
                          <p
                            className="text-[8px] md:text-[9px] font-bold tracking-wider uppercase transition-colors duration-200"
                            style={{ color: isHovered ? "#FA412A" : isLast ? "#FA412A" : "#B0B0B0" }}
                          >
                            {step.role}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Hover info overlay — top left */}
                {hoveredPathIndex !== null && (
                  <div className="absolute top-2 left-10 z-20 max-w-[200px]">
                    <span className="inline-block text-[10px] font-bold tracking-[0.15em] uppercase mb-1" style={{ color: "#FA412A" }}>
                      Step {String(hoveredPathIndex + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className="text-xl md:text-2xl font-bold text-neutral-900 leading-[1.1] mb-1"
                      style={{ fontFamily: SERIF_FONT, letterSpacing: "-0.03em" }}
                    >
                      {CAREER_PATH[hoveredPathIndex].role}
                    </h3>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      {CAREER_PATH[hoveredPathIndex].desc}
                    </p>
                  </div>
                )}
              </div>
              <div className="ml-8 mt-10 flex justify-end">
                <span className="text-[9px] text-neutral-300 tracking-widest font-semibold">CAREER STAGE →</span>
              </div>
            </div>

            {/* ── Right: Testimonial Card ── */}
            <div
              className="rounded-2xl p-8 md:p-10 flex flex-col justify-between"
              style={{
                background: "linear-gradient(135deg, #F8F8F8 0%, #F2F2F2 40%, #EAEAEA 70%, #F5F5F5 100%)",
                minHeight: 380,
              }}
            >
              <div>
                <svg width="36" height="28" viewBox="0 0 40 32" fill="none">
                  <path d="M0 20.8C0 12.267 5.867 4.8 16 0l2.133 4.267C11.467 8 8.533 12.267 8 16h8v16H0V20.8zm24 0C24 12.267 29.867 4.8 40 0l2.133 4.267C35.467 8 32.533 12.267 32 16h8v16H24V20.8z" fill="#FA412A" fillOpacity="0.25"/>
                </svg>
                <p
                  className="text-base md:text-lg font-medium text-neutral-800 leading-relaxed mt-4"
                  style={{ fontFamily: SERIF_FONT, letterSpacing: "-0.01em" }}
                >
                  I joined as a trainee and now manage a 40-member channel network across two micro-markets. The structure here changed how I think about growth.
                </p>
              </div>
              <div className="flex items-center gap-3 mt-8">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: "#FA412A" }}>
                  RA
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-800">Rahul Anand</p>
                  <p className="text-xs text-neutral-500">Senior Associate · Bangalore</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* ═══════════════════════════════════════════
          OPEN ROLES — Accordion Style
          ═══════════════════════════════════════════ */}
      <OpenRolesSection />

    </>
  );
}

/* ─────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────── */

export default function BrandPage() {
  return (
    <div
      className="min-h-screen bg-white text-neutral-900"
      style={{ fontFamily: SANS_FONT }}
    >
      {/* ────────────────────────────────────────────
          SECTION 1 — FONT PAIRING — SINGLE FOLD
          Both Noto Serif SC + Inter shown together
          bg: #F8F8F8 (neutral grey), dark text
          ──────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#F8F8F8" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-screen">

          {/* ── LEFT: NOTO SERIF SC ── */}
          <div className="flex flex-col justify-between p-10 md:p-14 lg:border-r" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
            <div>
              {/* Giant Aa */}
              <div className="relative mb-8">
                <p
                  className="text-[160px] md:text-[200px] leading-[0.85] font-normal text-neutral-900"
                  style={{ fontFamily: SERIF_FONT, letterSpacing: "-0.03em" }}
                >
                  Aa
                </p>
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.035]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />
              </div>

              {/* Font name */}
              <h1
                className="text-2xl md:text-3xl font-medium mb-1.5 text-neutral-900"
                style={{ fontFamily: SERIF_FONT, letterSpacing: "-0.02em" }}
              >
                Noto Serif SC
              </h1>
              <p className="text-sm text-neutral-400 mb-5">
                Typography for titles and texts.
              </p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-0.5 text-xs text-neutral-400 max-w-[200px]">
                <span>Serif</span>
                <span>Open Type</span>
                <span>CJK Support</span>
                <span>Google Fonts</span>
              </div>
            </div>

            {/* Weight scale */}
            <div className="mt-8 pt-5" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              {NOTO_WEIGHTS.map((w) => (
                <div
                  key={w.weight}
                  className="flex items-center justify-between py-2.5"
                  style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-[11px] text-neutral-400 w-20">{w.label}</span>
                    <span className="text-[11px] text-neutral-300 w-7">{w.weight}</span>
                  </div>
                  <p
                    className="text-xl text-neutral-800"
                    style={{ fontFamily: SERIF_FONT, fontWeight: w.weight, letterSpacing: "-0.02em" }}
                  >
                    Aa
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: INTER + Specimen ── */}
          <div className="flex flex-col justify-between p-10 md:p-14">
            <div>
              {/* Specimen headline in Noto Serif SC */}
              <p
                className="text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] text-neutral-900 mb-10"
                style={{ fontFamily: SERIF_FONT, letterSpacing: "-0.03em" }}
              >
                Raising the
                <br />
                standard of
                <br />
                creativity and
                <br />
                excellence.
              </p>

              {/* Body text in Inter */}
              <div className="grid grid-cols-2 gap-6 text-[13px] text-neutral-400 leading-relaxed mb-10">
                <p>
                  We are a creative agency specializing in the production of corporate events and
                  digital solutions. Prioritizing the creation of immersive and memorable
                  experiences for our audience, we strive for excellence.
                </p>
                <p>
                  Challenge conventional boundaries and think outside the box to develop
                  experiences that not only entertain, but also engage and excite every single
                  person who encounters our work.
                </p>
              </div>

              {/* Alphabet — Serif */}
              <div className="mb-10 pb-8" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                <p
                  className="text-xl md:text-2xl text-neutral-400 leading-relaxed mb-1"
                  style={{ fontFamily: SERIF_FONT, letterSpacing: "-0.01em" }}
                >
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ
                </p>
                <p
                  className="text-xl md:text-2xl text-neutral-400 leading-relaxed mb-1"
                  style={{ fontFamily: SERIF_FONT, letterSpacing: "-0.01em" }}
                >
                  abcdefghijklmnopqrstuvwxyz
                </p>
                <p
                  className="text-xl md:text-2xl text-neutral-400 leading-relaxed"
                  style={{ fontFamily: SERIF_FONT, letterSpacing: "-0.01em" }}
                >
                  0123456789
                </p>
              </div>
            </div>

            {/* ── INTER SECTION within same fold ── */}
            <div>
              <div className="flex items-end gap-6 mb-6">
                <p
                  className="text-[100px] md:text-[120px] leading-[0.85] font-light text-neutral-800"
                  style={{ fontFamily: SANS_FONT, letterSpacing: "-0.04em" }}
                >
                  Aa
                </p>
                <div className="pb-4">
                  <h2
                    className="text-xl md:text-2xl font-medium mb-1 text-neutral-900"
                    style={{ fontFamily: SANS_FONT, letterSpacing: "-0.02em" }}
                  >
                    Inter
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Body &amp; interface · Sans Serif · Variable · Google Fonts
                  </p>
                </div>
              </div>

              {/* Inter weight scale — compact */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-x-4 gap-y-2 mb-6">
                {INTER_WEIGHTS.map((w) => (
                  <div key={w.weight} className="flex items-baseline gap-2">
                    <p
                      className="text-lg text-neutral-700"
                      style={{ fontFamily: SANS_FONT, fontWeight: w.weight, letterSpacing: "-0.02em" }}
                    >
                      Aa
                    </p>
                    <span className="text-[10px] text-neutral-300">{w.weight}</span>
                  </div>
                ))}
              </div>

              {/* Alphabet — Sans */}
              <div className="pt-5" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <p
                  className="text-lg md:text-xl text-neutral-400 leading-relaxed mb-0.5"
                  style={{ fontFamily: SANS_FONT, letterSpacing: "-0.01em" }}
                >
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ
                </p>
                <p
                  className="text-lg md:text-xl text-neutral-400 leading-relaxed mb-0.5"
                  style={{ fontFamily: SANS_FONT, letterSpacing: "-0.01em" }}
                >
                  abcdefghijklmnopqrstuvwxyz
                </p>
                <p
                  className="text-lg md:text-xl text-neutral-400 leading-relaxed"
                  style={{ fontFamily: SANS_FONT, letterSpacing: "-0.01em" }}
                >
                  0123456789
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          SECTION 2 — ALL COLORS IN ONE VIEW
          Primary + Secondary together, no radius, tight gaps
          ──────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#F8F8F8" }}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="mb-8">
            <span className="inline-block text-xs font-semibold tracking-wider uppercase px-3 py-1 border border-[#FA412A]/20 text-[#FA412A] mb-4">
              Color
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ fontFamily: SERIF_FONT, letterSpacing: "-0.02em" }}
            >
              Sunrise
            </h2>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-300 mt-1 mb-2">
              Option A — Primary + Secondary
            </p>
            <p className="mt-2 text-sm text-neutral-400 max-w-lg">
              Warm orange accent paired with neutral grey secondaries for a clean, monotone palette.
            </p>
          </div>

          {/* Primary label */}
          <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-2">
            Primary
          </p>

          {/* Primary hero full-width + shades row below */}
          <div
            className="flex flex-col justify-end p-5"
            style={{ backgroundColor: "#FA412A", height: 130 }}
          >
            <p className="text-2xl font-bold text-white" style={{ fontFamily: SERIF_FONT, letterSpacing: "-0.02em" }}>
              #FA412A
            </p>
            <p className="text-[10px] text-white/60 mt-0.5">Primary · 500</p>
          </div>
          <div className="grid grid-cols-3 gap-[1px] mt-[1px]">
            {PRIMARY.shades.map((shade) => (
              <ColorSwatch
                key={shade.label}
                hex={shade.hex}
                label={shade.label}
                sublabel={shade.hex}
                height={110}
              />
            ))}
          </div>

          {/* Secondary label */}
          <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mt-6 mb-2">
            Secondary
          </p>

          {/* Secondary swatches — no radius, tight gap */}
          <div className="grid grid-cols-4 gap-[1px]">
            {SECONDARY_COLORS.map((color) => (
              <ColorSwatch
                key={color.name}
                hex={color.hex}
                label={color.name}
                sublabel={`${color.token}`}
                height={100}
                opacity={color.opacity}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          SECTION 2B — ALTERNATIVE PALETTE (Orange only)
          ──────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#F8F8F8" }}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="mb-8">
            <span className="inline-block text-xs font-semibold tracking-wider uppercase px-3 py-1 border border-[#FA412A]/20 text-[#FA412A] mb-4">
              Alternative
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ fontFamily: SERIF_FONT, letterSpacing: "-0.02em" }}
            >
              Ember
            </h2>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-300 mt-1 mb-2">
              Option B — Orange Only
            </p>
            <p className="mt-2 text-sm text-neutral-400 max-w-lg">
              A focused, mono-hue palette using only the primary orange and its light shades.
            </p>
          </div>

          {/* Orange primary full-width + 3 shades row below */}
          <div
            className="flex flex-col justify-end p-5"
            style={{ backgroundColor: "#FA412A", height: 130 }}
          >
            <p className="text-2xl font-bold text-white" style={{ fontFamily: SERIF_FONT, letterSpacing: "-0.02em" }}>
              #FA412A
            </p>
            <p className="text-[10px] text-white/60 mt-0.5">Primary · 500</p>
          </div>
          <div className="grid grid-cols-3 gap-[1px] mt-[1px]">
            {PRIMARY_ALT_SHADES.map((shade) => (
              <ColorSwatch
                key={shade.label}
                hex={shade.hex}
                label={shade.label}
                sublabel={shade.hex}
                height={120}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          SECTION 3 — NEUTRALS
          ──────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#F8F8F8" }}>
        <div className="max-w-6xl mx-auto px-6 pb-16">
          {/* Dark Neutrals */}
          <div className="mb-8">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-2">
              Dark Neutrals
            </p>
            <div className="grid grid-cols-6 gap-[1px]">
              {NEUTRALS_DARK.map((n) => (
                <ColorSwatch key={n.label} hex={n.hex} label={n.label} sublabel={n.hex} height={90} />
              ))}
            </div>
          </div>

          {/* Light Neutrals */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-2">
              Light Neutrals
            </p>
            <div className="grid grid-cols-6 gap-[1px]">
              {NEUTRALS_LIGHT.map((n) => (
                <ColorSwatch key={n.label} hex={n.hex} label={n.label} sublabel={n.hex} height={90} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          SECTION 4 — THE CREDVEST EDGE
          Lifecycle graph with dual-line comparison
          ──────────────────────────────────────────── */}
      <CredvestEdgeSection />

      {/* ────────────────────────────────────────────
          SECTION 5 — CAREERS
          ──────────────────────────────────────────── */}
      <CareersSection />

      {/* ── FOOTER ── */}
      <footer className="border-t border-neutral-100 py-6">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-[11px] text-neutral-400">
          <p>Brand Guidelines · v1.0</p>
          <p>Noto Serif SC + Inter · #FA412A</p>
        </div>
      </footer>
    </div>
  );
}
