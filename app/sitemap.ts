import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPublishedPosts();
  return [
    { url: absoluteUrl("/"), lastModified: posts[0]?.date },
    { url: absoluteUrl("/blog"), lastModified: posts[0]?.date },
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.date,
    })),
  ];
}
