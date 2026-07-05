import React from "react"

// Initial theme is applied before hydration by the inline script in
// gatsby-ssr.js; this component reads the resulting DOM state after mount.
const ThemeToggle = () => {
  const [isDark, setIsDark] = React.useState(null)

  React.useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  function toggle() {
    const next = !document.documentElement.classList.contains("dark")
    document.documentElement.classList.toggle("dark", next)
    try {
      localStorage.setItem("theme", next ? "dark" : "light")
    } catch (e) {}
    setIsDark(next)
    window.dispatchEvent(
      new CustomEvent("themechange", {
        detail: { theme: next ? "dark" : "light" },
      })
    )
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark === true}
      aria-label="Toggle dark mode"
      className="flex h-8 w-8 items-center justify-center rounded border border-slate-300 text-slate-600 transition-colors duration-200 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:text-slate-100"
    >
      {/* moon (shown in light mode) / sun (shown in dark mode) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="block h-4 w-4 dark:hidden"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="hidden h-4 w-4 dark:block"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41" />
      </svg>
    </button>
  )
}

export default ThemeToggle
