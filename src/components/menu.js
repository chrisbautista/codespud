import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import Icon, { IconType } from "./icons"

const MainMenu = styled.div`
  float: right;

  @media screen and (max-width: 768px) {
    float: unset;

    nav {
      @media screen and (max-width: 768px) {
        display: block;
        width: 100%;
        padding: 0;
        transition: height 0.4s cubic-bezier(0, 0, 0.2, 1);
        height: 0;
        overflow: hidden;
      }
    }
  }
`
const BurgerMenu = styled.button`
  @media screen and (max-width: 768px) {
    float: right;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 1.2rem;
    right: 20px;
    background: transparent;
    border: 0;
    box-shadow: 0 1px 5px rgb(0 0 0 / 30%);

    svg.svg-inline--fa.fa-bars {
      width: 25px;
      height: 25px;
    }
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
  }
`
const NavLi = styled.li`
  list-style: none;
  display: inline-block;
  padding: 5px 0 5px 2rem;
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

const Menu = () => {
  let [showMenu, setShowMenu] = React.useState(false)
  let [shouldRenderMobileMenu, setShouldRenderMobileMenu] = React.useState(
    false
  )

  React.useEffect(() => {
    let isMounted = false

    if (!window) {
      return
    }

    function resetMenu() {
      setShouldRenderMobileMenu(window && window.innerWidth <= 768)
    }

    isMounted = true
    window.addEventListener("resize", resetMenu)
    resetMenu()

    return () => {
      if (!isMounted) {
        return
      }

      window.removeEventListener("resize", resetMenu)
    }
  }, [])

  function toggleMenu() {
    setShowMenu(!showMenu)
  }

  let burgerMenu = shouldRenderMobileMenu ? (
    <BurgerMenu onClick={toggleMenu}>
      <Icon type={IconType.Menu} />
    </BurgerMenu>
  ) : null

  let menuStyle = null
  if (shouldRenderMobileMenu) {
    menuStyle = showMenu ? { height: "125px" } : { height: "0" }
  }

  return (
    <MainMenu>
      {burgerMenu}
      <nav style={menuStyle}>
        <NavUl >
          <NavLi>
            <MenuLink to={`/`}>Home</MenuLink>
          </NavLi>
          <NavLi>
            <MenuLink to={"/works"}>Portfolio</MenuLink>
          </NavLi>
          <NavLi>
            <MenuLink to={"/about-me"}>About</MenuLink>
          </NavLi>
        </NavUl>
      </nav>
    </MainMenu>
  )
}

export default Menu
