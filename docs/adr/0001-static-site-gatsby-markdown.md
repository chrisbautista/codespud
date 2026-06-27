# 0001. Static site on Gatsby with markdown content

- Status: Accepted
- Date: 2026-06-20 (recorded; decision originally made ~2019, the earliest Gatsby-era commits)
- Deciders: Chris Bautista

## Context

codespud.com previously ran on WordPress (evidenced by the `content/blog/wp-content/`
import tree). A personal coding blog has modest needs: fast static pages, markdown
authoring, code-syntax highlighting, an RSS feed, and cheap/free hosting. It does not
need a database, a CMS admin, or server-side runtime.

> INFERRED — confirm: the specific motivation (performance, cost, markdown authoring,
> killing the WordPress maintenance/security burden) is reconstructed from the artifacts,
> not from a recorded rationale.

## Decision

We will build the site as a **Gatsby v2 static site** (React + styled-components),
sourcing all content from **markdown files with YAML frontmatter** under `content/`.
The project started from `gatsby-starter-blog` (still reflected in `package.json`'s
name/author/repo metadata) and was customized from there. Pages are generated
programmatically in `gatsby-node.js`; the plugin pipeline (remark images, prismjs,
codepen, sharp, feed, sitemap, manifest, offline) is configured in `gatsby-config.js`.

## Alternatives considered

- **Stay on WordPress** — rejected: server/database maintenance and security overhead,
  slower, costlier hosting for a personal blog.
- **A different static generator (Jekyll, Hugo, Eleventy)** — not chosen; Gatsby's
  React/GraphQL model and rich plugin ecosystem fit the author's JS/React skillset.
- **Hand-rolled React SPA** — rejected: no built-in content pipeline, SEO, or feeds.

## Consequences

- Authoring is plain markdown; the whole site is a static bundle deployable to any
  static host (see ADR-0002 and the gh-pages deploy).
- The site is **pinned to the Gatsby v2 / React 16 era.** Plugins in `package.json` are
  v2-vintage. A major Gatsby upgrade is a real migration project, not a routine bump —
  reversing or modernizing this choice is expensive.
- All content structure (frontmatter fields, `contentType`, draft handling) is coupled
  to the GraphQL queries in `gatsby-node.js` and the `src/templates/`; changing field
  names means updating those queries too.
