import React from "react"

let uid = 0

/**
 * Renders ```mermaid fenced blocks (wrapped by gatsby-remark-prismjs in
 * .gatsby-highlight) as SVG diagrams, client-side. The mermaid bundle is
 * dynamically imported only when a page actually contains a diagram, and
 * diagrams re-render to match the active theme via the `themechange` event
 * dispatched by theme-toggle.js. Without JS the original code block remains.
 */
export default function useMermaid(containerRef) {
  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const codeBlocks = container.querySelectorAll("code.language-mermaid")
    if (!codeBlocks.length) return

    let cancelled = false
    const diagrams = [] // { host, source }

    codeBlocks.forEach(code => {
      const highlight = code.closest(".gatsby-highlight") || code.closest("pre")
      if (!highlight) return

      const source = code.textContent
      const figure = document.createElement("figure")
      figure.className = "mermaid-figure my-7"

      const host = document.createElement("div")
      host.setAttribute("role", "img")
      host.setAttribute("aria-label", "Diagram")

      const details = document.createElement("details")
      const summary = document.createElement("summary")
      summary.textContent = "Diagram source"
      summary.className =
        "cursor-pointer font-mono text-xs text-slate-500 dark:text-slate-400"
      details.appendChild(summary)

      figure.appendChild(host)
      figure.appendChild(details)
      highlight.parentNode.insertBefore(figure, highlight)
      details.appendChild(highlight) // keep original block as expandable source

      diagrams.push({ host, source })
    })

    async function renderAll() {
      try {
        const mermaid = (await import("mermaid")).default
        if (cancelled) return
        const dark = document.documentElement.classList.contains("dark")
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: dark ? "dark" : "neutral",
          fontFamily: "JetBrains Mono Variable, ui-monospace, monospace",
        })
        for (const item of diagrams) {
          try {
            const { svg } = await mermaid.render(
              `mermaid-svg-${uid++}`,
              item.source
            )
            if (cancelled) return
            item.host.innerHTML = svg
          } catch (err) {
            // Leave the source visible if the diagram fails to parse.
            item.host.textContent = ""
          }
        }
      } catch (err) {
        // mermaid failed to load; original code blocks remain in <details>.
      }
    }

    renderAll()
    window.addEventListener("themechange", renderAll)

    return () => {
      cancelled = true
      window.removeEventListener("themechange", renderAll)
    }
  }, [containerRef])
}
