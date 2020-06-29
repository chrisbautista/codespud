import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"

const PaginationNav = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding: 0;
`

const PostTitle = styled.h1`
  text-align: center;
  margin: 3rem 0 3rem;
  
  .date {
    font-size: 0.875rem;
  }
`

const Img = styled.img`
  height: 300px;
  width: auto;
  display: block;

  @media screen and (max-width: 759px) {
    width: 100%;
    height: auto;
  }
`

const MetaDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;

  font-family: Montserrat;
`

function BackLink({ isPost, title }) {

  return isPost ? (
    <span>
      <a href="/" alt={'Home'} >{"Home"}</a> {">"} {title}
    </span>
  ) : (
    <span>
      <Link to="/works" alt={'Portfolio'}>{"Portfolio"}</Link> {">"} {title}
    </span>
  )
}

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    let isPost = !(
      post.frontmatter &&
      post.frontmatter.contentType &&
      post.frontmatter.contentType === "works"
    )

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <MetaDiv>
          <BackLink isPost={isPost} title={post.frontmatter.title} />
        </MetaDiv>
        <PostTitle>
          {post.frontmatter.title}
          <p className="date">{post.frontmatter.date}</p>
        </PostTitle>
        <div>
          {post.frontmatter.featured_image && (
            <Img
              src={post.frontmatter.featured_image}
              alt={post.frontmatter.title}
            />
          )}
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr />
        <PaginationNav>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                ← {next.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                {previous.frontmatter.title} →
              </Link>
            )}
          </li>
        </PaginationNav>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        featured_image
        contentType
      }
    }
  }
`
