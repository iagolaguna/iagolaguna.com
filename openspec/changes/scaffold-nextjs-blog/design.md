# Design

## Context

The repo is empty apart from OpenSpec. The old Hugo site is on `master`: two published posts in `content/post/`, one empty draft, and images under `static/images/` served at `/images/...`. Hugo published posts at `/post/<slug>/` and feeds at `/index.xml` and `/post/index.xml`. See proposal.md for motivation and specs/ for the required behavior.

Versions at the time of writing: Next.js 16, React 19, Tailwind CSS 4, Shiki 4, rehype-pretty-code 0.14, Content Collections core 0.15.

## Goals / Non-Goals

**Goals:**
- Every page is a Server Component and fully prerendered at build time
- Content errors (bad frontmatter, missing images) fail `pnpm build`, not production
- A layout that later features (comments, OG images, dynamic routes) can slot into without restructuring

**Non-Goals:**
- Shared UI component library or design system
- Automated test suite beyond type-checking, linting and a build-output check. Tests are worth adding once there is logic beyond content rendering

## Decisions

### Project layout

```
app/
  layout.tsx            root layout: <html lang="pt-BR">, header, footer, feed <link>
  page.tsx              home
  not-found.tsx         404 with link to /blog
  blog/page.tsx         index
  blog/[slug]/page.tsx  post page (generateStaticParams, generateMetadata)
  rss.xml/route.ts      RSS route handler (prerendered)
  sitemap.ts
  robots.ts
components/             header, footer, post list, MDX components
lib/                    post queries (published(), bySlug()), date formatting, site config
content/posts/*.mdx     posts
public/images/...       images, kept at the old Hugo paths
content-collections.ts  collection schema
```

No `src/` directory: the site is small and root-level `app/` is the Next.js default.

### Content layer: Content Collections over Velite

Content Collections has an official Next.js adapter (`withContentCollections` in `next.config.ts`) that runs in the same build and dev process, including Turbopack. It validates frontmatter with a Zod schema and compiles MDX with `@content-collections/mdx`, so the result is a typed `allPosts` import.

Velite was the alternative. It works, but it runs as a separate process next to `next dev`/`next build`, which adds scripts and a second watcher. Both are actively maintained. Content Collections is the simpler fit for a Next-only project.

The schema uses `z.object({...}).strict()` so unknown fields fail validation (blog-content: Optional frontmatter). A `transform` step adds `slug` (file name), `readingTime`, and checks that `cover` exists under `public/`, throwing with the file name if it doesn't.

### Drafts

`lib/posts.ts` exposes `getPublishedPosts()` that filters out `draft: true` when `process.env.NODE_ENV === "production"`. Every consumer (pages, `generateStaticParams`, RSS, sitemap) goes through this one function, so draft handling can't drift. The project runs with Cache Components (the Next.js 16 scaffold default), where `dynamicParams` is not available. Instead, the post page calls `notFound()` when `getPostBySlug()` finds no published post, so unknown and draft slugs return 404 in production.

### MDX rendering and code highlighting

MDX is compiled at build time by Content Collections with `rehype-pretty-code` (Shiki) in its rehype plugins, so highlighted HTML is in the compiled output and no highlighter code reaches the browser. The page renders it with the adapter's `MDXContent` component plus a small component map (images through `next/image`, external links with `rel="noopener"`).

Shiki uses dual themes (`github-light` / `github-dark`), switched with a `prefers-color-scheme` CSS rule. That covers the spec's light and dark readability without JavaScript.

Alternative: highlighting at request time with a Server Component. Rejected because every page is static anyway and build-time output is simpler.

### Styling

Tailwind CSS 4 with CSS-first config (`@import "tailwindcss"` and `@plugin "@tailwindcss/typography"` in `app/globals.css`). Post bodies use `prose` / `dark:prose-invert`. Dark mode follows `prefers-color-scheme` (Tailwind's default `dark:` variant), so no toggle and no client script.

Fonts come from `next/font` (self-hosted at build time, no layout shift).

### Server and client components

Every component in this change is a Server Component. There is no `"use client"` boundary because nothing needs browser state or event handlers: navigation uses `next/link`, which works as plain anchors without JavaScript. This is also what lets the "Pages work without JavaScript" requirement hold. Future interactive pieces (Giscus, reactions) will be the first client islands.

### Dates

Frontmatter dates are parsed as full timestamps. Display uses `Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeZone: "America/Sao_Paulo" })`. Fixing the time zone keeps the shown date the same regardless of the build machine's zone (Vercel builds in UTC, which would otherwise shift late-night posts).

### Metadata

A `siteConfig` in `lib/site.ts` holds the base URL, author and description. `metadataBase` is set in the root layout so relative OG image paths become absolute. Post pages use `generateMetadata` with `alternates.canonical`, `openGraph` (type `article`, `publishedTime`, cover image) and `twitter` (`summary_large_image` when a cover exists).

### RSS

`app/rss.xml/route.ts` builds the XML string by hand. With Cache Components, a `GET` handler that reads no runtime data is prerendered, so the feed is generated once at build with no `dynamic` config. A feed library isn't worth a dependency for one feed. Titles and descriptions are XML-escaped.

### Redirects

Defined in `next.config.ts` `redirects()` with `permanent: true` (Next.js sends 308). Order matters: the feed rule for `/post/index.xml` comes before `/post/:slug`, or the slug rule would catch it.

| source | destination |
|---|---|
| `/index.xml` | `/rss.xml` |
| `/post/index.xml` | `/rss.xml` |
| `/post` | `/blog` |
| `/post/:slug` | `/blog/:slug` |

Next.js strips trailing slashes by default (`trailingSlash: false`), so `/post/x/` is normalized to `/post/x` first and then matches.

Images are copied from `master:static/images/` to `public/images/` with the same paths. That keeps old image URLs working with no redirect, and lets migrated posts keep their absolute `/images/...` links.

### Migrating the posts

The two published posts are converted by hand. Only two exist, so a script isn't worth it.
- `image` → `cover`, with the leading `/` added
- Hugo's `\` line-break hack (a lone backslash on a line) becomes normal paragraph breaks
- Keep `tags`; drop `draft: false`

The empty draft `frontloop-loop-1-step-1` is not migrated.

## Risks / Trade-offs

- [Content Collections is pre-1.0 and its API can change] → It is pinned in `package.json`, and all content access goes through `lib/posts.ts`, so swapping to Velite or a hand-written loader would touch one module
- [Next.js 16 features and Tailwind 4 config differ from most tutorials online] → Follow current official docs (Context7) during implementation, not older blog posts
- [Changing URLs costs some SEO] → Permanent redirects pass ranking signals, and the site's search footprint is small
- [The RSS XML is hand-written] → Validate it once with the W3C feed validator during implementation
- [No automated tests] → `pnpm build` is the test: schema validation, type-checking and static generation all run there. A tasks.md step checks build output against the spec scenarios

## Migration Plan

1. Build and verify locally (`pnpm build && pnpm start`), including redirects and the 404
2. Deploy to a Vercel preview URL and check pages, feed and redirects there
3. Moving the domain from Netlify to Vercel is out of scope (see proposal). Until then, the Netlify site stays live from `master`

Rollback: until the domain moves, nothing changes for visitors. After the move, pointing DNS back to Netlify restores the old site from `master`.

## Open Questions

- Home intro text and author bio: the old bio (in Portuguese, mentioning a 2018 job) is outdated. A placeholder is used until Iago provides new copy. This doesn't affect structure or specs
