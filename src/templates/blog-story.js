import React from "react"
import { Link } from "gatsby"

import styled from "styled-components"
import Tags from "../components/tagpills"

const Story = styled.div`
  clear: both;
  display: flex;
  margin-bottom: 1rem;
  vertical-align: center;
  box-shadow: 1px 1px 2px 0 rgba(0,0,0,0.15), 2px 2px 4px 0 rgba(0,0,0,0.15) ;
  border-radius: 6px;
  background-color: #fdfdfd;
  overflow:hidden;
  padding: 1rem;

  &:empty {
    display: none;
  }

  &:hover {
    cursor: pointer;
  }

  h2 {
    margin-top: 0;
    font-size: 1.6rem;
  }

  :after {
    content: " ";
    display: block;
    clear: both;
  }

  @media (max-width: 659px) {
    box-shadow: none;
  }

  @media (min-width: 960px) {
    &.blog-latest {
      padding: 0;
      min-height: 400px;
      font-size: 1.125rem;

      [class*="blog-story__StoryWrapper"]  {
        display: flex;        
        min-width: 100%;
        min-height: 100%;
        padding: 0;

        .image-container {
          min-width: 50%;
          min-height: 100%;
          padding: 0;
          margin: 0;
        }

        img {
          width: 120%;
          height: 120%;
          object-fit: cover;
        }

        h2 {
            padding: 1rem;
            font-size: 2.6rem;
        }

        p {
          padding: 1rem 2rem;
        }
      }
    }
  }

  @media screen and (min-width: 1440px) {
    &.blog-latest {
      [class*="blog-story__StoryWrapper"]  {
        display: flex;
        min-width: calc(100% - 232px);
        min-height: 100%;
        padding: 0;

        .image-container {
          min-width: 40%;
          min-height: 100%;
          padding: 0;
          margin: 0;
        }
      }
    }
  }

  @media screen and (min-width: 1200px) {
    &.blog-latest {
      font-size: 1.25rem;
      
      [class*="blog-story__StoryWrapper"]  {
        h2 { font-size: 3.6rem; }
      }
    }
  }
  
}

`

const Excerpt = styled.p`
  text-align: left;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4; /* Change this line if you want. In this case it trimmed the text to 3 lines. */
  overflow: hidden;
`
const ExcerptFull = styled.p`
  text-align: left;
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

const HeroAdContainer = styled.div`
  overflow: none;
  display:none;

  &:empty {display: none;}

  @media screen and (min-width: 1440px) {
    display: flex;
    margin: 1rem 1rem;
    height: 100%;
    min-width: 200px; 
    min-height: 200px;
  }

`;

export default function BlogStory({ ctx, node, latest, ad }) {
  const title = node.frontmatter.title || node.fields.slug
  const linkRef = React.useRef();

  function onClick() {
    linkRef.current.querySelector('a.post-slug').click();
  }

  function onKeyUp(e) {
    if (e.key === 'Enter') {
      onClick();
    }
  }

  return (
    <>
      <Story style={{ overflow: 'hidden' }}>
        {!latest && ad}
      </Story>
      <Story ref={linkRef} className={latest ? "blog-latest" : ""}>
        <StoryWrapper >
          {node.frontmatter.featured_image && (
            <div className="image-container">
              <StoryImage onClick={onClick}
                src={node.frontmatter.featured_image}
                alt=""
                tabIndex="-1"
              />
            </div>
          )}
          <StoryBody>
            <h2>
              <Link className="post-slug" to={node.fields.slug}>
                {title}
              </Link>
            </h2>
            <small
              tabIndex="-1"
              onClick={onClick} onKeyUp={onKeyUp} role="button">{node.frontmatter.date}</small>
            <Tags tags={node.frontmatter.tags} />
            {latest ? <ExcerptFull onClick={onClick}
              tabIndex="-1"
              dangerouslySetInnerHTML={{
                __html: node.excerpt,
              }}
            /> : <Excerpt onClick={onClick}
              tabIndex="-1"
              dangerouslySetInnerHTML={{
                __html: node.excerpt,
              }}
            />}
          </StoryBody>
        </StoryWrapper>
        <HeroAdContainer>
          {latest && ad}
        </HeroAdContainer>
      </Story>
    </>
  )
}
