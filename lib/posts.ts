import { allPosts, type Post } from "content-collections";

export type { Post };

// Drafts are visible in `next dev` and excluded from production builds.
const showDrafts = process.env.NODE_ENV !== "production";

export function getPublishedPosts(): Post[] {
  return allPosts
    .filter((post) => showDrafts || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getPublishedPosts().find((post) => post.slug === slug);
}
