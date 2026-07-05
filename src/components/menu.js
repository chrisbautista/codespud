import React from "react"
import { Link } from "gatsby"

import ThemeToggle from "./theme-toggle"

const linkClass =
  "text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors duration-200"

const Menu = () => (
  <nav aria-label="Main">
    <ul className="flex items-center gap-5 sm:gap-7">
      <li>
        <Link to={`/`} className={linkClass}>
          Home
        </Link>
      </li>
      <li>
        <Link to={`/works`} className={linkClass}>
          Works
        </Link>
      </li>
      <li>
        <Link to={`/about-me`} className={linkClass}>
          About
        </Link>
      </li>
      <li>
        <ThemeToggle />
      </li>
    </ul>
  </nav>
)

export default Menu
