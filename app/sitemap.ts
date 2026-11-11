import type { MetadataRoute } from "next";
import { jobs } from "@/data/jobs";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/jobs", "/apply", "/track", "/about", "/contact", "/privacy", "/terms", "/credits"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...jobs.map((j) => ({ url: `${site.url}/jobs/${j.slug}`, lastModified: j.posted, changeFrequency: "weekly" as const, priority: 0.6 })),
  ];
}
