import React from "react"
import { Link } from "gatsby"

import styled from "styled-components"
import Tags from "../components/tagpills"
import _ from 'lodash';


// const AdContainer = styled.div`
//   display: flex;
//   height: auto;
//   border-radius: 4px;
//   overflow: hidden;
//   background-color: #fff;
//   margin-bottom: 1rem;

//   &:has(ins:empty){
//     display: none;
//   }
// `;

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
  max-height: 632px;

  .slogan {
    flex-direction: column;
    justify-content: center;
    min-height: 250px;
    margin: 2rem 1.5rem 0;
    padding-top: 1rem;
    font-size: 1.55rem;
    text-align: left;

    @media screen and (max-width: 768px) {
      display: none;
    }
  }

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

  .tag-pill  {
    font-size: 0.875rem;
  }

  @media (max-width: 659px) {
    box-shadow: none;
  }

  @media (min-width: 960px) {
    &.blog-latest {
      padding: 0;
      min-height: 400px;
      font-size: 1.125rem;
      
      [class*=blog-story__StoryBody] {
        width: 50%;
        min-width: 50%;
      }

      [class*="blog-story__StoryWrapper"]  {
        display: flex;        
        min-width: 100%;
        height: auto;
        padding: 0;
        flex: 1;

        .image-container {
          min-width: 50%;
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
  font-size: 0.875rem;
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

// const HeroAdContainer = styled.div`
//   display: none;
//   &:empty {display: none;}

//   @media screen and (min-width: 1600px) {
//     display: flex;
//     margin: 0 0 0 2rem;
//     height: 100%;
//     min-width: 180px; 
//     height: 500px;
//   }
// `;

export default function BlogStory({ ctx, node, latest }) {
  let [tick, updateTick] = React.useState(0);
  const title = node.frontmatter.title || node.fields.slug
  const linkRef = React.useRef();

  const onResize = React.useCallback(() => {
    updateTick(++tick);
  }, [tick]);

  React.useEffect(() => {
    const debouncedHandler = _.debounce(onResize);
    window.addEventListener('resize', debouncedHandler);

    return () => {
      window.removeEventListener('resize', debouncedHandler);
    };
  }, [onResize]);

  function onClick() {
    linkRef.current.querySelector('a.post-slug').click();
  }

  function onKeyUp(e) {
    if (e.key === 'Enter') {
      onClick();
    }
  }

  // let showHeroAd = false;
  // if (typeof window === 'object') {
  //   showHeroAd = (window?.innerWidth || undefined) > 1600;
  // }
  return (
    <>
      {/* {!latest && ad ? <>
        <AdContainer className="ad-container">
          {ad}
        </AdContainer>
      </> : null} */}
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
            <Tags tags={node.frontmatter.tags} count={3} />
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
        {/* {showHeroAd && <HeroAdContainer>
          {latest && ad}
        </HeroAdContainer>} */}
      </Story>
    </>
  )
}


// const quotes = [

//   "“Before software can be reusable it first has to be usable.” – Ralph Johnson",
//   "“Java is to JavaScript what car is to Carpet.” – Chris Heilmann",
//   "“Code is like humor. When you have to explain it, it’s bad.” – Cory House",
//   "“Optimism is an occupational hazard of programming: feedback is the treatment. “ Kent Beck",
//   "“Make it work, make it right, make it fast.” – Kent Beck",
//   "“Design is not just what it looks like and feels like. Design is how it works.” -- Steve Jobs",

// ];