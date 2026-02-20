import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/coming-soon"],
    },
    sitemap: "https://credvest-ten.vercel.app/sitemap.xml",
  };
}
