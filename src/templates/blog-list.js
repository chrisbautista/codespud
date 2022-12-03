import React from "react"
import { graphql } from "gatsby"

import Context from '../core/context';

import Layout from "../components/layout"
import SEO from "../components/seo"
import Pagination from "../components/pagination"
import BlogStory from './blog-story'
import styled from "styled-components"

const BlogList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(300px, 1fr));
  grid-template-rows: masonry;
  grid-row-gap: 1.5rem;
  grid-column-gap: 3rem;
  grid-auto-flow: dense;
  width: 100%;
  padding-top: 2rem;

  @media (max-width: 1024px) {
    grid-row-gap: 1rem;
    grid-column-gap: 2rem;
  }

  @media (max-width: 768px) {
    grid-row-gap: 0.5rem;
  }

  @media (max-width: 659px) {
    display: flex;
    flex-direction: column;
  }
`
const BlogWrapper = styled.div`
  max-width: 1600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 5rem;
  text-align: left;
  margin-top: 2rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #ddd;
  padding-bottom: 2rem;

    @media screen and (max-width: 720px) {
      font-size: 3.5rem;
      margin-bottom: -15px;
      padding-bottom: 1rem;
    }
`
class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const { currentPage, numPages } = this.props.pageContext
    const ctx = new Context()

    const pages = (
      <Pagination
        numPages={numPages}
        prevPage={currentPage - 1 === 1 ? "/" : `/${(currentPage - 1)}`}
        isFirst={currentPage === 1}
        isLast={currentPage === numPages}
        currentPage={currentPage}
        nextPage={currentPage + 1 === numPages ? `/${numPages}` : `/${currentPage + 1}`}
        ctx={ctx}
      />
    )

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <BlogWrapper>
          <Title>{"Blog"}</Title>
          <div>{pages}</div>
          <BlogList >
            {posts.map(({ node }) => {
              return <BlogStory key={node.fields.slug} ctx={ctx} node={node} />
            })}
          </BlogList>
        </BlogWrapper>
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
          html
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            featured_image
            tags
          }
        }
      }
    }
  }
`
