import React from "react"
import { graphql } from "gatsby"

import Context from '../core/context';

import Layout from "../components/layout"
import SEO from "../components/seo"
import Pagination from "../components/pagination"
import BlogStory from './blog-story'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const { currentPage, numPages } = this.props.pageContext
    const ctx = new Context()

    const Pages = (
      <Pagination
        numPages={numPages}
        prevPage={currentPage - 1 === 1 ? "/" : `/${(currentPage - 1)}`}
        isFirst={currentPage === 1}
        isLast={currentPage === numPages}
        currentPage={currentPage}
        nextPage={currentPage + 1 === numPages ? `/${numPages}` : `/${currentPage + 1}`}
        
      />
    )

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        {Pages}
        {posts.map(({ node }) => {
          return <BlogStory key={node.fields.slug} ctx={ctx} node={node} />
        })}
        {Pages}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {
        frontmatter: { draft: { ne: true }, contentType: { nin: ["works", "profile"] } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            featured_image
          }
        }
      }
    }
  }
`
