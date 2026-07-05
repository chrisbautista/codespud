import React from "react"
import { Link } from "gatsby"

import Tags from "./tagpills"

// One entry in the chronological post list. Expects frontmatter with
// `date(formatString: "MMM DD")`, `isoDate: date(formatString: "YYYY-MM-DD")`.
const PostListItem = ({ node }) => {
  const title = node.frontmatter.title || node.fields.slug
  return (
    <li className="py-5">
      <article className="grid grid-cols-1 gap-x-6 sm:grid-cols-[7ch_1fr]">
        <time
          dateTime={node.frontmatter.isoDate}
          className="pt-0.5 font-mono text-sm tabular-nums text-slate-500 dark:text-slate-400"
        >
          {node.frontmatter.date}
        </time>
        <div>
          <h3 className="text-lg font-semibold leading-snug">
            <Link
              to={node.fields.slug}
              className="text-slate-900 hover:underline underline-offset-4 dark:text-slate-100"
            >
              {title}
            </Link>
          </h3>
          {node.excerpt && (
            <p
              className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400"
              dangerouslySetInnerHTML={{ __html: node.excerpt }}
            />
          )}
          <div className="mt-2">
            <Tags tags={node.frontmatter.tags} count={5} />
          </div>
        </div>
      </article>
    </li>
  )
}

export default PostListItem
