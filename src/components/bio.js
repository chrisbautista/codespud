import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Icon, { IconType } from "./icons"

function Biography() {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile.png/" }) {
        childImageSharp {
          gatsbyImageData(width: 25, height: 25, layout: FIXED)
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
            linkedin
            github
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  const socialLinkClass =
    "inline-flex h-8 w-8 items-center justify-center text-slate-500 transition-colors duration-200 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
        <GatsbyImage
          image={getImage(data.avatar)}
          alt=""
          className="rounded-full"
        />
        <span>
          By <strong>{author}</strong>
        </span>
      </p>
      <p className="flex items-center gap-1">
        <a
          href={`https://twitter.com/${social.twitter}`}
          title={`Twitter: ${social.twitter}`}
          className={socialLinkClass}
        >
          <Icon type={IconType.Twitter} />
        </a>
        <a href={social.linkedin} title="LinkedIn" className={socialLinkClass}>
          <Icon type={IconType.LinkedIn} />
        </a>
        <a href={social.github} title="GitHub" className={socialLinkClass}>
          <Icon type={IconType.Github} />
        </a>
      </p>
    </div>
  )
}

export default Biography
