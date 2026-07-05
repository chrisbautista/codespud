import React from "react"
import { Link } from "gatsby"
import _ from "lodash"

export default function Tags({ tags, count }) {
  if (!tags || tags.length <= 0) {
    return null
  }

  tags = tags.slice(0, count)

  return (
    <span className="flex flex-wrap gap-1.5">
      {tags.map(tag => (
        <Link
          key={tag}
          to={`/tags/${_.kebabCase(tag)}`}
          className="rounded border border-slate-300 px-1.5 py-0.5 font-mono text-xs text-slate-600 transition-colors duration-200 hover:border-slate-500 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:text-slate-100"
        >
          {tag}
        </Link>
      ))}
    </span>
  )
}
