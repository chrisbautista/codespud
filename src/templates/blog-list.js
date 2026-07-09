import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Pagination from "../components/pagination"
import PostList from "../components/post-list"
import Tags from "../components/tagpills"

const Hero = ({ node }) => {
  const {
    title,
    date,
    isoDate,
    featured_image,
    featured_image_attribution,
    tags,
  } = node.frontmatter

  return (
    <section aria-label="Latest post" className="mb-12">
      <Link to={node.fields.slug} className="group block">
        <p className="font-mono text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Latest · <time dateTime={isoDate}>{date}</time>
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 group-hover:underline underline-offset-4 dark:text-slate-100 sm:text-4xl">
          {title}
        </h2>
        {featured_image && (
          <span className="mt-6 block overflow-hidden border border-slate-200 dark:border-slate-800">
            <img
              src={featured_image}
              alt=""
              loading="eager"
              decoding="async"
              className="h-full w-full scale-100 object-cover grayscale transition-all duration-500 group-hover:scale-[1.02] group-hover:grayscale-0 motion-reduce:transition-none motion-reduce:group-hover:scale-100 dark:brightness-90"
            />
          </span>
        )}
      </Link>
      {featured_image && featured_image_attribution && (
        <p
          className="mt-2 font-mono text-xs text-slate-500 dark:text-slate-400"
          dangerouslySetInnerHTML={{ __html: featured_image_attribution }}
        />
      )}
      {node.excerpt && (
        <p
          className="mt-4 max-w-measure leading-relaxed text-slate-600 dark:text-slate-400"
          dangerouslySetInnerHTML={{ __html: node.excerpt }}
        />
      )}
      <div className="mt-4">
        <Tags tags={tags} count={5} />
      </div>
    </section>
  )
}

const BlogIndex = ({ data, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const { currentPage, numPages } = pageContext

  const isFirstPage = currentPage === 1
  const heroPost = isFirstPage ? posts[0] : null
  const listPosts = isFirstPage ? posts.slice(1) : posts

  return (
    <Layout title={siteTitle}>
      <h1 className="sr-only">{siteTitle} — All posts</h1>
      {heroPost && <Hero node={heroPost.node} />}
      <PostList posts={listPosts} />
      <Pagination
        numPages={numPages}
        currentPage={currentPage}
        isFirst={isFirstPage}
        isLast={currentPage === numPages}
        prevPage={currentPage - 1 === 1 ? "/" : `/${currentPage - 1}`}
        nextPage={`/${currentPage + 1}`}
      />
    </Layout>
  )
}

export default BlogIndex

export const Head = () => (
  <SEO
    title="All posts"
    pathname="/"
    keywords={[`blog`, `web development`, `javascript`, `accessibility`]}
  />
)

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {
        frontmatter: {
          draft: { ne: true }
          contentType: { nin: ["works", "profile"] }
        }
      }
      sort: { frontmatter: { date: DESC } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMM DD")
            isoDate: date(formatString: "YYYY-MM-DD")
            title
            featured_image
            featured_image_attribution
            tags
          }
        }
      }
    }
  }
`
