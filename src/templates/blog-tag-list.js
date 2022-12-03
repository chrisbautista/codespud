import React from "react"
import { graphql } from "gatsby"

import Context from '../core/context';

import Layout from "../components/layout"
import SEO from "../components/seo"
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


class PerTagIndex extends React.Component {
  render() {
    const { data, pageContext } = this.props
    const { tag } = pageContext
    const siteTitle = data.site.siteMetadata.title
    const { edges: posts, totalCount } = data.allMarkdownRemark
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? "" : "s"
    } tagged with "${tag}"`
    const ctx = new Context()

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Tag list"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <BlogWrapper>
        <div>{tagHeader}</div>
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

export default PerTagIndex

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
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
