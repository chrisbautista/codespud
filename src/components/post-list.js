import React from "react"

import PostListItem from "./post-list-item"

// Chronological post list grouped under mono year headings.
// `posts` is the allMarkdownRemark edges array ({ node } items), sorted by date DESC.
const PostList = ({ posts }) => {
  const byYear = []
  posts.forEach(({ node }) => {
    const year = node.frontmatter.isoDate.slice(0, 4)
    const group = byYear[byYear.length - 1]
    if (group && group.year === year) {
      group.nodes.push(node)
    } else {
      byYear.push({ year, nodes: [node] })
    }
  })

  return byYear.map(group => (
    <section key={group.year} aria-labelledby={`year-${group.year}`}>
      <h2
        id={`year-${group.year}`}
        className="border-b border-slate-200 pb-2 pt-8 font-mono text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400"
      >
        {group.year}
      </h2>
      <ul className="divide-y divide-slate-200 dark:divide-slate-800">
        {group.nodes.map(node => (
          <PostListItem key={node.fields.slug} node={node} />
        ))}
      </ul>
    </section>
  ))
}

export default PostList
