const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const blogIndex = path.resolve(`./src/templates/blog-list.js`)
  const worksIndex = path.resolve(`./src/templates/works-list.js`)
  return graphql(
    `
      {
        allMarkdownRemark(
          filter: { frontmatter: { draft: { ne: true } } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                contentType
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // create works directory
    createPage({
      path: `/works`,
      component: worksIndex,
    })

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges
    var numWorks = 0

    // get works
    const works = posts.filter(post => {
      return post.node.frontmatter.contentType === "works"
    })

    // get blogs
    const blogs = posts.filter(post => {
      return post.node.frontmatter.contentType !== "works"
    })

    blogs.forEach((post, index) => {
      const previous = index === blogs.length - 1 ? null : blogs[index + 1].node
      const next = index === 0 ? null : blogs[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    works.forEach((post, index) => {
      const previous = index === works.length - 1 ? null : works[index + 1].node
      const next = index === 0 ? null : works[index - 1].node
      createPage({
        path: `${post.node.fields.slug}`,
        component: blogPost,
        context: {
          slug: `${post.node.fields.slug}`,
          previous,
          next,
        },
      })
    })

    // Create blog post list pages
    const postsPerPage = 5

    const numPages = Math.ceil(blogs.length / postsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/${i + 1}`,
        component: blogIndex,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
