import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Tags from "../components/tagpills"
import useMermaid from "../components/mermaid-renderer"
import useCopyCode from "../components/copy-code"

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  const bodyRef = React.useRef(null)

  const isWork = post.frontmatter.contentType === "works"
  const isAboutPage = post.fields.slug === "/2009/about-me/"

  // Accessibility fixes for embedded codepens in the rendered markdown.
  React.useEffect(() => {
    document.querySelectorAll('iframe[src*="codepen"]').forEach(item => {
      item.setAttribute("title", `${post.frontmatter.title} codepen`)
    })
    document.querySelectorAll('a[href*="codepen.io/"]').forEach(item => {
      if (item.innerHTML.trim() === "") {
        item.classList.add("sr-only")
        item.setAttribute("tabindex", -1)
        item.setAttribute("aria-hidden", "true")
        item.innerHTML = "codepen"
      }
    })
  }, [post.frontmatter.title])

  useMermaid(bodyRef)
  useCopyCode(bodyRef)

  return (
    <Layout title={siteTitle}>
      <article>
        <header>
          <nav
            aria-label="Breadcrumb"
            className="font-mono text-xs text-slate-500 dark:text-slate-400"
          >
            {isWork ? (
              <Link
                to="/works"
                className="underline underline-offset-2 hover:text-slate-900 dark:hover:text-slate-100"
              >
                Works
              </Link>
            ) : (
              <Link
                to="/"
                className="underline underline-offset-2 hover:text-slate-900 dark:hover:text-slate-100"
              >
                Home
              </Link>
            )}
            <span aria-hidden="true"> / </span>
            <span>{post.frontmatter.title}</span>
          </nav>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
            {post.frontmatter.title}
          </h1>
          <p className="mt-3 font-mono text-sm text-slate-500 dark:text-slate-400">
            <time dateTime={post.frontmatter.isoDate}>
              {post.frontmatter.date}
            </time>
            {post.timeToRead > 0 && <> · {post.timeToRead} min read</>}
          </p>
          <div className="mt-4">
            <Tags tags={post.frontmatter.tags} />
          </div>
          {post.frontmatter.featured_image && (
            <figure className="mt-8">
              <span className="block overflow-hidden border border-slate-200 dark:border-slate-800">
                <img
                  src={post.frontmatter.featured_image}
                  alt=""
                  loading="eager"
                  decoding="async"
                  className="h-auto w-full dark:brightness-90"
                />
              </span>
              {post.frontmatter.featured_image_attribution && (
                <figcaption
                  className="mt-2 font-mono text-xs text-slate-500 dark:text-slate-400"
                  dangerouslySetInnerHTML={{
                    __html: post.frontmatter.featured_image_attribution,
                  }}
                />
              )}
            </figure>
          )}
        </header>
        <section
          ref={bodyRef}
          className="prose prose-slate mt-10 dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        {!isAboutPage && (previous || next) && (
          <nav
            aria-label="Post navigation"
            className="mt-14 flex flex-col gap-4 border-t border-slate-200 pt-6 dark:border-slate-800 sm:flex-row sm:justify-between"
          >
            <span className="max-w-[48%]">
              {next && (
                <Link
                  to={next.fields.slug}
                  rel="next"
                  className="font-mono text-sm text-slate-600 underline underline-offset-4 transition-colors duration-200 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                >
                  ← {next.frontmatter.title}
                </Link>
              )}
            </span>
            <span className="max-w-[48%] text-right">
              {previous && (
                <Link
                  to={previous.fields.slug}
                  rel="prev"
                  className="font-mono text-sm text-slate-600 underline underline-offset-4 transition-colors duration-200 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                >
                  {previous.frontmatter.title} →
                </Link>
              )}
            </span>
          </nav>
        )}
      </article>
    </Layout>
  )
}

export default BlogPostTemplate

export const Head = ({ data }) => {
  const post = data.markdownRemark
  return (
    <SEO
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
      pathname={post.fields.slug}
      image={post.frontmatter.featured_image}
      article={{
        headline: post.frontmatter.title,
        datePublished: post.frontmatter.isoDate,
      }}
    />
  )
}

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
      timeToRead
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        isoDate: date(formatString: "YYYY-MM-DD")
        tags
        featured_image
        featured_image_attribution
        contentType
      }
    }
  }
`
