import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import Container from "./container"

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

const MainMenu = styled.div`
  float: right;

  @media screen and (max-width: 768px) {
    float: unset;
  }
`
const H3 = styled.h3`
  font-weight: 700;
  font-size: 1.4em;
`
const MenuLink = styled(Link)`
  border-bottom: none;
`
const NavUl = styled.ul`
  list-style: none;
  display: inline-block;
    
  @media screen and (max-width: 768px) {
    display: block;
    width: 100%;
    padding: 0;
  }
`
const NavLi = styled.li`
  list-style: none;
  display: inline-block;
  min-width: 90px;
  padding: 5px 10px 5px 0;
  margin-bottom: 0;

  @media screen and (max-width: 768px) {
    min-width: 100%;
    border-bottom: 1px solid #000;
    font-size: 1.5em;
  }
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

const Menu = () => (
  <MainMenu>
    <nav>
      <NavUl>
        <NavLi>
          <MenuLink to={`/`} alt={`Codespud`}>
            Home
          </MenuLink>
        </NavLi>
        <NavLi>
          <MenuLink to={"/works"} alt={`Works`}>
            Works
          </MenuLink>
        </NavLi>
        <NavLi>
          <MenuLink to={"/about-me"} alt={`About`}>
            About
          </MenuLink>
        </NavLi>
      </NavUl>
    </nav>
  </MainMenu>
)

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1>
          <Link to={`/`}>{title}</Link>
        </h1>
      )
    } else {
      header = (
        <H3>
          <Link to={`/`}>{title}</Link>
        </H3>
      )
    }
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
