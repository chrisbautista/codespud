import React from "react"
import { Link } from "gatsby"

const linkClass =
  "font-mono text-sm text-slate-600 underline underline-offset-4 transition-colors duration-200 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"

const Pagination = ({
  numPages,
  prevPage,
  currentPage,
  nextPage,
  isFirst,
  isLast,
}) => {
  if (numPages <= 1) {
    return null
  }

  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex items-center justify-between border-t border-slate-200 pt-6 dark:border-slate-800"
    >
      <span>
        {!isFirst && (
          <Link to={prevPage} rel="prev" className={linkClass}>
            ← Newer
          </Link>
        )}
      </span>
      <span
        aria-current="page"
        className="font-mono text-sm text-slate-500 dark:text-slate-400"
      >
        {currentPage} / {numPages}
      </span>
      <span>
        {!isLast && (
          <Link to={nextPage} rel="next" className={linkClass}>
            Older →
          </Link>
        )}
      </span>
    </nav>
  )
}

export default Pagination
