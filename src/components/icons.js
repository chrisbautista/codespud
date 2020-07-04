import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTwitter,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons"
import {
  faArrowLeft,
  faArrowRight,
  faHome,
} from "@fortawesome/free-solid-svg-icons"

export const IconType = {
  Twitter: "twitter",
  LinkedIn: "linkedin",
  Github: "github",
  Back: "back-arrow",
  Next: "forward-arrow",
  Home: "home",
}

export default function Icon({ type }) {
  switch (type) {
    case IconType.Twitter:
      return <FontAwesomeIcon icon={faTwitter} />
    case IconType.LinkedIn:
      return <FontAwesomeIcon icon={faLinkedin} />
    case IconType.Github:
      return <FontAwesomeIcon icon={faGithub} />
    case IconType.Back:
      return <FontAwesomeIcon icon={faArrowLeft} />
    case IconType.Next:
      return <FontAwesomeIcon icon={faArrowRight} />
    case IconType.Home:
      return <FontAwesomeIcon icon={faHome} />
    default:
      return null
  }
}
