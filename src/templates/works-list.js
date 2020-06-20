import React, {Component} from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

import styled from "styled-components"
import { useSpring, animated } from 'react-spring'

const FeaturedImage = styled.img`
  max-width: 100%;
  margin: 0 auto 0;
  display: block;
`
const Figure = styled.figure`
  overflow: hidden;
  min-height: 140px;
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: auto;
  grid-gap: 1rem;
`
const Card = styled.div`
  box-shadow: 1px 1px 8px 0px rgba(0, 0, 0, 0.1);
  border: 2px solid #e7e7e7;
  border-radius: 4px;
  padding: 0.5rem 0.7em;
  background-color: #FFF;
`

const AnimatedCard = ({post}) => {
  const node = post;
  if(!node) return false;
  console.log('xxxx', node);
  const title = node.frontmatter.title || node.fields.slug
  const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
  const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 1, tension: 170, friction: 26 }, zIndex: 10}))
  return (
      <animated.div  key={node.fields.slug}
      onMouseMove={() => set({ xys: [1, 1, 1.07] , zIndex: 99})}
      onMouseOut={() => set({ xys: [0, 0, 1] , zIndex: 10})}
      style={{zIndex: props.zIndex, transform: props.xys.interpolate(trans) 
     }}>
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
        <p
          dangerouslySetInnerHTML={{
            __html: node.frontmatter.description || node.excerpt,
          }}
        />
        </StyledLink>
      </Card>
      </animated.div>
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
