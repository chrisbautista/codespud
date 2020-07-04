import React from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"

const PageListWrapper = styled.nav`
  position: absolute;
  top: 0;
  left: 0 ;
  width: 200px;
  height: 100vh;
  background-color: #fff;
  padding: 1rem 1rem 2rem;
  box-shadow: 0 1px 10px 1px rgba(0, 0, 0, 0.2); 

  @media screen and (max-width: 1486px) {
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
