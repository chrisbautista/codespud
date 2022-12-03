import React from "react"
import { Link } from "gatsby"

import styled from "styled-components"
import Tags from "../components/tagpills"

const Story = styled.div`
  clear: both;
  display: block;
  margin-bottom: 1rem;
  vertical-align: center;
  box-shadow: 1px 1px 2px 0 rgba(0,0,0,0.15), 2px 2px 4px 0 rgba(0,0,0,0.15) ;
  border-radius: 6px;
  background-color: #fdfdfd;
  overflow:hidden;
  padding: 1rem;

  &:hover {
    cursor: pointer;
  }

  h3 {
    margin-top: 0;
    font-size: 1.6rem;
  }

  :last-child {
    margin-bottom: 2rem;
  }

  :after {
    content: " ";
    display: block;
    clear: both;
  }

  @media (max-width: 659px) {
    box-shadow: none;
  }
`

const Excerpt = styled.p`
  text-align: left;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4; /* Change this line if you want. In this case it trimmed the text to 3 lines. */
  overflow: hidden;
`

const StoryWrapper = styled.div`
border-radius: 6px;
height: 100%;
border: 1px solid rgba(150,150,150,0.05);
text-align: center;
`

const StoryBody = styled.div`
  padding: 1rem;
  min-height: 250px;
`;

const StoryImage = styled.img`
  height: 200px;
  width: 100%;
  margin: 0;
  object-fit: cover;
`;

export default function BlogStory({ ctx, node }) {
  const title = node.frontmatter.title || node.fields.slug
  const linkRef = React.useRef();

  function onClick() {
    linkRef.current.querySelector('a.post-slug').click();
  }

  function onKeyUp(e) {
    if(e.key === 'Enter') {
      onClick();
    }
  }

  return (
    <Story ref={linkRef}>
      <StoryWrapper>
        {node.frontmatter.featured_image && (
          <StoryImage onClick={onClick}
            src={node.frontmatter.featured_image}
            alt=""
            tabIndex="-1"
          />
        )}
        <StoryBody>
          <h3>
            <Link className="post-slug" to={node.fields.slug}>
              {title}
            </Link>
          </h3>
          <small
            tabIndex="-1"
            onClick={onClick} onKeyUp={onKeyUp} role="button">{node.frontmatter.date}</small>
          <Tags tags={node.frontmatter.tags} />
          <Excerpt onClick={onClick}
            tabIndex="-1"
            dangerouslySetInnerHTML={{
              __html: node.excerpt,
            }}
          />
        </StoryBody>
      </StoryWrapper>
    </Story>
  )
}
