import React from "react"
import { Link } from "gatsby"

import styled from "styled-components"

const Story = styled.div`
  clear: both;
  display: block;
  padding: 1rem 0.75rem;
  margin-bottom: 1rem;

  h3 {
    margin-top: 0;
  }

  :last-child {
    margin-bottom: 2rem;
  }

  :after {
    content: " ";
    display: block;
    clear: both;
  }
`

const Excerpt = styled.p`
  text-align: left;
`

const StoryBody = styled.div`
  img {
    @media screen and (max-width: 759px){
      height: auto;
      width: 100%;
      max-width: unset;
      margin: 1rem 0 0.5rem;
      float: none;
    }
  }
`

export default function BlogStory({ ctx, node }) {
  const title = node.frontmatter.title || node.fields.slug

  return (
    <Story>
      <h3>
        <Link to={node.fields.slug} title={title}>
          {title}
        </Link>
      </h3>
      <small>{node.frontmatter.date}</small>
      <StoryBody>
        {node.frontmatter.featured_image && (
          <img
            src={node.frontmatter.featured_image}
            alt={node.frontmatter.title}
          />
        )}
        <Excerpt
          dangerouslySetInnerHTML={{
            __html: node.excerpt,
          }}
        />
      </StoryBody>
    </Story>
  )
}
