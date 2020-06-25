import React, { Component } from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

import styled from "styled-components"

const FeaturedImage = styled.img`
  max-width: 100%;
  margin: 0 auto 0;
  display: block;
`
const Figure = styled.figure`
  overflow: hidden;
  min-height: 140px;
  margin: 2rem 0;
`

const StyledLink = styled(Link)`
  box-shadow: none;
  color: #000;
  text-decoration: none;

  :hover {
    text-decoration: none;
    color: #000;
  }
`

const H3 = styled.h3`
  font-size: 1.1em;
  margin-top: 0.3em;
`

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 1rem;
  grid-auto-flow: dense;

  @media (max-width: 659px) {
      display: flex;
      flex-direction: column;
  }
`

const Card = styled.div`
  box-shadow: 0 5px 22px 0 rgba(0,0,0,0.1);
  border: 2px solid #e7e7e7;
  border-radius: 4px;
  padding: 2rem 1.7em;
  background-color: #FFF;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  &:hover {
    box-shadow: 0 -5px 22px 0 rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 659px) {
    display: flex;
    flex-direction: column;
    margin: 0 0 1rem;
  } 
`

const Description = styled.p`
  text-align: justify;
`

const AnimatedCard = ({ post }) => {
  const node = post;
  const title = node.frontmatter.title || node.fields.slug

  if (!node) return false;

  return (
    <Card >
      <StyledLink to={`${node.fields.slug}`}>
        <H3>
          {title}
        </H3>

        {node.frontmatter.featured_image && (
          <Figure>
            <FeaturedImage
              src={node.frontmatter.featured_image}
              alt={title}
            />
          </Figure>
        )}
        <Description
          dangerouslySetInnerHTML={{
            __html: node.frontmatter.description || node.excerpt,
          }}
        />
      </StyledLink>
    </Card>
  )
}

class WorksIndex extends Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Portfolio" keywords={[`works`, `portfolio`]} />
        <Bio />
        <Cards>
          {posts.map(({ node }) => <AnimatedCard post={node} />)}
        </Cards>
      </Layout>
    )
  }
}

export default WorksIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {
        frontmatter: { draft: { ne: true }, contentType: { in: ["works"] } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
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
