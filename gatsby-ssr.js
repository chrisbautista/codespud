const React = require("react")

// Applies the saved (or system) theme before first paint to avoid a flash
// of the wrong mode. Must stay in sync with src/components/theme-toggle.js.
const themeScript = `
(function () {
  try {
    var t = localStorage.getItem("theme")
    if (t === "dark" || (!t && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark")
    }
  } catch (e) {}
})();
`

exports.onRenderBody = ({ setHtmlAttributes, setPreBodyComponents }) => {
  setHtmlAttributes({ lang: "en" })
  setPreBodyComponents([
    React.createElement("script", {
      key: "theme-init",
      dangerouslySetInnerHTML: { __html: themeScript },
    }),
  ])
}
