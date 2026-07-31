import type { MetadataRoute } from "next";
import { blogPosts, policyContent, siteConfig } from "@/data/store";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    siteConfig.productPath,
    "/pages/about-us",
    "/pages/contact-us",
    "/pages/faqs",
    "/pages/customer-reviews",
    "/pages/sleep-quiz",
    "/pages/how-it-works",
    "/pages/pillow-height-guide",
    "/pages/colour-and-cover-guide",
    "/order-tracking",
    "/blog",
  ];
  const routes = [
    ...staticRoutes,
    ...blogPosts.map((post) => `/blog/${post.slug}`),
    ...Object.keys(policyContent).map((slug) => `/policies/${slug}`),
  ];

  return routes.map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    lastModified: new Date("2026-07-31"),
    changeFrequency: route === siteConfig.productPath ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route === siteConfig.productPath
          ? 0.95
          : route.startsWith("/blog/")
            ? 0.65
            : 0.75,
  }));
}
