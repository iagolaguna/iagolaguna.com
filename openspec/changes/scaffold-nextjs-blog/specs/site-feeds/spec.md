# Spec Delta

## Purpose

Defines the machine-readable outputs that let feed readers, search engines and crawlers discover the site's content.

## ADDED Requirements

### Requirement: RSS feed
The site SHALL serve an RSS 2.0 feed at `/rss.xml` listing every published post, newest first. Each item SHALL include the title, absolute post URL, publication date and description when present.

#### Scenario: Feed contents
- **WHEN** a feed reader requests `/rss.xml`
- **THEN** it receives valid RSS 2.0 with content type `application/rss+xml` and one item per published post, newest first

#### Scenario: Drafts excluded from feed
- **WHEN** a post is marked `draft: true`
- **THEN** it does not appear in `/rss.xml` in production

### Requirement: Feed discovery
Every page SHALL advertise the RSS feed with a `<link rel="alternate" type="application/rss+xml">` tag.

#### Scenario: Feed link in head
- **WHEN** a feed reader inspects any page
- **THEN** the head contains an alternate link to `https://iagolaguna.com/rss.xml`

### Requirement: Sitemap
The site SHALL serve `/sitemap.xml` listing the home page, the blog index and every published post with absolute URLs. Post entries SHALL carry the post date as their last-modified date.

#### Scenario: Sitemap contents
- **WHEN** a crawler requests `/sitemap.xml`
- **THEN** it lists `https://iagolaguna.com/`, `https://iagolaguna.com/blog` and one entry per published post, and no drafts

### Requirement: Robots rules
The site SHALL serve `/robots.txt` that allows crawling of all public pages and points to the sitemap.

#### Scenario: Robots file
- **WHEN** a crawler requests `/robots.txt`
- **THEN** it allows all user agents and includes `Sitemap: https://iagolaguna.com/sitemap.xml`
