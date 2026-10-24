import type { Metadata } from "next";
import { PostList } from "@/components/post-list";
import { getPublishedPosts } from "@/lib/posts";
import { pageAlternates } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Todos os posts do blog.",
  alternates: pageAlternates("/blog"),
};

export default function BlogPage() {
  return (
    <>
      <h1 className="mb-10 text-3xl font-bold">Blog</h1>
      <PostList posts={getPublishedPosts()} />
    </>
  );
}
