import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import WorkRow from "../components/work-row"

const WorksIndex = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const works = data.allMarkdownRemark.nodes

  return (
    <Layout title={siteTitle}>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Works
        </h1>
        <p className="mt-3 max-w-measure leading-relaxed text-slate-600 dark:text-slate-400">
          Selected projects and client work — apps, plugins, and experiments.
        </p>
      </header>
      <ul className="border-t border-slate-200 dark:border-slate-800">
        {works.map(node => (
          <WorkRow key={node.id} node={node} />
        ))}
      </ul>
    </Layout>
  )
}

export default WorksIndex

export const Head = () => (
  <SEO
    title="Works"
    pathname="/works/"
    description="Selected projects and client work by Chris Bautista — apps, plugins, and experiments."
  />
)

export const pageQuery = graphql`
  query WorksList {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {
        frontmatter: { contentType: { eq: "works" }, draft: { ne: true } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        id
        excerpt(pruneLength: 140)
        fields {
          slug
        }
        frontmatter {
          title
          year: date(formatString: "YYYY")
          date(formatString: "YYYY-MM-DD")
          tags
          excerpt
        }
      }
    }
  }
`
