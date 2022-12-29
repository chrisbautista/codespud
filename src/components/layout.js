import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import Container from "./container"
import Menu from "./menu"

import Bio from "./bio"
import _ from "lodash"

function Layout(props) {
  const { title, children, backgroundColor, tags, isInsidePage } = props;
  const scrolled = React.useRef(null);

  React.useEffect(() => {
    const headID = document.getElementsByTagName('head')[0];

    if (!scrolled.current) {
      scrolled.current = true

      // Google Ads
      const gaScript = document.createElement('script')
      gaScript.async = true
      gaScript.crossorigin = 'anonymous'
      gaScript['data-ad-client'] = 'ca-pub-4889352773674825'
      gaScript.src =
        'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
      gaScript.type = 'text/javascript'
      headID.appendChild(gaScript)
    }
    
  }, []);



  let header = (
    <Logo>
      <Link to={`/`}>{title}</Link>
    </Logo>
  )

  let maxTagCount;
  if (tags?.length) {
    maxTagCount = _.maxBy(tags, 'totalCount').totalCount / 2;
  }

  return (
    <>
      <Header>
        <Menu />
        {header}
      </Header>
      <PageWrapper className={`${isInsidePage ? 'inside-page' : ''}`}>

        <Container>
          <Main style={{ backgroundColor }}>
            {children}
          </Main>
        </Container>

        {tags?.length && <Aside>
          <Tags>
            {tags.map((tagItem, i) => {
              let tag = tagItem.fieldValue;
              let scale = parseInt(tagItem.totalCount) / (maxTagCount / 3);
              let scaleStyle;
              if (scale >= 1) {
                if (scale > 2.5) {
                  scale = 2.5;
                }
                scaleStyle = { transform: `scale(${scale})`, margin: `${5 * scale}px ${25 * scale}px` }
              }

              return <a key={`tag${tag}${i}`}
                href={`/tags/${_.kebabCase(tag)}`}
                className="tag-pill"
                style={scaleStyle}
              >{tag}</a>;
            })}
          </Tags>
        </Aside>}
      </PageWrapper>
      <Footer>
        <FooterColumn className="bio-wrapper">
          <Bio />
        </FooterColumn>
        <Disclaimer>
          DISCLAIMER This is my personal weblog and learning tool. The
          content within it is exactly that – personal. The views and
          opinions expressed on the posts and the comments I make on this
          Blog represent my own and not those of people, institutions or
          organisations I am affiliated with unless stated explicitly. My
          Blog is not affiliated with, neither does it represent the views,
          position or attitudes of my employer, their clients, or any of
          their affiliated companies.
        </Disclaimer>
        <CopyRight>
          © 2006 - {new Date().getFullYear()}, Copyright - codespud.com.
        </CopyRight>
      </Footer>
    </>
  )

};

export default Layout


const PageWrapper = styled.div`
  color: #333;
  position: relative;

  @media (max-width: 1600px) {
    padding: 0 4rem;
  }

  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }

  &.inside-page {
    @media (max-width: 768px) {
      padding: 0;
    }  
  }
`

const Header = styled.header`
  margin: 0 auto;
  text-decoration: none;
  margin-bottom: 5rem;
  background-color: #161514;
  padding: 1rem 3rem;
  color: #fff;

  a, a:visited, a:active {
    color: #e1f6ec;
  }

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column-reverse;
    margin-bottom: 0;
    padding: 0;
  }
`

const Logo = styled.span`
  font-size: 2rem;
  margin-top: 1rem;

  @media screen and (max-width: 768px) {
    padding-left: 1.3rem;
  }
`;

const Footer = styled.footer`
  margin-top: 8em;
  border-top: 1px solid #ddd;
  padding: 2em 0;
  font-size: 1em;
  color: #595959;
  background-color: #dfdfdf;

  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 768px){
    margin-top: 0;
  }

`

const FooterColumn = styled.div`
  margin: 0 auto;
  padding: 20px 40px;
  text-align: left;
  max-width: 1600px;

  &.bio-wrapper {
    flex: 1 0 100%;
    box-sizing: border-box;
    padding-top: 0;
    padding-bottom: 0;
  }

  @media screen and (max-width: 768px) {
    padding: 20px 30px 0;
  }
`

const Disclaimer = styled(FooterColumn)`
  padding: 40px;
`;

const CopyRight = styled(FooterColumn)`
  font-size: 0.875rem;
  padding-bottom: 0;
  padding-top: 10px;
  width: 100%;
  text-align: left;

  @media screen and (max-width: 768px) {
    padding: 50px 30px 0;
  }
`

const Main = styled.main`
  min-height: 400px;
  padding: 0 0 1rem;
  border-radius: 4px;

  @media screen and (max-width: 768px) {
    border-radius: 0;
    padding: 0;
  }
`

const Tags = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Aside = styled.section`
  background-color: white;
  width: 100%;
  padding: 2.5rem 4rem;
  box-sizing: border-box;
  border-radius: 8px;
  max-width: 1600px;
  margin: 2rem auto;
  
  a.tag-pill {
    display: inline;
    padding: 5px;
    font-size: 1.1rem;
    line-height: 16px;
    margin: 3px 8px;
  }
`;