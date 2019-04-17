/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"

const BioImage = styled(Image)`
  clear: both;
  float: left;
  margin-right: 10px;
  border-radius: 30px;
`

const BioContainer = styled.div`
  height: 80px;
  display: flex;
  width: 100%;
`
const Icon = styled.img`
  border-radius: 15px;
  width: 28px;
`
const SocialAnchor = styled.a`
  box-shadow: none;
`

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <BioContainer>
            <BioImage fixed={data.avatar.childImageSharp.fixed} alt={author} />
            <p>
              Written by <strong>{author}</strong> &nbsp;
              <SocialAnchor href={`https://twitter.com/${social.twitter}`}>
                <Icon src={`/twitter.png`} />
              </SocialAnchor>
              <SocialAnchor href={`${social.linkedin}`}>
                <Icon src={`/linkedin.png`} />
              </SocialAnchor>
            </p>
          </BioContainer>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile.png/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
          linkedin
        }
      }
    }
  }
`

export default Bio
