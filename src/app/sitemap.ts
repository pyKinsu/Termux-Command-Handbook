import { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/Lessons", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/Basics", priority: 0.8, changeFrequency: "monthly" as const },
  {
    path: "/How-to-download-termux",
    priority: 0.8,
    changeFrequency: "monthly" as const,
  },
  { path: "/Lesson1", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/Lesson2", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/Lesson3", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/Lesson4", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/Lesson5", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/Lesson6", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/Lesson7", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/Lesson8", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/Lesson9", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/About", priority: 0.5, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
