import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXContent } from "@content-collections/mdx/react";
import { mdxComponents } from "@/components/mdx-components";
import { formatDate } from "@/lib/format";
import { getPostBySlug, getPublishedPosts } from "@/lib/posts";
import { pageAlternates } from "@/lib/site";

// Only slugs from generateStaticParams exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `/blog/${post.slug}`;
  const images = post.cover ? [post.cover] : undefined;

  return {
    title: post.title,
    description: post.description,
    alternates: pageAlternates(url),
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      tags: post.tags,
      images,
    },
    twitter: {
      card: post.cover ? "summary_large_image" : "summary",
      title: post.title,
      description: post.description,
      images,
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      <header className="mb-8">
        <h1 className="font-display text-4xl">{post.title}</h1>
        <p className="mt-2 text-sm text-foreground/60">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {" · "}
          {post.readingTime} min de leitura
        </p>
        {post.tags.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2 text-sm">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded bg-foreground/5 px-2 py-0.5 text-foreground/70"
              >
                #{tag}
              </li>
            ))}
          </ul>
        )}
      </header>
      {post.cover && (
        <Image
          src={post.cover}
          alt=""
          width={0}
          height={0}
          sizes="(min-width: 672px) 672px, 100vw"
          className="mb-8 h-auto w-full rounded"
          preload
        />
      )}
      <div className="prose prose-headings:font-display prose-headings:font-normal max-w-none">
        <MDXContent code={post.body} components={mdxComponents} />
      </div>
    </article>
  );
}
