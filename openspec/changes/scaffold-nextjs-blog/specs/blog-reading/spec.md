# Spec Delta

## Purpose

Defines how readers find and read posts on the site: the home page, the blog index, individual post pages, and the metadata those pages expose.

## ADDED Requirements

### Requirement: Home page
The home page at `/` SHALL show the author's name, a short intro, and the five most recent published posts with a link to the full blog index.

#### Scenario: Home lists latest posts
- **WHEN** a reader opens `/` and there are more than five published posts
- **THEN** the page shows the author intro, the five newest posts by date, and a link to `/blog`

### Requirement: Blog index
The page at `/blog` SHALL list every published post, newest first. Each entry SHALL show the title linked to the post, the publication date and the description when the post has one.

#### Scenario: Posts listed newest first
- **WHEN** a reader opens `/blog`
- **THEN** every published post appears once, ordered by `date` descending, with title, date and description

#### Scenario: Post without description
- **WHEN** a listed post has no description
- **THEN** its entry shows the title and date only, with no empty placeholder

### Requirement: Post page
Each published post SHALL have a page at `/blog/<slug>` showing its title, publication date, reading time estimate, cover image when present, tags when present, and rendered body.

#### Scenario: Reading a post
- **WHEN** a reader opens `/blog/frontloops-o-desafio`
- **THEN** the page shows the post's title, date, reading time, cover image, tags and body

#### Scenario: Unknown slug
- **WHEN** a reader opens `/blog/does-not-exist`
- **THEN** the site responds with a 404 page that links back to `/blog`

### Requirement: Dates shown in Portuguese
Dates on listings and post pages SHALL be formatted for the `pt-BR` locale, and pages SHALL declare `pt-BR` as their language.

#### Scenario: Date formatting
- **WHEN** a post dated 2018-05-12 is shown
- **THEN** the date reads "12 de maio de 2018"

### Requirement: Code blocks are highlighted
Fenced code blocks with a language SHALL be rendered with syntax highlighting that is present in the delivered HTML, without client-side JavaScript, using a light palette that matches the site.

#### Scenario: Highlighted code without JavaScript
- **WHEN** a reader with JavaScript disabled opens a post containing a fenced `ts` code block
- **THEN** the code block is shown with syntax colors

### Requirement: Pages work without JavaScript
The home page, blog index and post pages SHALL be fully readable and navigable with JavaScript disabled.

#### Scenario: Navigation without JavaScript
- **WHEN** a reader with JavaScript disabled opens `/`, follows a link to `/blog` and then to a post
- **THEN** every page renders its full content and all links work

### Requirement: Page metadata
Every page SHALL set a descriptive `<title>`, a meta description and a canonical URL on `https://iagolaguna.com`. Post pages SHALL also set Open Graph and Twitter card tags with the post's title, description and cover image when present.

#### Scenario: Post page metadata
- **WHEN** a crawler fetches `/blog/frontloops-o-desafio`
- **THEN** the HTML contains a `<title>` with the post title, a meta description, `og:title`, `og:description`, `og:image` pointing to the cover, and a canonical link to `https://iagolaguna.com/blog/frontloops-o-desafio`

### Requirement: Light theme only
The site SHALL always render with its light theme, regardless of the visitor's system color scheme.

#### Scenario: Visitor uses dark mode
- **WHEN** a visitor whose operating system is set to dark mode opens any page
- **THEN** the page renders with a white background and dark text

### Requirement: Site identity
Every page SHALL show the lgn logo in the header, linking to the home page. Page titles SHALL end with "| lgn" except the home page, whose title is "lgn". The site SHALL provide a favicon and an Apple touch icon with the lgn logo.

#### Scenario: Header and title
- **WHEN** a reader opens `/blog/begin`
- **THEN** the header shows the lgn logo linking to `/` and the title is "O inicio | lgn"

#### Scenario: Icons
- **WHEN** a browser requests `/favicon.ico`, `/icon.svg` or `/apple-icon.png`
- **THEN** each responds successfully with the lgn logo
