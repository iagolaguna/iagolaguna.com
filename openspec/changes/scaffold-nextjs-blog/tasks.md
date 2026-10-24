# Tasks

## 1. Project setup

- [x] 1.1 Scaffold Next.js 16 (App Router, TypeScript strict, ESLint, Tailwind 4, no `src/`, pnpm) at the repo root without overwriting `openspec/`, `.claude/` or `.gitignore`; verify `pnpm dev` serves the default page and `pnpm build` succeeds
- [x] 1.2 Add `lib/site.ts` (base URL `https://iagolaguna.com`, author, description), set `metadataBase`, `<html lang="pt-BR">`, `next/font`, and a minimal header/footer in `app/layout.tsx`; verify the rendered HTML has `lang="pt-BR"` and the site title
- [x] 1.3 Configure `app/globals.css` with `@plugin "@tailwindcss/typography"` and system dark mode; verify a `prose dark:prose-invert` test block renders styled in both light and dark system themes
- [x] 1.4 Add `typecheck` and `lint` scripts to `package.json`; verify `pnpm typecheck && pnpm lint` pass

## 2. Content layer

- [x] 2.1 Install Content Collections (`core`, `next`, `mdx`) and `zod`, wrap `next.config.ts` with `withContentCollections`, and add the `@content-collections` path alias; verify `pnpm build` generates the collection output
- [x] 2.2 Define the `posts` collection in `content-collections.ts` over `content/posts/*.mdx` with a strict Zod schema (`title`, `date` required; `description`, `tags`, `cover`, `draft` optional); verify a post missing `title` and a post with an unknown field each fail `pnpm build` with the file name in the error
- [x] 2.3 Add the transform: `slug` from file name, `readingTime`, cover-existence check against `public/`, MDX compilation with `rehype-pretty-code` (dual `github-light`/`github-dark` themes); verify a missing cover fails the build and a sample post's compiled output contains highlighted spans
- [x] 2.4 Implement `lib/posts.ts` (`getPublishedPosts()` sorted by date descending with draft filtering in production, `getPostBySlug()`) and `lib/format.ts` (`pt-BR` long date, `America/Sao_Paulo` zone); verify with a temporary draft post that it shows in `pnpm dev` and is absent from `pnpm build` output, and that 2018-05-12 formats as "12 de maio de 2018"

## 3. Migrate existing posts

- [x] 3.1 Copy `static/images/` from `master` into `public/images/` keeping paths (`git show`/`git checkout master -- ...` then move); verify `/images/posts/frontloops-o-desafio/capa.png` loads from `pnpm dev`
- [x] 3.2 Convert `begin.md` and `frontloops-o-desafio.md` from `master` into `content/posts/*.mdx` (`image` → `cover`, remove `\` line-break hacks, drop `draft: false`, keep tags and Portuguese text); verify both pass the schema in `pnpm build` and render with all inline images

## 4. Reading pages

- [x] 4.1 Build `app/blog/page.tsx` listing published posts (title link, `pt-BR` date, description only when present); verify order is newest first and a post without description shows no empty element
- [x] 4.2 Build `app/blog/[slug]/page.tsx` with `generateStaticParams`, `dynamicParams = false`, title, date, reading time, cover, tags and MDX body in `prose`; add the MDX component map (`next/image`, external links); verify `/blog/frontloops-o-desafio` matches the spec scenario and `pnpm build` lists both posts as static (●)
- [x] 4.3 Add `generateMetadata` on the post page (title, description, canonical, Open Graph `article` with cover, Twitter card) and default metadata on other pages; verify with `curl` that `/blog/frontloops-o-desafio` has `og:image`, `og:title` and the canonical link
- [x] 4.4 Build the home page (intro placeholder, five latest posts, link to `/blog`) and `app/not-found.tsx` linking to `/blog`; verify `/blog/does-not-exist` returns 404 with the link
- [x] 4.5 Add a code block to a migrated post or a sample and check highlighting in light and dark mode; verify all pages render and navigate with JavaScript disabled in the browser

## 5. Feeds and SEO files

- [x] 5.1 Implement `app/rss.xml/route.ts` (force-static, RSS 2.0, escaped fields, `application/rss+xml`) and the alternate `<link>` in the root layout; verify the output passes the W3C feed validator
- [x] 5.2 Implement `app/sitemap.ts` and `app/robots.ts`; verify `/sitemap.xml` lists home, `/blog` and both posts with absolute URLs, and `/robots.txt` points to the sitemap

## 6. Legacy URLs

- [ ] 6.1 Add redirects in `next.config.ts` (`/index.xml`, `/post/index.xml` → `/rss.xml`; `/post` → `/blog`; `/post/:slug` → `/blog/:slug`, feed rules first); verify with `curl -I` against `pnpm start` that `/post/frontloops-o-desafio/`, `/post/`, `/index.xml` and `/post/index.xml` end at the right target with 308s

## 7. Integration check

- [ ] 7.1 Run `pnpm typecheck && pnpm lint && pnpm build`, start the production server, and walk every scenario in `specs/` (pages, 404, drafts, feeds, redirects, images); verify each passes and note any failures
- [ ] 7.2 Write a short `README.md` (stack, `pnpm dev`/`build`, how to add a post with its frontmatter fields); verify the documented commands run as written

## Workflow follow-up

- Deploy to a Vercel preview and check pages, feed and redirects there
- Archive the change with `/opsx:archive` after review
