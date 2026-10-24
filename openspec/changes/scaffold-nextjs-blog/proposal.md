# Proposal

## Why

The Hugo site has been removed and the repo now holds only the OpenSpec setup, so iagolaguna.com has nothing to deploy. This change sets up the Next.js app and gets the blog back online with the existing posts, giving later features (comments, analytics, OG images, dynamic features) a working base to build on.

## What Changes

- Scaffold a Next.js App Router project with strict TypeScript, pnpm, Tailwind CSS and ESLint
- Add a typed content layer that loads MDX posts from the repo and validates their frontmatter at build time
- Migrate the two published Hugo posts (`begin`, `frontloops-o-desafio`) and their images from `master` into MDX. The unfinished draft (`frontloop-loop-1-step-1`, empty body) is not migrated
- Add a home page with a short intro and the latest posts, a `/blog` index, and a `/blog/[slug]` post page, all prerendered at build time
- Render post content with Tailwind Typography and build-time Shiki highlighting
- Add an RSS feed, `sitemap.xml` and `robots.txt`
- Redirect old Hugo URLs (`/post/<slug>/`, `/index.xml`, `/post/index.xml`) to their new equivalents with permanent redirects
- **BREAKING**: post URLs move from `/post/<slug>/` to `/blog/<slug>`. Old links keep working through the redirects

## Capabilities

### New Capabilities

- `blog-content`: how posts are authored and stored: MDX files, required and optional frontmatter, validation, drafts and post assets
- `blog-reading`: how readers find and read posts: home page, blog index, post page, ordering, content rendering and page metadata
- `site-feeds`: machine-readable site outputs: RSS feed, sitemap and robots rules
- `legacy-urls`: keeping links from the old Hugo site working through redirects

### Modified Capabilities

None. There are no existing specs.

## Out of Scope

- Generated Open Graph images (`next/og`)
- Giscus comments and analytics (Plausible or Umami)
- Tag and category pages. Tags are kept in frontmatter but get no pages yet
- Search, view counters, newsletter, auth, projects page
- Dark mode toggle. The site follows the system color scheme only
- Visual design beyond a clean, readable baseline layout
- Vercel project setup and DNS cutover. This change produces a buildable app, but connecting the domain is a separate step
- Translating the site. Posts stay in Portuguese (`pt-BR`) as they were written

## Impact

- New Next.js project files at the repo root (`package.json`, `app/`, `content/`, `public/`, config files)
- New dependencies: `next`, `react`, `react-dom`, `typescript`, `tailwindcss`, `@tailwindcss/typography`, Content Collections (`@content-collections/core`, `/next`, `/mdx`), `zod`, `rehype-pretty-code`, `shiki`
- Post URLs change, which affects existing inbound links and search indexing. The redirects cover this
- The old Hugo RSS URL keeps working for existing subscribers through a redirect to the new feed
