import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [...new Set(Object.values(site.pages))].map((path) => ({
    url: new URL(path, site.siteUrl).toString(),
    changeFrequency: path === "/gatherings/" || path === "/messages/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/gatherings/" || path === "/visit/" ? 0.8 : 0.6,
  }));
}
