import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Icon, { IconType } from "../components/icons"
import styled from "styled-components"

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
                <Icon type={IconType.Back} /> {next.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                {previous.frontmatter.title} <Icon type={IconType.Next} />
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

//
// Styles
//
const PaginationNav = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding: 0;
  margin-left: 1rem;

  @media screen and (max-width: 900px){
    display: block;
    padding: 0.5rem 0.5rem 1rem;
    text-align: center;
    margin: 0;
    li {
      display: block;
      padding: 0.4rem 0;
      margin: 0.3rem 0 0;

      svg {
        margin-right: 0.2rem;
        margin-left: 0.2rem;
      }
    }
  }
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
  font-family: Montserrat;
  font-size: 0.875rem;
`

function BackLink({ isPost, title }) {
  let divider = <Icon type={IconType.Next}/>;
  
  return isPost ? (
    <span>
      <a href="/" alt={"Home"}>
        {"Home"}
      </a>{" "}
      {divider} {title}
    </span>
  ) : (
    <span>
      <Link to="/works" alt={"Portfolio"}>
        {"Portfolio"}
      </Link>{" "}
      {divider} {title}
    </span>
  )
}