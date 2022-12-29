import React, { Component } from "react"
import { Link, graphql } from "gatsby"

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
  height: 150px;
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

const H2 = styled.h2`
  font-size: 1.1em;
  margin-top: 0.3em;
`

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
  grid-auto-flow: dense;
  max-width: 1600px;
  margin: 0 auto;

  @media (max-width: 659px) {
    display: flex;
    flex-direction: column;
  }
`

const Card = styled.div`
  font-size: 0.875rem;
  box-shadow: 0 5px 22px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 2rem 1.7em;
  background-color: #fff;
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

  & > a > p {
    font-weight: normal;
  }

  h3 {
    font-weight: 600;
  }
`

const Description = styled.p`
  text-align: left;
`

// const Title = styled.h1`
// font-weight: bold;
// margin-left: auto;
// margin-right: auto;
// font-weight: bold;
// font-size: 5rem;
// text-align: left;
// margin-top: 2rem;
// margin-bottom: 2rem;
// border-bottom: 2px solid #ddd;
// padding-bottom: 2rem;

// max-width: 1600px;

//   @media screen and (max-width: 720px) {
//     font-size: 3.5rem;
//     padding-bottom: 1rem;
//   }
// `

const AnimatedCard = ({ post }) => {
  const node = post
  const title = node.frontmatter.title || node.fields.slug

  if (!node) return false

  return (
    <Card>
      <StyledLink to={`${node.fields.slug}`}>
        <H2>{title}</H2>

        {node.frontmatter.featured_image && (
          <Figure>
            <FeaturedImage src={node.frontmatter.featured_image} alt={title} />
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
      <Layout location={this.props.location} title={siteTitle} backgroundColor='transparent'>
        <SEO title="Portfolio" keywords={[`works`, `portfolio`]} />
        <Cards>
          {posts.map(({ node }) => (
            <AnimatedCard key={node.frontmatter.title} post={node} />
          ))}
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
            tags
          }
        }
      }
    }
  }
`
