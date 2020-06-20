module.exports = {
  siteMetadata: {
    title: `CodeSpud`,
    author: `@codespud`,
    description: `A coding nerd taking life one line of code at a time.`,
    siteUrl: `https://www.codespud.com`,
    social: {
      twitter: `chrisbautista`,
      linkedin: `https://www.linkedin.com/in/cabautista/`,
      github: `https://github.com/chrisbautista`,
    },
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/works`,
        name: `works`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        excerpt_separator: `<!--more-->`,
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-54548746-1`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Codespudd`,
        short_name: `codespud`,
        start_url: `/`,
        background_color: `#fdfdfd`,
        theme_color: `#e8b95c`,
        display: `minimal-ui`,
        icon: "content/assets/potato.png", // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    "gatsby-redirect-from",
    "gatsby-plugin-meta-redirect", // make sure this is always the last one
  ],
}
