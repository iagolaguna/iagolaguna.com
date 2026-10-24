# Spec Delta

## Purpose

Defines how blog posts are authored and stored in the repository, what metadata each post carries, and how invalid or unfinished posts are handled at build time.

## ADDED Requirements

### Requirement: Posts are MDX files in the repository
Each post SHALL be a single MDX file in the repository's posts directory. The file name without extension SHALL be the post's slug, and slugs MUST be unique.

#### Scenario: Post file defines slug
- **WHEN** a file named `frontloops-o-desafio.mdx` exists in the posts directory
- **THEN** the site publishes a post with slug `frontloops-o-desafio`

#### Scenario: MDX components in a post
- **WHEN** a post's body contains Markdown and JSX components
- **THEN** both are rendered in the published post

### Requirement: Required frontmatter
Every post MUST declare `title` (non-empty string) and `date` (ISO 8601 date or date-time) in its frontmatter.

#### Scenario: Missing title fails the build
- **WHEN** a post has no `title` in its frontmatter
- **THEN** the build fails with an error naming the post file and the missing field

#### Scenario: Invalid date fails the build
- **WHEN** a post's `date` is not a valid ISO 8601 value
- **THEN** the build fails with an error naming the post file and the invalid field

### Requirement: Optional frontmatter
A post MAY declare `description` (string), `tags` (list of strings), `cover` (path to an image) and `draft` (boolean, default `false`). Unknown frontmatter fields MUST fail the build so typos are caught.

#### Scenario: Optional fields omitted
- **WHEN** a post declares only `title` and `date`
- **THEN** the build succeeds and the post is published with no description, no tags, no cover and `draft` set to `false`

#### Scenario: Unknown field fails the build
- **WHEN** a post declares a field `descripton`
- **THEN** the build fails with an error naming the post file and the unknown field

### Requirement: Drafts are not published
A post with `draft: true` SHALL be excluded from production builds: it has no page, and it does not appear in listings, the RSS feed or the sitemap. Drafts SHALL be visible when running the local development server.

#### Scenario: Draft in production
- **WHEN** a production build runs with a post marked `draft: true`
- **THEN** requesting that post's URL returns a 404 and the post appears in no listing, feed or sitemap

#### Scenario: Draft in development
- **WHEN** the development server runs with a post marked `draft: true`
- **THEN** the post's page renders and the post appears in listings, marked as a draft

### Requirement: Post assets
Images used by a post, including its cover, SHALL be stored in the repository and served from stable public URLs. A post referencing a local image that does not exist MUST fail the build.

#### Scenario: Missing image fails the build
- **WHEN** a post's `cover` points to a file that does not exist
- **THEN** the build fails with an error naming the post file and the missing image

### Requirement: Existing posts are migrated
The published Hugo posts `begin` and `frontloops-o-desafio` SHALL be available as posts with their original title, date, description, tags, cover image, body text and inline images. Their content SHALL stay in Portuguese.

#### Scenario: Migrated post content
- **WHEN** a reader opens the migrated `frontloops-o-desafio` post
- **THEN** it shows the title "Frontloops: O Desafio", the date 2018-05-12, its cover image and all inline images from the original post
