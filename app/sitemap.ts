import type { MetadataRoute } from "next";
import { nav, siteUrl } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return nav.map((item) => ({
    url: `${siteUrl}${item.href === "/" ? "" : item.href}`,
    lastModified,
    changeFrequency: item.href === "/portfolio" ? "monthly" : "yearly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
