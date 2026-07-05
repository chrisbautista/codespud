import React from "react"
import { Link } from "gatsby"

import Menu from "./menu"
import Bio from "./bio"

function Layout({ title, children }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <header className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto flex max-w-site items-center justify-between px-4 py-4 sm:px-6">
          <Link
            to={`/`}
            className="font-mono text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100"
          >
            {title}
          </Link>
          <Menu />
        </div>
      </header>
      <main
        id="main"
        tabIndex={-1}
        className="mx-auto min-h-[400px] w-full max-w-site px-4 py-10 sm:px-6 sm:py-14"
      >
        {children}
      </main>
      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-site space-y-6 px-4 py-10 sm:px-6">
          <Bio />
          <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            DISCLAIMER This is my personal weblog and learning tool. The content
            within it is exactly that – personal. The views and opinions
            expressed on the posts and the comments I make on this Blog
            represent my own and not those of people, institutions or
            organisations I am affiliated with unless stated explicitly. My Blog
            is not affiliated with, neither does it represent the views,
            position or attitudes of my employer, their clients, or any of their
            affiliated companies.
          </p>
          <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
            © 2006 - {new Date().getFullYear()}, Copyright - codespud.com ·{" "}
            <a
              href="/rss.xml"
              className="underline underline-offset-2 hover:text-slate-900 dark:hover:text-slate-100"
            >
              RSS
            </a>
          </p>
        </div>
      </footer>
    </>
  )
}

export default Layout
