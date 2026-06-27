# Gatsby 2 → 5 Upgrade Notes

Branch: `gatsby5-upgrade`. Done as source/config edits only — the install + build must be run **on your Mac** (the assistant's sandbox has no npm registry access and a different OS, so it couldn't verify the build).

## Run these on your Mac

```bash
# from the repo root, on the gatsby5-upgrade branch
nvm use 20            # optional but recommended — see "Node version" below
rm -rf node_modules package-lock.json .cache public
npm install
npm run build         # the real test — a clean build means the migration worked
npm start             # then spot-check in the browser
```

If `npm install` complains about peer deps, try `npm install --legacy-peer-deps`.

## What changed

**Dependencies (`package.json`)**
- `gatsby` 2 → 5, all `gatsby-*` plugins bumped to their v5-compatible majors.
- `react`/`react-dom` 16 → 18; `styled-components` 4 → 5; `babel-plugin-styled-components` 1 → 2; `react-helmet` 5 → 6.
- Added `gatsby-plugin-image` (replaces `gatsby-image`).
- Removed: `gatsby-image`, `react-spring` (unused), `gatsby-plugin-google-analytics` (dead Universal Analytics ID), `gatsby-plugin-google-adsense` (was commented out).
- Added `engines.node >= 18`.
- Removed the `NODE_OPTIONS=--openssl-legacy-provider` hack from scripts — Gatsby 5 uses webpack 5 and no longer needs it.

**`gatsby-config.js`** — removed the Google Analytics plugin block and the commented adsense block.

**GraphQL syntax (v4→v5 breaking change)** — updated sort/group in `gatsby-node.js`, `src/templates/blog-list.js`, `works-list.js`, `blog-tag-list.js`, `src/components/pagelist.js`, `src/pages/404.js`:
- `sort: { fields: [frontmatter___date], order: DESC }` → `sort: { frontmatter: { date: DESC } }`
- `group(field: frontmatter___tags)` → `group(field: { frontmatter: { tags: SELECT } })`

**`src/components/bio.js`** — migrated the avatar from the old `gatsby-image` `fixed` API to `gatsby-plugin-image` (`GatsbyImage` + `getImage` + `gatsbyImageData(... layout: FIXED)`).

## Things to watch during the build (couldn't be tested here)

1. **Node version.** You're on Node 22; Gatsby 5.16 officially targets Node 18/20. It often works on 22, but if the build crashes (lmdb / sharp / parcel errors), switch to Node 20 LTS (`nvm install 20 && nvm use 20`) and reinstall.
2. **`@weknow/gatsby-remark-codepen@0.1.0`** — very old, used in 8 posts. It's a simple remark transformer so it should still work, but if the build errors on it, tell me and I'll swap it for a lightweight replacement.
3. **`gatsby-redirect-from` + `gatsby-plugin-meta-redirect`** — old redirect plugins. Verify your redirects still generate; if either breaks the build, flag it.
4. **`gatsby-plugin-feed`** — used with default options. Confirm `/rss.xml` still generates after build.
5. **`react-helmet` kept** (via `gatsby-plugin-react-helmet`, still functional on v5 though deprecated). `seo.js` was left unchanged to keep the upgrade low-risk. Migrating to Gatsby's built-in Head API is a clean optional follow-up.
6. **`StaticQuery` render-prop** in `bio.js`/`pagelist.js` still works in v5 (deprecated in favor of `useStaticQuery`); left as-is.

## Rollback

Your old setup is untouched on `master`. To abandon: `git checkout master`, then `rm -rf node_modules package-lock.json && npm install`.

> Note: this repo uses GitButler. The `gatsby5-upgrade` branch was created with plain `git`; you may want to bring it under GitButler's management, or just review the diff and commit normally.
