import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Pagination from "../components/pagination"

import styled from "styled-components"

const Story = styled.div`
  clear: both;
  display: block;
  margin-bottom: 2em;

  :after {
    content: " ";
    display: block;
    clear: both;
  }
`

const MoreLink = styled(Link)`
  background-color: antiquewhite;
  border-radius: 15px;
  box-shadow: 1px 1px 9px 0px rgba(0, 0, 0, 0.1);
  padding: 6px 18px;
  width: 62px;
  display: inline-block;
  text-align: center;
`

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()
    const Pages = (
      <Pagination
        numPages={numPages}
        prevPage={prevPage}
        isFirst={isFirst}
        isLast={isLast}
        currentPage={currentPage}
        nextPage={nextPage}
      />
    )

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Bio />
        {Pages}
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <Story key={node.fields.slug}>
              <h3>
                <Link to={node.fields.slug}>{title}</Link>
              </h3>
              <small>{node.frontmatter.date}</small>

              <p
                dangerouslySetInnerHTML={{
                  __html: node.excerpt,
                }}
              />
              <MoreLink to={node.fields.slug}>{`More`}</MoreLink>
            </Story>
          )
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
        frontmatter: { draft: { ne: true }, contentType: { nin: ["works"] } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt(format: HTML)
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
