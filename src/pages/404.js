import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout title={siteTitle}>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        Not Found
      </h1>
      <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">
        You just hit a route that doesn&#39;t exist... the sadness. Maybe one of
        these recent posts is what you were looking for:
      </p>
      <ul className="mt-8 divide-y divide-slate-200 dark:divide-slate-800">
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <li key={node.fields.slug} className="py-3">
              <Link
                to={node.fields.slug}
                className="font-semibold text-slate-900 underline-offset-4 hover:underline dark:text-slate-100"
              >
                {title}
              </Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default NotFoundPage

export const Head = () => <SEO title="404: Not Found" />

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { draft: { ne: true } } }
      sort: { frontmatter: { date: DESC } }
      limit: 20
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
