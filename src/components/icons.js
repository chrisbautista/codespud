import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTwitter,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons"
import {
  faChevronLeft,
  faChevronRight,
  faHome,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"

export const IconType = {
  Twitter: "twitter",
  LinkedIn: "linkedin",
  Github: "github",
  Back: "back-arrow",
  Next: "forward-arrow",
  Home: "home",
  Menu: "menu",
  Close: "close",
}

export default function Icon({ type, style }) {
  switch (type) {
    case IconType.Twitter:
      return <FontAwesomeIcon icon={faTwitter} style={style} />
    case IconType.LinkedIn:
      return <FontAwesomeIcon icon={faLinkedin} style={style} />
    case IconType.Github:
      return <FontAwesomeIcon icon={faGithub} style={style} />
    case IconType.Back:
      return <FontAwesomeIcon icon={faChevronLeft} style={style} />
    case IconType.Next:
      return <FontAwesomeIcon icon={faChevronRight} style={style} />
    case IconType.Home:
      return <FontAwesomeIcon icon={faHome} style={style} />
    case IconType.Menu:
      return <FontAwesomeIcon icon={faBars} style={style} />
    case IconType.Close:
      return <FontAwesomeIcon icon={faTimes} style={style} />
    default:
      return null
  }
}
