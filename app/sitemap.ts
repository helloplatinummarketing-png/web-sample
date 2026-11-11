import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { jobs } from "@/data/jobs";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/jobs", "/apply", "/track", "/about", "/contact", "/privacy", "/terms"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: p === "/jobs" ? ("daily" as const) : ("monthly" as const),
    priority: p === "" ? 1 : p === "/jobs" || p === "/apply" ? 0.9 : 0.5,
  }));
  const jobPages = jobs.map((j) => ({
    url: `${site.url}/jobs/${j.slug}`,
    lastModified: new Date(j.posted),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
  return [...pages, ...jobPages];
}
