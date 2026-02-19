"use client";

import { useTheme, type FontTheme, type ColorTheme } from "./theme-provider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const FONT_OPTIONS: { value: FontTheme; label: string }[] = [
  { value: "noto-serif-sc", label: "Noto Serif SC" },
  { value: "playfair", label: "Playfair Display" },
];

const COLOR_OPTIONS: { value: ColorTheme; label: string; swatch: string; desc: string }[] = [
  { value: "sunrise", label: "Sunrise", swatch: "#FA412A", desc: "Primary + pastels" },
  { value: "ember", label: "Ember", swatch: "#FA412A", desc: "Orange mono-hue" },
];

export function ThemeSwitcher() {
  const { font, color, setFont, setColor } = useTheme();

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <Popover>
        <PopoverTrigger
          className="w-11 h-11 rounded-full bg-neutral-900 text-white flex items-center justify-center shadow-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          aria-label="Theme settings"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="end"
          className="w-64 p-0 bg-white border border-neutral-200 shadow-xl"
          sideOffset={12}
        >
          <div className="p-4 border-b border-neutral-100">
            <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-neutral-400 mb-3">
              Serif Font
            </p>
            <div className="flex flex-col gap-1.5">
              {FONT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFont(opt.value)}
                  className={`text-left px-3 py-2 text-[13px] font-medium transition-all ${
                    font === opt.value
                      ? "bg-neutral-900 text-white"
                      : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4">
            <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-neutral-400 mb-3">
              Color Theme
            </p>
            <div className="flex flex-col gap-1.5">
              {COLOR_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setColor(opt.value)}
                  className={`flex items-center gap-3 text-left px-3 py-2 transition-all ${
                    color === opt.value
                      ? "bg-neutral-900 text-white"
                      : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100"
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full flex-shrink-0 border border-white/20"
                    style={{ backgroundColor: opt.swatch }}
                  />
                  <span className="flex flex-col">
                    <span className="text-[13px] font-medium">{opt.label}</span>
                    <span className={`text-[10px] ${color === opt.value ? "text-neutral-300" : "text-neutral-400"}`}>
                      {opt.desc}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
