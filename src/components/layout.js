import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import Container from "./container"
import Menu from "./menu"

const PageWrapper = styled.div`
  color: #333;
`

const Header = styled.header`
  margin: 0 auto;
  text-decoration: none;
  margin-bottom: 1em;
  
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column-reverse;
  }
`

const H1 = styled.h1`
  margin-top: 1rem;
`

const Footer = styled.footer`
  margin-top: 4em;
  border-top: 1px solid #ddd;
  padding: 2em 0;
  font-size: 1em;
  color: #666;
  background-color: #dfdfdf;
`

const FooterColumn = styled.p`
  margin: 0 auto;
  padding: 30px 15%;
  text-align: left;
  @media screen and (max-width: 768px) {
    padding: 0 10px;
  } 
`
const Disclaimer = FooterColumn

const CopyRight = styled.div`
  clear: both;
  display: block;
  width: 100%;
`

const Main = styled.main`
  min-height: 400px;
`


class Layout extends React.Component {
  render() {
    const { title, children } = this.props
    let header = (
      <H1>
        <Link to={`/`}>{title}</Link>
      </H1>
    )

    return (
      <PageWrapper>
        <Container>
          <Header>
            <Menu />
            {header}
          </Header>
          <Main>{children}</Main>
        </Container>
        <Footer>
          <Disclaimer>
            DISCLAIMER This is my personal weblog and learning tool. The content
            within it is exactly that – personal. The views and opinions
            expressed on the posts and the comments I make on this Blog
            represent my own and not those of people, institutions or
            organisations I am affiliated with unless stated explicitly. My Blog
            is not affiliated with, neither does it represent the views,
            position or attitudes of my employer, their clients, or any of their
            affiliated companies.
          </Disclaimer>
          <Container>
            <CopyRight>
              © 2006 - {new Date().getFullYear()}, Copyright - codespud.com
            </CopyRight>
          </Container>
        </Footer>
      </PageWrapper>
    )
  }
}

export default Layout
