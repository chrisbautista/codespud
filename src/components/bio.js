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
import Icon, { IconType } from './icons'

const BioImage = styled(Image)`
  clear: both;
  float: left;
  margin-right: 10px;
  border-radius: 30px;
  width: 25px;
  height: 25px;
`

const BioContainer = styled.div`
  height: 80px;
  display: flex;
  width: 100%;
  justify-content: start;
  margin-bottom: 3rem;
`

const SocialAnchor = styled.a`
  box-shadow: none;
  display: inline-block;
  margin: 0 5px;
`

const WrittenBy = styled.div`
  text-align: left;
  margin: 1rem 0;
`;

const SocialIcons = styled.div`
  vertical-align: middle;
  margin: 1rem 0;
`;

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <BioContainer>
            <WrittenBy>
            <BioImage fixed={data.avatar.childImageSharp.fixed} alt={author} />
              Written by <strong>{author}</strong> &nbsp;
            </WrittenBy>
            <SocialIcons>
              <SocialAnchor href={`https://twitter.com/${social.twitter}`} title={social.twitter}>
                <Icon type={IconType.Twitter} />
              </SocialAnchor>
              <SocialAnchor href={`${social.linkedin}`} title={social.linkedin}>
                <Icon type={IconType.LinkedIn} />
              </SocialAnchor>
            </SocialIcons>
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
          github
        }
      }
    }
  }
`

export default Bio
