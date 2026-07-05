import React from "react"
import { Link } from "gatsby"

// One row of the /works directory list: year | title + excerpt | tech badges.
// The whole row is a single link (one tab stop); tags are non-interactive labels.
const WorkRow = ({ node }) => {
  const { title, year, date, tags } = node.frontmatter
  const excerpt = node.frontmatter.excerpt || node.excerpt

  return (
    <li>
      <Link
        to={node.fields.slug}
        className="group grid grid-cols-[4ch_1fr] gap-x-6 border-b border-slate-200 py-4 transition-colors duration-200 hover:bg-slate-50 focus-visible:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900 dark:focus-visible:bg-slate-900 sm:grid-cols-[4ch_1fr_minmax(10rem,14rem)]"
      >
        <time
          dateTime={date}
          className="pt-0.5 font-mono text-sm tabular-nums text-slate-500 dark:text-slate-400"
        >
          {year}
        </time>
        <span>
          <span className="font-semibold text-slate-900 underline-offset-4 group-hover:underline dark:text-slate-100">
            {title}
          </span>
          {excerpt && (
            <span className="mt-1 block text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {excerpt}
            </span>
          )}
        </span>
        {tags && tags.length > 0 && (
          <span className="col-start-2 mt-2 flex flex-wrap content-start gap-1.5 sm:col-start-3 sm:mt-0 sm:justify-end">
            {tags.map(t => (
              <span
                key={t}
                className="h-fit rounded border border-slate-300 px-1.5 py-0.5 font-mono text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300"
              >
                {t}
              </span>
            ))}
          </span>
        )}
      </Link>
    </li>
  )
}

export default WorkRow
