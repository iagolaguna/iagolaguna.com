import { existsSync } from "node:fs";
import path from "node:path";
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import { z } from "zod";

const WORDS_PER_MINUTE = 200;

// Date-only values are read as midnight in the site's time zone (Brazil, UTC-3),
// not UTC, so they don't show up as the previous day.
function toTimestamp(date: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date) ? `${date}T00:00:00-03:00` : date;
}

// Local images referenced from Markdown (`![alt](/path)`) or JSX (`src="/path"`).
const LOCAL_IMAGE_PATTERN = /!\[[^\]]*\]\((\/[^)\s]+)|src=["'](\/[^"']+)["']/g;

function assertPublicFile(filePath: string, publicPath: string) {
  if (!existsSync(path.join(process.cwd(), "public", publicPath))) {
    throw new Error(`${filePath}: image not found: ${publicPath}`);
  }
}

const posts = defineCollection({
  name: "posts",
  directory: "content/posts",
  include: "*.mdx",
  schema: z
    .object({
      title: z.string().min(1),
      date: z.union([z.iso.date(), z.iso.datetime({ offset: true })]),
      description: z.string().optional(),
      tags: z.array(z.string()).default([]),
      cover: z.string().startsWith("/").optional(),
      draft: z.boolean().default(false),
      content: z.string(),
    })
    .strict(),
  transform: async (document, context) => {
    const { filePath } = document._meta;

    if (document.cover) {
      assertPublicFile(filePath, document.cover);
    }
    for (const match of document.content.matchAll(LOCAL_IMAGE_PATTERN)) {
      assertPublicFile(filePath, match[1] ?? match[2]);
    }

    const words = document.content.trim().split(/\s+/).length;
    const body = await compileMDX(context, document, {
      rehypePlugins: [
        [
          rehypePrettyCode,
          { theme: { light: "github-light", dark: "github-dark" } },
        ],
      ],
    });

    return {
      ...document,
      slug: document._meta.path,
      date: new Date(toTimestamp(document.date)).toISOString(),
      readingTime: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
      body,
    };
  },
});

export default defineConfig({
  content: [posts],
});
