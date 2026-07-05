/**
 * Monochromatic, high-contrast theme (WCAG 2.1 AA).
 *
 * Contrast floors — never use lighter/darker text than these:
 *   Light mode: body slate-900 on white (~17.8:1), muted text >= slate-500 on white (4.6:1)
 *   Dark mode:  body slate-200 on slate-950 (~14.9:1), muted text >= slate-400 (~7.4:1)
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./gatsby-ssr.js", "./gatsby-browser.js"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter Variable",
          "Inter",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono Variable",
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      maxWidth: {
        measure: "65ch", // post body reading measure
        site: "48rem", // overall content column
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            lineHeight: "1.7",
            "--tw-prose-body": theme("colors.slate.900"),
            "--tw-prose-headings": theme("colors.slate.900"),
            "--tw-prose-links": theme("colors.slate.900"),
            "--tw-prose-bold": theme("colors.slate.900"),
            "--tw-prose-quotes": theme("colors.slate.700"),
            "--tw-prose-quote-borders": theme("colors.slate.300"),
            "--tw-prose-code": theme("colors.slate.800"),
            "--tw-prose-hr": theme("colors.slate.200"),
            "--tw-prose-th-borders": theme("colors.slate.300"),
            "--tw-prose-td-borders": theme("colors.slate.200"),
            "--tw-prose-invert-body": theme("colors.slate.200"),
            "--tw-prose-invert-headings": theme("colors.slate.100"),
            "--tw-prose-invert-links": theme("colors.slate.100"),
            "--tw-prose-invert-bold": theme("colors.slate.100"),
            "--tw-prose-invert-quotes": theme("colors.slate.300"),
            "--tw-prose-invert-quote-borders": theme("colors.slate.700"),
            "--tw-prose-invert-code": theme("colors.slate.200"),
            "--tw-prose-invert-hr": theme("colors.slate.800"),
            "--tw-prose-invert-th-borders": theme("colors.slate.700"),
            "--tw-prose-invert-td-borders": theme("colors.slate.800"),
            a: {
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            },
            code: { fontWeight: "500" },
            // gatsby-remark-prismjs owns code block styling (see global.css)
            pre: { backgroundColor: "transparent", padding: "0" },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
