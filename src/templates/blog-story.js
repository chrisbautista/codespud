import React from "react"
import { Link } from "gatsby"

import styled from "styled-components"

const Story = styled.div`
  clear: both;
  display: block;
  margin-bottom: 4em;

  :after {
    content: " ";
    display: block;
    clear: both;
  }
`

const MoreLink = styled(Link)`
  background-color: antiquewhite;
  border-radius: 5px;
  box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.1);
  padding: 6px 18px;
  width: 62px;
  display: inline-block;
  text-align: center;
`

const Excerpt = styled.p`
  text-align: justify;
`

const StoryBody = styled.div`
  img {
    width: 350px;
    float: right;
    margin: 0 0 0 2rem;

    @media screen and (max-width: 759px){
      height: auto;
      width: 100%;
      margin: 1rem 0 -1rem;
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
      <MoreLink to={node.fields.slug} title={title}>
        {ctx.i18n.More}
      </MoreLink>
    </Story>
  )
}
