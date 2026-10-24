# Spec Delta

## Purpose

Keeps links to the old Hugo version of iagolaguna.com working after the rewrite, so bookmarks, search results and feed subscriptions are not broken.

## ADDED Requirements

### Requirement: Old post URLs redirect
Requests to an old Hugo post URL `/post/<slug>` or `/post/<slug>/` SHALL permanently redirect (HTTP 308) to `/blog/<slug>`.

#### Scenario: Migrated post
- **WHEN** a visitor requests `/post/frontloops-o-desafio/`
- **THEN** the site responds with a 308 redirect to `/blog/frontloops-o-desafio`

#### Scenario: Post that no longer exists
- **WHEN** a visitor requests `/post/frontloop-loop-1-step-1/`
- **THEN** the site redirects to `/blog/frontloop-loop-1-step-1`, which responds with the 404 page

### Requirement: Old listing URLs redirect
Requests to `/post` or `/post/` SHALL permanently redirect to `/blog`.

#### Scenario: Old post listing
- **WHEN** a visitor requests `/post/`
- **THEN** the site responds with a 308 redirect to `/blog`

### Requirement: Old feed URLs redirect
Requests to the old Hugo feeds `/index.xml` and `/post/index.xml` SHALL permanently redirect to `/rss.xml`.

#### Scenario: Existing feed subscriber
- **WHEN** a feed reader requests `/index.xml`
- **THEN** the site responds with a 308 redirect to `/rss.xml`

### Requirement: Old image URLs keep working
Images that the old site served under `/images/...` and that are reused by migrated posts SHALL remain available at the same paths.

#### Scenario: Old cover image link
- **WHEN** a visitor requests `/images/posts/frontloops-o-desafio/capa.png`
- **THEN** the image is served successfully
