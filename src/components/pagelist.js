import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"

const PageListWrapper = styled.nav`
  position: absolute;
  top: 1rem;
  left: 1.5rem ;
  width: 180px;

  @media screen and (max-widt: 759px) {
    display: none;
  }
`

const PageListItem = styled.li`
  font-size: 0.75rem;
`

export default function PageList() {
  return (
    <StaticQuery
      query={graphql`
        query PageListQuery {
          allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            limit: 30
          ) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }
        }
      `}
      render={data => {
        console.log(data)
        const posts = data.allMarkdownRemark.edges
        return (
          <PageListWrapper>
            <div>{'Latest 20 pages'}</div>
            <ul>
              {posts.map(post => (
                <PageListItem>{post.node.frontmatter.title}</PageListItem>
              ))}
            </ul>
          </PageListWrapper>
        )
      }}
    />
  )
}
