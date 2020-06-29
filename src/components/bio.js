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
import Icon, { IconType } from "./icons"

const BioImage = styled(Image)`
  clear: both;
  float: left;
  margin-right: 10px;
  border-radius: 30px;
  width: 25px;
  height: 25px;
  
  img {
    margin: 0;
  }
  pic {
    img {
      margin: 0;
    }
  }
`

const BioContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
`

const SocialAnchor = styled.a`
  box-shadow: none;
  display: inline-block;
  margin: 0 5px;
`

const WrittenBy = styled.div`
  text-align: left;
  font-size: 1rem;
`

const SocialIcons = styled.div`
  vertical-align: middle;
`

function Bio(props) {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <BioContainer
            style={{
              justifyContent: props.type === "left" ? "flex-start" : "flex-end",
            }}
          >
            <WrittenBy>
              <BioImage
                fixed={data.avatar.childImageSharp.fixed}
                alt={author}
              />
              Written by <strong>{author}</strong> &nbsp;
            </WrittenBy>
            <SocialIcons>
              <SocialAnchor
                href={`https://twitter.com/${social.twitter}`}
                title={social.twitter}
                style={{ color: "#1b91db" }}
              >
                <Icon type={IconType.Twitter} />
              </SocialAnchor>
              <SocialAnchor
                href={`${social.linkedin}`}
                title={social.linkedin}
                style={{ color: "#283e4b" }}
              >
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
        fixed(width: 25, height: 25) {
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
