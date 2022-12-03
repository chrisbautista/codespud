import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Tags from "../components/tagpills"
import Icon, { IconType } from "../components/icons"
import styled from "styled-components"

class BlogPostTemplate extends React.Component {
  componentDidMount() {
    this.setupAria();
  }
  setupAria(){
    
    // codepen
    const nodeCodepen = document.querySelectorAll('iframe[src*="codepen"]');
    if (nodeCodepen.length) {
      Array.from(nodeCodepen).forEach(item => {
        item.setAttribute('title', this.props.data.markdownRemark.frontmatter.title +' codepen');
      });
    }

    //remove codepen link
    const nodeAnchorCodepen = document.querySelectorAll('a[href*="codepen.io/"]');
    if (nodeAnchorCodepen.length) {
      Array.from(nodeAnchorCodepen).forEach(item => {
        if(item.innerHTML.trim() === '') {
          item.classList.add('sr-only');
          item.setAttribute('tabindex', -1)
          item.setAttribute('aria-hidden', 'true');
          item.innerHTML = 'codepen';
        }
      });
    }
  }
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
        <PostWrapper>
          <SEO
            title={post.frontmatter.title}
            description={post.frontmatter.description || post.excerpt}
          />
          <FeaturedImageBanner src={post.frontmatter.featured_image} alt={post.frontmatter.title} attribution={post.frontmatter.featured_image_attribution}/>
          <MetaDiv>
            <BackLink isPost={isPost} title={post.frontmatter.title} />
          </MetaDiv>
          <PostTitle>
            {post.frontmatter.title}
            <p className="date">{post.frontmatter.date}</p>
            <Tags tags={post.frontmatter.tags} />
          </PostTitle>
          <PostContent dangerouslySetInnerHTML={{ __html: post.html }} />
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
        </PostWrapper>
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
        tags
        featured_image
        featured_image_attribution
        contentType
        tags
      }
    }
  }
`

function FeaturedImageBanner ({ src, alt, attribution }) {

  if (!src) {
    return null;
  }

  return <figure className="featured-image">
    <div className="container"><FeaturedImage src={src} alt={alt} /></div>
    {attribution && <figcaption dangerouslySetInnerHTML={{__html: attribution }}/>}
  </figure>;
}

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
  margin: 3rem auto;
  font-size: 2.5rem;
  max-width: 1024px;

  .date {
    font-size: 0.875rem;
  }
`

const FeaturedImage = styled.img`
   width: 100%;
   object-fit: cover;
`;

const MetaDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: Montserrat;
  font-size: 0.875rem;
  max-width: 1024px;
  margin: 3rem auto 0;
`

const PostWrapper = styled.article`
  max-width: 1024px;
  margin: 0 auto;
  padding: 24px;
  border-radius: 4px;
  background-color: #fff;

  .featured-image {
    display: block;
    max-width: 1024px;
    padding: 0;
    margin: 0 auto;

    [class*=container] {
      max-width: 1024px;
      height: 350px;
      margin: 0;
      padding: 0;
    }

    figcaption {
      margin-top: -8px;
    }

    image {
      display: block;
      margin: 0;
      padding: 0;
    }
  }

  [class*=container] {
    display: flex;
    justify-content: center;
    max-width: 1024px;
    height: 350px;
    margin: 0 auto;
    padding: 0;
  }
`;

const PostContent = styled.div`
  max-width: 1024px;
  margin: 0 auto;

  h2, h3 {
    line-height: 1.3;
  }

  h2 { font-size: 2.074rem }
  h3 { font-size: 1.728rem }
`;

function BackLink({ isPost, title }) {
  let divider = <Icon type={IconType.Next} style={{width: '9px', height: '14px'}}/>;

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