import type { MetadataRoute } from "next";

const BASE_URL = "https://credvest-ten.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/company",
    "/group",
    "/people",
    "/careers",
    "/how-we-work",
    "/contact",
    "/brand",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
