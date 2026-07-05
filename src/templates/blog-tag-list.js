import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostList from "../components/post-list"

const PerTagIndex = ({ data, pageContext }) => {
  const { tag } = pageContext
  const siteTitle = data.site.siteMetadata.title
  const { edges: posts, totalCount } = data.allMarkdownRemark

  return (
    <Layout title={siteTitle}>
      <header className="border-b border-slate-200 pb-6 dark:border-slate-800">
        <h1 className="font-mono text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          #{tag}
        </h1>
        <p className="mt-2 font-mono text-sm text-slate-500 dark:text-slate-400">
          {totalCount} post{totalCount === 1 ? "" : "s"}
        </p>
      </header>
      <PostList posts={posts} />
    </Layout>
  )
}

export default PerTagIndex

export const Head = ({ pageContext }) => (
  <SEO title={`Tag #${pageContext.tag}`} keywords={[pageContext.tag, `blog`]} />
)

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tags: { in: [$tag] }, draft: { ne: true } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMM DD")
            isoDate: date(formatString: "YYYY-MM-DD")
            title
            tags
          }
        }
      }
    }
  }
`
