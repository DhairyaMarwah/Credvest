"use client";

import { useState, useEffect, useRef, useCallback } from "react";

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

const TYPICAL_Y = [35, 42, 33, 40, 28, 38];
const CREDVEST_Y = [52, 60, 68, 76, 84, 94];
const STAGE_DURATION = 3000;

export function CredvestEdgeSection() {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isUserHovering, setIsUserHovering] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<number>(0);
  const animFrameRef = useRef<number>(0);
  const lastTickRef = useRef<number>(0);

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

  const svgW = 900;
  const svgH = 320;
  const padL = 10;
  const padR = 10;
  const padT = 50;
  const padB = 40;
  const graphH = svgH - padT - padB;
  const graphW = svgW - padL - padR;

  const stageCount = LIFECYCLE_STAGES.length;

  const toX = (i: number) => padL + (i / (stageCount - 1)) * graphW;
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
    const bottomY = padT + graphH;
    return `${curvePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  };

  const colWidthPct = 100 / stageCount;

  return (
    <section className="bg-white">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-20 md:py-28">
        <div className="text-center mb-14">
          <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand mb-4 block font-sans">
            Credvest Lifecycle
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-neutral-black leading-[1.12] tracking-[-0.07em] mb-4">
            The Credvest Advantage
          </h2>
          <p className="font-sans text-[14px] text-neutral-500 leading-relaxed max-w-xl mx-auto">
            For projects that require deeper strategic alignment before launch,
            Credvest Edge integrates early-stage advisory with structured
            execution.
          </p>
        </div>

        <div className="relative bg-white rounded-sm overflow-hidden  ">
          {/* Column highlight */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none z-10"
            style={{
              left: `${activeStage * colWidthPct}%`,
              width: `${colWidthPct}%`,
              transition: "left 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              background: `repeating-linear-gradient(-45deg, color-mix(in srgb, var(--color-brand) 4%, transparent), color-mix(in srgb, var(--color-brand) 4%, transparent) 4px, transparent 4px, transparent 12px)`,
              borderLeft:
                "1px solid color-mix(in srgb, var(--color-brand) 10%, transparent)",
              borderRight:
                "1px solid color-mix(in srgb, var(--color-brand) 10%, transparent)",
            }}
          />

          {/* Stage Tabs */}
          <div className="grid grid-cols-6 relative z-20 border-b border-neutral-200">
            {LIFECYCLE_STAGES.map((stage, i) => (
              <button
                key={stage.id}
                onMouseEnter={() => handleStageHover(i)}
                onMouseLeave={handleStageLeave}
                className="relative py-5 px-4 text-left cursor-default transition-all"
              >
                <span
                  className="block text-[11px] font-bold tracking-widest uppercase mb-1 transition-colors duration-300"
                  style={{
                    color: activeStage === i ? "var(--color-brand)" : "#999",
                  }}
                >
                  {stage.number}
                </span>
                <span
                  className="block font-serif text-lg md:text-xl font-semibold transition-colors duration-300"
                  style={{
                    color: activeStage === i ? "var(--color-brand)" : "#454545",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {stage.title}
                </span>
                <span
                  className="block text-[11px] mt-1 transition-colors duration-300"
                  style={{
                    color:
                      activeStage === i
                        ? "color-mix(in srgb, var(--color-brand) 60%, transparent)"
                        : "#999",
                  }}
                >
                  {stage.subtitle}
                </span>

                <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-neutral-100 overflow-hidden">
                  <div
                    className="h-full bg-brand"
                    style={{
                      width:
                        activeStage === i
                          ? `${progress * 100}%`
                          : activeStage > i
                            ? "100%"
                            : "0%",
                      transition:
                        activeStage === i ? "none" : "width 0.3s ease",
                    }}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* SVG Graph */}
          <div
            className="relative z-20"
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
                <linearGradient
                  id="hww-credvest-fill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    style={{ stopColor: "var(--color-brand)" }}
                    stopOpacity="0.08"
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "var(--color-brand)" }}
                    stopOpacity="0.01"
                  />
                </linearGradient>
                <filter id="hww-glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter
                  id="hww-tooltip-shadow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feDropShadow
                    dx="0"
                    dy="2"
                    stdDeviation="4"
                    floodColor="#000"
                    floodOpacity="0.08"
                  />
                </filter>
              </defs>

              {/* Horizontal grid lines */}
              {[0, 25, 50, 75, 100].map((v) => (
                <g key={v}>
                  <line
                    x1={0}
                    y1={toY(v)}
                    x2={svgW}
                    y2={toY(v)}
                    stroke="#F0F0F0"
                    strokeWidth="1"
                  />
                  <text
                    x={12}
                    y={toY(v) - 6}
                    textAnchor="start"
                    fill="#D4D4D4"
                    fontSize="9"
                    fontFamily="Inter, sans-serif"
                  >
                    {v}
                  </text>
                </g>
              ))}

              {/* Vertical dashed markers */}
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

              {/* Area fill */}
              <path
                d={buildAreaPath(CREDVEST_Y)}
                fill="url(#hww-credvest-fill)"
              />

              {/* Typical journey — grey dashed */}
              <polyline
                points={buildPath(TYPICAL_Y)}
                fill="none"
                stroke="#D4D4D4"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Credvest journey — red smooth */}
              <path
                d={buildSmoothPath(CREDVEST_Y)}
                fill="none"
                stroke="var(--color-brand)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Grey dots */}
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

              {/* Red dots */}
              {CREDVEST_Y.map((v, i) => (
                <g key={`red-${i}`}>
                  {activeStage === i && (
                    <circle
                      cx={toX(i)}
                      cy={toY(v)}
                      r={14}
                      fill="var(--color-brand)"
                      fillOpacity="0.08"
                      style={{ transition: "all 0.3s" }}
                    />
                  )}
                  <circle
                    cx={toX(i)}
                    cy={toY(v)}
                    r={activeStage === i ? 6 : 4}
                    fill="var(--color-brand)"
                    stroke="white"
                    strokeWidth="2.5"
                    filter={activeStage === i ? "url(#hww-glow)" : undefined}
                    style={{ transition: "all 0.3s" }}
                  />
                </g>
              ))}

              {/* Tooltips */}
              {CREDVEST_Y.map((v, i) => {
                const stage = LIFECYCLE_STAGES[i];
                const x = toX(i);
                const y = toY(v);
                const isActive = activeStage === i;
                const tooltipW = 190;
                const tooltipH = 34;
                const ty = y - 50;
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
                    <line
                      x1={x}
                      y1={ty + tooltipH}
                      x2={x}
                      y2={y - 8}
                      stroke="var(--color-brand)"
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
                      stroke="color-mix(in srgb, var(--color-brand) 15%, transparent)"
                      strokeWidth="1"
                      filter="url(#hww-tooltip-shadow)"
                    />
                    <rect
                      x={tx}
                      y={ty}
                      width={3}
                      height={tooltipH}
                      rx={1.5}
                      fill="var(--color-brand)"
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
                x={8}
                y={padT + graphH / 2}
                textAnchor="middle"
                fill="#D4D4D4"
                fontSize="8"
                fontFamily="Inter, sans-serif"
                letterSpacing="0.08em"
                transform={`rotate(-90, 8, ${padT + graphH / 2})`}
              >
                CONTROL INDEX
              </text>
            </svg>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-8 py-3 relative z-20 border-t border-neutral-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-0 border-t-[1.5px] border-dashed border-neutral-300" />
              <span className="text-[11px] text-neutral-400">
                Typical Developer Journey
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-0 border-t-2 border-brand" />
              <span className="text-[11px] text-neutral-600 font-medium">
                Credvest-Controlled Journey
              </span>
            </div>
          </div>

          {/* Bottom stage descriptions */}
          <div
            className="grid grid-cols-6 relative z-20"
            style={{ borderTop: "1px solid #F0F0F0" }}
          >
            {LIFECYCLE_STAGES.map((stage, i) => (
              <div
                key={stage.id}
                className="px-4 py-3 cursor-default transition-all"
                onMouseEnter={() => handleStageHover(i)}
                onMouseLeave={handleStageLeave}
              >
                <p
                  className="text-[11px] leading-relaxed transition-colors duration-300"
                  style={{
                    color: activeStage === i ? "var(--color-brand)" : "#777",
                  }}
                >
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing statement */}
        <div className="mt-16 text-center">
          <p className="font-serif text-xl md:text-2xl text-neutral-800 max-w-lg mx-auto leading-snug tracking-[-0.04em]">
            &ldquo;With Credvest, performance does not dip mid-cycle.
            <br />
            <span className="text-brand font-semibold">It compounds.</span>
            &rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
