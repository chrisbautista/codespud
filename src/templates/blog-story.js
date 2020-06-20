import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const Story = styled.div`
  clear: both;
  display: block;
  margin-bottom: 2em;

  :after {
    content: " ";
    display: block;
    clear: both;
  }
`;

const MoreLink = styled(Link)`
  background-color: antiquewhite;
  border-radius: 15px;
  box-shadow: 1px 1px 9px 0px rgba(0, 0, 0, 0.1);
  padding: 6px 18px;
  width: 62px;
  display: inline-block;
  text-align: center;
`

export default function BlogStory({ ctx, node }) {
    const title = node.frontmatter.title || node.fields.slug

    return <Story key={node.fields.slug}>
        <h3>
            <Link to={node.fields.slug} title={title}>{title}</Link>
        </h3>
        <small>{node.frontmatter.date}</small>

        <p
            dangerouslySetInnerHTML={{
                __html: node.frontmatter.description || node.excerpt,
            }}
        />
        <MoreLink to={node.fields.slug} title={title}>{ctx.i18n.More}</MoreLink>
    </Story>
}