import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const MainMenu = styled.div`
float: right;

@media screen and (max-width: 768px) {
  float: unset;
}
`
const MenuLink = styled(Link)`
border-bottom: none;
`
const NavUl = styled.ul`
list-style: none;
display: inline-block;
margin: 0;
padding: 0;
  
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
padding: 5px 0 5px 10px;
margin-bottom: 0;
text-align: right;

@media screen and (max-width: 768px) {
    width: calc(100% - 1rem);
    border-bottom: 1px solid #999;
    font-size: 1.2rem;
    padding: 5px 1rem 5px 0;
    margin: 0;
}
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

  export default Menu