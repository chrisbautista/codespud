# 0003. Preserve legacy URLs via redirect_from

- Status: Accepted
- Date: 2026-06-20 (recorded; mechanism present since the WordPress→Gatsby migration)
- Deciders: Chris Bautista

## Context

The blog migrated from WordPress, which used different URL shapes than the current
`/<year>/<slug>/` scheme. Posts have existing inbound links — search results, social
shares, other sites — that must not 404. Several commits speak to this directly
("re slug blog and add redirects", "url cleanup and style fixes").

## Decision

We will preserve old URLs with **redirects rather than by freezing slugs**:

- Each post carries a `redirect_from:` frontmatter list (at minimum the bare `/<slug>/`),
  emitted automatically by `new-post.js`. `gatsby-redirect-from` + `gatsby-plugin-meta-redirect`
  turn these into emitted redirect pages at build time.
- One-off path redirects (e.g. `/tags/console` → `/tags/cli`) are created explicitly via
  `createRedirect` in `gatsby-node.js`.
- The WordPress asset tree is kept in place under `content/blog/wp-content/` so legacy
  image/asset paths still resolve.

## Alternatives considered

- **Never change slugs** — rejected: prevents cleaning up old/ugly URLs and the works vs
  blog restructuring.
- **Server-level redirects (host config)** — not chosen; redirects live in source/build
  output so they travel with the static bundle and the gh-pages deploy, independent of host.

## Consequences

- Slugs and structure can be improved without breaking inbound links — as long as a
  matching `redirect_from`/`createRedirect` is added.
- This creates a **standing guardrail**: removing a `redirect_from` entry, deleting
  `content/blog/wp-content/`, or changing a published post's `url:` without a redirect
  will break live links. Treat these as off-limits unless deliberately migrating with
  redirects in hand.
- `gatsby-plugin-meta-redirect` must remain **last** in the `gatsby-config.js` plugins
  array (noted in the config) for redirect emission to work.
