# iagolaguna.com

Personal blog of Iago Laguna, built with Next.js (App Router), TypeScript, Tailwind CSS and MDX.

## Stack

- [Next.js 16](https://nextjs.org) with React Server Components. Every page is prerendered at build time
- [Content Collections](https://www.content-collections.dev) for typed MDX posts with validated frontmatter
- [rehype-pretty-code](https://rehype-pretty.pages.dev) and Shiki for build-time code highlighting
- Tailwind CSS 4 with `@tailwindcss/typography`
- pnpm

## Development

```sh
pnpm install
pnpm dev        # http://localhost:3000, drafts visible
pnpm build      # production build, fails on invalid content
pnpm start      # serve the production build
pnpm typecheck
pnpm lint
```

## Writing a post

Create `content/posts/<slug>.mdx`. The file name becomes the URL: `/blog/<slug>`.

```mdx
---
title: "Post title"            # required
date: 2026-10-23               # required, ISO date or date-time
description: Short summary     # optional, used in listings, RSS and meta tags
tags: ["nextjs", "css"]        # optional
cover: /images/posts/<slug>/cover.png  # optional, file must exist in public/
draft: true                    # optional, hidden from production builds
---

Post content in Markdown or MDX.
```

Put images in `public/images/posts/<slug>/` and reference them with absolute paths (`/images/posts/<slug>/foo.png`). The build fails on missing or unknown frontmatter fields, invalid dates and images that don't exist.

## Planning

Changes are planned with [OpenSpec](https://github.com/Fission-AI/OpenSpec) in `openspec/`. Use `/opsx:propose` to start a change and `/opsx:apply` to implement it.
