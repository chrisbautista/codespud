# 0002. Custom Node publishing toolchain + draft flag

- Status: Accepted
- Date: 2026-06-20 (the toolchain was added in commit `1c99c576`, "add publishing toolchain scripts and dashboard")
- Deciders: Chris Bautista

## Context

Creating a post by hand means remembering the frontmatter shape, the `/<year>/<slug>/`
URL convention, the date format, and to add a bare-slug `redirect_from`. Knowing which
posts are still unfinished, or which are missing tags/images, required scanning files by
hand. The build already excludes unfinished work via a `draft` frontmatter flag (filtered
in `gatsby-node.js`), so a workflow around that flag was the natural fit.

> INFERRED — confirm: the exact pain points are reconstructed from what the scripts
> automate; the intent is clear from the code but wasn't separately documented.

## Decision

We will manage the author workflow with **small, dependency-free Node scripts in
`scripts/`**, wired to npm scripts, built around the `draft: true/false` flag:

- `new-post.js` (`npm run new-post -- "Title"`) — scaffolds
  `content/blog/<year>/<slug>.md` with pre-filled frontmatter, `draft: true`.
- `list-drafts.js` (`npm run drafts`) — lists all drafts with age and missing tags/image.
- `publish-post.js` (`npm run publish -- <file>`) — flips `draft` to `false`, refreshes
  the date, warns on empty tags/image.
- `generate-dashboard.js` (`npm run dashboard`) — regenerates `dashboard.html`.

## Alternatives considered

- **Edit frontmatter by hand** — rejected: error-prone (date format, URL/redirect
  conventions) and gives no overview of draft state.
- **A heavier framework/CLI or a headless CMS** — rejected: overkill for a single-author
  blog; adds dependencies and lock-in versus ~60 lines of plain Node each.

## Consequences

- Consistent frontmatter and URL/redirect conventions without memorizing them; drafts
  are discoverable (`npm run drafts`).
- The scripts **parse frontmatter with regexes**, not a YAML library — they assume the
  exact field formats `new-post.js` emits (e.g. `draft:\s*true`, `tags: [..]` on one
  line). Reformatting frontmatter or moving fields can silently break `publish`/`drafts`.
  Keep new posts in the shape `new-post.js` produces.
- `dashboard.html` is a generated artifact; edit the generator, not the HTML.
