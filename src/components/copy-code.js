import React from "react"

/**
 * Injects an accessible copy-to-clipboard button into each code block
 * (.gatsby-highlight) inside the given container. Mermaid blocks are skipped —
 * they are replaced by rendered diagrams (see mermaid-renderer.js).
 */
export default function useCopyCode(containerRef) {
  React.useEffect(() => {
    const container = containerRef.current
    if (!container || !navigator.clipboard) return

    const buttons = []
    container.querySelectorAll(".gatsby-highlight").forEach(highlight => {
      if (highlight.querySelector("code.language-mermaid")) return
      if (highlight.querySelector(".copy-code-btn")) return

      const button = document.createElement("button")
      button.type = "button"
      button.className = "copy-code-btn"
      button.textContent = "Copy"
      button.setAttribute("aria-live", "polite")
      button.setAttribute("aria-label", "Copy code to clipboard")
      button.addEventListener("click", () => {
        const code = highlight.querySelector("code")
        navigator.clipboard.writeText(code ? code.textContent : "").then(() => {
          button.textContent = "Copied"
          setTimeout(() => {
            button.textContent = "Copy"
          }, 2000)
        })
      })
      highlight.appendChild(button)
      buttons.push(button)
    })

    return () => buttons.forEach(b => b.remove())
  }, [containerRef])
}
