"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type FontTheme = "noto-serif-sc" | "playfair";
export type ColorTheme = "sunrise" | "ember";

interface ThemeContextType {
  font: FontTheme;
  color: ColorTheme;
  setFont: (f: FontTheme) => void;
  setColor: (c: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  font: "noto-serif-sc",
  color: "sunrise",
  setFont: () => {},
  setColor: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

const COLOR_THEMES: Record<ColorTheme, Record<string, string>> = {
  sunrise: {
    "--color-brand": "#FA412A",
    "--color-brand-50": "#FFF1F0",
    "--color-brand-100": "#FFE0DC",
    "--color-brand-200": "#FFC2B8",
    "--color-brand-500": "#FA412A",
    "--color-brand-600": "#E03520",
    "--color-brand-700": "#C22A18",
    "--color-pastel-green": "#E6FFD9",
    "--color-pastel-blue": "#CFEBFF",
    "--color-pastel-pink": "#FFE6F4",
    "--color-pastel-yellow": "#FFFBB8",
    "--color-brand-stroke": "#E3F99D",
    "--brand-stroke": "#E3F99D",
    "--primary": "#FA412A",
    "--ring": "#FA412A",
    "--chart-1": "#FA412A",
    "--chart-2": "#E6FFD9",
    "--chart-3": "#CFEBFF",
    "--chart-4": "#FFE6F4",
    "--chart-5": "#FFFBB8",
  },
  ember: {
    "--color-brand": "#FA412A",
    "--color-brand-50": "#FFF1F0",
    "--color-brand-100": "#FFE0DC",
    "--color-brand-200": "#FFC2B8",
    "--color-brand-500": "#FA412A",
    "--color-brand-600": "#E03520",
    "--color-brand-700": "#C22A18",
    "--color-pastel-green": "#FFF1F0",
    "--color-pastel-blue": "#FFE0DC",
    "--color-pastel-pink": "#FFC2B8",
    "--color-pastel-yellow": "#FFF1F0",
    "--color-brand-stroke": "#FFC2B8",
    "--brand-stroke": "#FFC2B8",
    "--primary": "#FA412A",
    "--ring": "#FA412A",
    "--chart-1": "#FA412A",
    "--chart-2": "#FFF1F0",
    "--chart-3": "#FFE0DC",
    "--chart-4": "#FFC2B8",
    "--chart-5": "#FFF1F0",
  },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [font, setFont] = useState<FontTheme>("noto-serif-sc");
  const [color, setColor] = useState<ColorTheme>("sunrise");

  useEffect(() => {
    const root = document.documentElement;

    if (font === "playfair") {
      root.style.setProperty("--font-serif", "var(--font-playfair)");
    } else {
      root.style.removeProperty("--font-serif");
    }
  }, [font]);

  useEffect(() => {
    const root = document.documentElement;
    const vars = COLOR_THEMES[color];

    if (color === "sunrise") {
      for (const key of Object.keys(vars)) {
        root.style.removeProperty(key);
      }
    } else {
      for (const [key, value] of Object.entries(vars)) {
        root.style.setProperty(key, value);
      }
    }
  }, [color]);

  return (
    <ThemeContext.Provider value={{ font, color, setFont, setColor }}>
      {children}
    </ThemeContext.Provider>
  );
}
