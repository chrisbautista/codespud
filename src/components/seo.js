/**
 * SEO component for the Gatsby Head API.
 * Render from a page's exported Head: `export const Head = (...) => <SEO ... />`
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"

function SEO({
  title,
  description = ``,
  keywords = [],
  pathname,
  image,
  article = null,
  children,
}) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const siteUrl = site.siteMetadata.siteUrl
  const canonical = pathname ? `${siteUrl}${pathname}` : null
  const ogImage = `${siteUrl}${image || `/potato.png`}`

  // JSON-LD for blog posts: pass article={{ headline, datePublished, dateModified }}
  const jsonLd = article
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: article.headline || title,
        datePublished: article.datePublished,
        dateModified: article.dateModified || article.datePublished,
        image: [ogImage],
        url: canonical,
        author: {
          "@type": "Person",
          name: "Chris Bautista",
          url: siteUrl,
        },
      }
    : null

  return (
    <>
      <title>{`${title} | ${site.siteMetadata.title}`}</title>
      <meta name="description" content={metaDescription} />
      {canonical && <link rel="canonical" href={canonical} />}
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(`, `)} />
      )}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={article ? `article` : `website`} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:image" content={ogImage} />
      <meta
        name="twitter:card"
        content={image ? `summary_large_image` : `summary`}
      />
      <meta name="twitter:creator" content={site.siteMetadata.author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
      {children}
    </>
  )
}

export default SEO
