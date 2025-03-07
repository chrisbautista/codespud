import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Tags from "../components/tagpills"
import Icon, { IconType } from "../components/icons"
import styled from "styled-components"
// import AdUnit, { AdUnitType } from "../components/adunit"

const POST_BODY_TAG = '<!--ad-->';

class BlogPostTemplate extends React.Component {
  componentDidMount() {
    this.setupAria();
  }
  setupAria() {

    // codepen
    const nodeCodepen = document.querySelectorAll('iframe[src*="codepen"]');
    if (nodeCodepen.length) {
      Array.from(nodeCodepen).forEach(item => {
        item.setAttribute('title', this.props.data.markdownRemark.frontmatter.title + ' codepen');
      });
    }

    //remove codepen link
    const nodeAnchorCodepen = document.querySelectorAll('a[href*="codepen.io/"]');
    if (nodeAnchorCodepen.length) {
      Array.from(nodeAnchorCodepen).forEach(item => {
        if (item.innerHTML.trim() === '') {
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

    const isAboutPage = post.fields.slug === '/2009/about-me/';
    const hasInsertAd = post.html.indexOf(POST_BODY_TAG) !== -1;

    const postSegments = [];
    let body = <PostContent dangerouslySetInnerHTML={{ __html: post.html }} />;
    if (hasInsertAd) {
      const postbody = post.html.split(POST_BODY_TAG);
      let i = 0;
      for (const postBodyItem of postbody) {
        postSegments.push(<PostContent key={`pbody${i}`} dangerouslySetInnerHTML={{ __html: postBodyItem }} />);
        // if (i === 0 || i < postbody.length - 1) {
        //   postSegments.push(<AdUnit key={`pbodyAd${i}`} type={AdUnitType.InArticle} withShadow />);
        // }
        i++;
      }

      body = <>
        {postSegments}
      </>;
    }

    return (
      <Layout location={this.props.location} title={siteTitle} isInsidePage>
        <PostWrapper>
          <SEO
            title={post.frontmatter.title}
            description={post.frontmatter.description || post.excerpt}
          />
          <FeaturedImageBanner src={post.frontmatter.featured_image} alt={post.frontmatter.title} attribution={post.frontmatter.featured_image_attribution} />
          <MetaDiv>
            <BackLink isPost={isPost} title={post.frontmatter.title} />
          </MetaDiv>
          <PostTitle>
            {post.frontmatter.title}
            <p className="date">{post.frontmatter.date}</p>
            <Tags tags={post.frontmatter.tags} />
          </PostTitle>
          {/* {!isAboutPage && <AdUnit type={AdUnitType.InArticle} withShadow />} */}
          {body}
          {!isAboutPage && <PaginationNav>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  <Icon type={IconType.Back} style={{ width: "0.625rem" }} /> {next.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  {previous.frontmatter.title} <Icon type={IconType.Next} style={{ width: "0.625rem" }} />
                </Link>
              )}
            </li>
          </PaginationNav>}
          {/* {!isAboutPage && <AdUnit type={AdUnitType.InArticle} withShadow />} */}
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
      fields {
        slug
      }
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

function FeaturedImageBanner({ src, alt, attribution }) {

  if (!src) {
    return null;
  }

  return <figure className="featured-image">
    <div className="container"><FeaturedImage src={src} alt={alt} /></div>
    {attribution && <figcaption dangerouslySetInnerHTML={{ __html: attribution }} />}
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
  margin-top: 3rem;
  padding-top: 1rem;

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
  font-size: 3.5rem;
  max-width: 1024px;

  .date {
    font-size: 0.875rem;
  }

  @media screen and (max-width: 1200px){
    font-size: 3rem;
  }

  @media screen and (max-width: 960px){
    font-size: 2.5rem;
  }

  @media screen and (max-width: 768px){
    font-size: 2rem;
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
  margin: 2rem auto 0;

  @media screen and (max-width: 768px){
    margin-top: 1rem;
  }
`;

const PostWrapper = styled.article`
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 56px 56px;
  border-radius: 5px;
  background-color: #fff;
  overflow: hidden;

  @media screen and (max-width: 900px){
    padding: 0 20px 1.5rem;
  }

  @media screen and (max-width: 768px){
    padding: 0 1rem 20px;
    border-radius: 0;
  }
  
  .featured-image {
    display: block;
    padding: 0;
    margin: 0 auto;
    position: relative;
    left: -56px;
    top: 0;
    width: calc(100% + 112px);
    
    [class*="container"] {
      height: 350px;
      margin: 0;
      padding: 0;

      @media screen and (max-width: 768px){
        height: 175px;
      }
    }

    figcaption {
      --caption-color: #c2c4cc;

      display: inline-block;
      position: absolute;
      bottom: 15px;
      right: 0;
      margin-top: -56px;
      padding: 0.5rem 1rem;
      color: var(--caption-color);
      background-color: rgba(0,0,0,0.20);
      font-size: 0.75rem;

      @media screen and (max-width: 768px){
        right: 2rem;
      }

      a {
        color: var(--caption-color);
      }
    }

    image {
      display: block;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 100%;
    }
  }

  code {
    font-size: 0.875rem;
  }

  [class*="container"] {
    display: flex;
    justify-content: center;
    max-width: 1024px;
    height: 350px;
    margin: 0 auto;
    padding: 0;
  }

  .demo {
    border: 2px dashed #d3d3d3;
    padding: 2.5rem;
    margin: 2.5rem 0;
    overflow: auto;

    label {
      font-size: 1rem;
      font-weight: bold;
    }

    @media screen and (max-width: 768px) {
      padding: 15px 5px 20px;
    }
  }

  blockquote {
    margin: 2.5rem 0;
  }

  .gatsby-highlight {
    margin: 2.5rem 0;

    pre {padding: 1.6rem; }
  }
`;

const PostContent = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  font-weight: normal;
  line-height: 1.75;
  h1 {
    font-size: 3.052rem;
  }  
  h2 {
    font-size: 2.441rem;
  }  
  h3 {
    font-size: 1.953rem;
  }
  h4 {
    font-size: 1.563rem;
  }
  h5 {
    font-size: 1.25rem;
  }
  small, .text_small {
    font-size: 0.8rem;
  }

  @media screen and (max-width: 768px){
    h1 {
      font-size: 2rem;
    }  
    h2 {
      margin-top: 2rem;
      font-size: 1.841em;
    }  
    h3 {
      font-size: 1.703rem;
    }
    h4 {
      font-size: 1.563rem;
    }
    h5 {
      font-size: 1.25rem;
    }
  }
`;

function BackLink({ isPost, title }) {
  let divider = <Icon type={IconType.Next} style={{ width: '9px', height: '14px' }} />;

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