import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

// Function to get all post slugs from the Outstatic posts directory
const getPostSlugs = (): string[] => {
  try {
    const postsDirectory = path.join(process.cwd(), "outstatic/content/posts");
    const fileNames = fs.readdirSync(postsDirectory);

    // Filter for markdown files and remove extensions to get slugs
    return fileNames
      .filter((fileName) => /\.mdx?$/.test(fileName))
      .map((fileName) => fileName.replace(/\.mdx?$/, ""));
  } catch (error) {
    console.error("Error reading posts directory:", error);
    return [];
  }
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thedigitalveil.com";

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  // Dynamic routes for blog posts
  const postSlugs = getPostSlugs();
  const postRoutes = postSlugs.map((slug) => ({
    url: `${baseUrl}/posts/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...postRoutes];
}
