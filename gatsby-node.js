const path = require(`path`)
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const blogIndex = path.resolve(`./src/templates/blog-list.js`)
  const worksIndex = path.resolve(`./src/templates/works-list.js`)
  const perTagIndex = path.resolve(`./src/templates/blog-tag-list.js`)
  return graphql(
    `
      {
        postsRemark:allMarkdownRemark( sort: { fields: [frontmatter___date], order: DESC }, filter: {frontmatter: {draft: {eq: false}}}, limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                contentType
                tags
                draft
              }
            }
          }
        }
        tagsGroup: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
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
    const posts = result.data.postsRemark.edges

    // get works
    const works = posts.filter(post => {
      return post.node.frontmatter.contentType === "works" && post.node.frontmatter.draft !== "true"
    })

    // get blogs
    const blogs = posts.filter(post => {
      return post.node.frontmatter.contentType !== "works" && post.node.frontmatter?.draft !== "true"
    })

    blogs.forEach((post, index) => {
      const previous = index === blogs.length - 1 ? null : blogs[index + 1].node
      const next = index === 0 ? null : blogs[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          tags: post.node.frontmatter.tags,
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
    const postsPerPage = 15

    const addPage = blogs.length % postsPerPage > 1 ? 1 : 0;
    const numPages = Math.floor(blogs.length / postsPerPage) + addPage;

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

    // Extract tag data from query
    const tags = result.data.tagsGroup.group

    // Make tag pages
    tags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
        component: perTagIndex,
        context: {
          tag: tag.fieldValue,
        },
      })
    })


    // // redirects
    createRedirect({ fromPath: '/tags/console', toPath: '/tags/cli', isPermanent: true });
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
