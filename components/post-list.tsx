import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { Post } from "@/lib/posts";

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="space-y-8">
      {posts.map((post) => (
        <li key={post.slug}>
          <article>
            <h2 className="font-display text-2xl">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
              {post.draft && (
                <span className="ml-2 text-sm font-normal text-amber-600">
                  rascunho
                </span>
              )}
            </h2>
            <time dateTime={post.date} className="text-sm text-foreground/60">
              {formatDate(post.date)}
            </time>
            {post.description && (
              <p className="mt-2 text-foreground/80">{post.description}</p>
            )}
          </article>
        </li>
      ))}
    </ul>
  );
}
